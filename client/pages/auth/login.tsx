/* eslint-disable linebreak-style */
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Text,
  Stack,
  TextInput,
  useMantineTheme,
  SimpleGrid,
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mantine/hooks';
import { HttpRequest } from '../../lib/HttpRequest';
import nepallogo from '../../public/nepal_logo.png';
import { API } from '../../utils/API';

export default function Login() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signingIn, setSigningIn] = useState(false);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });
  const login = ({ username, password }: { username: string; password: string }) => {
    try {
      HttpRequest.post(API.auth.login, { username, password })
        .then(async (res) => {
          if (res.data.message === 'Login Successfull') {
            setSigningIn(true);
            await router.push('/admin/dashboard');
            sessionStorage.setItem('session', res?.data?.data?.token);
            showNotification({
              message: 'Login Successfully !',
              color: 'green',
            });
          } else {
            showNotification({
              message: res.data.message,
              color: 'red',
              autoClose: 2000,
            });
          }
        })
        .catch(() => {
          showNotification({
            message: 'Not Authenticated!',
            color: 'red',
            autoClose: 2000,
          });
        })
        .finally(() => setSigningIn(false));
    } catch (e) {
      showNotification({
        message: e.message,
        color: 'red',
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (values: any) => {
    const { username, password } = values;
    await login({
      username,
      password,
    });
  };

  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 1000px)');

  return (
    <Box
      sx={{
        justifyContent: 'center',
        backgroundColor: theme.colors.main[3],
        height: '100%',
        width: '100%',
      }}
    >
      <Center
        sx={{ borderRadius: '100px' }}
        h={isMobile ? 0 : '100vh'}
        w="100vw"
        p={isMobile ? 0 : 10}
      >
        <SimpleGrid
          cols={isMobile ? 1 : 2}
          w={isMobile ? '100vw' : '60vw'}
          sx={{
            height: isMobile ? '100%' : '450px',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack
            sx={{ backgroundColor: theme.colors.main[4], position: 'relative', display: isMobile ? 'flex' : null }}
            h={isMobile ? 'auto' : '100%'}
            py={isMobile ? 40 : 0}
            spacing={0}
          >
            <Avatar
              src={nepallogo.src}
              h="100px"
              w="100px"
              m="4"
              mt={isMobile ? 20 : 100}
              sx={{ borderRadius: 30, alignSelf: 'center', height: '100px', width: '100px' }}
            >
              {' '}
              N
            </Avatar>
            <div>
              <Text
                sx={{
                  fontSize: 32,
                  textAlign: 'center',
                  backgroundColor: 'transparent',
                  color: 'white',
                  weight: 700,
                }}
              >
                बेसीशहर नगरपालिका
              </Text>
              {/* eslint-disable-next-line max-len */}
              <Text
                sx={{
                  fontSize: 16,
                  textAlign: 'center',
                  backgroundColor: 'transparent',
                  color: 'white',
                  weight: 500,
                }}
              >
                नगर कार्यपालिकाको कार्यालय, लमजुङ
              </Text>
            </div>
          </Stack>
          <Flex mx={isMobile ? 15 : 0} py={isMobile ? 40 : 4} align="center" justify="center" direction="column" sx={{ flex: 1, boxShadow: isMobile ? 'rgba(0, 0, 0, 0.1) 0px 4px 12px' : null }}>
            <Group
              spacing={4}
              p="2"
              align="center"
              sx={{ fontSize: 50, justifyContent: 'center', marginBottom: 40 }}
            >
              <Avatar size={50} color={theme.colors.main[4]}>
                D
              </Avatar>
              <Text color={theme.colors.main[4]} weight={500}>
                Digipalika
              </Text>
            </Group>
            <Stack spacing={8} w="70%">
              <form onSubmit={form.onSubmit(handleSubmit)}>
                {/*<Header sx={{ fontSize: 30, paddingLeft: 4, paddingRight: 4 }} height={30}>लगइन गर्नुहोस्</Header>*/}
                <TextInput
                  label="प्रयोगकर्ता नाम"
                  type="text"
                  placeholder="username"
                  mb={20}
                  {...form.getInputProps('username')}
                />
                <TextInput
                  type="password"
                  mb={20}
                  label="पासवर्ड"
                  placeholder="password"
                  {...form.getInputProps('password')}
                />

                <Stack spacing={6}>
                  <Stack align="start" justify="space-between">
                    {/* <Checkbox>Remember me</Checkbox> */}
                    {/* <Link color={'primary'} href="/auth/forgot-password">पासवर्ड भुल्नु भयो?</Link> */}
                  </Stack>
                  <Button
                    color="white"
                    type="submit"
                    sx={{
                      backgroundColor: theme.colors.main[4],
                      color: 'white',
                      '&:hover': {
                        opacity: '0.7',
                        boxShadow: 'lg',
                      },
                    }}
                    loading={signingIn}
                  >
                    साइन इन गर्नुहोस्
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Flex>
        </SimpleGrid>
      </Center>
    </Box>
  );
}
