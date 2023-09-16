import { Button, Group, Radio, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import React from 'react';
import { useForm } from '@mantine/form';
import { NextRouter } from 'next/router';
import { DatePicker } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';
import { HttpRequest } from '../../lib/HttpRequest';
import { API } from '../../utils/API';

// eslint-disable-next-line no-empty-pattern
export const AddUserModal = ({ context,
                                     innerProps }: ContextModalProps<{
    endpoint: string;
    id: string;
    token: string;
    router: NextRouter;
    getAllUsers: () => void;
}>) => {
    const { token, getAllUsers } = innerProps;

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
            email: '',
            dateOfBirthNep: '',
            dateOfBirthEng: '',
            firstNameEng: '',
            middleNameEng: '',
            lastNameEng: '',
            firstNameNep: '',
            middleNameNep: '',
            lastNameNep: '',
            expiryDateEng: '',
            expiryDateNep: '',
            gender: '',
            phoneNumber: '',
        },
    });

    const CreateUser = () => {
       // TODO ADD USERS
        HttpRequest.post(API.user.users, form.values, token).then((res) => {
            context.closeModal('addUser');
            showNotification({
                message: res.data.message,
                color: 'green',
                autoClose: 2000,
            });
            getAllUsers();
        }).catch(error => {
            showNotification({
                message: error.message,
                color: 'green',
                autoClose: 2000,
            });
        });
    };
    return (
        <>
            <form>
                <Stack>
                    <Text weight={500} size={20}> Create a User</Text>
                    <SimpleGrid cols={2}>
                        <TextInput
                          placeholder="Username"
                          label="Username"
                          type="text"
                          {...form.getInputProps('username')}
                          withAsterisk
                        />
                        <TextInput
                          placeholder="Password"
                          label="Password"
                          type="password"
                          {...form.getInputProps('password')}
                          withAsterisk
                        />
                    </SimpleGrid>
                    <SimpleGrid cols={2}>
                        <TextInput
                          placeholder="Email"
                          label="Email"
                          type="email"
                          {...form.getInputProps('email')}
                          withAsterisk
                        />
                        <Radio.Group
                          name="Gender"
                          label="Gender"
                          {...form.getInputProps('gender')}
                        >
                            <Group>
                                <Radio label="Male" value="male" />
                                <Radio label="Female" value="female" />
                                <Radio label="Others" value="others" />
                            </Group>
                        </Radio.Group>

                    </SimpleGrid>
                    <SimpleGrid cols={3}>
                        <TextInput
                          placeholder="First Name"
                          label="First Name"
                          type="text"
                          {...form.getInputProps('firstNameEng')}
                        />
                        <TextInput
                          placeholder="Middle Name"
                          label="Middle Name"
                          type="text"
                          {...form.getInputProps('middleNameEng')}
                        />
                        <TextInput
                          placeholder="Last Name"
                          label="Last Name"
                          type="text"
                          {...form.getInputProps('lastNameEng')}
                        />
                    </SimpleGrid>
                    <SimpleGrid cols={3}>
                        <TextInput
                          placeholder="First Name(नेपाली )"
                          label="First Name(नेपाली )"
                          type="text"
                          {...form.getInputProps('firstNameNep')}
                        />
                        <TextInput
                          placeholder="Middle Name(नेपाली )"
                          label="Middle Name(नेपाली )"
                          type="text"
                          {...form.getInputProps('middleNameNep')}
                        />
                        <TextInput
                          placeholder="Last Name(नेपाली )"
                          label="Last Name(नेपाली )"
                          type="text"
                          {...form.getInputProps('lastNameNep')}
                        />
                    </SimpleGrid>
                    <SimpleGrid cols={2}>
                        <DatePicker
                          placeholder="Date of Birth"
                          label="Date of Birth"
                          type="date"
                          {...form.getInputProps('dateOfBirthEng')}
                        />

                        <DatePicker
                          placeholder="Date of Birth(नेपाली )"
                          label="Date of Birth(नेपाली )"
                          type="text"
                          {...form.getInputProps('dateOfBirthNep')}
                        />
                    </SimpleGrid>

                    <SimpleGrid cols={3}>
                        <DatePicker
                          placeholder="Expire Date"
                          label="Expire Date"
                          type="text"
                          {...form.getInputProps('expiryDateEng')}
                        />
                        <DatePicker
                          placeholder="Expire Date(नेपाली )"
                          label="Expire Date(नेपाली )"
                          type="text"
                          {...form.getInputProps('expiryDateNep')}
                        />
                        <TextInput
                          type="number"
                          placeholder="Phone Number"
                          label="phone number"
                          {...form.getInputProps('phoneNumber')}
                        />
                    </SimpleGrid>
                    <SimpleGrid cols={3}>
                        <TextInput
                          placeholder="Office"
                          label="User's Office"
                          type="text"
                          {...form.getInputProps('office')}
                        />
                        <TextInput
                          placeholder="Category"
                          label="Category"
                          type="text"
                          {...form.getInputProps('category')}
                        />
                        <TextInput
                          placeholder="Position"
                          label="position"
                          type="text"
                          {...form.getInputProps('position')}
                        />
                    </SimpleGrid>
                    <Group position="apart">
                        <Button
                          onClick={() => context.closeModal('addUser')}
                          sx={{ width: 200 }}
                          color="red"
                        >Close
                        </Button>
                        <Button onClick={CreateUser} sx={{ width: 200 }}>Create User
                        </Button>
                    </Group>

                </Stack>
            </form>
        </>
    );
};
