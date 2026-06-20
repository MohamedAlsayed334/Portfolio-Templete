'use client'

import { ContentProvider } from '@/lib/content-context'

export default function ClientLayout({ children }) {
  return <ContentProvider>{children}</ContentProvider>
}
