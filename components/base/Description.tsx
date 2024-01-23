import { IBaseDescription } from "@/model/base.model";
import { Editor } from "primereact/editor";
import React, { useEffect, useState } from "react";

function Desctiption(props: IBaseDescription) {
  const { value, onChange, placeholder } = props;
  const [text, setText] = useState(value);

  const changeDescription = (e: any) => {
    setText(e.htmlValue);
    onChange?.(e.htmlValue);
  };

  useEffect(() => {
    if (value) {
      setText(value);
    }
  }, [value]);
  return (
    <Editor
      value={text}
      placeholder={placeholder}
      onTextChange={(e) => changeDescription(e)}
      style={{ height: "220px" }}
    />
  );
}

export default Desctiption;
