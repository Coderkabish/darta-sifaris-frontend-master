import { Button, Stack, Text, TextInput } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import React from 'react';
import { useForm } from '@mantine/form';
import { NextRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import { HttpRequest } from '../../lib/HttpRequest';

// eslint-disable-next-line no-empty-pattern
export const AddSectionModal = ({
                            context, innerProps }: ContextModalProps<{
    endpoint: string;
    id: string;
    token: string;
    router: NextRouter;
    mutate: (data)=>void;
    sectionName?: string;
    paramsName: string;
    getData: () => void;
    paramsValue: string;
}>) => {
    const { endpoint, token, paramsName, sectionName, getData, paramsValue } = innerProps;
    const form = useForm({
        initialValues: {
            name: paramsValue ?? '',
        },
    });
    const AddSection = () => {
        // Add section for ward, department
        const payload = {
            name: form.values.name,
        };
        if (paramsValue) {
            HttpRequest.put(`${endpoint}?${paramsName}=${payload.name}`, {}, token).then(res => {
                showNotification({
                    message: res.data.message,
                    autoClose: 2000,
                    color: 'green',
                });
            }).catch(error => {
                showNotification({
                    message: error,
                    autoClose: 2000,
                    color: 'red',
                });
            }).finally(() => {
                context.closeModal('addSection');
            });
        } else {
            HttpRequest.post(`${endpoint}?${paramsName}=${form.values.name}`, payload, token).then(() => {
                showNotification({
                    message: `${sectionName} added successfully !`,
                    autoClose: 2000,
                    color: 'green',
                });
                getData();
            }).catch(error => {
                showNotification({
                    message: error,
                    autoClose: 2000,
                    color: 'red',
                });
            }).finally(() => {
                context.closeModal('addSection');
            });
        }
    };
    return (
        <>
            <form>
                <Stack>
                    <Text weight={500}> {paramsValue ? 'Update' : 'Add'} {sectionName}</Text>
                    <TextInput placeholder={`${sectionName} Name`} {...form.getInputProps('name')} />
                    {/*<TextInput placeholder="Type" {...form.getInputProps('type')} />*/}
                    <Button onClick={AddSection}>{paramsValue ? 'Update' : 'Add'}</Button>
                </Stack>
            </form>
        </>
    );
};
