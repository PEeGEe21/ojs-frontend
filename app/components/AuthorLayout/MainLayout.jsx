"use client"
import React, { useState, useEffect, useContext } from 'react'
import JournalNotify from '../JournalNotify'
import { JournalContext } from '../../utils/journalContext';

const MainLayout = ({children}) => {
    const { journals } = useContext(JournalContext);
    const [user, setUser] = useState(null);

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
            <JournalNotify role="author"/>
            {journals.length > 0 &&(
                <div>
                    {children}
                </div>
            )}
        </>
    )
}

export default MainLayout
