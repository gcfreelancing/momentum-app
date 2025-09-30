export default function Button({
                                   variant = 'primary',
                                   children,
                                   className = '',
                                   ...props
                               }) {
    const variants = {
        primary: 'bg-primary-600 hover:bg-primary-700 text-white',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
    }

    return (
        <button
            className={`font-medium py-2 px-4 rounded-lg transition-colors ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}