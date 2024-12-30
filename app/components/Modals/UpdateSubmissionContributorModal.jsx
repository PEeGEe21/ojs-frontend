import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import UpdateContributorForm from '../Forms/UpdateContributorForm';

const UpdateSubmissionContributorModal = ({
  isOpen,
  onClose,
  submission,
  contributor,
  fetchData,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Contributor</ModalHeader>
          <ModalCloseButton />
          <UpdateContributorForm
            onClose={onClose}
            submission={submission}
            contributor={contributor}
            fetchData={fetchData}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateSubmissionContributorModal;
