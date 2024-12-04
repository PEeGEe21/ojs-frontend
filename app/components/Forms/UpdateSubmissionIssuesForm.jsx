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
  Box,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { LoaderIcon } from '../IconComponent';
import { modules } from '../../lib/constants';
import { getFullName } from '../../utils/common';
import dynamic from 'next/dynamic';
import { hostUrl } from '../../lib/utilFunctions';

const UpdateSubmissionIssuesForm = ({
  submission,
  fetchData,
  sections
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [urlPath, setUrlPath] = useState(submission.url_path??"");
  const [pages, setPages] = useState(submission.pages??"");
  // const [datePublished, setDatePublished] = useState(new Date(submission.datePublished)??"");
  const [datePublished, setDatePublished] = useState(
    submission.datePublished ? new Date(submission.datePublished).toISOString().split('T')[0] : ""
  );
  const [section, setSection] = useState(submission?.section?.id??"");
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

    if (submission) {
      try {
        const payload = {
          pages: parseInt(pages),
          urlPath: urlPath,
          datePublished: datePublished,
        };

        if(section)
          payload.sectionId = section

        const resp = await axios.post(hostUrl + `submissions/admin/${parseInt(submission?.id)}/update-issue`, 
          payload,
        );
        if (resp.data.success) {
          fetchData();
          toast.success(resp?.data?.message??"Updated Successfully!");
        } else {
          toast.error(resp?.data?.message??"An Error Occurred");
        }
        setIsSaving(false);
      } catch (err) {
        console.log(err, 'errorrrr')
        toast.error(err?.message??err?.data?.message??"An Error Occurred");
        setIsSaving(false);
      }
    }
    setIsSaving(false);
  };

  return (
    <>
      <div>
          <div className="">
              <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                  <div className="mb-6 flex flex-col gap-1 relative w-6/12">
                      <label
                          htmlFor="section"
                          className="text-sm text-[#212121] semibold"
                      >
                          Section
                      </label>
                      <select
                          className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded px-2 text-sm"
                          name="section"
                          id="section"
                          required
                          value={section}
                          onChange={(e) => setSection(e.target.value)}
                          // onChange={handleChange}
                      >
                          <option value={null}>Select Section</option>
                          {sections?.map((section, index) => (
                              <option key={index} value={section.id}>
                                  {section.title}
                              </option>
                          ))}
                      </select>
                  </div>
              </div>
              <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                  <div className="mb-6 flex flex-col gap-1 relative w-6/12">
                      <label
                          htmlFor="pages"
                          className="text-sm text-[#212121] semibold"
                      >
                          Pages
                      </label>
                      <input
                          type="number"
                          id="pages"
                          value={pages}
                          onChange={(e) => setPages(e.target.value)}
                          className="block px-2 w-full text-sm text-[#212121] focus:outline-none border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                          name="pages"
                          autoComplete="off"
                      />
                  </div>
              </div>
              <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                  <div className="mb-6 flex flex-col gap-1 relative w-6/12">
                      <label
                          htmlFor="url_path"
                          className="text-sm text-[#212121] semibold"
                      >
                          URL Path
                      </label>
                      <input
                          type="text"
                          id="url_path"
                          value={urlPath}
                          onChange={(e) => setUrlPath(e.target.value)}
                          className="block px-2 w-full text-sm text-[#212121] focus:outline-none border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                          name="url_path"
                          autoComplete="off"
                      />
                  </div>
              </div>
              <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                  <div className="mb-6 flex flex-col gap-1 relative w-6/12">
                      <label
                          htmlFor="datePulished"
                          className="text-sm text-[#212121] semibold"
                      >
                          Date Published
                      </label>
                      <input
                          type="date"
                          id="datePublished"
                          value={datePublished}
                          onChange={(e) => setDatePublished(e.target.value)}
                          className="block px-2 w-full text-sm text-[#212121] focus:outline-none border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                          name="datePublished"
                          autoComplete="off"
                      />
                  </div>
              </div>
              <Box mt={4}>
                  <div className="flex items-center justify-end w-full gap-3 flex-wrap">
                      {/* <button
                          className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] whitespace-nowrap w-full md:w-auto
                          disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-75 border-none px-5 
                          font-medium p-3 text-base text-white block"
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
                            'Save'
                          )}
                      </button> */}
                      <button
                        className={`h-10  w-auto whitespace-nowrap py-2 px-3 bg-[#008080] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 ${isSaving || submission?.issue?.published_status == 1 ? 'disabled:opacity-50 disabled:cursor-not-allowed': ''}`}
                        onClick={handleSubmit}
                        disabled={isSaving || submission?.issue?.published_status == 1}
                        aria-disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <LoaderIcon
                              extraClass="text-white h-2 w-3"
                              className="animate-spin mr-1"
                            />
                            Saving..
                          </>
                        ) : (
                        <>Save</>
                        )}
                      </button>
                  </div>
              </Box>
          </div>
      </div>
    </>
  );
};

export default UpdateSubmissionIssuesForm;
