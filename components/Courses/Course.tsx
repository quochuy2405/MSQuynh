/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { AppCtx } from '@/Context/GlobalContext'
import { storage } from '@/firebase'
import { getLanguage } from '@/i18-next'
import type { Course as TCourse } from '@/types/interface'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { getDownloadURL, ref } from 'firebase/storage'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Styles from './Course.module.scss'

const link = 'https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2019/10/23170637/Graphic-Design-Courses.jpg'

function Course({ name, description, max_vol, current_vol, class_code, thumbnail }: TCourse): JSX.Element {
  const router = useRouter()
  const { locale } = router
  const { courses, btn } = getLanguage(locale || 'vi')
  const { user, setLogin } = useContext(AppCtx)
  const [url, setUrl] = useState('')
  useEffect(() => {
    getDownloadURL(ref(storage, `imageProducts/${thumbnail}`))
      .then((url: string) => setUrl(url))
      .catch(() => {
        return ''
      })
  }, [])
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
        <CardMedia component="img" height="140" image={url || link} alt={name} />
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
