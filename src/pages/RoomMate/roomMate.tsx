import styles from "./roomMate.module.css"
import PostCard from "../../components/PostCard/postCard"
import { Button, Pagination, message } from "antd"
import RoomMateSearch from "./roomMateSearch"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import roomMateTitle from "../../assets/RoommateTitle.svg"
import { userArticle } from "../../api"
import { Post } from "../../interface/interface"

const RoomMate: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [showRecruitOnly, setShowRecruitOnly] = useState(false)
  const [posts, setPosts] = useState([])
  const [count, setCount] = useState(0)
  const isLogged = useSelector((state: RootState) => state.user.isLogged)
  const pageSize = 9
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  const toggleRecruitOnly = () => {
    setShowRecruitOnly(!showRecruitOnly)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const goToWritePage = () => {
    if (isLogged === true) {
      navigate("/WritePage")
    } else {
      messageApi.info("로그인 후 사용 가능합니다.")
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${userArticle}/total`, {
          method: "GET",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        })

        if (!response.ok) {
          throw new Error(`서버 상태 응답 ${response.status}`)
        }

        const data = await response.json()
        setCount(data.data)
      } catch (error) {
        console.error(error)
        messageApi.error("데이터 불러오기 오류")
      }
    }

    fetchData()
  }, [messageApi])

  const filteredPosts = showRecruitOnly
    ? posts.filter((post: Post) => post.recruiting)
    : posts

  return (
    <div className={styles.roomMateContainer}>
      <RoomMateSearch />
      <div className={styles.roomMateTitle}>
        <img src={roomMateTitle} />
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
        <PostCard
          posts={filteredPosts}
          currentPage={currentPage}
          showRecruitOnly={showRecruitOnly}
        />
      </div>
      <Pagination
        className={styles.pagination}
        current={currentPage}
        onChange={handlePageChange}
        total={count}
        pageSize={pageSize}
      />
      {contextHolder}
    </div>
  )
}

export default RoomMate
