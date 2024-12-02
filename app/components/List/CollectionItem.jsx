import { formatDuration, formatMomentDate, shortenTitle } from "../../lib/utilFunctions";
import { Progress } from "@chakra-ui/react";
import { Global } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import Swal from 'sweetalert2';
import React, { useEffect, useMemo, useState } from "react";
import { TelegramIcon, TwitterIcon2 } from "../../components/IconComponent";
import axios from "axios";
// import useCountdown from "../../hooks/useCountdown";

const CollectionItem = ({ index, data, setSubmissions }) => {
    // const { days, hours, minutes, seconds } = useCountdown(data?.end_date);

    // useEffect(() => {
    //     if (data?.stake_address) {
    //         const getTotalStaked = async () => {
    //             const signer = await getEthersSigner(config);
    //             const staker = new ethers.Contract(data?.stake_address, StakeAbi, signer);

    //             staker
    //                 .totalStaked()
    //                 .then((response) => {
    //                     console.log("total staked", response);
    //                     setTotalStaked(Number(formatUnits(response)));
    //                     setProgress((Number(formatUnits(response)) / data?.hard_cap) * 100);
    //                 })
    //                 .catch((error) => {
    //                     console.log("Failed to get total staked", error);
    //                 });
    //         };
    //         getTotalStaked();
    //     }
    // }, [data]);

    console.log(data);
    const status = useMemo(() => {
        const now = Date.now();
        const start_date = new Date(data?.start_date);
        const end_date = new Date(data?.end_date);
        if (start_date.getTime() <= now) {
            return "In Progress";
        }

        if (now > end_date.getTime()) {
            return "Ended";
        }
        return "Upcoming";
    }, [data]);

    const deleteSubmission = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete?',
            text: 'You are about to delete a submission!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            allowOutsideClick: () => !Swal.isLoading(), // Prevent clicking outside modal during loading
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const response = await axios.delete(hostUrl + `submissions/delete/${id}`);
                    if (response.success){
                        Swal.fire(
                            'Deleted!',
                            'The Submission has been deleted.',
                            'success'
                        );
                    } else {
                        Swal.fire('Error!', 'There was an issue deleting your Submission.', 'error');
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire('Error!', 'There was an issue deleting your Submission.', 'error');
                    throw err; 
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setSubmissions((prevSubmissions) => prevSubmissions.filter((submission) => submission.id !== id));
                Swal.fire(
                    'Deleted!',
                    'The Submission has been deleted.',
                    'success'
                );
            }
        });
    };

    return (
        <>
        {/* [#0F1B2D] */}
            <div
                className="bg-[#0F1B2D] min-h-[150px] p-5 rounded-lg font-medium relative hover:translate-y-[-10px] transition-all duration-300 ease-linear"
            >
                <div className="flex w-full gap-3">
                    <span className="text-2xl text-white">
                        {index}.
                    </span>
                    <div className="flex flex-col justify-between h-full gap-4 w-full flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
                            <div className="flex flex-row items-start gap-2">
                                
                                <div className="flex flex-col font-medium">
                                    <Link href={'/admin/submissions/' + data?.id} className="text-2xl text-white capitalize hover:underline">
                                        {data?.title??shortenTitle(data?.title, 100)} 
                                    </Link>
                                    <p className="text-[#C3C1C1] text-sm">
                                        <span className="text-[#ADB4B9] text-xs">
                                            Created By: {data?.user?.username}
                                        </span>
                                    </p>
                                </div>
                            </div>


                            <div className="flex flex-col gap-2">
                                {status === "In Progress" || status === "Ended" ? (
                                    <div className="bg-[#353432] text-[#00FFA3] max-w-fit px-3 py-1 rounded-3xl text-xs inline-flex items-center gap-2 absolute right-2 top-2">
                                        <span className="h-1 w-1 rounded-full bg-[#00FFA3] block"></span>
                                        {status}
                                    </div>
                                ) : (
                                    <div className="bg-[#353432] text-[#F9C33F] max-w-fit px-3 py-1 rounded-3xl text-xs inline-flex items-center gap-2 absolute right-5 top-5">
                                        <span className="h-1 w-1 rounded-full bg-[#F9C33F] bstake"></span>
                                        Incomplete
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between flex-col-reverse md:flex-row w-full pt-4 border-t border-[#3C3E3E] gap-2">
                            
                            <div className="w-full space-y-1 font-medium md:w-10/12">
                                <div className="flex flex-wrap items-start justify-start gap-4 font-medium">
                                    <div>
                                        <p className="text-xAssigns text-[#ADB4B9]">Date Created</p>
                                        <span className="text-sm text-[#FFA178]">
                                            {formatMomentDate(data?.createdAt, false)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#ADB4B9]">Number of Reviews</p>
                                        <span className="text-sm text-[#FFA178]">
                                            {data?.no_of_reviews}
                                        </span>
                                    </div>
                                </div>
                            </div>
                                
                            <div className="flex items-center justify-end flex-1 w-full">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">

                                    
                                        <Link href={'/admin/submissions/'+data?.id} className="text-[#F0EDED] text-sm border border-[#3C3E3E] p-2 relative block">
                                            View Submission
                                        </Link>
                                        {/* <button onClick={()=>deleteSubmission(item.id)} className='btn p-2 bg-[#e1e5ec] border border-[#e1e5ec] rounded text-[#666] flex items-center'>
                                                <Trash size={12}/>
                                            </button> */}
                                        <button onClick={()=>deleteSubmission(data?.id)} className="text-[#F0EDED] text-sm btn btn-red p-2 relative block">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CollectionItem;
