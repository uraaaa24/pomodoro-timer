import { PomodoroStatus } from '@/constant'

type PomodoroButtonProps = {
  onClick: () => void
  status: PomodoroStatus
}

/**
 * A button for the Pomodoro Timer
 *
 * @param onClick - The function to call when the button is clicked
 * @param status - The status of the button
 */
const PomodoroButton = ({ onClick, status }: PomodoroButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white ${status.color} font-semibold py-2 px-6 rounded-full shadow-lg transform transition-transform hover:scale-105`}
    >
      {status.label}
    </button>
  )
}

export default PomodoroButton
