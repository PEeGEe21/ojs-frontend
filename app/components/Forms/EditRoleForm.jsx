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
import { _getUser, fetchProjectsById } from '../../lib/utilFunctions';
import { LoaderIcon } from '../IconComponent';
import { permissionLevelList } from '../../lib/constants';
import { Check } from 'iconsax-react';

const EditRoleForm = ({
  onClose,
  dataSource,
  currentRole,
  setDataSource,
  setCurrentRole,
}) => {
  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const [inputs, setInputs] = useState({
    title: currentRole?.title,
    description: currentRole?.description,
    permissionLevel: currentRole?.permission_level?.id,
  });

  console.log(currentRole, 'currentRole')
  // const [isLoading, setIsLoading] = useState(false);
  // const [isSaving, setIsSaving] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const token = localStorage.getItem('accessProjectUserToken');
  //     const isLoggedIn = token !== null;

  //     if (!isLoggedIn) {
  //       router.push('/auth/login');
  //       return;
  //     }

  //     try {
  //       const user = await _getUser();
  //       if (!user) {
  //         throw new Error('Failed to fetch user');
  //       }
  //       setUser(user);
  //     } catch (error) {
  //       console.error(error);
  //       router.push('/auth/login');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, [router, _getUser]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleValidation = () => {
    const { title, description, permissionLevel } = inputs;
    console.log(inputs, 'jjj')
    if (title === '' && description === '' && permissionLevel === '') {
      toast.error('Fill in all required fields');
      setIsSaving(false);
      return false;
    } else if (title === '') {
      toast.error('Title is required');
      setIsSaving(false);
      return false;
    } else if (description === '') {
      toast.error('Description is required');
      setIsSaving(false);
      return false;
    } else if (!permissionLevel || permissionLevel === '') {
      toast.error('Permission Level is required');
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
        // console.log(user, inputs, 'its seeing it here');
        // return
        const { title, description, permissionLevel } = inputs;

        const res = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/roles/update-role/${currentRole?.id}`, {
          title,
          description,
          permissionLevel,
        });
        // console.log(res.data, 'res.datadwfwfwfffffwefefef');

        if (res.data.error) {
          // console.log("errroooooorrrrrrrrr")
          toast.error(res.data.message);
        } else if (res.data.success) {
          const updatedColumns = dataSource.map((column) => {
            if (column.id === currentRole.id) {
              return {
                ...column,
                title,
                description,
              };
            }
            return column;
          });

          setDataSource(updatedColumns);
          // console.log(columns, title, description, updatedColumns, 'momo')
          toast.success(res.data.message);
          onClose();
        }
        setIsSaving(false);
      } catch (err) {
        console.log(err, 'err')
        toast.error(err?.response.data?.message);
        setIsSaving(false);
      }
    }
  };

  const onCloseModal = () =>{
    onClose();
    setCurrentRole(null);
  }
  // console.log(status, 'status')
  return (
    <>
      <ModalBody>
        <div>
          <form>
            <div className="mb-4 flex flex-col gap-1">
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
            </div>

            <div className="mb-4 flex flex-col gap-1">
              <label className="text-sm" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={inputs.title}
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
