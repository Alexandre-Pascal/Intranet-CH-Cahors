"use client";
import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TextEditor() {
  const [value, setValue] = useState("");
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }),[]);

  var toolbarOptions = [ ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "image", "video", "link"], // blocks
    [{ "header": 1 }, { "header": 2 }], // custom button values
    [{ "list": "ordered" }, { "list": "bullet" }],
    [{ "script": "sub" }, { "script": "super" }], // superscript/subscript
    [{ "indent": "-1" }, { "indent": "+1" }], // outdent/indent
    [{ "direction": "rtl" }], // text direction
    [{ "size": ["small", false, "large", "huge"] }], // custom dropdown
    [{ "color": [] }, { "background": [] }], // dropdown with defaults from theme
    [{ "font": [] }],
    [{ "align": [] }],
    ["clean"], // remove formatting button
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return <ReactQuill modules={modules} theme="snow" value={value} onChange={setValue} />;
}