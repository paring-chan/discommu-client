import { BorderBox } from '@primer/components'
import { Button } from '@material-ui/core'
import Head from 'next/head'
import Link from 'next/link'
import { Component } from 'react'
import styled from 'styled-components'
import config from '../../../config'
import Router, { withRouter } from 'next/router'
import Layout from '../../../components/Layout'
import GraphQL from '../../../util/graphql'
import { gql } from '@apollo/client'

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

class VerifyLogin extends Component {
    async componentDidMount() {
        if (localStorage.getItem('token')) {
            await Router.push('/')
        }
        if (this.props.token) {
            localStorage.setItem('token', this.props.token)
            const client = GraphQL.getInstance()
            const res = await client.query({
                query: gql`
                    query {
                        user {
                            profile {
                                id
                                email
                                avatar
                                discriminator
                                username
                            }
                        }
                    }
                `
            })
            if (res.data.user === null) {
                localStorage.removeItem('token')
                this.props.updateSession({ token: null, loggedIn: false, user: null })
            } else {
                this.props.updateSession({ token: localStorage.getItem('token'), loggedIn: true, user: res.data.user })
            }
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
                    <h2>로그인 처리중</h2>
                    {this.props.message}
                    {
                        this.props.homeButton &&
                        <Link href="/">
                            <Button width="100%">
                                홈으로
                                </Button>
                        </Link>
                    }
                </main>
            </div>
        )
    }
    static getInitialProps = async ctx => {
        const data = (await (await fetch(config.graphql, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${ctx.query.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                query {
                    user {
                        profile {
                            id
                            email
                            avatar
                            discriminator
                        }
                    }
                }
                `
            })
        })).json()).data
        if (data.user === null) {
            return { message: '토큰이 잘못되었습니다.', homeButton: true }
        } else {
            return { message: '로그인이 완료되었습니다. 리다이렉트 중입니다..', token: ctx.query.token }
        }
    }
}


export default VerifyLogin
