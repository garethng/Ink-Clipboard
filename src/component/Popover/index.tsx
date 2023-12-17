import React, { FC } from "react";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";

function clickCopy(content: string) { 
  navigator.clipboard.writeText(content); 
}

const MyPopover: FC<{ content: string }> = ({ content }) => {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        
        <Button onClick={() => clickCopy(content)}>Copy</Button>
      
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Copied</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default MyPopover;