import { NextAuthProvider } from '@/providers/auth'
import type { Metadata } from 'next'
import './globals.css'

import { Poppins } from 'next/font/google'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { ToastProvider } from '@/providers/toast'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'FSW Trips',
  description: 'Sistema de Reservas de Viagens',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <NextAuthProvider>
          <ToastProvider>
            <div className="flex flex-col h-screen">
              <div className="h-[94px]">
                <Header />
              </div>
              <div className="flex flex-1 mx-auto">{children}</div>
              <Footer />
            </div>
          </ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
