/* eslint-disable @next/next/link-passhref */
import { Footer, Header, Metadata } from '@/components'
import { createStudent } from '@/firebase'
import { getLanguage } from '@/i18-next'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { useRouter } from 'next/router'
import React, { forwardRef, TextareaHTMLAttributes, useState } from 'react'
import { Box, Button, Checkbox, FormControlLabel, Grow, TextField } from '@mui/material'
import type { Course, Student } from '@/types/interface'
import type { NextPage } from '@/types/next'
import type { AlertColor, AlertProps } from '@mui/material/Alert'
import type { SnackbarOrigin } from '@mui/material/Snackbar'
import Styles from '@/styles/pages/register-form.module.scss'
import classnames from 'clsx'
import MuiAlert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

interface Notice {
  message: string
  type: AlertColor
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const position: SnackbarOrigin = {
  vertical: 'bottom',
  horizontal: 'right'
}

const Home: NextPage = () => {
  const { locale, query } = useRouter()
  const { btn, register_page } = getLanguage(locale || 'vi')
  const [open, setOpen] = useState(false)
  const [notice, setNotice] = useState<Notice>({
    message: '',
    type: 'info'
  })
  const [student, setStudent] = useState<Student>({
    name: '',
    birth_day: '',
    phone_number: '',
    class_code: '',
    email: ''
  })
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // set value is required
    student.birth_day = student.birth_day.split(',')[0]
    student.class_code = query?.classid

    if (student.class_code && student.name) {
      const success = await createStudent(student)
      setOpen(true)
      if (success) {
        setNotice({ message: 'Đăng ký thành công', type: 'success' })
      } else {
        setNotice({ message: 'Đăng ký thất bại!', type: 'error' })
      }
    } else {
      setNotice({ message: 'Đăng ký thất bại!', type: 'error' })
    }
  }

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStudent({ ...student, [event.target.name]: event.target.value })
  }
  return (
    <>
      <Metadata title="Trang chủ - Ms.Quynh Courses" description="Trang chủ - Ms.Quynh Courses" />
      <Header />
      <Snackbar open={open} anchorOrigin={{ ...position }} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notice.type || 'info'} sx={{ width: '100%' }}>
          {notice.message || 'Nothing!!!'}
        </Alert>
      </Snackbar>
      <form method="post" className={classnames(Styles.inputForm, 'body')} onSubmit={handleRegister}>
        <p className={Styles.title}>{btn.register}</p>
        <div className={Styles.groupInput}>
          <Box width={'100%'} flexDirection="column" display={'flex'} gap={'20px'}>
            <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...{ timeout: 1000 }}>
              <TextField
                size="small"
                id="outlined-classCode"
                className={Styles.classCode}
                label={register_page.classCode}
                variant="outlined"
                name="class_code"
                value={query?.classid}
                disabled
                fullWidth
                required
              />
            </Grow>
            {/* Conditionally applies the timeout prop to change the entry speed. */}
            <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...{ timeout: 1000 }}>
              <TextField
                size="small"
                id="outlined-nameStudent"
                label={register_page.name}
                variant="outlined"
                className={Styles.nameStudent}
                name="name"
                value={student?.name}
                onChange={(e) => handleOnchange(e)}
                fullWidth
                required
              />
            </Grow>
            <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...{ timeout: 1000 }}>
              <TextField
                size="small"
                id="outlined-phone"
                label={register_page.phone}
                variant="outlined"
                className={Styles.phoneNumber}
                name="phone_number"
                value={student.phone_number}
                onChange={(e) => handleOnchange(e)}
                fullWidth
                required
              />
            </Grow>

            <MobileDatePicker
              label={register_page.birthDay}
              inputFormat="MM/dd/yyyy"
              value={student?.birth_day}
              onChange={(e) => setStudent({ ...student, birth_day: new Date(e.getTime()).toLocaleString() })}
              renderInput={(params) => (
                <div>
                  <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...{ timeout: 1000 }}>
                    <TextField size="small" {...params} fullWidth />
                  </Grow>
                </div>
              )}
            />

            <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...{ timeout: 1000 }}>
              <TextField
                size="small"
                id="outlined-email"
                label={register_page.email}
                type="email"
                className={Styles.email}
                placeholder="Email (Nếu có)"
                name="email"
                value={student.email}
                onChange={(e) => handleOnchange(e)}
                fullWidth
              />
            </Grow>
          </Box>
        </div>
        <FormControlLabel control={<Checkbox required />} label={register_page.agreeTerms} />
        <Button className={Styles.btnRegister} type="submit">
          {btn.register}
        </Button>
      </form>
      <Footer />
    </>
  )
}

export default Home
