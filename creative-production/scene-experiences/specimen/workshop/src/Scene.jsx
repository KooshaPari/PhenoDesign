import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment, ContactShadows, Float, Text } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import * as THREE from 'three'

/* ── beat camera presets ───────────────────────────────── */
const CAMERA_PRESETS = [
  { pos: [0, 1.6, 7.5],  look: [0, 0.8, 0] },    // 0 establish — wide
  { pos: [0, 1.2, 4.0],  look: [0, 0.9, 0] },    // 1 approach — glass
  { pos: [0.4, 1.3, 2.8], look: [0, 0.9, 0] },   // 2 reveal — close with aperture
  { pos: [0, 1.4, 4.2],  look: [0, 0.8, 0] },    // 3 participate — all materials
  { pos: [-1.6, 1.0, 0.8], look: [-1.6, 0.9, 0] }, // 4 scale — keycap macro
  { pos: [0, 1.8, 5.5],  look: [0, 0.8, 0] },    // 5 resolve — wide pullback
]

function easeInOut(t) { return t * t * (3 - 2 * t) }
function mix(a, b, t) { return a + (b - a) * t }
function mixV3(a, b, t) { return [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)] }

/* ── Glass specimen ────────────────────────────────────── */
function Glass({ aperture }) {
  const matRef = useRef()
  useFrame(() => {
    if (matRef.current) {
      matRef.current.opacity = mix(0.15, 0.85, aperture)
      matRef.current.transmission = mix(0.5, 0.95, aperture)
      matRef.current.roughness = mix(0.05, 0.3, 1 - aperture)
      matRef.current.thickness = mix(0.1, 0.5, aperture)
    }
  })
  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh position={[0, 0.9, 0]} castShadow>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshPhysicalMaterial
          ref={matRef}
          color="#7eb8da"
          metalness={0}
          roughness={0.15}
          transmission={0.9}
          thickness={0.3}
          ior={1.45}
          attenuationColor="#7eb8da"
          attenuationDistance={1.2}
          envMapIntensity={1.2}
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* Inner core — visible through glass */}
      <mesh position={[0, 0.9, 0]}>
        <octahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.4} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  )
}

/* ── Keycap ────────────────────────────────────────────── */
function Keycap({ position, aperture, scale = 1 }) {
  const shadowRef = useRef()
  useFrame(() => {
    if (shadowRef.current) {
      shadowRef.current.position.y = -0.38 + aperture * 0.02
    }
  })
  const sd = mix(1, 8, aperture) * scale
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Shadow plane */}
      <mesh ref={shadowRef} position={[0, -0.38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.3 + sd * 0.02, 32]} />
        <meshBasicMaterial color="#000" transparent opacity={mix(0.1, 0.4, aperture)} />
      </mesh>
      {/* Keycap body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.12, 0.5]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.1} roughness={0.6} />
      </mesh>
      {/* Keycap top relief */}
      <mesh position={[0, 0.061, 0]} castShadow>
        <boxGeometry args={[0.42 - mix(0, 0.08, aperture), 0.01, 0.42 - mix(0, 0.08, aperture)]} />
        <meshStandardMaterial color="#2a2a4e" metalness={0.1} roughness={0.7} />
      </mesh>
    </group>
  )
}

/* ── Neumorphism block ─────────────────────────────────── */
function Neumorphism({ position, aperture }) {
  const lightShadowRef = useRef()
  const darkShadowRef = useRef()
  useFrame(() => {
    if (lightShadowRef.current && darkShadowRef.current) {
      const offset = mix(1, 6, aperture)
      lightShadowRef.current.position.set(-offset, -offset, -0.01)
      darkShadowRef.current.position.set(offset, offset, -0.01)
    }
  })
  return (
    <group position={position}>
      {/* Light shadow */}
      <mesh ref={lightShadowRef} position={[-3, -3, -0.01]}>
        <boxGeometry args={[0.55, 0.55, 0.04]} />
        <meshStandardMaterial color="#3a3a5e" />
      </mesh>
      {/* Dark shadow */}
      <mesh ref={darkShadowRef} position={[3, 3, -0.01]}>
        <boxGeometry args={[0.55, 0.55, 0.04]} />
        <meshStandardMaterial color="#0a0a14" />
      </mesh>
      {/* Surface */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.5, 0.05]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.05} roughness={0.85} />
      </mesh>
    </group>
  )
}

/* ── Polygon specimen ──────────────────────────────────── */
function Polygon({ position, aperture }) {
  const matRef = useRef()
  useFrame(() => {
    if (matRef.current) {
      matRef.current.opacity = mix(0.4, 1.0, aperture)
      matRef.current.emissiveIntensity = mix(0.1, 0.8, aperture)
    }
  })
  return (
    <mesh position={position} rotation={[0, aperture * Math.PI * 0.5, 0]} castShadow>
      <torusKnotGeometry args={[0.18, 0.06, 64, 8]} />
      <meshStandardMaterial
        ref={matRef}
        color="#4a4a6e"
        emissive="#7eb8da"
        emissiveIntensity={0.3}
        metalness={0.9}
        roughness={0.1}
        wireframe={false}
      />
    </mesh>
  )
}

/* ── Aperture ring (interactive) ───────────────────────── */
function ApertureRing({ aperture, visible, onChange }) {
  const groupRef = useRef()
  const dragging = useRef(false)
  const startY = useRef(0)
  const startVal = useRef(0)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = -aperture * Math.PI * 1.5 + Math.PI * 0.25
      // Subtle pulse
      const pulse = 1 + Math.sin(clock.elapsedTime * 2) * 0.01
      groupRef.current.scale.setScalar(pulse)
    }
  })

  React.useEffect(() => {
    if (!groupRef.current) return
    const el = groupRef.current.children[0]?.children[0] // inner ring mesh
    if (!el) return
    const onDown = (e) => {
      dragging.current = true
      startY.current = e.clientY ?? e.touches?.[0]?.clientY ?? 0
      startVal.current = aperture
      e.stopPropagation?.()
    }
    const onMove = (e) => {
      if (!dragging.current) return
      const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0
      const dy = startY.current - y
      const delta = dy / 200
      onChange(Math.max(0, Math.min(1, startVal.current + delta)))
    }
    const onUp = () => { dragging.current = false }
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [aperture, onChange])

  if (!visible) return null

  return (
    <group ref={groupRef} position={[0, -0.8, 1.5]}>
      <mesh>
        <ringGeometry args={[0.35, 0.42, 48]} />
        <meshStandardMaterial color="#7eb8da" emissive="#7eb8da" emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh>
        <ringGeometry args={[0.38, 0.395, 48]} />
        <meshStandardMaterial color="#0d0d1a" />
      </mesh>
      {/* Drag handle */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#7eb8da" emissive="#7eb8da" emissiveIntensity={1} />
      </mesh>
    </group>
  )
}

/* ── Workshop floor + back wall ────────────────────────── */
function Environment_() {
  return (
    <>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0d0d1a" metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 1.5, -3]} receiveShadow>
        <planeGeometry args={[20, 8]} />
        <meshStandardMaterial color="#111122" metalness={0.1} roughness={0.8} />
      </mesh>
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0a0a14" />
      </mesh>
    </>
  )
}

/* ── Shelves ───────────────────────────────────────────── */
function Shelves({ visible }) {
  if (!visible) return null
  const shelfMat = <meshStandardMaterial color="#2a2a4e" metalness={0.2} roughness={0.7} />
  return (
    <group>
      {/* Left shelf */}
      <mesh position={[-2.5, 0.3, -1.5]} castShadow receiveShadow>{shelfMat}<boxGeometry args={[1.5, 0.04, 0.6]} /></mesh>
      {/* Right shelf */}
      <mesh position={[2.5, 0.3, -1.5]} castShadow receiveShadow>{shelfMat}<boxGeometry args={[1.5, 0.04, 0.6]} /></mesh>
      {/* Shelf supports */}
      {[-3.0, -2.0].map((x, i) => (
        <mesh key={`l${i}`} position={[x, 0, -1.5]}>{shelfMat}<boxGeometry args={[0.04, 0.6, 0.6]} /></mesh>
      ))}
      {[2.0, 3.0].map((x, i) => (
        <mesh key={`r${i}`} position={[x, 0, -1.5]}>{shelfMat}<boxGeometry args={[0.04, 0.6, 0.6]} /></mesh>
      ))}
    </group>
  )
}

/* ── Light cone (visible beam) ─────────────────────────── */
function LightCone({ aperture, beat }) {
  const matRef = useRef()
  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.opacity = aperture * 0.12 * (0.8 + Math.sin(clock.elapsedTime * 3) * 0.2)
    }
  })
  if (beat < 1 || beat > 3) return null
  return (
    <group position={[0, 3.5, 0]} rotation={[Math.PI, 0, 0]}>
      <mesh ref={matRef} position={[0, 1.2, 0]}>
        <coneGeometry args={[0.5 + aperture * 1.5, 4, 32, 1, true]} />
        <meshBasicMaterial color="#7eb8da" transparent opacity={0.08} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  )
}

/* ── Scene labels (3D text) ────────────────────────────── */
function SceneLabel({ visible, position, text, color = '#8888aa', size = 0.08 }) {
  if (!visible) return null
  return (
    <Text position={position} fontSize={size} color={color} anchorX="center" anchorY="middle" font="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.woff">
      {text}
    </Text>
  )
}

/* ── Camera rig ────────────────────────────────────────── */
function CameraRig({ progress, reducedMotion }) {
  const { camera } = useThree()
  useFrame(() => {
    const idx = Math.min(5, Math.floor(progress * 6))
    const local = progress === 1 ? 1 : progress * 6 - idx
    const t = reducedMotion ? 1 : easeInOut(Math.min(1, local / 0.8))

    const a = CAMERA_PRESETS[idx]
    const b = CAMERA_PRESETS[Math.min(5, idx + 1)]
    const pos = mixV3(a.pos, b.pos, t)
    const look = mixV3(a.look, b.look, t)

    // Subtle parallax sway
    if (!reducedMotion) {
      const t2 = Date.now() * 0.0003
      pos[0] += Math.sin(t2) * 0.05
      pos[1] += Math.cos(t2 * 0.7) * 0.03
    }

    camera.position.set(pos[0], pos[1], pos[2])
    camera.lookAt(look[0], look[1], look[2])
  })
  return null
}

/* ── Main Scene ────────────────────────────────────────── */
export default function Scene({ progress, aperture, beat, reducedMotion }) {
  const onApertureChange = (v) => {
    // Bubble up via window event — HUD handles state
    window.dispatchEvent(new CustomEvent('pd:aperture', { detail: v }))
  }

  const visibilityFor = (beatId) => {
    if (beatId === 'shelves') return beat === 0 || beat === 5
    if (beatId === 'keycap') return beat === 0 || beat === 3 || beat === 5
    if (beatId === 'neumorphism') return beat === 0 || beat === 3 || beat === 5
    if (beatId === 'polygon') return beat === 0 || beat === 3 || beat === 5
    if (beatId === 'glass') return beat !== 4
    if (beatId === 'keycap-macro') return beat === 4
    return true
  }

  return (
    <>
      <CameraRig progress={progress} reducedMotion={reducedMotion} />

      {/* Lighting */}
      <ambientLight intensity={0.15} color="#4a4a6e" />
      <directionalLight
        position={[3, 5, 2]}
        intensity={1.2 + aperture * 1.5}
        color="#fff5e1"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <pointLight position={[-2, 2, 1]} intensity={0.4} color="#7eb8da" />
      <pointLight position={[2, 1, 1]} intensity={aperture * 0.6} color="#a78bfa" />
      <spotLight
        position={[0, 4, 0]}
        angle={0.3 + aperture * 0.4}
        penumbra={0.5}
        intensity={aperture * 2}
        color="#7eb8da"
        castShadow
      />

      {/* HDR environment for PBR reflections */}
      <Environment preset="studio" environmentIntensity={0.4} />

      {/* Environment geometry */}
      <Environment_ />
      <Shelves visible={visibilityFor('shelves')} />

      {/* Specimens */}
      {visibilityFor('glass') && <Glass aperture={aperture} />}
      {visibilityFor('keycap') && <Keycap position={[-1.8, 0, 0]} aperture={aperture} />}
      {visibilityFor('neumorphism') && <Neumorphism position={[1.8, 0.35, 0]} aperture={aperture} />}
      {visibilityFor('polygon') && <Polygon position={[0, 1.8, -1.5]} aperture={aperture} />}
      {visibilityFor('keycap-macro') && <Keycap position={[-1.6, 0.9, 0]} aperture={aperture} scale={3} />}

      {/* Light cone */}
      <LightCone aperture={aperture} beat={beat} />

      {/* Aperture control — visible beats 2-3 */}
      <ApertureRing aperture={aperture} visible={beat >= 1 && beat <= 3} onChange={onApertureChange} />

      {/* Contact shadows */}
      <ContactShadows position={[0, -0.39, 0]} opacity={0.6} scale={10} blur={2.5} far={4} />

      {/* 3D Labels */}
      <SceneLabel visible={visibilityFor('glass') && beat === 1} position={[0, 0.1, 0]} text="glass" size={0.06} />
      <SceneLabel visible={visibilityFor('keycap')} position={[-1.8, -0.25, 0]} text="keycap" size={0.05} />
      <SceneLabel visible={visibilityFor('neumorphism')} position={[1.8, -0.05, 0]} text="neumorphism" size={0.05} />
      <SceneLabel visible={visibilityFor('polygon')} position={[0, 2.1, -1.5]} text="polygon" size={0.05} />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom intensity={0.3 + aperture * 0.4} luminanceThreshold={0.6} luminanceSmoothing={0.4} mipmapBlur />
        <Vignette eskil={false} offset={0.3} darkness={0.5} />
        <ToneMapping />
      </EffectComposer>
    </>
  )
}
