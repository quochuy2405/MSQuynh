/* eslint-disable @next/next/no-img-element */
import { getLanguage } from '@/i18-next'
import { Course } from '@/types/interface'
import { useRouter } from 'next/router'
import Styles from './Course.module.scss'

const link = 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

function Course({ name, description, maxVol, currentVol }: Course): JSX.Element {
  const { locale } = useRouter()
  const { courses, btn } = getLanguage(locale)
  return (
    <div className={Styles.course}>
      <div className={Styles.shadow}></div>
      <img src={link} alt="anh" className={Styles.thumbnail} />
      <div className={Styles.content}>
        <div className={Styles.contentNumber}>
          <p>{courses.count}: 20 </p>
          <div className={Styles.btnRegister}>{btn.register}</div>
        </div>
        <div className={Styles.contentText}>
          <p className={Styles.title}>Khóa học 2022 - Lớp 10</p>
          <p className={Styles.description}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos, consequatur? Unde odit sunt quia ratione{' '}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Course
