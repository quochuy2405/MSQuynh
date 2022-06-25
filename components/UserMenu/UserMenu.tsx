import type { User } from '@/types/interface'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const options = [
  {
    name: 'Xem tình trạng đăng ký',
    link: '/progress'
  },
  {
    name: 'Xem thời khóa biểu',
    link: '/progress'
  }
]
export default function UserMenu({ user }: { user: Partial<User> }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(1)
  const open = Boolean(anchorEl)
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index)
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <List component="nav" style={{ borderRadius: '100rem' }}>
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
          style={{ borderRadius: '100rem', width: 'fit-content' }}
        >
          <Image src={user.url || ''} alt={user.name || ''} width={'30'} height={'30'} style={{ borderRadius: '100rem' }} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox'
        }}
      >
        {options.map((option, index) => (
          <Link key={option.name + option.link} href={option.link} passHref>
            <MenuItem onClick={(event) => handleMenuItemClick(event, index)}>{option.name}</MenuItem>
          </Link>
        ))}
      </Menu>
    </div>
  )
}
