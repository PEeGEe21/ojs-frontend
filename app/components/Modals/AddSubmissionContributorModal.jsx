import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import AddContributorForm from '../Forms/AddContributorForm';

const AddSubmissionContributorModal = ({
  isOpen,
  onClose,
  submission,
  fetchData,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Contributor</ModalHeader>
          <ModalCloseButton />
          <AddContributorForm
            onClose={onClose}
            submission={submission}
            fetchData={fetchData}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSubmissionContributorModal;
