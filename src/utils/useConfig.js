import { useStaticQuery, graphql } from 'gatsby';

export const useConfig = () =>
  useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            name
            description
            keywords
            siteUrl
            siteImage
            profileImage
            lang
          }
        }
      }
    `
  );
