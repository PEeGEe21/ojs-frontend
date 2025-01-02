import React from 'react'
import MainProfileLayout from '../components/ProfileLayout/MainProfileLayout'

const layout = ({children}) => {
  return (
    <>
      <div className="h-screen flex flex-row justify-start bg-[#F3F4F6]">
        <MainProfileLayout>
          {children}
        </MainProfileLayout>
      </div>
    </>
  )
}

export default layout
