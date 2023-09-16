/*eslint linebreak-style: ["error", "windows"]*/
import React from 'react';
import { Pagination } from '@mantine/core';

interface TableBlueProps {
    tableName: string;
    data: {
        id: number;
        name: string;
        activity: string;
        ip: string;
        modelType: string;
    }[];
}

const UserActivitiesTable: React.FC<TableBlueProps> = ({ data, tableName }) => (
    <div className="user-info-table">
        <div className="d-flex align-items-center justify-content-between bg-white p-3 rounded-top">
            <p className="muted-text fs-19 fw-600">{tableName}</p>
            <button id="green" className="btn fs-14 rounded-1 px-2 py-1 text-secondary" type="button">Generate Report</button>
        </div>
        <div className="table-responsive">
            <table className="table bg-white table-borderless shadow-sm mb-0 overflow-hidden">

                <thead style={{ padding: '20px auto' }}>
                    <tr className="light-bg text-muted">
                        <th scope="col">क्र.स.</th>
                        <th scope="col">प्रयोगकर्ता नाम</th>
                        <th scope="col">गतिविधिको प्रकार</th>
                        <th scope="col">आईपी</th>
                        <th scope="col">मोडेल प्रकार</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item) => (
                        <tr key={item.id}>
                            <td className="ps-3">{item.id}</td>
                            <td>{item?.name}</td>
                            <td className="text-primary">{item?.activity}</td>
                            <td>{item?.ip}</td>
                            <td>{item?.modelType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="d-md-flex align-items-center justify-content-between bg-white p-3 rounded-bottom border-top">
            <p className="muted-text fw-500 fs-16 mb-md-0 mb-3">Showing 22 of 25 results </p>
            <Pagination total={20} boundaries={1} defaultValue={10} />

        </div>
    </div>
);

export default UserActivitiesTable;
