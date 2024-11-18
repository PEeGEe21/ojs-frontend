import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import EditJournalForm from '../../Forms/EditJournalForm';

const EditJournalModal = ({
  user,
  isOpen,
  onClose,
  dataSource,
  currentJournal,
  setDataSource,
  setCurrentJournal,
  start,
  users,
  loggedInUser
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {currentJournal?.name} Journal</ModalHeader>
          <ModalCloseButton />
          <EditJournalForm
            onClose={onClose}
            dataSource={dataSource}
            currentJournal={currentJournal}
            setDataSource={setDataSource}
            setCurrentJournal={setCurrentJournal}
            start={start}
            users={users}
            loggedInUser={loggedInUser}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditJournalModal;
