import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import Button from '../ui/Button'
import ConfirmDialog from '../ui/ConfirmDialog'
import CategoryList from './CategoryList'
import CategoryModal from './CategoryModal'

export default function CategoryManagementModal({
    isOpen,
    onClose,
    categories,
    onSaveCategory,
    onDeleteCategory,
    onReload
}) {
    const [showCategoryModal, setShowCategoryModal] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: '',
        message: '',
        categoryId: null
    })

    const handleEdit = (category) => {
        setEditingCategory(category)
        setShowCategoryModal(true)
    }

    const handleDelete = (id) => {
        const category = categories.find(c => c.id === id)
        
        setConfirmDialog({
            isOpen: true,
            title: 'Delete Category?',
            message: `Are you sure you want to delete "${category?.name}"?`,
            categoryId: id
        })
    }

    const confirmDelete = async () => {
        try {
            await onDeleteCategory(confirmDialog.categoryId)
            onReload()
        } catch (err) {
            console.error('Delete failed:', err)
        }
    }

    const handleSave = async (categoryData) => {
        await onSaveCategory(categoryData)
        setShowCategoryModal(false)
        setEditingCategory(null)
        onReload()
    }

    if (!isOpen) return null

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Manage Categories
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {categories.length}/6 categories
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="primary"
                                onClick={() => {
                                    setEditingCategory(null)
                                    setShowCategoryModal(true)
                                }}
                                className="flex items-center gap-2"
                                disabled={categories.length >= 20}
                            >
                                <Plus size={18} />
                                New Category
                            </Button>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto flex-1">
                        <CategoryList
                            categories={categories}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>

            {/* Category Create/Edit Modal */}
            <CategoryModal
                isOpen={showCategoryModal}
                onClose={() => {
                    setShowCategoryModal(false)
                    setEditingCategory(null)
                }}
                onSave={handleSave}
                onDelete={handleDelete}
                category={editingCategory}
                currentCategoriesCount={categories.length}
            />

            {/* Confirmation Dialog */}
            <ConfirmDialog
                isOpen={confirmDialog.isOpen}
                onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                onConfirm={confirmDelete}
                title={confirmDialog.title}
                message={confirmDialog.message}
                variant="danger"
                confirmText="Delete Category"
            />
        </>
    )
}