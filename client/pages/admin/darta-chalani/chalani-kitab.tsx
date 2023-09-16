import { Box, Paper, Autocomplete } from '@mantine/core';
import { IconSearch, IconCirclePlus, IconEye, IconEdit, IconTrash } from '@tabler/icons';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../../_app';
import Layout from '../../../components/Layout/layout';
import { DeleteModal } from '../../../components/Modals/DeleteModal';
// eslint-disable-next-line max-len
const chalaniKitab: NextPageWithLayout = () => {
    const tableData = [
        {
            id: 1,
            chalaniNumber: 'D-07',
            officeName: 'Air Nepal International',
            chalaniDate: '2079-10-04',
            documentCount: 2,
            docuementDate: '2079-10-04',
            subject: 'भुक्तानी सम्बन्धमा',
        },
        {
            id: 2,
            chalaniNumber: 'D-06',
            officeName: 'नेपाल नागरिक उड्डयन प्राधिकरण',
            chalaniDate: '2079-10-04',
            documentCount: 3,
            docuementDate: '2079-10-04',
            subject: 'टिकट उपलब्ध गरिदिने सम्बन्धमा',
        },
        {
            id: 3,
            chalaniNumber: 'D-04',
            officeName: 'निन्जा इन्फोसिस प्रा. ली.',
            chalaniDate: '2079-10-02',
            documentCount: 1,
            docuementDate: '2079-10-03',
            subject: 'दररेट उपलब्ध गराउने सम्बन्धमा',
        },
        {
            id: 4,
            chalaniNumber: 'D-03',
            officeName: 'डिजिटल ईपलिका नेपाल',
            chalaniDate: '2079-10-02',
            documentCount: 3,
            docuementDate: '2079-10-09',
            subject: 'प्रस्तावना पेश गर्ने सम्बन्धमा',
        },
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = () => {
        // Perform deletion logic here
        setIsModalOpen(false); // Close the modal after deletion
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const router = useRouter();
    return (
        <section style={{ backgroundColor: '#DFEFFF' }}>
            <Box p={20} className="darta-data">
                <Paper>
                    <div className="d-md-flex justify-content-between mb-3 border-bottom pb-1">
                        <h4 className="text-primary pb-2 ms-1">चलानी पत्र</h4>
                        <div className="d-flex">
                            <Autocomplete
                              placeholder="Search"
                              icon={<IconSearch size="1rem" stroke={1.5} />}
                              data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
                            />

                            <button
                              onClick={() => router.push('/admin/darta-chalani/add-chalani')}
                              className="btn btn-primary mb-2 ms-4 er"
                              type="button"
                            >
                                <IconCirclePlus /> नयाँ थप्नुहोस्
                            </button>
                        </div>
                    </div>

                    <div className="table-div">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr className="bg-success text-white fw-600">
                                    <th scope="col">क्र.स</th>
                                    <th scope="col">चलानी नं.</th>
                                    <th scope="col">पाउने कार्यालयको नाम</th>
                                    <th scope="col">चलानी मिति</th>
                                    <th scope="col">पत्र संख्या</th>
                                    <th scope="col">पत्रको मिति</th>
                                    <th scope="col">बिषय</th>
                                    <th scope="col">कार्यहरू</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.chalaniNumber}</td>
                                        <td>{row.officeName}</td>
                                        <td>{row.chalaniDate}</td>
                                        <td>{row.documentCount}</td>
                                        <td>{row.docuementDate}</td>
                                        <td>{row.subject}</td>
                                        <td>
                                            <button
                                              onClick={() => router.push('/admin/darta-chalani/view-chalani')}
                                              className="btn btn-primary px-1 p-0 border-1 me-1 "
                                              type="button"
                                            >
                                                <IconEye width={16} />
                                            </button>
                                            <button
                                              onClick={() => router.push('/admin/darta-chalani/edit-chalani')}
                                              type="button"
                                              className="btn btn-primary px-1 p-0 border-1 me-1"
                                            >
                                                <IconEdit width={16} />
                                            </button>
                                            <button
                                              onClick={openModal}
                                              className="btn btn-warning px-1 p-0 border-1 me-1"
                                              type="button"
                                            >
                                                <IconTrash width={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </Paper>
            </Box>
            <DeleteModal
              opened={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onDelete={handleDelete}
            />
        </section>
    );
};

chalaniKitab.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default chalaniKitab;
