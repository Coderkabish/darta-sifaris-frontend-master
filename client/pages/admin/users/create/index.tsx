import { Button, Group, Paper, Radio, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import { DatePicker } from '@mantine/dates';
import { nepaliToEnglishNumber } from 'nepali-number';
import { NextPageWithLayout } from '../../../_app';
import Layout from '../../../../components/Layout/layout';
import { HttpRequest } from '../../../../lib/HttpRequest';
import { API } from '../../../../utils/API';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
// eslint-disable-next-line max-len
const CreateUser: NextPageWithLayout = () => {
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
            category: '',
            office: '',
            position: '',
        },
        validate: {
            username: (value) => (value.length < 1 ? 'Username is required!' : null),
            password: (value) => (value.length < 1 ? 'Password is required!' : null),
            email: (value) => (value.length < 1 ? ' Email is required!' :
                /^\S+@\S+$/.test(value) ? null : 'Invalid Email'),
        },
    });
    const [session, setSession] = useState(null);
    const handleDateOfBirthNep = ({ bsDate }) => {
        const nea = nepaliToEnglishNumber(bsDate);
        form.setFieldValue('dateOfBirthNep', `${nea}`);
    };
    const handleDateOfExpireNep = ({ bsDate }) => {
        const nea = nepaliToEnglishNumber(bsDate);
        form.setFieldValue('expiryDateNep', `${nea}`);
    };

    useEffect(() => {
        const session1 = sessionStorage.getItem('session');
        setSession(session1);
    }, []);

    const handleCreateUser = () => {
        if (form.isValid()) {
            HttpRequest.post(API.user.users, form.values, session).then((res) => {
                showNotification({
                    message: res.data.message,
                    color: 'green',
                    autoClose: 2000,
                });
            }).then(() => {
                form.reset();
            })
                .catch(() => {
                showNotification({
                    message: 'some error occurred!',
                    color: 'red',
                    autoClose: 2000,
                });
            });
        }
    };
    return (
        <Stack sx={{ padding: 10 }}>
            <Paper>
            <form onSubmit={form.onSubmit(handleCreateUser)}>

                <Stack>
                    <Text weight={500} size={20}> Create a User (प्रयोगकर्ताको विवरण)</Text>
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
                          withAsterisk
                          {...form.getInputProps('gender')}
                        >
                            <Group>
                                <Radio label="Male" value="male" />
                                <Radio label="Female" value="female" />
                                <Radio label="Others" value="other" />
                            </Group>
                        </Radio.Group>

                    </SimpleGrid>
                    <SimpleGrid cols={3}>
                        <TextInput
                          placeholder="First Name"
                          label="First Name"
                          type="text"
                          withAsterisk
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
                          withAsterisk
                          {...form.getInputProps('lastNameEng')}
                        />
                    </SimpleGrid>
                    <SimpleGrid cols={3}>
                        <TextInput
                          placeholder="First Name(नेपाली )"
                          label="First Name(नेपाली )"
                          type="text"
                          withAsterisk
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
                          withAsterisk
                          {...form.getInputProps('lastNameNep')}
                        />
                    </SimpleGrid>
                    <SimpleGrid cols={2}>
                        <DatePicker
                          placeholder="Date of Birth"
                          label="Date of Birth"
                          type="text"
                          withAsterisk
                          {...form.getInputProps('dateOfBirthEng')}
                        />
                        <Stack spacing={0}>
                            <Group spacing={0}>
                                <Text weight={500}>Date of Birth(नेपाली )</Text>
                                <Text color="red" span>
                                    *
                                </Text>
                            </Group>
                            <Calendar
                              onChange={handleDateOfBirthNep}
                              theme="blue"
                              placeholder="Date of Birth(नेपाली )"
                              style={{
                                    padding: 5,
                                    width: '100%',
                                    borderRadius: 10,
                                    border: '1px solid grey',
                                }}
                            />
                        </Stack>
                    </SimpleGrid>

                    <SimpleGrid cols={3}>
                        <DatePicker
                          placeholder="Expire Date"
                          label="Expire Date"
                          type="text"
                          withAsterisk
                          {...form.getInputProps('expiryDateEng')}
                        />
                        <Stack spacing={0}>
                            <Group spacing={0}>
                                <Text weight={500}>Expire Date(नेपाली )</Text>
                                <Text color="red" span>
                                    *
                                </Text>
                            </Group>
                            <Calendar
                              onChange={handleDateOfExpireNep}
                              theme="blue"
                              placeholder="Expire Date Nepali"
                              default={null}
                              style={{
                                    padding: 5,
                                    width: '100%',
                                    borderRadius: 10,
                                    border: '1px solid grey',
                                }}
                            />
                        </Stack>

                        <TextInput
                          type="number"
                          placeholder="Phone Number"
                          label="phone number"
                          withAsterisk
                          {...form.getInputProps('phoneNumber')}
                        />
                    </SimpleGrid>
                    <SimpleGrid cols={3}>
                        <TextInput
                          placeholder="Office"
                          label="User's Office"
                          type="text"
                          withAsterisk
                          {...form.getInputProps('office')}
                        />
                        <TextInput
                          placeholder="Category"
                          label="Category"
                          type="text"
                          withAsterisk
                          {...form.getInputProps('category')}
                        />
                        <TextInput
                          placeholder="Position"
                          label="position"
                          type="text"
                          withAsterisk
                          {...form.getInputProps('position')}
                        />
                    </SimpleGrid>

                    <Group position="right">
                        <Button type="submit" sx={{ width: 200 }}>Create User
                        </Button>
                    </Group>

                </Stack>
            </form>
            </Paper>
        </Stack>
    );
};

CreateUser.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default CreateUser;
