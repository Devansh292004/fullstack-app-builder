import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'A1 App Foundry',
  description: 'Luxury-grade App Meta-builder',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
