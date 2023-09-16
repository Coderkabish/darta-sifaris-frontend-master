import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import dayjs from 'dayjs';
import { Box, Group, Text } from '@mantine/core';
import Layout from '../../../components/Layout/layout';
// eslint-disable-next-line import/extensions
import { NextPageWithLayout } from '../../_app';
import { TableData } from '../../../components/Tables/table-data';
import { ActionIconTable, AddTableIcon } from '../category';
import { openSectionModal } from '../../../components/Modals/OpenContextModal';
import { API } from '../../../utils/API';
import { HttpRequest } from '../../../lib/HttpRequest';
import useCustomSession from '../../../hooks/getSession';

// eslint-disable-next-line max-len
const Department: NextPageWithLayout = () => {
    const session = useCustomSession();
    const router = useRouter();
    const [department, setDepartment] = useState([]);
    const getDepartments = () => {
        HttpRequest.get(API.section.department, session).then(res => {
            setDepartment(res.data.data.departments);
        });
    };

    useEffect(() => {
       getDepartments();
    }, []);

    const editItem = async (departmentName: string) => {
        const innerSectionProps = {
            endpoint: API.section.department,
            paramsName: 'departmentName',
            token: session,
            sectionName: 'Department',
            router,
            getData: getDepartments,
            paramsValue: departmentName,
        };
        await openSectionModal(innerSectionProps);
    };

    const deleteDepartment = (departmentName: string) =>
        openConfirmModal({
            title: 'Delete Department',
            centered: true,
            children: <div>Are you sure you want to delete this department?</div>,
            labels: {
                confirm: 'Delete department',
                cancel: "No don't delete it",
            },
            confirmProps: { color: 'red' },
            onCancel: () => {},
            onConfirm: () => {
                const params = {
                    departmentName,
                };
                HttpRequest.delete(`${API.section.department}`, session, { params }).then(res => {
                    showNotification({
                        message: res.data.message,
                        color: 'green',
                        autoClose: 2000,
                    });
                    getDepartments();
                }).catch(error => {
                    showNotification({
                        message: error.message,
                        color: 'red',
                        autoClose: 2000,
                    });
                });
            },
        });
    const rows = department?.map((element) => (
        <tr key={element.name}>
            <td>{element.id}</td>
            <td>{element.departmentName}</td>
            <td>{dayjs(element?.createdAt).format('MMM D, YYYY\t')}</td>
            <td>
                <ActionIconTable
                  deleteItem={() => deleteDepartment(element?.departmentName)}
                  editItem={() => editItem(element)}
                  hideEditButton
                />
            </td>
        </tr>
    ));

    const columns = [{
        index: 'Department ID',
        name: 'Department Name',
        createdAt: 'Created At',
        action: 'Action',
    }];
    const column = columns.map((col) => (
        <tr key={col.name}>
            <th>{col.index}</th>
            <th>{col.name}</th>
            <th>{col.createdAt}</th>
            <th>{col.action}</th>
        </tr>
    ));
       const innerSectionProps = {
        endpoint: API.section.department,
           paramsName: 'departmentName',
        token: session,
           sectionName: 'Department',
        router,
           getData: getDepartments,
    };
    return (
        <Box sx={{ margin: 10 }}>
            <Group position="apart">
                <Text weight={700} mr={10} size={20}>वडा सुची </Text>
                <AddTableIcon onClick={() => openSectionModal(innerSectionProps)} />
            </Group>
            <TableData rows={rows} columns={column} />
        </Box>
    );
};

Department.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Department;
