import { ActionIcon, Text, Group, useMantineTheme, Box } from '@mantine/core';
import { IconPlus, IconPencil, IconTrash } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import Layout from '../../../components/Layout/layout';
import { NextPageWithLayout } from '../../_app';
import { TableData } from '../../../components/Tables/table-data';
import { openCategoryModal, openSectionModal } from '../../../components/Modals/OpenContextModal';
import { HttpRequest } from '../../../lib/HttpRequest';
import { API } from '../../../utils/API';
import useCustomSession from '../../../hooks/getSession';

export const AddTableIcon = ({ onClick = openSectionModal }:{ onClick }) => (
        <Group position="right" m={10}>
            <ActionIcon
              size={35}
              variant="gradient"
              sx={{ alignItems: 'right' }}
              onClick={onClick}
            >
                <IconPlus size="2rem" />
            </ActionIcon>
        </Group>
    );

export const ActionIconTable = (
    { deleteItem, editItem, hideEditButton = false }:
        {
            deleteItem:()=>void;
            editItem: ()=>void;
            hideEditButton: boolean }) => {
    const theme = useMantineTheme();
    return (
    <Group>
        <ActionIcon variant="filled" color="red" size={30} onClick={deleteItem}>
            <IconTrash />
        </ActionIcon>
        {!hideEditButton && <ActionIcon variant="filled" color={theme.colors.main[4]} size={30} onClick={editItem}>
            <IconPencil />
                            </ActionIcon>}
    </Group>
);
};

// eslint-disable-next-line max-len
const Category: NextPageWithLayout = () => {
    const [category, setCategory] = useState([]);
    const session = useCustomSession();
    const getCategory = () => {
        HttpRequest.get(API.section.category, session).then((res) => {
            setCategory(res.data.data);
        });
    };

    useEffect(() => {
        getCategory();
    }, []);

    const router = useRouter();
    const innerCategoryProps = {
        endpoint: 'Test',
        token: session,
        router,
        getCategory,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deleteCategory = (categoryName: string) =>
        openConfirmModal({
            title: 'Delete Category',
            centered: true,
            children: <div>Are you sure you want to delete this category?</div>,
            labels: {
                confirm: 'Delete category',
                cancel: "No don't delete it",
            },
            confirmProps: { color: 'red' },
            onCancel: () => {},
            onConfirm: () => {
                const params = {
                    category: categoryName,
                };
                HttpRequest.delete(`${API.section.category}`, session, { params }).then(res => {
                    showNotification({
                        message: res.data.message,
                        color: 'green',
                        autoClose: 2000,
                    });
                    getCategory();
                }).catch(error => {
                    showNotification({
                        message: error.message,
                        color: 'red',
                        autoClose: 2000,
                    });
                });
            },
        });

    const rows = category?.map((element, index) => (
        <tr key={element.name}>
            <td>{index + 1}</td>
            <td>{element.name}</td>
            <td>{dayjs(element.createdAt).format('MMMM D, YYYY')}</td>
            <td>
                <ActionIconTable
                  deleteItem={() => deleteCategory(element.name)}
                  editItem={null}
                  hideEditButton
                />
            </td>
        </tr>
    ));

    const columns = [{
        index: 'S.N.',
        name: 'Category Name',
        created_at: 'Created Date',
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

    return (
        <Box sx={{ margin: 10 }}>
            <Group position="apart">
                <Text weight={700} mr={10} size={20}>Category</Text>
                <AddTableIcon onClick={() => openCategoryModal(innerCategoryProps)} />
            </Group>
            <TableData rows={rows} columns={column} />
        </Box>
    );
};

Category.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Category;
