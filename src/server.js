import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');

const resolvers = {
    Query: {
        info: () => 'Hackernews clone with GraphQL',
        feed: () => links,
    },
    Mutation: {
        post: (root, args) => {
            let idCount = links.length;
            let link = {
                id: `link-${links.length}`,
                description: args.description,
                url: args.url,
            };
            links.push(link);
            return link;
        },
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