

import React, { useEffect, useContext, useState, use } from 'react';
import useSWR, {preload} from 'swr'
import { Collapse } from 'antd';
import MySkeleton from '../Skeleton';
import MyCard from '@/app/MainPage/component/Card';
import fetchUtils from '@/api/fetch';
import RefreshLoadingContext from '@/utils/refreshContext';
import deleteFromClipboard from '@/api/deleteItem';

preload('clip', fetchUtils.fetchClipboardItems);

const MyCollapse: React.FC = () => { 
    const { isLoading, setLoading, data, setData } = useContext(RefreshLoadingContext);
    const {data: swrdata, error} = useSWR('clip', fetchUtils.fetchClipboardItems); // the first argument is the key for the cache cannot be null
    const [useSWRData, setUseSWRData] = useState(false);
    if (error) { 
        console.log(error);
    }

    const clickDelete = (dateTime: string, childIndex: number) => { 
        if (!data) { 
            return
        }
        console.log(dateTime, childIndex)
        var index = data.findIndex((item) => item.label == dateTime);
        var length = data[index].children.length;
        var new_child_index = length - childIndex - 1;

        deleteFromClipboard(dateTime, new_child_index).then((res) => { 
            var new_data = [...data];
            

            console.log(index)
            new_data[index].children.splice(childIndex, 1);
            if (new_data[index].children.length == 0) { 
                new_data.splice(index, 1);
            }
            setData(new_data)
        })
        

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
            
            children: item.children.map((child, childIndex) => (
                <MyCard key={child.key} content={child.content} childIndex={childIndex} dateTime={ item.label } onDelete={(dateTime: string, index: number) => clickDelete(dateTime, index)} />
            ))
          }))}
      />
    );
};

export default MyCollapse;