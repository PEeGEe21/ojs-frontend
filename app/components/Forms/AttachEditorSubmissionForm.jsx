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

const AttachEditorSubmissionForm = ({
  onClose,
  submission,
  usersList,
  fetchData,
}) => {

  const [isSaving, setIsSaving] = useState(false);
  const [note, setNote] = useState("");
  const router = useRouter();
  const [inputs, setInputs] = useState({
    editor: '',
  });

  const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { 
    ssr: false,
      loading: () => <div className="border border-[#464849] h-72 animate-pulse bg-gray-100" />
  }), []);

  const toastOptions = {
    duration: 8000,
    position: 'bottom-right',
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
    const { editor } = inputs;
    if (!editor) {
      toast.error('Editor is required', toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    if (handleValidation() && submission) {
      try {
        const { editor } = inputs;

        const payload = {
          editorId: parseInt(editor),
          submissionId: parseInt(submission.id),
          note,
        };

        // console.log(payload)
        // return
        const resp = await axios.post(hostUrl + `submissions/assign-editor`, 
          payload,
        );
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
                  <label className="text-sm" htmlFor="status">
                    Users:
                  </label>
                  <select
                    className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                    name="editor"
                    id="editor"
                    required
                    onChange={handleChange}
                  >
                    <option value={null}>Select Editor</option>
                    {usersList?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {getFullName(user)}
                      </option>
                    ))}
                  </select>
                </div>

              <div className="mb-4 flex flex-col gap-1">
                <label className="text-sm" htmlFor="description">
                  Note
                </label>
                <ReactQuill
                  theme="snow"
                  required
                  modules={modules}
                  name="note"
                  // style={styles}
                  value={note}
                  // onChange={handleChange}
                  onChange={(value) => {
                      setNote(value);
                  }}
                  className="border border-[#464849] h-auto min-h-40"
                  style={{ minHeight: '228px' }}
                />
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

export default AttachEditorSubmissionForm;
