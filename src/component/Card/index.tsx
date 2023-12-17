import React, { FC } from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button} from "@nextui-org/react";
import MyPopover from "../Popover";
function clickCopy(content: string) { 
  
}

const MyCard: FC<{ content: string }> = ({ content }) => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
      <p>{ content }</p>
      </CardHeader>

      <CardBody>
        <div className="flex gap-4 items-center">
          <MyPopover content={content} ></MyPopover>
          

         
       
        <Button color="danger" variant="bordered" >
          Delete
        </Button>
      </div>
        
      </CardBody>
      <Divider/>
      
    </Card>
  );
}

export default MyCard;