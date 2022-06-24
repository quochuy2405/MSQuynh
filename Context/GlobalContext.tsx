import type { User } from '@/types/interface'
import type { Dispatch, SetStateAction } from 'react'
import { createContext, useState } from 'react'

const AppCtx = createContext({
  user: {} as Partial<User>,
  setUser: {} as Dispatch<SetStateAction<User>>,
  loadingCourse: {} as Partial<boolean>,
  setLoadingCourse: {} as Dispatch<SetStateAction<boolean>>,
  login: {} as Partial<boolean>,
  setLogin: {} as Dispatch<SetStateAction<boolean>>
})
const userData: User = {
  userId: '',
  name: '',
  author: '',
  url: ''
}
const GlobalContext = ({ children }: { children: React.ReactNode; value?: Partial<User> }) => {
  const [user, setUser] = useState(userData)
  const [loadingCourse, setLoadingCourse] = useState(false)
  const [login, setLogin] = useState<boolean>(false)
  const dataValue = {
    user,
    setUser,
    loadingCourse,
    setLoadingCourse,
    login,
    setLogin
  }
  return <AppCtx.Provider value={dataValue}>{children}</AppCtx.Provider>
}
export { GlobalContext, AppCtx }
