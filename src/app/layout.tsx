
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/style/style.css'
import ThemeProvider from '@/context/themeContext'
import UserProvider from '@/context/UserContext'
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
        <UserProvider>
          <ThemeProvider>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  )
}
