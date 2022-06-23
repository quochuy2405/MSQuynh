/* eslint-disable @next/next/no-img-element */
import Styles from './Header.module.scss'
import Navlink from '@/components/NavLink'
import Logo from '@/public/logo.svg'
import { useRouter } from 'next/router'
import { changeLanguage, getLanguage } from '@/i18-next'
import { MdLanguage } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import classnames from 'clsx'

function Header(): JSX.Element {
  const router = useRouter()
  const { locale } = router
  const { navlinks, btn } = getLanguage(locale)
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
  const [onTop, setOnTop] = useState<boolean>(false)

  useEffect(() => {
    window.addEventListener('scroll', () => setOnTop(window.scrollY !== 0))
  }, [])
  return (
    <div className={classnames(Styles.header, onTop && Styles.onTop)}>
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
        <div className={Styles.btnLogin}>
          <p>{btn.login}</p>
        </div>
        <Link href={'/register'}>
          <div className={Styles.btnRegister}>
            <p>{btn.register}</p>
          </div>
        </Link>
        <div className={Styles.btnChangeLang} onClick={() => changeLanguage(locale, router)}>
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
