import React, { useEffect, useState } from 'react'
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next'
import styles from '../styles/Pedidos.module.scss'
import { Layout } from '../components/Layout'
import { NavbarAuth } from '../components/NavbarAuth/NavbarAuth'
import { Button } from '@chakra-ui/button'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { getAuth } from 'firebase/auth'
import {
  setDoc,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
} from '@firebase/firestore'
import db from '../firebase/firebaseConfig'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import {
  getOrders,
  selectUID,
  setUserID,
  getCartTotal,
  saveUser,
} from '../redux/authSlice'
import { onAuthStateChanged } from '@firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import { useOrder } from '../hooks/useOrder'
import { useCart } from '../hooks/useCart'
import { useAdmin } from '../hooks/useAdmin'
import { useRouter } from 'next/router'

interface PedidosProps {}

const Pedidos: NextPage<PedidosProps> = ({}) => {
  const dispatch = useAppDispatch()

  const uid: string = useAppSelector(selectUID) || ''
  const { allOrders, updateOrders } = useOrder({ uid })
  const { allIds, byId } = allOrders || []
  const { isAdmin } = useAdmin({ uid })
  const router = useRouter()

  useEffect(() => {
    if (!isAdmin) return
    router.push('/admin/menuAdmin')
  }, [isAdmin, router])

  useEffect(() => {
    // onAuthStateChanged(
    //   auth,
    //   (user) => user && dispatch(setUserID(user.uid))
    // )
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user.refreshToken))
        dispatch(setUserID(user.uid))
      } else {
        dispatch(saveUser(undefined))
        dispatch(setUserID(null))
      }
    })
  }, [dispatch])

  const handleCancel = async ({
    id,
    state,
  }: {
    id: number
    state: string
  }) => {
    if (state !== 'Espera de confirmar') return
    const docRef = doc(db, 'users', uid)
    const docValue = await getDoc(docRef)
    const docPrevData = await docValue.data()!.orders
    const byId = `orders.byId.${id}`

    await updateDoc(docRef, {
      [byId]: deleteField(),
    })
    await updateDoc(docRef, {
      [`orders.allIds`]: docPrevData.allIds.filter((curr: any) => {
        if (curr.toString() === id.toString()) {
          return false
        }
        return true
      }),
    })
    updateOrders()
  }

  return (
    <Layout>
      <NavbarAuth />
      <div className={styles.buttonWrapper}>
        <Button variant='outline' colorScheme='orange'>
          Limpiar
        </Button>
      </div>
      <div className={styles.cardsContent}>
        {allIds &&
          allIds.map((currId: any) => {
            const { address, date, total, state, orderList, id } =
              byId[currId]
            return (
              <div key={currId} className={styles.card}>
                <div className={styles.logo}>
                  <CheckCircleIcon w={10} h={10} />
                </div>
                <div className={styles.cardAside}>
                  <div className={styles.description}>
                    <h2>{state}</h2>
                    <p>{date}</p>
                    <p>
                      {orderList &&
                        orderList.map((currOrder: any, idx: number) => {
                          const { sectionName, variantName } = currOrder
                          console.log(idx, orderList.length - 1)
                          if (idx === orderList.length - 1)
                            return `${sectionName} ${variantName}.`
                          return `${sectionName} ${variantName}, `
                        })}
                    </p>
                    <p>{address}</p>
                    <p>Total: ${total}.00 MXN</p>
                  </div>
                  <div className={styles.cardButtonWrapper}>
                    <Button
                      colorScheme='red'
                      variant='outline'
                      onClick={() => handleCancel({ id, state })}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </Layout>
  )
}

export default Pedidos
