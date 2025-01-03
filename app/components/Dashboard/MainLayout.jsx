"use client"
import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
// import Footer from './Footer'

const MainLayout = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(()=>{
        const getUser = async ()=>{
            try{
                if (localStorage.getItem('ojs-user')){
                    const data = await JSON.parse(
                        localStorage.getItem("ojs-user")
                    );
                    setUser(data)
                    
                }else{
                    router.push("/auth/login")
                }
                    
  
            }catch(err){}
        };
        getUser()
    }, [])


    const userRole = "admin"; 
    return (
        <>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} userRole={userRole} user={user} user_roles={user?.rolesIds}/>
            <div className="flex-1 h-full overflow-y-auto scrollbar-change">
                <main className="main-wrapper">
                    <Navbar  user={user} toggleSidebar={toggleSidebar} userRole={userRole}/>
                    <div className="max-w-7xl h-full py-2 lg:py-4 px-4 lg:px-4 mx-auto ">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}

export default MainLayout
