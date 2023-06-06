import { Input, Button, Form } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import styles from "./signUp.module.css"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { registerUser } from "../../Redux/user"
import { useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../Redux/store"
import { useEffect } from "react"

const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleLogin = () => {
    navigate("/MainPage") // 메인 페이지로 이동
  }

  const onFinish = (values: {
    email: string
    password: string
    nickname: string
  }) => {
    dispatch(registerUser(values))
  }

  const registerUserStatus = useSelector(
    (state: RootState) => state.user.status,
  )

  useEffect(() => {
    if (registerUserStatus === "fulfilled") {
      navigate("/MainPage")
    }
  }, [registerUserStatus, navigate])

  return (
    <div className={styles.signUpContainer}>
      <img
        className={styles.logo}
        src="src/assets/logo.svg"
        onClick={handleLogin}
      />
      <div className={styles.signUpBox}>
        <div className={styles.videoBox}></div>
        <div className={styles.inputBox}>
          <span className={styles.title}>회원가입</span>
          <Form
            name="signUp"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "이메일을 입력하세요." },
                { type: "email", message: "이미 사용중인 이메일입니다." },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                style={{ width: 300, height: 40 }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "비밀번호를 입력하세요." }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="비밀번호를 입력하세요."
                style={{ height: 40 }}
              />
            </Form.Item>
            <Form.Item
              name="passwordCheck"
              rules={[
                { required: true, message: "비밀번호를 한번 더 입력하세요." },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error("비밀번호가 맞지 않습니다."),
                    )
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="비밀번호를 한번 더 입력하세요."
                style={{ height: 40 }}
              />
            </Form.Item>
            <Form.Item
              name="nickname"
              rules={[{ required: true, message: "닉네임을 입력하세요." }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="닉네임"
                style={{ width: 300, height: 40 }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: 300, height: 40 }}
              >
                회원가입
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
