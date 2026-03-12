import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import type { Project } from '@/types/project'

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects')

export async function getAllProjects(): Promise<Project[]> {
  if (!fs.existsSync(PROJECTS_DIR)) return []

  const files = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.md'))

  const projects = files.map(file => {
    const slug = file.replace(/\.md$/, '')
    const fullPath = path.join(PROJECTS_DIR, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return { slug, ...data } as Project
  })

  return projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const fullPath = path.join(PROJECTS_DIR, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)

  return {
    slug,
    ...data,
    content: String(processedContent)
  } as Project
}
