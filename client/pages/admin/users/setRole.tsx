// eslint-disable-next-line import/extensions
import { Button, Checkbox, Group, MultiSelect, Paper, Select, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { NextPageWithLayout } from '../../_app';
import Layout from '../../../components/Layout/layout';
import { HttpRequest } from '../../../lib/HttpRequest';
import { API } from '../../../utils/API';
import { handleError, handleSucess } from '../../../utils/handler';

// eslint-disable-next-line max-len
const SetRole: NextPageWithLayout = () => {
    const form = useForm({
        initialValues: {
            username: '',
            ward_priv: '',
            palika_priv: false,
            delete_priv: false,
            edit_priv: false,
            print_priv: false,
            save_priv: false,
            department_priv: '',
            chalani_priv: false,
            darta_priv: false,
            create_temp: false,
            edit_temp: false,
            delete_temp: false,
        },
        validate: {
            username: (value) => (value.length < 1 ? 'Username is required to set role!' : null),
        },
    });

    const [userType, setUserType] = useState([]);
    const [wardType, setWardType] = useState([]);
    const [departmentType, setDepartmentType] = useState([]);
    const [session, setSession] = useState(null);

    useEffect(() => {
        const session1 = sessionStorage.getItem('session');
        HttpRequest.get(API.user.users, session).then((res) => {
            const userArr = res.data.data?.map(a => ({ label: a?.username, value: a.username }));
            setUserType(userArr);
        });
        HttpRequest.get(API.section.ward, session).then((res) => {
            const wardArr = res.data.data.wards.map(a => ({ label: a?.wardName, value: a.id }));
            setWardType(wardArr);
        });
        HttpRequest.get(API.section.department, session).then((res) => {
            const departmentArr = res.data.data.departments.map(a =>
                ({ label: a?.departmentName, value: a.id }));
            setDepartmentType(departmentArr);
        });
        setSession(session1);
    }, []);

    // TODO submit section handler
    const handleSetRole = () => {
        // Add section for ward, department
        const formData = {
            username: form.values.username,
            ward_priv: form.values.ward_priv,
            palika_priv: form.values.palika_priv,
            delete_priv: form.values.delete_priv,
            edit_priv: form.values.edit_priv,
            print_priv: form.values.print_priv,
            save_priv: form.values.save_priv,
            department_priv: form.values.department_priv,
            chalani_priv: form.values.chalani_priv,
            darta_priv: form.values.darta_priv,
            create_temp: form.values.create_temp,
            edit_temp: form.values.edit_temp,
            delete_temp: form.values.delete_temp,
        };
        if (form.validate) {
            HttpRequest.post(API.user.userRole, formData, session).then(res => {
                handleSucess(res.data);
                form.reset();
            }).catch(error => {
                handleError(error);
            });
        }
    };

    const isMobile = useMediaQuery('(max-width: 1000px)');

    return (
        <Paper sx={{ margin: 'auto', width: '90%', height: isMobile ? '90%' : '90%' }}>
            <form onSubmit={form.onSubmit(handleSetRole)}>
                <Stack>
                    <Select
                      data={userType}
                      label="Users"
                      placeholder="select a user"
                      withAsterisk
                      {...form.getInputProps('username')}
                    />
                    <Text weight={500} size={20}> Set User Role</Text>
                    {/*<TextInput*/}
                    {/*  type="number"*/}
                    {/*  label="Wards"*/}
                    {/*  placeholder="enter a ward id"*/}
                    {/*  {...form.getInputProps('ward_priv')}*/}
                    {/*/>*/}
                    <MultiSelect
                      data={wardType}
                      label="Wards"
                      placeholder="select a ward"
                      {...form.getInputProps('ward_priv')}
                    />
                    <MultiSelect
                      data={departmentType}
                      label="Department"
                      placeholder="select a department"
                      {...form.getInputProps('department_priv')}
                    />
                    {/*<TextInput*/}
                    {/*  type="number"*/}
                    {/*  label="Department"*/}
                    {/*  placeholder="enter a department id"*/}
                    {/*  {...form.getInputProps('department_priv')}*/}
                    {/*/>*/}
                    <Text weight={500}>Privileges :</Text>
                    <Group>
                        <Checkbox label="Palika" {...form.getInputProps('palika_priv')} />
                        <Checkbox label="Delete" {...form.getInputProps('delete_priv')} />
                        <Checkbox label="Edit" {...form.getInputProps('edit_priv')} />
                        <Checkbox label="Print" {...form.getInputProps('print_priv')} />
                        <Checkbox label="Save" {...form.getInputProps('save_priv')} />
                        <Checkbox label="Chalani" {...form.getInputProps('chalani_priv')} />
                        <Checkbox label="Darta" {...form.getInputProps('darta_priv')} />
                        <Checkbox label="Create Template" {...form.getInputProps('create_temp')} />
                        <Checkbox label="Edit Template" {...form.getInputProps('edit_temp')} />
                        <Checkbox label="Delete Template" {...form.getInputProps('delete_temp')} />
                    </Group>
                    <Group position="apart">
                        <Button type="submit">Set Role</Button>
                    </Group>
                </Stack>
            </form>
        </Paper>
    );
};

SetRole.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default SetRole;
