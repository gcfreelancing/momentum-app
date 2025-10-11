import { CheckCircle2, Circle, Clock, Edit2, Trash2 } from 'lucide-react'

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
    return (
        <div
            className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md ${
                task.completed ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
            }`}
        >
            {/* Checkbox */}
            <button
                onClick={() => onToggle(task.id)}
                className="flex-shrink-0"
            >
                {task.completed ? (
                    <CheckCircle2 className="text-green-600" size={24} />
                ) : (
                    <Circle className="text-gray-400" size={24} />
                )}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                        {task.title}
                    </h3>
                    {task.category && (
                        <span
                            className="px-2 py-0.5 rounded-full text-xs font-medium text-white flex items-center gap-1"
                            style={{ backgroundColor: task.category.color }}
                        >
                            <span>{task.category.icon}</span>
                            <span>{task.category.name}</span>
                        </span>
                    )}
                </div>
                {task.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
                )}
            </div>

            {/* Actions */}
            {!task.completed && onEdit && (
                <button
                    onClick={() => onEdit(task)}
                    className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    <Edit2 size={18} />
                </button>
            )}

            {onDelete && (
                <button
                    onClick={() => onDelete(task.id)}
                    className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                    <Trash2 size={18} />
                </button>
            )}
        </div>
    )
}