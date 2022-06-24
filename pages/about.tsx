/* eslint-disable @next/next/link-passhref */
import { Footer, Header, ListCourse, Metadata } from '@/components'
import { getLanguage } from '@/i18-next'
import Styles from '@/styles/pages/index.module.scss'
import type { Course } from '@/types/interface'
import type { NextPage } from '@/types/next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import teacher from '@/public/imgquynh.png'
import { Step, StepLabel, Stepper } from '@mui/material'
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab'
const listCourse: Array<Course> = []

const steps = ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad']

const About: NextPage = () => {
  const { locale } = useRouter()
  const { overview, btn, home_page } = getLanguage(locale || 'vi')

  return (
    <>
      <Metadata title="About - Ms.Quynh Courses" description="Trang chủ - Ms.Quynh Courses" />
      <Header />
      <div className="body">
        <div className={Styles.overView}>
          <Stepper alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Timeline position="alternate">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Secondary</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot variant="outlined" />
              </TimelineSeparator>
              <TimelineContent>Success</TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>

        <div className={Styles.overViewListCourse}>
          <div className={Styles.titleList}>
            <p>{home_page.findTheCourse}</p>
          </div>
          <ListCourse size={6} list={listCourse} />
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

export default About
