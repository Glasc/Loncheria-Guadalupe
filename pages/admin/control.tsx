import { NextPage } from 'next'
import { Layout } from '../../components/Layout'
import { NavbarAdmin } from '../../components/NavbarAdmin/NavbarAdmin'
import { collection, getDocs } from '@firebase/firestore'
import db from '../../firebase/firebaseConfig'
import styles from './control.module.scss'
import { Button } from '@chakra-ui/button'
import { CheckCircleIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import useUsers from '../../hooks/useUsers'

interface ControlProps {}



const Control: NextPage = ({}) => {
  const { orders, isLoading } = useUsers()

  useEffect(() => {
    console.log(orders);
    
  }, [orders])

  return (
    <Layout>
      <NavbarAdmin />
      {/* <div className={styles.cardsContent}>
        {userOrders.map((currUser) => {
          return currUser.map((currOrder: any) => {
            const {
              address,
              date,
              total,
              state,
              orderList,
              id: currId,
            } = currOrder
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
                      // onClick={() => handleCancel({ id, state })}
                    >
                      Cancelar
                    </Button>
                    <Button
                      colorScheme='brand'
                      variant='solid'
                      // onClick={() => handleCancel({ id, state })}
                    >
                      Confirmar
                    </Button>
                  </div>
                </div>
              </div>
            )
          })
        })}
      </div> */}
    </Layout>
  )
}

export default Control
