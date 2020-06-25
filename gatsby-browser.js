const React = require('react');
const { client } = require('./src/client');
const { ApolloProvider } = require('@apollo/react-hooks');

exports.wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);
