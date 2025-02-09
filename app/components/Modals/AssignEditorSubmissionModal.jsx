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
import AttachEditorSubmissionForm from '../Forms/AttachEditorSubmissionForm';

const AssignEditorSubmissionModal = ({
  isOpen,
  onClose,
  submission,
  usersList,
  fetchData
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>

        <ModalCloseButton />

        <AttachEditorSubmissionForm
          onClose={onClose}
          submission={submission}
          usersList={usersList}
          fetchData={fetchData}
        />
      </ModalContent>
    </Modal>
  );
};

export default AssignEditorSubmissionModal;
