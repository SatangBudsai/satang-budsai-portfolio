import HeroSection from '@/views/portfolio/HeroSection'
import AboutSection from '@/views/portfolio/AboutSection'
import SkillsSection from '@/views/portfolio/SkillsSection'
import ProjectsSection from '@/views/portfolio/ProjectsSection'
import ContactSection from '@/views/portfolio/ContactSection'
import { getAllProjects } from '@/lib/projects'

export default async function Home() {
  const projects = await getAllProjects()

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection projects={projects} />
      <ContactSection />
    </main>
  )
}
