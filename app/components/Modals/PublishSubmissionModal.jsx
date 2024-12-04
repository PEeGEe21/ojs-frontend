import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import PublishSubmissionForm from '../Forms/PublishSubmissionForm';

const PublishSubmissionModal = ({
  isOpen,
  onClose,
  submission,
  fetchData,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          UnPublish
        </ModalHeader>

        <ModalCloseButton />

        <PublishSubmissionForm
          onClose={onClose}
          submission={submission}
          fetchData={fetchData}
        />
      </ModalContent>
    </Modal>
  );
};

export default PublishSubmissionModal;
