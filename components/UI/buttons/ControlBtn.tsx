import React from 'react'
import { Button } from '@chakra-ui/button'
import { State } from '../../../shared/types'
import { useEffect } from 'react'

interface ControlBtnProps {
  state: State
  handleConfirm: () => {}
  handleDelivered: () => {}
}

export const ControlBtn: React.FC<ControlBtnProps> = ({
  state,
  handleConfirm,
  handleDelivered,
}) => {
  if (state === 'Espera de confirmar') {
    return (
      <Button colorScheme='brand' variant='solid' onClick={handleConfirm}>
        Confirmar
      </Button>
    )
  }

  if (state === 'Confirmado') {
    return (
      <Button colorScheme='teal' variant='solid' onClick={handleDelivered}>
        Entregado
      </Button>
    )
  }

  if (state === 'Entregado') {
    return <div style={{margin: 0, padding: 0, height: 0}}></div>
  }

  return (
    <Button colorScheme='brand' variant='solid'>
      Loading...
    </Button>
  )
}
