import LoginPage from '../../components/Auth/Login/LoginPage'
import React from 'react'
export const metadata = {
    title: 'Open Journal System - Login',
    metadataBase: new URL('https://google.com'),
    description:
      'Open Journal System!',
    keyword: [
      'OJS',
      'Journal',
      'Open Journal System',
    ]
};

const Login = () => {
  return (
    <LoginPage/>
  )
}

export default Login
