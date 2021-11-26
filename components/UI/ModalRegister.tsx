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
  FormErrorMessage,
  FormHelperText,
  Input,
  LightMode,
} from '@chakra-ui/react'

import { useRef } from 'react'
import {
  Box,
  Text,
  HStack,
  Grid,
  Stack,
  VStack,
} from '@chakra-ui/layout'
import { useDisclosure } from '@chakra-ui/hooks'
import { Button } from '@chakra-ui/button'
import styles from './ModalRegister.module.scss'

interface ModalRegisterProps {}

export const ModalRegister: React.FC<ModalRegisterProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const firstInput = useRef<any>()

  return (
    <div style={{ width: '100%', color: 'black' }}>
      <Button
        color='white'
        colorScheme='brand'
        variant='solid'
        size='md'
        w='100%'
        onClick={onOpen}
      >
        Ordenar en Línea
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        initialFocusRef={firstInput}
      >
        <ModalOverlay />
        <ModalContent bg='#342C2B'>
          <ModalHeader>Iniciar sesión</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <VStack spacing={4}>
                <FormControl id='email' autoComplete='off'>
                  <FormLabel>Correo</FormLabel>
                  <Input type='email' ref={firstInput} />
                </FormControl>
                <FormControl id='email'>
                  <FormLabel>Contraseña</FormLabel>
                  <Input type='password' />
                  <FormHelperText>
                    Mayor a 8 caracteres.
                  </FormHelperText>
                </FormControl>
                <Grid
                  templateColumns={
                    'repeat(auto-fit, minmax(175px, 1fr))'
                  }
                  gap='1em'
                  alignItems='center'
                  w='100%'
                >
                  <Button colorScheme='teal' type='submit'>
                    Iniciar Sesión
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
