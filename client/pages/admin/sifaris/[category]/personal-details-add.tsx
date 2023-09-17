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
                <legend className="text-primary fw-600 underline-header ">विवरण</legend>
                <SimpleGrid
                  cols={3}
                  breakpoints={[
                    { maxWidth: 'md', cols: 2, spacing: 'md' },
                    { maxWidth: 'sm', cols: 1, spacing: 'sm' },
                  ]}
                >
                  {/* <TextInput
                  placeholder="2080-01-22"
                  label="दर्ताको मिति"
                  type="date"
                  {...form.getInputProps('registrationDate')}
                  withAsterisk
                /> */}
                  {/* <DateInput
              valueFormat="YYYY MMM DD"
              label="Date input"
              placeholder="Date input"
              maw={400}
              mx="auto"
            /> */}
                  <TextInput
                    label="पहिलो नाम (नेपालीमा)"
                    type="text"
                    {...form.getInputProps('documentCount')}
                    withAsterisk
                  />
                  <TextInput
                    label="बिचको नाम (नेपालीमा)"
                    type="text"
                    {...form.getInputProps('documentCount')}
                    withAsterisk
                  />
                  <TextInput
                    label="अन्तिम नाम (नेपालीमा)"
                    type="text"
                    {...form.getInputProps('documentCount')}
                    withAsterisk
                  />
                  <TextInput
                    label="पहिलो नाम (अंग्रेजीमा)"
                    type="text"
                    {...form.getInputProps('documentCount')}
                    withAsterisk
                  />
                  <TextInput
                    label="बिचको नाम (अंग्रेजीमा)"
                    type="text"
                    {...form.getInputProps('documentDate')}
                    withAsterisk
                  />
                  <TextInput
                    label="अन्तिम नाम (अंग्रेजीमा)"
                    type="text"
                    {...form.getInputProps('senderName')}
                    withAsterisk
                  />
                  <Select
                    withinPortal
                    data={['Male', 'Female', 'Others']}
                    placeholder="लिङ्ग"
                    label="लिङ्ग"
                    {...form.getInputProps('corespondenceDepartment')}
                    withAsterisk
                  />
                  <Select
                    withinPortal
                    data={['Married', 'Single', 'Divorced', 'Others']}
                    placeholder="वैवाहिक स्थिति"
                    label="वैवाहिक स्थिति"
                    {...form.getInputProps('corespondenceDepartment')}
                    withAsterisk
                  />

                  {/* <DateInput
              valueFormat="YYYY MMM DD"
              label="Date input"
              placeholder="Date input"
              maw={400}
              mx="auto"/> */}

                  <TextInput
                    placeholder="2080-01-22"
                    label="जन्म मिति(ई.सं.)"
                    type="date"
                    {...form.getInputProps('registrationDate')}
                    withAsterisk
                  />
                  <TextInput
                    placeholder="2080-01-22"
                    label="जन्म मिति(ई.सं.)"
                    type="date"
                    {...form.getInputProps('registrationDate')}
                    withAsterisk
                  />
                  <Select
                    withinPortal
                    data={['KTM', 'BKT', 'CTWN', 'JHA']}
                    placeholder="जिल्ला"
                    label="जिल्ला"
                    {...form.getInputProps('district')}
                    withAsterisk
                  />
                  <Select
                    withinPortal
                    data={['KATHMANDU METRO', 'CHANDRAGIRI', 'MADHYAPUR', 'JAIMINI']}
                    placeholder="स्थानीय तह"
                    label="स्थानीय तह"
                    {...form.getInputProps('corespondenceDepartment')}
                    withAsterisk
                  />
                  <TextInput
                    placeholder="वार्ड नं"
                    label="वार्ड नं"
                    type="text"
                    {...form.getInputProps('wardNo')}
                    withAsterisk
                  />
                  <TextInput
                    placeholder="टोल"
                    label="टोल"
                    type="text"
                    {...form.getInputProps('tole')}
                    withAsterisk
                  />
                  <Box maw={240} mx="auto">
                    <Image
                      radius="md"
                      src="https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
                      alt="Random unsplash image"
                      caption="My dog begging for treats"
                    />
                    <>
                      <Group position="center">
                        <FileButton onChange={setFile} accept="image/png,image/jpeg">
                          {(props) => <Button {...props}>Upload image</Button>}
                        </FileButton>
                      </Group>

                      {file && (
                        <Text size="sm" align="center" mt="sm">
                          Picked file: {file.name}
                        </Text>
                      )}
                    </>
                  </Box>
                </SimpleGrid>
              </fieldset>
              <fieldset className="border p-3 pt-4 rounded mb-4">
                <legend className="fs-18 text-primary fw-600">पेशाको विवरण</legend>
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
                    placeholder="कार्यालय"
                    label="कार्यालय"
                    {...form.getInputProps('corespondenceDepartment')}
                    withAsterisk
                  />
                  <Select
                    withinPortal
                    data={['Officer', 'Chief', 'Manager', 'HOD']}
                    placeholder="श्रेणी"
                    label="श्रेणी"
                    {...form.getInputProps('corespondenceEmployee')}
                    withAsterisk
                  />
                  <Select
                    withinPortal
                    data={['Chief', 'Manager', 'HOD']}
                    placeholder="पद"
                    label="पद"
                    {...form.getInputProps('corespondenceEmployeePad')}
                    withAsterisk
                  />
                  <TextInput
                    placeholder="2080-01-22"
                    label="कार्यालयमा प्रवेश मिति(वि. सं.)"
                    type="date"
                    {...form.getInputProps('registrationDate')}
                    withAsterisk
                  />
                  <TextInput
                    placeholder="2080-01-22"
                    label="कार्यालयमा प्रवेश मिति(ई. सं.)"
                    type="date"
                    {...form.getInputProps('registrationDate')}
                    withAsterisk
                  />
                  <TextInput
                    placeholder="सङ्केत नं"
                    label="सङ्केत नं"
                    type="number"
                    {...form.getInputProps('sanketNo')}
                    withAsterisk
                  />
                </SimpleGrid>
              </fieldset>
              <fieldset className="border p-3 pt-4 rounded mb-4 ">
                <legend className="fs-18 text-primary fw-600 ">पेप्रयोगकर्ताको विवरण</legend>

                <SimpleGrid
                  cols={2}
                  breakpoints={[
                    { maxWidth: 'md', cols: 2, spacing: 'md' },
                    { maxWidth: 'sm', cols: 1, spacing: 'sm' },
                  ]}
                >
                  <TextInput
                    placeholder="example.johndoe@gmail.com"
                    label="ई-मेल"
                    type="email"
                    {...form.getInputProps('email')}
                    withAsterisk
                  />
                  <TextInput
                    placeholder="98**********"
                    label="मोबाइल नम्बर"
                    type="number"
                    {...form.getInputProps('mobileNo')}
                    withAsterisk
                  />
                  <TextInput
                    placeholder="पासवर्ड"
                    label="पासवर्ड"
                    type="password"
                    {...form.getInputProps('password')}
                    withAsterisk
                  />
                  <TextInput
                    placeholder="पासवर्ड पुन लेख्नुहोस्"
                    label="पासवर्ड पुन लेख्नुहोस्"
                    type="password"
                    {...form.getInputProps('confirm-password')}
                    withAsterisk
                  />

                  <TextInput
                    placeholder="2080-01-22"
                    label="सकिने मिति (वि. सं.)"
                    type="date"
                    {...form.getInputProps('registrationDate')}
                    withAsterisk
                  />
                  <TextInput
                    placeholder="2080-01-22"
                    label="Expiry Date (A.D.)"
                    type="date"
                    {...form.getInputProps('registrationDate')}
                    withAsterisk
                  />
                  <Select
                    withinPortal
                    data={['Admin', 'User', 'Employee']}
                    placeholder="प्रयोगकर्ताको प्रकार"
                    label="प्रयोगकर्ताको प्रकार"
                    {...form.getInputProps('corespondenceEmployeePad')}
                    withAsterisk
                  />
                </SimpleGrid>
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
