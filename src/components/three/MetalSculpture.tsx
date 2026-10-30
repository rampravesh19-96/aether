import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, MeshPhysicalMaterial } from 'three'
import * as THREE from 'three'

type MetalSculptureProps = {
  compact: boolean
  reducedMotion: boolean
}

function createLiquidKnotGeometry(ringSegments: number, tubeSegments: number) {
  const positions = new Float32Array((ringSegments + 1) * (tubeSegments + 1) * 3)
  const indices: number[] = []

  for (let ring = 0; ring <= ringSegments; ring += 1) {
    const u = (ring / ringSegments) * Math.PI * 2
    for (let tube = 0; tube <= tubeSegments; tube += 1) {
      const v = (tube / tubeSegments) * Math.PI * 2
      const majorRadius = 0.82 + 0.16 * Math.cos(3 * u + 0.24 * Math.sin(v)) + 0.055 * Math.sin(5 * u - 2 * v)
      const tubeRadius = 0.235 + 0.07 * Math.cos(2 * u - v) + 0.022 * Math.sin(4 * u + v)
      const radial = majorRadius + tubeRadius * Math.cos(v)
      const index = (ring * (tubeSegments + 1) + tube) * 3

      positions[index] = radial * Math.cos(u)
      positions[index + 1] = radial * Math.sin(u) * 0.83
      positions[index + 2] = tubeRadius * Math.sin(v) + 0.14 * Math.sin(2 * u + 0.55)
    }
  }

  for (let ring = 0; ring < ringSegments; ring += 1) {
    for (let tube = 0; tube < tubeSegments; tube += 1) {
      const a = ring * (tubeSegments + 1) + tube
      const b = a + tubeSegments + 1
      indices.push(a, b, a + 1, b, b + 1, a + 1)
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

export function MetalSculpture({ compact, reducedMotion }: MetalSculptureProps) {
  const root = useRef<Group>(null)
  const metal = useRef<MeshPhysicalMaterial>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const geometry = useMemo(
    () => createLiquidKnotGeometry(compact ? 56 : 96, compact ? 28 : 48),
    [compact],
  )

  useFrame((state, delta) => {
    if (!root.current || reducedMotion) return

    const elapsed = state.clock.elapsedTime
    const group = root.current
    group.rotation.y += (elapsed * 0.1 + pointer.current.x * 0.17 - group.rotation.y) * Math.min(1, delta * 1.3)
    group.rotation.x += (Math.sin(elapsed * 0.32) * 0.08 + pointer.current.y * 0.12 - group.rotation.x) * Math.min(1, delta * 1.2)
    group.rotation.z = Math.sin(elapsed * 0.19) * 0.035
    group.position.y = Math.sin(elapsed * 0.55) * 0.045
    if (metal.current) metal.current.envMapIntensity = 1.22 + Math.sin(elapsed * 0.38) * 0.035
  })

  return (
    <group
      ref={root}
      scale={compact ? 0.91 : 1}
      onPointerMove={(event) => {
        pointer.current.x = THREE.MathUtils.clamp(event.pointer.x, -1, 1)
        pointer.current.y = THREE.MathUtils.clamp(event.pointer.y, -1, 1)
      }}
      onPointerLeave={() => {
        pointer.current.x = 0
        pointer.current.y = 0
      }}
    >
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          ref={metal}
          color="#d8deea"
          metalness={1}
          roughness={0.145}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.22}
        />
      </mesh>
      <mesh position={[-0.37, 0.19, 0.27]} rotation={[0.42, -0.34, 0.62]} scale={[0.13, 0.67, 0.13]} castShadow>
        <capsuleGeometry args={[0.42, 0.72, compact ? 3 : 5, compact ? 8 : 12]} />
        <meshPhysicalMaterial color="#bdc9dc" metalness={1} roughness={0.18} clearcoat={1} envMapIntensity={1.18} />
      </mesh>
    </group>
  )
}
