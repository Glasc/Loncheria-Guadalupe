import { collection, doc, getDocs } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import db from '../firebase/firebaseConfig'
import { Orders } from '../shared/types'

export const useUsers = () => {
  const [orders, setOrders] = useState<any[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    getClientOrders(true)
  }, [])

  const updateOrders = (shouldLoad = true) => getClientOrders(shouldLoad)


  const getClientOrders = async (shouldLoad: boolean) => {
    try {
      shouldLoad && setIsLoading(true)
      const collectionRef = collection(db, 'users')
      const collectionDocs = await getDocs(collectionRef)
      const userOrders: any[] = collectionDocs.docs.map(
        (currUser): any => {
          const { allIds, byId }: { allIds: []; byId: any } =
            currUser.data().orders
          return allIds.map((currentId): number | string => {
            return { ...byId[currentId], userId: currUser.id }
          })
        }
      )

      const myOrderList: any = []

      const bruh = userOrders.map((curr) => {
        if (curr.length === 0) return
        curr.map((order: any) => {
          myOrderList.push(order)
        })
      })

      setOrders(myOrderList)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  return { orders, isLoading, updateOrders }
}

export default useUsers
