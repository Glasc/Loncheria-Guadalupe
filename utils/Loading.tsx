import {  Stack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner'
import React from 'react'

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = ({}) => {
  return (
    <Stack
      height='100vh'
      width="100%"
      maxHeight='100vh'
      d='flex'
      justifyContent='center'
      alignItems='center'
      backgroundColor='#342c2b'
      padding={0}
    >
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='orange'
        size='xl'
      />
    </Stack>
  )
}
