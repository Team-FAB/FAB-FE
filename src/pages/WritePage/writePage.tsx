import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill의 테마를 가져옵니다.

const WritePage: React.FC = () => {
  const [content, setContent] = useState("");

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const handleChange = (
    content: string,
    delta: any,
    source: any,
    editor: any
  ) => {
    setContent(content);
  };

  return (
    <div>
      <ReactQuill theme="snow" modules={modules} onChange={handleChange} />
      <button>등록</button>
    </div>
  );
};

export default WritePage;
