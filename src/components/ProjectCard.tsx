import { ArrowUpRight } from 'lucide-react'

type Project = {
  number: string
  name: string
  category: string
  description: string
  visual: 'nova' | 'orbit' | 'forme'
  className: string
}

function ProjectArtwork({ project }: { project: Project }) {
  return (
    <div className={`project__visual project__visual--${project.visual}`} aria-hidden="true">
      <span className="project__visual-index mono">AETHER / STUDY {project.number}</span>
      {project.visual === 'nova' && (
        <div className="nova-object">
          <span className="nova-object__body" />
          <span className="nova-object__ring" />
          <span className="nova-object__light" />
        </div>
      )}
      {project.visual === 'orbit' && (
        <div className="orbit-system">
          <span className="orbit-system__path orbit-system__path--one" />
          <span className="orbit-system__path orbit-system__path--two" />
          <span className="orbit-system__path orbit-system__path--three" />
          <span className="orbit-system__core" />
          <span className="orbit-system__satellite" />
        </div>
      )}
      {project.visual === 'forme' && (
        <div className="forme-study">
          <span className="forme-study__wall" />
          <span className="forme-study__column" />
          <span className="forme-study__light" />
          <span className="forme-study__floor" />
        </div>
      )}
      <span className="project__visual-caption mono">{project.category} / CONCEPT</span>
    </div>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      className={`project ${project.className}`}
      href="#contact"
      data-reveal
      aria-label={`${project.name}, ${project.category}. ${project.description} Discuss a similar concept.`}
    >
      <ProjectArtwork project={project} />
      <div className="project__content">
        <div className="project__heading">
          <div>
            <span className="project__number mono">{project.number} / CONCEPT</span>
            <h3>{project.name}</h3>
          </div>
          <span className="project__category mono">{project.category}</span>
        </div>
        <div className="project__foot">
          <p>{project.description}</p>
          <span className="project__link" aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.4} /></span>
        </div>
      </div>
    </a>
  )
}
