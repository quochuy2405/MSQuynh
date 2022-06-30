// Import the functions you need from the SDKs you need
// import { Student } from '@/types/interface'
import type { Course, Student, User } from '@/types/interface'
import { initializeApp } from 'firebase/app'
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import type { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase/firestore/lite'
import { collection, doc, getDocs, getFirestore, limit, query, setDoc, where } from 'firebase/firestore/lite'
import { getStorage } from 'firebase/storage'

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const googleAuthProvider = new GoogleAuthProvider()
const facebookAuthProvider = new FacebookAuthProvider()

googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly')
facebookAuthProvider.addScope('user_birthday')
const firebaseConfig = {
  apiKey: 'AIzaSyCA4AHCUbDbF0fpXQ3n2qcp4VQ96Y9gS4A',
  authDomain: 'msquynh-f8e52.firebaseapp.com',
  projectId: 'msquynh-f8e52',
  storageBucket: 'msquynh-f8e52.appspot.com',
  messagingSenderId: '364826220169',
  appId: '1:364826220169:web:75493c83fca750786dd858',
  measurementId: 'G-TLV1LQPMZ7'
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage()
const db = getFirestore(app)
// converse type
const userConverter: FirestoreDataConverter<User> = {
  toFirestore(post: User): DocumentData {
    return { ...post }
  },
  fromFirestore(docSnap: QueryDocumentSnapshot): User {
    return docSnap.data() as User
  }
}
const courseConverter: FirestoreDataConverter<Course> = {
  toFirestore(post: Course): DocumentData {
    return { ...post }
  },
  fromFirestore(docSnap: QueryDocumentSnapshot): Course {
    return docSnap.data() as Course
  }
}
// Get a list of cities from your database
const getCourses = async () => {
  const citiesCol = collection(db, 'courses').withConverter(courseConverter)
  const citySnapshot = await getDocs(citiesCol)
  const cityList = citySnapshot.docs.map((doc) => doc.data())
  const listCourses = cityList.reduce((list: Array<Course>, itemCurrent) => {
    return [...list, itemCurrent]
  }, [])
  return listCourses
}
// generateId
const autoGenerateId = () => {
  return 'QH' + Date.now()
}
// check course exit

// create Student
const createStudent = async (student: Student) => {
  try {
    if (!student) {
      return false
    }
    const queryCheckStudent = query(
      collection(db, 'students'),
      where('user_id', '==', student.user_id),
      where('class_code', '==', student.class_code),
      where('name', '==', student.name)
    )
    const studentIsExit = await getDocs(queryCheckStudent)
    if (!studentIsExit.size) {
      const cityRef = doc(db, 'students', student.class_code + autoGenerateId())
      await setDoc(cityRef, student)
      return true
    } else {
      return null
    }
  } catch {
    return false
  }
}
//find course by id user

const getCourseById = async (user: Partial<User>) => {
  const courseStudent: Array<Course> = []
  try {
    const queryCheckStudent = query(collection(db, 'students'), where('user_id', '==', user.userId))
    const studentCheck = await getDocs(queryCheckStudent)

    for (let i = 0; i < studentCheck.size; i++) {
      const student = studentCheck.docs.at(i)?.data()
      const getCourse = query(collection(db, 'courses'), where('class_code', '==', student?.class_code), limit(1)).withConverter(courseConverter)
      const courses = await getDocs(getCourse)
      if (courses.docs.at(0)) {
        const course: Course = <Course>courses.docs.at(0)?.data()
        course.status = student?.status
        course.student_name = student?.name
        if (course) courseStudent.push(course)
      }
    }
    return courseStudent
  } catch (error) {
    return courseStudent
  }
}
// authetication
const loginGoogle = async () => {
  try {
    const auth = getAuth()

    const response = await signInWithPopup(auth, googleAuthProvider)
    return response
  } catch (error) {
    return null
  }
}

const loginFaceBook = async () => {
  try {
    const auth = getAuth()

    const response = await signInWithPopup(auth, facebookAuthProvider)
    return response
  } catch (error) {
    return null
  }
}
// log out user
const logoutUser = async () => {
  try {
    const auth = getAuth()
    const response = await signOut(auth)
    if (response != null) return true
    return false
  } catch (error) {
    return null
  }
}
// get URL by image name

export { getCourses, createStudent, loginGoogle, loginFaceBook, logoutUser, getCourseById, storage }
