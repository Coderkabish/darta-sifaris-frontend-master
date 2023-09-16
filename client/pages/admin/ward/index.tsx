import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import dayjs from 'dayjs';
import { Box, Group, Text } from '@mantine/core';
import Layout from '../../../components/Layout/layout';
import { NextPageWithLayout } from '../../_app';
import { TableData } from '../../../components/Tables/table-data';
import { ActionIconTable, AddTableIcon } from '../category';
import { HttpRequest } from '../../../lib/HttpRequest';
import { API } from '../../../utils/API';
import { openSectionModal } from '../../../components/Modals/OpenContextModal';

// eslint-disable-next-line max-len
const Ward: NextPageWithLayout = () => {
    const session = null;
    const router = useRouter();
    const [wards, setWards] = useState([]);
    const getWards = () => {
        HttpRequest.get(API.section.ward, session?.data?.token).then(res => {
            setWards(res.data.data.wards);
        });
    };
    const deleteWard = (wardname: string) =>
        openConfirmModal({
            title: 'Delete Ward',
            centered: true,
            children: <div>Are you sure you want to delete this ward?</div>,
            labels: {
                confirm: 'Delete ward',
                cancel: "No don't delete it",
            },
            confirmProps: { color: 'red' },
            onCancel: () => {},
            onConfirm: () => {
                const params = {
                    wardName: wardname,
                };
                HttpRequest.delete(`${API.section.ward}`, session?.data.token, { params }).then(res => {
                    showNotification({
                        message: res.data.message,
                        color: 'green',
                        autoClose: 2000,
                    });
                    getWards();
                }).catch(error => {
                    showNotification({
                        message: error.message,
                        color: 'red',
                        autoClose: 2000,
                    });
                });
            },
        });

    const editItem = async (wardName: string) => {
        const innerSectionProps = {
            endpoint: API.section.ward,
            paramsName: 'wardName',
            token: session?.data?.token,
            sectionName: 'Ward',
            router,
            getData: getWards,
            paramsValue: wardName,
        };
        await openSectionModal(innerSectionProps);
    };

    useEffect(() => {
       getWards();
    }, []);

    const rows = wards?.map((element) => (
        <tr key={element}>
            <td>{element?.id}</td>
            <td>{element?.wardName}</td>
            <td>{dayjs(element?.createdAt).format('MMM D, YYYY\t')}</td>
            <td>
                <ActionIconTable
                  deleteItem={() => deleteWard(element?.wardName)}
                  editItem={() => editItem(element)}
                  hideEditButton
                />
            </td>
        </tr>
    ));

    const columns = [{
        index: 'Ward ID',
        name: 'Ward Name',
        created_at: 'CreatedAt',
        action: 'Action',
    }];
    const column = columns.map((col) => (
        <tr key={col.name}>
            <th>{col.index}</th>
            <th>{col.name}</th>
            <th>{col.created_at}</th>
            <th>{col.action}</th>
        </tr>
    ));
     const innerSectionProps = {
        endpoint: API.section.ward,
         paramsName: 'wardName',
        token: session?.data?.token,
           sectionName: 'Ward',
        router,
         getData: getWards,
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

Ward.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Ward;
