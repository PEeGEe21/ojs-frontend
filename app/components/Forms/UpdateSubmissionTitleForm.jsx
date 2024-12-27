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
  useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { LoaderIcon } from '../IconComponent';
import { modules, noOfWords, openai, styles } from '../../lib/constants';
import { getFullName } from '../../utils/common';
import { generateAbstract, testToken } from '../../utils/ai';
import dynamic from 'next/dynamic';
import { hostUrl } from '../../lib/utilFunctions';

const UpdateSubmissionTitleForm = ({
  submission,
  fetchData,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [prefix, setPrefix] = useState(submission.prefix??"");
  const [title, setTitle] = useState(submission.title??"");
  const [subTitle, setSubTitle] = useState(submission.subTitle??"");
  const [abstract, setAbstract] = useState(submission.abstract??"");
  const [isGenerating, setIsGenerating] = useState(false);
  const [wordNumber, setNoOfWords] = useState("");
  const router = useRouter();
  const toast = useToast();


  const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { 
    ssr: false,
      loading: () => <div className="border border-[#464849] h-72 animate-pulse bg-gray-100" />
  }), []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    if (submission) {
      try {
        const payload = {
          prefix: prefix,
          title: title,
          subTitle: subTitle,
          abstract: abstract,
        };

        const resp = await axios.post(hostUrl + `submissions/admin/${parseInt(submission?.id)}/update-title`, 
          payload,
        );
        if (resp.data.success) {
          fetchData();
          // toast.success(resp?.data?.message??"Updated Successfully!");
          toast({
            title: "Updated successfully",
            status: "success",
            duration: 2000,
            position: "top-right",
          });
        } else {
          toast({
            title: (resp?.data??resp?.data?.message??"An Error Occurred"),
            description: "Failed",
            status: "error",
            duration: 2000,
            position: "top-right",
        });
        }
        setIsSaving(false);
      } catch (err) {
        console.log(err, 'errorrrr')
        // toast.error(err?.message??err?.data?.message??"An Error Occurred");
        toast({
            title: (err?.message??err?.data?.message??"An Error Occurred"),
            description: "Failed",
            status: "error",
            duration: 2000,
            position: "top-right",
        });
        setIsSaving(false);
      }
    }
    setIsSaving(false);
  };

  const handleGenerateAbstract = async () => {
    let fullTitle  = '';
    fullTitle += `${prefix ? prefix + ' ' : ''}${title}`;
    fullTitle += `${subTitle ? ' - ' + subTitle : ''}`;

    // console.log(fullTitle, 'generated')
    // return;
    
    if (!fullTitle.trim()) {
        toast({
            title: "Please enter a title.",
            description: "Failed",
            status: "error",
            duration: 2000,
            position: "top-right",
        });
        return;
    }

    setIsGenerating(true)
    try {

      // testToken();
      const generatedAbstract = await generateAbstract(fullTitle, wordNumber)
      // const cleanedAbstract = generatedAbstract
      // .replace(/^Abstract:?\s*/i, '')
      // .trim();

      // let cleanedAbstract = generatedAbstract.replace(/^(Title|Abstract):.*$/m, '').trim();
      setAbstract(generatedAbstract);
      toast({
        title: "Abstract generated successfully",
        status: "success",
        duration: 2000,
        position: "top-right",
      });
    } catch (error) {
        toast({
            title: "Failed to generate abstract. Please try again.",
            description: "Failed",
            status: "error",
            duration: 2000,
            position: "top-right",
        });
      console.error('Error generating abstract:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSelectChange = (event) => {
    setNoOfWords(event.target.value);
  };

  return (
    <>
      <div>
          <div className="">
            <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                  <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                      <label
                          htmlFor="prefix"
                          className="text-sm text-[#212121] semibold"
                      >
                          Prefix
                      </label>

                      <input
                          type="text"
                          id="prefix"
                          value={prefix}
                          onChange={(e) => {
                              setPrefix(e.target.value);
                          }}
                          className={`block px-2 w-full text-sm text-[#212121] focus:outline-none border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0`}
                          name="prefix"
                          placeholder="e.g A, The"
                          autoComplete="off"
                      />
                      {/* <span className="helper text-xs">Example: A, The</span> */}
                  </div>

                  <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-3/4">
                      <label
                          htmlFor="title"
                          className="text-sm text-[#212121] semibold"
                      >
                          Title
                      </label>

                      <input
                          type="text"
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="block px-2 w-full text-sm text-[#212121] focus:outline-none border-[#524F4D]  border bg-transparent  h-12 rounded-md focus:outline-0"
                          placeholder="e.g Title"
                          name="title"
                          autoComplete="off"
                      />
                      {/* <span className="helper text-xs">&nbsp;</span> */}
                  </div>
              </div>
              
              <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                  <div className="mb-6 flex flex-col gap-1 relative w-full">
                      <label
                          htmlFor="sub_title"
                          className="text-sm text-[#212121] semibold"
                      >
                          Subtitle
                      </label>
                      <input
                          type="text"
                          id="sub_title"
                          value={subTitle}
                          onChange={(e) => setSubTitle(e.target.value)}
                          className="block px-2 w-full text-sm text-[#212121] focus:outline-none border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                          name="sub_title"
                          autoComplete="off"
                      />
                  </div>
              </div>

              <div>
                  <div className="mb-6 flex flex-col gap-1 relative w-full">
                      <label 
                          htmlFor="abstract"
                          className="text-sm text-[#212121] semibold ">
                          Abstract
                      </label>
                      <ReactQuill
                          theme="snow"
                          required
                          value={abstract}
                          modules={modules}
                          style={styles}
                          onChange={(value) => {
                              setAbstract(value);
                          }}
                          readOnly={isGenerating}
                          className={`border border-[#524F4D] h-auto min-h-72 ${
                            isGenerating ? 'opacity-50' : ''
                          }`}                      
                      />

                    <div className="mt-4 w-full flex items-end justify-start gap-2">
                      {/* bg-[#008080] hover:bg-[#008080] */}
                        <div className=' flex flex-col gap-1'>
                          <label 
                              htmlFor="no_of_words"
                              className="text-sm text-[#212121] semibold ">
                              No of Words
                          </label>
                            <select id='no_of_words' name='no_of_words' className='border-[#524F4D] border bg-transparent  h-10 rounded-md focus:outline-0 px-2 text-sm' value={wordNumber??''} onChange={handleSelectChange}>
                              <option value="">Select No of Words</option>
                              {noOfWords.map((word) => (
                                <option key={word.id} value={word.value}>
                                  {word.value}
                                </option>
                              ))}
                            </select>
                        </div>

                        <button
                            disabled={isGenerating}
                            onClick={handleGenerateAbstract}
                            className="btn-primary whitespace-nowrap w-full md:w-auto
                            disabled:opacity-50 disabled:cursor-not-allowed rounded 
                            transition-all duration-75 border-none px-5 
                            font-medium py-3 text-sm text-white block gap-2"
                        >
                            {isGenerating ? <><span className="animate-spin">⏳</span> Generating... </>: 'Generate Abstract'}
                        </button>

                        {abstract && (
                          <button
                            onClick={() => setAbstract('')}
                            className="btn-danger whitespace-nowrap px-5 py-3 rounded text-sm"
                            disabled={isGenerating}
                          >
                            Clear
                          </button>
                        )}
                    </div>
                  </div>
              </div>
              <Box mt={4}>
                  <div className="flex items-center justify-end w-full gap-3 flex-wrap">
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

export default UpdateSubmissionTitleForm;
