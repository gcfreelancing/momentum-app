export const mockTasks = [
    {
        id: '1',
        title: 'Complete React frontend',
        description: 'Build timer and task management UI',
        completed: false,
        timeSpent: 75,
        createdAt: new Date(),
    },
    {
        id: '2',
        title: 'Setup Spring Boot backend',
        description: 'Initialize project with dependencies',
        completed: true,
        timeSpent: 50,
        createdAt: new Date(),
    },
    {
        id: '3',
        title: 'Implement authentication',
        description: 'JWT-based auth system',
        completed: false,
        timeSpent: 25,
        createdAt: new Date(),
    },
]

export const mockStats = {
    focusTime: 150, // minutos
    tasksCompleted: 8,
    sessionsCompleted: 6,
    streak: 5,
}