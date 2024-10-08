import { useEffect, useRef, useState } from 'react'

const DefaultVolume = 0.4

// TODO: Web Workerを使ってタイマーを実装する

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

  const isFirstStart = useRef(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('/sounds/schoolBell.mp3')
    audioRef.current.volume = DefaultVolume

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

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
      playSound()
    }

    return () => clearInterval(timerId)
  }, [isActive, timeLeft, workTime, breakTime, isWorkSession])

  const start = () => {
    if (!isActive) {
      setIsActive(true)

      if (isFirstStart.current) {
        playSound()
        isFirstStart.current = false
      }
    }
  }

  const stop = () => {
    setIsActive(false)
  }

  const reset = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    setIsActive(false)
    setIsWorkSession(true)
    setTimeLeft(workTime)
    setPomodoroCount(0)
    isFirstStart.current = true
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
