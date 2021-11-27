import '../styles/globals.scss'
import { AppProps } from 'next/dist/shared/lib/router/router'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';


const theme = extendTheme({
  colors: {
    brand: {
      200: '#ED3C1F',
      300: '#d42d11',
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
