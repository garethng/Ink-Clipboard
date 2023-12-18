'use client';

import React, { useEffect, useContext } from 'react';
import { Collapse } from 'antd';
import MyCard from '@/component/Card';
import MySkeleton from '@/component/Skeleton';
import fetchUtils from '@/utils/fetch';
import RefreshLoadingContext from '@/utils/refreshContext';


const MyCollapse: React.FC = () => { 
    const { isLoading, setLoading, data, setData } = useContext(RefreshLoadingContext);

    useEffect(() => {
        console.log(data);
        if (isLoading || data === null) {
            fetchUtils.fetchClipboardItems().then(items => {
                var groups = fetchUtils.groupByData(items.data);
                var cps = []
                var index = 1
                
                for (const group in groups) {
                    cps.push({
                        key: index.toString(),
                        label: group,
                        children: groups[group].map((item, n_index) => {
                            return {"key": n_index, "content":item} 
                        }),
                    });
                    index += 1;
                }
                return cps;
            }).then(data => { 
                setData(data);
                setLoading(false);
            });
        }
       
    }, [data, isLoading, setData, setLoading]);
    

    if (isLoading || data === null) {
        return <MySkeleton></MySkeleton>;
    }
    

    return (
        <Collapse defaultActiveKey="1" className="max-w-[400px]">
            {data.map((item, index) => (
                <Collapse.Panel header={item.label} key={item.key}>
                    {item.children.map(child => (
                        <MyCard key={child.key} content={child.content} />
                    ))}
                </Collapse.Panel>
            ))}
        </Collapse>
    );
};

export default MyCollapse;
