import { doc, getDoc, updateDoc } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import db from '../firebase/firebaseConfig'
import { CartItems } from '../shared/types'
import { formatRelative, subDays } from 'date-fns'
import { es, ru } from 'date-fns/locale'
import { useAppSelector } from '../redux/hooks'
import { selectUserAddress } from '../redux/authSlice'

interface useOrderProps {
  uid: string
}

export const useOrder = ({ uid }: useOrderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [allOrders, setAllOrders] = useState<any>('')
  const address = useAppSelector(selectUserAddress)

  const setOrder = async ({ cartItems, total }: { cartItems: any, total: number }) => {
    if (!uid) return
    const docRef = doc(db, 'users', uid)
    const docValue = await getDoc(docRef)
    const docPrevData = await docValue.data()!.orders

    const id = new Date().valueOf()
    const orderList: any = {
      [id]: {
        orderList: [...cartItems],
        address,
        date: formatRelative(subDays(new Date(), 0), new Date(), {
          locale: es,
        }),
        id,
        total,
        state: 'Espera de confirmar',
      },
    }

    if (docPrevData.allIds) {
      await updateDoc(docRef, {
        orders: {
          byId: { ...docPrevData.byId, ...orderList },
          allIds: [...Object.keys(orderList), ...docPrevData.allIds],
        },
      })
    } else {
      await updateDoc(docRef, {
        orders: {
          byId: { ...docPrevData.byId, ...orderList },
          allIds: [...Object.keys(orderList)],
        },
      })
    }

    // clean cart
    await updateDoc(docRef, {
      carrito: [],
    })

    setIsLoading(false)
  }

  // useEffect(() => {
  //   ;(async () => {
  //     if (!uid) return
  //     const docRef = doc(db, 'users', uid)
  //     const value = await (await getDoc(docRef)).data()!.orders
  //     setAllOrders(value)
  //   })()
  // }, [uid])

  useEffect(() => {
    setIsLoading(true)
    const getAllOrders = async () => {
      if (!uid) return
      const docRef = doc(db, 'users', uid)
      const docValue = await getDoc(docRef)
      const docData = docValue.data()!.orders
      setAllOrders(docData)
    }

    setIsLoading(false)
    if (allOrders) return
    getAllOrders()
  }, [allOrders, uid])

  return { setOrder, isLoading, allOrders }
}
