import { ThemeProvider } from 'next-themes'
import { getMainLayout } from '@/layouts'
import type { AppProps } from '@/types/next'
import '@/styles/global.scss'
function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || getMainLayout

  return (
    <ThemeProvider attribute="class" storageKey="theme" value={{ dark: 'dark' }} enableSystem>
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  )
}

export default App
