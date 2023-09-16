/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line jsx-a11y/label-has-associated-control
import { Box, Paper } from '@mantine/core';
import React, { useState } from 'react';
import { NextPageWithLayout } from '../../_app';
import Layout from '../../../components/Layout/layout';
import { DeleteModal } from '../../../components/Modals/DeleteModal';
// eslint-disable-next-line max-len
const ViewChalani: NextPageWithLayout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = () => {
        setIsModalOpen(false);
    };
    return (
        <section style={{ backgroundColor: '#DFEFFF' }}>
            <Box p={20} className="darta-data">
                <Paper>
                    <div className="d-md-flex justify-content-between mb-3 border-bottom pb-1">
                        <h4 className="text-primary pb-2 ms-1">दर्ता पत्र</h4>
                        {/* <div className="d-flex">
                            <Autocomplete
                                placeholder="Search"
                                icon={<IconSearch size="1rem" stroke={1.5} />}
                                data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
                            />

                            <button onClick={() => router.push('/admin/darta-chalani/add-chalani')} className="btn btn-primary mb-2 ms-4 er" type="button">
                                <IconCirclePlus /> नयाँ थप्नुहोस्
                            </button>
                        </div> */}
                    </div>

                    <div className="table-div">
                        <table className="table table-bordered table-striped">
                            <tbody>
                                <tr className="fw-600">
                                    <th>दर्ता न.</th>
                                    <td>D-07</td>
                                </tr>
                                <tr className="fw-600">
                                    <th>आर्थिक वर्ष.</th>
                                    <td>२०७९/०८०</td>
                                </tr>
                                <tr className="fw-600">
                                    <th>चलानी मिति</th>
                                    <td>२०७९/०८०</td>
                                </tr>
                                <tr className="fw-600">
                                    <th>पत्र संख्या.</th>
                                    <td>2</td>
                                </tr>
                                <tr className="fw-600">
                                    <th>पत्रको मिति.</th>
                                    <td>2079-10-04</td>
                                </tr>
                                <tr className="fw-600">
                                    <th>पाउने कार्यालयको नाम</th>
                                    <td>Air Nepal International</td>
                                </tr>
                                <tr className="fw-600">
                                    <th>पाउने कार्यालयको ठेगाना</th>
                                    <td>कोहलपुर</td>
                                </tr>
                                <tr className="fw-600">
                                    <th>बिषय.</th>
                                    <td>भुक्तानी सम्बन्धमा</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </Paper>
            </Box>
            <DeleteModal opened={isModalOpen} onClose={() => setIsModalOpen(false)} onDelete={handleDelete} />
        </section>
    );
};

ViewChalani.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default ViewChalani;
