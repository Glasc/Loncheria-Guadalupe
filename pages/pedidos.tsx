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
import { setDoc, doc, getDoc, addDoc } from '@firebase/firestore'
import db from '../firebase/firebaseConfig'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { getOrders, selectUID, setUserID } from '../redux/authSlice'
import { onAuthStateChanged } from '@firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import { useOrder } from '../hooks/useOrder'

interface PedidosProps {}

const Pedidos: NextPage<PedidosProps> = ({}) => {
  const dispatch = useAppDispatch()

  const uid: string = useAppSelector(selectUID) || ''

  const { allOrders } = useOrder({ uid })

  const {date, state, orderList} = allOrders

  useEffect(() => {
    console.log(allOrders)
  }, [allOrders])

  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => user && dispatch(setUserID(user.uid))
    )
  }, [dispatch])

  return (
    <Layout>
      <NavbarAuth />
      <div className={styles.buttonWrapper}>
        <Button variant='outline' colorScheme='orange'>
          Limpiar
        </Button>
      </div>
      <div className={styles.cardsContent}>
        <div className={styles.card}>
          <div className={styles.logo}>
            <CheckCircleIcon w={10} h={10} />
          </div>
          <div className={styles.cardAside}>
            <div className={styles.description}>
              <h2>Confirmado</h2>
              <p>Emiliano Zapata #734</p>
              <p>16/11/2021 08:22 PM</p>
            </div>
            <div className={styles.cardButtonWrapper}>
              <Button colorScheme='orange'>Editar</Button>
              <Button colorScheme='red' variant='outline'>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.logo}>
            <CheckCircleIcon w={10} h={10} />
          </div>
          <div className={styles.cardAside}>
            <div className={styles.description}>
              <h2>Confirmado</h2>
              <p>Emiliano Zapata #734</p>
              <p>16/11/2021 08:22 PM</p>
            </div>
            <div className={styles.cardButtonWrapper}>
              <Button colorScheme='orange'>Editar</Button>
              <Button colorScheme='red' variant='outline'>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.logo}>
            <CheckCircleIcon w={10} h={10} />
          </div>
          <div className={styles.cardAside}>
            <div className={styles.description}>
              <h2>Confirmado</h2>
              <p>Emiliano Zapata #734</p>
              <p>16/11/2021 08:22 PM</p>
            </div>
            <div className={styles.cardButtonWrapper}>
              <Button colorScheme='orange'>Editar</Button>
              <Button colorScheme='red' variant='outline'>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Pedidos

// useEffect(() => {
//   const auth = getAuth()
//   const user = auth.currentUser

//   if (user) {
//     console.log(user.uid)
//     ;(async () => {
//       await setDoc(doc(db, 'users', user.uid), {
//         pedidos: [
//           {
//             id: new Date().valueOf(),
//             estado: '',
//             direccion: '',
//             fecha: '',
//             total: '',
//             productosPedidos: [
//               {
//                 producto: '2 Quesadillas sincronizadas',
//                 descripcion: 'Con todo',
//               },
//               {
//                 producto: '2 Tortas de pierna',
//                 descripcion: 'Con todo',
//               },
//             ],
//           },
//         ],
//       })
//     })()
//   }
// }, [])
