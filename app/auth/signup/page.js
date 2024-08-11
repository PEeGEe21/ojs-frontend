import SignUpPage from '@/app/components/Auth/SIgnUp/SignUpPage';
import React from 'react'

export const metadata = {
    title: 'Open Journal System - SignUp',
    metadataBase: new URL('https://google.com'),
    description:
      'Open Journal System!',
    keyword: [
      'OJS',
      'Journal',
      'Open Journal System',
    ]
};

const SignUp = () => {
  return (
    <>
        <SignUpPage/>
    </>
  )
}

export default SignUp
