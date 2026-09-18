import React, { useRef, useEffect, useState, useCallback, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import HUD from './HUD'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const BEATS = [
  { id: 'establish',   title: 'A room with samples.',         sub: 'Material samples arranged on shelves. Light waits.',                           hint: 'Scroll to enter the workshop.' },
  { id: 'approach',    title: 'Focus on the glass.',          sub: 'The central specimen. Roughness, tint, refraction — one material, many properties.', hint: 'Move closer.' },
  { id: 'reveal',      title: 'Light passes through.',        sub: 'Open the aperture. The glass, the light cone and the floor respond together.',    hint: 'Drag the ring. Arrow keys work too.' },
  { id: 'participate', title: 'One control. Every material.',  sub: 'Keycap shadow shifts. Neumorphism relief changes. Glass adjusts. One gesture.',    hint: 'Every sample shares the same light.' },
  { id: 'scale',       title: 'Inside the token.',            sub: 'Shadow-depth, relief, surface color — the macro view explains.',                 hint: 'See what the token does.' },
  { id: 'resolve',     title: 'Your configuration.',          sub: 'Copy the CSS. Revisit a detail. Or leave the scene.',                           hint: 'The experience serves the task.' },
]

export default function App() {
  const scrollRef = useRef(null)
  const [beat, setBeat] = useState(0)
  const [progress, setProgress] = useState(0)
  const [aperture, setAperture] = useState(0.5)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Scroll progress tracking
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress
        setProgress(p)
        setBeat(Math.min(BEATS.length - 1, Math.floor(p * BEATS.length)))
      },
    })

    return () => st.kill()
  }, [])

  // Reduced motion
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handleAperture = useCallback((v) => {
    setAperture(Math.max(0, Math.min(1, v)))
  }, [])

  return (
    <div className="workshop">
      {/* 3D Canvas — fixed behind scroll */}
      <div className="canvas-wrap">
        <Canvas
          shadows={{ type: THREE.PCFShadowMap }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          camera={{ fov: 35, near: 0.1, far: 100, position: [0, 1.2, 6] }}
          style={{ background: '#08080f' }}
        >
          <Suspense fallback={null}>
            <Scene
              progress={progress}
              aperture={aperture}
              beat={beat}
              reducedMotion={reducedMotion}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Scroll rail */}
      <div ref={scrollRef} className="scroll-rail" />

      {/* HUD overlay */}
      <HUD
        beat={BEATS[beat]}
        beatIndex={beat}
        beats={BEATS}
        aperture={aperture}
        onAperture={handleAperture}
        progress={progress}
        reducedMotion={reducedMotion}
        onToggleMotion={() => setReducedMotion(r => !r)}
      />
    </div>
  )
}
