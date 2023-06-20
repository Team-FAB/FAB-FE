import styles from "./roomMate.module.css"
import PostCard from "../../components/PostCard/postCard"
import { Button, Pagination, message } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import roomMateTitle from "../../assets/RoommateTitle.svg"
import { userArticle } from "../../api"
import { Post, SearchQuery } from "../../interface/interface"
import { RoomMateSearchProps } from "../../interface/interface"
import { RedoOutlined } from "@ant-design/icons"
import SearchBar from "../../components/SearchBar/searchBar"

const RoomMate: React.FC<RoomMateSearchProps> = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [showRecruiting, setShowRecruiting] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [count, setCount] = useState(0)
  const isLogged = useSelector((state: RootState) => state.user.isLogged)
  const pageSize = 9
  const navigate = useNavigate()
  const [searchResults] = useState([])
  const [messageApi, contextHolder] = message.useMessage()
  const [, setIsSearched] = useState(false)
  const [searchBoxOpen, setSearchBoxOpen] = useState(false)

  const handleSearchResults = (results: Post[]) => {
    setPosts(results)
    setIsSearched(true)
  }
  // 페이지네이션
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // 글쓰기 페이지
  const goToWritePage = () => {
    if (isLogged === true) {
      navigate("/WritePage")
    } else {
      messageApi.info("로그인 후 사용 가능합니다.")
    }
  }

  // 새로고침
  const refresh = () => {
    window.location.reload()
  }

  // 모집글, 전체글 토글
  const toggleRecruitOnly = () => {
    setShowRecruiting(!showRecruiting)
  }

  // 검색 필터링
  const handleSearch = async (query: SearchQuery, page = 1, size = 9) => {
    const searchParams = {
      page: page.toString(),
      size: size.toString(),
      isRecruiting: false.toString(),
      region: query.area,
      period: query.period,
      price: query.price?.toString() ?? "",
      gender: query.gender.toString(),
    }

    const queryString = new URLSearchParams(searchParams).toString()

    try {
      const response = await fetch(`/api/articles/filter?${queryString}`, {
        method: "GET",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })

      if (!response.ok) {
        throw new Error("서버 연결 실패")
      }

      const data = await response.json()
      if (data.code === "RESPONSE_SUCCESS" && data.status === "OK") {
        handleSearchResults(data.data.articleList)
        setSearchBoxOpen(!searchBoxOpen)
        setCount(data.data.totalCnt)
      } else {
        throw new Error("API Error: " + data.msg)
      }
    } catch (error: unknown) {
      console.error("에러", searchParams)
      setSearchBoxOpen(!searchBoxOpen)
      messageApi.error("검색된 결과가 없습니다.")
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/${userArticle}?page=${currentPage}&size=9&isRecruiting=${showRecruiting}`,
          {
            method: "GET",
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
            }),
          },
        )

        if (!response.ok) {
          throw new Error(`서버 상태 응답 ${response.status}`)
        }

        const data = await response.json()
        setPosts(data.data.articleList)
        setCount(data.data.totalCnt)
      } catch (error) {
        console.error(error)
        messageApi.error("데이터 불러오기 오류")
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, showRecruiting, messageApi])

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.roomMateContainer}>
        <div className={styles.roomMateTitle}>
          <img src={roomMateTitle} />
          <div className={styles.roomMateBtn}>
            <Button
              className={styles.circleBtn}
              shape="circle"
              onClick={refresh}
            >
              <RedoOutlined />
            </Button>
            <Button onClick={toggleRecruitOnly}>
              {showRecruiting ? "전체보기" : "모집글만"}
            </Button>
            <Button onClick={goToWritePage}>글쓰기</Button>
          </div>
        </div>
        <div className={styles.cardGrid}>
          <PostCard
            posts={posts}
            Resultsposts={searchResults}
            currentPage={currentPage}
            showRecruiting={showRecruiting}
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
    </>
  )
}

export default RoomMate
