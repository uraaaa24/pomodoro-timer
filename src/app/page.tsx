import PomodoroTimer from '@/components/pomodoroTimer'

export default function Home() {
  const today = new Date().toDateString()

  return (
    <div className="flex flex-col justify-center h-screen bg-gradient-to-br from-blue-500 to-blue-400 text-white">
      <div className="absolute top-0 right-0 p-6">{today}</div>
      <PomodoroTimer />
    </div>
  )
}
