import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import EditUserForm from '../../../components/Forms/EditUserForm';
import { getFullName } from '../../../utils/common';

const EditUserModal = ({
  user,
  isOpen,
  onClose,
  dataSource,
  currentUser,
  setDataSource,
  setCurrentUser
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {getFullName(currentUser)}</ModalHeader>
          <ModalCloseButton />
          <EditUserForm
            onClose={onClose}
            dataSource={dataSource}
            currentUser={currentUser}
            setDataSource={setDataSource}
            setCurrentUser={setCurrentUser}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditUserModal;
