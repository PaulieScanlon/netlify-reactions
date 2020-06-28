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

import { useMutation, useQuery } from '@apollo/react-hooks';
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

const UPDATE_REACTIONS_BY_REF = gql`
  mutation($ref: String!, $reactions: [ReactionInput]!) {
    updateReactionsByRef(ref: $ref, reactions: $reactions) {
      ref
      slug
      reactions {
        name
        count
      }
    }
  }
`;

const CREATE_REACTIONS_BY_SLUG = gql`
  mutation($slug: String!, $reactions: [ReactionInput]!) {
    createReactionsBySlug(slug: $slug, reactions: $reactions) {
      slug
      reactions {
        name
        count
      }
    }
  }
`;

const ICONS_TO_USE = ['angry', 'sad', 'neutral', 'smile', 'happy', 'cool'];

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

  const [reactions, setReactions] = useState([]);
  const [ref, setRef] = useState('');
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  const { loading, data, error } = useQuery(GET_REACTIONS_BY_SLUG, {
    variables: {
      slug
    }
  });

  const [updateReactionsByRef] = useMutation(UPDATE_REACTIONS_BY_REF, {
    onCompleted() {
      setIsLocalLoading(false);
    }
  });

  const [createReactionsBySlug] = useMutation(CREATE_REACTIONS_BY_SLUG, {
    onCompleted() {
      setIsLocalLoading(false);
    }
  });

  const handleSubmit = (reaction) => {
    setIsLocalLoading(true);

    if (reactions.length > 0) {
      updateReactionsByRef({
        variables: {
          ref,
          reactions: reactions.map((data) => {
            return {
              name: data.name,
              count: data.name === reaction ? (data.count += 1) : data.count
            };
          })
        },
        refetchQueries: [{ query: GET_REACTIONS_BY_SLUG, variables: { slug } }]
      });
    } else {
      const DEFAULT_REACTIONS = ICONS_TO_USE.map((icon) => {
        return {
          name: icon,
          count: 0
        };
      });

      createReactionsBySlug({
        variables: {
          slug,
          reactions: DEFAULT_REACTIONS.map((data) => {
            return {
              name: data.name,
              count: data.name === reaction ? (data.count += 1) : data.count
            };
          })
        },
        refetchQueries: [{ query: GET_REACTIONS_BY_SLUG, variables: { slug } }]
      });
    }
  };

  useEffect(() => {
    if (data && data.getReactionsBySlug.length) {
      setRef(data.getReactionsBySlug[0].ref);
      setReactions(
        data.getReactionsBySlug[0].reactions.map((data) => {
          return { name: data.name, count: data.count };
        })
      );
    }
  }, [data]);

  // console.log('slug: ', slug);
  // console.log('loading: ', loading);
  // console.log('data: ', data);
  // console.log('reactions: ', reactions);
  // console.log('ref: ', ref);
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
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              minHeight: 52
            }
          }}
        >
          <SvgBubbleSlider icons={ICONS_TO_USE}>
            {({ reaction }) => (
              <Flex sx={{ justifyContent: 'center' }}>
                {reaction && (
                  <Button
                    onClick={() => handleSubmit(reaction)}
                    disabled={isLocalLoading}
                    sx={{
                      minHeight: 40,
                      minWidth: 100,
                      textAlign: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {isLocalLoading ? (
                      <Spinner sx={{ color: 'white', width: 20, height: 20 }} />
                    ) : (
                      reaction
                    )}
                  </Button>
                )}
              </Flex>
            )}
          </SvgBubbleSlider>
        </Box>
      </Flex>
      <Divider />
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'space-around',
          textAlign: 'center',
          m: 'auto',
          maxWidth: 320
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
                      color: 'svgIcon'
                    },
                    mx: 2
                  }}
                >
                  <SvgIcon name={name} />
                  <Text
                    as="small"
                    variant="small"
                    sx={{
                      color: 'gray',
                      mt: 2,
                      textAlign: 'center'
                    }}
                  >
                    {count}
                  </Text>
                </Flex>
              );
            })}
            {reactions.length <= 0 && (
              <Heading as="h6" variant="styles.h6">
                Be the first to react 👆
              </Heading>
            )}
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
