/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line jsx-a11y/label-has-associated-control
import { Box, Paper, Autocomplete } from '@mantine/core';
import { IconSearch, IconCirclePlus, IconEye, IconEdit, IconTrash } from '@tabler/icons';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../../_app';
import Layout from '../../../components/Layout/layout';
import { DeleteModal } from '../../../components/Modals/DeleteModal';
// eslint-disable-next-line max-len
const DartaKitab: NextPageWithLayout = () => {
  const tableData = [
    {
      id: 1,
      dartaNumber: 'R-16',
      dartaDate: '2079-10-04',
      letterCount: 3,
      officeName: 'जलविद्युत लगानी तथा विकास कम्पनी लिमिटेड',
      name: 'नबिन चौधरी',
      subject: 'चेककको माग',
    },
    {
      id: 2,
      dartaNumber: 'R-17',
      dartaDate: '2080-02-15',
      letterCount: 5,
      officeName: 'उद्योग स्ववायत्त तथा निजीकृत बैंक लिमिटेड',
      name: 'सान्तोष कुमार ढुंगाना',
      subject: 'नगदको माग',
    },
    {
      id: 3,
      dartaNumber: 'R-18',
      dartaDate: '2081-05-20',
      letterCount: 2,
      officeName: 'यातायात अधिकारी व्यावसायिक बैंक लिमिटेड',
      name: 'महेन्द्र मानन्धर',
      subject: 'नगदको माग',
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
    <Box p={20} className="darta-data">
      <Paper>
        <div className="d-md-flex justify-content-between mb-3 border-bottom pb-1">
          <h4 className="text-primary pb-2 ms-1">दर्ता पत्र</h4>
          <div className="d-flex">
            <Autocomplete
              placeholder="Search"
              icon={<IconSearch size="1rem" stroke={1.5} />}
              data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
            />

            <button onClick={() => router.push('/admin/darta-chalani/add-darta')} className="btn btn-primary mb-2 ms-4 er" type="button">
              <IconCirclePlus /> नयाँ थप्नुहोस्
            </button>
          </div>
        </div>

        <div className="table-div">
          <table className="table table-bordered table-striped">
            <thead>
              <tr className="bg-success text-white fw-600">
                <th scope="col">क्र.स</th>
                <th scope="col">दर्ता न.</th>
                <th scope="col">दर्ता मिति</th>
                <th scope="col">पत्र संख्या</th>
                <th scope="col">पठाउने कार्यालयको नाम</th>
                <th scope="col">बुझिलिनेको नाम</th>
                <th scope="col">बिषय</th>
                <th scope="col">कार्यहरू</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.dartaNumber}</td>
                  <td>{row.dartaDate}</td>
                  <td>{row.letterCount}</td>
                  <td>{row.officeName}</td>
                  <td>{row.name}</td>
                  <td>{row.subject}</td>
                  <td>
                    <button onClick={() => router.push('/admin/darta-chalani/view-darta')} className="btn btn-primary px-1 p-0 border-1 me-1 " type="button">
                      <IconEye width={16} />
                    </button>
                    <button onClick={() => router.push('/admin/darta-chalani/edit-darta')} className="btn btn-primary px-1 p-0 border-1 me-1" type="button">
                      <IconEdit width={16} />
                    </button>
                    <button onClick={openModal} className="btn btn-warning px-1 p-0 border-1 me-1" type="button">
                      <IconTrash width={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </Paper>
      <DeleteModal opened={isModalOpen} onClose={() => setIsModalOpen(false)} onDelete={handleDelete} />
    </Box>
  );
};

DartaKitab.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default DartaKitab;
