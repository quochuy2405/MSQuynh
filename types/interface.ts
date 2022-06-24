interface Course {
  name: string
  description?: string
  max_vol?: number
  current_vol?: number
  class_code: string
  thumbnail?: string
}
interface Student {
  name: string
  birth_day: string | number | any
  phone_number: string
  class_code: string | unknown
  email: string
  user_id: string | unknown
}

interface User {
  [x: string]: unknown
  userId: string | null
  name: string | null
  url: string | null
}

interface ImageType {
  alt: string | undefined
  src: string | any
  width?: string | number | undefined
  height?: string | number | undefined
  layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive' | 'raw' | undefined
}
export type { Student, Course, User, ImageType }
