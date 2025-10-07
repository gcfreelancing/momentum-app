import { useEffect, useState } from 'react'
import { BarChart3, Clock, CheckCircle, Flame } from 'lucide-react'
import Card from '../components/ui/Card'
import { timerService } from '../services/timerService'
import { taskService } from '../services/taskService'

export default function Dashboard() {
    const [stats, setStats] = useState({
        focusTime: 0,
        tasksCompleted: 0,
        sessionsCompleted: 0,
        streak: 5
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadStats()
    }, [])

    const loadStats = async () => {
        try {
            setLoading(true)

            // Buscar sessions de hoje
            const todaySessions = await timerService.getTodaySessions()
            const completedSessions = todaySessions.filter(s => s.completed)

            // Calcular tempo focado (em minutos)
            const focusTime = completedSessions.reduce((sum, s) => sum + s.durationMinutes, 0)

            // Buscar tasks completadas
            const completedTasks = await taskService.getTasksByStatus(true)

            setStats({
                focusTime,
                tasksCompleted: completedTasks.length,
                sessionsCompleted: completedSessions.length,
                streak: 5 // TODO: calcular streak real
            })
        } catch (err) {
            console.error('Error loading stats:', err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div className="text-center py-12 text-gray-600 dark:text-gray-400">Loading...</div>
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Track your productivity and progress</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                {/* Card 1 - Today's Focus */}
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500 rounded-lg">
                            <Clock className="text-white" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-blue-700 dark:text-blue-300">Today's Focus</p>
                            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                                {Math.floor(stats.focusTime / 60)}h {stats.focusTime % 60}m
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Card 2 - Tasks Done */}
                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500 rounded-lg">
                            <CheckCircle className="text-white" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-green-700 dark:text-green-300">Tasks Done</p>
                            <p className="text-2xl font-bold text-green-900 dark:text-green-100">{stats.tasksCompleted}</p>
                        </div>
                    </div>
                </Card>

                {/* Card 3 - Sessions */}
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500 rounded-lg">
                            <BarChart3 className="text-white" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-purple-700 dark:text-purple-300">Sessions</p>
                            <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{stats.sessionsCompleted}</p>
                        </div>
                    </div>
                </Card>

                {/* Card 4 - Streak */}
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-500 rounded-lg">
                            <Flame className="text-white" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-orange-700 dark:text-orange-300">Streak</p>
                            <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{stats.streak} days</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Weekly Progress</h2>
                    <div className="space-y-3">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                            <div key={day} className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-600 w-12 dark:text-gray-400">{day}</span>
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all"
                                        style={{ width: `${Math.random() * 100}%` }}
                                    />
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">{Math.floor(Math.random() * 180)}m</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Recent Activity</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Completed "Setup Spring Boot backend"</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Started focus session (25 min)</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">3 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-orange-600 rounded-full mt-2" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Reached 5-day streak! 🔥</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Today</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}