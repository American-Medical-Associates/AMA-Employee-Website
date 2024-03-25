import '../styles/globals.css'
import type { AppProps } from 'next/app'
import store from '../redux/store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    // TODO: Wrap this in the Auth context.
    // TODO: Inside the Auth context wrap the providering inside the layout component.
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
