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
import AssignIssueSubmissionForm from '../Forms/AssignIssueSubmissionForm';

const AssignIssueSubmissionModal = ({
  isOpen,
  onClose,
  submission,
  issuesList,
  fetchData,
  isPublishingSubmission,
  onPublishSubmissionOpen
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Assign Issue
        </ModalHeader>

        <ModalCloseButton />

        <AssignIssueSubmissionForm
          onClose={onClose}
          submission={submission}
          issuesList={issuesList}
          fetchData={fetchData}
          isPublishingSubmission={isPublishingSubmission}
          onPublishSubmissionOpen={onPublishSubmissionOpen}
        />
      </ModalContent>
    </Modal>
  );
};

export default AssignIssueSubmissionModal;
