import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { graphql } from "gatsby";
import { format } from "date-fns";
import { Link as GatsbyLink } from "gatsby";
import { Heading, Text, Flex, Box, Divider, Button, Link } from "theme-ui";
import { SvgBubbleSlider } from "react-svg-bubble-slider";

import Seo from "../components/Seo";
import { useConfig } from "../utils/useConfig";

const PostsLayout = ({
  data: {
    mdx: {
      body,
      excerpt,
      frontmatter: { title, date },
      fields: { slug },
    },
  },
  pageContext,
}) => {
  const { prev, next } = pageContext;

  const {
    site: {
      siteMetadata: { name, keywords, siteUrl, siteImage, lang },
    },
  } = useConfig();

  const iconsToUse = ["angry", "sad", "neutral", "smile", "happy", "cool"];

  return (
    <Box>
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
          flexDirection: "column",
        }}
      >
        <Heading as="h1" variant="styles.h1">
          {title}
        </Heading>
        <Text as="small" variant="styles.small" sx={{ color: "highlight" }}>
          {format(new Date(date), "d MMMM u")}
        </Text>
      </Flex>
      <MDXProvider>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
      <Divider />
      <Box sx={{ height: 100 }} />
      <Box
        sx={{
          ".speech-bubble-text": {
            fill: "primary",
            fontSize: "24px",
            textTransform: "capitalize",
          },
          ".svg-bubble-action": {
            minHeight: 44,
          },
        }}
      >
        <SvgBubbleSlider icons={iconsToUse}>
          {({ reaction }) => (
            <Flex sx={{ justifyContent: "center" }}>
              {reaction && (
                <Button onClick={() => console.log(reaction)}>
                  {reaction}
                </Button>
              )}
            </Flex>
          )}
        </SvgBubbleSlider>
      </Box>
      <Box sx={{ height: 30 }} />
      <Flex
        sx={{
          justifyContent: "space-between",
          mx: (theme) => `-${theme.space[2]}px`,
        }}
      >
        <Box>
          {prev && (
            <Box>
              <Link
                as={GatsbyLink}
                to={prev.fields.slug}
                sx={{
                  textDecoration: "none",
                  ":focus": {
                    outlineColor: "primary",
                  },
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
                  textDecoration: "none",
                  ":focus": {
                    outlineColor: "primary",
                  },
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
      <Divider />
      <Divider />
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
