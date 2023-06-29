import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import styles from "../Header/header.module.css"
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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const items = [
    windowWidth <= 768
      ? {
          key: "roommate",
          label: (
            <Link to="/RoomMate" className={styles.roommate}>
              룸메이트 구해요
            </Link>
          ),
        }
      : null,
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
            <div className={styles.logout} onClick={handleLogout}>
              로그아웃
            </div>
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
            {windowWidth > 768 &&(
              <Link to="/RoomMate" className={styles.roommate}>
                <li>룸메이트 구해요</li>
              </Link>
            )}
            <div className={styles.chatIcon} onClick={chatOnClick}>
              <RiMessage3Fill style={{ color: "#6231ef" }} size={25} />
            </div>
            <div className={styles.DropdownBox}>
            <Dropdown menu={{ items }} placement="bottom">
              <li className={styles.user}>
                <MenuOutlined size={50} />
                <Avatar size="small" icon={<UserOutlined />} />
              </li>
            </Dropdown>
            </div>
          </ul>
        </div>
      </div>
      <div className={styles.line}></div>
    </>
  )
}

export default Header
