import api from './api'

export const taskService = {
    // GET todas as tasks
    getAllTasks: async () => {
        const response = await api.get('/tasks')
        return response.data
    },

    // GET task por ID
    getTaskById: async (id) => {
        const response = await api.get(`/tasks/${id}`)
        return response.data
    },

    // POST criar task
    createTask: async (task) => {
        const response = await api.post('/tasks', task)
        return response.data
    },

    // PUT atualizar task
    updateTask: async (id, task) => {
        const response = await api.put(`/tasks/${id}`, task)
        return response.data
    },

    // PATCH toggle complete
    toggleTask: async (id) => {
        const response = await api.patch(`/tasks/${id}/toggle`)
        return response.data
    },

    // DELETE apagar task
    deleteTask: async (id) => {
        await api.delete(`/tasks/${id}`)
    },

    // GET tasks por categoria
    getTasksByCategory: async (categoryId) => {
        const response = await api.get(`/tasks/category/${categoryId}`)
        return response.data
    },

    // GET tasks por status
    getTasksByStatus: async (completed) => {
        const response = await api.get(`/tasks/status/${completed}`)
        return response.data
    }
}