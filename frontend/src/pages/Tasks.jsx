import { useState } from 'react'
import { Plus } from 'lucide-react'
import TaskList from '../components/tasks/TaskList'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { mockTasks } from '../utils/mockData'

export default function Tasks() {
    const [tasks, setTasks] = useState(mockTasks)

    const handleToggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ))
    }

    const activeTasks = tasks.filter(t => !t.completed)
    const completedTasks = tasks.filter(t => t.completed)

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
                    <p className="text-gray-600 mt-1">{activeTasks.length} active · {completedTasks.length} completed</p>
                </div>
                <Button variant="primary" className="flex items-center gap-2">
                    <Plus size={20} />
                    Add Task
                </Button>
            </div>

            <div className="space-y-8">
                {activeTasks.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Tasks</h2>
                        <TaskList tasks={activeTasks} onToggleTask={handleToggleTask} />
                    </div>
                )}

                {completedTasks.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Completed</h2>
                        <TaskList tasks={completedTasks} onToggleTask={handleToggleTask} />
                    </div>
                )}

                {tasks.length === 0 && (
                    <Card className="text-center py-12">
                        <p className="text-gray-600">No tasks yet. Create your first task to get started!</p>
                    </Card>
                )}
            </div>
        </div>
    )
}