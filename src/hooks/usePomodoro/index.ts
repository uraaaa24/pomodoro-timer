import { PomodoroStatus, PomodoroWorkerStatus } from '@/constant'
import { useCallback, useEffect, useRef, useState } from 'react'

const DefaultVolume = 0.4

// TODO: リファクタリングする

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
  const workerRef = useRef<Worker | null>(null)

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const handleTimerComplete = useCallback(() => {
    if (isWorkSession) {
      setPomodoroCount((count) => count + 1)
      setTimeLeft(breakTime)
    } else {
      setTimeLeft(workTime)
    }

    setIsWorkSession(!isWorkSession)
    playSound()

    if (workerRef.current) {
      workerRef.current.postMessage({
        type: PomodoroStatus.START,
        payload: { timeLeft: isWorkSession ? breakTime : workTime }
      })
    }
  }, [breakTime, isWorkSession, workTime])

  useEffect(() => {
    audioRef.current = new Audio('/sounds/schoolBell.mp3')
    audioRef.current.volume = DefaultVolume

    workerRef.current = new Worker(new URL('../../lib/worker.ts', import.meta.url))

    workerRef.current.addEventListener('message', (event) => {
      const { type, payload } = event.data

      switch (type) {
        case PomodoroWorkerStatus.TICK:
          setTimeLeft(payload.timeLeft)
          break
        case PomodoroWorkerStatus.COMPLETE:
          handleTimerComplete()
          break
      }
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }

      if (workerRef.current) {
        workerRef.current.terminate()
      }
    }
  }, [handleTimerComplete])

  const start = () => {
    if (!isActive) {
      setIsActive(true)

      if (isFirstStart.current) {
        playSound()
        isFirstStart.current = false
      }

      if (workerRef.current) {
        workerRef.current.postMessage({ type: PomodoroStatus.START, payload: { timeLeft } })
      }
    }
  }

  const stop = () => {
    setIsActive(false)
    if (workerRef.current) {
      workerRef.current.postMessage({ type: PomodoroStatus.STOP })
    }
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

    if (workerRef.current) {
      workerRef.current.postMessage({ type: PomodoroStatus.RESET, payload: { timeLeft: workTime } })
    }
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
