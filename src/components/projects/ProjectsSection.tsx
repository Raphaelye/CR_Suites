import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useShallow } from 'zustand/shallow'
import ProjectCard from './ProjectCard'
import ProjectEmptyState from './ProjectEmptyState'
import ProjectFilterTabs from './ProjectFilterTabs'
import { useProjectsStore } from '../../stores/useProjectsStore'

function ProjectsSection() {
  const fetchProjects = useProjectsStore((state) => state.fetchProjects)
  const filteredProjects = useProjectsStore(useShallow((state) => state.filteredProjects()))
  const isLoading = useProjectsStore((state) => state.isLoading)
  const hasFetched = useProjectsStore((state) => state.hasFetched)

  useEffect(() => {
    void fetchProjects()
  }, [fetchProjects])

  return (
    <main id="projects" className="relative isolate overflow-hidden bg-bg page-padding pb-32 pt-32 sm:pt-40 lg:pb-48">
      <div className="pointer-events-none absolute -left-40 top-36 h-96 w-96 rounded-full border border-accent/15" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.header
          className="flex flex-col gap-8 border-b border-white/15 pb-10 sm:gap-12 sm:pb-14 lg:flex-row lg:items-end lg:justify-between"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-4xl">
            <p className="font-body mb-5 text-xs font-medium uppercase tracking-[0.28em] text-accent sm:text-sm">03 / Selected work</p>
            <h1 className="font-display text-4xl uppercase leading-[0.95] text-white sm:text-7xl lg:text-6xl">
              Many ways to <span className="text-accent">make.</span>
            </h1>
          </div>
          <p className="font-body max-w-xs text-sm leading-relaxed text-muted sm:text-base lg:pb-1">
            Interfaces, websites, and mobile experiences with a point of view.
          </p>
        </motion.header>

        <section className="mt-8 flex flex-col gap-8 sm:mt-12 sm:gap-10" aria-label="Projects">
          <ProjectFilterTabs />
          {isLoading && !hasFetched ? (
            <div className="flex min-h-80 items-center justify-center border border-white/15 font-body text-sm uppercase tracking-[0.2em] text-muted" role="status">Loading projects...</div>
          ) : filteredProjects.length === 0 ? (
            <ProjectEmptyState />
          ) : (
            <motion.div className="flex flex-wrap items-stretch gap-5 sm:gap-6" layout>
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => <ProjectCard key={project._id} projectId={project._id} />)}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </div>
    </main>
  )
}

export default ProjectsSection
