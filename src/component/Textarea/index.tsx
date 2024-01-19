'use client';
import React, { useContext } from "react";
import {Textarea, Button} from "@nextui-org/react";
import addClipboardItem from "@/sevices/addItem";
import RefreshLoadingContext from '@/lib/refreshloadingcontext';
import MyCard from "../Card";
import getFormattedDate from "@/lib/dateFormat";


export default function MyTextarea() {
  const [value, setValue] = React.useState("");
  const { isLoading, setLoading, data, setData } = useContext(RefreshLoadingContext);
  
  const clickSubmit = (content: string) => { 
    addClipboardItem(value).then((res) => {  
      if (res.status == 200) {
        var now = getFormattedDate(new Date());
        var noteid = res.data["nodeid"];
        if (data) {
          var new_data = [...data];
          if (new_data[0].label == now) {
            new_data[0].children.unshift( {"key":noteid, "content": value})
            setData(new_data)
          } else {

            var new_item = { key: "1", label: now, children: [{ key: noteid, content: value }] }
            new_data.unshift(new_item)
            setData(new_data)
          }
          
        } else {

          setData([{ key: "1", label: now, children: [{ key: noteid, content: value }] }])
          
        }
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
