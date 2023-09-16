import {
    Stack,
    TextInput,
    Text,
    ActionIcon,
    Paper,
    Button,
    useMantineTheme,
    SimpleGrid,
    Select,
    Box,
    Group,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import {
   IconCirclePlus,
    IconX,
} from '@tabler/icons';
import Layout from '../../../../components/Layout/layout';
import { API } from '../../../../utils/API';
import { HttpRequest } from '../../../../lib/HttpRequest';
import { TemplateType } from '../../../../interfaces/Template';
import { openVariableModal } from '../../../../components/Modals/OpenContextModal';
import { NextPageWithLayout } from '../../../_app';
import RichText from '../../../../components/Editor/RichText';

const CreateTemplate: NextPageWithLayout = () => {
    const theme = useMantineTheme();
    // const { data: session } = useSession();
    const session = null;
    const router = useRouter();
    const [categoryType, setCategoryType] = useState([{ label: '', value: '' }]);
    const form = useForm<TemplateType>({
        initialValues: {
            name: '',
            category: '',
            format: {},
            template: '',
        },
        validate: {
            name: (value) => (value?.length < 1 ? 'Template name is required' : null),
            category: (value) => (value?.length < 1 ? 'Template category is required' : null),
            format: (value) => (value === {} ? 'Template format is required' : null),
            template: (value) => (value?.length < 1 ? 'Template description is required' : null),
        },
    });
    const innerVariableProps = {
        endpoint: 'Test',
        token: session?.accessToken,
        router,
        form,
    };
    useEffect(() => {
        HttpRequest.get(API.section.category, session?.data?.token)
            .then(res => {
                const categoryArr = res.data.data.map(a => ({ label: a.name, value: a.id }));
                setCategoryType(categoryArr);
            });
    }, []);

    const handleFormSubmit = () => {
        if (typeof document !== 'undefined') {
            const formData = {
                name: form.values.name,
                template: form.values.template,
                format: form.values.format,
                category: form.values.category,
            };
            if (form.isValid) {
                HttpRequest.post(API.section.template, formData, session?.data?.token)
                    .then((res) => {
                    showNotification({
                        message: res.data.message,
                        autoClose: 2000,
                        color: 'green',
                    });
                    form.reset();
                }).catch(error => {
                    showNotification({
                        message: error.message,
                        autoClose: 2000,
                        color: 'red',
                    });
                });
            }
        }
    };

    const deleteVariable = (key) => {
        const newData = { ...form.values.format };
        delete newData[key];
        form?.setFieldValue('format', newData);
    };

    const handleBadgeClick = (key) => {
        const templateValue = form.getInputProps('template').value?.trimStart();
        const newTemplateValue = templateValue ? `${templateValue}{${key}}` : `{${key}}`;
        form.setFieldValue('template', newTemplateValue);
    };

    const badgeElements = Object.keys(form.values.format).map((key) => (
        <>
            <Group
              position="apart"
              sx={{ backgroundColor: theme.colors.main[4],
                  width: 150,
                  borderRadius: 10,
                  padding: 4,
                  fontSize: 16,
              }}
            >
                <Box
                  sx={{
                    backgroundColor: theme.colors.main[4],
                    color: 'white',
                    marginLeft: 20,
                      cursor: 'pointer',
                }}
                  onClick={() => handleBadgeClick(key)}
                >
                    {key}
                </Box>
                <IconX size={20} color="white" style={{ cursor: 'pointer' }} onClick={() => deleteVariable(key)} />
            </Group>
        </>
    ));
    return (
        <Box sx={{ padding: 20 }}>
            <Group position="apart">
                <Text weight={700} mr={10} size={20}>Create a Template</Text>
            </Group>
            <Paper sx={{ width: '100%', marginTop: 10 }}>
                <form onSubmit={form.onSubmit(handleFormSubmit)}>
                    <Stack>
                        <TextInput
                          label="Template Name"
                          withAsterisk
                          {...form.getInputProps('name')}
                        />
                        <Select
                          data={categoryType}
                          label="Template Category"
                          withAsterisk
                          placeholder="select a category"
                          {...form.getInputProps('category')}
                        />
                        <Text weight={500}>Variables</Text>
                        <ActionIcon
                          title="Variables"
                          onClick={() => openVariableModal(innerVariableProps)}
                          variant="filled"
                          p={2}
                          color={theme.colors.main[4]}
                        >
                            <IconCirclePlus size={60} />
                        </ActionIcon>
                        <SimpleGrid cols={3}>
                            {badgeElements}
                        </SimpleGrid>
                        <RichText {...form.getInputProps('template')} />
                        <Button
                          rightIcon={<IconCirclePlus />}
                          sx={{ width: 200 }}
                          type="submit"
                        >Save Templates
                        </Button>
                    </Stack>

                </form>
            </Paper>
        </Box>
    );
};

CreateTemplate.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default CreateTemplate;
