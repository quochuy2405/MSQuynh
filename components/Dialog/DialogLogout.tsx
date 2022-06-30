import Button from '@mui/material/Button'
import type { DialogProps } from '@mui/material/Dialog'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Fragment, useState } from 'react'
import Styles from '@/components/Dialog/DialogLogout.module.scss'
import { logoutUser } from '@/firebase'

export default function DialogLogout({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }): JSX.Element {
  return (
    <Fragment>
      <Dialog open={open}>
        <DialogTitle className={Styles.title}>Bạn có chắc chắn muốn đăng xuất ?</DialogTitle>

        <DialogActions>
          <Button className={Styles.loginGG} onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button
            className={Styles.loginFB}
            onClick={() => {
              logoutUser()
              setOpen(false)
            }}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
