'use client'

import Section, { SectionHeader } from './ui/Section'
import { useEducation } from '@/lib/content-context'
import styles from './Education.module.css'
import { cn } from '@/lib/utils'

export default function Education() {
  const education = useEducation()
  if (!education?.length) return null

  return (
    <Section id="education">
      <SectionHeader>
        <h2>Education</h2>
      </SectionHeader>
      <div className={styles.grid}>
        {education.map((item, i) => (
          <div
            key={i}
            className={cn(styles.card, item.image && styles.cardWithImage, i === 0 && styles.cardFeatured)}
          >
            {item.image ? (
              <div className={styles.imageWrap}>
                <img src={item.image} alt={item.title} />
              </div>
            ) : null}
            <div className={styles.body}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.degree}>{item.degree}</p>
              <p className={styles.meta}>
                {item.period}
                {item.institution && ` — ${item.institution}`}
              </p>
              <ul className={styles.details}>
                {item.details.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
              {item.status && (
                <span className={styles.status}>{item.status}</span>
              )}
              {item.achievement && (
                <span className={styles.achievement}>{item.achievement}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
