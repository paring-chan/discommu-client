import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BorderBox, ButtonOutline } from '@primer/components'
import Router from 'next/router'
import Head from 'next/head'
import styled from 'styled-components'
import config from '../../config'
import { Component } from 'react'
import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core'

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
                {/*<StyledBox>
                  <h2>로그인</h2>
                  <ButtonOutline width="100%" style={{
                    fontSize: 20,
                    padding: 10
                  }} as="a" href={`${config.base}/auth/authorize?state=${location.protocol}//${location.hostname}/auth/callback`}>
                    <FontAwesomeIcon icon={['fab', 'discord']} />{' '}
                    디스코드로 로그인
                  </ButtonOutline>
                </StyledBox>*/}
                <Grid container justify="center">
                  <Grid item xs={12} md={4}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">로그인</Typography>
                        <Button variant="outlined" color="primary" style={{ width: '100%' }} href={`${config.base}/auth/authorize?state=${location.protocol}//${location.hostname}/auth/callback`}>
                          <FontAwesomeIcon icon={['fab', 'discord']} />{' '}
                      디스코드로 로그인
                    </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </>
            )
          }
        </main>
      </div>
    )
  }
}
