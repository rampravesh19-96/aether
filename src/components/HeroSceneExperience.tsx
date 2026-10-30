import { Component, lazy, Suspense } from 'react'
import type { ReactNode } from 'react'
import { SceneFallback } from './three/SceneFallback'
import { supportsWebGL } from '../utils/supportsWebGL'

function StaticSceneFallback() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <SceneFallback className="hero-scene__fallback" />
    </div>
  )
}

const AetherHeroScene = lazy(async () => {
  if (!supportsWebGL()) return { default: StaticSceneFallback }
  const module = await import('./three/AetherHeroScene')
  return { default: module.AetherHeroScene }
})

function SceneLoading() {
  return (
    <div className="hero-scene hero-scene--loading" aria-hidden="true">
      <SceneFallback className="hero-scene__fallback" />
      <div className="hero-scene__loading">
        <span className="hero-scene__loading-line" />
        <span>Preparing the studio</span>
      </div>
    </div>
  )
}

class SceneLoadBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? <StaticSceneFallback /> : this.props.children
  }
}

export function HeroSceneExperience() {
  return (
    <SceneLoadBoundary>
      <Suspense fallback={<SceneLoading />}>
        <AetherHeroScene />
      </Suspense>
    </SceneLoadBoundary>
  )
}
