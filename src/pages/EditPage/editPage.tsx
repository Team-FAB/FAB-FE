import React, { useState, useEffect } from "react"
import styles from "./editPage.module.css"
import EditPageSelect from "./editPageSelect"
import { Button, Input, Form, Modal } from "antd"
import { useNavigate, useLocation } from "react-router-dom"
import { Store } from "antd/lib/form/interface"
import { userArticle } from "../../api"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import useFetch from "../../hooks/useFetch"

const editPage: React.FC = () => {
  const [userContent, setUserContent] = useState("")
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const editPost = location.state.post

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
      setUserContent(editPost.content)
    }
  }, [editPost])

  const userToken = useSelector((state: RootState) => state.user.data.token)

  const {
    isLoading,
    isSuccess,
    error,
    setUrl,
    setHeaders,
    setMethod,
    setBody,
  } = useFetch<unknown>("", "", {}, null)

  const onFinish = async (values: Store) => {
    setUrl(`/api/${userArticle}/${editPost.id}`)
    setMethod("PUT")
    setHeaders({
      "Content-Type": "application/json",
      Authorization: userToken.atk.toString(),
    })
    setBody(values)
  }

  useEffect(() => {
    if (!isLoading && isSuccess) {
      navigate("/RoomMate")
      Modal.success({
        title: "게시글 수정 완료",
        content: "게시글 수정이 완료되었습니다!",
      })
    } else if (!isLoading && error) {
      console.error("Error:", error)
      Modal.error({
        title: "서버 오류",
        content: "게시글을 서버에 전송하는데 실패했습니다.",
      })
    }
  }, [isLoading, isSuccess, navigate, error])

  const onFinishFailed = () => {
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
        <Form.Item
          name="content"
          initialValue={userContent}
          rules={[
            {
              required: true,
              message: "내용을 작성해주세요.",
            },
          ]}
        >
          <textarea
            maxLength={4000}
            className={styles.textArea}
            onChange={(e) => setUserContent(e.target.value)}
            value={userContent}
          />
        </Form.Item>{" "}
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
