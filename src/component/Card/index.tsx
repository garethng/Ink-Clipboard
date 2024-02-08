import React, { FC } from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button} from "@nextui-org/react";
import MyPopover from "../Popover";

function clickCopy(content: string) { 
  navigator.clipboard.writeText(content); 
}

const MyCard: FC<{ content: string, childIndex: number, dateTime: string, onDelete: (dataTime: string, index: number) => void }> = ({ content, childIndex, dateTime, onDelete }) => {
  return (

    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Card title!</h2>
        <p>{ content }</p>
        <div className="card-actions justify-end">
          <button className="btn btn-success"  onClick={() => clickCopy(content)}>Copy</button>
          <button className="btn btn-error"  onClick={() => onDelete(dateTime, childIndex)}>Delete</button>
        </div>
      </div>
    </div>
    // <Card className="max-w-[400px] mb-4">
    //   <CardHeader className="flex gap-3">
    //   <p>{ content }</p>
    //   </CardHeader>

    //   <CardBody>
    //     <div className="flex gap-4 items-center">
    //       <MyPopover content={content} ></MyPopover>
          

         
       
    //       <Button color="danger" variant="bordered" onClick={() => onDelete(dateTime, childIndex)}>
    //       Delete
    //     </Button>
    //   </div>
        
    //   </CardBody>
    //   <Divider/>
      
    // </Card>
  );
}

export default MyCard;