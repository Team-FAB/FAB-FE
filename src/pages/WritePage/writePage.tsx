import React, { useState } from "react";
import styles from "./writePage.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import WritePageSelect from "./writePageSelect";
import { Button, Input, Form, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { Store } from "antd/lib/form/interface";

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
      const response = await fetch(
        "https://2d22-211-211-141-39.ngrok-free.app/api/article",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "JWT",
          },
          body: JSON.stringify(values), // values를 JSON 형식으로 변환
        }
      );
      console.log(values);
      if (!response.ok) {
        // 만약 응답이 정상적이지 않다면, 에러 처리

        console.log(response);
      }

      const resData = await response.json(); // JSON 형식으로 응답을 파싱

      if (resData.message === "게시글 작성 완료") {
        console.log("Success:", values);
        navigate("/RoomMate");
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
        <WritePageSelect form = {form}/>
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
