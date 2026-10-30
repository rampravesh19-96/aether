import type { PropsWithChildren } from 'react'
import { Container } from './Container'

type SectionProps = PropsWithChildren<{
  id: string
  label: string
  title?: string
  className?: string
}>

export function Section({ id, label, title, className = '', children }: SectionProps) {
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={`${id}-title`}>
      <Container>
        <div className="section__intro">
          <span className="eyebrow"><span className="eyebrow__dot" />{label}</span>
          {title && <h2 id={`${id}-title`} className="section__title">{title}</h2>}
        </div>
        {children}
      </Container>
    </section>
  )
}
