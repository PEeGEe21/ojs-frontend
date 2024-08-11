import Image from "next/image";
import Link from "next/link";

export default function layout({ children }) {
    return (
        <>
            <div className=" bg-white min-h-screen signup_gradient_J0K">
                <div className="container max-w-full z-10 relative">
                    {/* <div className="flex justify-start items-center pt-6 pb-3  bx-shadow px-4  ">
                        <div className="self-center mb-2 text-xl lg:text-4xl">
                        <Link href={'/'}>
                            <Image
                                src="/images/logo.svg"
                                width={150}
                                height={150}
                                alt="logo"
                                priority
                                fetchPriority='high'
                                decoding='async'
                            />
                        </Link>
                        </div>
                    </div> */}
                    <div className="py-0">
                        <div className="container mx-auto mb-0 max-w-[30rem] px-3 py-7">
                            <div className="h-full py-3 ">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}