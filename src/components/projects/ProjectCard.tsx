import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { IoArrowUpOutline } from 'react-icons/io5'
import { projectCategoryLabels } from './projectLabels'
import { projectImageUrl, safeExternalUrl } from '../../lib/sanity'
import { useProjectsStore } from '../../stores/useProjectsStore'

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

function ProjectCard({ projectId }: { projectId: string }) {
  const project = useProjectsStore((state) => state.projects.find((item) => item._id === projectId))
  if (!project) return null

  const imageUrl = projectImageUrl(project.thumbnail)
  const projectUrl = safeExternalUrl(project.caseStudyUrl) || safeExternalUrl(project.liveUrl)

  return (
    <motion.article
      className="group flex min-w-0 flex-1 basis-72 sm:basis-80 lg:basis-[calc(50%-0.75rem)] xl:basis-[calc(33.333%-1rem)] flex-col overflow-hidden border border-white/15 bg-glass-bg transition-transform duration-300 hover:-translate-y-1 hover:border-accent/60"
      variants={reveal}
      layout
    >
      <div className="relative shrink-0 overflow-hidden bg-white/5 aspect-video">
        {imageUrl ? (
          <img src={imageUrl} alt={project.title} className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
        ) : (
          <div className="flex h-full items-center justify-center font-body text-xs uppercase tracking-[0.2em] text-muted">Image coming soon</div>
        )}
        <span className="absolute left-4 top-4 border border-white/20 bg-black/70 px-3 py-2 font-body text-[10px] uppercase tracking-[0.14em] text-accent">
          {projectCategoryLabels[project.category]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl uppercase leading-none text-white">{project.title}</h3>
          {projectUrl && (
              <a href={projectUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              <IoArrowUpOutline size={17} aria-hidden="true" />
            </a>
          )}
        </div>
        <p className="font-body text-base mt-4 line-clamp-2 leading-relaxed text-muted">{project.description}</p>
      </div>
    </motion.article>
  )
}

export default ProjectCard
