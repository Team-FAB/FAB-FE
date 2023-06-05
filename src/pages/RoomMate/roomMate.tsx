import styles from "./roomMate.module.css"
import PostCard from "../../components/PostCard/postCard"
import { Button, Pagination } from "antd"
import RoomMateSearch from "./roomMateSearch"
import postsData from "../../assets/posts.json"

const RoomMate: React.FC = () => {
  const pageSize = 12

  return (
    <div className={styles.roomMateContainer}>
      <RoomMateSearch />
      <div className={styles.roomMateTitle}>
        <span>룸메이트 구해요 👋</span>
        <div className={styles.roomMateBtn}>
          <Button type="primary">모집글만</Button>
          <Button type="primary">글쓰기</Button>
        </div>
      </div>
      <div className={styles.cardGrid}>
        <PostCard />
      </div>
      <Pagination
        className={styles.pagination}
        defaultCurrent={1}
        total={postsData.posts.length}
        pageSize={pageSize}
      />
    </div>
  )
}

export default RoomMate
