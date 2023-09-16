import { Box, Button, FileInput, Paper, SimpleGrid, TextInput, Select, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { IconUpload } from '@tabler/icons';
import { HttpRequest } from '../../../lib/HttpRequest';
import { API } from '../../../utils/API';
import { handleSucess } from '../../../utils/handler';
import { NextPageWithLayout } from '../../_app';
import Layout from '../../../components/Layout/layout';
import useCustomSession from '../../../hooks/getSession';
// eslint-disable-next-line max-len
const AddChalani: NextPageWithLayout = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fileValue, setFileValue] = useState<File[]>([]);

  const form = useForm({
    initialValues: {
      chalaniNumber: '',
      registrationDate: '',
      documentCount: '',
      documentDate: '',
      receiverName: '',
      receiverAddress: '',
      subject: '',
      remark: '',
      email: '',
      meaning: '',
      documentFile: '',
      documentType: '',
      selectable: fileValue,
    },
  });
  const session = useCustomSession();
  const handleFormSubmit = () => {
    if (form.isValid()) {
      HttpRequest.post(API.section.darta, form.values, session).then((res) => {
        handleSucess(res.data);
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
    <section style={{ backgroundColor: '#DFEFFF' }}>
      <Box p={20} className="darta-form">
        <h4 className="text-primary pb-2 ms-1">चलानी पत्र</h4>
        <Paper>
          <form onSubmit={form.onSubmit(handleFormSubmit)}>
            <fieldset className="border p-3 rounded mb-4">
              <legend className="text-primary fw-600 underline-header">विवरण</legend>
              <SimpleGrid
                cols={2}
                breakpoints={[
                  { maxWidth: 'md', cols: 2, spacing: 'md' },
                  { maxWidth: 'sm', cols: 1, spacing: 'sm' },
                ]}
              >
                <TextInput
                  placeholder="R-34"
                  label="चलानी नं"
                  type="text"
                  {...form.getInputProps('chalaniNumber')}
                  withAsterisk
                />
                <TextInput
                  placeholder="2080-01-22"
                  label="चलानी मिति"
                  type="date"
                  {...form.getInputProps('registrationDate')}
                  withAsterisk
                />

                <TextInput
                  placeholder="11"
                  label="पत्र संख्या"
                  type="text"
                  {...form.getInputProps('documentCount')}
                  withAsterisk
                />
                <TextInput
                  placeholder="2080-01-22"
                  label="पत्रको मिति"
                  type="date"
                  {...form.getInputProps('documentDate')}
                  withAsterisk
                />
                <TextInput
                  placeholder="पाउने कार्यालय वा व्यक्तिको नाम"
                  label="पाउने कार्यालय वा व्यक्तिको नाम"
                  type="text"
                  {...form.getInputProps('receiverName')}
                  withAsterisk
                />
                <TextInput
                  placeholder="पाउने कार्यालय वा व्यक्तिको ठेगाना"
                  label="पाउने कार्यालय वा व्यक्तिको ठेगाना"
                  type="text"
                  {...form.getInputProps('receiverAddress')}
                  withAsterisk
                />
                <TextInput
                  placeholder="विषय"
                  label="विषय"
                  type="text"
                  {...form.getInputProps('subject')}
                  withAsterisk
                />
                <TextInput
                  label="हुलाक/र.नं"
                  placeholder="हुलाक/र.नं"
                  required
                  rows={4}
                  {...form.getInputProps('email')}
                  withAsterisk
                />
              </SimpleGrid>
              <Textarea
                className="my-3"
                label="कैफियत"
                placeholder="कैफियत"
                required
                rows={4}
                {...form.getInputProps('remark')}
                withAsterisk
              />
            </fieldset>

            <fieldset className="border p-3 pt-4 rounded mb-4">
              <legend className="fs-18 text-primary fw-600">पत्रको बिवरण</legend>
              <SimpleGrid
                cols={2}
                breakpoints={[
                  { maxWidth: 'md', cols: 2, spacing: 'md' },
                  { maxWidth: 'sm', cols: 1, spacing: 'sm' },
                ]}
              >
                <Select
                  withinPortal
                  data={['गोप्य', 'अति गोप्य', 'जरुरि', 'अति जरुरि', 'अन्य']}
                  placeholder="पत्रको किसिम"
                  label="पत्रको किसिम"
                  {...form.getInputProps('documentType')}
                  withAsterisk
                />

                <TextInput
                  placeholder="वोधार्थ"
                  label="वोधार्थ"
                  type="text"
                  {...form.getInputProps('meaning')}
                  withAsterisk
                />
              </SimpleGrid>
            </fieldset>

            <fieldset className="border p-3 pt-4 rounded mb-4">
              <legend className="fs-18 text-primary fw-600">डकुमेन्ट राख्नुहोस्</legend>
              <FileInput
                className="my-3"
                label="डकुमेन्ट"
                placeholder="Choose File (No file choosen)"
                icon={<IconUpload size={(14)} />}
                {...form.getInputProps('documentFile')}
              />
            </fieldset>

            <Button className="fs-16 fw-500" type="submit" mt={10} w="20%"> रेकर्ड सेभ गर्नुहोस</Button>
          </form>
        </Paper>
      </Box>
    </section>
  );
};

AddChalani.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AddChalani;
