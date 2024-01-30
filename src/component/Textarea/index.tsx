'use client';
import React, { useContext } from "react";
import {Textarea, Button} from "@nextui-org/react";

import RefreshLoadingContext from '@/lib/refreshloadingcontext';
import MyCard from "../Card";
import getFormattedDate from "@/lib/dateFormat";


const fetcher = (url: string, content: string, created_at: string) => fetch(url, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    content,
    created_at
  })
}).then((res) => res);

function getCurrentDate() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // 获取当前时间
  const now = new Date();
  // 将now转换为当前时区的时间
  // get locale
  // const locale = navigator.language
  
  const year = now.getFullYear().toString()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  // 根据用户的时区将日期对象转换为字符串
  const now_date_str = `${year}-${month}-${day}`
  return now_date_str
}

export default function MyTextarea() {
  const [value, setValue] = React.useState("");
  const { isLoading, setLoading, data, setData } = useContext(RefreshLoadingContext);
  // 获取用户的实际时区
 
  const clickSubmit = (content: string) => { 
    const current_date = getCurrentDate()
    fetcher("/api/add-item", content, current_date).then((res) => {  
      if (res.status == 200) {
        var now = getFormattedDate(new Date());
        res.json().then((res) => { 
          var noteid = res;
          if (data) {
            var new_data = [...data];
            if (new_data[0].label == now) {
              new_data[0].children.unshift( {"key":noteid, "content": value, "actual_time": new Date()})
              setData(new_data)
            } else {
  
              var new_item = { key: "1", label: now, children: [{ key: noteid, content: value, "actual_time": new Date() }] }
              new_data.unshift(new_item)
              setData(new_data)
            }
            
          } else {
            console.log(value)
            setData([{ key: "1", label: now, children: [{ key: noteid, content: value, "actual_time": new Date() }] }])
            
          }
        });
        
        setValue("");
      }
     })
  }
  return (
    <div className="w-full flex flex-col gap-1 max-w-[400px] mb-4">
      <Textarea
        variant="underlined"
        placeholder="Paste From Clipboard"
        value={value}
        onValueChange={setValue}
              className="mb-4"
              minRows={1}
      />
          <Button isDisabled={value.length === 0} className="mb-2" onClick={() => clickSubmit(value)}>Submit</Button>
          
      {/* <p className="text-default-500 text-small">Textarea value: {value}</p> */}
    </div>
  );
}
