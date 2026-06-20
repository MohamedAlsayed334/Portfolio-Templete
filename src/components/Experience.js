'use client'

import Section, { SectionHeader } from './ui/Section'
import { Briefcase } from 'lucide-react'
import { useExperience } from '@/lib/content-context'
import styles from './Experience.module.css'

export default function Experience() {
  const experience = useExperience()
  if (!experience?.length) return null

  return (
    <Section id="experience">
      <SectionHeader>
        <h2>Experience</h2>
      </SectionHeader>
      {experience.map((item, i) => (
        <div className={styles.card} key={i}>
          <div className={styles.header}>
            <div className={styles.iconWrap}>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.company}
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'block' }}
                />
              ) : null}
              <Briefcase style={item.image ? { display: 'none' } : {}} />
            </div>
            <div className={styles.info}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.company}>{item.company}</p>
              <p className={styles.period}>{item.period}</p>
            </div>
          </div>
          <ul className={styles.details}>
            {item.details.map((d, j) => (
              <li key={j}>{d}</li>
            ))}
          </ul>
        </div>
      ))}
    </Section>
  )
}
