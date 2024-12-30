'use client';

import { Box } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { TagField } from '../TagField'
import { LoaderIcon } from '../IconComponent'
import useTags from '../../hooks/useTags'
import { hostUrl } from '../../lib/utilFunctions';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateKeywordsForm = ({submission, fetchData}) => {
    const [isSavingKeyWords, setIsSavingKeyWords] = useState(false);
    const MAX_TAGS = 10;
    const { tags, handleAddTag, handleRemoveTag, setInitialTags } = useTags(MAX_TAGS); // pass the maximum tags

    const setTags = ()  => {
        const keywords = JSON.parse(submission.keywords || "");
        setInitialTags(keywords)
    }

    useEffect(() =>{
        setTags();
    }, [submission])

    // console.log(tags, 'tags')
    const handleSubmitKeywords = async () => {
        setIsSavingKeyWords(true);
        try{
            const payload = {
                keywords: JSON.stringify(tags)
            };
            const resp = await axios.patch(hostUrl + 'submissions/'+ submission?.id + '/update-keywords', payload);
            if(resp.data.success){
                toast.success(resp?.data?.message??'Successfully Updated!');
                fetchData();
            } else {
                toast.error(resp?.data?.message??'An Error Occured!');
            }
            setIsSavingKeyWords(false);
        } catch(err){
            toast.error(err?.data?.message??'An Error Occured!');
            setIsSavingKeyWords(false);
        }
    }

    
    return (
        <>
            <div className=" px-3 md:px-6 py-3 md:py-6">
                <div className="">
                    <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                        <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                            <label
                                htmlFor="keywords"
                                className="text-sm text-[#212121] mb-1"
                            >
                                KeyWords
                            </label>

                            <TagField
                                tags={tags}
                                addTag={handleAddTag}
                                removeTag={handleRemoveTag}
                                maxTags={MAX_TAGS}
                            />
                        </div>

                    </div>
                </div>
                <Box mt={4}>
                    <div className="flex items-center justify-end w-full gap-3 flex-wrap">
                        <button
                            className={`h-10  w-auto whitespace-nowrap py-2 px-3 bg-[#008080] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 ${isSavingKeyWords || submission?.issue?.published_status == 1 ? 'disabled:opacity-50 disabled:cursor-not-allowed': ''}`}
                            onClick={handleSubmitKeywords}
                            disabled={isSavingKeyWords || submission?.issue?.published_status == 1}
                            aria-disabled={isSavingKeyWords}
                        >
                            {isSavingKeyWords ? (
                            <>
                                <LoaderIcon
                                    extraClass="text-white h-4 w-5"
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

        </>
    )
}

export default UpdateKeywordsForm
