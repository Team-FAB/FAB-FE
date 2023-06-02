import { Link, Route, Routes } from "react-router-dom"
import styles from './myPage.module.css'
import Profile from "./Proflie/profile"

const MyPage = () => {
  return (
    <div className={styles.myPageContainer}>
      <div className={styles.myPageBox}>
        <ul className={styles.myPageUl}>
          <Link to='/Profile'>
            <li>프로필</li>
          </Link>
          <Link to='/'>
            <li>작성한 글</li>
          </Link>
          <Link to='/'>
            <li>신청 현황</li>
          </Link>
          <Link to='/'>
            <li>찜한 목록</li>
          </Link>
        </ul>
      </div>
      <div>
        <Routes>
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}

export default MyPage