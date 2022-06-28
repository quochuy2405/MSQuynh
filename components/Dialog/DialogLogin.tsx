import Styles from '@/components/Dialog/DialogLogin.module.scss'
import { AppCtx } from '@/Context/GlobalContext'
import { loginFaceBook, loginGoogle } from '@/firebase'
import Button from '@mui/material/Button'
import type { DialogProps } from '@mui/material/Dialog'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Fragment, useContext, useState } from 'react'
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
export default function DialogLogin({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }): JSX.Element {
  const [fullWidth, setFullWidth] = useState(true)
  const { user } = useContext(AppCtx)
  const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('sm')
  const handleClose = () => {
    setOpen(false)
  }
  const loginByGoogle = async () => {
    const response = await loginGoogle()

    if (response) {
      setOpen(false)
      user.name = response?.user?.displayName
      user.url = response?.user?.photoURL
      user.userId = response?.user?.uid
    }
  }

  const loginByFaceBook = async () => {
    const response = await loginFaceBook()
    if (response) {
      setOpen(false)
      user.name = response?.user?.displayName
      user.url = response?.user?.photoURL
      user.userId = response?.user?.uid
    }
  }

  return (
    <Fragment>
      <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose}>
        <DialogTitle style={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: '600' }}>Hãy đăng nhập</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn cần phải đăng nhập mới có thể xem trạng thái đã xác nhận học viên hay chưa. </DialogContentText>
        </DialogContent>
        <div className={Styles.loginFB} onClick={() => loginByFaceBook()}>
          <FaFacebook size={25} />
          <p className={Styles.mobile}>Continue with Facebook</p>
        </div>
        <div className={Styles.loginGG} onClick={() => loginByGoogle()}>
          <FcGoogle size={25} />
          <p className={Styles.mobile}>Continue with Google</p>
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
