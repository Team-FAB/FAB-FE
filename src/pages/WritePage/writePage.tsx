import React, { useState } from "react";
import styles from "./writePage.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import WritePageSelect from "./writePageSelect";
import { Button, Input, Form, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { Store } from "antd/lib/form/interface";
import { userArticle } from "../../api";

const WritePage: React.FC = () => {
  const [content, setContent] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
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

  const onFinish = async (values: Store) => {
    try {
      const response = await fetch(userArticle, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0OUBnbWFpbC5jb20iLCJyb2xlcyI6W10sImlhdCI6MTY4NjIxNTU1MCwiZXhwIjoxNjg2MjE5MTUwfQ.XwPQ4olBb1zL6Sd9Cb7P6_J-5lXt3IZh5rVmH0GrRts",
        },
        body: JSON.stringify(values), // values를 JSON 형식으로 변환
      });

      if (!response.ok) {
        console.log(response);
      } else {
        navigate("/RoomMate");
        Modal.success({
          title: "게시글 작성 완료",
          content: "게시글 작성이 완료되었습니다!",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Modal.error({
        title: "서버 오류",
        content: "게시글을 서버에 전송하는데 실패했습니다.",
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    Modal.error({
      title: "입력 오류",
      content: "모든 입력을 완료해 주세요.",
    });
  };

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
      <div className={styles.container}>
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "제목을 입력해 주세요.",
            },
          ]}
        >
          <Input placeholder="제목" className={styles.titleInput} />
        </Form.Item>
        <div className={styles.require}>* 필수 입력 항목</div>
        <WritePageSelect form={form} />
        <Form.Item name="content">
          <ReactQuill
            theme="snow"
            modules={modules}
            onChange={handleChange}
            className={styles.textArea}
          />
        </Form.Item>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.submitButton}
            type="primary"
            htmlType="submit"
          >
            등록
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default WritePage;
