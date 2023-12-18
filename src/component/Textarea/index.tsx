'use client';
import React from "react";
import {Textarea, Button} from "@nextui-org/react";

export default function MyTextarea() {
  const [value, setValue] = React.useState("");

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
          <Button isDisabled={value.length == 0} className="mb-2">Submit</Button>
          
      {/* <p className="text-default-500 text-small">Textarea value: {value}</p> */}
    </div>
  );
}
