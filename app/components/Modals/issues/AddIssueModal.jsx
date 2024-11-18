import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import AddIssueForm from '../../Forms/Issues/AddIssueForm';
// import AddRoleForm from '../../Forms/AddRoleForm';

const AddIssueModal = ({ user, isOpen, onClose, dataSource, setDataSource, start, roles}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Issue</ModalHeader>
          <ModalCloseButton />
          <AddIssueForm onClose={onClose} dataSource={dataSource} start={start} roles={roles}/>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddIssueModal;