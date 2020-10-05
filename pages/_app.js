import Layout from '../components/Layout'
import '../styles/globals.css'
import reducers from '../reducers'
import {createWrapper} from 'next-redux-wrapper'
import { createStore } from 'redux'
import { connectToReducer } from '../util/redux'

function MyApp({ Component, pageProps, session, updateSession }) {
  return (
    <Layout {...{session,updateSession}}>
      <Component {...pageProps} {...{session}} />
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
