'use client';

import { Danger } from 'iconsax-react'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { JournalContext } from '../utils/journalContext';

const JournalNotify = ({role}) => {
    const [loading, setIsLoading] = useState(true)
    const { journals } = useContext(JournalContext);
    // if (!journals) return null;
    useEffect(() => {
        setTimeout(() =>{
            setIsLoading(false)
        }, 300)
    }, [journals] )

    return (
        <>
            {!loading && journals && journals?.length < 1 ? 
                <div className="py-[18px] px-6 bg-red-200 rounded-lg mt-2 mb-4">
                    <div className="flex items-start w-full gap-2 text-red-500">
                        <span>
                            <Danger size={22} />
                        </span>
                        <p className="text-sm text-red-500">
                            {role == 'admin' && <>No Journal has been created. Please Create One. <Link href={'/admin/settings/journal'} className='underline underline-offset-1'>Create Journal</Link></>}
                            {role == 'author' && <>No Journal has been created. Please Contact the Admin.</>}
                        </p>
                    </div>
                </div>
            : ''}
        </>
    )
}

export default JournalNotify
