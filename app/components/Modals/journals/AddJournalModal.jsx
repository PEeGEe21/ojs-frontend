import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import AddJournalForm from '../../Forms/AddJournalForm';

const AddJournalModal = ({ isOpen, onClose, dataSource, start, users, loggedInUser}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Journal</ModalHeader>
          <ModalCloseButton />
          <AddJournalForm 
            onClose={onClose} 
            dataSource={dataSource} 
            start={start} 
            users={users}
            loggedInUser={loggedInUser}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddJournalModal;