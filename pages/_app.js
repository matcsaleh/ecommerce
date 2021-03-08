import '../styles/globals.css'
import EcomerceContextProvider from './context/EcommerceContext'


function MyApp({ Component, pageProps }) {

  return (
    <EcomerceContextProvider>
      <Component {...pageProps} />
    </EcomerceContextProvider>
  )
}

export default MyApp
