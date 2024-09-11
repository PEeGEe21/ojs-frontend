'use client';

import Link from 'next/link';
import React, { useEffect, useState, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import SocialLogin from './FormComponents/SocialLogin';
import { LoaderIcon } from '../IconComponent';
import setAuthToken from '../../lib/setAuthToken';
import { ToasterAlert } from '../../lib/utilFunctions';

const SignUpForm = () => {
  const [error, setError] = useState(null);
  const [errMessage, setErrMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signupAs, setSignupAs] = useState(2);

  const password = React.useRef(null);
  const email = React.useRef(null);
  const fname = React.useRef(null);
  const lname = React.useRef(null);
  const username = React.useRef(null);
  const cpassword = React.useRef(null);

  const { push } = useRouter();

  const hostUrl = process.env.NEXT_PUBLIC_AUTH_URL;

  const handleSignupAsChange = (event) => {
    setSignupAs(event.target.value); // Capture the selected radio button value
  };

  console.log('hostUrl', hostUrl);
  const successtoastOptions = {
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
    },
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  };

  const createAccount = async (e) => {
    setLoading(true);
    e.preventDefault();

    const data = {
      email: email.current.value,
      password: password.current.value,
      cpassword: cpassword.current.value,
      fname: fname.current.value,
      lname: lname.current.value,
      username: username.current.value,
      signup_as: JSON.parse(signupAs),
    };

    // console.log(data, 'data')
    // return

    axios
      .post(`${hostUrl}/api/auth/signup`, data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message, successtoastOptions);
          setTimeout(() => {
            push(`/auth/login?email=${email.current.value}&new=true`);
          }, 300);
        } else {
          setError(true);
          let message = '';
          if (!res.data?.message) {
            message = 'An error occurred';
          } else {
            message = res.data?.message;
          }
          setErrMessage(message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log('err', err);
        setError(true);
        setErrMessage(err?.response?.data?.message);
        setLoading(false);
      });
  };

  return (
    <>
      <form onSubmit={createAccount}>
        <div className="mb-6 pb-4 ">
          <h3 className="text-2xl text-center font-bold text-[#000]">
          Create an Account to access our  <Link className="underline" href={'/'}> Open Journal System</Link>
          </h3>
        </div>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5"
            role="alert"
          >
            <strong className="font-bold">
              There was an error in your submission
            </strong>
            {errMessage && (
              <ul className="text-sm list-disc ml-5">
                <li>{errMessage}</li>
              </ul>
            )}
          </div>
        )}

        <div className="mb-6 flex flex-col gap-1 relative">
          <input
            type="text"
            id="fname"
            className="block px-2 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 peer border focus:border-[#013434] h-10 rounded focus:outline-0"
            placeholder=" "
            name="fname"
            required
            ref={fname}
            min="3"
            autoComplete="off"
          />

          <label
            htmlFor="fname"
            className="absolute text-sm  duration-100 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2   peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 rounded peer-focus:bg-white  bg-white cursor-text"
          >
            First Name
          </label>
        </div>

        <div className="mb-6 flex flex-col gap-1 relative">
          <input
            type="text"
            id="lname"
            className="block px-2 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 peer border focus:border-[#013434] h-10 rounded focus:outline-0"
            placeholder=" "
            name="lname"
            required
            ref={lname}
            min="3"
            autoComplete="off"
          />

          <label
            htmlFor="lname"
            className="absolute text-sm  duration-100 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2   peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 rounded peer-focus:bg-white  bg-white cursor-text"
          >
            Last Name
          </label>
        </div>

        <div className="mb-6 flex flex-col gap-1 relative">
          <input
            type="email"
            id="email"
            className="block px-2 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 peer border focus:border-[#013434] h-10 rounded focus:outline-0"
            placeholder=" "
            name="email"
            required
            ref={email}
            min="3"
            autoComplete="off"
          />

          <label
            htmlFor="email"
            className="absolute text-sm  duration-100 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2   peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 rounded peer-focus:bg-white  bg-white cursor-text"
          >
            Email
          </label>
        </div>

        <div className="mb-6 flex flex-col gap-1 relative">
          <input
            type="text"
            id="username"
            className="block px-2 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 peer border focus:border-[#013434] h-10 rounded focus:outline-0"
            placeholder=" "
            name="username"
            required
            ref={username}
            min="3"
            autoComplete="off"
          />

          <label
            htmlFor="username"
            className="absolute text-sm  duration-100 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2   peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 rounded peer-focus:bg-white  bg-white cursor-text"
          >
            Username
          </label>
        </div>

        <div className="mb-6 flex flex-col gap-1 relative">
          <input
            type="password"
            id="password"
            name="password"
            required
            ref={password}
            pattern="[a-zA-Z0-9]+"
            className="block px-2 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 peer border focus:border-[#013434] h-10 rounded focus:outline-0"
            placeholder=" "
          />

          <label
            htmlFor="password"
            className="absolute text-sm  duration-100 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:bg-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 rounded bg-white cursor-text"
          >
            Password
          </label>
        </div>

        <div className="mb-6 flex flex-col gap-1 relative">
          <input
            type="password"
            id="cpassword"
            name="cpassword"
            required
            ref={cpassword}
            pattern="[a-zA-Z0-9]+"
            className="block px-2 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 peer border focus:border-[#013434] h-10 rounded focus:outline-0"
            placeholder=" "
          />

          <label
            htmlFor="cpassword"
            className="absolute text-sm  duration-100 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:bg-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 rounded bg-white cursor-text"
          >
            Confirm Password
          </label>
        </div>


          <div>
            <div className="flex items-center mb-1 ">
              <label className="">
                Sign Up as
              </label>
            </div>

            <div>
              <label htmlFor="signup_as_author" className="mr-4 text-sm cursor-pointer">
                <input
                  type="radio"
                  id="signup_as_author"
                  className="mr-2"
                  value={3}
                  name="signup_as"
                  required
                  autoComplete="off"
                  onChange={handleSignupAsChange}
                  checked={signupAs === '3'} 
                />
                Author
              </label>
              <label htmlFor="signup_as_reader" className='text-sm cursor-pointer'>
                <input
                  type="radio"
                  id="signup_as_reader"
                  className="mr-2"
                  value={2}
                  name="signup_as"
                  required
                  autoComplete="off"
                  onChange={handleSignupAsChange}
                  checked={signupAs === '2'}
                />
                Reader
              </label>
            </div>
          </div>
        

          <button
            type="submit"
            // onClick={(e) => handleSubmit}
            className="w-full h-50 bg-[#013434] py-3 px-3 mt-4 hover:shadow-md transition-all duration-300 ease rounded text-sm text-white  flex items-center justify-center" 
            disabled={loading}
            aria-disabled={loading}
          >
            {loading ? (
              <>
                <LoaderIcon
                  extraClass="text-white h-5 w-5"
                  className="animate-spin mr-1"
                />
              </>
            ) : (
              'SignUp'
            )}
            
          </button>
        {/* 
        <div className="flex items-center before:flex-1 before:border-t before:border-[#D7D7D7] before:mt-0.5 after:flex-1 after:border-t after:border-[#D7D7D7] after:mt-0.5 mt-4">
          <p className="text-center text-[#4F4F4F] text-xs mx-4 mb-0">OR</p>
        </div>

        <div className="flex items-center justify-center my-2 gap-3 flex-wrap">
          <SocialLogin />
        </div> */}

        <div className="mt-3 text-xs pt-3 text-left text-black">
          <p>
            By signing up, you acknowledge that you have read and understood,
            and agree to our{' '}
            <Link href="/" className="underline">
              Terms
            </Link>{' '}
            and{' '}
            <Link href={'/'} className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </form>
    </>
  );
};

export default SignUpForm
