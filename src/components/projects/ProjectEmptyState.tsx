import { useProjectsStore } from '../../stores/useProjectsStore'
import { projectFilterLabels } from './projectLabels'
import { IoSparklesOutline } from 'react-icons/io5'

function ProjectEmptyState() {
  const activeFilter = useProjectsStore((state) => state.activeFilter)
  const error = useProjectsStore((state) => state.error)
  const hasFetched = useProjectsStore((state) => state.hasFetched)
  const hasProjects = useProjectsStore((state) => state.projects.length > 0)
  const category = projectFilterLabels[activeFilter]

  const message = error || !hasFetched || !hasProjects
    ? 'Projects are on the way.'
    : `No ${category} projects yet. Check back soon.`

  return (
    <div className="relative flex min-h-80 w-full items-center overflow-hidden rounded-3xl border border-accent/20 bg-linear-to-br from-accent/10 via-white/3 to-transparent px-6 py-10 sm:px-12">
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border border-accent/20" />
      <div className="pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full border border-white/10" />
      <div className="relative z-10 flex w-full flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-accent text-black shadow-[0_0_2rem_rgba(232,213,183,0.2)]">
            <IoSparklesOutline size={21} aria-hidden="true" />
          </div>
          <div>
            <p className="font-body mb-3 text-[10px] font-medium uppercase tracking-[0.24em] text-accent">{category} </p>
            <p className="font-display max-w-xl text-2xl uppercase leading-[0.98] text-white sm:text-4xl">{message}</p>
            <p className="font-body mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {error ? 'Connect Sanity and publish a project to bring this collection to life.' : 'The next case study is being shaped.'}
            </p>
          </div>
        </div>
        <div className="hidden w-32 shrink-0 flex-col gap-2 sm:flex" aria-hidden="true">
          <span className="h-1 w-full bg-accent/70" />
          <span className="h-1 w-3/4 bg-white/25" />
          <span className="h-1 w-1/2 bg-white/15" />
          <span className="mt-2 font-body text-[9px] uppercase tracking-[0.2em] text-white/40">Building next</span>
        </div>
      </div>
    </div>
  )
}

export default ProjectEmptyState
