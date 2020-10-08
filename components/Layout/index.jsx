import { gql } from '@apollo/client';
import { dom } from '@fortawesome/fontawesome-svg-core';
import { Toolbar } from '@material-ui/core';
import Head from 'next/head';
import React, { Component } from 'react';
import GraphQL from '../../util/graphql';
import Header from './header';

class Layout extends Component {
    async componentDidMount() {
        const client = GraphQL.getInstance()
        if (localStorage.getItem('token')) {
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
        }
    }
    render() {
        return (
            <>
            <Head>
                <style>
                    {dom.css()}
                </style>
            </Head>
                <Header {...this.props} />
                <Toolbar/>
                {this.props.children}
            </>
        );
    }
}

export default Layout