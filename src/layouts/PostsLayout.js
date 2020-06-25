import React, { Fragment, useEffect, useState } from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import { format } from 'date-fns';

import {
  Heading,
  Text,
  Flex,
  Box,
  Divider,
  Button,
  Link,
  Spinner
} from 'theme-ui';
import { SvgBubbleSlider, SvgIcon } from 'react-svg-bubble-slider';

import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Seo from '../components/Seo';
import { useConfig } from '../utils/useConfig';

const GET_REACTIONS_BY_SLUG = gql`
  query($slug: String!) {
    getReactionsBySlug(slug: $slug) {
      ref
      slug
      reactions {
        name
        count
      }
    }
  }
`;

const PostsLayout = ({
  data: {
    mdx: {
      body,
      excerpt,
      frontmatter: { title, date },
      fields: { slug }
    }
  },
  pageContext
}) => {
  const { prev, next } = pageContext;

  const {
    site: {
      siteMetadata: { name, keywords, siteUrl, siteImage, lang }
    }
  } = useConfig();

  const { loading, data, error } = useQuery(GET_REACTIONS_BY_SLUG, {
    variables: {
      slug
    }
  });

  const iconsToUse = ['angry', 'sad', 'neutral', 'smile', 'happy', 'cool'];
  const [reactions, setReactions] = useState();

  useEffect(() => {
    if (data && data.getReactionsBySlug.length) {
      setReactions(data.getReactionsBySlug[0].reactions);
    }
  }, [data]);

  // console.log('slug: ', slug);
  // console.log('loading: ', loading);
  // // console.log('response: ', response);
  // console.log('reactions: ', reactions);
  // console.log('error: ', JSON.stringify(error, null, 2));

  return (
    <Box
      sx={{
        mb: 4
      }}
    >
      <Seo
        type="article"
        title={name}
        titleTemplate={title}
        keywords={keywords}
        description={excerpt}
        siteUrl={siteUrl}
        siteImage={siteImage}
        lang={lang}
        path={slug}
      />
      <Flex
        sx={{
          flexDirection: 'column'
        }}
      >
        <Heading as="h1" variant="styles.h1">
          {title}
        </Heading>
        <Text as="small" variant="styles.small" sx={{ color: 'highlight' }}>
          {format(new Date(date), 'd MMMM u')}
        </Text>
      </Flex>
      <MDXProvider>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
      <Divider />
      <Box sx={{ height: 110 }} />
      <Flex
        sx={{
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          m: 'auto'
        }}
      >
        <Box
          sx={{
            '.speech-bubble-text': {
              fill: 'primary',
              fontSize: 3,
              textTransform: 'capitalize'
            },
            '.svg-bubble-action': {
              minHeight: 44
            }
          }}
        >
          <SvgBubbleSlider icons={iconsToUse}>
            {({ reaction }) => (
              <Flex sx={{ justifyContent: 'center' }}>
                {reaction && (
                  <Button onClick={() => console.log(reaction)}>
                    {reaction}
                  </Button>
                )}
              </Flex>
            )}
          </SvgBubbleSlider>
          <Divider />
        </Box>
      </Flex>
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'space-around',
          textAlign: 'center',
          m: 'auto',
          maxWidth: 280
        }}
      >
        {loading && <Spinner />}
        {error && <Text>{`${error}`}</Text>}
        {!loading && !error && reactions && (
          <Fragment>
            {reactions.map((icon, index) => {
              const { name, count } = icon;
              return (
                <Flex
                  key={index}
                  sx={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    '.svg-icon': {
                      color: 'muted'
                    },
                    mx: 2
                  }}
                >
                  <SvgIcon name={name} />
                  <Text
                    as="small"
                    variant="small"
                    sx={{ color: 'darken', mt: 2, textAlign: 'center' }}
                  >
                    {count}
                  </Text>
                </Flex>
              );
            })}
          </Fragment>
        )}
      </Flex>
      <Box sx={{ height: 20 }} />

      <Flex
        sx={{
          justifyContent: 'space-between',
          mx: (theme) => `-${theme.space[2]}px`
        }}
      >
        <Box>
          {prev && (
            <Box>
              <Link
                as={GatsbyLink}
                to={prev.fields.slug}
                sx={{
                  textDecoration: 'none',
                  ':focus': {
                    outlineColor: 'primary'
                  }
                }}
              >
                <Button tabIndex={-1} variant="ghost">
                  Prev
                </Button>
              </Link>
            </Box>
          )}
        </Box>
        <Box>
          {next && (
            <Box>
              <Link
                as={GatsbyLink}
                to={next.fields.slug}
                sx={{
                  textDecoration: 'none',
                  ':focus': {
                    outlineColor: 'primary'
                  }
                }}
              >
                <Button tabIndex={-1} variant="ghost">
                  Next
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export const post = graphql`
  query getSinglePost($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      excerpt
      frontmatter {
        title
        date
      }
      fields {
        slug
      }
    }
  }
`;

export default PostsLayout;
