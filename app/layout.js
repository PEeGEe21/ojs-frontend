import { Inter } from 'next/font/google'
import './styles/globals.css'
import { SpaceFont, MontFont } from './font';
import { Toaster } from 'react-hot-toast';


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${MontFont.variable} ${MontFont.className}`} suppressHydrationWarning={true}>
        <Toaster/>
        {children}
      </body>
    </html>
  )
}
