/* eslint-disable @next/next/link-passhref */
import { Footer, Header, ListCourse, Metadata } from '@/components'
import { getLanguage } from '@/i18-next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import type { Course } from '@/types/interface'
import type { NextPage } from '@/types/next'
import Styles from '@/styles/pages/index.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import teacher from '@/public/imgquynh.png'
import { getCourses } from '@/firebase'
import { AnyRecord } from 'dns'

const Home: NextPage = () => {
  const { locale } = useRouter()
  const [courses, setCourses] = useState<Array<Course>>()
  const { overview, btn, home_page } = getLanguage(locale || 'vi')

  useEffect(() => {
    const fetch = async () => {
      const courses: Array<any> = await getCourses()
      setCourses(courses)
    }
    fetch()
  }, [])

  return (
    <>
      <Metadata title="Trang chủ - Ms.Quynh Courses" description="Trang chủ - Ms.Quynh Courses" />
      <Header />
      <div className="body">
        <div className={Styles.overView}>
          <div className={Styles.overViewText}>
            <p className={Styles.overViewTitle}>{overview.title} </p>
            <p className={Styles.overViewDescription}>{overview.description}</p>
            <Link href={'/register'}>
              <p className={Styles.btnRegister}> {btn.register}</p>
            </Link>
          </div>
          <div className={Styles.overViewImage}>
            <img src={'https://teachenglish.vus.edu.vn/wp-content/uploads/2022/04/Group-12816@2x.jpg'} alt="" />
          </div>
        </div>

        <div className={Styles.overViewListCourse}>
          <div className={Styles.titleList}>
            <p>{home_page.findTheCourse}</p>
          </div>
          <ListCourse size={6} list={courses} />
        </div>
        <div className={Styles.welcome}>
          <div className={Styles.welcomeContent}>
            <p className={Styles.welcomeTitle}>{home_page.developQualityTitle}</p>
            <p className={Styles.welcomeDescription}>{home_page.developQualityDes}</p>
          </div>
          <div className={Styles.imgContent}>
            <Image src={teacher} alt="teacher" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
