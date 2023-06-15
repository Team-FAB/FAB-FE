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
    {
      key: "마이페이지",
      label: (
        <Link to="/mypage" className={styles.mypage}>
          마이페이지
        </Link>
      ),
    },
    isLogged === true
      ? {
          key: "로그아웃",
          label: (
            <Link to="/" className={styles.logout} onClick={handleLogout}>
              로그아웃
            </Link>
          ),
        }
      : {
          key: "로그인",
          label: (
            <Link to="/" className={styles.logout}>
              로그인
            </Link>
          ),
        },
    {
      key: "alarm",
      label: <Alarm />,
    },
  ]

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
