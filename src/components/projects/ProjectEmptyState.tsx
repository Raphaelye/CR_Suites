import { useProjectsStore } from '../../stores/useProjectsStore'
import { projectFilterLabels } from './projectLabels'

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
    <div className="flex min-h-80 w-full flex-col items-center justify-center border border-white/15 px-6 text-center">
      <p className="font-display text-3xl uppercase leading-none text-white sm:text-4xl">{message}</p>
      <p className="font-body mt-4 max-w-sm text-sm leading-relaxed text-muted">
        {error ? 'Connect Sanity and publish a project to bring this collection to life.' : 'The next case study is being shaped.'}
      </p>
    </div>
  )
}

export default ProjectEmptyState
