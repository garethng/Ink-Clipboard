

import React, { useEffect, useContext, useState, use } from 'react';
import useSWR, {preload} from 'swr'
import { Collapse } from 'antd';
import MySkeleton from '../Skeleton';
import MyCard from '@/app/MainPage/component/Card';
import fetchUtils from '@/api/fetch';
import RefreshLoadingContext from '@/utils/refreshContext';


preload('clip', fetchUtils.fetchClipboardItems);


const MyCollapse: React.FC = () => { 
    const { isLoading, setLoading, data, setData } = useContext(RefreshLoadingContext);
    const {data: swrdata, error} = useSWR('clip', fetchUtils.fetchClipboardItems); // the first argument is the key for the cache cannot be null
    const [useSWRData, setUseSWRData] = useState(false);
    if (error) { 
        console.log(error);
    }


    
    console.log(useSWRData)

    

    useEffect(() => { 
        var groups = null;
        
        if (!useSWRData && data == null && swrdata) {
            groups = fetchUtils.groupByData(swrdata.data);
            setData(groups);
            setLoading(false);
            setUseSWRData(true)
        } else if (isLoading) { 
            
            fetchUtils.fetchClipboardItems().then((res) => { 
                groups = fetchUtils.groupByData(res.data);
                console.log(groups)
                setData(groups);
                setLoading(false);
            })
        }
    }, [isLoading, swrdata, useSWRData, data, setData, setLoading])
    if (!swrdata) { 
        return <MySkeleton />
    } 
    return (
        <Collapse 
        defaultActiveKey="1" 
            className="max-w-[400px]"
        
        items={(data || []).map(item => ({
            key: item.key,
            header: item.label,
            label: item.label,// This sets the label for the panel
            children: item.children.map(child => (
              <MyCard key={child.key} content={child.content} />
            ))
          }))}
      />
    );
};

export default MyCollapse;