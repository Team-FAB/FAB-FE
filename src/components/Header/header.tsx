import { Link, useNavigate } from "react-router-dom"
import styles from "../Header/header.module.css"
// import Alarm from "./Alarm/alarm"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../../Redux/store"
import { Avatar, Dropdown } from "antd"
import { MenuOutlined, UserOutlined } from "@ant-design/icons"
import { logOutUser } from "../../Redux/user"
import { RiMessage3Fill } from "react-icons/ri"

const Header: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) =>
    Boolean(state.user.data.token.atk),
  )
  const dispatch: AppDispatch = useDispatch()
  const navigator = useNavigate()
  const userToken = useSelector((state: RootState) => state.user.data.token.atk)

  const handleLogout = async () => {
    try {
      await dispatch(logOutUser({ userToken }))
      navigator("/")
    } catch (error) {
      console.error(error)
    }
  }

    const chatOnClick = () => {
      navigator("/Chat")
    }



  const items = [
    isLoggedIn
      ? {
          key: "My Page",
          label: (
            <Link to="/mypage" className={styles.mypage}>
              내 정보
            </Link>
          ),
        }
      : null,
    isLoggedIn
      ? {
          key: "logout",
          label: (
            <Link to="/" className={styles.logout} onClick={handleLogout}>
              로그아웃
            </Link>
          ),
        }
      : {
          key: "login",
          label: (
            <Link to="/" className={styles.logout}>
              로그인
            </Link>
          ),
        },
    isLoggedIn
      ? null
      : {
          key: "signUp",
          label: (
            <Link to="/SignUp" className={styles.logout}>
              회원가입
            </Link>
          ),
        },
  ].filter((item) => item !== null)

  return (
    <>
      <div className={styles.headerContainer}>
        <Link to="/MainPage">
          <img className={styles.logo} src="src/assets/logo.svg" alt="Logo" />
        </Link>
        <div className={styles.menu}>
          <ul className={styles.nav}>
            <Link to="/RoomMate">
              <li>룸메이트 구해요</li>
            </Link>
            <div className={styles.chatIcon} onClick={chatOnClick}>
              <RiMessage3Fill style={{ color: "#6231ef" }} size={25} />
            </div>
            {/* <Alarm /> */}
            {isLoggedIn === true ? (
              <Dropdown menu={{ items }} placement="bottomRight">
                <li className={styles.user}>
                  <MenuOutlined size={50} />
                  <Avatar size="small" icon={<UserOutlined />} />
                </li>
              </Dropdown>
            ) : (
              <Dropdown menu={{ items }} placement="bottomRight">
                <li className={styles.user}>
                  <MenuOutlined size={50} />
                  <Avatar size="small" icon={<UserOutlined />} />
                </li>
              </Dropdown>
            )}
          </ul>
        </div>
      </div>
      <div className={styles.line}></div>
    </>
  )
}

export default Header
