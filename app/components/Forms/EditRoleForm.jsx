import React, { useEffect, useState } from 'react';
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
import { _getUser, fetchProjectsById, hostUrl } from '../../lib/utilFunctions';
import { LoaderIcon } from '../IconComponent';
import { Check } from 'iconsax-react';

const EditRoleForm = ({
  onClose,
  dataSource,
  currentRole,
  setDataSource,
  setCurrentRole,
  start,
}) => {
  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const [inputs, setInputs] = useState({
    name: currentRole?.name ?? '',
    description: currentRole?.description ?? '',
  });
  const chakraToast = useToast();

  // const [isLoading, setIsLoading] = useState(false);
  // const [isSaving, setIsSaving] = useState(false);
  // const [error, setError] = useState(null);

  
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleValidation = () => {
    const { name, description } = inputs;
    if (name === '' && description === '') {
      toast.error('Fill in all required fields');
      setIsSaving(false);
      return false;
    } else if (name === '') {
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
        const { name, description } = inputs;

        const res = await axios.post(hostUrl + `roles/update-role/${currentRole?.id}`, {
          name,
          description,
        });

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
    setCurrentRole(null);
  }

  return (
    <>
      <ModalBody>
        <div>
          <form>
            {/* <div className="mb-4 flex flex-col gap-1">
              <label className="text-sm" htmlFor="status">
                Permission Level
              </label>
              <select
                className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                name="status"
                id="status"
                required
                value={inputs.permissionLevel}
                onChange={handleChange}
              >
                <option value="">Choose a status</option>
                {permissionLevelList.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.title}
                  </option>
                ))}
              </select>
            </div> */}

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

            <div className="mb-4 flex flex-col gap-1">
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

export default EditRoleForm;
