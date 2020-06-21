import React, { Fragment } from "react";
import { Container, Flex, Box, NavLink } from "theme-ui";
import { Link as GatsbyLink } from "gatsby";

import { SvgIcon } from "react-svg-bubble-slider";

const Header = () => {
  return (
    <Fragment>
      <Flex
        as="header"
        sx={{
          alignItems: "center",
          backgroundColor: "background",
          borderBottomColor: "muted",
          borderBottomStyle: "solid",
          borderBottomWidth: 1,
          height: "header",
          left: 0,
          position: "fixed",
          right: 0,
          zIndex: 1,
        }}
      >
        <Container
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Flex
            as="nav"
            sx={{
              alignItems: "center",
              mx: (theme) => `-${theme.space[2]}px`,
            }}
          >
            <NavLink as={GatsbyLink} to="/">
              <SvgIcon name="wondering" />
            </NavLink>
          </Flex>
        </Container>
      </Flex>
      <Box
        sx={{
          height: (theme) => `${theme.sizes.header * 1.5}px`,
        }}
      />
    </Fragment>
  );
};

export default Header;
