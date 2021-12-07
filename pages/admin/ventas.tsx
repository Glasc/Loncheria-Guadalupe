import { NextPage } from 'next'
import styles from '../../styles/ventas.module.scss'
import React, { useState } from 'react'
import { Layout } from '../../components/Layout'
import { NavbarAdmin } from '../../components/NavbarAdmin/NavbarAdmin'
import Image from 'next/image'
import { StarIcon } from '@chakra-ui/icons'
import useSales from '../../hooks/useSales'
import { useEffect } from 'react'
import { Select } from '@chakra-ui/react'
import { LightMode } from '@chakra-ui/color-mode'
import { useAdmin } from '../../hooks/useAdmin'
import { selectUID } from '../../redux/authSlice'
import { useAppSelector } from '../../redux/hooks'

interface CardProps {
  header: number | string
  description: string
  Icon: any
  primary?: boolean
}

const Ventas: NextPage = ({}) => {
  const uid: string = useAppSelector(selectUID)
  const { isAdmin } = useAdmin({ uid })
  const { sales, saleList, getSales } = useSales({})
  const [firstRender, setFirstRender] = useState<boolean>(false)
  // useEffect(() => {
  //   console.log(sales)
  // }, [sales])

  const handleSelectionClick = async (e: any) => {
    const selection = e.target.value
    getSales(selection)
  }

  useEffect(() => {
    if (saleList.length === 0) return
    if (firstRender === true) return
    getSales(saleList[0])
    setFirstRender(true)
  }, [getSales, saleList, firstRender])

  return (
    <Layout>
      <NavbarAdmin />
      <LightMode>
        <div className={styles.selectionContainer}>
          <Select
            bg='white'
            borderColor='white'
            color='black'
            mb={5}
            w='240px'
            fontSize='lg'
            onClick={handleSelectionClick}
            isRequired
          >
            {saleList &&
              saleList.map((currSale) => {
                return (
                  <option key={currSale} value={currSale}>
                    {currSale.slice(0, 2) +
                      '/' +
                      currSale.slice(2, 4) +
                      '/' +
                      currSale.slice(4, 8)}
                  </option>
                )
              })}
          </Select>
        </div>
      </LightMode>
      <section className={styles.cardContainer}>
        <Card
          header={`$${sales.totalSales}.00 MXN`}
          description='Ventas'
          Icon={StarIcon}
          primary={true}
        />
        <Card
          header={sales.totalOrders}
          description='Pedidos'
          Icon={StarIcon}
        />
        <Card
          header={sales.usersRegistered}
          description='Usuarios Nuevos'
          Icon={StarIcon}
        />
        <Card
          header={sales.totalUsersRegistered}
          description='Usuarios Totales'
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
