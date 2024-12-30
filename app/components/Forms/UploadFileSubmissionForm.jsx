import React, { useEffect, useState } from 'react';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { storage } from '../../lib/firebase';
import { supabase } from '../../lib/supabase';
import { uploadFile } from '../../utils/common';
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
import { uploadTypeList } from '../../lib/constants';
import Papa from "papaparse";
import { convertToKB, hostUrl } from '../../lib/utilFunctions';
import { DocumentUpload } from 'iconsax-react';

// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'

const UploadFileSubmissionForm = ({
  onClose,
  user,
  currentUpload,
  currentSubmission,
  uploadList,
  setCurrentUpload,
  setUploads,
  fetchUploads,
}) => {
  // const {item, user} = useContext(AppContext);
  // const [user, setUser] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [fileType, setFileType] = useState("");
  const [userId, setUserId] = useState();
  const router = useRouter();

  const [inputs, setInputs] = useState({
    description: '',
    creator: '',
    source: '',
    language: '',
    publisher: '',
    contributor: '',
    subject: '',
    date: '',
    upload_type: '',
  });

  const [error, setError] = useState(null);

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
    const { 
      description, 
      creator,
      source,
      language,
      publisher,
      subject,
      date,
      upload_type,
     } = inputs;

    if (fileName === '' ) {
      toast.error('Fill in all required fields', toastOptions);
      return false;
    } else if (description === '') {
      toast.error('Description is required', toastOptions);
      return false;
    } 
    else if (date  === '') {
      toast.error('Date is required', toastOptions);
      return false;
    }
    else if (subject  === '') {
      toast.error('Subject is required', toastOptions);
      return false;
    }
    else if (publisher  === '') {
      toast.error('Publisher is required', toastOptions);
      return false;
    }
    else if (creator  === '') {
      toast.error('Creator is required', toastOptions);
      return false;
    }
    else if (source === '') {
      toast.error('Source is required', toastOptions);
      return false;
    }
    else if (language === '') {
      toast.error('Language is required', toastOptions);
      return false;
    }
    else if (!upload_type) {
      toast.error('Upload Type is required', toastOptions);
      return false;
    }
    return true;
  };


  // firebase
  // const uploadFile = async (file) => {
  //   console.log(file)
  //   // const storageRef = ref(storage, `uploads/${file.name}`);
  //   const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);

  //   await uploadBytes(storageRef, file);
  //   const downloadURL = await getDownloadURL(storageRef);
  //   console.log('File uploaded successfully:', downloadURL);
  //   return downloadURL;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    if (handleValidation() && currentSubmission) {
      try {
        const {
          description, 
          creator,
          source,
          language,
          publisher,
          subject,
          date,
          upload_type,
         } = inputs;

        const payload = {
          description, 
          creator,
          source,
          language,
          publisher,
          subject,
          date,
          userId: parseInt(user?.id),
          title: fileName,
          upload_type: parseInt(upload_type),
          file_type: fileType,
          file_size: fileSize
        };

        const downloadURL = await uploadFile(file);

        // console.log(downloadURL, 'downloadURL')
        // return;
        if (downloadURL) {
          payload.file_url = downloadURL;
        
          const resp = await axios.post(hostUrl + `submissions/${currentSubmission?.id}/save-upload`,
            payload,
          );
          if (resp.data.success) {
            toast.success(resp?.data?.message);
            fetchUploads();
            onClose();
          } else {
            toast.error(resp?.data?.message);
          }
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

  const handleFileChange = (e) => {
    setShowLoader(true);
    const file = e.target.files[0];

    if (file) {
        console.log("file", file);

        setFile(file);
        setFileName(file.name);
        setFileSize(file.size); // Convert size to KB
        const extension = file.name.split('.').pop();
        setFileType(extension); // Extract and display file extension as type
    } else {
        setFileName("");
        setShowLoader(false);
    }
  };

  return (
    <>
      <Toaster />
      <div>
        <ModalBody>
          <div>
            <div>
                <div className="mb-4 flex flex-col gap-1">
                  <label className="text-sm" htmlFor="upload_type">
                    Article Component:
                  </label>
                  <select
                    className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                    name="upload_type"
                    id="upload_type"
                    required
                    onChange={handleChange}
                  >
                    <option value={null}>Select an Article Component</option>
                    {uploadTypeList.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.title}
                      </option>
                    ))}
                  </select>
                </div>

              <div className="mb-4 flex flex-col gap-1">
                <div className='flex flex-col gap-1'>
                  <label className="text-sm">
                    Upload
                  </label>

                  <label
                    htmlFor="recipients"
                    className="border-[#464849] border-dashed px-2 py-4 w-full  h-full border rounded-md flex items-center justify-center cursor-pointer"
                >
                      <div>
                          <div className="text-sm text-[#A8B8C2] text-center">
                              {file ? (
                                <>
                                  {!fileName ? 
                                    <div className="text-base text-[#FFA178] text-center flex items-center flex-col gap-2">
                                        <DocumentUpload size={22} color='#FFA178'/>
                                        <span className='text-sm'>Unnamed Document</span>
                                    </div>
                                    : 
                                    <div className="text-base text-[#FFA178]">
                                        {fileName}
                                    </div>
                                  }
                                </>
                              ) : (
                                  <>
                                      <div className="flex flex-col gap-1">
                                          <span className="text-[#FFA178] ">
                                              Upload a Document
                                          </span>
                                          <span>
                                              {" "}
                                              or Drag and drop to
                                              upload
                                          </span>
                                      </div>
                                  </>
                              )}
                          </div>
                      </div>

                      <input
                          type="file"
                          id="recipients"
                          className="block px-2 py-4 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border border-dashed bg-transparent  h-full rounded-md focus:outline-0 text-center flex items-center justify-center hidden"
                          name="recipients"
                          required
                          accept=".pdf, .docx, .doc, .txt"
                          onChange={handleFileChange}
                      />
                  </label>
                </div>
                {file ? 
                  <div className='flex items-center justify-between'>
                    <span>
                      {convertToKB(fileSize)} KB
                    </span>

                    <span>
                      {(fileType).toUpperCase()}
                    </span>
                  </div>
                : ''}

              </div>
              <div className="mb-4 flex flex-col gap-1">
                <label className="text-sm" htmlFor="fileName">
                  Title
                </label>
                <input
                  type="text"
                  className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                  name="fileName"
                  id="fileName"
                  required
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  // onChange={handleChange}
                  autoComplete="off"
                />
              </div>


              <div className="mb-4 flex flex-col gap-1">
                <label className="text-sm" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="border border-gray-400 focus:border-gray-500 focus:outline-0 bg-transparent rounded mb-3 px-2 "
                  name="description"
                  id="description"
                  required
                  rows={7}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                  <div className="mb-6 flex flex-col gap-1 relative w-6/12">
                      <label
                          htmlFor="creator"
                          className="text-sm text-[#212121] semibold"
                      >
                          Creator
                      </label>
                      <input
                          type="text"
                          id="creator"
                          value={inputs.creator}
                          onChange={handleChange}
                          className="block px-2 w-full text-sm text-[#212121] border border-gray-400 focus:border-gray-500 bg-transparent  h-10 rounded focus:outline-0"
                          name="creator"
                          autoComplete="off"
                      />
                  </div>
                  <div className="mb-6 flex flex-col gap-1 relative w-6/12">
                      <label
                          htmlFor="publisher"
                          className="text-sm text-[#212121] semibold"
                      >
                          Publisher
                      </label>
                      <input
                          type="text"
                          id="publisher"
                          value={inputs.publisher}
                          onChange={handleChange}
                          className="block px-2 w-full text-sm text-[#212121] border border-gray-400 focus:border-gray-500 bg-transparent  h-10 rounded focus:outline-0"
                          name="publisher"
                          autoComplete="off"
                      />
                  </div>
              </div>
              <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                  <div className="mb-6 flex flex-col gap-1 relative w-6/12">
                      <label
                          htmlFor="source"
                          className="text-sm text-[#212121] semibold"
                      >
                          Source
                      </label>
                      <input
                          type="text"
                          id="source"
                          value={inputs.source}
                          onChange={handleChange}
                          className="block px-2 w-full text-sm text-[#212121] border border-gray-400 focus:border-gray-500 bg-transparent  h-10 rounded focus:outline-0"
                          name="source"
                          autoComplete="off"
                      />
                  </div>
                  <div className="mb-6 flex flex-col gap-1 relative w-6/12">
                      <label
                          htmlFor="subject"
                          className="text-sm text-[#212121] semibold"
                      >
                          Subject
                      </label>
                      <input
                          type="text"
                          id="subject"
                          value={inputs.subject}
                          onChange={handleChange}
                          className="block px-2 w-full text-sm text-[#212121] border border-gray-400 focus:border-gray-500 bg-transparent  h-10 rounded focus:outline-0"
                          name="subject"
                          autoComplete="off"
                      />
                  </div>
              </div>
              <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                  <div className="mb-6 flex flex-col gap-1 relative w-6/12">
                      <label
                          htmlFor="contributor"
                          className="text-sm text-[#212121] semibold"
                      >
                          Contributor
                      </label>
                      <input
                          type="text"
                          id="contributor"
                          value={inputs.contributor}
                          onChange={handleChange}
                          className="block px-2 w-full text-sm text-[#212121] border border-gray-400 focus:border-gray-500 bg-transparent  h-10 rounded focus:outline-0"
                          name="contributor"
                          autoComplete="off"
                      />
                  </div>

                  <div className="flex w-6/12 gap-5 items-center flex-wrap lg:flex-nowrap">

                      <div className="mb-6 flex flex-col gap-1 relative w-6/12">
                          <label
                              htmlFor="date"
                              className="text-sm text-[#212121] semibold"
                          >
                              Date
                          </label>
                          <input
                              type="date"
                              id="date"
                              value={inputs.date}
                              onChange={handleChange}
                              className="block px-2 w-full text-sm text-[#212121] border border-gray-400 focus:border-gray-500 bg-transparent  h-10 rounded focus:outline-0"
                              name="date"
                              autoComplete="off"
                          />
                      </div>
                      <div className="mb-6 flex flex-col gap-1 relative w-6/12">
                          <label
                              htmlFor="language"
                              className="text-sm text-[#212121] semibold"
                          >
                              Language
                          </label>
                          <input
                              type="text"
                              id="language"
                              value={inputs.language}
                              onChange={handleChange}
                              className="block px-2 w-full text-sm text-[#212121] border border-gray-400 focus:border-gray-500 bg-transparent  h-10 rounded focus:outline-0"
                              name="language"
                              autoComplete="off"
                          />
                      </div>
                  </div>
              </div>

            </div>
          </div>
        </ModalBody>
        <ModalFooter className="space-x-3">
          <button
            onClick={() => {
              onClose();
              setCurrentUpload(null);
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

export default UploadFileSubmissionForm;
