import React, { useState, useRef,useEffect } from "react";
import JoditEditor from "jodit-react";
import { Button } from "antd"; //version 4
import axios from "axios";

interface IProps {
  placeholder: string;
  isAdmin?: boolean;
}

const Rich = ({ placeholder, isAdmin }: IProps) => {
  const editor = useRef(null);
  const [content, setContent] = useState("<div>Deneme</div>");


  // TO DO : backendden geleni alan endpoint
  useEffect(() => {
    axios.get("")
    .then((res:any) => setContent(res.data)) //  TO DO : data . ? 
  .catch(err=>{
    console.log(err);
    
  })
  

  }, []);
  
  const [isEdit, setisEdit] = useState(false);
  const [current_name, setCurrent_name] = useState("Edit");

  const onEditHandler = (e: any) => {
    if (isEdit) {
      setisEdit(false);
      setCurrent_name("Edit");
    } else {
      setisEdit(true);
      setCurrent_name("Update");
      updateHandler();
    }
  };
  const onCancelHandler = (e: any) => {
    setisEdit(false);
    setCurrent_name("Edit");
    setContent("");
  };
  // TODO : ENDPOINT backendi update etmek için 
  const updateHandler = () => {
    const obj={
      content:content
    };
    axios.put("" , content )
    .then // endpoint buraya 
    console.log("Updated"); // TODO TOASTER
  };
  
  // if (!isAdmin) {
  //   console.log("Is admin false");
  // }

  return (
    <>
      {isAdmin && isAdmin ? (
        <div
          style={{
            display: "flex",
          }}
        >
          <Button type="primary" onClick={onEditHandler.bind(this)}>
            {current_name}
          </Button>
          <Button type="default" onClick={onCancelHandler}>
            Cancel
          </Button>
        </div>
      ) : null}
      {isEdit ? (
        <JoditEditor
          ref={editor}
          value={content}
          config={{ readonly: false }} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {
            setContent(newContent);

          }}
        />
      ) : (
       content
      )}
    </>
  );
};

export default Rich;
