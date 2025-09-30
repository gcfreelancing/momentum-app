import { CheckCircle2, Circle, Clock } from 'lucide-react'

export default function TaskItem({ task, onToggle }) {
    return (
        <div
            className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md ${
                task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
            }`}
        >
            <button
                onClick={() => onToggle(task.id)}
                className="flex-shrink-0"
            >
                {task.completed ? (
                    <CheckCircle2 className="text-green-600" size={24} />
                ) : (
                    <Circle className="text-gray-400" size={24} />
                )}
            </button>

            <div className="flex-1 min-w-0">
                <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                </h3>
                {task.description && (
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} />
                <span>{task.timeSpent}m</span>
            </div>
        </div>
    )
}