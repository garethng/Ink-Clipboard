

import React, { useEffect, useContext, useState, use } from 'react';
import useSWR, {preload} from 'swr'
import { Collapse } from 'antd';
import MySkeleton from '../Skeleton';
import MyCard from '@/component/Card';
import fetchUtils from '@/sevices/fetch';
import RefreshLoadingContext from '@/lib/refreshloadingcontext';
import deleteFromClipboard from '@/sevices/deleteItem';

const fetcher = (url: string) => fetch(url, {method: "POST"}).then((res) => res.json());
preload('/api/get-clipboard', fetcher);

const deleter = (url: string, noteid: string) => fetch(url, {method: "POST", body: JSON.stringify({noteid})}).then((res) => res.json());

const MyCollapse: React.FC = () => { 
    const { isLoading, setLoading, data, setData } = useContext(RefreshLoadingContext);
    const {data: swrdata, error} = useSWR('/api/get-clipboard', fetcher); // the first argument is the key for the cache cannot be null
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
        
        deleter("/api/delete-item", new_child_index).then((res) => { 
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
            console.log("1")
            console.log(swrdata)
            groups = swrdata;
            
            setData(groups);
            setLoading(false);
            setUseSWRData(true)
        } else if (isLoading) { 
            
            fetcher("/api/get-clipboard").then((res) => { 
                groups = swrdata
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
        
            items={Array.isArray(data) ? data.map(item => ({
                key: item.key,
                header: item.label,
                label: item.label,// This sets the label for the panel,
                children: item.children.map((child, childIndex) => (
                    <MyCard key={child.key} content={child.content} childIndex={childIndex} dateTime={ item.label } onDelete={(dateTime: string, index: number) => clickDelete(dateTime, index)} />
                ))
            })) : []}
      />
    );
};

export default MyCollapse;