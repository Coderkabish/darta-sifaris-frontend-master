/*eslint linebreak-style: ["error", "windows"]*/
import React, { useState } from 'react';
import { IconEye } from '@tabler/icons';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';

 interface TableBlueProps {
  tableName: string;
  data: {
    id: number;
    title: string;
    description: string;
  }[];
}

const PublicGunaso: React.FC<TableBlueProps> = ({ data, tableName }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedDescription, setSelectedDescription] = useState('');

  const handleEyeIconClick = (description: string) => {
    setSelectedDescription(description);
    open();
  };

  return (
    <div className="user-info-table">
      <div className="d-flex align-items-center justify-content-between bg-white p-3 rounded-top">
        <p className="muted-text fs-19 fw-600">{tableName}</p>
        {/* <button id="blue" className="btn fs-14 rounded-1 px-2 py-1 text-secondary" type="button">
          Generate Report
        </button> */}
      </div>
      <div className="table-responsive">
        <table className="table bg-white table-borderless shadow-sm mb-0 overflow-hidden">
          <thead style={{ padding: '20px auto' }}>
            <tr className="light-bg text-muted">
              <th scope="col">क्र.स.</th>
              <th scope="col">गुनासोहरु</th>
              <th>विस्तृत दृश्य</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item?.id}>
                <td className="ps-3">{item?.id}</td>
                <td>{item?.title}</td>
                <td className="text-center">
                  <IconEye style={{ cursor: 'pointer' }} onClick={() => handleEyeIconClick(item?.description)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-md-flex align-items-center justify-content-between bg-white p-3 rounded-bottom border-top">
        <button className="btn btn-primary w-100" type="button">
          थप गुनासोहरु
        </button>
      </div>

      <Modal opened={opened} onClose={close} title="Description">
        {selectedDescription}
      </Modal>
    </div>
  );
};

export default PublicGunaso;
