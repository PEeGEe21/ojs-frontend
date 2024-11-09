'use client'
import React, {useEffect, useState} from 'react'
import MainLayout from '../components/Dashboard/MainLayout';
import { useRouter } from 'next/navigation';

const layout = ({children}) => {
  const [user, setUser] = useState(null)
  const { push } = useRouter();

  useEffect(()=>{
      const getUser = async ()=>{
          try{
            // console.log(localStorage.getItem('ojs-user'), 'localStorage.getItem('ojs-user')')
              if (localStorage.getItem('ojs-user')){
                  const data = await JSON.parse(
                      localStorage.getItem("ojs-user")
                  );
                  setUser(data)
              } else{
                push('/auth/login')
              }
          }catch(err){}
      };
      getUser()
  }, [])

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
