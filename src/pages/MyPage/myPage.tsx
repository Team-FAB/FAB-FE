import { Link, Route, Routes } from "react-router-dom"
import styles from './myPage.module.css'
import Profile from "./Proflie/profile"
import Favorite from "./Favorites/favorite"
import Applicant from "./Applicant/applicant"
import Board from "./Board/board"

const MyPage: React.FC = () => {
  return (
    <div className={styles.myPageContainer}>
      <div className={styles.myPageBox}>
        <ul className={styles.myPageUl}>
          <li>
            <Link to='/MyPage/Profile'>프로필</Link>
          </li>
          <li>
            <Link to='/MyPage/Board'>작성한 글</Link>
          </li>
          <li>
            <Link to='/MyPage/Applicant'>신청 현황</Link>
          </li>
          <li>
            <Link to='/MyPage/Favorite'>찜한 목록</Link>
          </li>
        </ul>
      </div>
      <div>
        <Routes>
          <Route path="/MyPage/Profile" element={<Profile />} />
          <Route path="/MyPage/Board" element={<Board />} />
          <Route path="/MyPage/Applicant" element={<Applicant />} />
          <Route path="/MyPage/Favorite" element={<Favorite />} />
        </Routes>
      </div>
    </div>
  )
}

export default MyPage