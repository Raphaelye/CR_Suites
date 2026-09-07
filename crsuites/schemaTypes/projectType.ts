import {defineType, defineField} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'UI / UX', value: 'ui-ux'},
          {title: 'Apps', value: 'apps'},
          {title: 'Web', value: 'web'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buildType',
      title: 'Build type',
      type: 'string',
      options: {
        list: [
          {title: 'Personal', value: 'personal'},
          {title: 'Client', value: 'client'},
          {title: 'Demo', value: 'demo'},
        ],
        layout: 'radio',
      },
      initialValue: 'personal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cardImage',
      title: 'Card preview image',
      type: 'image',
      options: {hotspot: true},
      description: 'Optional override for the default card preview; falls back to thumbnail when empty.',
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Example: Solo — design & development',
    }),
    defineField({
      name: 'stack',
      title: 'Stack',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'problem',
      title: 'Problem / goal',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'process',
      title: 'Process steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'stepTitle',
              title: 'Step title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'stepDescription',
              title: 'Step description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'caseStudyUrl',
      title: 'Case study URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'featured',
      title: 'Featured project',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      buildType: 'buildType',
      media: 'thumbnail',
    },
    prepare({title, category, buildType, media}) {
      const labels: Record<string, string> = {
        'ui-ux': 'UI / UX',
        apps: 'Apps',
        web: 'Web',
      }
      const buildTypeLabels: Record<string, string> = {
        personal: 'Personal',
        client: 'Client',
        demo: 'Demo',
      }

      return {
        title,
        subtitle: `${labels[category] || category}${buildType ? ` · ${buildTypeLabels[buildType] || buildType}` : ''}`,
        media,
      }
    },
  },
})
