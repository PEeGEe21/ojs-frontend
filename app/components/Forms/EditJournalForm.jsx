import React, { useEffect, useState, useMemo } from 'react';
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
import axios from 'axios';
import { LoaderIcon } from '../IconComponent';
import { Check } from 'iconsax-react';
import dynamic from "next/dynamic";
import { modules } from '../../lib/constants';
import { getFullName, uploadFile } from '../../utils/common';
import { hostUrl } from '../../lib/utilFunctions';


const EditJournalForm = ({
  onClose,
  dataSource,
  currentJournal,
  setDataSource,
  setCurrentJournal,
  start,
  users,
  loggedInUser
}) => {
  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const [inputs, setInputs] = useState({
    name: currentJournal?.name ?? '',
    // description: currentJournal?.description ?? '',
    editor: currentJournal?.editorId??'',
    accronym: currentJournal?.accronym??'',
    slug: currentJournal?.slug??'',
    file_url: '',
  });
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState(currentJournal?.file_name??"");
  const [fileNameExt, setFileNameExt] = useState("");
  const [note, setNote] = useState(currentJournal?.note??"");

  const chakraToast = useToast();
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { 
    ssr: false,
      loading: () => <div className="border border-[#464849] h-72 animate-pulse bg-gray-100" />
  }), []);

  // const [isLoading, setIsLoading] = useState(false);
  // const [isSaving, setIsSaving] = useState(false);
  // const [error, setError] = useState(null);

  
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleValidation = () => {
    const { name, note, editor } = inputs;
    if (name === '' && note === '') {
      toast.error('Fill in all required fields');
      setIsSaving(false);
      return false;
    } else if (name === '') {
      toast.error('Title is required');
      setIsSaving(false);
      return false;
    } else if (editor === '' || !editor) {
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

        const { name, editor, slug, accronym } = inputs;

        var payload = {
          name,
          note,
          slug,
          accronym,
          userId: parseInt(loggedInUser?.id),
          editorId: parseInt(editor),
          file_name: fileName,
        };

        if(file){
          const downloadURL = await uploadFile(file);

          if (downloadURL)
            payload.file_url = downloadURL;
        }

        const res = await axios.post(hostUrl + `journals/update-journal/${currentJournal?.id}`, payload);

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
          start();
          onClose();
        }
        setIsSaving(false);
      } catch (err) {
        console.log(err, 'err')
        toast.error(err?.response?.data?.message ?? 'An Error Occured');
        setIsSaving(false);
      }
    }
  };

  const onCloseModal = () =>{
    onClose();
    setCurrentJournal(null);
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
        setFile(file);
        const nameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
        setFileName(nameWithoutExtension);
        setFileNameExt(file.name);
    } else {
        setFileName("");
    }
  };

  return (
    <>
      <ModalBody>
        <div>
          <form>
            <div className="mb-4 flex flex-col gap-1">
              <label className="text-sm" htmlFor="editor">
                Editor
              </label>
              <select
                className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                name="editor"
                id="editor"
                required
                value={inputs.editor}
                onChange={handleChange}
              >
                <option value="">Choose an Editor</option>
                {users.map((user, index) => (
                  <option key={index} value={user.id}>
                    {getFullName(user)??user?.username} - {user?.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 flex flex-col gap-1">
              <label className="text-sm" htmlFor="name">
                Title
              </label>
              <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                placeholder="Title"
                className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 w-full"
              />
            </div>

            {/* <div className="mb-4 flex flex-col gap-1">
              <label className="text-sm" htmlFor="status">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Description"
                onChange={handleChange}
                value={inputs.description}
                rows={5}
                className="border border-gray-400 focus:border-gray-500 focus:outline-0 bg-transparent rounded mb-3 p-2 w-full"
              ></textarea>
            </div> */}


            <div  className="mb-4 flex flex-col gap-1 journal_quill">
              <label className="text-sm" htmlFor="note">
                Note
              </label>
              {/* <textarea
                name="description"
                placeholder="Description"
                onChange={handleChange}
                rows={5}
                className="border border-gray-400 focus:border-gray-500 focus:outline-0 bg-transparent rounded mb-3 p-2 w-full"
              ></textarea> */}
              <ReactQuill
                  theme="snow"
                  required
                  modules={modules}
                  name="note"
                  // style={styles}
                  value={note}
                  onChange={(value) => {
                      setNote(value);
                  }}
                  className="border border-[#464849] h-auto min-h-40"
                  style={{minHeight: '228px'}}
              />
            </div>
            <div className="mb-4 flex flex-col gap-1">
              <label className="text-sm" htmlFor="accronym">
                Accronym
              </label>
              <input
                type="text"
                name="accronym"
                value={inputs.accronym}
                onChange={handleChange}
                placeholder="Accronym"
                className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 w-full"
              />
            </div>

            <div className="mb-4 flex flex-col gap-1">
              <label className="text-sm" htmlFor="slug">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                value={inputs.slug}
                onChange={handleChange}
                placeholder="Slug"
                className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 w-full"
              />
            </div>

            <div className="mb-4 flex flex-col gap-1">
                <label className="text-sm">
                  Image
                </label>

                <label
                  htmlFor="image"
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
                        id="image"
                        className="block px-2 py-4 w-full text-sm text-white border-[#464849] focus:outline-none focus:border-[#524F4D] border border-dashed bg-transparent  h-full rounded-md focus:outline-0 text-center flex items-center justify-center hidden"
                        name="image"
                        required
                        accept=".png, .jpg"
                        onChange={handleFileChange}
                    />
                </label>
              </div>


          </form>
        </div>
      </ModalBody>
      <ModalFooter className="space-x-3">
        <button
          onClick={onCloseModal}
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
           <>Save</>
          )}
        </button>
      </ModalFooter>
    </>
  );
};

export default EditJournalForm;
