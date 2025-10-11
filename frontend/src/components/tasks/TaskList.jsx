import TaskItem from './TaskItem'

export default function TaskList({ tasks, onToggleTask, onEditTask, onDeleteTask }) {
    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggleTask}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                />
            ))}
        </div>
    )
}