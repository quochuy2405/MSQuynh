/* eslint-disable @next/next/link-passhref */
import { Footer, Header, Metadata } from '@/components'
import { getLanguage } from '@/i18-next'
import type { Course } from '@/types/interface'
import type { NextPage } from '@/types/next'
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { VscTrash } from 'react-icons/vsc'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { getCourseById } from '@/firebase'
import { AppCtx } from '@/Context/GlobalContext'
import type { PartialWithFieldValue } from 'firebase/firestore/lite'

const Register: NextPage = () => {
  const { locale } = useRouter()
  const { user } = useContext(AppCtx)
  const [listCourse, setListCode] = useState<Array<Course>>([])
  const { overview, btn, home_page } = getLanguage(locale || 'vi')
  useEffect(() => {
    const fetch = async () => {
      const courses = await getCourseById(user)
      setListCode(courses)
    }
    fetch()
  }, [user.userId])
  return (
    <>
      <Metadata title="Trang chủ - Ms.Quynh Courses" description="Trang chủ - Ms.Quynh Courses" />
      <Header />
      <div className="body">
        <TableContainer style={{ margin: '100px auto', width: '75%' }}>
          <Table style={{ borderRadius: '50px' }}>
            <TableHead style={{ backgroundColor: 'var(--color-base)' }}>
              <TableRow>
                <TableCell style={{ color: 'white', fontWeight: '600' }}>Mã lớp</TableCell>
                <TableCell style={{ color: 'white', fontWeight: '600' }} align="right">
                  Tên khóa học
                </TableCell>
                <TableCell style={{ color: 'white', fontWeight: '600' }} align="right">
                  Thời gian đăng ký
                </TableCell>
                <TableCell style={{ color: 'white', fontWeight: '600' }} align="right">
                  Số lượng
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
                  <TableCell align="right">{row?.current_vol}</TableCell>
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
        </TableContainer>
      </div>
      <Footer />
    </>
  )
}

export default Register
