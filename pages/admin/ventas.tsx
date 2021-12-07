import { NextPage } from 'next'
import styles from '../../styles/ventas.module.scss'
import React from 'react'
import { Layout } from '../../components/Layout'
import { NavbarAdmin } from '../../components/NavbarAdmin/NavbarAdmin'
import Image from 'next/image'
import { StarIcon, TriangleUpIcon } from '@chakra-ui/icons'
import useSales from '../../hooks/useSales'

interface CardProps {
  header: string
  description: string
  Icon: any
  primary?: boolean
}

const Ventas: NextPage = ({}) => {
  const { p } = useSales({})

  return (
    <Layout>
      <NavbarAdmin />
      <section className={styles.cardContainer}>
        <Card
          header='714k'
          description='Ventas'
          Icon={StarIcon}
          primary={true}
        />
        <Card header='714k' description='Pedidos' Icon={StarIcon} />
        <Card
          header='714k'
          description='Usuarios Nuevos'
          Icon={StarIcon}
        />
      </section>
    </Layout>
  )
}

const Card: React.FC<CardProps> = ({
  header,
  description,
  primary,
  Icon,
}) => {
  return (
    <article
      style={{
        backgroundColor: `${primary && '#dd462e'}`,
      }}
      className={styles.card}
    >
      <Icon boxSize={12} />
      <h2>{header}</h2>
      <h3>{description}</h3>
    </article>
  )
}

export default Ventas
