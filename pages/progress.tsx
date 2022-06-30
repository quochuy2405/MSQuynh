/* eslint-disable @next/next/link-passhref */
import { Footer, Header, Metadata } from '@/components'
import { AppCtx } from '@/Context/GlobalContext'
import { getCourseById } from '@/firebase'
import { getLanguage } from '@/i18-next'
import type { Course } from '@/types/interface'
import type { NextPage } from '@/types/next'
import { Box, Button, IconButton, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { VscTrash } from 'react-icons/vsc'
import { BsCheck2Circle } from 'react-icons/bs'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { SiGoogletagmanager } from 'react-icons/si'
import Styles from '@/styles/pages/progress.module.scss'

const Register: NextPage = () => {
  const { locale } = useRouter()
  const { user } = useContext(AppCtx)
  const [listCourse, setListCode] = useState<Array<Course>>([])
  const { progress_page } = getLanguage(locale || 'vi')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetch = async () => {
      const courses = await getCourseById(user)
      setListCode(courses)
      setLoading(true)
    }
    fetch()
  }, [user?.userId])
  return (
    <>
      <Metadata title="Quản lý khóa học - Ms.Quynh" description="Quản lý khóa học - Ms.Quynh" />
      <Header />
      <div className="body">
        <h1 className={Styles.title}>
          <SiGoogletagmanager />
          <p>{progress_page?.titleList}</p>
        </h1>
        <TableContainer className={Styles.tableContainer}>
          {!loading ? (
            <Box>
              <Skeleton height={100} />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </Box>
          ) : (
            <Table style={{ borderRadius: '50px' }}>
              <TableHead style={{ backgroundColor: 'var(--color-base)' }}>
                <TableRow>
                  <TableCell className={Styles.cellHeader}>{progress_page?.headerTable?.col1}</TableCell>
                  <TableCell className={Styles.cellHeader}>{progress_page?.headerTable?.col2}</TableCell>
                  <TableCell className={Styles.cellHeader}>{progress_page?.headerTable?.col3}</TableCell>
                  <TableCell className={Styles.cellHeader}>{progress_page?.headerTable?.col4}</TableCell>

                  <TableCell className={Styles.cellHeader}>{progress_page?.headerTable?.col5}</TableCell>
                  <TableCell className={Styles.cellHeader}>{progress_page?.headerTable?.col6}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listCourse.map((course: Course) => (
                  <TableRow key={course?.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {course?.class_code}
                    </TableCell>

                    <TableCell>{course?.name}</TableCell>
                    <TableCell>{course?.student_name}</TableCell>
                    <TableCell>{course?.date_open}</TableCell>
                    <TableCell>
                      {course?.status ? (
                        <Button variant="outlined" color="success" disableFocusRipple startIcon={<BsCheck2Circle />}>
                          {progress_page?.button?.accept}
                        </Button>
                      ) : (
                        <Button variant="outlined" disableTouchRipple startIcon={<AiOutlineFieldTime />}>
                          {progress_page?.button?.wait}
                        </Button>
                      )}
                    </TableCell>

                    <TableCell>
                      <Button variant="outlined" color="error" disableFocusRipple startIcon={<VscTrash />}>
                        {progress_page?.button?.reject}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </div>
      <Footer />
    </>
  )
}

export default Register
