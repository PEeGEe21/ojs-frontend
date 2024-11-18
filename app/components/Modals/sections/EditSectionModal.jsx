import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import EditSectionForm from '../../Forms/Sections/EditSectionForm';

const EditSectionModal = ({
  user,
  isOpen,
  onClose,
  dataSource,
  currentSection,
  setDataSource,
  setCurrentSection,
  start,
  users,
  loggedInUser
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {currentSection?.title}</ModalHeader>
          <ModalCloseButton />
          <EditSectionForm
            onClose={onClose}
            dataSource={dataSource}
            currentSection={currentSection}
            setDataSource={setDataSource}
            setCurrentSection={setCurrentSection}
            start={start}
            users={users}
            loggedInUser={loggedInUser}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditSectionModal;
