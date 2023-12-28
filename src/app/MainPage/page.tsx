// page.tsx

'use client';
import React, {useState, Suspense} from 'react';

import MySkeleton from './component/Skeleton';

import MyCollapse from '@/app/MainPage/component/Collapse'
import MyTextarea from '@/app/MainPage/component/Textarea'
import RefreshButton from '@/app/MainPage/component/RefreshButton';
import RefreshLoadingContext from '@/utils/refreshContext';


const MainPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState < { key: string; label: string; children: {key:string, content: string}[] }[] | null>(null)
    return (
        
        <RefreshLoadingContext.Provider value={{ isLoading, setLoading: setIsLoading, data, setData: setData }}>
            <MyTextarea></MyTextarea>
            <RefreshButton ></RefreshButton>
            <div className="sm:py-[10vh] flex flex-col items-center justify-center max-w-[400px] w-full">
                <MyCollapse />
            </div>
            
            
            
        </RefreshLoadingContext.Provider>
        
    )
 }

export default MainPage;
