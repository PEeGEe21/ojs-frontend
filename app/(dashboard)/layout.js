import React from 'react'
import MainLayout from '../components/Dashboard/MainLayout';

const layout = ({children}) => {
  return (
    <>
      <div className="h-screen flex flex-row justify-start bg-[#F3F4F6]">
        <MainLayout>
          {children}
        </MainLayout>
      </div>
    </>
  )
}

export default layout
