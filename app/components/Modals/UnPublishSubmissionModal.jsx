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
import UnPublishSubmissionForm from '../Forms/UnPublishSubmissionForm';

const UnPublishSubmissionModal = ({
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

        <UnPublishSubmissionForm
          onClose={onClose}
          submission={submission}
          fetchData={fetchData}
        />
      </ModalContent>
    </Modal>
  );
};

export default UnPublishSubmissionModal;
