import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import EditIssueForm from '../../Forms/Issues/EditIssueForm';
// import EditRoleForm from '../../Forms/EditRoleForm';

const EditIssueModal = ({
  user,
  isOpen,
  onClose,
  dataSource,
  currentIssue,
  setDataSource,
  setCurrentIssue,
  start,
  roles
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {currentIssue?.title}</ModalHeader>
          <ModalCloseButton />
          <EditIssueForm
            onClose={onClose}
            dataSource={dataSource}
            currentIssue={currentIssue}
            setDataSource={setDataSource}
            setCurrentIssue={setCurrentIssue}
            start={start}
            roles={roles}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditIssueModal;
