/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable react/jsx-indent-props */
// eslint-disable-next-line import/extensions
import Head from 'next/head';
import { Box, Group, Select, useMantineTheme } from '@mantine/core';
import { IconUsers, IconBrandWindows, IconClipboardCheck, IconShare, IconCalendar } from '@tabler/icons';
import { DatePicker } from '@mantine/dates';
import { useState } from 'react';
import { NextPageWithLayout } from '../_app';
import Layout from '../../components/Layout/layout';
import CardGroup from '../../components/CardGroup/CardGroup';
import UserActivitiesTable from '../../components/Tables/UserActivitiesTable';
import ColumnChart from '../../components/Charts/ColumnChart';
import PieChart from '../../components/Charts/PieChart';

// eslint-disable-next-line max-len
const AdminDashboard: NextPageWithLayout = () => {
    const firstRow = [
        { icon: <IconUsers id="red" />, count: 189, label: 'प्रयोगकर्ताहरु' },
        { icon: <IconBrandWindows id="yellow" />, count: 181, label: 'दर्ता भएका गुनासोहरु' },
        { icon: <IconClipboardCheck id="green" />, count: 148, label: 'दर्ता भएका व्यवसायहरु' },
        { icon: <IconClipboardCheck id="orange" />, count: 98, label: 'दर्ता भएका जम्मा उजुरीहरु' },
        { icon: <IconShare id="blue" />, count: 118, label: 'शाखा/उपशाखाहरु' },
        { icon: <IconShare id="purple" />, count: 178, label: 'सिफारिस संख्या' },
    ];

    const [value, setValue] = useState<Date | null>(new Date());

    const tableData = [
        { id: 1, name: 'Super Admin', activity: 'Login', ip: '@27.34.50.40', modelType: 'मोडेल प्रकार' },
        { id: 2, name: 'Super Admin', activity: 'Login', ip: '@27.34.50.40', modelType: 'मोडेल प्रकार' },
        { id: 3, name: 'Super Admin', activity: 'Login', ip: '@27.34.50.40', modelType: 'मोडेल प्रकार' },
        { id: 4, name: 'Super Admin', activity: 'Login', ip: '@27.34.50.40', modelType: 'मोडेल प्रकार' },
        { id: 5, name: 'Super Admin', activity: 'Login', ip: '@27.34.50.40', modelType: 'मोडेल प्रकार' },
        { id: 6, name: 'Super Admin', activity: 'Login', ip: '@27.34.50.40', modelType: 'मोडेल प्रकार' },
        { id: 7, name: 'Super Admin', activity: 'Login', ip: '@27.34.50.40', modelType: 'मोडेल प्रकार' },
        { id: 8, name: 'Super Admin', activity: 'Login', ip: '@27.34.50.40', modelType: 'मोडेल प्रकार' },
    ];

    const data = [12, 100, 320, 59, 22, 123, 109, 12, 220, 189, 170, 12];
    const labels = ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कार्तिक', 'मङ्सिर', 'पौष', 'माघ', 'फागुन', 'चैत्र'];

    const pieData = [12, 19, 3];
    const pieLabels = ['बैशाख', 'जेठ', 'असार'];
    const theme = useMantineTheme();
    return (
        <>
            <Head>
                <title>Darta Chalani Sifaris</title>
                <meta name="description" content="Darta Chalani Sifaris" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box p={20} style={{ backgroundColor: '#DFEFFF' }}>
                <Group p={10} position="apart">
                    <div>
                        <h3 className="fs-24 text-secondary mb-1">ड्यासबोर्ड</h3>
                        <p className="text-info"> यहाँ सिस्टमको तथ्यांकहरू प्रदर्शित गरिएको छ।</p>
                    </div>
                    <div className="d-flex">
                        <DatePicker
                            placeholder="Pick date"
                            value={value}
                            onChange={setValue}
                            rightSection={
                                <div
                                    className="d-flex justify-content-between rounded-end "
                                    style={{
                                        color: theme.colors.main[12],
                                        backgroundColor: theme.colors.main[11],
                                        height: '100%',
                                        width: '40px',
                                        marginRight: 0,
                                    }}
                                >
                                    <IconCalendar
                                        size="1.4rem"
                                        stroke={1.9}
                                        className="mx-auto"
                                        style={{
                                            color: theme.colors.main[12],
                                            backgroundColor: theme.colors.main[11],
                                            height: '100%',
                                            width: '20px',
                                        }}
                                    />
                                </div>
                            }
                            styles={{
                                input: { height: '40px', paddingRight: '0', overflow: 'hidden', fontSize: '16px' },
                            }}
                            mx="auto"
                            w={230}
                            className="me-3 shadow-sm"
                        />
                        <Select
                            data={[
                                {
                                    value: 'option1',
                                    label: 'Gaupalika',
                                },
                                {
                                    value: 'option2',
                                    label: 'Nagarpalika',
                                },
                            ]}
                            placeholder="All branch"
                            max="350px"
                            shadow="md"
                            radius="md"
                            size="sm"
                            styles={{
                                input: {
                                    height: '40px',
                                    paddingRight: '0',
                                    overflow: 'hidden',
                                    fontSize: '16px',
                                },
                            }}
                        />
                    </div>
                </Group>
                <CardGroup cards={firstRow} />

                {/* Pie Chart and Table */}
                <div className="row mb-4">
                    <div className="col-12 col-md-8 table-div mb-md-0 mb-4">
                        {/* <div className=""> */}
                        <UserActivitiesTable tableName="प्रयोगकर्ता गतिविधिहरू" data={tableData} />
                        {/* </div> */}
                    </div>
                    <div className="col-12 col-md-4">
                        <PieChart pieTitle="प्रयोगकर्ता गतिविधिहरू" height="350px" data={pieData} labels={pieLabels} />
                    </div>
                </div>

                {/* Line Chart and Pie chart */}
                <div className="row mb-4">
                    <div className=" col-md-4 col-12 mb-md-0 mb-4">
                        <PieChart pieTitle="प्रयोगकर्ता गतिविधिहरू" height="350px" data={pieData} labels={pieLabels} />
                    </div>
                    <div className=" col-md-8 col-12 bg-white rounded-3 shadow">
                        <ColumnChart title="प्रयोगकर्ता गतिविधिहरू" height="400px" data={data} labels={labels} />
                    </div>
                </div>
            </Box>
        </>
    );
};

AdminDashboard.getLayout = function getLayout(page) {
    return <Layout> {page}</Layout>;
};

export default AdminDashboard;
