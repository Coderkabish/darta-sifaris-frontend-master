/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line jsx-a11y/label-has-associated-control
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
// eslint-disable-next-line max-len
const EditDarta: NextPageWithLayout = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <h4 className="text-primary pb-2 ms-1">दर्ता पत्र</h4>
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
                  placeholder="R-44"
                  label="दर्ता नं"
                  type="text"
                  {...form.getInputProps('registrationNumber')}
                  withAsterisk
                />
                <TextInput
                  placeholder="2080-01-22"
                  label="दर्ताको मिति"
                  type="date"
                  {...form.getInputProps('registrationDate')}
                  withAsterisk
                />
                {/* <DateInput
              valueFormat="YYYY MMM DD"
              label="Date input"
              placeholder="Date input"
              maw={400}
              mx="auto"
            /> */}
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
                  placeholder="पठाउने कार्यालय वा व्यक्तिको नाम"
                  label="पठाउने कार्यालय वा व्यक्तिको नाम"
                  type="text"
                  {...form.getInputProps('senderName')}
                  withAsterisk
                />
                <TextInput
                  placeholder="पठाउने कार्यालयको ठेगाना"
                  label="पठाउने कार्यालयको ठेगाना"
                  type="text"
                  {...form.getInputProps('senderAddress')}
                  withAsterisk
                />
                <TextInput
                  placeholder="R-34"
                  label="पत्रको चलानी नं"
                  type="text"
                  {...form.getInputProps('chalaniNumber')}
                  withAsterisk
                />
                <TextInput
                  placeholder="विषय"
                  label="विषय"
                  type="text"
                  {...form.getInputProps('subject')}
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
              <legend className="fs-18 text-primary fw-600">बुझिलिनेको बिवरण</legend>
              <SimpleGrid
                cols={2}
                breakpoints={[
                  { maxWidth: 'md', cols: 2, spacing: 'md' },
                  { maxWidth: 'sm', cols: 1, spacing: 'sm' },
                ]}
              >
                <Select
                  withinPortal
                  data={['Lamjung', 'Kathmandu', 'Itahari', 'Pokhara']}
                  placeholder="पत्र बुझ्ने शाखा"
                  label="पत्र बुझ्ने शाखा"
                  {...form.getInputProps('corespondenceDepartment')}
                  withAsterisk
                />
                <Select
                  withinPortal
                  data={['सुमन पुडासैनी', 'निरजा थापा', 'अमृता क्षेत्री', 'अशोक बस्नेत']}
                  placeholder="कर्मचारी छनौट गर्नुहोस"
                  label="कर्मचारी छनौट गर्नुहोस"
                  {...form.getInputProps('corespondenceEmployee')}
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

            <Button className="fs-16 fw-500" type="submit" mt={10} w="20%"> Update</Button>
          </form>
        </Paper>
      </Box>
    </section>
  );
};

EditDarta.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default EditDarta;
