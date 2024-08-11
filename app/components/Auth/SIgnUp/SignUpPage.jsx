'use client'
import React from 'react'
import { Toaster } from 'react-hot-toast'
// import { LoginForm } from '@/app/components/Forms/LoginForm'
import Link from 'next/link';
import SignUpForm from '../../Forms/SignUpForm';


const SignUpPage = () => {
  return (
    <div>
        <Toaster />

        <div className="shadow-slate-300 shadow-lg rounded-md">
            <div className="bg-white text-gray-700 px-8 pt-8 pb-4 rounded-radiusLarge shadowLarge">
                <SignUpForm />
            </div>
            <div className="px-8 py-4">
                <div className="flex items-center justify-between text-[#000]">
                    <p className="text-sm">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="underline text-[#013434]">
                            Sign in
                        </Link>
                    </p>
                {/* <a href='' className='underline text-sm text-[#6c7293]'>Forgot Password?</a> */}
                </div>
                {/* <p>Having Issues? <a href=''>Send us a mail</a></p> */}
            </div>
        </div>
    </div>
  )
}

export default SignUpPage
