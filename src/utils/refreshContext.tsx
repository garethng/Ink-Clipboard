import { createContext, ReactElement } from 'react';
import React from 'react';

interface DataType {
    key: string;
    label: string;
    children: {"key": number, "content": string}[];
  }

const RefreshLoadingContext = createContext({
    isLoading: false,
    setLoading: (loading: boolean) => { },
    data:[] as DataType[] | null,
    setData: (data: DataType[]) => { }

});
  
export default RefreshLoadingContext;