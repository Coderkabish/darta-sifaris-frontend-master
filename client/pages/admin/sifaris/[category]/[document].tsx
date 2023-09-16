import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Group, Paper, Stack, Text } from '@mantine/core';
import ReactDOMServer from 'react-dom/server';
import { AxiosResponse } from 'axios';
import { NextPageWithLayout } from '../../../_app';
import Layout from '../../../../components/Layout/layout';
import { TemplateService } from '../../../../services';
import { TemplateType } from '../../../../interfaces/Template';
import { sideMenuItems } from '../../../../bootstrap/config';
import { DynamicHTMLContainer } from '../../../../components/Inputs/DynamicHtmlContainer';

const SifarisDocument: NextPageWithLayout = () => {
    const router = useRouter();
    const { document } = router.query;
    const [templates, setTemplates] = useState<TemplateType>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [sideMenus, setSideMenus] = useState(sideMenuItems);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [formFields, setFormFields] = useState({});
    const [convertedRichText, setConvertedRichText] = useState<string>('');

    const getTemplates = async () => {
        const res : AxiosResponse<any> | void = await TemplateService.getTemplates();
        // @ts-ignore
        if (res?.data?.message === 'Success') {
            // @ts-ignore
            setTemplates(res?.data.data.find(a => a.name === document));
        }
    };
    useEffect(() => {
        if (sideMenus !== null && templates === undefined) {
            getTemplates();
        }
    }, [sideMenus, document, templates]);

    // This function is used to convert the curly bracket into inputs fields
    function convertCurlyBracketsToInputs(richText, data) {
        const regex = /{([^{}]+)}/g;
        let match;
        let updatedRichText = richText;
        const inputFields = {};
        // eslint-disable-next-line no-cond-assign
        while ((match = regex.exec(richText))) {
            const fieldName = match[1];
            const parseData = JSON.parse(data.trim());
            const fieldData = parseData[`${fieldName}`];
            if (fieldData) {
                const inputField = (
                    <input
                      key={fieldName}
                      name={fieldName}
                      id={fieldName}
                      type={fieldData.type}
                      placeholder={fieldData.value}
                      className="border border-1 rounded p-1"
                      style={{ width: '200px', height: '30px' }}
                      required={200 - 100 === 100}
                    />
                );

                const fieldInput = ReactDOMServer.renderToString(inputField);
                updatedRichText = updatedRichText.replace(match[0], fieldInput);
                inputFields[fieldName] = fieldData.value;
            }
        }

        setFormFields(inputFields);
        return updatedRichText;
    }

    useEffect(() => {
        if (templates) {
            const updatedRichText = convertCurlyBracketsToInputs(
                templates?.template,
                templates?.format
            );
            setConvertedRichText(updatedRichText);
        }
    }, [templates]);

    return (
        <form>
            <Stack>
                <Paper>
                    <Group position="apart">
                        <Text weight={700} size={20}>{templates?.name}</Text>
                    </Group>
                </Paper>
                    {/* eslint-disable-next-line max-len */}
                    <DynamicHTMLContainer html={convertedRichText} templates={templates} />
            </Stack>
        </form>
    );
};

SifarisDocument.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default SifarisDocument;
