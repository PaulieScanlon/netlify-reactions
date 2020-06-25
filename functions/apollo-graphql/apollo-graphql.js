require('dotenv').config();
const faunadb = require('faunadb');
const { ApolloServer, gql } = require('apollo-server-lambda');

const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.GATSBY_FAUNA_DB });

const COLLECTION_NAME = process.env.GATSBY_FAUNA_COLLECTION;

const typeDefs = gql`
  type Query {
    getReactionsBySlug(slug: String!): [ReactionsObject]
  }

  type Reaction {
    name: String
    count: Int
  }

  type ReactionsObject {
    ref: String
    slug: String
    reactions: [Reaction]
  }
`;

const resolvers = {
  Query: {
    // // GET REACTIONS BY SLUG
    getReactionsBySlug: async (root, args, context) => {
      const results = await client.query(
        q.Map(
          q.Paginate(q.Match(q.Index('get-reactions-by-slug'), args.slug)),
          q.Lambda(['ref', 'slug', 'reactions'], q.Get(q.Var('ref')))
        )
      );

      return results.data.map((entry) => {
        const { ref, data } = entry;
        return {
          ref: ref.id,
          slug: data.slug,
          reactions: data.reactions
        };
      });
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
});
