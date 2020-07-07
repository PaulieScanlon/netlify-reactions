import React from 'react';
import { SvgIcon } from 'react-svg-bubble-slider';

import { Flex, Box, Text } from 'theme-ui';

const IconCount = ({ name, count }) => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '38px',
          bottom: '-6px'
        }}
      >
        <Flex
          sx={{
            alignItems: 'center',
            borderColor: 'primary',
            borderStyle: 'solid',
            borderWidth: '4px',
            backgroundColor: 'white',
            borderRadius: '50%',
            height: 32,
            justifyContent: 'center',
            textAlign: 'center',
            width: 32
          }}
        >
          <Text as="small" variant="small" sx={{ m: 0, textAlign: 'center' }}>
            {count}
          </Text>
        </Flex>
      </Box>
      <Flex
        sx={{
          alignItems: 'center',
          p: 1,
          backgroundColor: 'primary',
          borderRadius: '50%',
          '.svg-icon': {
            color: 'svgIcon'
          }
        }}
      >
        <SvgIcon name={name} size={40} />
      </Flex>
    </Flex>
  );
};

export default IconCount;
