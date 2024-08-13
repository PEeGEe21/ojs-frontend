import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import EditRoleForm from '../../Forms/EditRoleForm';

const EditRoleModal = ({
  user,
  isOpen,
  onClose,
  dataSource,
  currentRole,
  setDataSource,
  setCurrentRole
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {currentRole?.title} Role</ModalHeader>
          <ModalCloseButton />
          <EditRoleForm
            onClose={onClose}
            dataSource={dataSource}
            currentRole={currentRole}
            setDataSource={setDataSource}
            setCurrentRole={setCurrentRole}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditRoleModal;
