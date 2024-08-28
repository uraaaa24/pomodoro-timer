import PomodoroTimer from '@/components/pomodoroTimer'

export default function Home() {
  return (
    <div className="flex flex-col justify-center h-screen bg-gradient-to-br from-blue-500 to-blue-400 text-white">
      <PomodoroTimer />
    </div>
  )
}
