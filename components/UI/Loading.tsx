import { Box } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import React from 'react'

interface LoadingProps {

}

export const Loading = () => {
    return (
      <>
        <Box
          height='100vh'
          width='100%'
          display='flex'
          justifyContent='center'
          alignItems='center'
          bg='#342c2b'
        >
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Box>
      </>
    )

}