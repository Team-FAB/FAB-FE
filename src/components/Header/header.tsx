import { Link } from "react-router-dom"
import styles from "../Header/header.module.css"
import Alarm from "./Alarm/alarm"

const Header: React.FC = () => {
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.menu}>
          <Link to="/MainPage">
            <img className={styles.logo} src="src/assets/logo.svg" />
          </Link>
          <ul className={styles.nav}>
            <Link to="/RoomMate">
              <li>룸메이트 구해요</li>
            </Link>
            <Link to="/MyPage">
              <li>마이페이지</li>
            </Link>
            <Link to="/">
              <li>로그아웃</li>
            </Link>
          </ul>
        </div>
        <Alarm />
      </div>
    </>
  )
}

export default Header
