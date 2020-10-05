import Layout from '../components/Layout'
import '../styles/globals.css'
import reducers from '../reducers'
import {createWrapper} from 'next-redux-wrapper'
import { createStore } from 'redux'
import { connectToReducer } from '../util/redux'
import '../util/fontawesome'

function MyApp({ Component, pageProps, ...props }) {
  return (
    <Layout {...props}>
      <Component {...pageProps} {...props} />
    </Layout>
  )
}

const configureStore = () => {
  const store = createStore(reducers)
  return store
}

const wrapper = createWrapper(configureStore)

MyApp = connectToReducer(MyApp)

export default wrapper.withRedux(MyApp)
