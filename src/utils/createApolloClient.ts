import {
  ApolloClient,
  InMemoryCache,
  from,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { getSession } from 'next-auth/react';

const httpLink = createHttpLink({
  uri: process.env.GITHUB_GRAPHQL_API,
  credentials: "include",
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  const modifiedHeaders = {
    ...headers,
    authorization: session?.user.accessToken ? `Bearer ${session.user.accessToken}` : '',
  };
  return {
    headers: modifiedHeaders,
  };
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;