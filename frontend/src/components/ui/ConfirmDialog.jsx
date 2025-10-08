import { X, AlertTriangle, Trash2, Info } from 'lucide-react'
import Button from './Button'

export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger', // 'danger', 'warning', 'info'
    icon: CustomIcon = null
}) {
    if (!isOpen) return null

    // Icon and color schemes based on variant
    const variants = {
        danger: {
            icon: Trash2,
            bgColor: 'bg-red-50 dark:bg-red-900/20',
            iconColor: 'text-red-600 dark:text-red-400',
            iconBg: 'bg-red-100 dark:bg-red-900/30',
            borderColor: 'border-red-200 dark:border-red-800'
        },
        warning: {
            icon: AlertTriangle,
            bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
            iconColor: 'text-yellow-600 dark:text-yellow-400',
            iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
            borderColor: 'border-yellow-200 dark:border-yellow-800'
        },
        info: {
            icon: Info,
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            iconColor: 'text-blue-600 dark:text-blue-400',
            iconBg: 'bg-blue-100 dark:bg-blue-900/30',
            borderColor: 'border-blue-200 dark:border-blue-800'
        }
    }

    const config = variants[variant]
    const Icon = CustomIcon || config.icon

    const handleConfirm = () => {
        onConfirm()
        onClose()
    }

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 m-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Icon & Close Button */}
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-full ${config.iconBg}`}>
                        <Icon className={config.iconColor} size={24} />
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                </h2>

                {/* Message */}
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {message}
                </p>

                {/* Warning Box (optional, can be enhanced) */}
                {variant === 'danger' && (
                    <div className={`mb-6 p-3 rounded-lg border ${config.borderColor} ${config.bgColor}`}>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            <strong>Warning:</strong> This action cannot be undone.
                        </p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Button
                        variant={variant === 'danger' ? 'danger' : 'primary'}
                        onClick={handleConfirm}
                        className="flex-1"
                    >
                        {confirmText}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        className="flex-1"
                    >
                        {cancelText}
                    </Button>
                </div>
            </div>
        </div>
    )
}