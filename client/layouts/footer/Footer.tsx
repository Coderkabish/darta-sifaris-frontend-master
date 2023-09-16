import { Box } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box mr="10" py={4} bg="white" sx={{ align: 'right' }}>
      <Link href="/">
        Copyright © {currentYear} Digipalika. All rights reserved.
      </Link>
    </Box>
  );
};

export default Footer;
