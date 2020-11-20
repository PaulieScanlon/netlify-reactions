import React, { Fragment } from 'react';
import {
  Heading,
  Text,
  Box,
  Link,
  Divider,
  Button,
  Flex
} from '@theme-ui/components';
import { Link as GatsbyLink } from 'gatsby';

import Seo from '../components/Seo';
import { useConfig } from '../utils/useConfig';

const IndexPage = () => {
  const {
    site: {
      siteMetadata: { name, description, keywords, siteUrl, siteImage, lang }
    }
  } = useConfig();

  return (
    <Fragment>
      <Seo
        type="website"
        title="Carlos"
        titleTemplate="About Me"
        keywords={keywords}
        description={description}
        siteUrl={siteUrl}
        siteImage={siteImage}
        lang={lang}
      />
      <Heading as="h1" variant="styles.h1">
        Carlos!{' '}
        <span role="img" aria-label="wave">
          👋
        </span>
      </Heading>
      <Divider />
      <Heading as="h4" variant="styles.h4">
        React Svg Bubble Slider demo blog
      </Heading>

      <Text>
        To leave a reaction head over to the{' '}
        <Link as={GatsbyLink} to="/posts">
          Posts
        </Link>{' '}
        page to see reactions in action!
      </Text>
      <Text>
        This is a demo blog using{' '}
        <Link href="https://fauna.com/" target="_blank">
          FaunaDB
        </Link>{' '}
        {''} for the data storage. This demo blog also uses Netlify Continuous
        Deployment, Netlify serverless functions and Apollo/GraphQL
      </Text>
      <Text>
        If you're using React Svg Bubble Slider in your project please do let me
        know{' '}
        <Link href="https://twitter.com/ClsVitor" target="_blank">
          @ClsVitor
        </Link>
     <Divider />
      <Flex
        sx={{
          alignItems: 'center'
        }}
      >
        <Text
          sx={{
            fontSize: 3,
            mr: 2
          }}
        >
         <Link as={GatsbyLink} to="/posts" sx={{ textDecoration: 'none', align: 'center'}}>
          <Button as="span"> Blog </Button>
        </Link>
        </Text>
      </Flex>
      <Divider />
      </Text>
    </Fragment>
  );
};

export default IndexPage;
