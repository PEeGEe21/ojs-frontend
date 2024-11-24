"use client"
import React, { useState, useEffect, useContext } from 'react'
import JournalNotify from '../JournalNotify'
import { JournalContext } from '../../utils/journalContext';
import { useRouter, usePathname } from 'next/navigation';

const MainLayout = ({children}) => {
    const { journals } = useContext(JournalContext);
    const [user, setUser] = useState(null);
    const [loading, setIsLoading] = useState(false)
    const pathname = usePathname();

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

    return (
        <>
            <JournalNotify role="admin"/>
            {(journals.length > 0 || pathname === '/admin/settings' || pathname.startsWith('/admin/settings/')) && (
                <div>
                    {children}
                </div>
            )}

        </>
    )
}

export default MainLayout
