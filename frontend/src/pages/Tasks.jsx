import { useState, useEffect } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import TaskList from '../components/tasks/TaskList'
import TaskModal from '../components/tasks/TaskModal'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import { taskService } from '../services/taskService'
import { categoryService } from '../services/categoryService'
import CategoryManagementModal from '../components/categories/CategoryManagement'

export default function Tasks() {
    const [tasks, setTasks] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [showTaskModal, setShowTaskModal] = useState(false)
    const [showCategoryModal, setShowCategoryModal] = useState(false)
    const [editingTask, setEditingTask] = useState(null)
    
    // Confirmation dialog state
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => {}
    })

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            setLoading(true)
            const [tasksData, categoriesData] = await Promise.all([
                taskService.getAllTasks(),
                categoryService.getAllCategories()
            ])
            setTasks(tasksData)
            setCategories(categoriesData)
        } catch (err) {
            console.error('Error loading data:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleToggleTask = async (id) => {
        try {
            const updatedTask = await taskService.toggleTask(id)
            setTasks(tasks.map(task =>
                task.id === id ? updatedTask : task
            ))
        } catch (err) {
            console.error('Error toggling task:', err)
        }
    }

    const handleSaveTask = async (taskData) => {
        try {
            if (taskData.id) {
                const updated = await taskService.updateTask(taskData.id, taskData)
                setTasks(tasks.map(t => t.id === taskData.id ? updated : t))
            } else {
                const newTask = await taskService.createTask(taskData)
                setTasks([newTask, ...tasks])
            }
            setEditingTask(null)
        } catch (err) {
            console.error('Error saving task:', err)
            alert('Failed to save task')
        }
    }

    const handleDeleteTask = (id) => {
        const task = tasks.find(t => t.id === id)
        
        setConfirmDialog({
            isOpen: true,
            title: 'Delete Task?',
            message: `Are you sure you want to delete "${task?.title}"? This action cannot be undone.`,
            onConfirm: async () => {
                try {
                    await taskService.deleteTask(id)
                    setTasks(tasks.filter(task => task.id !== id))
                } catch (err) {
                    console.error('Error deleting task:', err)
                    alert('Failed to delete task')
                }
            }
        })
    }

    const handleSaveCategory = async (categoryData) => {
        try {
            if (categoryData.id) {
                await categoryService.updateCategory(categoryData.id, categoryData)
            } else {
                await categoryService.createCategory(categoryData)
            }
            await loadData()
        } catch (err) {
            console.error('Error saving category:', err)
            throw err
        }
    }

    const handleDeleteCategory = async (id) => {
        try {
            await categoryService.deleteCategory(id)
            await loadData()
        } catch (err) {
            if (err.response?.status === 409) {
                alert('Cannot delete category with existing tasks. Please remove or reassign tasks first.')
            } else {
                console.error('Error deleting category:', err)
                alert('Failed to delete category')
            }
            throw err
        }
    }

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = !selectedCategory || task.category?.id === selectedCategory
        return matchesSearch && matchesCategory
    })

    const activeTasks = filteredTasks.filter(t => !t.completed)
    const completedTasks = filteredTasks.filter(t => t.completed)

    if (loading) {
        return <div className="text-center py-12 text-gray-600 dark:text-gray-400">Loading...</div>
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
                    <p className="text-gray-600 mt-1 dark:text-gray-400">
                        {activeTasks.length} active · {completedTasks.length} completed
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        onClick={() => setShowCategoryModal(true)}
                        className="flex items-center gap-2"
                    >
                        <Filter size={20} />
                        Categories
                    </Button>
                    <Button
                        variant="primary"
                        className="flex items-center gap-2"
                        onClick={() => {
                            setEditingTask(null)
                            setShowTaskModal(true)
                        }}
                    >
                        <Plus size={20} />
                        Add Task
                    </Button>
                </div>
            </div>

            {/* Search & Filters */}
            <Card className="mb-6">
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                            !selectedCategory
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
                                selectedCategory === cat.id
                                    ? 'text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                            style={selectedCategory === cat.id ? { backgroundColor: cat.color } : {}}
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>
            </Card>

            {/* Tasks Lists */}
            <div className="space-y-8">
                {activeTasks.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Active Tasks</h2>
                        <TaskList
                            tasks={activeTasks}
                            onToggleTask={handleToggleTask}
                            onEditTask={(task) => {
                                setEditingTask(task)
                                setShowTaskModal(true)
                            }}
                            onDeleteTask={handleDeleteTask}
                        />
                    </div>
                )}

                {completedTasks.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Completed</h2>
                        <TaskList
                            tasks={completedTasks}
                            onToggleTask={handleToggleTask}
                            onDeleteTask={handleDeleteTask}
                        />
                    </div>
                )}

                {filteredTasks.length === 0 && (
                    <Card className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400">
                            {searchQuery || selectedCategory
                                ? 'No tasks match your filters'
                                : 'No tasks yet. Create your first task to get started!'}
                        </p>
                    </Card>
                )}
            </div>

            {/* Modals */}
            <TaskModal
                isOpen={showTaskModal}
                onClose={() => {
                    setShowTaskModal(false)
                    setEditingTask(null)
                }}
                onSave={handleSaveTask}
                task={editingTask}
            />

            <CategoryManagementModal
                isOpen={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                categories={categories}
                onSaveCategory={handleSaveCategory}
                onDeleteCategory={handleDeleteCategory}
            />

            {/* Confirmation Dialog */}
            <ConfirmDialog
                isOpen={confirmDialog.isOpen}
                onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                onConfirm={confirmDialog.onConfirm}
                title={confirmDialog.title}
                message={confirmDialog.message}
                variant="danger"
                confirmText="Delete"
            />
        </div>
    )
}