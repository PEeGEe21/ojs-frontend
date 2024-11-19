import React from 'react'
import MainLayout from '../../components/AdminLayout/MainLayout';

const layout = ({children}) => {
  return (
    <>
      <div className="">
        <MainLayout>
          {children}
        </MainLayout>
      </div>
    </>
  )
}

export default layout
