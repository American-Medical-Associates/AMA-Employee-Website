import '../styles/globals.css'
import type { AppProps } from 'next/app'
import store from '../redux/store'
import { Provider } from 'react-redux'
import Header from '../components/navigation/Header'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    // TODO: Wrap this in the Auth context.
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Header selectCompany={'AMA'} routePatientsHome={true}></Header>
        <Component {...pageProps} />
      </LocalizationProvider>
    </Provider>
  )
}

export default MyApp
