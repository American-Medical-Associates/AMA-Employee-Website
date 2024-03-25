import '../styles/globals.css'
import type { AppProps } from 'next/app'
import store from '../redux/store'
import { Provider } from 'react-redux'
import Header from '../components/navigation/Header'

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    // TODO: Wrap this in the Auth context.
    <Provider store={store}>
      <Header selectCompany={'AMA'} routePatientsHome={true}></Header>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
