import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import AddRoleForm from '../../Forms/AddRoleForm';

const AddRoleModal = ({ isOpen, onClose, dataSource , start}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Role</ModalHeader>
          <ModalCloseButton />
          <AddRoleForm onClose={onClose} dataSource={dataSource} start={start}/>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddRoleModal;