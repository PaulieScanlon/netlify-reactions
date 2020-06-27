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

  type Mutation {
    updateReactionsByRef(
      ref: String!
      reactions: [ReactionInput]!
    ): ReactionsObject

    createReactionsBySlug(
      slug: String!
      reactions: [ReactionInput]!
    ): ReactionsObject
  }

  type ReactionType {
    name: String
    count: Int
  }

  type ReactionsObject {
    ref: String
    slug: String
    reactions: [ReactionType]
  }

  input ReactionInput {
    name: String
    count: Int
  }
`;

const resolvers = {
  Query: {
    // GET REACTIONS BY SLUG
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
  },
  Mutation: {
    // CREATE REACTIONS BY SLUG
    createReactionsBySlug: async (root, args, context) => {
      const results = await client.query(
        q.Create(q.Collection(COLLECTION_NAME), {
          data: {
            slug: args.slug,
            reactions: args.reactions
          }
        })
      );
      console.log(JSON.stringify(results, null, 2));
    },

    // UPDATE REACTIONS BY REF
    updateReactionsByRef: async (root, args, context) => {
      const results = await client.query(
        q.Update(q.Ref(q.Collection(COLLECTION_NAME), args.ref), {
          data: {
            reactions: args.reactions
          }
        })
      );

      const {
        ref,
        data: { slug, reactions }
      } = results;

      return {
        ref: ref.id,
        slug: slug,
        reactions: reactions
      };
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
