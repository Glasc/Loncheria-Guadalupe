import { useState, useEffect } from 'react'
import { doc, getDoc, collection, getDocs } from '@firebase/firestore'
import db from '../firebase/firebaseConfig'
interface useSalesProps {}

interface salesProps {
  totalSales: number
  totalOrders: number
  totalUsersRegistered: number
  usersRegistered: number
}

export const useSales = ({}: useSalesProps) => {
  const [p, setP] = useState<string>('hello')
  const [sales, setSales] = useState<salesProps>({
    totalSales: 0,
    totalOrders: 0,
    totalUsersRegistered: 0,
    usersRegistered: 0,
  })
  const [saleList, setSaleList] = useState<string[]>([])

  useEffect(() => {
    ;(async () => {
      const collectionRef = collection(db, 'sales')
      const collectionDocs = await getDocs(collectionRef)

      setSaleList(
        collectionDocs.docs.map((curr) => {
          return curr.id
        })
      )
    })()
  }, [])

  // useEffect(() => {
  //   getSales()
  // }, [])

  const getSales = async (id: string) => {
    if (!id) return
    const salesRef = doc(db, 'sales', id)
    const response = await getDoc(salesRef)
    const data: any = response.data()
    setSales({ ...data })
  }

  return { sales, getSales, saleList }
}

export default useSales
