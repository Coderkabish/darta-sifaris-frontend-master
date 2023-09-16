import React, { useRef, useEffect, useState } from 'react';
import { Button, Paper } from '@mantine/core';
import { IconFileCheck } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { HttpRequest } from '../../lib/HttpRequest';
import useCustomSession from '../../hooks/getSession';
import { handleError } from '../../utils/handler';

export const DynamicHTMLContainer = ({ html, templates }) => {
    const containerRef = useRef(null);
    const [inputValues, setInputValues] = useState({});
    const session = useCustomSession();
    useEffect(() => {
        const handleEvent = (e) => {
            const { name, value } = e.target;
            setInputValues((prevInputValues) => ({
                ...prevInputValues,
                [name]: value,
            }));
        };
        const container = containerRef.current;
        if (container) {
            container.addEventListener('change', handleEvent);
        }
        return () => {
            if (container) {
                container.removeEventListener('change', handleEvent);
            }
        };
    }, [inputValues]);

    const handleCreateDocument = () => {
        // Check for empty or required fields
        const invalidFields = Object.entries(inputValues).filter(
            ([fieldName, fieldValue]) => {
                const isRequired = containerRef.current.querySelector(
                    `input[name="${fieldName}"]`
                ).required;
                return isRequired && fieldValue === '';
            }
        );

        if (invalidFields.length > 0) {
            // Handle invalid fields (e.g., display an error message)
            return;
        }

        const transformedObject = {};
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const key in inputValues) {
            transformedObject[key] = { value: inputValues[key] };
        }
        const documentData = {
            data: transformedObject,
            department: false,
            ward: 1,
            palika: false,
            template: templates?.id,
        };

        try {
            HttpRequest.post('/api/document', documentData, session ?? '')
                .then(response => {
                    showNotification({
                        message: response?.data?.message,
                        color: 'green',
                        autoClose: 2000,
                    });
                })
                .catch(error => {
                    handleError(error);
                });
        } catch (e) {
            handleError(e);
        }
    };

    return (
        <div>
            <Paper>
                <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />
            </Paper>
            <Button
              leftIcon={<IconFileCheck />}
              sx={{ width: 200, marginTop: 10 }}
              onClick={handleCreateDocument}
            >
                Create Document
            </Button>
        </div>
    );
};
