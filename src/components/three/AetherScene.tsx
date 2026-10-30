import { useEffect, useLayoutEffect, useMemo } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { MetalSculpture } from './MetalSculpture'

type AetherSceneProps = {
  compact: boolean
  reducedMotion: boolean
  inView: boolean
  onReady: () => void
  onContextLost: () => void
}

function ContextLossHandler({ onContextLost }: Pick<AetherSceneProps, 'onContextLost'>) {
  const { gl } = useThree()

  useEffect(() => {
    const canvas = gl.domElement
    canvas.addEventListener('webglcontextlost', onContextLost)
    return () => canvas.removeEventListener('webglcontextlost', onContextLost)
  }, [gl, onContextLost])

  return null
}

function createStudioEnvironment() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Unable to create the studio reflection map.')

  const wall = context.createLinearGradient(0, 0, 0, canvas.height)
  wall.addColorStop(0, '#191f2b')
  wall.addColorStop(0.46, '#080a10')
  wall.addColorStop(0.7, '#131925')
  wall.addColorStop(1, '#06070a')
  context.fillStyle = wall
  context.fillRect(0, 0, canvas.width, canvas.height)

  const panels = [
    { x: 145, width: 74, color: 'rgba(225,235,255,.83)' },
    { x: 230, width: 25, color: 'rgba(120,149,210,.3)' },
    { x: 442, width: 118, color: 'rgba(219,229,248,.62)' },
    { x: 572, width: 22, color: 'rgba(123,157,255,.55)' },
    { x: 815, width: 68, color: 'rgba(187,205,242,.44)' },
  ]
  for (const panel of panels) {
    const gradient = context.createLinearGradient(panel.x, 0, panel.x + panel.width, 0)
    gradient.addColorStop(0, 'rgba(0,0,0,0)')
    gradient.addColorStop(0.5, panel.color)
    gradient.addColorStop(1, 'rgba(0,0,0,0)')
    context.fillStyle = gradient
    context.fillRect(panel.x, 75, panel.width, 280)
  }
  const floor = context.createLinearGradient(0, 360, 0, 512)
  floor.addColorStop(0, 'rgba(89,111,158,.16)')
  floor.addColorStop(1, 'rgba(0,0,0,.65)')
  context.fillStyle = floor
  context.fillRect(0, 360, 1024, 152)

  const texture = new THREE.CanvasTexture(canvas)
  texture.mapping = THREE.EquirectangularReflectionMapping
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function StudioEnvironment({ texture }: { texture: THREE.Texture }) {
  const scene = useThree((state) => state.scene)

  useLayoutEffect(() => {
    const previousEnvironment = scene.environment
    scene.environment = texture
    return () => {
      scene.environment = previousEnvironment
    }
  }, [scene, texture])

  return null
}

function Studio({ compact, reducedMotion, onReady, onContextLost }: Pick<AetherSceneProps, 'compact' | 'reducedMotion' | 'onReady' | 'onContextLost'>) {
  const environment = useMemo(createStudioEnvironment, [])

  useEffect(() => () => environment.dispose(), [environment])
  useEffect(() => {
    onReady()
  }, [onReady])

  return (
    <>
      <ContextLossHandler onContextLost={onContextLost} />
      <StudioEnvironment texture={environment} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[-3.8, 4.2, 4]} intensity={1.15} color="#dce6ff" />
      <pointLight position={[3.4, 1.8, -2.8]} intensity={2.1} color="#527fff" distance={7} />
      <pointLight position={[-2.6, -2, 1]} intensity={0.68} color="#a9bce7" distance={6} />
      <MetalSculpture compact={compact} reducedMotion={reducedMotion} />
    </>
  )
}

export function AetherScene({ compact, reducedMotion, inView, onReady, onContextLost }: AetherSceneProps) {
  return (
    <Canvas
      dpr={compact ? [1, 1.2] : [1, 1.65]}
      camera={{ position: [0, 0, 3.8], fov: 39, near: 0.1, far: 40 }}
      frameloop={reducedMotion || !inView ? 'demand' : 'always'}
      gl={{ alpha: true, antialias: !compact, powerPreference: 'low-power', stencil: false, depth: true }}
      fallback={null}
      style={{ touchAction: 'pan-y' }}
    >
      <Studio compact={compact} reducedMotion={reducedMotion} onReady={onReady} onContextLost={onContextLost} />
    </Canvas>
  )
}
