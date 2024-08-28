export const WorkTime = 25 * 60
export const BreakTime = 5 * 60

export const PomodoroStatus = {
  START: 'Start',
  STOP: 'Stop',
  RESET: 'Reset'
} as const
export type PomodoroStatus = (typeof PomodoroStatus)[keyof typeof PomodoroStatus]
