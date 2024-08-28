'use client'

import { BreakTime, WorkTime } from '@/constant'
import { usePomodoro } from '@/hooks/usePomodoro'

/**
 * A simple Pomodoro Timer
 */
const PomodoroTimer = () => {
  const { minutes, seconds, pomodoroCount, isActive, start, stop, reset } = usePomodoro(WorkTime, BreakTime)

  return (
    <div className="flex flex-col items-center mx-auto">
      <div className="text-7xl font-bold mb-8 tracking-wide">
        {minutes}:{seconds}
      </div>
      <div className="mb-4 text-xl">Pomodoros Completed: {pomodoroCount}</div>
      <div className="space-x-4">
        {isActive ? (
          <button
            onClick={stop}
            className="bg-white text-red-500 font-semibold py-2 px-6 rounded-full shadow-lg transform transition-transform hover:scale-105"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={start}
            className="bg-white text-blue-500 font-semibold py-2 px-6 rounded-full shadow-lg transform transition-transform hover:scale-105"
          >
            Start
          </button>
        )}
        <button
          onClick={reset}
          className="bg-white text-gray-500 font-semibold py-2 px-6 rounded-full shadow-lg transform transition-transform hover:scale-105"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default PomodoroTimer
