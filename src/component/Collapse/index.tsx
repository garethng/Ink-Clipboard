'use client';

import React, {  useState, useEffect,  createContext, useContext } from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import MyCard from '@/component/Card';
import axios from 'axios';
import MySkeleton from '@/component/Skeleton';
import fetchUtils from '@/utils/fetch';
import RefreshLoadingContext from '@/utils/refreshContext';

const MyCollapse: React.FC = () => { 
    const { isLoading, setLoading } = useContext(RefreshLoadingContext);

    const [data, setData] = useState<{ key: string; label: string; children: React.ReactElement[] }[] | null>(null);

    

    useEffect(() => {
        if (isLoading || data === null) {
            fetchUtils.fetchClipboardItems().then(items => {
                var groups = fetchUtils.groupByData(items.data);
                var cps = []
                var index = 1
                console.log(groups);
                for (const group in groups) {
                    cps.push({
                        key: index.toString(),
                        label: group,
                        children: groups[group].map((item) => {
                            return <MyCard key={item} content={item} />
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
       
    }, [data, isLoading, setLoading]);
    

    if (isLoading || data === null) {
        return <MySkeleton></MySkeleton>;
    }
    

    return (
        <Collapse items={data} defaultActiveKey="1" className="max-w-[400px]"/>
    );
};

export default MyCollapse;
