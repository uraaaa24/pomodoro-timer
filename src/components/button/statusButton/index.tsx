type PomodoroButtonProps = {
  onClick: () => void
  label: string
  className?: string
}

/**
 * A button for the Pomodoro Timer
 *
 * @param onClick - The function to call when the button is clicked
 * @param status - The status of the button
 */
const PomodoroButton = ({ onClick, label, className }: PomodoroButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white font-semibold py-2 px-6 rounded-full shadow-lg transform transition-transform hover:scale-105 ${className}`}
    >
      {label}
    </button>
  )
}

export default PomodoroButton
