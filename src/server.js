import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

let links = [
    {
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'A comprehensive guide to GraphQL',
    },
    {
        id: 'link-1',
        url: 'www.howtographql.com',
        description: 'A comprehensive guide to GraphQL',
    },
];

const typeDefs = `#graphql
  type Query {
    info: String!
    feed: [Link]!
  }
  type Link {
    id: String!
    description: String!
    url: String!
  }
`;

const info = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        info: () => 'Hackernews clone with GraphQL',
        feed: () => links,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);