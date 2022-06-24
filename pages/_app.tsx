import { ThemeProvider } from 'next-themes'
import { getMainLayout } from '@/layouts'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import type { AppProps } from '@/types/next'
import '@/styles/global.scss'
import { GlobalContext } from '@/Context/GlobalContext'
function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || getMainLayout

  return (
    <GlobalContext>
      <ThemeProvider attribute="class" storageKey="theme" value={{ dark: 'dark' }} enableSystem>
        <LocalizationProvider dateAdapter={AdapterDateFns}>{getLayout(<Component {...pageProps} />)}</LocalizationProvider>
      </ThemeProvider>
    </GlobalContext>
  )
}

export default App
