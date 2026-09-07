import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { IoExpandOutline } from 'react-icons/io5'
import ProjectDetailsPanel from './ProjectDetailsPanel'
import { projectImageUrl } from '../../lib/sanity'
import { useProjectsStore } from '../../stores/useProjectsStore'

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

function ProjectCard({ projectId }: { projectId: string }) {
  const project = useProjectsStore((state) => state.projects.find((item) => item._id === projectId))
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)')
    const updateTouchDevice = () => setIsTouchDevice(mediaQuery.matches)

    updateTouchDevice()
    mediaQuery.addEventListener('change', updateTouchDevice)

    return () => mediaQuery.removeEventListener('change', updateTouchDevice)
  }, [])

  if (!project) return null

  const imageUrl = projectImageUrl(project.cardImage ?? project.thumbnail)
  const projectBadge = project.buildType ? {
    personal: 'Build · Personal',
    client: 'Build · Client',
    demo: 'Build · Demo',
  }[project.buildType] : 'Build · Personal'
  const projectDescription = project.description
  const overlayVisible = isTouchDevice && isOverlayOpen

  return (
    <>
      <motion.article
        className="group relative flex min-w-0 flex-1 basis-72 flex-col overflow-hidden rounded-3xl border border-white/15 bg-glass-bg sm:basis-80 lg:basis-[calc(50%-0.75rem)] xl:basis-[calc(33.333%-1rem)]"
        variants={reveal}
        layout
        onClick={() => {
          if (isTouchDevice) setIsOverlayOpen((previous) => !previous)
        }}
      >
        <div className="relative aspect-video overflow-hidden bg-white/5">
          {imageUrl ? (
            <motion.img
              src={imageUrl}
              alt={project.title}
              className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105 group-hover:blur-[1.5px] group-hover:brightness-50"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-body text-xs uppercase tracking-[0.2em] text-muted">Image coming soon</div>
          )}

          <div
            className={`pointer-events-none absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 ${overlayVisible ? 'opacity-100' : ''}`}
          />

          <span className="absolute left-3 top-3 z-20 inline-flex rounded-full border border-white/20 bg-black/60 px-3 py-2 font-body text-[8px] md:text-[10px] uppercase tracking-[0.16em] text-accent backdrop-blur-sm">
            {projectBadge}
          </span>

          <div className={`pointer-events-none absolute inset-0 z-20 md:mb-5 flex gap-5 items-end justify-between p-4 md:p-5 opacity-0 transition-opacity duration-500 ease-out group-hover:pointer-events-auto group-hover:opacity-100 sm:p-5 ${overlayVisible ? 'pointer-events-auto opacity-100' : ''}`}>
            <div className="flex flex-col justify-end gap-2">
              <h3 className="font-display text-sm sm:text-base md:text-xl lg:text-3xl uppercase text-white">{project.title}</h3>
              <p className="font-body max-w-sm md:max-w-xl text-[11px] md:text-base text-muted leading-4 md:leading-relaxed tracking-wide line-clamp-2">{projectDescription}</p>
            </div>
            <div >
              <button
                type="button"
                aria-label={`View case study for ${project.title}`}
                onClick={(event) => {
                  event.stopPropagation()
                  setIsModalOpen(true)
                }}
                className="flex items-center p-2 lg:p-3 cursor-pointer justify-center rounded-full border border-white/20 bg-white text-black shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <IoExpandOutline aria-hidden="true" className="size-4 md:size-6 lg:size-7" />
              </button>
            </div>
          </div>
        </div>
      </motion.article>
      <ProjectDetailsPanel project={project} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default ProjectCard
