'use client';
import Link from 'next/link';
import React, { useEffect, useState, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
// import { host } from '../routes';
import SocialLogin from './FormComponents/SocialLogin';
import { LoaderIcon } from '../IconComponent';
import setAuthToken from '../../lib/setAuthToken';
import { hostUrl, ToasterAlert } from '../../lib/utilFunctions';

const LoginForm = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email'));
  const [password, setPassword] = useState('');
  const newCustomer = searchParams.get('new');
  const [error, setError] = useState(null);
  const [errMessage, setErrMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { push } = useRouter();

  const loginUser = async (e) => {
    setLoading(true);
    e.preventDefault();

    axios
      .post(`${hostUrl}auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          // toast.success(res.data.message, 'success');
          let token = res?.data?.access_token;
          let user = res?.data?.user;
          // const role = res?.data?.user?.role;
          localStorage.setItem('accessOJSUserToken', token);
          localStorage.setItem('ojs-user', JSON.stringify(user));
          setAuthToken(token);
          setTimeout(() => {
            if(user?.defaultRole?.id == 1) {
              push(`/admin/submissions`);
            }
            if(user?.defaultRole?.id == 3) {
              push(`/author/submissions`);
            }
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
          // ToasterAlert(message, 'error');
          toast.error(message);

        }

        setLoading(false);
      })
      .catch((err) => {
        console.log('err', err);
        setError(true);
        setErrMessage(err?.response?.data?.message);
        toast.error(err?.response?.data?.message);

        // ToasterAlert(err?.response?.data?.message, 'error');
        setLoading(false);

        setTimeout(()=>{
          setError(false);
        }, 6000)
      });
  };

  return (
    <>
      <form onSubmit={loginUser}>
        <div className="mb-6">
          <h3 className="text-2xl text-center font-bold text-[#000]">
            To access our <Link className="underline" href={'/'}> Open Journal System</Link>,
            kindly Login.
          </h3>
        </div>
        {newCustomer && !error ? (
          <div
            className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mb-3"
            role="alert"
          >
            <div className="flex">
              <div>
                <p className="font-bold">Account was successfully created</p>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5"
            role="alert"
          >
            {errMessage && (
              <ul className="text-sm list-disc ml-5">
                <li>{errMessage}</li>
              </ul>
            )}
          </div>
        )}
        <div className="pt-5">
          <div className="mb-6 flex flex-col gap-1 relative">
            <input
              type="email"
              id="email"
              className="block px-2 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer border focus:border-gray-600 h-10 rounded focus:outline-0"
              placeholder=" "
              name="email"
              required
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              min="3"
              // autoComplete="off"
            />

            <label
              htmlFor="email"
              className="absolute text-sm  duration-100 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2   peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 rounded peer-focus:bg-white  bg-white  cursor-text"
            >
              Email
            </label>
          </div>

          <div className="mb-6 flex flex-col gap-1 relative">
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              // pattern="[a-zA-Z0-9]+"
              className="block px-2 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer border focus:border-gray-600 h-10 rounded focus:outline-0"
              placeholder=" "
            />

            <label
              htmlFor="password"
              className="absolute text-sm  duration-100 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:bg-white  bg-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 rounded cursor-text"
            >
              Password
            </label>
          </div>
        </div>
          <button
            // type="submit"
            onClick={(e) => loginUser}
            className="w-full h-50 bg-[#013434] py-3 px-3 mt-2 hover:shadow-md transition-all duration-300 ease rounded text-sm text-white flex items-center justify-center"
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
              'Login'
            )}
          </button>

        {/* <div className="flex items-center before:flex-1 before:border-t before:border-[#D7D7D7] before:mt-0.5 after:flex-1 after:border-t after:border-[#D7D7D7] after:mt-0.5 mt-4">
          <p className="text-center text-[#4F4F4F] text-xs mx-4 mb-0">OR</p>
        </div>

        <div className="flex items-center justify-center my-2 gap-3 flex-wrap">
          <SocialLogin />
        </div> */}

        <div className="mt-3 text-xs pt-3 text-center">
          <p>
            Our{' '}
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

export default LoginForm;
