import { create } from 'zustand'
import { fetchProjects, type SanityProject } from '../lib/sanity'

type ProjectFilter = 'all' | 'ui-ux' | 'apps' | 'web'

type ProjectsState = {
  projects: SanityProject[]
  activeFilter: ProjectFilter
  isLoading: boolean
  error: string | null
  hasFetched: boolean
  setFilter: (filter: ProjectFilter) => void
  fetchProjects: () => Promise<void>
  filteredProjects: () => SanityProject[]
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  activeFilter: 'all',
  isLoading: false,
  error: null,
  hasFetched: false,
  setFilter: (activeFilter) => set({ activeFilter }),
  fetchProjects: async () => {
    if (get().hasFetched || get().isLoading) return
    set({ isLoading: true, error: null })

    try {
      const projects = await fetchProjects()
      set({ projects, isLoading: false, hasFetched: true })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Projects could not be loaded.',
      })
    }
  },
  filteredProjects: () => {
    const { activeFilter, projects } = get()
    return activeFilter === 'all' ? projects : projects.filter((project) => project.category === activeFilter)
  },
}))

export type { ProjectFilter }
