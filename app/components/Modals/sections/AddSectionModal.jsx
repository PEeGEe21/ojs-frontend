import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import AddSectionForm from '../../Forms/Sections/AddSectionForm';

const AddSectionModal = ({ isOpen, onClose, dataSource, start, users, loggedInUser}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Section</ModalHeader>
          <ModalCloseButton />
          <AddSectionForm 
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

export default AddSectionModal;