import React, { useEffect, useMemo, useState } from 'react';
import "react-quill-new/dist/quill.snow.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { LoaderIcon } from '../IconComponent';
import { modules } from '../../lib/constants';
import { getFullName } from '../../utils/common';
import dynamic from 'next/dynamic';
import { hostUrl } from '../../lib/utilFunctions';

const AssignIssueSubmissionForm = ({
  onClose,
  submission,
  issuesList,
  fetchData,
  isPublishingSubmission,
  onPublishSubmissionOpen = false,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const [inputs, setInputs] = useState({
    issue: submission?.issue?.id??'',
  });

  const toastOptions = {
    duration: 8000,
    position: 'top-right',
    style: {},
    className: '',
    // Custom Icon
    icon: '👏',
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: 'red',
      secondary: '#fff',
      success: 'green',
    },
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleValidation = () => {
    const { issue } = inputs;
    if (!issue) {
      toast.error('Issue is required', toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    if (handleValidation() && submission) {
      try {
        const { issue } = inputs;

        const payload = {
          issueId: parseInt(issue),
          submissionId: parseInt(submission.id),
        };

        // console.log(payload)
        // return
        const resp = await axios.post(hostUrl + `submissions/assign-issue`, 
          payload,
        );
        if (resp.data.success) {
          fetchData();
          onClose();
          if(isPublishingSubmission)
            onPublishSubmissionOpen();
        } else {
          toast.error(resp.data.message);
        }
        setIsSaving(false);
      } catch (err) {
        console.log(err, 'errorrrr')
        toast.error(err?.message);
        setIsSaving(false);
      }
    }
    setIsSaving(false);
  };

  return (
    <>
      <Toaster />
      <div>
        <ModalBody>
          <div>
            <div>
                <div className="mb-4 flex flex-col gap-1">
                  <label className="text-sm" htmlFor="status">
                    Issues:
                  </label>
                  <select
                    className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                    name="issue"
                    id="issue"
                    required
                    value={inputs.issue}
                    onChange={handleChange}
                  >
                    <option value={null}>Select Issue</option>
                    {issuesList?.map((issue, index) => (
                      <option key={index} value={issue.id}>
                        {issue.title}
                      </option>
                    ))}
                  </select>
                </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="space-x-3">
          <button
            onClick={() => {
              onClose();
            }}
            className="h-10  w-auto whitespace-nowrap py-2 px-3 bg-rose-800 text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2"
          >
            Cancel
          </button>
          <button
            className="h-10  w-auto whitespace-nowrap py-2 px-3 bg-[#008080] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2"
            onClick={handleSubmit}
            disabled={isSaving}
            aria-disabled={isSaving}
          >
            {isSaving ? (
              <>
                Saving...
                <LoaderIcon
                  extraClass="text-white"
                  className="animate-spin ml-1 "
                />
              </>
            ) : (
              'Confirm'
            )}
          </button>
        </ModalFooter>
      </div>
    </>
  );
};

export default AssignIssueSubmissionForm;
