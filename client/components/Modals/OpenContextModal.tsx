import { openContextModal } from '@mantine/modals';

export const openSectionModal = (innerProps: {}) => {
    openContextModal({
        modal: 'addSection',
        innerProps,
        size: 400,
        withCloseButton: true,
        centered: true,
    });
};
export const openVariableModal = (innerProps: {}) => {
    openContextModal({
        modal: 'addVariable',
        innerProps,
        size: 400,
        withCloseButton: true,
        centered: true,
    });
};

export const openCategoryModal = (innerProps: {}) => {
    openContextModal({
        modal: 'addCategory',
        innerProps,
        size: 400,
        withCloseButton: true,
        centered: true,
    });
};
export const openAddUserModal = (innerProps: {}) => {
    openContextModal({
        modal: 'addUser',
        innerProps,
        size: 800,
        withCloseButton: false,
        centered: true,
    });
};
export const openSetUserRoleModal = (innerProps: {}) => {
    openContextModal({
        modal: 'setUserRole',
        innerProps,
        size: 400,
        withCloseButton: false,
        centered: true,
    });
};
