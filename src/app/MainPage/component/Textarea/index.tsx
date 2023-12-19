'use client';
import React, { useContext } from "react";
import {Textarea, Button} from "@nextui-org/react";
import addClipboardItem from "@/api/addItem";
import RefreshLoadingContext from "@/utils/refreshContext";
import MyCard from "../Card";
import getFormattedDate from "@/utils/dateFormat";


export default function MyTextarea() {
  const [value, setValue] = React.useState("");
  const { isLoading, setLoading, data, setData } = useContext(RefreshLoadingContext);
  
  const clickSubmit = (content: string) => { 
    addClipboardItem(value).then((res) => {  
      if (res.status == 200) {
        var now = getFormattedDate(new Date());
        
        if (data) {
          var new_data = [...data];
          if (new_data[0].label == now) {
            console.log(2)
            console.log(new_data[0].children)
            new_data[0].children.unshift( {"key": new_data[0].children.length+1, "content": value})
            setData(new_data)
          } else {
            console.log(3)
            var new_item = { key: "1", label: now, children: [{ key: 1, content: value }] }
            new_data.unshift(new_item)
            setData(new_data)
          }
          
        } else {
          console.log(4)
          setData([{ key: "1", label: now, children: [{ key: 1, content: value }] }])
          
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
