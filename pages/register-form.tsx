/* eslint-disable @next/next/link-passhref */
import { Footer, Header, Metadata } from '@/components'
import { AppCtx } from '@/Context/GlobalContext'
import { createStudent } from '@/firebase'
import { getLanguage } from '@/i18-next'
import Styles from '@/styles/pages/register-form.module.scss'
import type { Student } from '@/types/interface'
import type { NextPage } from '@/types/next'
import { DatePicker } from '@mui/lab'
import { Box, Checkbox, FormControlLabel, Grow, TextField } from '@mui/material'
import type { AlertColor, AlertProps } from '@mui/material/Alert'
import MuiAlert from '@mui/material/Alert'
import type { SnackbarOrigin } from '@mui/material/Snackbar'
import Snackbar from '@mui/material/Snackbar'
import classnames from 'clsx'
import { BsPen } from 'react-icons/bs'
import { useRouter } from 'next/router'
import React, { forwardRef, useContext, useEffect, useState } from 'react'

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

const RegisterFrom: NextPage = () => {
  const router = useRouter()
  const { locale, query } = router
  const { user } = useContext(AppCtx)
  const { btn, register_page } = getLanguage(locale || 'vi')
  const [open, setOpen] = useState(false)
  const [notice, setNotice] = useState<Notice>({
    message: '',
    type: 'info'
  })
  const [student, setStudent] = useState<Student>({
    name: '',
    birth_day: new Date(Date.now()),
    phone_number: '',
    class_code: '',
    email: '',
    user_id: '',
    status: 0,
    created_date: ''
  })
  useEffect(() => {
    if (!user.userId) router.push('/')
  }, [router, user])
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // set value is required
    const dateNow = new Date(Date.now())
    const dateStore = student.birth_day

    student.class_code = query?.classid
    student.user_id = user.userId

    if (student.class_code && student.name && student.user_id) {
      const createdDate = `${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`
      const birthDate = `${student.birth_day.getDate()}/${student.birth_day.getMonth() + 1}/${student.birth_day.getFullYear()}`

      student.birth_day = birthDate
      student.created_date = createdDate

      const success = await createStudent(student)

      setOpen(true)

      if (success) {
        setNotice({ message: 'Đăng ký thành công', type: 'success' })
      } else {
        if (success === null) setNotice({ message: 'Bạn đã đăng ký rồi phải không ?', type: 'warning' })
        else setNotice({ message: 'Đăng ký thất bại!', type: 'error' })
      }
    } else {
      setNotice({ message: 'Đăng ký thất bại!', type: 'error' })
    }
    student.birth_day = dateStore
  }

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStudent({ ...student, [event.target.name]: event.target.value })
  }

  return (
    <>
      <Metadata title="Đăng ký - Ms.Quynh " description="Đăng ký - Ms.Quynh" />
      <Header />
      <Snackbar open={open} anchorOrigin={{ ...position }} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notice.type || 'info'} sx={{ width: '100%' }}>
          {notice.message || 'Nothing!!!'}
        </Alert>
      </Snackbar>
      <form method="post" className={classnames(Styles.inputForm, 'body')} onSubmit={handleRegister}>
        <p className={Styles.title}>
          <BsPen />
          <p> {btn.register}</p>
        </p>
        <div className={Styles.groupInput}>
          <Box width={'100%'} flexDirection="column" display={'flex'} gap={'20px'}>
            <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...{ timeout: 1000 }}>
              <TextField fullWidth disabled id="outlined-disabled" label={register_page.classCode} value={query?.classid} />
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
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity('')}
                onInvalid={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity('Nhập họ tên')}
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
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity('')}
                onInvalid={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity('Nhập số điện thoại')}
                fullWidth
                required
              />
            </Grow>

            <DatePicker
              label={register_page.birthDay}
              inputFormat="dd/MM/yyyy"
              value={student?.birth_day}
              ignoreInvalidInputs={false}
              onChange={(e) => {
                setStudent({
                  ...student,
                  birth_day: e
                })
              }}
              renderInput={(params) => (
                <div>
                  <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...{ timeout: 1000 }}>
                    <TextField
                      size="small"
                      {...params}
                      fullWidth
                      required
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity('')}
                      onInvalid={(e: React.ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity('Nhập ngày sinh')}
                    />
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
        <FormControlLabel
          control={
            <Checkbox
              required
              onInput={(e: React.ChangeEvent<HTMLButtonElement>) => e.target.setCustomValidity('')}
              onInvalid={(e: React.ChangeEvent<HTMLButtonElement>) => e.target.setCustomValidity('Bạn có đồng ý với điều khoản?')}
            />
          }
          label={register_page.agreeTerms}
        />
        <button className={Styles.btnRegister} type="submit">
          {btn.register}
        </button>
      </form>
      <Footer />
    </>
  )
}

export default RegisterFrom
