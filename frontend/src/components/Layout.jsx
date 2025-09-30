import { Link, useLocation } from 'react-router-dom'
import { Timer, CheckSquare, BarChart3, Settings } from 'lucide-react'
import React from 'react'

export default function Layout({ children }) {
    const location = useLocation()

    const navigation = [
        { name: 'Dashboard', href: '/', icon: BarChart3 },
        { name: 'Timer', href: '/timer', icon: Timer },
        { name: 'Tasks', href: '/tasks', icon: CheckSquare },
        { name: 'Settings', href: '/settings', icon: Settings },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-10">
                <div className="flex h-16 items-center px-6">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
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
                                        ? 'bg-primary-50 text-primary-700 font-medium shadow-sm'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <Icon size={20} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                    <div className="text-sm text-gray-600">
                        <p className="font-medium">Demo Mode</p>
                        <p className="text-xs text-gray-500 mt-1">Backend coming soon</p>
                    </div>
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