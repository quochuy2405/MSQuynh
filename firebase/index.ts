// Import the functions you need from the SDKs you need
// import { Student } from '@/types/interface'
import type { Student } from '@/types/interface'
import { initializeApp } from 'firebase/app'
import { doc, collection, getDocs, getFirestore, setDoc } from 'firebase/firestore/lite'
import { GoogleAuthProvider, getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
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
const db = getFirestore(app)

// Get a list of cities from your database
const getCourses = async () => {
  const citiesCol = collection(db, 'courses')
  const citySnapshot = await getDocs(citiesCol)
  const cityList = citySnapshot.docs.map((doc) => doc.data())
  const listCourses = cityList.reduce((list: Array<unknown>, itemCurrent) => {
    return [...list, itemCurrent]
  }, [])
  return listCourses
}
// generateId
const autoGenerateId = () => {
  return 'QH' + Date.now()
}
// create Student
const createStudent = async (student: Student) => {
  try {
    if (!student) {
      return false
    }
    const cityRef = doc(db, 'students', student.class_code + autoGenerateId())
    await setDoc(cityRef, student)
    return true
  } catch {
    return false
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
export { getCourses, createStudent, loginGoogle, loginFaceBook }
