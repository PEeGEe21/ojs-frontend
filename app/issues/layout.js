'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import { handleRedirect } from '../lib/utilFunctions';

const IssueLayout = ({children}) => {
    const [user, setUser] = useState(null)    
    const [loading, setLoading] = useState(true)
    const { push } = useRouter();

    useEffect(()=>{
        setLoading(true);
        const getUser = async ()=>{
            // Start loading
            try{
                if (localStorage.getItem('ojs-user')){
                    const data = await JSON.parse(
                        localStorage.getItem("ojs-user")
                    );
                    setUser(data)
                } else{
                    router.push("/auth/login")
                }
            }catch(err){}
        };
        getUser()
    }, [])

    return (
        <>
            <Navbar user={user}/>
                {children}
            <Footer/>
        </>
    )
}

export default IssueLayout
