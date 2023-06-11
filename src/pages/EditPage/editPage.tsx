import React, { useState, useEffect } from "react"
import styles from "./editPage.module.css"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import EditPageSelect from "./editPageSelect"
import { Button, Input, Form, Modal } from "antd"
import { useNavigate, useLocation } from "react-router-dom"
import { Store } from "antd/lib/form/interface"
import { userArticle } from "../../api"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"

const editPage: React.FC = () => {
  const [content, setContent] = useState("")
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const editPost = location.state.post

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
  }

  useEffect(() => {
    if (editPost) {
      form.setFieldsValue({
        title: editPost.title,
        content: editPost.content,
        region: editPost.region,
        period: editPost.period,
        price: editPost.price,
        gender: editPost.gender,
      })
      setContent(editPost.content)
    }
  }, [editPost])

  const handleChange = (
    content: string,
    delta: any,
    source: any,
    editor: any,
  ) => {
    setContent(content)
  }

  const userToken = useSelector((state: RootState) => state.user.data.token)

  const onFinish = async (values: Store) => {
    try {
      const response = await fetch(`${userArticle}/${editPost.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken.atk.toString(),
        },
        body: JSON.stringify(values), // values를 JSON 형식으로 변환
      })

      if (!response.ok) {
        console.log(response)
      } else {
        navigate("/RoomMate")
        Modal.success({
          title: "게시글 수정 완료",
          content: "게시글 수정이 완료되었습니다!",
        })
      }
    } catch (error) {
      console.error("Error:", error)
      Modal.error({
        title: "서버 오류",
        content: "게시글을 서버에 전송하는데 실패했습니다.",
      })
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
    Modal.error({
      title: "입력 오류",
      content: "모든 입력을 완료해 주세요.",
    })
  }

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
        <EditPageSelect form={form} />
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
            수정
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default editPage
