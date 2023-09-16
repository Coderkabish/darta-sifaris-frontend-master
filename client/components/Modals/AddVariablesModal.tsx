import { Button, Checkbox, Select, Stack, Text, TextInput } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import React, { useState } from 'react';
import { useForm, UseFormReturnType } from '@mantine/form';
import { NextRouter } from 'next/router';
import { TemplateType } from '../../interfaces/Template';

// eslint-disable-next-line no-empty-pattern
export const AddVariablesModal = ({
    innerProps }: ContextModalProps<{
        endpoint: string;
        id: string;
        token: string;
        router: NextRouter;
        form: UseFormReturnType<TemplateType>;
    }>) => {
    const form = useForm({
        initialValues: {
            name: '',
            value: '',
            type: '',
            required: false,
        },
        validate: {
            name: (value) => (value.length < 1 ? 'Must be specify variable name' : ''),
            type: (type) => (type.length < 1 ? 'Must be specify type' : ''),
        },
    });
    const [variableTmp, setVariableTmp] = useState(
        []
    );

    const AddVariable = () => {
        const newVariable = form.values;
        setVariableTmp([...variableTmp, newVariable]);
        const variableArray = [...variableTmp, newVariable];
        const outputObject = variableArray.reduce((obj, item) => {
            // eslint-disable-next-line no-param-reassign
            obj[item.name] = item;
            return obj;
        }, {});

        const currentFormatValue = innerProps?.form?.getInputProps('format').value;
        const updatedFormatValue = {
            ...currentFormatValue,
            ...outputObject,
        };

        innerProps?.form?.setFieldValue('format', updatedFormatValue);
        form.reset();
    };

    const selectData = [
        { label: 'Text', value: 'text' },
        { label: 'Number', value: 'number' },
        { label: 'Email', value: 'email' },
        { label: 'Select', value: 'select' },
        { label: 'File', value: 'file' },
    ];

    return (
        <>
            <form>
                <Stack>
                    <Text weight={500}> Add Variable</Text>
                    <TextInput placeholder="Name" {...form.getInputProps('name')} />
                    <Select
                      data={selectData}
                      placeholder="choose variable type"
                      {...form.getInputProps('type')}
                    />
                    <TextInput placeholder="Value" {...form.getInputProps('value')} />
                    <Checkbox
                      label="Required"
                      {...form.getInputProps('required', { type: 'checkbox' })}
                    />
                    <Button
                      onClick={AddVariable}
                    >Add
                    </Button>
                </Stack>
            </form>
        </>
    );
};
