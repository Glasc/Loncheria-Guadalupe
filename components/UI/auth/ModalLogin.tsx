import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import { useRef, useState, useEffect } from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import { Button } from '@chakra-ui/button'
import ResetPasswordForm from './forms/ResetPasswordForm'
import LoginForm from './forms/LoginForm'
import { signInWithEmailAndPassword } from '@firebase/auth'

function ModalLogin() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstInput = useRef<any>()

  const [toggleRecoverPassword, setToggleRecoverPassword] =
    useState<boolean>(false)

  useEffect(() => {
    if (isOpen) return
    setToggleRecoverPassword(false)
  }, [isOpen])

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
        Unirse
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
            {toggleRecoverPassword ? (
              <ResetPasswordForm
                setToggleRecoverPassword={setToggleRecoverPassword}
              />
            ) : (
              <LoginForm
                setToggleRecoverPassword={setToggleRecoverPassword}
              />
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ModalLogin
