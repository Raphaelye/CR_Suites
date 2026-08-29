import type { IconType } from 'react-icons'
import {
  IoCodeSlashOutline,
  IoColorPaletteOutline,
  IoPhonePortraitOutline,
} from 'react-icons/io5'

export type Discipline = {
  number: string
  title: string
  description: string
  tools: string[]
  icon: IconType
}

export const disciplines: Discipline[] = [
  {
    number: '01',
    title: 'Web development',
    description: 'Fast, expressive websites that give a good idea the room to become a real experience.',
    tools: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Sanity'],
    icon: IoCodeSlashOutline,
  },
  {
    number: '02',
    title: 'Mobile development',
    description: 'Mobile products with a clear point of view, considered flows, and just enough motion.',
    tools: ['React Native', 'Expo', 'Firebase', 'Figma', 'TypeScript', 'Sanity'],
    icon: IoPhonePortraitOutline,
  },
  {
    number: '03',
    title: 'UI design',
    description: 'Visual systems that make complex things feel simple, useful, and unmistakably yours.',
    tools: ['Figma', 'FigJam', 'Prototyping', 'Design systems', 'Wireframing'],
    icon: IoColorPaletteOutline,
  },
]

export const allTools = [
  'React', 'React Native', 'TypeScript', 'JavaScript', 'HTML', 'CSS',
  'Tailwind CSS', 'Vite', 'Figma', 'FigJam', 'Firebase', 'Expo',
  'Framer Motion', 'Git', 'GitHub', 'Sanity', 'Next.js'
]
