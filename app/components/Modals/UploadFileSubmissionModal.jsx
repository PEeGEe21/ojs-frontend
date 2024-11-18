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
import UploadFileSubmissionForm from '../Forms/UploadFileSubmissionForm';

const UploadFileSubmissionModal = ({
  user,
  isOpen,
  onClose,
  currentUpload,
  uploadList,
  setCurrentUpload,
  setUploads,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Add Upload
        </ModalHeader>

        <ModalCloseButton />

        <UploadFileSubmissionForm
          onClose={onClose}
          user={user}
          currentUpload={currentUpload}
          uploadList={uploadList}
          setCurrentUpload={setCurrentUpload}
          setUploads={setUploads}
        />
      </ModalContent>
    </Modal>
  );
};

export default UploadFileSubmissionModal;