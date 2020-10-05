import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import config from "../config";
import { setContext } from '@apollo/client/link/context';

export default class GraphQL {
    /**
     * @type {ApolloClient|undefined}
     */
    static instance

    /**
     * @returns {ApolloClient}
     */
    static getInstance() {
        if (!this.instance) {
            const httpLink = createHttpLink({
                uri: config.graphql
            })
            const authLink = setContext((_, { headers }) => {
                const token = localStorage.getItem('token');
                return {
                  headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : "",
                  }
                }
            })
            this.instance = new ApolloClient({
                cache: new InMemoryCache(),
                link: authLink.concat(httpLink)
            })
        }
        return this.instance
    }
}