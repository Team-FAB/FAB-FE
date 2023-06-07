import styles from "./roomMate.module.css"
import PostCard from "../../components/PostCard/postCard"
import { Button, Pagination } from "antd"
import RoomMateSearch from "./roomMateSearch"
import postsData from "../../assets/posts.json"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const RoomMate: React.FC = () => {
  const pageSize = 9
  const [currentPage, setCurrentPage] = useState(1)
  const [showRecruitOnly, setShowRecruitOnly] = useState(false)
  const navigate = useNavigate()

  const toggleRecruitOnly = () => {
    setShowRecruitOnly(!showRecruitOnly)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const filteredPosts = showRecruitOnly
    ? postsData.posts.filter((post) => post.isRecruit)
    : postsData.posts

  const start = (currentPage - 1) * pageSize
  const end = start + pageSize

  const postsToShow = filteredPosts.slice(start, end)

  const goToWritePage = () => {
    navigate("/WritePage")
  }

  return (
    <div className={styles.roomMateContainer}>
      <RoomMateSearch />
      <div className={styles.roomMateTitle}>
        <span>룸메이트 구해요 👋</span>
        <div className={styles.roomMateBtn}>
          <Button type="primary" onClick={toggleRecruitOnly}>
            {showRecruitOnly ? "전체보기" : "모집글만"}
          </Button>
          <Button type="primary" onClick={goToWritePage}>
            글쓰기
          </Button>
        </div>
      </div>
      <div className={styles.cardGrid}>
        <PostCard posts={postsToShow} />
      </div>
      <Pagination
        className={styles.pagination}
        current={currentPage}
        onChange={handlePageChange}
        total={filteredPosts.length}
        pageSize={pageSize}
      />
    </div>
  )
}

export default RoomMate
