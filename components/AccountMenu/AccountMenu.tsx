import type { User } from '@/types/interface'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { VscBook, VscCalendar } from 'react-icons/vsc'

export default function AccountMenu({ user }: { user: Partial<User> }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={user?.name || ''}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {user.url ? (
              <Image src={user.url} alt={user.name || ''} width={'30'} height={'30'} style={{ borderRadius: '100rem' }} />
            ) : (
              <Avatar sx={{ width: 32, height: 32 }}>MS</Avatar>
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link href={'/progress'} passHref>
          <MenuItem>
            <VscBook size={25} style={{ margin: '0 10px' }} /> Tình trạng đăng ký
          </MenuItem>
        </Link>
        <MenuItem>
          <VscCalendar size={25} style={{ margin: '0 10px' }} /> Lịch - Thời khóa biểu
        </MenuItem>
      </Menu>
    </Fragment>
  )
}
