export const WorkTime = 25 * 60
export const BreakTime = 5 * 60

export const PomodoroStatus = {
  START: {
    label: 'Start',
    color: 'text-blue-500'
  },
  STOP: {
    label: 'Stop',
    color: 'text-red-500'
  },
  RESET: {
    label: 'Reset',
    color: 'text-gray-500'
  }
} as const
export type PomodoroStatus = (typeof PomodoroStatus)[keyof typeof PomodoroStatus]
