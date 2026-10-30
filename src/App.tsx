import { ArrowDown, ArrowUpRight, Asterisk } from 'lucide-react'
import { Button } from './components/Button'
import { Container } from './components/Container'
import { Navigation } from './components/Navigation'
import { Section } from './components/Section'
import { HeroSceneExperience } from './components/HeroSceneExperience'
import { useCinematicScroll } from './hooks/useCinematicScroll'
import { ProjectCard } from './components/ProjectCard'
import { contactConfig } from './config/contact'

const projects = [
  {
    number: '01',
    name: 'NOVA',
    category: 'Digital Commerce',
    description: 'A considered digital storefront built around product storytelling.',
    visual: 'nova',
    className: 'project--nova',
  },
  {
    number: '02',
    name: 'ORBIT',
    category: 'Creative Platform',
    description: 'An expressive digital space where creativity meets interaction.',
    visual: 'orbit',
    className: 'project--orbit',
  },
  {
    number: '03',
    name: 'FORME',
    category: 'Architecture & Space',
    description: 'A visual study of space, material, and modern architecture.',
    visual: 'forme',
    className: 'project--forme',
  },
] as const

const capabilities = [
  {
    number: '01',
    title: 'Creative Development',
    description: 'Building expressive, maintainable interfaces with a strong engineering foundation.',
    skills: ['React', 'TypeScript', 'JavaScript', 'Component Architecture'],
  },
  {
    number: '02',
    title: 'Interactive Experiences',
    description: 'Creating motion-led interfaces and immersive browser-based experiences.',
    skills: ['GSAP', 'ScrollTrigger', 'Three.js', 'React Three Fiber'],
  },
  {
    number: '03',
    title: 'Interface & Experience',
    description: 'Turning visual direction into intuitive, consistent, and accessible interfaces.',
    skills: ['Responsive Design', 'Interaction Design', 'Accessibility', 'Design Systems'],
  },
  {
    number: '04',
    title: 'Performance & Quality',
    description: 'Making ambitious interfaces feel fast, reliable, and inclusive.',
    skills: ['Performance Optimization', 'Lazy Loading', 'Browser Testing', 'Reduced Motion'],
  },
]

function App() {
  const { activeSection, reducedMotion } = useCinematicScroll()

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      {!reducedMotion && <div className="scroll-progress" aria-hidden="true"><span className="scroll-progress__bar" /></div>}
      <Navigation activeSection={activeSection} />
      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <Container className="hero__inner">
            <div className="hero__copy">
              <span className="eyebrow hero__eyebrow"><span className="eyebrow__dot" />Independent digital studio <span className="hero__location">— Worldwide</span></span>
              <h1 id="hero-title">Beyond the<br /><span>ordinary</span> web.</h1>
              <div className="hero__bottom">
                <p>We shape ideas into distinct digital worlds. Designed with feeling. Built for what comes next.</p>
                <Button href="#work">Explore our work</Button>
              </div>
            </div>
            <HeroSceneExperience />
            <a href="#manifesto" className="hero__scroll" aria-label="Scroll to manifesto"><ArrowDown size={15} /> <span>Scroll to explore</span></a>
            <span className="hero__index" aria-hidden="true">01 / 05</span>
          </Container>
        </section>

        <Section id="manifesto" label="A different kind of studio" className="manifesto">
          <div className="manifesto__layout">
            <h2 id="manifesto-title" className="manifesto__statement">
              <span data-manifesto-line>We don&apos;t just build websites.</span>
              <span data-manifesto-line>We create digital experiences that make people feel something.</span>
            </h2>
            <div className="manifesto__aside" data-reveal>
              <p>Where design meets technology. Where imagination becomes interaction.</p>
              <a className="text-link" href="#capabilities">A little about us <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="manifesto__foot"><Asterisk size={18} /><span>Curiosity, with intention.</span><span className="mono">EST. IN THE FUTURE</span></div>
        </Section>

        <Section id="work" label="Selected work" title={'Made to move\nyou.'} className="work">
          <div className="work__note">
            <p>Three imagined digital worlds, shaped around a single idea.</p>
            <span className="mono">Fictional concepts / 01-03</span>
          </div>
          <div className="project-grid">
            {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
          </div>
        </Section>

        <Section id="capabilities" label="WHAT I BRING" title={'Design intuition.\nEngineering precision.'} className="capabilities">
          <div className="capabilities__intro-note" data-reveal>
            <p className="capabilities__lead">I build thoughtful digital experiences where visual craft, interaction, and frontend engineering work as one.</p>
            <div className="capabilities__orbit" aria-hidden="true"><span /><span /></div>
          </div>
          <div className="capability-grid">
            {capabilities.map((capability) => (
              <article
                className="capability-card"
                key={capability.number}
                tabIndex={0}
                aria-labelledby={`capability-${capability.number}-title`}
                aria-describedby={`capability-${capability.number}-description`}
                data-reveal
              >
                <div className="capability-card__heading">
                  <span className="mono capability-card__number">{capability.number}</span>
                  <h3 id={`capability-${capability.number}-title`}>{capability.title}</h3>
                </div>
                <p id={`capability-${capability.number}-description`} className="capability-card__description">{capability.description}</p>
                <ul className="capability-card__skills" aria-label={`${capability.title} technologies and practices`}>
                  {capability.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <Container className="contact__container">
            <div className="contact__signature" aria-hidden="true"><span /><span /><i /></div>
            <div className="contact__main" data-reveal>
              <span className="eyebrow"><span className="eyebrow__dot" />HAVE A PROJECT IN MIND?</span>
              <div className="contact__row">
                <div className="contact__copy">
                  <h2 id="contact-title">Let&apos;s make something<br /><span>extraordinary.</span></h2>
                  <p>Have an idea, an opportunity, or simply want to connect? I&apos;d love to hear from you.</p>
                </div>
                <Button className="contact__button" href={`mailto:${contactConfig.email}`} aria-label="Start a conversation by email">Start a conversation</Button>
              </div>
            </div>
            <div className="contact__rule" />
            <footer className="footer" data-reveal>
              <a className="wordmark" href="#top" aria-label="AETHER, back to top"><span className="wordmark__symbol" aria-hidden="true">A</span><span>AETHER</span></a>
              <span className="footer__tagline">Beyond the ordinary web.</span>
              <nav className="footer__links" aria-label="Contact and social links">
                <a href={`mailto:${contactConfig.email}`} aria-label={`Email AETHER at ${contactConfig.email}`}>Email</a>
                {contactConfig.githubUrl
                  ? <a href={contactConfig.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="AETHER on GitHub (opens in a new tab)">GitHub</a>
                  : <span className="footer__placeholder" aria-label="GitHub profile URL not configured"><span>GitHub</span><small>URL needed</small></span>}
                {contactConfig.linkedInUrl
                  ? <a href={contactConfig.linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="AETHER on LinkedIn (opens in a new tab)">LinkedIn</a>
                  : <span className="footer__placeholder" aria-label="LinkedIn profile URL not configured"><span>LinkedIn</span><small>URL needed</small></span>}
              </nav>
              <span className="mono footer__copyright">© AETHER STUDIO 2025</span>
            </footer>
          </Container>
        </section>
      </main>
    </>
  )
}

export default App

