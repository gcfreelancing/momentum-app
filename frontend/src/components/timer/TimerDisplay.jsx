import { Play, Pause, RotateCcw } from 'lucide-react'
import Button from '../ui/Button'

export default function TimerDisplay({
                                         formattedTime,
                                         timerState,
                                         onStart,
                                         onPause,
                                         onReset,
                                     }) {
    return (
        <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-2xl p-12 text-center">
                <div className="text-7xl font-mono font-bold text-white mb-8 tracking-tight">
                    {formattedTime}
                </div>

                <div className="flex gap-4 justify-center">
                    {timerState !== 'running' ? (
                        <Button
                            variant="secondary"
                            onClick={onStart}
                            className="flex items-center gap-2 text-lg px-8 py-3"
                        >
                            <Play size={24} />
                            Start
                        </Button>
                    ) : (
                        <Button
                            variant="secondary"
                            onClick={onPause}
                            className="flex items-center gap-2 text-lg px-8 py-3"
                        >
                            <Pause size={24} />
                            Pause
                        </Button>
                    )}

                    <Button
                        variant="secondary"
                        onClick={onReset}
                        className="flex items-center gap-2 px-6 py-3"
                    >
                        <RotateCcw size={20} />
                    </Button>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                    <div className="flex justify-around text-white/80 text-sm">
                        <div>
                            <p className="font-medium">Work</p>
                            <p className="text-2xl font-bold text-white mt-1">25m</p>
                        </div>
                        <div>
                            <p className="font-medium">Break</p>
                            <p className="text-2xl font-bold text-white mt-1">5m</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}