import { PomodoroStatus } from '@/constant'
import PomodoroButton from '..'

type StopButtonProps = {
  onClick: () => void
}

const StopButton = ({ onClick }: StopButtonProps) => {
  return <PomodoroButton onClick={onClick} label={PomodoroStatus.STOP} className="text-red-500" />
}

export default StopButton
