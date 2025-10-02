import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useTheme } from '../context/ThemeContext'

export default function Settings() {
    const { theme, setTheme } = useTheme()

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Customize your Momentum experience</p>
            </div>

            <div className="max-w-2xl space-y-6">
                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Timer Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Work Duration (minutes)
                            </label>
                            <input
                                type="number"
                                defaultValue={25}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Short Break (minutes)
                            </label>
                            <input
                                type="number"
                                defaultValue={5}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Long Break (minutes)
                            </label>
                            <input
                                type="number"
                                defaultValue={15}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </Card>

                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notifications</h2>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600" />
                            <span className="text-gray-700 dark:text-gray-300">Enable desktop notifications</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600" />
                            <span className="text-gray-700 dark:text-gray-300">Play sound on timer completion</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 text-primary-600" />
                            <span className="text-gray-700 dark:text-gray-300">Remind me to take breaks</span>
                        </label>
                    </div>
                </Card>

                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
                    <div className="space-y-3">
                        <label className="block">
                            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</span>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="system">System</option>
                            </select>
                        </label>
                    </div>
                </Card>

                <div className="flex gap-4">
                    <Button variant="primary">Save Changes</Button>
                    <Button variant="secondary">Reset to Defaults</Button>
                </div>
            </div>
        </div>
    )
}