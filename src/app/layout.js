import './globals.css'
import ScanOverlay from '@/components/ScanOverlay'
import ScrollToTop from '@/components/ScrollToTop'
import ClientLayout from '@/components/ClientLayout'

export const metadata = {
  title: 'Your Name | Portfolio',
  description: 'Your title | Your tagline',
  icons: {
    icon: '/images/icon.webp',
  },
  openGraph: {
    title: 'Your Name - Portfolio',
    description: 'Your description here',
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
