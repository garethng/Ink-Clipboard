import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ClerkProvider } from "@clerk/nextjs";
import Metrics from './metrics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ink Cloud Clipboard',
  description: 'Your own cross-platform clipboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
        <Metrics />
      </html>
    </ClerkProvider>
  )
}
