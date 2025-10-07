import TaskItem from './TaskItem'

export default function TaskList({ tasks, onToggleTask }) {
    return (
        <div className="space-y-3 dark:background-color mt-1">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={onToggleTask} />
            ))}
        </div>
    )
}