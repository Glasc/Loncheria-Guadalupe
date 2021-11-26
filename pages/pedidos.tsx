import React from 'react'
import { NextPage } from 'next'
import styles from '../styles/Pedidos.module.scss'
import { Layout } from '../components/Layout'
import { NavbarAuth } from '../components/NavbarAuth/NavbarAuth'
import { Button } from '@chakra-ui/button'
import { CheckCircleIcon } from '@chakra-ui/icons'

interface PedidosProps {}

const Pedidos: NextPage<PedidosProps> = ({}) => {
  return (
    <Layout>
      <NavbarAuth />
      <div className={styles.buttonWrapper}>
        <Button backgroundColor='white' colorScheme='orange'>
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
              <p>Guadalupe Sánchez #812</p>
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
              <p>Guadalupe Sánchez #812</p>
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
              <p>Guadalupe Sánchez #812</p>
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
