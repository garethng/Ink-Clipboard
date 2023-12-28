

import React, { useEffect, useContext, useState, use } from 'react';
import useSWR, {preload} from 'swr'
import { Collapse } from 'antd';
import MySkeleton from '../Skeleton';
import MyCard from '@/app/MainPage/component/Card';
import fetchUtils from '@/api/fetch';
import RefreshLoadingContext from '@/utils/refreshContext';
import deleteFromClipboard from '@/api/deleteItem';

preload('clip', fetchUtils.fetchClipboardData);

const MyCollapse: React.FC = () => { 
    const { isLoading, setLoading, data, setData } = useContext(RefreshLoadingContext);
    const {data: swrdata, error} = useSWR('clip', fetchUtils.fetchClipboardData); // the first argument is the key for the cache cannot be null
    const [useSWRData, setUseSWRData] = useState(false);
    if (error) { 
        console.error(error);
    }

    const clickDelete = (dateTime: string, childIndex: number) => { 
        if (!data) { 
            return
        }
        console.log(data);
        var index = data.findIndex((item) => item.label == dateTime);
        var new_child_index = data[index].children[childIndex].key;
        deleteFromClipboard(new_child_index).then((res) => { 
            var new_data = [...data];

            new_data[index].children.splice(childIndex, 1);
            if (new_data[index].children.length == 0) { 
                new_data.splice(index, 1);
            }
            setData(new_data)
        })
        

    }

    

    useEffect(() => { 
        var groups = null;
        
        if (!useSWRData && data == null && swrdata) {
            groups = fetchUtils.groupByData(swrdata.data);
            setData(groups);
            setLoading(false);
            setUseSWRData(true)
        } else if (isLoading) { 
            
            fetchUtils.fetchClipboardData().then((res) => { 
                groups = fetchUtils.groupByData(res.data);
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
            className="w-full flex flex-col gap-1 max-w-[400px] mb-4"
        
        items={(data || []).map(item => ({
            key: item.key,
            header: item.label,
            label: item.label,// This sets the label for the panel
            
            children: item.children.map((child, childIndex) => (
                <MyCard key={child.key} content={child.content} childIndex={childIndex} dateTime={ item.label } onDelete={(dateTime: string, index: number) => clickDelete(dateTime, index)} />
            ))
          }))}
      />
    );
};

export default MyCollapse;