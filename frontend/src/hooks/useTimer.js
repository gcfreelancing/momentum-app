import { useState, useEffect, useRef, useCallback } from 'react'

export function useTimer(initialMinutes = 25) {
    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60)
    const [timerState, setTimerState] = useState('idle')
    const intervalRef = useRef(null)

    const start = useCallback(() => {
        setTimerState('running')
    }, [])

    const pause = useCallback(() => {
        setTimerState('paused')
    }, [])

    const reset = useCallback(() => {
        setTimerState('idle')
        setTimeLeft(initialMinutes * 60)
    }, [initialMinutes])

    useEffect(() => {
        if (timerState === 'running') {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setTimerState('idle')
                        return initialMinutes * 60
                    }
                    return prev - 1
                })
            }, 1000)
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [timerState, initialMinutes])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    return {
        timeLeft,
        timerState,
        formattedTime: formatTime(timeLeft),
        start,
        pause,
        reset,
    }
}