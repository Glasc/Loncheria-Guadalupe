import { NextPage } from 'next'
import { Layout } from '../../components/Layout'
import { NavbarAdmin } from '../../components/NavbarAdmin/NavbarAdmin'
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  deleteField,
} from '@firebase/firestore'
import db from '../../firebase/firebaseConfig'
import styles from './control.module.scss'
import { Button } from '@chakra-ui/button'
import { CheckCircleIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import useUsers from '../../hooks/useUsers'
import { Loading } from '../../components/UI/Loading'
import { Orders, State } from '../../shared/types'
import { useAppSelector } from '../../redux/hooks'
import { selectUID } from '../../redux/authSlice'
import useAuth from '../../hooks/useAuth'
import deleteById from '../../utils/deleteById'
import sortByDate from '../../utils/sortByDate'
import { ControlBtn } from '../../components/UI/buttons/controlBtn'
import Swal from 'sweetalert2'

interface ControlProps {}
interface OrderProps {}

const Control: NextPage = ({}) => {
  const { orders, isLoading, updateOrders } = useUsers()
  useAuth()

  useEffect(() => {
    const interval = setInterval(() => {
      updateOrders(false)
    }, 12000)
    return () => clearInterval(interval)
  }, [updateOrders])

  const handleFinish = async () => {
    // console.log(sortByDate(orders))
    const newArr = sortByDate(orders).filter((currOrder: any) => {
      const state: State = currOrder.state
      if (state !== 'Espera de confirmar') {
        return true
      }
      return false
    })

    const totalSales = [...newArr].reduce((acc, curr) => {
      return acc += curr.total
    }, 0)
    
    const totalOrders = newArr.length

    console.table(newArr)
  }

  if (isLoading)
    return (
      <Layout>
        <NavbarAdmin />
        <Loading />
      </Layout>
    )

  if (!orders) return <Layout>Oops!</Layout>

  return (
    <Layout>
      <NavbarAdmin />
      <div className={styles.endButtonContainer}>
        <Button
          colorScheme='yellow'
          variant='outline'
          onClick={() => {
            Swal.fire({
              title: '¿Estás seguro de finalizar?',
              text: '¡No se podrá revertir!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'Cancelar',
              confirmButtonText: 'Finalizar',
            }).then((result) => {
              if (result.isConfirmed) {
                handleFinish()
                Swal.fire(
                  'Finalizado!',
                  'Haz finalizado el turno.',
                  'success'
                )
              }
            })
          }}
        >
          Terminar
        </Button>
      </div>
      <div className={styles.cardsContent}>
        {sortByDate(orders)?.map((currOrder: Orders) => {
          if (!currOrder.id) return
          return (
            <Order
              key={currOrder.id}
              updateOrders={updateOrders}
              {...currOrder}
            />
          )
        })}
      </div>
    </Layout>
  )
}

const Order: React.FC<Orders> = ({
  address,
  date,
  id,
  orderList,
  state,
  total,
  userId,
  updateOrders,
  dateFns,
}) => {
  const docRef = doc(db, 'users', userId)
  const [user, setUser] = useState<string>('')
  const [stateOrder, setStateOrder] = useState<State>(state)

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, 'users', userId)
      const response = await getDoc(docRef)
      const userName = await response.data()!.userInfo.data.name
      setUser(userName)
    }
    if (user) return
    getUser()
    return () => {}
  }, [id, userId, user])

  const handleCancel = async () => {
    try {
      const docValue = await getDoc(docRef)
      const prevOrders = await docValue.data()!.orders
      const newById = deleteById(id, prevOrders)
      await updateDoc(docRef, {
        orders: {
          ...newById,
        },
      })
      updateOrders(false)
    } catch (error) {
      console.log('error!')
    }
    return () => {
      window.removeEventListener('onClick', handleCancel)
    }
  }

  const handleConfirm = async () => {
    if (String(state) === 'Confirmado') return
    const newState = 'Confirmado'
    await updateDoc(docRef, {
      [`orders.byId.${id}.state`]: newState,
    })
    updateOrders(false)
    setStateOrder('Confirmado')
    return () => {
      window.removeEventListener('onClick', handleConfirm)
    }
  }

  const handleDelivered = async () => {
    try {
      if (state === 'Entregado') return
      const newState = 'Entregado'
      await updateDoc(docRef, {
        [`orders.byId.${id}.state`]: newState,
      })
      updateOrders(false)
      setStateOrder('Entregado')
    } catch {
      console.log('err')
    }
    return () => {
      window.removeEventListener('onClick', handleConfirm)
    }
  }

  return (
    <div key={id} className={styles.card}>
      <div className={styles.logo}>
        <CheckCircleIcon w={10} h={10} />
      </div>
      <div className={styles.cardAside}>
        <div className={styles.description}>
          <h2>{state}</h2>
          <p>{user}</p>
          <p>{date}</p>
          <p>
            {orderList &&
              orderList.map((currOrder: any, idx: number) => {
                const { sectionName, variantName } = currOrder
                if (idx === orderList.length - 1)
                  return `${sectionName} ${variantName}.`
                return `${sectionName} ${variantName}, `
              })}
          </p>
          <p>{address}</p>
          <p>Total: ${total}.00 MXN</p>
        </div>
        {state !== 'Entregado' && (
          <div className={styles.cardButtonWrapper}>
            <Button
              colorScheme='red'
              variant='outline'
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <ControlBtn
              state={stateOrder}
              handleDelivered={handleDelivered}
              handleConfirm={handleConfirm}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Control
