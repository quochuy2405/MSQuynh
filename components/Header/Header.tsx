/* eslint-disable @next/next/no-img-element */
import DialogLogin from '@/components/Dialog/DialogLogin'
import { Navlink } from '@/components'
import { AppCtx } from '@/Context/GlobalContext'
import { changeLanguage, getLanguage } from '@/i18-next'
import Logo from '@/public/logo.svg'
import classnames from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { MdLanguage } from 'react-icons/md'
import Styles from './Header.module.scss'
import Image from 'next/image'
import { logoutUser } from '@/firebase'
import { getAuth } from 'firebase/auth'

function Header(): JSX.Element {
  const { user, setUser, login, setLogin } = useContext(AppCtx)
  const router = useRouter()
  const { locale } = router
  const { navlinks, btn } = getLanguage(locale || 'vi')
  const [onTop, setOnTop] = useState<boolean>(false)

  const links = [
    {
      name: navlinks.home,
      link: '/'
    },
    {
      name: navlinks.courses,
      link: '/courses'
    },
    {
      name: navlinks.about,
      link: '/about'
    },
    {
      name: navlinks.contact,
      link: '/contact'
    }
  ]
  useEffect(() => {
    getAuth().onAuthStateChanged((u) => {
      if (u) {
        setUser({
          name: u.displayName,
          url: u.photoURL,
          userId: u.uid
        })
      } else {
        setUser({
          name: '',
          url: '',
          userId: ''
        })
      }
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', () => setOnTop(window.scrollY !== 0))
  }, [])

  return (
    <div className={classnames(Styles.header, onTop && Styles.onTop)}>
      <DialogLogin open={login} setOpen={setLogin} />
      <div className={Styles.logo}>
        <Image src={Logo} alt="logo" />
      </div>
      <div className={Styles.navLinks}>
        {links.map((item) => (
          <Navlink exact key={item.link + item.name} href={item.link} className="link">
            {item?.name}
          </Navlink>
        ))}
      </div>
      <div className={Styles.btnGroup}>
        {!user.userId ? (
          <div className={Styles.btnLogin} onClick={() => setLogin(true)}>
            <p>{btn.login}</p>
          </div>
        ) : (
          <>
            <Image src={user.url || ''} alt={user.name || ''} width={'30'} height={'30'} style={{ borderRadius: '100rem' }} />
            <div className={Styles.btnRegister} onClick={() => logoutUser()}>
              <p>{btn.logout}</p>
            </div>
          </>
        )}
        <div className={Styles.btnChangeLang} onClick={() => changeLanguage(locale || 'vi', router)}>
          <p>
            <MdLanguage />
            {btn.changeLang}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Header
