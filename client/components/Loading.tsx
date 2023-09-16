import React from 'react';
import { Flex, Progress, Text } from '@mantine/core';

type PropsType = {
  isFullPage?: boolean;
  w?: string | string[];
  // eslint-disable-next-line react/no-unused-prop-types
  size?: string;
  showShopLoader?: boolean;
  shopCreate?: boolean;
};

const Loading = ({
  isFullPage = false,
  w = '100%',
  showShopLoader = false,
  shopCreate = false,
}: PropsType) => {
  if (shopCreate) {
    return (
      <>
        <Flex
          bg="white"
          align="center"
          justify="center"
          direction="column"
          sx={{ height: '100vh', width: '100%' }}
        >
          <Progress
            color="primary"
            mt="5"
          />
          <Text mt="5" sx={{ fontSize: 'md' }}>
            Building the system....Please wait...It is one time setup!
          </Text>
        </Flex>
      </>
    );
  }

  if (showShopLoader) {
    return (
      <Flex
        h="100vh"
        w="100%"
        bg="white"
        align="center"
        justify="center"
        direction="column"
      >
        <Progress
          color="primary"
        />
      </Flex>
    );
  }

  return (
    <Flex
      h={isFullPage ? '100vh' : '100%'}
      align="center"
      justify="center"
      sx={{ width: w ?? '100%' }}
    >
      <Progress
        color="primary"
      />
    </Flex>
  );
};

export default Loading;
