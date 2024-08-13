import { Inter } from 'next/font/google'
import './styles/globals.css'
import { SpaceFont, MontFont } from './font';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers/Providers';


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${MontFont.variable} ${MontFont.className}`} suppressHydrationWarning={true}>
        <Providers>
          <Toaster/>
            {children}
        </Providers>
      </body>
    </html>
  )
}
