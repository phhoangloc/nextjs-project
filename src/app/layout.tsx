
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/style/style.css'
import ThemeProvider from '@/context/themeContext'
import Header from '@/item/header'
import Footer from '@/item/footer'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lockheart and Coffee',
  description: 'Welcome to my coffee shop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
