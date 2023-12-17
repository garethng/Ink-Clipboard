'use client';

import React, {  useState, useEffect } from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import MyCard from './Card';
import axios from 'axios';
import MySkeleton from '@/component/Skeleton';
import fetchUtils from '@/utils/fetch';

const App: React.FC = () => { 
    const [data, setData] = useState<{ key: string; label: string; children: React.ReactElement[] }[] | null>(null);

    useEffect(() => {
        fetchUtils.fetchClipboardItems().then(items => {
            console.log(items.data);
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
        }).then(data => setData(data));
    }, []);
    
    

    if (data === null) {
        return <MySkeleton></MySkeleton>;
      }
    

    return (
        <Collapse items={data} defaultActiveKey="1" />
    );
};

export default App;
