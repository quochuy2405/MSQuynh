import type { Course as TCourse } from '@/types/interface'
import Course from './Course'
import Styles from './ListCourse.module.scss'

interface Courses {
  size?: number
  list?: Array<TCourse>
}

function ListCourse({ size, list }: Courses): JSX.Element {
  return (
    <div className={Styles.listCourse}>
      {list?.slice(0, size)?.map((item) => (
        <Course {...item} key={item.name + item.description} />
      ))}
    </div>
  )
}

export default ListCourse
