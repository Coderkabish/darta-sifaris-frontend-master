import { Avatar, Button, FileInput, Group, Paper, Stack, TextInput, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import Layout from '../../../components/Layout/layout';
// eslint-disable-next-line import/extensions
import { NextPageWithLayout } from '../../_app';
import { useAppContext } from '../../../context/AppProvider';

// eslint-disable-next-line max-len
const Ward: NextPageWithLayout = () => {
    // @ts-ignore
    const { user } = useAppContext();
    const [file, setFile] = useState<File | null>(null);

    const form = useForm({
        initialValues: {
            username: user?.username ?? '',
            password: '',
            email: user?.email ?? '',
            name: user?.name ?? '',
        },
    });
    const theme = useMantineTheme();
    const handleSubmit = () => {
        // TODO UPDATE user profile
        // HttpRequest.put(API.users.user, session).then((res)=>{
        //
        // })
    };
    return (
        <>
          <Paper sx={{ margin: 20 }}>
              <form onSubmit={form.onSubmit(handleSubmit)}>
                  <Group spacing={50}>
                      <Avatar
                        src={null}
                        alt="profile image"
                        color={theme.colors.main[4]}
                        size={100}
                        sx={{ borderRadius: 50 }}
                      />
                      <Stack sx={{ width: '50%' }}>
                          <TextInput
                            placeholder="Name"
                            label="Name"
                            type="text"
                            {...form.getInputProps('name')}
                          />
                          <TextInput
                            placeholder="username"
                            label="Username"
                            type="text"
                            {...form.getInputProps('username')}
                          />
                          <FileInput
                            label="Upload files"
                            placeholder="Upload profile"
                            description="Image must be in JPEG or PNG format"
                            value={file}
                            onChange={setFile}
                          />

                      </Stack>
                  </Group>
                  <Button mt={30} w={200}>Save Changes</Button>
              </form>
          </Paper>
        </>
    );
};

Ward.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Ward;
