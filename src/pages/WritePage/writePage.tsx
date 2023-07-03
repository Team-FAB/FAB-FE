import React, { useEffect } from "react"
import styles from "./writePage.module.css"
import "react-quill/dist/quill.snow.css"
import WritePageSelect from "./writePageSelect"
import { Button, Input, Form, Modal } from "antd"
import { useNavigate } from "react-router-dom"
import { Store } from "antd/lib/form/interface"
import { userArticle } from "../../api"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import useFetch from "../../hooks/useFetch"

const WritePage: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
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
    setUrl(`/api/${userArticle}`)
    setMethod("POST")
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
        title: "게시글 작성 완료",
        content: "게시글 작성이 완료되었습니다!",
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
        <WritePageSelect form={form} />
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: "내용을 작성해주세요.",
            },
          ]}
        >
          <textarea className={styles.textArea} maxLength={4000} />
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
  )
}

export default WritePage
