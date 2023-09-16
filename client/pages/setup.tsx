/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-indent-props */
import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  Stack,
  TextInput,
  useMantineTheme,
  SimpleGrid,
  Paper,
  PasswordInput,
} from '@mantine/core';
import { IconUserPlus } from '@tabler/icons';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import nepallogo from '../public/nepal_logo.png';
import { HttpRequest } from '../lib/HttpRequest';
import { API } from '../utils/API';

export default function Login() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      firstNameEng: '',
      lastNameEng: '',
      middleNameEng: '',
    },
    validate: {
      username: (value, values) => (values.username.length < 2 ? 'Too short name' : null),

      password: (value, values) => (values.password.length < 0 ? 'Password is required' : null),

      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,

      email: (value, values) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ? null : 'Invalid email address',

      firstNameEng: (value, values) =>
        values.firstNameEng.length < 0 ? 'First name is required' : null,

      lastNameEng: (value, values) =>
        values.lastNameEng.length < 0 ? 'Last name is required' : null,
    },
  });

  const handleSubmit = async (values) => {
    const { confirmPassword, ...formData } = values;
    setLoading(true);
    try {
      await HttpRequest.post(API.user.createAdmin, formData).then(async (res) => {
        if (res.data.message === 'Admin created') {
          showNotification({
            message: 'Admin created',
            color: 'green',
          });
          setLoading(false);
          await router.push('/auth/login');
        } else {
          showNotification({
            message: res.data.mesages,
            color: 'red',
            autoClose: 2000,
          });
        }
      });
    } catch (e) {
      showNotification({
        message: e.message,
        color: 'red',
        autoClose: 2000,
      });
    }
  };

  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 1000px)');

  return (
    <Box sx={{ justifyContent: 'center', height: '100%', width: '100%' }}>
      <Stack
        sx={{ backgroundColor: theme.colors.main[4], position: 'relative', padding: '11px' }}
        spacing={0}
      >
        <Flex align="center" justify="center" direction="row" sx={{ flex: 1, padding: 4 }}>
          <Avatar
            src={nepallogo.src}
            h="100px"
            w="100px"
            m="4"
            sx={{ borderRadius: 30, alignSelf: 'center', height: '100px', width: '100px' }}
          >
            {' '}
            N
          </Avatar>
          <Stack className="ms-4">
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
          </Stack>
        </Flex>
      </Stack>
      {/* Form */}
      <Paper mt={40} pt={40} pb={50} className="border col-sm-9 col-11 mx-auto">
        <h3 className="underline-header d-flex justify-content-center mb-4 pb-2 text-secondary fw-600">
          Admin Registration
        </h3>
        <form onSubmit={form.onSubmit(handleSubmit)} className="px-3">
          <SimpleGrid
            cols={3}
            pb={10}
            breakpoints={[
              { maxWidth: 'md', cols: 2, spacing: 'md' },
              { maxWidth: 'sm', cols: 1, spacing: 'sm' },
            ]}
          >
            <TextInput
              placeholder="पहिलो नाम"
              label="पहिलो नाम"
              type="text"
              {...form.getInputProps('firstNameEng')}
              withAsterisk
            />
            <TextInput
              placeholder="बीचको नाम"
              label="बीचको नाम"
              type="text"
              {...form.getInputProps('middleNameEng')}
            />

            <TextInput
              placeholder="थर"
              label="थर"
              type="text"
              {...form.getInputProps('lastNameEng')}
              withAsterisk
            />
          </SimpleGrid>
          <SimpleGrid
            cols={2}
            spacing="md"
            breakpoints={[
              { maxWidth: 'md', cols: 2, spacing: 'md' },
              { maxWidth: 'sm', cols: 1, spacing: 'sm' },
            ]}
          >
            <TextInput
              placeholder="username"
              label="username"
              type="text"
              {...form.getInputProps('username')}
              withAsterisk
            />
            <TextInput
              placeholder="Email"
              label="Email"
              type="text"
              {...form.getInputProps('email')}
              withAsterisk
            />
            <PasswordInput
              placeholder="Password"
              label="Password"
              {...form.getInputProps('password')}
              withAsterisk
            />
            <PasswordInput
              placeholder="Confirm Password"
              label="Confirm Password"
              {...form.getInputProps('confirmPassword')}
              withAsterisk
            />
          </SimpleGrid>
          <Button
            leftIcon={<IconUserPlus size={18} />}
            className="fs-17 fw-500 mt-5 w-100"
            type="submit"
            mt={10}
            h={45}
            loading={loading}
          >
            {' '}
            रेकर्ड सेभ गर्नुहोस
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
