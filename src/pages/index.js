import React, { Fragment } from "react";
import { format } from "date-fns";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Heading, Divider, Card, Flex, Box, Text, Button } from "theme-ui";

import Seo from "../components/Seo";
import { useConfig } from "../utils/useConfig";

const IndexPage = () => {
  const {
    site: {
      siteMetadata: { name, description, keywords, siteUrl, siteImage, lang },
    },
  } = useConfig();

  const posts = useStaticQuery(graphql`
    query getAllPosts {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
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
      }
    }
  `);

  return (
    <Fragment>
      <Seo
        type="website"
        title={name}
        titleTemplate="Demo"
        keywords={keywords}
        description={description}
        siteUrl={siteUrl}
        siteImage={siteImage}
        lang={lang}
      />
      <Heading as="h1" variant="styles.h1">
        Demo
      </Heading>
      <Divider />
      <Flex sx={{ flexWrap: "wrap", mx: (theme) => `-${theme.space[2]}px` }}>
        {posts.allMdx.edges.map((item, index) => {
          const {
            frontmatter: { title, date },
            fields: { slug },
            excerpt,
          } = item.node;
          return (
            <Box
              key={index}
              sx={{
                px: 2,
                mb: 3,
                a: {
                  textDecoration: "none",
                  ":focus": {
                    outlineColor: "accent",
                  },
                },
              }}
            >
              <Link to={slug}>
                <Card
                  sx={{
                    ":hover": {
                      button: {
                        color: "primary",
                      },
                    },
                  }}
                >
                  <Heading as="h4" variant="styles.h4">
                    {title}
                  </Heading>
                  <Text
                    as="small"
                    variant="styles.small"
                    sx={{ color: "highlight" }}
                  >
                    {format(new Date(date), "d MMMM u")}
                  </Text>
                  <Divider />
                  <Text
                    sx={{
                      mb: 4,
                    }}
                  >
                    {excerpt}
                  </Text>
                  <Button
                    variant="text"
                    tabIndex={-1}
                    sx={{ alignSelf: "flex-end" }}
                  >
                    Read post
                  </Button>
                </Card>
              </Link>
            </Box>
          );
        })}
      </Flex>
    </Fragment>
  );
};

export default IndexPage;
