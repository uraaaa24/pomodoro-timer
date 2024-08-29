'use client'

import ResetButton from '@/components/button/statusButton/resetButton'
import StartButton from '@/components/button/statusButton/startButton'
import StopButton from '@/components/button/statusButton/stopButton'
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
        {isActive ? <StopButton onClick={stop} /> : <StartButton onClick={start} />}
        <ResetButton onClick={reset} />
      </div>
    </div>
  )
}

export default PomodoroTimer
