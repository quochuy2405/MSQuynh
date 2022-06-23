import { useRouter } from 'next/router'
import Link from 'next/link'
interface navLink {
  href: string
  exact?: boolean
  children?: React.ReactNode
  className?: string
}

function NavLink({ href, exact, children, className }: navLink): JSX.Element {
  const { pathname } = useRouter()
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  if (isActive) {
    className += ' active'
  }

  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  )
}
export default NavLink
