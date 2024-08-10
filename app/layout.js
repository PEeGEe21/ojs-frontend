import { Inter } from 'next/font/google'
import './styles/globals.css'
import { SpaceFont } from './font';


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${SpaceFont.variable} ${SpaceFont.className}`} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
