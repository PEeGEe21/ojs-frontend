import { formatDuration } from "../../lib/utilFunctions";
import { Progress } from "@chakra-ui/react";
import { Global } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { TelegramIcon, TwitterIcon2 } from "../../components/IconComponent";
// import useCountdown from "../../hooks/useCountdown";

const CollectionItem = ({ data }) => {
    const [totalStaked, setTotalStaked] = useState(0);
    const [progress, setProgress] = useState(0);
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

    return (
        <>
        {/* [#0F1B2D] */}
            <div
                className="bg-[#0F1B2D] min-h-[150px] p-5 rounded-lg font-medium relative hover:translate-y-[-10px] transition-all duration-300 ease-linear"
            >
                <div className="flex flex-col justify-between h-full gap-4 ">
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
                        <div className="flex flex-row items-center gap-2">
                            
                            <div className="flex flex-col font-medium">
                                <Link href={'/admin/submissions/' + data?.id} className="text-2xl text-white capitalize hover:underline">
                                    {data?.title} 
                                </Link>
                                <p className="text-[#C3C1C1] text-sm">
                                    <span className="text-[#ADB4B9] text-xs">
                                        Created By: {data?.created_by}
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

                    <div className="flex items-center justify-between flex-wrap  flex-col-reverse md:flex-row w-full pt-4 border-t border-[#3C3E3E] gap-2">
                        
                        <div className="w-full space-y-1 font-medium md:w-10/12">
                            <div className="flex flex-wrap items-center justify-start gap-4 font-medium">
                                <div>
                                    <p className="text-xs text-[#ADB4B9]">Date Created</p>
                                    <span className="text-sm text-[#FFA178]">
                                        {data?.date_created}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs text-[#ADB4B9]">Number of Reviews</p>
                                    <span className="text-sm text-[#FFA178]">
                                        {data?.no_of_reviews}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs text-[#ADB4B9]">Last activity recorded</p>
                                    <span className="text-sm text-[#FFA178]">
                                        {data?.last_activity_on}
                                    </span>
                                </div>
                            </div>
                        </div>
                            
                        <div className="flex items-center justify-end flex-1 w-full">
                            <div className="space-y-2">
                                <p className="text-xs text-[#ADB4B9] text-right md:text-right">
                                    Saking ends in:
                                </p>
                                <Link href={'/admin/submissions/'+data?.id} className="text-[#F0EDED] text-sm border border-[#3C3E3E] p-2 relative block">
                                    View Submission
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default CollectionItem;
