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
    const [data, setData] = useState < { key: string; label: string; children: {key:number, content: string}[] }[] | null>(null)
    return (
        <RefreshLoadingContext.Provider value={{ isLoading, setLoading: setIsLoading, data, setData: setData }}>
            <MyTextarea></MyTextarea>
            <RefreshButton ></RefreshButton>
            
            <MyCollapse />
            
            
        </RefreshLoadingContext.Provider>
    )
 }

export default MainPage;
