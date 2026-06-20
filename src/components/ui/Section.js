import styles from './Section.module.css'
import { cn } from '@/lib/utils'

export default function Section({ id, children, className }) {
  return (
    <section id={id} className={cn(styles.section, className)}>
      <div className={styles.container}>
        {children}
      </div>
    </section>
  )
}

export function SectionHeader({ children, centered }) {
  return (
    <div className={cn(styles.header, centered && styles.headerCentered)}>
      <div className={styles.headerAccent} />
      {children}
    </div>
  )
}
