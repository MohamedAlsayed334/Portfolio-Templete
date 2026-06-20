'use client'

import styles from './Button.module.css'
import { cn } from '@/lib/utils'

export default function Button({ variant = 'secondary', className, children, icon: Icon, ...props }) {
  return (
    <button className={cn(styles.btn, styles[variant], className)} {...props}>
      {variant === 'brand' && <span className={styles.bottomEdge} />}
      {Icon && <Icon className={styles.icon} />}
      {children}
    </button>
  )
}
