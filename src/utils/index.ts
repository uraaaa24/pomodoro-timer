import { PomodoroStatus } from '@/constant'

/**
 * Get the color of the status
 *
 * @param status - The status of the Pomodoro Timer
 * @returns The color of the status (tailwindcss color class)
 */
export const getStatusColor = (status: PomodoroStatus) => {
  switch (status) {
    case PomodoroStatus.START:
      return 'text-blue-500'
    case PomodoroStatus.STOP:
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}
