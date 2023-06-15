import { Link } from "react-router-dom"
import styles from "../Header/header.module.css"
import Alarm from "./Alarm/alarm"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../Redux/store"
import { logout } from "../../Redux/user"
import { Avatar, Dropdown } from "antd"
import { MenuOutlined, UserOutlined } from "@ant-design/icons"

const Header: React.FC = () => {
  const isLogged = useSelector((state: RootState) => state.user.isLogged)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  const items = [
    isLogged
      ? {
          key: "My Page",
          label: (
            <Link to="/mypage" className={styles.mypage}>
              내 정보
            </Link>
          ),
        }
      : null,
    isLogged
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
    isLogged
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
            <Alarm />
            {isLogged === true ? (
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
