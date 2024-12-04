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
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { LoaderIcon } from '../IconComponent';
import { hostUrl } from '../../lib/utilFunctions';

const UnPublishSubmissionForm = ({
  onClose,
  submission,
  fetchData,
}) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    if (submission && submission?.issue) {
      try {

        const resp = await axios.post(hostUrl + `submissions/${submission?.id}/unpublish`);
        if (resp.data.success) {
          fetchData();
          onClose();
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
                  
                  <div>
                    <p>Are you sure you don&apos;t want this to be published?</p> <br/>
                  </div>
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

export default UnPublishSubmissionForm;
