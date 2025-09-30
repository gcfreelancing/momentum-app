import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export default function Settings() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-1">Customize your Momentum experience</p>
            </div>

            <div className="max-w-2xl space-y-6">
                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Timer Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Work Duration (minutes)
                            </label>
                            <input
                                type="number"
                                defaultValue={25}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Short Break (minutes)
                            </label>
                            <input
                                type="number"
                                defaultValue={5}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Long Break (minutes)
                            </label>
                            <input
                                type="number"
                                defaultValue={15}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </Card>

                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600" />
                            <span className="text-gray-700">Enable desktop notifications</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600" />
                            <span className="text-gray-700">Play sound on timer completion</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 text-primary-600" />
                            <span className="text-gray-700">Remind me to take breaks</span>
                        </label>
                    </div>
                </Card>

                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h2>
                    <div className="space-y-3">
                        <label className="block">
                            <span className="block text-sm font-medium text-gray-700 mb-2">Theme</span>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                                <option>Light</option>
                                <option>Dark</option>
                                <option>System</option>
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