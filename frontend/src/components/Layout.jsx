import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Timer, CheckSquare, BarChart3, Settings, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Layout({ children }) {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const navigation = [
        { name: 'Dashboard', href: '/', icon: BarChart3 },
        { name: 'Timer', href: '/timer', icon: Timer },
        { name: 'Tasks', href: '/tasks', icon: CheckSquare },
        { name: 'Settings', href: '/settings', icon: Settings },
    ]

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-10">
                <div className="flex h-16 items-center px-6 border-b dark:border-gray-700">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                        Momentum
                    </h1>
                </div>

                <nav className="mt-8 px-3">
                    {navigation.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.href

                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all ${
                                    isActive
                                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium shadow-sm'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                            >
                                <Icon size={20} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                {/* User Info & Logout */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-sm">
                            <p className="font-medium text-gray-900 dark:text-white">{user?.username}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="ml-64">
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}