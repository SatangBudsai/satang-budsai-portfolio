export type ProjectStatus = 'COMPLETED' | 'IN-PROGRESS' | 'ARCHIVED'

export type ProjectDifficulty = 1 | 2 | 3 | 4 | 5

export interface Project {
  slug: string
  title: string
  description: string
  longDescription?: string
  tags: string[]
  status: ProjectStatus
  difficulty: ProjectDifficulty
  featured: boolean
  coverImage: string
  demoUrl?: string
  codeUrl?: string
  content?: string
}
