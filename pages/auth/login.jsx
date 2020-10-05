import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BorderBox, ButtonOutline, Grid } from '@primer/components'
import Router from 'next/router'
import Head from 'next/head'
import styled from 'styled-components'
import config from '../../config'
import { Component } from 'react'

const StyledBox = styled(BorderBox)`
@media screen and (min-width: 769px) {
    min-width: 500px;
}
@media screen and (max-width: 769px) {
    min-width: 0px;
    width: 100%;
}
padding: 0 20px 20px 20px;
`

export default class Login extends Component {
  async componentDidMount() {
    if (localStorage.getItem('token')) {
      await Router.push('/')
    }
  }
  render() {
    return (
      <div>
        <Head>
          <title>로그인</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="center">
          {
            typeof location !== 'undefined' &&
            (
              <>
                <StyledBox>
                  <h2>로그인</h2>
                  <ButtonOutline width="100%" style={{
                    fontSize: 20,
                    padding: 10
                  }} as="a" href={`${config.base}/auth/authorize?state=${location.protocol}//${location.hostname}/auth/callback`}>
                    <FontAwesomeIcon icon={['fab', 'discord']} />{' '}
                    디스코드로 로그인
                  </ButtonOutline>
                </StyledBox>
              </>
            )
          }
        </main>
      </div>
    )
  }
}
