/* eslint-disable @next/next/link-passhref */
import { Footer, Header, Metadata } from '@/components'
import { AppCtx } from '@/Context/GlobalContext'
import { getCourseById } from '@/firebase'
import { getLanguage } from '@/i18-next'
import type { Course } from '@/types/interface'
import type { NextPage } from '@/types/next'
import { Box, Grow, IconButton, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Zoom from '@mui/material/Zoom'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { VscTrash } from 'react-icons/vsc'

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
  }, [user.userId])
  return (
    <>
      <Metadata title="Trang chủ - Ms.Quynh Courses" description="Trang chủ - Ms.Quynh Courses" />
      <Header />
      <div className="body">
        <TableContainer style={{ margin: '100px auto', width: '75%', minHeight: '60vh' }}>
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
                  <TableCell style={{ color: 'white', fontWeight: '600' }}>Mã lớp</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: '600' }} align="right">
                    Tên khóa học
                  </TableCell>
                  <TableCell style={{ color: 'white', fontWeight: '600' }} align="right">
                    Thời gian khai giảng
                  </TableCell>

                  <TableCell style={{ color: 'white', fontWeight: '600' }} align="right">
                    Tình trang đăng ký
                  </TableCell>
                  <TableCell style={{ color: 'white', fontWeight: '600' }} align="right">
                    Hủy đăng ký
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listCourse.map((row: Course) => (
                  <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row?.class_code}
                    </TableCell>
                    <TableCell align="right">{row?.name}</TableCell>
                    <TableCell align="right">{row?.max_vol}</TableCell>

                    <TableCell align="right">Chưa xác nhận</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="delete" size="large">
                        <VscTrash color="#c22727" />
                      </IconButton>
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
