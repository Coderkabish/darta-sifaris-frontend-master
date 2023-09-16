import { Button, Checkbox, Group, Select, Stack, Text, TextInput } from '@mantine/core';
import { closeModal, ContextModalProps } from '@mantine/modals';
import React from 'react';
import { useForm } from '@mantine/form';
import { NextRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import { HttpRequest } from '../../lib/HttpRequest';
import { API } from '../../utils/API';

// eslint-disable-next-line no-empty-pattern
export const AddCategoryModal = ({
                                      innerProps }: ContextModalProps<{
    endpoint: string;
    id: string;
    token: string;
    router: NextRouter;
    getCategory : ()=>void;
}>) => {
    const form = useForm({
        initialValues: {
            name: '',
            wards: false,
            palika: false,
            department: false,
            type: '',
        },
    });
    const type = [
        { value: 'RECOMMENDATION', label: 'Recommendation' },
        { value: 'APPLICATION', label: 'Application' },
        { value: 'REGISTER', label: 'Registration' }];

    const { getCategory } = innerProps;
    const AddCategory = () => {
        // eslint-disable-next-line max-len
        HttpRequest.post(API.section.category, form.values, innerProps?.token).then(() => {
            form.reset();
            showNotification({
                message: 'Category added successfully !',
                autoClose: 2000,
                color: 'green',
            });
            closeModal('addCategory');
            getCategory();
        }).catch(error => showNotification({
            message: `${error.message}`,
            color: 'red',
        }));
    };
    return (
        <>
            <form>
                <Stack>
                    <Text weight={500}> Add Category</Text>
                    <TextInput placeholder="Name" {...form.getInputProps('name')} />
                    <Group>
                        <Checkbox label="Wards" {...form.getInputProps('wards')} />
                        <Checkbox label="Palika" {...form.getInputProps('palika')} />
                        <Checkbox label="Department" {...form.getInputProps('department')} />
                    </Group>
                    <Select
                      label="Category Type"
                      placeholder="Choose one category type"
                      data={type}
                      {...form.getInputProps('type')}
                    />
                    <Button onClick={AddCategory}>Add
                    </Button>
                </Stack>
            </form>
        </>
    );
};
