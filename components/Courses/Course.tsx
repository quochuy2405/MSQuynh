/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { getLanguage } from '@/i18-next'
import type { Course as TCourse } from '@/types/interface'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Styles from './Course.module.scss'

const link = 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

function Course({ name, description, max_vol, current_vol, class_code }: TCourse): JSX.Element {
  const { locale } = useRouter()
  const { courses, btn } = getLanguage(locale || 'vi')
  return (
    <div className={Styles.course}>
      <div className={Styles.shadow}></div>
      <img src={link} alt="anh" className={Styles.thumbnail} />
      <div className={Styles.content}>
        <div className={Styles.contentNumber}>
          <p>
            {courses.count}:{current_vol}/{max_vol}
          </p>
          <Link href={`/register-form?classid=${class_code}`}>
            <div className={Styles.btnRegister}>{btn.register}</div>
          </Link>
        </div>
        <div className={Styles.contentText}>
          <p className={Styles.title}>
            {name}
            {class_code}
          </p>
          <p className={Styles.description}>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default Course
