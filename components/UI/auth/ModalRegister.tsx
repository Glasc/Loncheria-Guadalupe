import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from '@chakra-ui/react'

import { useRef, useState, useEffect } from 'react'
import { Grid, VStack } from '@chakra-ui/layout'
import { useDisclosure } from '@chakra-ui/hooks'
import { Button } from '@chakra-ui/button'
import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth'

interface ModalRegisterProps {}

export const ModalRegister: React.FC<ModalRegisterProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstInput = useRef<any>()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')

  const handleEmail = (e: any) => setEmail(e.target.value)
  const handlePassword = (e: any) => setPassword(e.target.value)
  const handleName = (e: any) => setName(e.target.value)

  const auth = getAuth()

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('Registered user: ', user)
        setEmail('')
        setPassword('')
        setName('')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('Error ocured: ', errorCode, errorMessage)
      })
  }

  return (
    <div style={{ width: '100%', color: 'black' }}>
      <Button
        color='white'
        colorScheme='brand'
        variant='outline'
        size='md'
        w='100%'
        onClick={onOpen}
      >
        Registrarse
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        initialFocusRef={firstInput}
      >
        <ModalOverlay />
        <ModalContent color='white' bg='#342C2B'>
          <ModalHeader>Iniciar sesión</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <VStack spacing={4}>
                <FormControl id='email' autoComplete='off'>
                  <FormLabel>Correo</FormLabel>
                  <Input
                    type='email'
                    ref={firstInput}
                    value={email}
                    onChange={handleEmail}
                  />
                </FormControl>
                <FormControl id='password'>
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    type='password'
                    value={password}
                    onChange={handlePassword}
                  />
                  <FormHelperText>Mayor a 8 caracteres.</FormHelperText>
                </FormControl>
                <FormControl id='nombre'>
                  <FormLabel>Nombre de pila</FormLabel>
                  <Input type='text' value={name} onChange={handleName} />
                  <FormHelperText></FormHelperText>
                </FormControl>
                <Grid
                  templateColumns={'repeat(auto-fit, minmax(175px, 1fr))'}
                  gap='1em'
                  alignItems='center'
                  w='100%'
                >
                  <Button
                    colorScheme='teal'
                    onClick={handleRegister}
                  >
                    Registrase
                  </Button>
                  <Button
                    color='white'
                    variant='solid'
                    size='md'
                    onClick={onOpen}
                    width='100%'
                  >
                    Continuar con Google
                  </Button>
                </Grid>
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
