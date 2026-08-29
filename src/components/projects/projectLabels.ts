import type { ProjectFilter } from '../../stores/useProjectsStore'

export const projectFilterLabels: Record<ProjectFilter, string> = {
  all: 'All',
  'ui-ux': 'UI / UX',
  apps: 'Apps',
  web: 'Web',
}

export const projectCategoryLabels = {
  'ui-ux': 'UI / UX',
  apps: 'App',
  web: 'Web',
} as const
