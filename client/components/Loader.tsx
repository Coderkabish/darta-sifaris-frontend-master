import React from 'react';
import { Box, Image, keyframes } from '@mantine/core';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
`;

const blink = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
`;

const Loader = () => (
  <Box
    top="0"
    left="0"
    sx={{ display: 'flex',
justifyContent: 'center',
alignItems: 'center',
      position: 'fixed',
width: '100%',
height: '100%' }}
    style={{ zIndex: '9999' }}
  >
    <Image
      src="/static/images/nepallogo.svg"
      alt="Logo"
      w="80px"
      h="80px"
      sx={{ animation: `${pulse} 1s ease infinite, ${blink} 0.5s ease infinite` }}
    />
  </Box>
);

export default Loader;
