import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { Image } from '@sanity/types'

export type SanityProject = {
  _id: string
  title: string
  slug?: { current: string }
  category: 'ui-ux' | 'apps' | 'web'
  description: string
  thumbnail?: Image
  liveUrl?: string
  caseStudyUrl?: string
  featured?: boolean
}

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET ?? 'production'

const validProjectId = projectId && /^[a-z0-9-]+$/i.test(projectId) ? projectId : undefined
const validDataset = /^[a-z0-9_-]+$/i.test(dataset) ? dataset : 'production'

export const sanityClient = createClient({
  projectId: validProjectId || 'invalid-project-id',
  dataset: validDataset,
  apiVersion: '2025-01-01',
  useCdn: true,
  perspective: 'published',
})

const imageBuilder = createImageUrlBuilder(sanityClient)

export function projectImageUrl(source: Image | undefined) {
  if (!source) return undefined
  return imageBuilder.image(source).auto('format').fit('crop').width(1000).url()
}

export function safeExternalUrl(value: string | undefined) {
  if (!value) return undefined

  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : undefined
  } catch {
    return undefined
  }
}

export async function fetchProjects() {
  if (!validProjectId) {
    throw new Error('Sanity is not configured. Add VITE_SANITY_PROJECT_ID to your environment.')
  }

  return sanityClient.fetch<SanityProject[]>(`*[_type == "project"] | order(featured desc, _createdAt desc) {
    _id,
    title,
    slug,
    category,
    description,
    thumbnail,
    liveUrl,
    caseStudyUrl,
    featured
  }`)
}
