import { PomodoroStatus } from '@/constant'
import PomodoroButton from '..'

type StartButtonProps = {
  onClick: () => void
}

const StartButton = ({ onClick }: StartButtonProps) => {
  return <PomodoroButton onClick={onClick} label={PomodoroStatus.START} className="text-green-500" />
}

export default StartButton
