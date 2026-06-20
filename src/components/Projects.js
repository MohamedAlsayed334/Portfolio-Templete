'use client'

import { ExternalLink } from './ui/Icons'
import Section, { SectionHeader } from './ui/Section'
import { useProjects } from '@/lib/content-context'
import styles from './Projects.module.css'

export default function Projects() {
  const projects = useProjects()

  return (
    <Section id="projects">
      <SectionHeader>
        <h2>Projects</h2>
      </SectionHeader>
      <div className={styles.grid}>
        {projects?.map((project, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.cardBody}>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.body}>{project.description}</p>
              <div className={styles.techs}>
                {project.tech.map((t) => (
                  <span className={styles.tech} key={t}>{t}</span>
                ))}
              </div>
              <ul className={styles.features}>
                {project.features.slice(0, 3).map((f, j) => (
                  <li key={j}>{f}</li>
                ))}
              </ul>
              <div className={styles.footer}>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  <ExternalLink className={styles.linkIcon} />
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
