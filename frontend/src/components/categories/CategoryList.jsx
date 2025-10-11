import { Edit2, Trash2 } from 'lucide-react'

export default function CategoryList({ categories, onEdit, onDelete }) {
    if (categories.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No categories yet. Create your first category!
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((category) => (
                <div
                    key={category.id}
                    className="flex items-center justify-between p-4 rounded-lg border-2 transition-all hover:shadow-md"
                    style={{ borderColor: category.color + '40' }}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                            style={{ backgroundColor: category.color + '20' }}
                        >
                            {category.icon}
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{category.name}</h3>
                            <div
                                className="w-16 h-1 rounded-full mt-1"
                                style={{ backgroundColor: category.color }}
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(category)}
                            className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            title="Edit category"
                        >
                            <Edit2 size={18} />
                        </button>
                        <button
                            onClick={() => onDelete(category.id)}
                            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            title="Delete category"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}