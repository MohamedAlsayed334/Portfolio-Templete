'use client'

import Section, { SectionHeader } from './ui/Section'
import { useSkills } from '@/lib/content-context'
import styles from './Skills.module.css'

export default function Skills() {
  const skillCategories = useSkills()

  return (
    <Section id="skills">
      <SectionHeader>
        <h2>Skills & Expertise</h2>
      </SectionHeader>
      <div className={styles.grid}>
        {skillCategories?.map((cat) => (
          <div className={styles.category} key={cat.label}>
            <p className={styles.categoryLabel}>
              {cat.label}
            </p>
            <div className={styles.skillsList}>
              {cat.skills.map((s) => (
                <span className={styles.skill} key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
