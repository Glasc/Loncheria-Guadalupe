import { useEffect, useState } from 'react'
import { getDoc, doc } from '@firebase/firestore'
import db from '../firebase/firebaseConfig'
import { useAppDispatch } from '../redux/hooks'
import { setUserAddress } from '../redux/authSlice'
interface useCartProps {
  uid: string
}

export const useCart = ({ uid }: useCartProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [cartItemList, setCartItems] = useState('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!cartItemList) return
    dispatch(setUserAddress(cartItemList))
  }, [cartItemList, dispatch])

  useEffect(() => {
    setIsLoading(true)
    const getAllCartItems = async () => {
      try {
        if (!uid) return
        const docRef = doc(db, 'users', uid)
        const docValue = await getDoc(docRef)
        const docData = docValue.data()!.carrito
        setCartItems(docData)
        
      } catch {
        console.log('failed retrieving the data from cart.')
      }
    }

    setIsLoading(false)
    if (cartItemList) return
    getAllCartItems()
  }, [cartItemList, uid])

  return { cartItemList, isLoading }
}
