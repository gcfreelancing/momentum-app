import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Button from '../ui/Button'

const MAX_NAME_LENGTH = 15
const MAX_CATEGORIES = 6

export default function CategoryModal({
                                          isOpen,
                                          onClose,
                                          onSave,
                                          onDelete,
                                          category = null,
                                          currentCategoriesCount = 0
                                      }) {
    const [name, setName] = useState('')
    const [color, setColor] = useState('#3B82F6')
    const [icon, setIcon] = useState('📁')
    const [error, setError] = useState('')

    // Updates values when the category changes
    useEffect(() => {
        if (category) {
            setName(category.name || '')
            setColor(category.color || '#3B82F6')
            setIcon(category.icon || '📁')
        } else {
            // Clean when it's a new category
            setName('')
            setColor('#3B82F6')
            setIcon('📁')
        }
        setError('')
    }, [category, isOpen])

    const predefinedColors = [
        '#EF4444', '#F97316', '#F59E0B', '#EAB308',
        '#84CC16', '#22C55E', '#10B981', '#14B8A6',
        '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1',
        '#8B5CF6', '#A855F7', '#D946EF', '#EC4899'
    ]

    const predefinedIcons = ['📁', '💼', '🎯', '🏠', '💪', '📚', '🎨', '💻', '🎵', '🍕', '✈️', '⚡']

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        // Validations
        if (!name.trim()) {
            setError('Category name is required')
            return
        }

        if (name.length > MAX_NAME_LENGTH) {
            setError(`Name cannot exceed ${MAX_NAME_LENGTH} characters`)
            return
        }

        if (!category && currentCategoriesCount >= MAX_CATEGORIES) {
            setError(`Maximum ${MAX_CATEGORIES} categories allowed`)
            return
        }

        onSave({
            id: category?.id,
            name: name.trim(),
            color,
            icon
        })

        // Reset form
        setName('')
        setColor('#3B82F6')
        setIcon('📁')
        setError('')
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {category ? 'Edit Category' : 'New Category'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Category Name *
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Work, Personal, Urgent"
                            maxLength={MAX_NAME_LENGTH}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            autoFocus
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {name.length}/{MAX_NAME_LENGTH} characters
                        </p>
                    </div>

                    {/* Icon Selector */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Icon
                        </label>
                        <div className="grid grid-cols-6 gap-2">
                            {predefinedIcons.map((emoji) => (
                                <button
                                    key={emoji}
                                    type="button"
                                    onClick={() => setIcon(emoji)}
                                    className={`text-2xl p-2 rounded-lg border-2 transition-all ${
                                        icon === emoji
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                            : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                                    }`}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Selector */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Color
                        </label>
                        <div className="grid grid-cols-8 gap-2">
                            {predefinedColors.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setColor(c)}
                                    className={`w-8 h-8 rounded-lg transition-all ${
                                        color === c ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-800' : ''
                                    }`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-white"
                            style={{ backgroundColor: color }}
                        >
                            <span>{icon}</span>
                            <span>{name || 'Category Name'}</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <Button type="submit" variant="primary">
                            {category ? 'Update' : 'Create'}
                        </Button>
                      
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                </form>

                {/* Info */}
                {!category && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                        {currentCategoriesCount}/{MAX_CATEGORIES} categories created
                    </p>
                )}
            </div>
        </div>
    )
}