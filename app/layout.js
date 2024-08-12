import { Inter } from 'next/font/google'
import './styles/globals.css'
import { SpaceFont, MontFont } from './font';


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${MontFont.variable} ${MontFont.className}`} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
