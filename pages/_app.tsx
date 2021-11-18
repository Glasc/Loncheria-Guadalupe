import '../styles/globals.scss'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { AppProps } from 'next/dist/shared/lib/router/router'

const theme = extendTheme({
  colors: {
    brand: {
      200: '#ED3C1F',
      300: '#d42d11',
    },
  },
  components: {
    Modal: {
      // 1. We can update the base styles
      baseStyle: {
        fontWeight: 'bold', // Normally, it is "semibold"
      },
      // 2. We can add a new button size or extend existing

      // 3. We can add a new visual variant
      variants: {
        'with-shadow': {
          bg: 'red.400',
          boxShadow: '0 0 2px 2px #efdfde',
        },
        // 4. We can override existing variants
      },
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
