import React from 'react'
import { NextPage } from 'next'
import styles from '../styles/cuenta.module.scss'
import { Layout } from '../components/Layout'
import Image from 'next/image'
import { NavbarAuth } from '../components/NavbarAuth/NavbarAuth'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { increment } from '../redux/counterSlice'

interface CuentaProps {}

const Cuenta: NextPage<CuentaProps> = ({}) => {
  return (
    <Layout>
      <div className={styles.container}>
        <NavbarAuth />
        <form className={styles.form}>
          <Image
            src='/assets/profile_maininblack.jpg'
            alt='Cuenta'
            width={200}
            height={200}
            className={styles.profileImage}
          />
          <FormControl id='first-name' isRequired>
            <FormLabel>Nombre</FormLabel>
            <Input type='text' backgroundColor='#4E4342' />
          </FormControl>
          <FormControl id='first-name' isRequired>
            <FormLabel>Teléfono</FormLabel>
            <Input type='tel' backgroundColor='#4E4342' />
          </FormControl>
          <FormControl id='first-name' isRequired>
            <FormLabel>Dirección</FormLabel>
            <Input type='text' backgroundColor='#4E4342' />
          </FormControl>
          <Button w='100%' colorScheme='brand' color='white' mt={10}>
            Aceptar
          </Button>
        </form>
      </div>
    </Layout>
  )
}

export default Cuenta
