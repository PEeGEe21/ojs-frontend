import React, { useEffect, useState, useMemo } from 'react';
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Progress, useToast } from "@chakra-ui/react";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { _getUser, fetchProjectsById, getGeneratedPassword, hostUrl } from '../../../lib/utilFunctions';
import { LoaderIcon } from '../../IconComponent';
import { modules, permissionLevelList } from '../../../lib/constants';

const EditIssueForm = ({
  onClose,
  dataSource,
  currentIssue,
  setDataSource,
  setCurrentIssue,
  start,
  allRoles,
}) => {
  const [user, setUser] = useState(null);
  const [showRoles, setShowRoles] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fileName, setFileName] = useState(currentIssue?.fileName??"");
  const [description, setDescription] = useState(currentIssue?.description??'');
  const chakraToast = useToast();
  const router = useRouter();
  const [inputs, setInputs] = useState({
    volume: currentIssue?.volume??'',
    number: currentIssue?.number??'',
    year: currentIssue?.year??'',
    title: currentIssue?.title??'',
    url_path: currentIssue?.url_path??'',
  });
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
    const { volume, number, year, title } = inputs;
    if (volume === '' && number === '' && year === '' && title === '') {
      toast.error('Fill in all required fields');
      setIsSaving(false);
      return false;
    } else if (volume === '') {
      toast.error('Volume is required');
      setIsSaving(false);
      return false;
    } else if (number === '') {
      toast.error('Number is required');
      setIsSaving(false);
      return false;
    } else if (year === '') {
      toast.error('Year is required');
      setIsSaving(false);
      return false;
    } else if (title === '') {
      toast.error('Title is required');
      setIsSaving(false);
      return false;
    }
    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    // console.log(host, inputs, 'hereee');
    // return

    if (handleValidation()) {
      try {
          const { volume, number, year, title, url_path } = inputs;

          var payload = {
            volume, 
            number, 
            year, 
            title,
            description,
            url_path
          }

          if(fileName !== '')
            payload.fileName = fileName;

          if(currentIssue){

            const res = await axios.post(hostUrl + `issues/update/${currentIssue?.id}`, 
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
              start();

              onClose();
            }
          }
          setIsSaving(false);
      } catch (err) {
        chakraToast({
          title: err?.response?.data?.message??'An Error Occurred',
          description: "Error Occured",  
          status: "error",
          duration: 2000,
          position: "top-right",
        });
        setIsSaving(false);
      }
    }
  };

  const onCloseModal = () =>{
    onClose();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        console.log("file", file);
        setFileName(file.name);
    } else {
        setFileName("");
    }
  };

  // console.log(status, 'status')
  return (
    <>
      <ModalBody>
        <div>
        <form>
            <div className='flex w-full gap-2'>
              <div className="mb-4 flex flex-col gap-1 w-1/3">
                <label className="text-sm" htmlFor="volume">
                  Volume
                </label>
                <input 
                  type="text"
                  className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                  name="volume"
                  id="volume"
                  required
                  value={inputs.volume}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4 flex flex-col gap-1 w-1/3">
                <label className="text-sm" htmlFor="number">
                  Number
                </label>
                <input 
                  type="number"
                  className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                  name="number"
                  id="number"
                  required
                  value={inputs.number}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4 flex flex-col gap-1 w-1/3">
                <label className="text-sm" htmlFor="year">
                  Year
                </label>
                <input 
                  type="number"
                  className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                  name="year"
                  id="year"
                  required
                  value={inputs.year}
                  onChange={handleChange}
                  // max={4}
                  maxLength={4}
                />
              </div>

            </div>


            <div className="mb-4 flex flex-col gap-1">
              <label className="text-sm" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={inputs.title}
                onChange={handleChange}
                className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 w-full"
              />
            </div>

            <div  className="mb-4 flex flex-col gap-1 journal_quill">
              <label className="text-sm" htmlFor="note">
                Description
              </label>
              <ReactQuill
                  theme="snow"
                  required
                  modules={modules}
                  name="note"
                  value={description}
                  onChange={(value) => {
                      setDescription(value);
                  }}
                  className="border border-[#464849] h-auto min-h-40"
                  style={{minHeight: '228px'}}
              />
            </div>

            <div className="mb-4 flex flex-col gap-1">
                <label className="text-sm">
                  Cover image
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
                                      Upload a Cover Image
                                  </span>
                                  <span>
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

            <div className="mb-4 flex flex-col gap-1">
              <label className="text-sm" htmlFor="url_path">
                URL Path
              </label>
              <input
                id="url_path"
                type="url_path"
                name="url_path"
                value={inputs.url_path}
                onChange={handleChange}
                className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 w-full"
              />
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

export default EditIssueForm;
