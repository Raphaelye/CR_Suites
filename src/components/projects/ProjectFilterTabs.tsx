import { projectFilterLabels } from './projectLabels.ts'
import { useProjectsStore, type ProjectFilter } from '../../stores/useProjectsStore'

const filters: ProjectFilter[] = ['all', 'ui-ux', 'apps', 'web']

function ProjectFilterTabs() {
  const activeFilter = useProjectsStore((state) => state.activeFilter)
  const setFilter = useProjectsStore((state) => state.setFilter)

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
      {filters.map((filter) => {
        const isActive = activeFilter === filter
        return (
          <button
            key={filter}
            type="button"
            aria-pressed={isActive}
            onClick={() => setFilter(filter)}
            className={`font-body border px-4 py-3 text-xs font-medium uppercase tracking-[0.12em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${isActive ? 'border-accent bg-accent text-black' : 'border-white/20 text-muted hover:border-accent hover:text-white'}`}
          >
            {projectFilterLabels[filter]}
          </button>
        )
      })}
    </div>
  )
}

export default ProjectFilterTabs
