import { Component, useCallback, useEffect, useRef, useState } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { AetherScene } from './AetherScene'
import { SceneFallback } from './SceneFallback'
import { supportsWebGL } from '../../utils/supportsWebGL'

type AetherHeroSceneProps = {
  className?: string
}

type SceneBoundaryProps = {
  children: ReactNode
  onFailure: () => void
}

type SceneBoundaryState = { failed: boolean }

class SceneBoundary extends Component<SceneBoundaryProps, SceneBoundaryState> {
  state: SceneBoundaryState = { failed: false }

  static getDerivedStateFromError(): SceneBoundaryState {
    return { failed: true }
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    this.props.onFailure()
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

export function AetherHeroScene({ className = '' }: AetherHeroSceneProps) {
  const sceneRoot = useRef<HTMLDivElement>(null)
  const [webgl, setWebgl] = useState<boolean | null>(null)
  const [ready, setReady] = useState(false)
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 640px)').matches)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    setWebgl(supportsWebGL())
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compactQuery = window.matchMedia('(max-width: 640px)')
    const updateMotion = () => setReducedMotion(motionQuery.matches)
    const updateCompact = () => setCompact(compactQuery.matches)
    updateMotion()
    updateCompact()
    motionQuery.addEventListener('change', updateMotion)
    compactQuery.addEventListener('change', updateCompact)
    return () => {
      motionQuery.removeEventListener('change', updateMotion)
      compactQuery.removeEventListener('change', updateCompact)
    }
  }, [])

  useEffect(() => {
    const node = sceneRoot.current
    if (!node || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.01 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!webgl || ready) return
    const timeout = window.setTimeout(() => {
      setWebgl(false)
      setReady(true)
    }, 8000)
    return () => window.clearTimeout(timeout)
  }, [webgl, ready])

  const markReady = useCallback(() => setReady(true), [])
  const markFailed = useCallback(() => {
    setWebgl(false)
    setReady(true)
  }, [])

  return (
    <div ref={sceneRoot} className={`hero-scene ${className}`} aria-hidden="true">
      <SceneFallback className={`hero-scene__fallback ${ready && webgl ? 'hero-scene__fallback--hidden' : ''}`} />
      {webgl && (
        <div className={`hero-scene__canvas ${ready ? 'hero-scene__canvas--ready' : ''}`}>
          <SceneBoundary onFailure={markFailed}>
            <AetherScene
              compact={compact}
              reducedMotion={reducedMotion}
              inView={inView}
              onReady={markReady}
              onContextLost={markFailed}
            />
          </SceneBoundary>
        </div>
      )}
      {webgl && !ready && (
        <div className="hero-scene__loading">
          <span className="hero-scene__loading-line" />
          <span>Preparing the studio</span>
        </div>
      )}
    </div>
  )
}
