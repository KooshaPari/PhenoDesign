import React, { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import {
  Environment,
  ContactShadows,
  Lightformer,
  RoundedBox,
  MeshReflectorMaterial,
  GradientTexture,
} from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, ToneMapping } from '@react-three/postprocessing'
import * as THREE from 'three'

/* ─── motion helpers ─────────────────────────────────────── */
const easeInOut = (t) => t * t * (3 - 2 * t)
const mix = (a, b, t) => a + (b - a) * t
const mixV3 = (a, b, t) => [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)]

/* ─── palette ────────────────────────────────────────────── */
const C = {
  cyan: '#7eb8da',
  violet: '#a78bfa',
  cyanDeep: '#2b6f96',
  surface: '#20203a',
  surfaceHi: '#2e2e50',
  wall: '#14142a',
  floor: '#0e0e1c',
  warm: '#ffe9c8',
}

/* ─── camera presets: one per beat ───────────────────────── */
const CAM = [
  { pos: [0, 1.45, 4.7], look: [0, 0.42, 0] },      // 0 establish — hero row
  { pos: [0, 1.15, 2.75], look: [0, 0.62, 0] },     // 1 approach — glass
  { pos: [0.45, 1.2, 2.25], look: [0, 0.6, 0] },    // 2 reveal — aperture
  { pos: [0, 1.5, 4.4], look: [0, 0.5, 0] },        // 3 participate — all three
  { pos: [-1.5, 0.95, 0.95], look: [-1.5, 0.75, 0] }, // 4 scale — keycap macro
  { pos: [0, 1.6, 5.4], look: [0, 0.45, 0] },       // 5 resolve — pull back
]

/* ─── studio shell ───────────────────────────────────────── */
function Studio({ aperture }) {
  return (
    <>
      {/* Reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={512}
          mixBlur={1}
          mixStrength={18}
          roughness={0.85}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color={C.floor}
          metalness={0.55}
          mirror={0.45}
        />
      </mesh>

      {/* Cyclorama — curved backdrop with a vertical gradient */}
      <mesh position={[0, 3.2, -7]} receiveShadow>
        <cylinderGeometry args={[11, 11, 9, 48, 1, true, -Math.PI / 2.6, Math.PI / 1.3]} />
        <meshStandardMaterial roughness={0.95} metalness={0} side={THREE.BackSide}>
          <GradientTexture
            stops={[0, 0.45, 0.72, 1]}
            colors={['#05050c', '#101028', '#232348', '#0c0c1c']}
            size={512}
          />
        </meshStandardMaterial>
      </mesh>

      {/* Side walls */}
      <mesh position={[-8, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[18, 8]} />
        <meshStandardMaterial color="#101024" roughness={0.95} />
      </mesh>
      <mesh position={[8, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[18, 8]} />
        <meshStandardMaterial color="#101024" roughness={0.95} />
      </mesh>

      {/* Overhead soft box — visible as a bright panel */}
      <mesh position={[0, 4.6, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 3]} />
        <meshBasicMaterial color={C.warm} opacity={0.06 + aperture * 0.1} transparent />
      </mesh>
    </>
  )
}

/* ─── pedestal ───────────────────────────────────────────── */
function Pedestal({ position, width = 0.9, height = 0.55, depth = 0.9 }) {
  return (
    <group position={position}>
      <RoundedBox
        args={[width, height, depth]}
        radius={0.03}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={C.surface} roughness={0.7} metalness={0.05} />
      </RoundedBox>
      {/* Machined top lip */}
      <RoundedBox
        args={[width + 0.03, 0.012, depth + 0.03]}
        radius={0.005}
        smoothness={2}
        position={[0, height / 2, 0]}
      >
        <meshStandardMaterial color={C.surfaceHi} roughness={0.35} metalness={0.4} />
      </RoundedBox>
    </group>
  )
}

/* ─── glass specimen ─────────────────────────────────────── */
function GlassSpecimen({ aperture }) {
  const glass = useRef()
  const core = useRef()

  useFrame(({ clock }) => {
    if (glass.current) {
      const m = glass.current
      m.roughness = mix(0.02, 0.18, 1 - aperture)
      m.thickness = mix(0.15, 0.7, aperture)
      m.ior = mix(1.35, 1.6, aperture)
      m.envMapIntensity = mix(0.6, 2.2, aperture)
    }
    if (core.current) {
      core.current.emissiveIntensity = mix(0.4, 3.2, aperture)
      core.current.rotation.y = clock.elapsedTime * 0.25
    }
  })

  return (
    <group position={[0, 0.28, 0]}>
      {/* Cut-gem glass body — crisp facets, crystal profile */}
      <mesh ref={glass} castShadow scale={[1, 1.3, 1]}>
        <icosahedronGeometry args={[0.40, 0]} />
        <meshPhysicalMaterial
          color={C.cyan}
          transmission={1}
          thickness={0.4}
          ior={1.45}
          roughness={0.04}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.06}
          attenuationColor={C.cyanDeep}
          attenuationDistance={1.1}
          envMapIntensity={1.4}
          specularIntensity={1}
          flatShading
        />
      </mesh>

      {/* Inner core — what you see THROUGH the glass */}
      <mesh ref={core} position={[0, 0.04, 0]} rotation={[0.4, 0.6, 0]}>
        <octahedronGeometry args={[0.17, 0]} />
        <meshStandardMaterial
          color={C.violet}
          emissive={C.violet}
          emissiveIntensity={1.6}
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>
    </group>
  )
}

/* ─── keycap ─────────────────────────────────────────────── */
function Keycap({ aperture, macro = false }) {
  const skirt = useRef()
  const s = macro ? 3.1 : 1
  const w = 0.62, h = 0.17, d = 0.62

  useFrame(() => {
    if (skirt.current) {
      // Relief shrinks with aperture, shadow deepens
      const r = mix(0.02, 0.09, 1 - aperture)
      skirt.current.position.y = h / 2 + r
      skirt.current.scale.setScalar(mix(1, 0.88, aperture))
    }
  })

  return (
    <group position={[0, 0.28, 0]} scale={[s, s, s]}>
      {/* Base skirt */}
      <RoundedBox args={[w, h, d]} radius={0.035} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#191930" roughness={0.72} metalness={0.08} />
      </RoundedBox>

      {/* Sculpted top */}
      <RoundedBox
        ref={skirt}
        args={[w - 0.10, 0.055, d - 0.10]}
        radius={0.02}
        smoothness={4}
        position={[0, h / 2 + 0.03, 0]}
        castShadow
      >
        <meshStandardMaterial color={C.surfaceHi} roughness={0.55} metalness={0.12} />
      </RoundedBox>

      {/* Legend */}
      <mesh position={[0, h / 2 + 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.055, 0.075, 24]} />
        <meshStandardMaterial
          color={C.cyan}
          emissive={C.cyan}
          emissiveIntensity={0.5 + aperture * 0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

/* ─── neumorphism block ──────────────────────────────────── */
function NeumorphismBlock({ aperture }) {
  const hi = useRef()
  const lo = useRef()

  useFrame(() => {
    const o = mix(0.014, 0.055, aperture)
    if (hi.current) hi.current.position.set(-o, o, 0.012)
    if (lo.current) lo.current.position.set(o, -o, 0.012)
  })

  return (
    <group position={[0, 0.44, 0]}>
      {/* raised light edge */}
      <RoundedBox ref={hi} args={[0.56, 0.56, 0.10]} radius={0.11} smoothness={5}>
        <meshStandardMaterial color="#3b3b62" roughness={0.85} />
      </RoundedBox>
      {/* raised dark edge */}
      <RoundedBox ref={lo} args={[0.56, 0.56, 0.10]} radius={0.11} smoothness={5}>
        <meshStandardMaterial color="#0a0a16" roughness={0.9} />
      </RoundedBox>
      {/* soft surface */}
      <RoundedBox args={[0.56, 0.56, 0.11]} radius={0.12} smoothness={6} castShadow receiveShadow>
        <meshStandardMaterial color={C.surface} roughness={0.88} metalness={0.02} />
      </RoundedBox>
      {/* inset well */}
      <RoundedBox args={[0.20, 0.20, 0.115]} radius={0.07} smoothness={5} position={[0, 0, 0.004]}>
        <meshStandardMaterial color="#16162c" roughness={0.95} />
      </RoundedBox>
    </group>
  )
}

/* ─── polygon sculpture ──────────────────────────────────── */
function PolygonSculpture({ aperture }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.12
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.12
    }
  })
  return (
    <group position={[0, 1.95, -2.6]}>
      <mesh ref={ref} castShadow>
        <torusKnotGeometry args={[0.24, 0.055, 160, 18]} />
        <meshStandardMaterial
          color={C.cyanDeep}
          emissive={C.cyan}
          emissiveIntensity={0.18 + aperture * 0.7}
          metalness={0.95}
          roughness={0.14}
          envMapIntensity={1.6}
        />
      </mesh>
    </group>
  )
}

/* ─── aperture ring (R3F pointer events) ─────────────────── */
function ApertureRing({ aperture, visible, onChange }) {
  const hub = useRef()
  const dragging = useRef(false)
  const startY = useRef(0)
  const startVal = useRef(0)

  useFrame(({ clock }) => {
    if (!hub.current) return
    hub.current.rotation.z = -aperture * Math.PI * 1.6 + Math.PI * 0.3
    const pulse = 1 + Math.sin(clock.elapsedTime * 1.8) * 0.008
    hub.current.scale.setScalar(pulse)
  })

  useEffect(() => {
    const move = (e) => {
      if (!dragging.current) return
      const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0
      onChange(Math.max(0, Math.min(1, startVal.current + (startY.current - y) / 220)))
    }
    const up = () => { dragging.current = false }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [onChange])

  if (!visible) return null

  return (
    <group position={[0, -0.24, 1.05]} scale={[1, 1, 1]}>
      {/* dial body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.27, 0.29, 0.05, 48]} />
        <meshStandardMaterial color={C.surface} roughness={0.4} metalness={0.55} />
      </mesh>
      {/* rotating indicator ring */}
      <group
        ref={hub}
        position={[0, 0.03, 0]}
        onPointerDown={(e) => {
          e.stopPropagation()
          dragging.current = true
          startY.current = e.clientY ?? 0
          startVal.current = aperture
        }}
        onPointerOver={() => { document.body.style.cursor = 'grab' }}
        onPointerOut={() => { document.body.style.cursor = '' }}
      >
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.19, 0.235, 64]} />
          <meshStandardMaterial
            color={C.cyan}
            emissive={C.cyan}
            emissiveIntensity={0.7}
            side={THREE.DoubleSide}
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>
        {/* handle */}
        <mesh position={[0, 0.008, 0.21]}>
          <sphereGeometry args={[0.028, 20, 20]} />
          <meshStandardMaterial
            color={C.cyan}
            emissive={C.cyan}
            emissiveIntensity={1.6}
          />
        </mesh>
      </group>
      {/* centre readout */}
      <mesh position={[0, 0.028, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.16, 40]} />
        <meshStandardMaterial color="#0b0b18" roughness={0.9} />
      </mesh>
    </group>
  )
}

/* ─── camera rig ─────────────────────────────────────────── */
function CameraRig({ progress, reducedMotion }) {
  const { camera } = useThree()
  const sway = useRef(0)

  useFrame((_, dt) => {
    const p = Math.max(0, Math.min(1, progress))
    const idx = Math.min(5, Math.floor(p * 6))
    const local = p === 1 ? 1 : p * 6 - idx
    const t = reducedMotion ? 1 : easeInOut(Math.min(1, local / 0.8))

    const a = CAM[idx]
    const b = CAM[Math.min(5, idx + 1)]
    const pos = mixV3(a.pos, b.pos, t)
    const look = mixV3(a.look, b.look, t)

    if (!reducedMotion) {
      sway.current += dt * 0.25
      pos[0] += Math.sin(sway.current) * 0.035
      pos[1] += Math.cos(sway.current * 0.8) * 0.022
    }

    camera.position.set(pos[0], pos[1], pos[2])
    camera.lookAt(look[0], look[1], look[2])
  })
  return null
}

/* ─── scene ──────────────────────────────────────────────── */
export default function Scene({ progress, aperture, beat, reducedMotion }) {
  const [selected, setSelected] = useState(null)

  const pick = (name) => (e) => {
    e.stopPropagation()
    setSelected((cur) => (cur === name ? null : name))
  }

  const showGlass = beat !== 4
  const showRow = beat === 0 || beat === 3 || beat === 5
  const showKeycapMacro = beat === 4

  return (
    <>
      <CameraRig progress={progress} reducedMotion={reducedMotion} />

      {/* ── lighting: key / fill / rim ── */}
      <ambientLight intensity={0.28} color="#5a5a86" />

      {/* key */}
      <directionalLight
        position={[4.5, 6.5, 3.5]}
        intensity={2.6 + aperture * 2.4}
        color={C.warm}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0006}
        shadow-normalBias={0.02}
      />

      {/* fill */}
      <pointLight position={[-4, 2.4, 3]} intensity={1.4} color={C.cyan} distance={14} decay={2} />

      {/* rim / back separation */}
      <pointLight position={[3.5, 2.0, -4]} intensity={2.2} color={C.violet} distance={14} decay={2} />

      {/* aperture spotlight — the mechanism the visitor controls */}
      <spotLight
        position={[0, 5.2, 0.6]}
        angle={0.22 + aperture * 0.5}
        penumbra={0.65}
        intensity={aperture * 9}
        color={C.cyan}
        distance={16}
        decay={2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* ── local IBL — no network fetch ── */}
      <Environment resolution={256} environmentIntensity={0.55}>
        <Lightformer intensity={3.2} position={[0, 5, -8]} scale={[12, 8, 1]} color={C.warm} />
        <Lightformer intensity={2.0} position={[-6, 2, 0]} rotation-y={Math.PI / 2} scale={[14, 0.5, 1]} color={C.cyan} />
        <Lightformer intensity={2.0} position={[6, 2, 0]} rotation-y={-Math.PI / 2} scale={[14, 0.5, 1]} color={C.violet} />
        <Lightformer intensity={1.0} position={[0, -4, 3]} scale={[12, 0.4, 6]} color="#0a0a18" />
      </Environment>

      {/* ── studio ── */}
      <Studio aperture={aperture} />

      {/* ── staged row ── */}
      {showRow && (
        <>
          <Pedestal position={[-2.05, -0.35, 0]} />
          <Pedestal position={[0, -0.35, 0]} />
          <Pedestal position={[2.05, -0.35, 0]} />

          <group position={[-2.05, -0.08, 0]} onPointerDown={pick('keycap')}>
            <Keycap aperture={aperture} />
          </group>
          <group position={[0, -0.35, 0]} onPointerDown={pick('glass')}>
            <GlassSpecimen aperture={aperture} />
          </group>
          <group position={[2.05, 0.09, 0]} onPointerDown={pick('neumorphism')}>
            <NeumorphismBlock aperture={aperture} />
          </group>
        </>
      )}

      {/* ── single-subject beats ── */}
      {beat === 1 && (
        <>
          <Pedestal position={[0, -0.35, 0]} width={1.1} depth={1.1} />
          <GlassSpecimen aperture={aperture} />
        </>
      )}
      {beat === 2 && (
        <>
          <Pedestal position={[0, -0.35, 0]} width={1.1} depth={1.1} />
          <GlassSpecimen aperture={aperture} />
        </>
      )}
      {showKeycapMacro && (
        <>
          <Pedestal position={[-1.5, -0.2, 0]} width={1.3} height={0.9} depth={1.3} />
          <group position={[-1.5, 0.27, 0]}>
            <Keycap aperture={aperture} macro />
          </group>
        </>
      )}
      {beat === 3 && <PolygonSculpture aperture={aperture} />}

      {/* ── aperture control ── */}
      <ApertureRing
        aperture={aperture}
        visible={beat >= 1 && beat <= 3}
        onChange={(v) => window.dispatchEvent(new CustomEvent('pd:aperture', { detail: v }))}
      />

      {/* ── grounding shadows ── */}
      <ContactShadows
        position={[0, -0.495, 0]}
        opacity={0.75}
        scale={23}
        blur={2.2}
        far={5}
        resolution={1024}
        color="#000000"
      />

      {/* ── grade ── */}
      <EffectComposer>
        <Bloom
          intensity={0.35 + aperture * 0.7}
          luminanceThreshold={0.55}
          luminanceSmoothing={0.5}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.22} darkness={0.72} />
        <ToneMapping />
      </EffectComposer>
    </>
  )
}
