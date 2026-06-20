import './globals.css'
import ScanOverlay from '@/components/ScanOverlay'
import ScrollToTop from '@/components/ScrollToTop'
import ClientLayout from '@/components/ClientLayout'

export const metadata = {
  title: 'Mohamed Alsayed | Portfolio',
  description: 'Sophomore @ FCAI Cairo University | Backend AI Engineer - intern @ FlyRank AI | Full-Stack Dev | Passionate about AI & Agentic AI',
  icons: {
    icon: '/images/icon.webp',
  },
  openGraph: {
    title: 'Mohamed Alsayed - Portfolio',
    description: 'Computer Science student at Cairo University | AI Enthusiast | Full-Stack Developer| AI & Agentic AI',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="mesh-bg" aria-hidden="true">
          <div className="blob" />
          <div className="blob" />
          <div className="blob" />
          <div className="blob" />
          <div className="blob" />
        </div>
        <ScanOverlay />
        <div className="particles" aria-hidden="true">
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
        </div>
        <ClientLayout>{children}</ClientLayout>
        <ScrollToTop />
      </body>
    </html>
  )
}
