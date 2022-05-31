import { collection, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import db from '../firebase/firebaseConfig'

const useSalesV = () => {
  const [sales, setSales] = useState<{}[]>([])

  const getSales = async () => {
    const collectionRef = collection(db, 'sales')
    const collectionDocs = await getDocs(collectionRef)

    collectionDocs.docs.map((currentSale) => {
      setSales((c) => [...c, { ...currentSale.data(), date: currentSale.id }])
    })
  }

  useEffect(() => {
    getSales()
  }, [])

  return { sales }
}

export default useSalesV
