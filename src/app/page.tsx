import MaximizeButton from '@/components/button/maximizeButton'
import PomodoroTimer from '@/components/pomodoroTimer'

export default function Home() {
  const today = new Date().toDateString()

  return (
    <div className="flex flex-col justify-center h-screen bg-gradient-to-br from-blue-500 to-blue-400 text-white">
      <div className="absolute top-0 right-0 p-6">
        <div className="flex gap-2 items-center">
          <div className="hidden md:block">
            <MaximizeButton />
          </div>
          {today}
        </div>
      </div>
      <PomodoroTimer />
    </div>
  )
}
