import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

const sections = ['top', 'manifesto', 'work', 'capabilities', 'contact'] as const
export type ActiveSection = (typeof sections)[number]

gsap.registerPlugin(ScrollTrigger)

export function useCinematicScroll() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('top')
  const [reducedMotion, setReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(preference.matches)
    preference.addEventListener('change', updatePreference)
    return () => preference.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      const observer = new IntersectionObserver((entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id as ActiveSection)
      }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 })
      sections.forEach((id) => {
        const section = document.getElementById(id)
        if (section) observer.observe(section)
      })
      return () => observer.disconnect()
    }

    const lenis = new Lenis({
      anchors: true,
      smoothWheel: true,
      lerp: 0.09,
    })
    const updateScrollTrigger = () => ScrollTrigger.update()
    const tick = (time: number) => lenis.raf(time * 1000)
    lenis.on('scroll', updateScrollTrigger)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const context = gsap.context(() => {
      const progress = document.querySelector<HTMLElement>('.scroll-progress__bar')
      if (progress) {
        gsap.fromTo(progress, { scaleX: 0 }, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.2,
          },
        })
      }

      const scene = document.querySelector<HTMLElement>('.hero-scene')
      if (scene) {
        gsap.to(scene, {
          opacity: 0.45,
          ease: 'none',
          scrollTrigger: {
            trigger: '#top',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.35,
          },
        })
      }

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0.82, y: 16 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true,
          },
        })
      })

      const manifestoLines = gsap.utils.toArray<HTMLElement>('[data-manifesto-line]')
      if (manifestoLines.length) {
        gsap.fromTo(manifestoLines, { autoAlpha: 0.78, y: 13 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.manifesto__statement',
            start: 'top 82%',
            once: true,
          },
        })
      }

      sections.forEach((id) => {
        const section = document.getElementById(id)
        if (!section) return
        ScrollTrigger.create({
          trigger: section,
          start: 'top 42%',
          end: 'bottom 42%',
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        })
      })
    })

    ScrollTrigger.refresh()

    return () => {
      context.revert()
      gsap.ticker.remove(tick)
      lenis.off('scroll', updateScrollTrigger)
      lenis.destroy()
    }
  }, [reducedMotion])

  return { activeSection, reducedMotion }
}
