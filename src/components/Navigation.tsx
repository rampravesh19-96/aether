import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Container } from './Container'
import type { ActiveSection } from '../hooks/useCinematicScroll'

const links = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Selected work', href: '#work' },
  { label: 'Capabilities', href: '#capabilities' },
]

export function Navigation({ activeSection }: { activeSection: ActiveSection }) {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <a className="wordmark" href="#top" aria-label="AETHER home" onClick={closeMenu}>
          <span className="wordmark__symbol" aria-hidden="true">A</span>
          <span>AETHER</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav id="primary-navigation" className={`nav ${open ? 'nav--open' : ''}`} aria-label="Main navigation">
          {links.map((link) => {
            const id = link.href.slice(1) as ActiveSection
            const active = activeSection === id
            return <a key={link.href} href={link.href} onClick={closeMenu} aria-current={active ? 'location' : undefined} className={active ? 'nav__link--active' : undefined}>{link.label}</a>
          })}
          <a className={`nav__contact${activeSection === 'contact' ? ' nav__link--active' : ''}`} href="#contact" onClick={closeMenu} aria-current={activeSection === 'contact' ? 'location' : undefined}>Start a project <span aria-hidden="true">↗</span></a>
        </nav>
      </Container>
    </header>
  )
}
