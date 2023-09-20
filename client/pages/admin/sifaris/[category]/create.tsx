import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { NextPageWithLayout } from '../../../_app';
import Layout from '../../../../components/Layout/layout';
import { useForm } from '@mantine/form';
import {
  Box,
  Button,
  Image,
  FileInput,
  Paper,
  SimpleGrid,
  TextInput,
  Select,
  Group,
  Textarea,
  FileButton,
  Text,
} from '@mantine/core';
import { IconUpload } from '@tabler/icons';
import { HttpRequest } from '../../../../lib/HttpRequest';
import { API } from '../../../../utils/API';
import { handleSucess } from '../../../../utils/handler';
import { showNotification } from '@mantine/notifications';
const PersonalDetails: NextPageWithLayout = () => {
  const [fileValue, setFileValue] = useState<File[]>([]);

  const form = useForm({
    initialValues: {
      registrationNumber: '',
      registrationDate: '',
      documentCount: '',
      documentDate: '',
      senderName: '',
      senderAddress: '',
      chalaniNumber: '',
      subject: '',
      remark: '',
      corespondenceDepartment: '',
      corespondenceEmployee: '',
      documentFile: '',
      selectable: fileValue,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [session, setSession] = useState(null);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const { category } = router.query;
  const handleFormSubmit = () => {
    if (form.isValid()) {
      HttpRequest.post(API.section.darta, form.values, session)
        .then((res) => {
          handleSucess(res.data);
        })
        .then(() => {
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
    <>
      {/* Hello World {category}. */}
      <section style={{ backgroundColor: '#DFEFFF' }}>
        <Box p={20} className="darta-form">
          <h4 className="text-primary pb-2 ms-1">दर्ता पत्र</h4>
          <Paper>
            <form onSubmit={form.onSubmit(handleFormSubmit)}>
              <fieldset className="border p-3 rounded mb-4 ">
                <legend className="text-primary fw-600 underline-header ">
                  नयाँ सिफारिस दर्ता गर्नुहोस
                </legend>
                <SimpleGrid
                  cols={3}
                  breakpoints={[
                    { maxWidth: 'md', cols: 2, spacing: 'md' },
                    { maxWidth: 'sm', cols: 1, spacing: 'sm' },
                  ]}
                >
                  <Select
                    withinPortal
                    data={['User 1', 'User 2', 'User 3']}
                    placeholder="छान्नुहोस्"
                    label="व्यक्तिगत विवरण"
                    {...form.getInputProps('corespondenceDepartment')}
                    withAsterisk
                  />
                  <TextInput
                    label="मिति"
                    type="date"
                    {...form.getInputProps('senderName')}
                    withAsterisk
                  />
                  <Select
                    withinPortal
                    data={[
                      '1',
                      '2',
                      '3',
                      '4',
                      '5',
                      '6',
                      '7',
                      '8',
                      '9',
                      '10',
                      '11',
                      '12',
                      '13',
                      '14',
                      '15',
                      '16',
                      '17',
                      '18',
                      '19',
                      '20',
                      '21',
                      '22',
                      '23',
                      '24',
                      '25',
                      '26',
                      '27',
                      '28',
                      '29',
                      '30',
                      '31',
                      '32',
                    ]}
                    placeholder="वार्ड"
                    label="वार्ड"
                    {...form.getInputProps('corespondenceDepartment')}
                    withAsterisk
                  />
                </SimpleGrid>
                <div className="bg-red-600 hover:bg-green-800">Hello</div>
              </fieldset>
              <Button className="fs-16 fw-500" type="submit" mt={10} w="20%">
                {' '}
                रेकर्ड सेभ गर्नुहोस
              </Button>
            </form>
          </Paper>
        </Box>
      </section>
    </>
  );
};

PersonalDetails.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default PersonalDetails;
