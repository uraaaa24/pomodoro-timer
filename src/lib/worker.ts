import { PomodoroStatus } from '@/constant'

const TICK_INTERVAL = 1000 // 1 second

let timer: number | null = null
let timeLeft = 0

self.addEventListener('message', (event) => {
  const { type, payload } = event.data

  switch (type) {
    case PomodoroStatus.START:
      timeLeft = payload.timeLeft

      if (!timer) {
        timer = self.setInterval(() => {
          timeLeft -= 1
          self.postMessage({ type: 'TICK', payload: { timeLeft } })

          if (timeLeft === 0) {
            self.clearInterval(timer!)
            timer = null
            self.postMessage({ type: 'COMPLETE' })
          }
        }, TICK_INTERVAL)
      }
      break

    case PomodoroStatus.STOP:
      if (timer) {
        self.clearInterval(timer)
        timer = null
      }
      break

    case PomodoroStatus.RESET:
      if (timer) {
        self.clearInterval(timer)
        timer = null
      }
      timeLeft = payload.timeLeft
      self.postMessage({ type: 'TICK', payload: { timeLeft } })
      break
  }
})
