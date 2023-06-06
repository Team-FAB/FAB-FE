import React, { useState } from "react";
import styles from "./writePage.module.css"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import WritePageSelect from "./writePageSelect";
import { Button, Input } from "antd";

const WritePage: React.FC = () => {
  const [content, setContent] = useState("");

  const modules = {
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
    <div className={styles.container}>
      <div className={styles.title}>게시글 작성 ✏️</div>
      <Input placeholder="제목" className={styles.titleInput}></Input>
      <div className={styles.require}>* 필수 입력 항목</div>
      <WritePageSelect/>
      <ReactQuill theme="snow" modules={modules} onChange={handleChange} className={styles.textArea}/>
      <div className={styles.buttonContainer}><Button className={styles.submitButton} type="primary">등록</Button></div>
    </div>
  );
};

export default WritePage;
