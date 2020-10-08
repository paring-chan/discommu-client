import Layout from '../components/Layout'
import '../styles/globals.css'
import reducers from '../reducers'
import {createWrapper} from 'next-redux-wrapper'
import { createStore } from 'redux'
import { connectToReducer } from '../util/redux'
import '../util/fontawesome'
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import NextNProgress from 'nextjs-progressbar'

function MyApp({ Component, pageProps, ...props }) {
  const theme = createMuiTheme({})
  return (
    <ThemeProvider theme={theme}>
      <NextNProgress color="#fff"/>
      <CssBaseline/>
      <Layout {...props}>
      <Component {...pageProps} {...props} />
      </Layout>
    </ThemeProvider>
  )
}

const configureStore = () => {
  const store = createStore(reducers)
  return store
}

const wrapper = createWrapper(configureStore)

MyApp = connectToReducer(MyApp)

export default wrapper.withRedux(MyApp)
