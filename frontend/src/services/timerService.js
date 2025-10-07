import api from './api'

export const timerService = {
    startSession: async (session) => {
        const response = await api.post('/timer/start', session)
        return response.data
    },

    completeSession: async (id) => {
        const response = await api.patch(`/timer/${id}/complete`)
        return response.data
    },

    getAllSessions: async () => {
        const response = await api.get('/timer/sessions')
        return response.data
    },

    getTodaySessions: async () => {
        const response = await api.get('/timer/sessions/today')
        return response.data
    },

    getSessionById: async (id) => {
        const response = await api.get(`/timer/sessions/${id}`)
        return response.data
    }
}