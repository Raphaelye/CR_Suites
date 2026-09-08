import { projectFilterLabels } from './projectLabels.ts'
import { useProjectsStore, type ProjectFilter } from '../../stores/useProjectsStore'

const filters: ProjectFilter[] = ['all', 'ui-ux', 'apps', 'web']

function ProjectFilterTabs() {
  const activeFilter = useProjectsStore((state) => state.activeFilter)
  const setFilter = useProjectsStore((state) => state.setFilter)

  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2" role="group" aria-label="Filter projects by category">
      {filters.map((filter) => {
        const isActive = activeFilter === filter
        return (
          <button
            key={filter}
            type="button"
            aria-pressed={isActive}
            onClick={() => setFilter(filter)}
            className={`font-body rounded-full border px-3 py-2 text-[10px] font-medium uppercase tracking-widest transition-colors sm:px-3.5 sm:py-2.5 sm:text-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${isActive ? 'border-accent bg-accent text-black' : 'border-white/20 bg-white/2 text-muted hover:border-accent hover:text-white'}`}
          >
            {projectFilterLabels[filter]}
          </button>
        )
      })}
    </div>
  )
}

export default ProjectFilterTabs
