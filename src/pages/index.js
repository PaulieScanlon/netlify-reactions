import React, { Fragment } from 'react';
import { Heading, Text, Box, Link, Divider } from '@theme-ui/components';

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
        title={name}
        titleTemplate=""
        keywords={keywords}
        description={description}
        siteUrl={siteUrl}
        siteImage={siteImage}
        lang={lang}
      />
      <Heading as="h1" variant="styles.h1">
        Hiya!{' '}
        <span role="img" aria-label="wave">
          👋
        </span>
      </Heading>
      <Divider />
      <Heading as="h4" variant="styles.h4">
        React Svg Bubble Slider demo blog
      </Heading>
      <Text>
        This is a demo blog using{' '}
        <Link href="https://dashboard.fauna.com/" target="_blank">
          FaunaDB
        </Link>{' '}
        {''} for the data storage.
        <Divider />
        This demo blog also uses Netlify Continuous Deployment, Netlify
        serverless functions and Apollo/GraphQL
      </Text>
      <Divider />
      <Divider />
      <Text>
        If you're using React Svg Bubble Slider in your project please do let me
        know{' '}
        <Link href="https://twitter.com/PaulieScanlon" target="_blank">
          @pauliescanlon
        </Link>
      </Text>
    </Fragment>
  );
};

export default IndexPage;
