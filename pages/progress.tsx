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
  const { overview, btn, home_page } = getLanguage(locale || 'vi')
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
      <Metadata title="Trang chủ - Ms.Quynh Courses" description="Trang chủ - Ms.Quynh Courses" />
      <Header />
      <div className="body">
        <h1 className={Styles.title}>
          <SiGoogletagmanager />
          <p>Danh sách xác nhận</p>
        </h1>
        <TableContainer className={Styles.tableContainer}>
          {!loading ? (
            <Box>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </Box>
          ) : (
            <Table style={{ borderRadius: '50px' }}>
              <TableHead style={{ backgroundColor: 'var(--color-base)' }}>
                <TableRow>
                  <TableCell className={Styles.cellHeader}>Mã lớp</TableCell>
                  <TableCell className={Styles.cellHeader} align="right">
                    Tên khóa học
                  </TableCell>
                  <TableCell className={Styles.cellHeader} align="right">
                    Thời gian khai giảng
                  </TableCell>

                  <TableCell className={Styles.cellHeader} align="right">
                    Tình trang đăng ký
                  </TableCell>
                  <TableCell className={Styles.cellHeader} align="right">
                    Hủy đăng ký
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listCourse.map((course: Course) => (
                  <TableRow key={course?.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {course?.class_code}
                    </TableCell>
                    <TableCell align="right">{course?.name}</TableCell>
                    <TableCell align="right">{course?.date_open}</TableCell>
                    <TableCell align="right">
                      {course?.status ? (
                        <Button variant="outlined" color="success" disableFocusRipple startIcon={<BsCheck2Circle />}>
                          Đã xác nhận
                        </Button>
                      ) : (
                        <Button variant="outlined" disableTouchRipple startIcon={<AiOutlineFieldTime />}>
                          Chờ xác nhận
                        </Button>
                      )}
                    </TableCell>

                    <TableCell align="right">
                      <Button variant="outlined" color="error" disableFocusRipple startIcon={<VscTrash />}>
                        Hủy
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
