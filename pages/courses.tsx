/* eslint-disable @next/next/link-passhref */
import { Footer, Header, ListCourse, Metadata } from '@/components'
import { AppCtx } from '@/Context/GlobalContext'
import { getCourses } from '@/firebase'
import { getLanguage } from '@/i18-next'
import Styles from '@/styles/pages/courses.module.scss'
import type { Course } from '@/types/interface'
import type { NextPage } from '@/types/next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

const Courses: NextPage = () => {
  const { locale } = useRouter()
  const { course_page } = getLanguage(locale || 'vi')
  const [courses, setCourses] = useState<Array<Course>>()
  const { setLoadingCourse } = useContext(AppCtx)
  useEffect(() => {
    setLoadingCourse(false)
    const fetch = async () => {
      const courses: Array<Course> = await getCourses()
      setCourses(courses)
      setLoadingCourse(true)
    }
    fetch()
  }, [])
  return (
    <>
      <Metadata title="Khóa học - Ms.Quynh" description="Khóa học - Ms.Quynh" />
      <Header />
      <div className="body">
        <div className={Styles.overView}>
          <div className={Styles.overViewText}>
            <p className={Styles.overViewTitle}>{course_page.title} </p>
          </div>
          <div className={Styles.overViewImage}>
            <img src={'https://teachenglish.vus.edu.vn/wp-content/uploads/2022/04/Group-12816@2x.jpg'} alt="" />
          </div>
        </div>

        <div className={Styles.overViewListCourse}>
          <div className={Styles.titleList}>
            <p>{course_page.findTheCourse}</p>
          </div>
          <ListCourse list={courses} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Courses
