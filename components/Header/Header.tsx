/* eslint-disable @next/next/no-img-element */
import DialogLogin from '@/components/Dialog/DialogLogin'
import Navlink from '@/components/NavLink'
import { changeLanguage, getLanguage } from '@/i18-next'
import Logo from '@/public/logo.svg'
import classnames from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MdLanguage } from 'react-icons/md'
import Styles from './Header.module.scss'

function Header(): JSX.Element {
  const router = useRouter()
  const { locale } = router
  const { navlinks, btn } = getLanguage(locale || 'vi')
  const [onTop, setOnTop] = useState<boolean>(false)
  const [login, setLogin] = useState<boolean>(false)
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
        <div className={Styles.btnLogin} onClick={() => setLogin(true)}>
          <p>{btn.login}</p>
        </div>
        <Link href={'/register'}>
          <div className={Styles.btnRegister}>
            <p>{btn.register}</p>
          </div>
        </Link>
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
