import { useEffect, useState } from 'react'

/**
 * Custom hook to manage a pomodoro timer
 *
 * @param initialWorkTime
 * @param initialBreakTime
 */
export const usePomodoro = (initialWorkTime: number, initialBreakTime: number) => {
  const [workTime] = useState(initialWorkTime)
  const [breakTime] = useState(initialBreakTime)
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

  return {
    minutes,
    seconds,
    isActive,
    pomodoroCount,
    start,
    stop,
    reset
  }
}
