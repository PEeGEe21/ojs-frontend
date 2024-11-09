import React, { useEffect, useState } from 'react';
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

// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'

const UploadFileSubmissionForm = ({
  onClose,
  user,
  currentUpload,
  uploadList,
  setCurrentUpload,
  setUploads,
}) => {
  // const {item, user} = useContext(AppContext);
  // const [user, setUser] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [fileName, setFileName] = useState("");
  const [userId, setUserId] = useState();
  const router = useRouter();

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    status: '',
  });

  const [error, setError] = useState(null);

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
    const { title, description, status } = inputs;
    if (title === '' && description === '') {
      toast.error('Fill in all required fields', toastOptions);
      return false;
    } else if (title === '') {
      toast.error('Title is required', toastOptions);
      return false;
    } else if (description === '') {
      toast.error('Description is required', toastOptions);
      return false;
    }else if (!status) {
      toast.error('Status is required', toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    if (handleValidation()) {
      try {
        const { title, description, status } = inputs;

        const payload = {
          title,
          description,
        };

        // if (currentstatus) {
        //   payload.status = currentstatus?.id;
        // } else {
        payload.status = status;
        // }

        const resp = await axios.post(`/tasks/new-task`, {
          payload,
        });
        if (resp.data.success) {
          const statusesFound = []
          // const statusesFound = await getStatuses(user?.id)
          setUploads(statusesFound)
          toast.success(resp.data.message);
          // if(refetch){
          //   refetch();
          // }
          // if(isSideBar){
          //   router.push('/projects/' + project_id)
          // }
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

  const handleFileChange = (e) => {
    setShowLoader(true);
    const file = e.target.files[0];

    if (file) {
        console.log("file", file);
        // Papa.parse(file, {
        //     download: true,
        //     header: true,
        //     skipEmptyLines: true,
        //     complete: function (result) {
        //         if (result.errors.length) {
        //             console.log(result.errors);
        //             toast.error("Invalid CSV file");
        //             setShowLoader(false);
        //         }
        //         let validated = result?.data?.map((item) => {
        //             // if (isAddress(item.Address) && Number(item.Amount) > 0) {
        //             //     // return [item.Address, parseEther(item.Amount).toString()];
        //             // }
        //         });
        //         if (validated?.length) {
        //             // setJsonRecipients(validated);
        //             // const totalTokens = validated.reduce(
        //             //     (total, [addr, amt]) => total + Number(formatEther(amt)),
        //             //     0
        //             // );

        //             setShowLoader(false);
        //         }
        //     },
        // });

        setFileName(file.name);
    } else {
        setFileName("");
        setShowLoader(false);
    }
};


  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  return (
    <>
      <Toaster />
      <div>
        <ModalBody>
          <div>
            <div>
                <div className="mb-4 flex flex-col gap-1">
                  <label className="text-sm" htmlFor="status">
                    Article Component:
                  </label>
                  <select
                    className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                    name="status"
                    id="status"
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
                <label className="text-sm">
                  Upload
                </label>

                <label
                  htmlFor="recipients"
                  className="border-[#464849] border-dashed px-2 py-4 w-full  h-full border rounded-md flex items-center justify-center cursor-pointer"
              >
                    <div>
                        <div className="text-sm text-[#A8B8C2] text-center">
                            {fileName ? (
                                <div className="text-base text-[#FFA178]">
                                    {fileName}
                                </div>
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
                        accept=".pdf, .docx, .doc"
                        onChange={handleFileChange}
                    />
                </label>
              </div>
              <div className="mb-4 flex flex-col gap-1">
                <label className="text-sm" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                  name="title"
                  id="title"
                  required
                  onChange={handleChange}
                  autoComplete="off"
                  // onChange={handleChange}
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
            aria-disabled={`${isSaving ? 'true' : 'false'}`}
          >
            {isSaving ? (
              <>
                Saving Task...
                <LoaderIcon
                  extraClass="text-white"
                  className="animate-spin ml-1"
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
