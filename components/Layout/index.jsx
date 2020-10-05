import { gql } from '@apollo/client';
import React, { Component } from 'react';
import GraphQL from '../../util/graphql';
import Header from './header';

class Layout extends Component {
    async componentDidMount() {
        const client = GraphQL.getInstance()
        if (localStorage.getItem('token')) {
            const res = await client.query({
                query: gql`
                    query GetUser {
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
            if (res.data.user === null) {
                localStorage.removeItem('token')
                this.props.updateSession({ token: null, loggedIn: false, user: null })
            }
        }
    }
    render() {
        return (
            <>
                <Header {...this.props} />
                {this.props.children}
            </>
        );
    }
}

export default Layout