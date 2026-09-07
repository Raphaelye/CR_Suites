import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IoCloseOutline, IoOpenOutline } from 'react-icons/io5'
import { createPortal } from 'react-dom'

import { projectImageUrl, safeExternalUrl, type SanityProject } from '../../lib/sanity'

const buildTypeLabels = {
  personal: 'Build · Personal',
  client: 'Build · Client',
  demo: 'Build · Demo',
} as const

type ProjectDetailsPanelProps = {
  project: SanityProject | null
  isOpen: boolean
  onClose: () => void
}

function ProjectDetailsPanel({ project, isOpen, onClose }: ProjectDetailsPanelProps) {
  const dialogRef = useRef<HTMLElement | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null

    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',')

    const focusFrame = window.requestAnimationFrame(() => {
      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector)
      focusableElements?.[0]?.focus()
      if (!focusableElements?.length) dialogRef.current?.focus()
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)
      if (!focusableElements.length) {
        event.preventDefault()
        dialogRef.current.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const currentElement = document.activeElement
      const focusIsInsideDialog = dialogRef.current.contains(currentElement)

      if (event.shiftKey && (!focusIsInsideDialog || currentElement === firstElement)) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && (!focusIsInsideDialog || currentElement === lastElement)) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
      triggerRef.current?.focus()
      triggerRef.current = null
    }
  }, [isOpen, onClose])

  if (!project) return null

  const projectBadge = project.buildType ? buildTypeLabels[project.buildType] : 'Build · Personal'
  const projectDescription = project.description
  const heroImage = projectImageUrl(project.cardImage ?? project.thumbnail)
  const galleryImages = (project.gallery ?? []).map((image) => projectImageUrl(image))
  const externalLinks = [
    safeExternalUrl(project.liveUrl) ? { label: 'View live', href: safeExternalUrl(project.liveUrl) } : null,
    safeExternalUrl(project.caseStudyUrl) ? { label: 'Case study', href: safeExternalUrl(project.caseStudyUrl)} : null,
  ].filter(Boolean) as { label: string; href: string }[]

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-200 flex justify-end bg-black/70 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >

          <motion.aside
            ref={dialogRef}
            className="relative flex h-full w-full flex-col overflow-y-auto border-l border-white/15 bg-[#0b0b0b] px-5 py-5 text-white shadow-2xl shadow-black/70 sm:px-8 sm:py-6 lg:w-[46vw] lg:px-12"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.8 }}
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            tabIndex={-1}
          >
            <div className="flex items-start justify-between gap-4 pb-6">

              <div className="flex-1">
                <span className="font-body inline-flex rounded-full border border-border bg-glass-bg px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-accent">
                  {projectBadge}
                </span>
                <h2 id="project-modal-title" className="font-display mt-10 text-2xl uppercase leading-[1.2] text-white sm:text-4xl">
                  {project.title}
                </h2>
                <p className="mt-5 text-muted text-sm sm:text-base">{projectDescription}</p>
              </div>


              <button
                type="button"
                onClick={onClose}
                className="fixed right-5 top-5 z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-glass-bg text-white shadow-lg shadow-black/30 backdrop-blur-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:right-8 sm:top-6 lg:right-12"
                aria-label="Close project details"
              >
                <IoCloseOutline size={22} aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col gap-8 pb-8 mt-10">
              {heroImage ? (
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  <img src={heroImage} alt={project.title} className="h-auto w-full object-cover" />
                </div>
              ) : null}

              {project.overview ? (
                <section className="flex flex-col gap-3">
                  <p className="font-body text-[10px] font-medium uppercase tracking-[0.24em] text-accent">Overview</p>
                  <p className="font-body text-base leading-relaxed text-white/70">{project.overview}</p>
                </section>
              ) : null}

              <section className="flex flex-col gap-4 rounded-[1.25rem] border border-white/10 bg-white/3 p-4 sm:p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-body text-[10px] font-medium uppercase tracking-[0.24em] text-accent">My role &amp; stack</p>
                  {project.role ? <p className="font-body text-sm text-white/80">{project.role}</p> : null}
                </div>

                {project.stack?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="font-body inline-flex rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
              </section>

              {project.problem ? (
                <section className="flex flex-col gap-3">
                  <p className="font-body text-[10px] font-medium uppercase tracking-[0.24em] text-accent">Problem / goal</p>
                  <p className="font-body text-base leading-relaxed text-white/70">{project.problem}</p>
                </section>
              ) : null}

              {project.process && project.process.length > 0 ? (
                <section className="flex flex-col gap-4">
                  <p className="font-body text-[10px] font-medium uppercase tracking-[0.24em] text-accent">Process</p>
                  <div className="flex flex-col gap-4">
                    {project.process.map((step, index) => (
                      <div key={step._key ?? `${step.stepTitle}-${index}`} className="rounded-[1.25rem] border border-white/10 bg-white/3 p-4">
                        <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">0{index + 1}</p>
                        <h3 className="font-display mt-3 text-xl uppercase leading-none text-white">{step.stepTitle}</h3>
                        <p className="font-body mt-2 text-base leading-relaxed text-white/70">{step.stepDescription}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {galleryImages.length > 0 ? (
                <section className="flex flex-col gap-4">
                  <p className="font-body text-[10px] font-medium uppercase tracking-[0.24em] text-accent">Gallery</p>
                  <div className="flex flex-wrap gap-3">
                    {galleryImages.map((image, index) => (
                      <img
                        key={`${image}-${index}`}
                        src={image}
                        alt={`${project.title} gallery ${index + 1}`}
                        className="h-28 w-full rounded-2xl border border-white/10 object-cover sm:w-[calc(50%-0.375rem)]"
                      />
                    ))}
                  </div>
                </section>
              ) : null}

              {project.outcome ? (
                <section className="flex flex-col gap-3">
                  <p className="font-body text-[10px] font-medium uppercase tracking-[0.24em] text-accent">Outcome</p>
                  <p className="font-body text-base leading-relaxed text-white/70">{project.outcome}</p>
                </section>
              ) : null}

              {externalLinks.length > 0 ? (
                <div className="flex flex-wrap gap-3 pt-2">
                  {externalLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-body inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors hover:border-accent hover:text-accent"
                    >
                      {link.label}
                      <IoOpenOutline size={14} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default ProjectDetailsPanel
