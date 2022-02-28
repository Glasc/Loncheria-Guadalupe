import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from '@chakra-ui/react'

import { Grid, VStack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { useState, useRef } from 'react'
import { useDisclosure } from '@chakra-ui/hooks';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../../../firebase/firebaseConfig';

const LoginForm: React.FC<any> = ({ setToggleRecoverPassword }) => {
  const firstInput = useRef<any>()
  const { onOpen } = useDisclosure()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleEmail = (e: any) => setEmail(e.target.value)

  const handlePassword = (e: any) => setPassword(e.target.value)

  const handleLogin = (e: any) => {}

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('Singed in user: ', user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('An error occured: ', errorCode, errorMessage)
      })
  }

  return (
    <form>
      <VStack spacing={4}>
        <FormControl id='email' autoComplete='off'>
          <FormLabel>Correo</FormLabel>
          <Input
            border=""
            backgroundColor="#473f3e"
            type='email'
            ref={firstInput}
            value={email}
            onChange={handleEmail}
          />
        </FormControl>
        <FormControl id='password'>
          <FormLabel>Contraseña</FormLabel>
          <Input
            backgroundColor="#473f3e"
            border="none"
            type='password'
            value={password}
            onChange={handlePassword}
          />
          <FormHelperText
            color="whitesmoke"
            cursor='pointer'
            textDecoration='underline'
            onClick={() => setToggleRecoverPassword((prev: any) => !prev)}
          >
            Recuperar contraseña
          </FormHelperText>
        </FormControl>

        <Grid
          templateColumns={'repeat(auto-fit, minmax(175px, 1fr))'}
          gap='1em'
          alignItems='center'
          w='100%'
        >
          <Button colorScheme='teal' onClick={signIn}>
            Iniciar Sesión
          </Button>
        
        </Grid>
      </VStack>
    </form>
  )
}

export default LoginForm
