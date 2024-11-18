import React, { useEffect, useState, useMemo, useContext } from 'react';
import "react-quill-new/dist/quill.snow.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import dynamic from "next/dynamic";
import axios from 'axios';
import { _getUser, hostUrl } from '../../../lib/utilFunctions';
import { LoaderIcon } from '../../IconComponent';
import { modules, permissionLevelList, styles } from '../../../lib/constants';
import { getFullName } from '../../../utils/common';
import { JournalContext } from '../../../utils/journalContext';

const AddSectionForm = ({ onClose, dataSource, start, users, loggedInUser }) => {
  const { selectedJournal } = useContext(JournalContext);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [inputs, setInputs] = useState({
    title: '',
    abbreviation: '',
    identification_text: '',
    word_count: '',
  });
  const [policy, setPolicy] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const chakraToast = useToast();

  const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { 
    ssr: false,
      loading: () => <div className="border border-[#464849] h-72 animate-pulse bg-gray-100" />
  }), []);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleValidation = () => {
    const { title, abbreviation } = inputs;
    if (title === '' && abbreviation === '' && policy == '') {
      toast.error('Fill in all required fields');
      setIsSaving(false);
      return false;
    } else if (title === '') {
      toast.error('Title is required');
      setIsSaving(false);
      return false;
    } else if (abbreviation === '') {
      toast.error('Editor is required');
      setIsSaving(false);
      return false;
    } else if (policy === '' || !policy) {
      toast.error('Editor is required');
      setIsSaving(false);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    if (handleValidation()) {
      try {
        if(!loggedInUser){
          toast.error('No Logged In User');
          setIsSaving(false);
          return false;
        }
        // console.log('jwnm')
          
        const { title, abbreviation, word_count, identification_text } = inputs;

        // return
        var payload = {
          title,
          abbreviation,
          policy,
          word_count: parseInt(word_count),
          identification_text,
          journalId: parseInt(selectedJournal?.id)
        };
      console.log(payload)

        const res = await axios.post(hostUrl + 'journals/sections',
          payload
        );
        if (res.data.error) {
          chakraToast({
            title: res.data.message,
            description: "Error Occured",  
            status: "error",
            duration: 2000,
            position: "top-right",
          });
        } else if (res.data.success) {
          chakraToast({
            title: res.data.message,
            description: "Successfully Updated",
            status: "success",
            duration: 2000,
            position: "top-right",
          });
          start()
          onClose();
        }
        setIsSaving(false);
      } catch (err) {
        console.log(err)
        toast.error(err?.response?.data?.message ?? err?.response?.data?.error ?? 'An Error Occured');
        setIsSaving(false);
      }
    }
    setIsSaving(false);

  };

  return (
    <>
      <ModalBody>
        <div>
          <form>

            <div className='flex w-full gap-2'>
              <div className="mb-4 flex flex-col gap-1 w-2/3">
                <label className="text-sm" htmlFor="title">
                  Title
                </label>
                <input 
                  type="text"
                  className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                  name="title"
                  id="title"
                  required
                  // value={inputs.title}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4 flex flex-col gap-1 w-1/3">
                <label className="text-sm" htmlFor="abbreviation">
                  Abbreviation
                </label>
                <input 
                  type="text"
                  className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                  name="abbreviation"
                  id="abbreviation"
                  required
                  // value={inputs.abbreviation}
                  onChange={handleChange}
                />
              </div>
            </div>


            <div  className="mb-4 flex flex-col gap-1 journal_quill">
              <label className="text-sm" htmlFor="note">
                Policy
              </label>
              <ReactQuill
                  theme="snow"
                  required
                  modules={modules}
                  name="policy"
                  value={policy}
                  onChange={(value) => {
                    setPolicy(value);
                  }}
                  className="border border-[#464849] h-auto min-h-40"
                  style={{minHeight: '228px'}}
              />
            </div>
            <div className="mb-4 flex flex-col gap-1">
              <label className="text-sm" htmlFor="word_count">
              Word Count
              </label>
              <input
                type="number"
                name="word_count"
                onChange={handleChange}
                className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 w-full"
              />
            </div>

            <div className="mb-4 flex flex-col gap-1">
              <label className="text-sm" htmlFor="identification_text">
                Identification Text
              </label>
              <input
                type="text"
                name="identification_text"
                onChange={handleChange}
                className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 w-full"
              />
            </div>


          </form>
        </div>
      </ModalBody>
      <ModalFooter className="space-x-3">
        <button
          onClick={onClose}
          className="h-10  w-auto whitespace-nowrap py-2 px-3 bg-rose-800 text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 "
        >
          Cancel
        </button>
        <button
          className="h-10  w-auto whitespace-nowrap py-2 px-3 bg-[#008080] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 "
          onClick={handleSubmit}
          disabled={isSaving}
          aria-disabled={isSaving}
        >
          {isSaving ? (
            <>
              <LoaderIcon
                extraClass="text-white"
                className="animate-spin mr-1"
              />
              Saving..
            </>
          ) : (
            'Save'
          )}
        </button>
      </ModalFooter>
    </>
  );
};

export default AddSectionForm;
