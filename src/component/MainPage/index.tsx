// Page.tsx
'use client';
import React, {useState} from 'react';

import MyCollapse from '@/component/Collapse'
import MyTextarea from '@/component/Textarea'
import RefreshButton from '@/component/RefreshButton';
import RefreshLoadingContext from '@/utils/refreshContext';


const MainPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <RefreshLoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
            <MyTextarea></MyTextarea>
            <RefreshButton ></RefreshButton>
            <MyCollapse />
        </RefreshLoadingContext.Provider>
    )
 }

export default MainPage;
