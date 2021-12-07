import React, { useEffect, useState } from 'react'
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
import { saveProfileProps, useProfile } from '../hooks/useProfile'
import { selectUID, setUserID } from '../redux/authSlice'
import { onAuthStateChanged } from '@firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import { Spinner } from '@chakra-ui/spinner'
import { Box } from '@chakra-ui/layout'
import { Loading } from '../components/UI/Loading'
import { NavbarAdmin } from '../components/NavbarAdmin/NavbarAdmin'
import { useAdmin } from '../hooks/useAdmin'

interface CuentaProps {}

const Cuenta: NextPage<CuentaProps> = ({}) => {
  const dispatch = useAppDispatch()
  const uid: string = useAppSelector(selectUID) || ''
  const { isAdmin } = useAdmin({ uid })
  const { saveProfile, isLoading, getInitialInputs, initialInputs }: any =
    useProfile({ uid })

  // form inputs
  const [name, setName] = useState<string>('')
  const [telephoneNumber, setTelephoneNumber] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  // form inputs

  useEffect(() => {
    ;(async () => {
      if (initialInputs) return
      await getInitialInputs()
    })()
  }, [getInitialInputs, initialInputs])

  useEffect(() => {
    if (initialInputs) {
      setName(initialInputs.name)
      setTelephoneNumber(initialInputs.telephoneNumber)
      setAddress(initialInputs.address)
    }
  }, [initialInputs])

  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => user && dispatch(setUserID(user.uid))
    )
  }, [dispatch])

  const handleSubmit = (e: any) => {
    e.preventDefault()

    saveProfile({ name, telephoneNumber, address })
  }

  if (isLoading) return <Loading />

  return (
    <Layout>
      {isAdmin ? <NavbarAdmin /> : <NavbarAuth />}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div style={{ borderRadius: '15px' }}>
          <Image
            src='/assets/profile_example2.png'
            alt='Cuenta'
            width={200}
            height={200}
            className={styles.profileImage}
          />
        </div>

        <FormControl id='first-name' isRequired>
          <FormLabel fontSize='larger' fontWeight='regular'>
            Nombre
          </FormLabel>
          <Input
            type='text'
            backgroundColor='#4E4342'
            value={name}
            border='none'
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id='first-name' isRequired>
          <FormLabel fontSize='larger' fontWeight='regular'>
            Teléfono
          </FormLabel>
          <Input
            type='tel'
            backgroundColor='#4E4342'
            border='none'
            value={telephoneNumber}
            onChange={(e) => setTelephoneNumber(e.target.value)}
          />
        </FormControl>
        <FormControl id='first-name' isRequired>
          <FormLabel fontSize='larger' fontWeight='regular'>
            Dirección
          </FormLabel>
          <Input
            type='text'
            backgroundColor='#4E4342'
            value={address}
            border='none'
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormControl>
        <Button
          type='submit'
          w='100%'
          colorScheme='brand'
          color='white'
          mt={10}
        >
          Aceptar
        </Button>
      </form>
    </Layout>
  )
}

export default Cuenta
