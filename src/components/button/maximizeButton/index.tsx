'use client'

import { Maximize2 } from 'lucide-react'

/**
 * A button to maximize the window
 */
const MaximizeButton = () => {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  return (
    <button
      onClick={toggleFullscreen}
      className="font-semibold p-2 rounded-full transform transition-transform hover:scale-105"
    >
      <Maximize2 className="w-6 h-6 inline-block" />
    </button>
  )
}

export default MaximizeButton
