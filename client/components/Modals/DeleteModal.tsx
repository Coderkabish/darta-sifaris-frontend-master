import { Modal, Group, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

export const DeleteModal = ({ opened, onClose, onDelete }) => {
    const handleDelete = () => {
        onDelete();
        onClose();
    };

    return (
        <Modal opened={opened} size="lg" padding={23} onClose={onClose} withCloseButton={false}>
           <p className="text-center mb-4"> <IconAlertCircle className="text-warning" width={80} height={80} /></p>
            <Text className="muted-text" sx={{ fontSize: 25 }} mb={15} align="center">के तपाइँ मेटाउन निश्चित हुनुहुन्छ ?</Text>
            <Text className="muted-text" sx={{ fontSize: 18 }} align="center">यदि तपाईंले यसलाई मेटाउनुभयो भने, यो सदाको लागि
                हट्नेछ।
            </Text>
            <Group position="center" mt={25}>
                <button className="btn btn-outline-warning border-2 px-4" type="button" onClick={onClose}>Cancel
                </button>
                <button className="btn btn-warning border-2 px-4" type="button" onClick={handleDelete}>Delete</button>
            </Group>
        </Modal>
    );
};
