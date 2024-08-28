import { PomodoroStatus } from '@/constant'
import PomodoroButton from '..'

type ResetButtonProps = {
  onClick: () => void
}

const ResetButton = ({ onClick }: ResetButtonProps) => {
  return <PomodoroButton onClick={onClick} label={PomodoroStatus.RESET} className="text-gray-500" />
}

export default ResetButton
