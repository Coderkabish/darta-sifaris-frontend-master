import {
  Button,
  FileInput,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
  Stepper,
} from '@mantine/core';
import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import { nepaliToEnglishNumber } from 'nepali-number';
import { DatePicker } from '@mantine/dates';
import { IconUser, IconUsers, IconFileImport } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import Layout from '../../../../components/Layout/layout';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';

// eslint-disable-next-line import/extensions
import { NextPageWithLayout } from '../../../_app';
import { HttpRequest } from '../../../../lib/HttpRequest';
import { API } from '../../../../utils/API';

const Users: NextPageWithLayout = () => {
  enum Gender {
    Male = 'male',
    Female = 'female',
    Others = 'others',
  }

  type PersonalInformationFormValues = {
    firstNameEng: string;
    middleNameEng: string | null;
    lastNameEng: string;
    firstNameNep: string;
    middleNameNep: string | null;
    lastNameNep: string;
    dateOfBirthNep: string;
    dateOfBirthEng: string;
    citizenshipNo: string;
    issueDate: string;
    issueDistrict: string;
    district: string;
    municipality: string;
    wardNumber: string;
    caste: string;
    religion: string;
    occupation: string;
    gender: Gender;
    qualification: string;
    mobileNumber: string;
    email: string;
    username: string;
    password: string;
  };

  type FamilyInfoFormValues = {
    grandFatherFirstNameEng: string;
    grandFatherMiddleNameEng: string | null;
    grandFatherLastNameEng: string;
    grandFatherFirstNameNep: string;
    grandFatherMiddleNameNep: string | null;
    grandFatherLastNameNep: string;
    fatherFirstNameEng: string;
    fatherMiddleNameEng: string | null;
    fatherFirstNameNep: string;
    fatherMiddleNameNep: string | null;
    fatherLastNameNep: string;
    motherFirstNameEng: string;
    motherMiddleNameEng: string | null;
    motherLastNameEng: string;
    motherFirstNameNep: string;
    motherMiddleNameNep: string | null;
    motherLastNameNep: string;
    spouseFirstNameEng: string;
    spouseMiddleNameEng: string | null;
    spouseLastNameEng: string;
    spouseFirstNameNep: string;
    spouseMiddleNameNep: string | null;
    spouseLastNameNep: string;
  };

  type DocumentFormValues = {
    citizenship: File;
  };

  const personalInformationForm = useForm<PersonalInformationFormValues>({
    initialValues: {
      firstNameEng: '',
      middleNameEng: null,
      lastNameEng: '',
      firstNameNep: '',
      middleNameNep: null,
      lastNameNep: '',
      dateOfBirthNep: '',
      dateOfBirthEng: '',
      citizenshipNo: '',
      issueDate: '',
      district: '',
      issueDistrict: '',
      municipality: '',
      wardNumber: '',
      caste: '',
      religion: '',
      occupation: '',
      gender: null,
      qualification: '',
      mobileNumber: '',
      email: '',
      username: '',
      password: '',
    },
    validate: (values) => ({
      firstNameEng:
        values?.firstNameEng === null || values.firstNameEng.length < 2
          ? 'Must have at least 2 letters'
          : null,
      lastNameEng:
        values?.lastNameEng === null || values.lastNameEng.length < 2
          ? 'Must have at least 2 letters'
          : null,
      firstNameNep:
        values?.firstNameNep === null || values.firstNameNep.length < 2
          ? 'Must have at least 2 letters'
          : null,
      lastNameNep:
        values?.lastNameNep === null || values.lastNameNep.length < 2
          ? 'Must have at least 2 letters'
          : null,
      dateOfBirthNep:
        values?.dateOfBirthNep === null || values.dateOfBirthNep.length === 0 ? 'Required' : null,
      dateOfBirthEng:
        values?.dateOfBirthEng === null || values.dateOfBirthEng.length === 0 ? 'Required' : null,
      citizenshipNo:
        values?.citizenshipNo === null || values.citizenshipNo.length === 0 ? 'Required' : null,
      issueDate: values?.issueDate === null || values.issueDate.length === 0 ? 'Required' : null,
      issueDistrict:
        values?.issueDistrict === null || values.issueDistrict.length === 0 ? 'Required' : null,
      district: values?.district === null || values.district.length === 0 ? 'Required' : null,
      municipality:
        values?.municipality === null || values.municipality.length === 0 ? 'Required' : null,
      wardNumber: values?.wardNumber === null || values.wardNumber.length === 0 ? 'Required' : null,
      caste: values?.caste === null || values.caste.length === 0 ? 'Required' : null,
      religion: values?.religion === null || values.religion.length === 0 ? 'Required' : null,
      occupation: values?.occupation === null || values.occupation.length === 0 ? 'Required' : null,
      gender: values?.gender === null || values.gender.length === 0 ? 'Required' : null,
      qualification:
        values?.qualification === null || values.qualification.length === 0 ? 'Required' : null,
      mobileNumber:
        values?.mobileNumber === null || values.mobileNumber.length === 0 ? 'Required' : null,
      email: values?.email === null || /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
      username: values?.username === null || values.username.length === 0 ? 'Required' : null,
      password: values?.password === null || values.password.length === 0 ? 'Required' : null,
    }),
  });

  const familyInfoForm = useForm<FamilyInfoFormValues>({
    initialValues: {
      grandFatherFirstNameEng: '',
      grandFatherMiddleNameEng: null,
      grandFatherLastNameEng: '',
      grandFatherFirstNameNep: '',
      grandFatherMiddleNameNep: null,
      grandFatherLastNameNep: '',
      fatherFirstNameEng: '',
      fatherMiddleNameEng: null,
      fatherFirstNameNep: '',
      fatherMiddleNameNep: null,
      fatherLastNameNep: '',
      motherFirstNameEng: '',
      motherMiddleNameEng: null,
      motherLastNameEng: '',
      motherFirstNameNep: '',
      motherMiddleNameNep: null,
      motherLastNameNep: '',
      spouseFirstNameEng: '',
      spouseMiddleNameEng: null,
      spouseLastNameEng: '',
      spouseFirstNameNep: '',
      spouseMiddleNameNep: null,
      spouseLastNameNep: '',
    },
    validate: (values) => ({
      grandFatherFirstNameEng: values.grandFatherFirstNameEng.length < 2 ? 'Too short name' : null,
      grandFatherLastNameEng: values.grandFatherLastNameEng.length < 2 ? 'Too short name' : null,
      grandFatherFirstNameNep: values.grandFatherFirstNameNep.length < 2 ? 'Too short name' : null,
      fatherFirstNameEng: values.fatherFirstNameEng.length < 2 ? 'Too short name' : null,
      fatherLastNameNep: values.fatherLastNameNep.length < 2 ? 'Too short name' : null,
      motherFirstNameEng: values.motherFirstNameEng.length < 2 ? 'Too short name' : null,
      motherLastNameEng: values.motherLastNameEng.length < 2 ? 'Too short name' : null,
      motherFirstNameNep: values.motherFirstNameNep.length < 2 ? 'Too short name' : null,
      spouseFirstNameEng: values.spouseFirstNameEng.length < 2 ? 'Too short name' : null,
      spouseLastNameEng: values.spouseLastNameEng.length < 2 ? 'Too short name' : null,
      spouseFirstNameNep: values.spouseFirstNameNep.length < 2 ? 'Too short name' : null,
      spouseLastNameNep: values.spouseFirstNameNep.length < 2 ? 'Too short name' : null,
    }),
  });

  const documentForm = useForm<DocumentFormValues>({
    initialValues: {
      citizenship: null,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const personalInformationData = personalInformationForm.values;
    const familyInfoData = familyInfoForm.values;
    const documentData = documentForm.values;

    const finalData = { ...personalInformationData, ...familyInfoData, ...documentData };
    try {
      await HttpRequest.post(API.sewagrahi.create, finalData).then(async (res) => {
        if (res.data.message === 'Sewagrahi created') {
          showNotification({
            message: 'Sewagrahi created',
            color: 'green',
          });
        } else {
          showNotification({
            message: res.data.mesages,
            color: 'red',
            autoClose: 2000,
          });
        }
      });
    } catch (er) {
      showNotification({
        message: er.message,
        color: 'red',
        autoClose: 2000,
      });
    }
  };

  const handleDateOfBirthNep = ({ bsDate }) => {
    const nea = nepaliToEnglishNumber(bsDate);
    personalInformationForm.setFieldValue('dateOfBirthNep', `${nea}`);
  };

  // Stepper
  const [active, setActive] = useState(0);
  const [highestStepVisited, setHighestStepVisited] = useState(active);

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    if (nextStep > active) {
      if (active === 0) {
        if (!personalInformationForm.isValid()) {
          personalInformationForm.validate();
        } else {
          setActive(nextStep);
        }
      } else if (active === 1) {
        if (!familyInfoForm.isValid()) {
          familyInfoForm.validate();
        } else {
          setActive(nextStep);
        }
      } else {
        setActive(nextStep);
      }
      // Add more validation for other steps if needed
    }
    // setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };

  // Allow the user to freely go back and forth between visited steps.
  const shouldAllowSelectStep = (step: number) => highestStepVisited >= step && active !== step;

  const theme = useMantineTheme();
  return (
    <>
      <Text px={20} mt={10} fw={600} size={23} color={theme.colors.main[8]}>
        SewaGrahi Registration
      </Text>
      <Paper mt={10} mx={15}>
        <form onSubmit={handleSubmit}>
          <Stepper
            mt={10}
            px={20}
            color="indigo"
            active={active}
            onStepClick={setActive}
            breakpoint="sm"
          >
            <Stepper.Step
              icon={<IconUser size="1.1rem" />}
              label="First step"
              description="Personal Information"
              allowStepSelect={shouldAllowSelectStep(0)}
            >
              <Group my={10} position="apart">
                <Text color={theme.colors.main[9]} weight={700} size={20}>
                  Personal Information
                </Text>
              </Group>
              <SimpleGrid cols={3}>
                <TextInput
                  placeholder="Username"
                  label="Username"
                  type="text"
                  withAsterisk
                  {...personalInformationForm.getInputProps('username')}
                />
                <TextInput
                  placeholder="Password"
                  label="Password"
                  type="password"
                  withAsterisk
                  {...personalInformationForm.getInputProps('password')}
                />
                <TextInput
                  placeholder="Email"
                  label="Email"
                  type="email"
                  withAsterisk
                  {...personalInformationForm.getInputProps('email')}
                />
                <TextInput
                  placeholder="First Name(नेपाली )"
                  label="First Name(नेपाली )"
                  type="text"
                  withAsterisk
                  {...personalInformationForm.getInputProps('firstNameNep')}
                />
                <TextInput
                  placeholder="Middle Name(नेपाली )"
                  label="Middle Name(नेपाली )"
                  type="text"
                  {...personalInformationForm.getInputProps('middleNameNep')}
                />
                <TextInput
                  placeholder="Last Name(नेपाली )"
                  label="Last Name(नेपाली )"
                  type="text"
                  withAsterisk
                  {...personalInformationForm.getInputProps('lastNameNep')}
                />
                <TextInput
                  placeholder="First Name"
                  label="First Name"
                  type="text"
                  withAsterisk
                  {...personalInformationForm.getInputProps('firstNameEng')}
                />
                <TextInput
                  placeholder="Middle Name"
                  label="Middle Name"
                  type="text"
                  {...personalInformationForm.getInputProps('middleNameEng')}
                />
                <TextInput
                  placeholder="Last Name"
                  label="Last Name"
                  type="text"
                  withAsterisk
                  {...personalInformationForm.getInputProps('lastNameEng')}
                />
                <DatePicker
                  placeholder="Date of Birth"
                  label="Date of Birth"
                  type="text"
                  withAsterisk
                  {...personalInformationForm.getInputProps('dateOfBirthEng')}
                />
                <Stack spacing={0}>
                  <Group spacing={0}>
                    <Text weight={500}>Date of Birth(नेपाली )</Text>
                    <Text color="red" span>
                      *
                    </Text>
                  </Group>
                  <Calendar
                    onChange={handleDateOfBirthNep}
                    theme="blue"
                    placeholder="Date of Birth(नेपाली )"
                    style={{
                      padding: 5,
                      width: '100%',
                      borderRadius: 10,
                      border: '1px solid grey',
                    }}
                  />
                </Stack>
                <TextInput
                  placeholder="Citizenship Number"
                  label="Citizenship No."
                  type="text"
                  withAsterisk
                  {...personalInformationForm.getInputProps('citizenshipNo')}
                />
                <TextInput
                  placeholder="Citizenship Issued Date"
                  label="Issue Date"
                  type="text"
                  withAsterisk
                  {...personalInformationForm.getInputProps('issueDate')}
                />
                <TextInput
                  placeholder="Issued District"
                  label="Issued District"
                  type="text"
                  withAsterisk
                  {...personalInformationForm.getInputProps('issueDistrict')}
                />
                <TextInput
                  placeholder="Palika"
                  label="Palika"
                  type="text"
                  withAsterisk
                  {...personalInformationForm.getInputProps('municipality')}
                />
                <TextInput
                  placeholder="Palika"
                  label="Palika"
                  type="text"
                  withAsterisk
                  {...personalInformationForm.getInputProps('wardNumber')}
                />
                <Select
                  placeholder="Gender"
                  label="Gender"
                  type="text"
                  data={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                    { label: 'other', value: 'other' },
                  ]}
                  withAsterisk
                  {...personalInformationForm.getInputProps('gender')}
                />
                <TextInput
                  placeholder="Caste"
                  label="Caste"
                  type="text"
                  {...personalInformationForm.getInputProps('caste')}
                />
                <TextInput
                  placeholder="Religion"
                  label="Religion"
                  type="text"
                  {...personalInformationForm.getInputProps('religion')}
                />
                <TextInput
                  placeholder="Qualification"
                  label="Qualification"
                  type="text"
                  {...personalInformationForm.getInputProps('qualification')}
                />
                <TextInput
                  placeholder="Occupation"
                  label="Occupation"
                  type="text"
                  {...personalInformationForm.getInputProps('occupation')}
                />
                <TextInput
                  placeholder="Mobile Number"
                  label="Mobile Number"
                  type="text"
                  {...personalInformationForm.getInputProps('mobileNumber')}
                />
                <TextInput
                  placeholder="District"
                  label="District"
                  type="text"
                  withAsterisk
                  {...personalInformationForm.getInputProps('district')}
                />
              </SimpleGrid>
            </Stepper.Step>
            <Stepper.Step
              label="Second step"
              icon={<IconUsers size="1.1rem" />}
              description="Family Information"
              allowStepSelect={shouldAllowSelectStep(1)}
            >
              <Group my={10} position="apart">
                <Text color={theme.colors.main[9]} weight={700} size={20}>
                  Family Information
                </Text>
              </Group>
              <SimpleGrid cols={3}>
                <TextInput
                  placeholder="Grand Father Name "
                  label="Grand Father First Name"
                  type="text"
                  withAsterisk
                  {...familyInfoForm.getInputProps('grandFatherFirstNameEng')}
                />
                <TextInput
                  placeholder="Grand Father Middle Name"
                  label="Grand Father Middle Name"
                  type="text"
                  {...familyInfoForm.getInputProps('grandFatherMiddleNameEng')}
                />
                <TextInput
                  placeholder="GrandFather Last Name"
                  label="Grand Father Last Name"
                  type="text"
                  withAsterisk
                  {...familyInfoForm.getInputProps('grandFatherLastNameEng')}
                />
                <TextInput
                  placeholder="Grand Father Name (नेपाली )"
                  label="Grand First Name(नेपाली )"
                  type="text"
                  withAsterisk
                  {...familyInfoForm.getInputProps('grandFatherFirstNameNep')}
                />
                <TextInput
                  placeholder="Grand Father Middle Name(नेपाली )"
                  label="Grand Middle Name(नेपाली )"
                  type="text"
                  {...familyInfoForm.getInputProps('grandFatherMiddleNameNep')}
                />
                <TextInput
                  placeholder="Father Last Name(नेपाली )"
                  label="Father  Last Name(नेपाली )"
                  type="text"
                  withAsterisk
                  {...familyInfoForm.getInputProps('grandFatherLastNameNep')}
                />

                <TextInput
                  placeholder="Father Name"
                  label="Father First Name"
                  type="text"
                  withAsterisk
                  {...familyInfoForm.getInputProps('fatherFirstNameEng')}
                />
                <TextInput
                  placeholder="Father Middle Name"
                  label="Father Middle Name"
                  type="text"
                  {...familyInfoForm.getInputProps('fatherMiddleNameEng')}
                />
                <TextInput
                  placeholder="Father Last Name"
                  label="Father Last Name"
                  type="text"
                  withAsterisk
                  {...familyInfoForm.getInputProps('fatherLastNameEng')}
                />
                <TextInput
                  placeholder="Father Name"
                  label="Father First Name (नेपाली )"
                  type="text"
                  withAsterisk
                  {...familyInfoForm.getInputProps('fatherFirstNameNep')}
                />
                <TextInput
                  placeholder="Father Middle Name(नेपाली )"
                  label="Father Middle Name(नेपाली )"
                  type="text"
                  {...familyInfoForm.getInputProps('fatherMiddleNameNep')}
                />
                <TextInput
                  placeholder="Father Last Name(नेपाली )"
                  label="Father Last Name(नेपाली )"
                  type="text"
                  withAsterisk
                  {...familyInfoForm.getInputProps('fatherLastNameNep')}
                />
                <TextInput
                  placeholder="Mother Name"
                  label="Mother First Name "
                  type="text"
                  withAsterisk
                  {...familyInfoForm.getInputProps('motherFirstNameEng')}
                />
                <TextInput
                  placeholder="Mother Middle Name"
                  label="Mother Middle Name"
                  type="text"
                  {...familyInfoForm.getInputProps('motherMiddleNameEng')}
                />
                <TextInput
                  placeholder="Mother Last Name"
                  label="Mother Last Name"
                  type="text"
                  withAsterisk
                  {...familyInfoForm.getInputProps('motherLastNameEng')}
                />
                <TextInput
                  placeholder="Mother Name (नेपाली )"
                  label="Mother First Name (नेपाली )"
                  type="text"
                  withAsterisk
                  {...familyInfoForm.getInputProps('motherFirstNameNep')}
                />
                <TextInput
                  placeholder="Mother Middle Name(नेपाली )"
                  label="Mother Middle Name(नेपाली )"
                  type="text"
                  {...familyInfoForm.getInputProps('motherMiddleNameNep')}
                />
                <TextInput
                  placeholder="Mother Last Name(नेपाली )"
                  label="Mother Last Name(नेपाली )"
                  type="text"
                  withAsterisk
                  {...familyInfoForm.getInputProps('motherLastNameNep')}
                />
                <TextInput
                  placeholder="श्रीमान/श्रीमतीको पहिलो नाम"
                  label="श्रीमान/श्रीमतीको पहिलो नाम"
                  type="text"
                  withAsterisk
                  {...familyInfoForm.getInputProps('spouseFirstNameNep')}
                />
                <TextInput
                  placeholder="श्रीमान/श्रीमतीको बिचको नाम"
                  label="श्रीमान/श्रीमतीको बिचको नाम"
                  type="text"
                  withAsterisk
                  {...familyInfoForm.getInputProps('spouseMiddleNameNep')}
                />
                <TextInput
                  placeholder="श्रीमान/श्रीमतीको अन्तिम नाम"
                  label="श्रीमान/श्रीमतीको बिचको अन्तिम नाम"
                  type="text"
                  withAsterisk
                  {...familyInfoForm.getInputProps('spouseLastNameNep')}
                />
                <TextInput
                  placeholder="Spouse First Name"
                  label="Spouse First Name"
                  type="text"
                  withAsterisk
                  {...familyInfoForm.getInputProps('spouseFirstNameEng')}
                />
                <TextInput
                  placeholder="Spouse Middle Name"
                  label="Spouse Middle Name"
                  type="text"
                  withAsterisk
                  {...familyInfoForm.getInputProps('spouseMiddleNameEng')}
                />
                <TextInput
                  placeholder="Spouse Last Name"
                  label="Spouse Last Name"
                  type="text"
                  withAsterisk
                  {...familyInfoForm.getInputProps('spouseLastNameEng')}
                />
              </SimpleGrid>
            </Stepper.Step>
            <Stepper.Step
              icon={<IconFileImport size="1.1rem" />}
              label="Final step"
              description="Upload Document"
              allowStepSelect={shouldAllowSelectStep(2)}
            >
              <Group my={10} position="apart">
                <Text color={theme.colors.main[9]} weight={700} size={20}>
                  Document Upload
                </Text>
              </Group>
              <FileInput
                placeholder="Upload your citizenship file"
                withAsterisk
                sx={{ width: '100%', marginTop: 10 }}
                {...documentForm.getInputProps('citizenship')}
              />
            </Stepper.Step>

            <Stepper.Completed>
              <h3 className="text-center m-4 text-secondary">
                बधाई छ, तपाईंको फारम सफलतापूर्वक पेश गरिएको छ।
              </h3>
            </Stepper.Completed>
          </Stepper>

          <Group position="center" mt="xl">
            {active < 2 ? (
              <>
                <Button variant="default" onClick={() => handleStepChange(active - 1)}>
                  Back
                </Button>
                <Button onClick={() => handleStepChange(active + 1)}>Next step</Button>
              </>
            ) : (
              <Button type="submit">Submit Form</Button>
            )}
          </Group>
        </form>
      </Paper>
    </>
  );
};

Users.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Users;
