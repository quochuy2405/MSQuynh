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
  birth_day: string
  phone_number: string
  class_code: string
  email: string
}
export type { Student, Course }
