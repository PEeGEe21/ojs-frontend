"use client";

import { ArrowLeft } from 'iconsax-react'
import { useRouter } from 'next/navigation'
// import CreateSubmissionStepper from '../../../../components/Steps/CreateSubmissionStepper'
import React from 'react'

const CreateSubmission = () => {
  const router = useRouter();

  return (
    <>
        <div className="flex flex-row items-center justify-start gap-4 mb-8">
            <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center gap-2 w-auto whitespace-nowrap py-2 px-3 bg-[#313131] text-white rounded-md"
            >
                <ArrowLeft />
            </button>

            <div className="w-full">
                <h1 className=" whitespace-nowrap font-bold text-2xl">Create Submission</h1>
            </div>
        </div>

        <div>
            {/* <CreateSubmissionStepper/> */}
        </div>
    </>
  )
}

export default CreateSubmission