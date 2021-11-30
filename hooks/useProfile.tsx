import { doc, updateDoc } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import db from '../firebase/firebaseConfig'
import { getDoc } from '@firebase/firestore'
import { useAppDispatch } from '../redux/hooks'
import { setUserAddress } from '../redux/authSlice'
interface useProfileProps {
  uid: string
}

export interface saveProfileProps {
  address: string
  name: string
  telephoneNumber: string
}

export const useProfile = ({ uid }: useProfileProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [initialInputs, setInitialInputs] =
    useState<{ name: string; telephoneNumber: string; address: string }>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!initialInputs) return
    dispatch(setUserAddress(initialInputs.address))
  }, [initialInputs, dispatch])

  const saveProfile = async ({
    address,
    name,
    telephoneNumber,
  }: saveProfileProps) => {
    setIsLoading(true)
    if (!uid) return setIsLoading(false)
    const docRef = doc(db, 'users', uid)
    await updateDoc(docRef, {
      userInfo: {
        data: {
          address,
          name,
          telephoneNumber,
        },
      },
    })
    setIsLoading(false)
  }

  const getInitialInputs = async () => {
    setIsLoading(true)
    if (!uid) return setIsLoading(false)
    const docRef = doc(db, 'users', uid)
    const docValue = await getDoc(docRef)
    const inputs: saveProfileProps = await docValue.data()!.userInfo.data
    setInitialInputs(inputs)
    setIsLoading(false)
    return initialInputs
  }

  return { saveProfile, getInitialInputs, initialInputs, isLoading }
}
