import { Link } from "react-router-dom"
import styles from './myPage.module.css'

const MyPage: React.FC = () => {
  return (
    <div className={styles.myPageContainer}>
      <div className={styles.myPageBox}>
        <ul className={styles.myPageUl}>
          <li>
            <Link to='/MyPage'>프로필</Link>
          </li>
          <li>
            <Link to='/Board'>작성한 글</Link>
          </li>
          <li>
            <Link to='/Apply'>신청 현황</Link>
          </li>
          <li>
            <Link to='/Favorite'>찜한 목록</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MyPage