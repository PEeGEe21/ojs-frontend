"use client";
import React, { use, useEffect, useRef, useState,useMemo, useContext } from "react";
import {
    Box,
    Button,
    Text,
    useDisclosure,
    useSteps,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { ArrowLeft2, Danger ,ArrowLeft} from "iconsax-react";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import Papa from "papaparse";
import { TagField } from '../../../../components/TagField';
import useTags  from '../../../../hooks/useTags';
import { LoaderIcon } from '../../../../components/IconComponent';
import UploadFileSubmissionModal from '../../../../components/Modals/UploadFileSubmissionModal';
import { motion } from "framer-motion";
import { Checkmark } from "@carbon/icons-react";
import { useRouter } from "next/navigation";
import { Progress, useToast } from "@chakra-ui/react";
import { hostUrl } from "../../../../lib/utilFunctions";
import axios from "axios";
import { JournalContext } from "../../../../utils/journalContext";
import {modules, styles} from "../../../../lib/constants";

const steps = [
    { title: "Section Policy", description: "select the type of airdrop to use" },
    { title: "Upload Submission", description: "Add all recipients of your airdrop" },
    { title: "Enter Metadata", description: "Add all necessary details of your airdrop" },
    { title: "Confirmation", description: "Completed airdrop details gets listed" },
];

export default function CreateSubmission() {
    const { selectedJournal } = useContext(JournalContext);
    const [user, setUser] = useState(null);
    const [uploads, setUploads] = useState([]);
    const [currentUpload, setCurrentUpload] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [isConnected, setIsConnected] = useState(0);
    const [editorsNote, setEditorsNote] = useState('');
    const [airDropType, setAirDropType] = useState(null);
    const [currentSubmission, setCurrentSubmission] = useState(null);
    const [saleVesting, setSaleVesting] = useState(false);
    const [fileName, setFileName] = useState("");
    const [jsonRecipients, setJsonRecipients] = useState([]);
    const [totalTokens, setTotalTokens] = useState(0);
    const [showLoader, setShowLoader] = useState(false);
    const [tokenAddress, setTokenAddress] = useState("");
    const [tokenDetails, setTokenDetails] = useState({ token_symbol: "", token_name: "" });
    const [airDropTitle, setAirDropTitle] = useState("");
    const [addressError, setAddressError] = useState(false);
    const [nextDisabled, setNextDisabled] = useState(false);
    const [userTokenBalance, setUserTokenBalance] = useState(0);
    const [isPreviouslyPublished, setIsPreviouslyPublished] = useState(false);
    const [isUrlReference, setIsUrlReference] = useState(false);
    const [isFormattedCorrectly, setIsFormattedCorrectly] = useState(false);
    const [isAuthorGuideLines, setIsAuthorGuideLines] = useState(false);
    const [isAcceptDataCollection, setIsAcceptDataCollection] = useState(false);
    const [prefix, setPrefix] = useState('');
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const stepperRef = useRef(null);
    const MAX_TAGS = 10;

    const { tags, handleAddTag, handleRemoveTag } = useTags(MAX_TAGS); // pass the maximum tags

    const router = useRouter();
    const toast = useToast();
    const {
        isOpen: uploadFileIsOpen,
        onOpen: onUploadFileOpen,
        onClose: onUploadFileClose,
      } = useDisclosure();
    // const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { 
        ssr: false,
        loading: () => <div className="border border-[#464849] h-72 animate-pulse bg-gray-100" />
    }), []);



    const {
        isOpen: makePaymentAirdropOpen,
        onOpen: onMakePaymentAirdropOpen,
        onClose: onMakePaymentAirdropClose,
    } = useDisclosure();

    useEffect(() => {
        if (stepperRef.current) {
            stepperRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [activeStep]);

    const getUser = async ()=>{
        try{
            if (localStorage.getItem('ojs-user')){
                const data = await JSON.parse(
                    localStorage.getItem("ojs-user")
                );
                setUser(data)
                
            }else{
                router.push("/auth/login")
            }
        }catch(err){}
    };

    const getSubmission = async ()=>{
        try{
            console.log(localStorage.getItem('ojs-current-submission'))
            if (localStorage.getItem('ojs-current-submission')){
                const data = await JSON.parse(
                    localStorage.getItem("ojs-current-submission")
                );
                console.log(data, 'datumm')
                if(data.journalId === Number(selectedJournal.id)){
                    setCurrentSubmission(data)
                    setPrefix(data.prefix)
                    setTitle(data.title)
                    setSubTitle(data.subTitle)
                    setAbstract(data.abstract)
                    // tags = JSON.parse(data.keywords);
                    setEditorsNote(data.editorsNote)
                    setIsPreviouslyPublished(data.is_previously_published == 1 ? true : false)
                    setIsUrlReference(data.url_reference == 1 ? true : false)
                    setIsFormattedCorrectly(data.formatted_correctly == 1 ? true : false)
                    setIsAuthorGuideLines(data.author_guidelines == 1 ? true : false)
                    setIsAcceptDataCollection(data.accept_data_collection == 1 ? true : false)
                }
                console.log(isPreviouslyPublished,data,data.is_previously_published, currentSubmission, 'deerer')
            }else{
                
            }
        }catch(err){}
    };

    useEffect(()=>{
        getUser();
        getSubmission();
    }, [])

    useEffect(() => {
        if (tokenAddress && isConnected) {
            const getTokenDetails = async () => {
                try {
                    setShowLoader(true);
                    const signer = null;
                    const token = null;

                    const token_name = await token?.name();
                    const token_symbol = await token?.symbol();
                    const bal = await token?.balanceOf(address);

                    setUserTokenBalance(bal);
                    console.log("userTokenBalance", userTokenBalance, bal);
                    if (token_name && token_symbol) {
                        setAddressError(false);

                        setTokenDetails({
                            token_name,
                            token_symbol,
                        });
                    } else {
                        setAddressError(true);
                        setTokenDetails(null);
                    }
                } catch (error) {
                    setAddressError(true);
                    console.error("failed to get details", error);
                } finally {
                    setShowLoader(false);
                }
            };

            getTokenDetails();
        }
    }, [tokenAddress, isConnected]);

    useEffect(() => {
        if (activeStep === 1 && !uploads.length) {
            setNextDisabled(false);
        } else if (activeStep === 2 && (!tokenAddress || !airDropTitle)) {
            setNextDisabled(false);
        } else {
            setNextDisabled(false);
        }
    }, [uploads, airDropTitle, tokenAddress, tokenDetails]);

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            if(activeStep === 0){
                if(!currentSubmission)
                    handleSaveInitialState();
                else
                    setActiveStep((prevStep) => ++prevStep);
            }
            if(activeStep === 1){
                setActiveStep((prevStep) => ++prevStep);
            }

            if(activeStep === 2){
                // if(currentSubmission == '')
                    handleSaveSubmissionFields();
                // else
                    // setActiveStep((prevStep) => ++prevStep);
            }
            // if(activeStep === 3){
            //     handleFinishSubmission();
            // }

            // setNextDisabled(true);
        }
    };
    const handleClose = () => {
        // if (activeStep < steps.length - 1) {
            setActiveStep((prevStep) => 0);
            // setNextDisabled(true);
        // }
    };

    const handleFileChange = (e) => {
        setShowLoader(true);
        const file = e.target.files[0];

        if (file) {
            console.log("file", file);
            Papa.parse(file, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: function (result) {
                    if (result.errors.length) {
                        console.log(result.errors);
                        toast.error("Invalid CSV file");
                        setShowLoader(false);
                    }
                    let validated = result?.data?.map((item) => {
                        // if (isAddress(item.Address) && Number(item.Amount) > 0) {
                        //     // return [item.Address, parseEther(item.Amount).toString()];
                        // }
                    });
                    if (validated?.length) {
                        setJsonRecipients(validated);
                        // const totalTokens = validated.reduce(
                        //     (total, [addr, amt]) => total + Number(formatEther(amt)),
                        //     0
                        // );

                        setTotalTokens(totalTokens);
                        setShowLoader(false);
                    }
                },
            });

            setFileName(file.name);
        } else {
            setFileName("");
            setShowLoader(false);
        }
    };

    const handleSaveInitialState = async () => {
        if(!selectedJournal){
            toast({
                title: "Please select a journal.",
                description: "Failed",
                status: "error",
                duration: 2000,
                position: "top-right",
            });
            return;
        }

        if(!isPreviouslyPublished || !isUrlReference || !isUrlReference || !isFormattedCorrectly || !isAuthorGuideLines || !isAcceptDataCollection){
            toast({
                title: "Error please tick all boxes.",
                description: "Failed",
                status: "error",
                duration: 2000,
                position: "top-right",
            });
            return;
        }

        const data = {
            userId: Number(user?.id),
            editorsNote: editorsNote,
            is_previously_published: isPreviouslyPublished ? 1 : 0,
            url_reference: isUrlReference ? 1 : 0,
            formatted_correctly: isFormattedCorrectly ? 1 : 0,
            author_guidelines: isAuthorGuideLines ? 1 : 0,
            accept_data_collection: isAcceptDataCollection ? 1 : 0,
            journalId: selectedJournal?.id,
        };

        try {
            setShowLoader(true);
            console.log(data)

            //save to db
            const resp = await axios.post(hostUrl + "submissions/create-submission", data);
            console.log(resp)

            if (resp.data.success) {
                console.log(resp)
                setCurrentSubmission(resp.data.submission)
                localStorage.setItem('ojs-current-submission', JSON.stringify(resp.data.submission));
                toast({
                    title: "Submission created successfully.",
                    description: "Successfully created",
                    status: "success",
                    duration: 2000,
                    position: "top-right",
                });
                setActiveStep((prevStep) => ++prevStep);
            } else{
                toast({
                    title: "Error creating submission.",
                    description: "Failed",
                    status: "error",
                    duration: 2000,
                    position: "top-right",
                });
            }
            setShowLoader(false);
        } catch (error) {
            console.error("failed to create submission", error);
            toast({
                title: "Error creating submission.",
                description: "Failed",
                status: "error",
                duration: 2000,
                position: "top-right",
            });
            setShowLoader(false);
        } finally {
            // setShowLoader(false);
        }
    };

    const handleSaveSubmissionFields = async () => {

        console.log(prefix, title, subTitle, abstract)
        if(!prefix || !title || !subTitle || !abstract){
            toast({
                title: "Error all required fields.",
                description: "Failed",
                status: "error",
                duration: 2000,
                position: "top-right",
            });
            return;
        }

        const data = {
            userId: Number(user?.id),
            id: Number(currentSubmission?.id),
            prefix: prefix,
            title: title,
            subTitle: subTitle,
            abstract: abstract,
            keywords: JSON.stringify(tags) ,
        };
        console.log(data, 'data')

        try {
            setShowLoader(true);
            console.log(data)

            //save to db
            const resp = await axios.post(hostUrl + "submissions", data);
            console.log(resp)

            if (resp.data.success) {
                console.log(resp)
                const currentSubmission = JSON.parse(localStorage.getItem('ojs-current-submission'));

                // Update properties as needed
                const updatedSubmission = {
                    ...currentSubmission,
                    ...resp.data.submission,  // Merge in updated data
                };

                console.log(updatedSubmission, 'updated')

                // Save the updated object back to local storage
                localStorage.setItem('ojs-current-submission', JSON.stringify(updatedSubmission));
                setCurrentSubmission(resp.data.submission)

                toast({
                    title: "Submission created successfully.",
                    description: "Successfully created",
                    status: "success",
                    duration: 2000,
                    position: "top-right",
                });
                setActiveStep((prevStep) => ++prevStep);
            } else{
                toast({
                    title: "Error creating submission.",
                    description: "Failed",
                    status: "error",
                    duration: 2000,
                    position: "top-right",
                });
            }
            setShowLoader(false);
        } catch (error) {
            console.error("failed to create submission", error);
            toast({
                title: "Error creating submission.",
                description: "Failed",
                status: "error",
                duration: 2000,
                position: "top-right",
            });
            setShowLoader(false);
        } finally {
            // setShowLoader(false);
        }
    };

    const handleFinishSubmission = async () => {

        const data = {
            userId: Number(user?.id),
            id: Number(currentSubmission?.id),
        };

        try {
            setShowLoader(true);
            console.log(data)

            //save to db
            const resp = await axios.post(hostUrl + "submissions/final-save", data);
            console.log(resp)

            if (resp.data.success) {
                console.log(resp)
                const currentSubmission = localStorage.getItem('ojs-current-submission');
                if(currentSubmission){
                    localStorage.removeItem('ojs-current-submission');
                }
                setCurrentSubmission(null)
                toast({
                    title: "Submission saved successfully.",
                    description: "Successfully created",
                    status: "success",
                    duration: 2000,
                    position: "top-right",
                });
                router.push('/author/submissions');
            } else{
                toast({
                    title: "Error creating submission.",
                    description: "Failed",
                    status: "error",
                    duration: 2000,
                    position: "top-right",
                });
            }
            setShowLoader(false);
        } catch (error) {
            console.error("failed to create submission", error);
            toast({
                title: "Error creating submission.",
                description: "Failed",
                status: "error",
                duration: 2000,
                position: "top-right",
            });
            setShowLoader(false);
        } finally {
            // setShowLoader(false);
        }
    };

    const handleFinish = async () => {
        const data = JSON.stringify({
            owner_address: address,
            token_address: tokenAddress,
            token_name: tokenDetails?.token_name,
            token_symbol: tokenDetails?.token_symbol,
            token_total: totalTokens,
            recipient_total: jsonRecipients.length,
            airdrop_name: airDropTitle,
            airdrop_recipients: jsonRecipients,
        });

        try {
            setShowLoader(true);
            //save to db
            const savedToDB = await fetch("/api/airdrop", {
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (savedToDB.ok) {
                // const newAirdrop = await savedToDB.json();

                console.log("root:", newAirdrop.merkle_root);
                // const signer = await getEthersSigner(config);
                // const token = new ethers.Contract(tokenAddress, TokenAbi, signer);
                // const factory = new ethers.Contract(AirdropFactory, AirdropFactoryAbi, signer);

                // const res = await token.approve(
                //     AirdropFactory,
                //     ethers.parseEther(totalTokens.toString())
                // );

                // await res.wait();

                console.log({ tokenAddress, merkle_root: newAirdrop.merkle_root, totalTokens });
                // await factory.newInstantAirdrop(
                //     tokenAddress,
                //     newAirdrop.merkle_root,
                //     ethers.parseEther(totalTokens.toString())
                // );

                toast({
                    title: "Airdrop created successfully.",
                    description: "Invite people to start claiming their tokens.",
                    status: "success",
                    duration: 2000,
                });

                router.push("/airdrop");

                setShowLoader(false);
            }
        } catch (error) {
            console.error("failed to create airdrop", error);
            toast({
                title: "Error creating airdrop.",
                description: "Failed",
                status: "error",
                duration: 2000,
            });
            setShowLoader(false);
        } finally {
            // setShowLoader(false);
        }
    };

    console.log(isPreviouslyPublished, 'hereeee')


    const handleIsPreviouslyPublishedChange = () => {
        setIsPreviouslyPublished((prev)=>!prev);
        console.log(isPreviouslyPublished, 'isPreviouslyPublished')

    };

    const isActive = (index) => activeStep === index;
    const isCompleted = (index) => activeStep > index;

    return (
        <>
            <div className="space-y-6">
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

                <div className="py-8">
                    <div ref={stepperRef}>
                        <div>
                            <div className="flex items-center sm:px-10 md:px-20 mb-3">
                                {steps.map((step, index) => (
                                    <React.Fragment key={index}>
                                        <span
                                            className={`presale-step-shadow size-6 rounded-full border-[1.5px]  flex justify-center items-center ${
                                                isCompleted(index) || isActive(index)
                                                    ? "border-[#FC9569]"
                                                    : "bg-[#3B3939] border-[#212121] "
                                            }`}
                                        >
                                            {isCompleted(index) ? (
                                                <Checkmark className="text-[#FC9569]" />
                                            ) : (
                                                <span
                                                    className={`size-2 rounded-full ${
                                                        isCompleted(index) || isActive(index)
                                                            ? "bg-[#FC9569]"
                                                            : "bg-[#575656]"
                                                    }`}
                                                ></span>
                                            )}
                                        </span>
                                        {index < steps.length - 1 && (
                                            <span className="h-0.5 bg-[#3B3939] flex-1">
                                                <span
                                                    className={`block h-full ${
                                                        isCompleted(index)
                                                            ? "bg-[#c76b4c] animate-moveProgress"
                                                            : "bg-[#3B3939]"
                                                    }`}
                                                ></span>
                                            </span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            <div className="flex justify-between gap-1">
                                {steps.map((step, index) => (
                                    <div className="max-w-[190px] text-center false" key={index}>
                                        <p
                                            className={`text-[0.625rem] sm:text-sm md:text-base font-medium mb-0.5 ${
                                                isActive(index) ? "text-[#EA6A32]" : ""
                                            } ${isCompleted(index) ? "text-[#313131]" : "text-[#A8B8C2]"}`}
                                        >
                                            {step.title}
                                        </p>
                                        <p
                                            className={`hidden sm:block text-[0.625rem] md:text-sm text-Nebula ${
                                                isActive(index) || isCompleted(index)
                                                    ? "text-[#0F1B2D]"
                                                    : "text-[#A8B8C2]"
                                            } `}
                                        >
                                            {step.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="py-6 md:mt-8">
                            {activeStep === 0 ? (
                                <>
                                    <div className="bg-white px-3 md:px-6 py-3 md:py-6 rounded-lg">
                                        <h3 className="font-medium text-[#212121] text-lg mb-2">
                                            Section Policy
                                        </h3>

                                        <div className="grid grid-cols-1 w-full gap-8 py-4">
                                            <div
                                            >
                                                <div className="mb-2">
                                                    <h3 className="text-[#212121] font-semibold text-base mb-2">
                                                        Submission Requirements
                                                    </h3>
                                                    <p className="text-[#828e96] text-sm">You must read and acknowledge that you&apos;ve completed the requirements below before proceeding.</p>
                                                </div>
                                                <div className="py-2 w-full text-left">
                                                    

                                                    <ul className="space-y-2">
                                                        
                                                        <li>
                                                            <label htmlFor="is_previously_published" className="flex items-center justify-start gap-3 cursor-pointer">
                                                                <input 
                                                                    type="checkbox" 
                                                                    checked={isPreviouslyPublished} 
                                                                    id="is_previously_published" 
                                                                    onChange={()=>{
                                                                        setIsPreviouslyPublished((prev)=>!prev), 
                                                                        console.log(isPreviouslyPublished)
                                                                    }} 
                                                                    name="is_previously_published" 
                                                                />
                                                                <p className="text-[#212121] text-sm">
                                                                    The submission has not been previously published, nor is it before another journal for consideration (or an explanation has been provided in Comments to the Editor).
                                                                </p>
                                                            </label>
                                                        </li>
                                                        {/* <li>
                                                            <label className="flex items-center justify-start gap-3 cursor-pointer">
                                                                <input type="checkbox"/>
                                                                <p className="text-[#212121] text-sm">
                                                                    The submission file is in OpenOffice, Microsoft Word, or RTF document file format.
                                                                </p>
                                                            </label>
                                                        </li> */}
                                                        <li>
                                                            <label htmlFor="url_reference" className="flex items-center justify-start gap-3 cursor-pointer">
                                                                <input 
                                                                    type="checkbox" 
                                                                    checked={isUrlReference} 
                                                                    id="url_reference" 
                                                                    onChange={()=>{
                                                                        setIsUrlReference((prev)=>!prev), 
                                                                        console.log(isUrlReference)
                                                                    }} 
                                                                    name="url_reference" 
                                                                />
                                                                <p className="text-[#212121] text-sm">
                                                                    Where available, URLs for the references have been provided.
                                                                </p>
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <label htmlFor="formatted_correctly" className="flex items-center justify-start gap-3 cursor-pointer">
                                                                <input 
                                                                    type="checkbox" 
                                                                    id="formatted_correctly" 
                                                                    checked={isFormattedCorrectly} 
                                                                    onChange={()=>{
                                                                        setIsFormattedCorrectly((prev)=>!prev), 
                                                                        console.log(isFormattedCorrectly)
                                                                    }} 
                                                                    name="formatted_correctly" 
                                                                />
                                                                <p className="text-[#212121] text-sm">
                                                                    The text is single-spaced; uses a 12-point font; employs italics, rather than underlining (except with URL addresses); and all illustrations, figures, and tables are placed within the text at the appropriate points, rather than at the end.
                                                                </p>
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <label htmlFor="author_guidelines"  className="flex items-center justify-start gap-3 cursor-pointer">
                                                                <input 
                                                                    type="checkbox" 
                                                                    checked={isAuthorGuideLines} 
                                                                    id="author_guidelines" 
                                                                    onChange={()=>{
                                                                        setIsAuthorGuideLines((prev)=>!prev), 
                                                                        console.log(isAuthorGuideLines)
                                                                    }} 
                                                                    name="author_guidelines" 
                                                                />
                                                                <p className="text-[#212121] text-sm">
                                                                    The text adheres to the stylistic and bibliographic requirements outlined in the Author Guidelines.
                                                                </p>
                                                            </label>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div>
                                                <div>
                                                    <h3 className="text-[#212121] font-semibold text-base mb-2">
                                                        Note for the Editor
                                                    </h3>
                                                </div>

                                                <div>
                                                    {/* <div className="quill-wrapper">
                                                        <ReactQuill 
                                                            theme="snow"
                                                            required
                                                            value={editorsNote}
                                                            onChange={(value) => {
                                                                setEditorsNote(value);
                                                                console.log(editorsNote);
                                                            }}
                                                            modules={modules}
                                                            style={styles}
                                                            className="border border-[#464849]"
                                                        />
                                                        
                                                        <style jsx global>{`
                                                            .quill-wrapper .ql-container {
                                                                min-height: 240px;
                                                            }
                                                            .quill-wrapper .ql-editor {
                                                                min-height: 240px;
                                                            }
                                                        `}</style>
                                                    </div> */}

                                                    <ReactQuill
                                                        theme="snow"
                                                        required
                                                        modules={modules}
                                                        style={styles}
                                                        value={editorsNote}
                                                        onChange={(value) => {
                                                            setEditorsNote(value);
                                                            console.log(editorsNote)
                                                        }}
                                                        className="border border-[#464849] h-auto min-h-72"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="flex items-center justify-start gap-3 cursor-pointer">
                                                    <input 
                                                        type="checkbox" 
                                                        id="accept_data_collection" 
                                                        checked={isAcceptDataCollection} 
                                                        onChange={()=>{
                                                            setIsAcceptDataCollection((prev)=>!prev), 
                                                            console.log(isAcceptDataCollection)
                                                        }} 
                                                        name="accept_data_collection" 
                                                    />
                                                    <p className="text-[#212121] text-sm">
                                                        Yes I agree to have my data collected and stored.
                                                    </p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}

                            {activeStep === 1 ? (
                                <>
                                    <div className="bg-white px-3 md:px-6 py-3 md:py-6 rounded-lg">
                                        <div className="flex items-center justify-between gap-2">

                                            <h3 className="font-medium text-[#212121] text-lg mb-2">
                                                Upload Submission
                                            </h3>
                                            <button 
                                                onClick={onUploadFileOpen}
                                                className="w-auto whitespace-nowrap py-2 md:py-3 px-3 md:px-5 bg-[#313131] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 "
                                            >
                                                <p className="">Upload File</p>
                                            </button>
                                        </div>
 
                                        <div>
                                            <div className="overflow-x-auto md:overflow-x-auto py-4 text-[#313131] scrollbar-change rounded-md">
                                                <Table variant='unstyled' className=' table-bordered'>
                                                    <Thead className='bg-[#F7FAFC] border-b border-[#e7ecf1]'>
                                                    <Tr>
                                                        <Th width={10}>#</Th>
                                                        <Th width={'30%'}>Title</Th>
                                                        <Th>Action</Th>
                                                    </Tr>
                                                    </Thead>
                                                    <Tbody className=' w-full px-4 divide-y divide-[#e7ecf1]'>

                                                        {uploads?.length < 1 &&
                                                            <Tr>
                                                                <Td colSpan={8} className="px-2 py-4 text-base whitespace-nowrap text-center">
                                                                    <span className="text-[#313131] text-base">
                                                                        No data found
                                                                    </span>
                                                                </Td>
                                                            </Tr>
                                                        }

                                                        {uploads?.length > 0 && uploads?.map((upload, index) => {

                                                            return (
                                                                <Tr key={index} className='px-4 hover:bg-[#F7FAFC]'>
                                                                    <Td className="px-2 py-4 text-base whitespace-nowrap">
                                                                        <span className="text-[#313131] text-base">
                                                                            {index + 1}
                                                                        </span>
                                                                    </Td>
                                                                    <Td className="px-2 py-4 whitespace-nowrap">
                                                                        <div className='flex items-start justify-between text-sm'>
                                                                            <p>
                                                                                {upload.title}
                                                                            </p>
                                                                        </div>
                                                                    </Td>
                                                                    
                                                                    <Td className="px-2 py-4 text-sm whitespace-nowrap">
                                                                        <div className="text-[#313131] text-xs flex items-center justify-center gap-2 flex-row">
                                                                            {/* && status === 'In Progress'  */}
                                                                            <button className='btn px-2 py-1 bg-[#e1e5ec] border border-[#e1e5ec] rounded text-[#666] flex items-center'>
                                                                                Take Test
                                                                            </button>
                                                                        </div>
                                                                    </Td>

                                                                </Tr>
                                                            )
                                                        })}
                                                    </Tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}

                            {activeStep === 2 ? (
                                <>
                                    <div className="bg-white px-3 md:px-6 py-3 md:py-6 rounded-lg">
                                        <div className="mt-3 lg:mt-6">
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
                                                        required
                                                        onChange={(e) => {
                                                            setPrefix(e.target.value);
                                                            console.log(prefix);
                                                        }}
                                                        className={`block px-2 w-full text-sm text-[#212121] border bg-transparent  h-12 rounded-md focus:outline-0`}
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
                                                        required
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
                                                        htmlFor="subtitle"
                                                        className="text-sm text-[#212121] semibold"
                                                    >
                                                        Subtitle
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="subtitle"
                                                        required
                                                        value={subTitle}
                                                        onChange={(e) => setSubTitle(e.target.value)}
                                                        className="block px-2 w-full text-sm text-[#212121] focus:outline-none border-[#524F4D] border bg-transparent  h-12 rounded-md focus:outline-0"
                                                        name="subtitle"
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
                                                    {/* <div className="quill-wrapper">
                                                        <ReactQuill 
                                                            theme="snow"
                                                            required
                                                            value={abstract}
                                                            onChange={(value) => {
                                                                setEditorsNote(value);
                                                                console.log(abstract);
                                                            }}
                                                            modules={modules}
                                                            style={styles}
                                                            className="border border-[#464849]"
                                                        />
                                                        
                                                        <style jsx global>{`
                                                            .quill-wrapper .ql-container {
                                                                min-height: 240px;
                                                            }
                                                            .quill-wrapper .ql-editor {
                                                                min-height: 240px;
                                                            }
                                                        `}</style>
                                                    </div> */}
                                                    <ReactQuill
                                                        theme="snow"
                                                        required
                                                        value={abstract}
                                                        modules={modules}
                                                        style={styles}
                                                        onChange={(value) => {
                                                            setAbstract(value);
                                                            console.log(abstract)
                                                        }}
                                                        className="border border-[#524F4D] h-auto min-h-72"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex w-full gap-5 items-center flex-wrap lg:flex-nowrap">
                                                <div className="mb-6 flex flex-col gap-1 relative w-full lg:w-1/2">
                                                    <label
                                                        htmlFor="name"
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
                                    </div>
                                </>
                            ) : (
                                ""
                            )}

                            {activeStep === 3 ? (
                                <>
                                    <div className="bg-white px-3 md:px-6 py-3 md:py-6 rounded-lg">
                                        <h3 className="font-medium text-[#212121] text-lg mb-2">
                                            Confirm Submission
                                        </h3>

                                        <div className="flex gap-6 py-2 flex-wrap lg:flex-nowrap ">
                                            <div className="w-full">
                                                <div>
                                                    <div className="py-2 w-full flex justify-between items-center">
                                                            <h3 className=" font-medium text-[#898582] text-sm">
                                                                Your submission has been uploaded and is ready to be sent. You may go back to review and adjust any of the informantion you have entered before continuing. When you are ready, click Finish Submission.
                                                            </h3>
                                                            <span className="font-medium text-[#FFFFFF] text-xs">
                                                                {airDropTitle}
                                                            </span>
                                                        </div>
                                                    
                                                    {/* {userTokenBalance && ( */}
                                                        <div className="py-[18px] px-6 bg-red-200 rounded-lg mt-2">
                                                            <div className="flex items-start w-full gap-2 text-red-500">
                                                                <span>
                                                                    <Danger size={22} />
                                                                </span>
                                                                <p className="text-sm text-red-500">
                                                                    You will not be able to renter details after submission.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    {/* )} */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}
                        </div>

                        <Box mt={4}>
                            <div className="flex items-center justify-center w-full gap-3 flex-wrap">
                                {activeStep < steps.length - 1 ? (
                                    showLoader ? (
                                        <button
                                            className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] whitespace-nowrap w-full md:w-auto
                                            disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                            transition-all duration-75 border-none px-5 
                                            font-medium p-3 text-base text-white block flex items-center justify-center"
                                        >
                                            <LoaderIcon className="animate-spin size-32 text-white inline" />
                                        </button>
                                    ) : (
                                        <button
                                            disabled={nextDisabled}
                                            onClick={handleNext}
                                            className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] whitespace-nowrap w-full md:w-auto
                                            disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                            transition-all duration-75 border-none px-5 
                                            font-medium p-3 text-base text-white block"
                                        >
                                            Next
                                        </button>
                                    )
                                ) : (
                                    <>
                                        {showLoader ? (
                                            <button
                                                className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] whitespace-nowrap w-full md:w-auto
                                                disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                                transition-all duration-75 border-none px-5 
                                                font-medium p-3 text-base text-white block flex items-center justify-center"
                                            >
                                                <LoaderIcon className="animate-spin size-32 text-white inline" />
                                            </button>
                                        ) : (
                                            (<>
                                                <button
                                                    onClick={handleFinishSubmission}
                                                    className="bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] whitespace-nowrap w-full md:w-auto
                                                    disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                                    transition-all duration-75 border-none px-5 
                                                    font-medium p-3 text-base text-white block"
                                                >
                                                    Finish Submission
                                                </button>
                                                <button
                                                    onClick={handleClose}
                                                    className="bg-[#A0AEC0] hover:bg-[#A0AEC0] min-w-[200px] whitespace-nowrap w-full md:w-auto
                                                    disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                                    transition-all duration-75 border-none px-5 
                                                    font-medium p-3 text-base text-white block"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                            )
                                        )}
                                    </>
                                )}
                            </div>
                        </Box>
                    </div>
                </div>

            </div>



            {/* {user ? ( */}
                <UploadFileSubmissionModal 
                    user={user}
                    isOpen={uploadFileIsOpen}
                    onClose={onUploadFileClose}
                    currentUpload={currentUpload}
                    uploadList={setUploads}
                    setCurrentUpload={setCurrentUpload}
                />
            {/* ) : (
                ''
            )} */}
        </>
    );
}
