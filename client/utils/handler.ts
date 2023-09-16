import { showNotification } from '@mantine/notifications';

export const handleError = (err) => {
    showNotification({
        message: err?.message,
        autoClose: 2000,
        color: 'red',
    });
};

export const handleSucess = (response) => {
    if (response.message !== '') {
        showNotification({
            message: response?.message,
            autoClose: 2000,
            color: 'green',
        });
    }
};
