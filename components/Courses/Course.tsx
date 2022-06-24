/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { AppCtx } from '@/Context/GlobalContext'
import { getLanguage } from '@/i18-next'
import type { Course as TCourse } from '@/types/interface'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { Router, useRouter } from 'next/router'
import { useContext } from 'react'
import Styles from './Course.module.scss'

const link = 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

function Course({ name, description, max_vol, current_vol, class_code, thumbnail }: TCourse): JSX.Element {
  const router = useRouter()
  const { locale } = router
  const { courses, btn } = getLanguage(locale || 'vi')
  const { user, setLogin } = useContext(AppCtx)
  const gotoRegister = () => {
    if (user.userId) {
      router.push(`/register-form?classid=${class_code}`)
    } else {
      setLogin(true)
    }
  }
  return (
    <Card sx={{ minWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={link} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
            <div className={Styles.contentNumber}>
              <p>
                {courses.count}:{current_vol}/{max_vol}
              </p>
            </div>
            <div className={Styles.btnRegister} onClick={() => gotoRegister()}>
              {btn.register}
            </div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Course
