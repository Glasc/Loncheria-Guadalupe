import { useEffect, useState } from 'react'
import { getDoc, doc } from '@firebase/firestore'
import db from '../firebase/firebaseConfig'
import { useAppDispatch } from '../redux/hooks'
import { setUserAddress } from '../redux/authSlice'
interface useAdminProps {
  uid: string
}

export const useAdmin = ({ uid }: useAdminProps) => {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const docRef = doc(db, 'users', uid)
        const docValue = await getDoc(docRef)
        const docIsAdmin = await docValue.data()!.rol
        console.log(docIsAdmin)
        if (!docIsAdmin) return
        setIsAdmin(true)
      } catch {}
    }

    if (!isAdmin) {
      checkAdmin()
    }
  }, [isAdmin, uid])

  return { isAdmin }
}
