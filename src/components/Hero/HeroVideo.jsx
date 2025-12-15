'use client'

import MuxPlayer from '@mux/mux-player-react'

export default function HeroVideo() {
  return (
    <>
      {/* Video background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <MuxPlayer
          playbackId="TFvcR5p01rO02oV02mR1oUT2Oj6r5O2HCpXqID02zPqZErg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          streamType="on-demand"
          preferPlayback="mse"
          disableCookies
          className="absolute left-1/2 top-1/2 min-w-[120%] min-h-[120%] -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none" />
    </>
  )
}
