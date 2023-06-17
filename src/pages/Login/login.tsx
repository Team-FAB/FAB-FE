import { LoginValues } from "../../interface/interface"
import "antd"
import styles from "../Login/login.module.css"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { Button, Form, Input, message } from "antd"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../../Redux/user"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { googleUserLogin, kakaoUserLogin } from "../../api"
import video from "../../assets/bg.mp4"

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useAppDispatch()
  const handleLogin = async (values: LoginValues) => {
    const { email, password } = values
    const actionResult = await dispatch(loginUser({ email, password }))
    if (loginUser.fulfilled.match(actionResult)) {
      navigate("/MainPage")
    } else {
      messageApi.info("이메일과 비밀번호를 확인하세요.")
    }
  }

  const kakao = () => {
    window.location.href = kakaoUserLogin
  }

  const google = () => {
    window.location.href = googleUserLogin
    console.log(document.URL)
  }

  return (
    <>
      <div className={styles.loginContainer}>
        <Link to="/MainPage">
          <img className={styles.logo} src="src/assets/logo.svg" />
        </Link>
        <div className={styles.loginBox}>
          <div className={styles.videoBox}>
            <video src={video} autoPlay loop muted />
          </div>
          <div className={styles.formBox}>
            <span className={styles.Logintitle}>로그인</span>
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={handleLogin}
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: "이메일을 입력하세요." }]}
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
                  placeholder="Password"
                  style={{ height: 40 }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: 300, height: 40 }}
                >
                  로그인
                </Button>
              </Form.Item>
            </Form>
            <div className={styles.signUpText}>
              <span>아직 회원이 아니신가요?</span>
              <Link to="/SignUp">
                <span className={styles.signUpLink}>회원가입 하기</span>
              </Link>
            </div>
            <div className={styles.sociallogin}>
              <div className={styles.socialloginTitle}>
                <span className={styles.line}></span>
                <span className={styles.title}>또는</span>
                <span className={styles.line}></span>
              </div>
              <img src="src/assets/Kakao Login.svg" onClick={kakao} />
              <img src="src/assets/Google Login.svg" onClick={google} />
            </div>
          </div>
        </div>
      </div>
      {contextHolder}
    </>
  )
}

export default Login
