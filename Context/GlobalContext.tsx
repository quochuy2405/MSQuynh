import type { GlobalContextData, User } from '@/types/interface'
import { createContext } from 'react'

const userData: User = {
  userId: '',
  name: '',
  author: '',
  url: ''
}

const valueData: GlobalContextData = {
  user: userData,
  author: '',
  url: ''
}
const AppCtx = createContext<GlobalContextData>(valueData)
function GlobalContext({ children }: { children: React.ReactNode }) {
  return <AppCtx.Provider value={valueData}>{children}</AppCtx.Provider>
}

export { GlobalContext, AppCtx }
