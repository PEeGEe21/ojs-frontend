import Navbar from '@/app/components/Dashboard/Navbar';
import Sidebar from '@/app/components/Dashboard/Sidebar';
import React from 'react'

const layout = ({children}) => {
    const loggedInUser = null;
    const isLoading = false;
  return (
    <>
      <div className="h-screen flex flex-row justify-start bg-[#F3F4F6]">
        <Sidebar user={loggedInUser} />
        <div className="flex-1 h-full overflow-y-auto scrollbar-change">
          <main className="main-wrapper">
            <Navbar user={loggedInUser} isLoadingState={isLoading} />

            <div className="max-w-7xl h-full py-2 lg:py-4 px-4 lg:px-4 mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default layout
