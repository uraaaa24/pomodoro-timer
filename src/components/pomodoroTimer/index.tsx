'use client'

import { useEffect, useState } from 'react'

/**
 * A simple Pomodoro Timer
 */
const PomodoroTimer = () => {
  const [workTime] = useState(25 * 60)
  const [breakTime] = useState(5 * 60)
  const [pomodoroCount, setPomodoroCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(workTime)
  const [isActive, setIsActive] = useState(false)
  const [isWorkSession, setIsWorkSession] = useState(true)

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined
    if (isActive && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      clearInterval(timerId)

      if (isWorkSession) {
        setPomodoroCount((count) => count + 1)
        setTimeLeft(breakTime)
      } else {
        setTimeLeft(workTime)
      }

      setIsWorkSession(!isWorkSession)
    }

    return () => clearInterval(timerId)
  }, [isActive, timeLeft, workTime, breakTime, isWorkSession])

  const start = () => {
    if (!isActive) {
      setIsActive(true)
    }
  }

  const stop = () => {
    setIsActive(false)
  }

  const reset = () => {
    setIsActive(false)
    setIsWorkSession(true)
    setTimeLeft(workTime)
    setPomodoroCount(0)
  }

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const seconds = String(timeLeft % 60).padStart(2, '0')

  return (
    <div className="flex flex-col items-center">
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
