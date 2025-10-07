import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import TaskList from '../components/tasks/TaskList'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { taskService } from '../services/taskService'

export default function Tasks() {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)

    // Carregar tasks do backend ao montar
    useEffect(() => {
        loadTasks()
    }, [])

    const loadTasks = async () => {
        try {
            setLoading(true)
            const data = await taskService.getAllTasks()
            setTasks(data)
        } catch (err) {
            console.error('Error loading tasks:', err)
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

    const handleCreateTask = async () => {
        const title = prompt('Task title:')
        if (!title) return

        try {
            const newTask = await taskService.createTask({
                title,
                description: '',
                completed: false
            })
            setTasks([newTask, ...tasks])
        } catch (err) {
            console.error('Error creating task:', err)
        }
    }

    const activeTasks = tasks.filter(t => !t.completed)
    const completedTasks = tasks.filter(t => t.completed)

    if (loading) {
        return <div className="text-center py-12 text-gray-600 dark:text-gray-400">Loading...</div>
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
                    <p className="text-gray-600 mt-1 dark:text-gray-400">{activeTasks.length} active · {completedTasks.length} completed</p>
                </div>
                <Button
                    variant="primary"
                    className="flex items-center gap-2"
                    onClick={handleCreateTask}
                >
                    <Plus size={20} />
                    Add Task
                </Button>
            </div>

            <div className="space-y-8">
                {activeTasks.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Active Tasks</h2>
                        <TaskList tasks={activeTasks} onToggleTask={handleToggleTask} />
                    </div>
                )}

                {completedTasks.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Completed</h2>
                        <TaskList tasks={completedTasks} onToggleTask={handleToggleTask} />
                    </div>
                )}

                {tasks.length === 0 && (
                    <Card className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-400">No tasks yet. Create your first task to get started!</p>
                    </Card>
                )}
            </div>
        </div>
    )
}