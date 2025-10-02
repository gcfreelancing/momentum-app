import TimerDisplay from '../components/timer/TimerDisplay'
import { useTimer } from '../hooks/useTimer'
import Card from '../components/ui/Card'

export default function Timer() {
    const { formattedTime, timerState, start, pause, reset } = useTimer(25)

    return (
        <div>
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pomodoro Timer</h1>
                <p className="text-gray-600 mt-1 dark:text-white">Focus for 25 minutes, then take a break</p>
            </div>

            <TimerDisplay
                formattedTime={formattedTime}
                timerState={timerState}
                onStart={start}
                onPause={pause}
                onReset={reset}
            />

            <div className="mt-12 max-w-2xl mx-auto">
                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Quick Tips</h2>
                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-primary-600 font-bold">•</span>
                            <span className=" dark:text-white">Work in 25-minute focused sessions</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-600 font-bold">•</span>
                            <span className=" dark:text-white">Take a 5-minute break after each session</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-600 font-bold">•</span>
                            <span className=" dark:text-white">Take a longer 15-minute break after 4 sessions</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-600 font-bold">•</span>
                            <span className=" dark:text-white">Eliminate distractions during work sessions</span>
                        </li>
                    </ul>
                </Card>
            </div>
        </div>
    )
}