'use client'
import React from 'react'
import { Toaster } from 'react-hot-toast'
// import { LoginForm } from '@/app/components/Forms/LoginForm'
import Link from 'next/link';
import LoginForm from '../../Forms/LoginForm';


const LoginPage = () => {
  return (
    <div>
      <Toaster />
      {/* bg-[#1f2124] */}
      <div className=" shadow-slate-300 shadow-lg rounded-md">
        <div className="bg-white text-gray-700 px-8 pt-8 pb-4 rounded-radiusLarge shadowLarge">
          <LoginForm />
        </div>
        <div className="px-8 py-4">
          <div className="flex items-center justify-between text-[#000]">
            <p className="text-sm ">
              Dont have an account?{' '}
              <Link href="/auth/signup" className="underline text-[#013434]">
                Sign Up
              </Link>
            </p>
            <a href="" className="underline text-sm ">
              Forgot Password?
            </a>
          </div>
          {/* <p>Having Issues? <a href=''>Send us a mail</a></p> */}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
