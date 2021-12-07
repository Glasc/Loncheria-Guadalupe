import { useState } from 'react'
interface useSalesProps {}

export const useSales = ({}: useSalesProps) => {
  const [p, setP] = useState<string>('hello')

  return { p, setP }
}

export default useSales
