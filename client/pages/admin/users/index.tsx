import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { openConfirmModal } from '@mantine/modals';
import dayjs from 'dayjs';
import { Group, Paper, Select, Text } from '@mantine/core';
import Layout from '../../../components/Layout/layout';
// eslint-disable-next-line import/extensions
import { NextPageWithLayout } from '../../_app';
import { TableData } from '../../../components/Tables/table-data';
import { ActionIconTable } from '../category';
import { HttpRequest } from '../../../lib/HttpRequest';
import { API } from '../../../utils/API';
import { handleError, handleSucess } from '../../../utils/handler';
import useCustomSession from '../../../hooks/getSession';
// eslint-disable-next-line max-len
const Users: NextPageWithLayout = () => {
    const [users, setUsers] = useState([]);
    const [selectValue, setSelectValue] = useState('');
    const session = useCustomSession();

    const getAllUsers = () => {
        HttpRequest.get(API.user.users, session).then(res => {
            setUsers(res.data.data);
        }).catch(error => {
            handleError(error);
        });
    };

    useEffect(() => {
       getAllUsers();
    }, []);
// To Delete a specific user modal
    const deleteUser = (username: string) =>
        openConfirmModal({
            title: 'Deactivate User',
            centered: true,
            children: <div>Are you sure you want to delete this user?</div>,
            labels: {
                confirm: 'Deactivate user',
                cancel: "No don't deactivate it",
            },
            confirmProps: { color: 'red' },
            onCancel: () => {},
            onConfirm: () => {
                const params = {
                    username,
                };
                HttpRequest.delete(`${API.user.users}`, session, { params }).then(res => {
                    handleSucess(res.data);
                    getAllUsers();
                }).catch(error => {
                    showNotification({
                        message: error.message,
                        color: 'red',
                        autoClose: 2000,
                    });
                });
            },
        });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const editUser = (username: string) => {
        //TODO edit user
    };

    // Rows of Users table
    const rows = users?.map((element, index) => (
        <tr key={element.username}>
            <td>{index + 1}</td>
            <td>{element.username}</td>
            <td>{element.email}</td>
            <td>{dayjs(element.expiryDateEng).format('MMM D, YYYY\t')}</td>
            <td>{element.firstNameEng} {element?.middleNameEng} {element?.lastNameEng}</td>
            <td>{element.phoneNumber}</td>
            <td>{element.isActive ? 'Active' : 'InActive'}</td>
            <td>
                <ActionIconTable
                  deleteItem={() => deleteUser(element.username)}
                  editItem={() => editUser(element.username)}
                  hideEditButton
                />
            </td>
        </tr>
    ));

    const columns = [{
        index: 'ID',
        username: 'Username',
        email: 'Email',
        name: 'Name',
        expiryDate: 'Expire Date',
        phoneNumber: 'Phone Number',
        active: 'Active',
        action: 'Action',
    }];
    const column = columns.map((col) => (
        <tr key={col.username}>
            <th>{col.index}</th>
            <th>{col.username}</th>
            <th>{col.email}</th>
            <th>{col.expiryDate}</th>
            <th>{col.name}</th>
            <th>{col.phoneNumber}</th>
            <th>{col.active}</th>
            <th>{col.action}</th>
        </tr>
    ));

    return (
        <>
            <Paper>
                <Group position="apart">
                    <Text weight={700} mr={10} size={20}>
                        सेवाग्राही सुची
                    </Text>
                    <Select
                      label="Filter User"
                      placeholder="Pick one"
                      defaultValue="all"
                      data={[
                            { value: 'all', label: 'All' },
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' },
                        ]}
                      value={selectValue}
                      onChange={(values) => {
                          HttpRequest.get(API.user.users, session).then(res => {
                              if (values === 'active') {
                                  const activeUsers = res.data.data
                                      .filter(user => user.isActive === true);
                                  setUsers(activeUsers);
                              } else if (values === 'inactive') {
                                  const inactiveUsers = res.data.data
                                      .filter(user => user.isActive === false);
                                  setUsers(inactiveUsers);
                              } else if (values === 'all') {
                                  const allUsers = res.data.data;
                                  setUsers(allUsers);
                              }
                          });
                          setSelectValue(values);
                      }
                      }
                    />
                </Group>
            </Paper>
            <TableData rows={rows} columns={column} />

        </>
    );
};

Users.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Users;
