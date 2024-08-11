import Link from "next/link";
import { ImageBase, Paragraph, ViewMore } from "../Button/Button";
import {
    TwitterIcon,
    YoutubeIcon,
    LinkedInIcon,
    TelegramIcon,
} from "../IconComponent";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg-[#002525] text-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col ">
                    <div className="flex-1">
                        <div className="flex items-center  justify-between mb-6 flex-wrap">
                            <div className="w-full md:w-1/4 flex items-center mb-4 md:mb-0 ">
                                <Image
                                    src="/images/Logofooter.png"
                                    alt="decoration barrel"
                                    width={200}
                                    height={150}
                                />
                            </div>

                            <div className="flex justify-between w-full md:w-3/4 flex-wrap gap-3">
                                <ul className="flex w-full lg:text-base text-sm md:w-3/4 space-x-5 flex-wrap mt-0 justify-start md:justify-end items-center">
                                    <li>
                                        <a href="mailto:info@mailpraiseudeh@gmail.com">
                                            Contact
                                        </a>
                                    </li>
                                </ul>
                                <div className="flex space-x-6">
                                    {/* <Link
                                        href="https://t.me/+ZF5ep5gBwyYxZDdk"
                                        target="_blank"
                                        className="cursor-pointer"
                                    >
                                        <TelegramIcon className={"w-6 h-6"} />
                                    </Link> */}
                                    {/* <InstagramIcon className={"w-6 h-6"} /> */}

                                    {/* <LinkedInIcon className={"w-6 h-6"} /> */}

                                    <YoutubeIcon className={"w-6 h-6"} />

                                    <TwitterIcon className={"w-6 h-6"} />
                                </div>
                            </div>
                        </div>
                        {/* <div className="">
             
              <p>Paragraph 1</p>
              <p>Paragraph 2</p>
              <p>Paragraph 3</p>
              <p>Paragraph 4</p>
            </div> */}
                    </div>
                    <div
                        className="text-xs"
                        style={{
                            borderTop: "1px solid #737272",
                            paddingTop: "1.5rem",
                            lineHeight: "2",
                            display: "flex",
                            flexDirection: "column",
                            gap: "2rem",
                        }}
                    >
                        <Paragraph
                            text={
                                "lorem ipsum"
                            }
                        />
                    </div>
                    <div className="relative flex pt-[6rem] justify-between flex-wrap">
                        <p
                            style={{
                                color: "#878787",
                                fontSize: "1rem",
                                lineHeight: "2",
                            }}
                        >
                            &copy; {new Date().getFullYear()} Peegee. All
                            rights reserved
                        </p>
                        <div className="flex space-x-2 flex-wrap">
                            {/* <ViewMore
                                address={""}
                                text={"Disclosures"}
                                style={{
                                    color: "#878787",
                                    fontSize: "1rem",
                                    lineHeight: "2",
                                }}
                            /> */}
                            <ViewMore
                                address={"/privacy-policy"}
                                text={"Cookie Policy"}
                                style={{
                                    color: "#878787",
                                    fontSize: "1rem",
                                    lineHeight: "2",
                                }}
                            />
                            <ViewMore
                                address={"/privacy-policy"}
                                text={"Privacy Policy"}
                                style={{
                                    color: "#878787",
                                    fontSize: "1rem",
                                    lineHeight: "2",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
