import styles from "./roomMate.module.css"
import PostCard from "../../components/PostCard/postCard"
import { Button, Pagination, message, Spin } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import { userArticle } from "../../api"
import { Post, SearchQuery } from "../../interface/interface"
import { RoomMateSearchProps, PostData } from "../../interface/interface"
import { RedoOutlined } from "@ant-design/icons"
import SearchBar from "../../components/SearchBar/searchBar"
import useFetch from "../../hooks/useFetch"
import { UserProfile } from "../../interface/interface"
import { userMyprofile } from "../../api"

const RoomMate: React.FC<RoomMateSearchProps> = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [showRecruiting, setShowRecruiting] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [count, setCount] = useState(0)
  const isLogged = useSelector((state: RootState) =>
    Boolean(state.user.data.token.atk),
  )
  const pageSize = 9
  const navigate = useNavigate()
  const [searchResults] = useState([])
  const [messageApi, contextHolder] = message.useMessage()
  const [isSearched, setIsSearched] = useState(false)
  const [searchBoxOpen, setSearchBoxOpen] = useState(false)
  const [queryString, setQueryString] = useState("")
  const [query, setQuery] = useState<SearchQuery>({
    area: "",
    period: "",
    price: undefined,
    gender: "",
  })

  const userToken = useSelector((state: RootState) => state.user.data.token)

  // 유저 정보 가져오기
  const {
    datas: profileData,
    setUrl: setProfileUrl,
    setHeaders: setProfileHeaders,
    setMethod: setProfileMethod,
    setBody: setProfileBody,
  } = useFetch<UserProfile | null>("", "", {}, null)

  useEffect(() => {
    setProfileUrl(`/api/${userMyprofile}`)
    setProfileMethod("GET")
    setProfileHeaders({
      "Content-Type": "application/json",
      Authorization: userToken.atk.toString(),
    })
    setProfileBody()
  }, [userMyprofile, userToken])

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
      if (profileData?.gender !== "null") {
        navigate("/WritePage")
      } else {
        messageApi.info("내 정보를 입력 후 사용해주세요.")
      }
    } else {
      messageApi.error("로그인이 필요합니다.")
    }
  }

  // 새로고침
  const refresh = () => {
    window.location.reload()
  }

  // 검색 필터링
  const handleSearch = async (
    query: SearchQuery,
    page = 1,
    size = 9,
    showRecruiting? : boolean,
  ) => {
    setQuery(query)
    const searchParams = {
      page: page.toString(),
      size: size.toString(),
      isRecruiting: showRecruiting?.toString() || "false",
      region: query.area,
      period: query.period,
      price: query.price?.toString() ?? "",
      gender: query.gender.toString(),
    }

    const newQueryString = new URLSearchParams(searchParams).toString()
    setQueryString(newQueryString)

    try {
      const response = await fetch(`/api/articles/filter?${newQueryString}`, {
        method: "GET",
        headers: new Headers(),
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
  const {
    datas: fetchedData,
    isLoading: fetchDataLoading,
    isSuccess: fetchDataSuccess,
    setUrl,
    setHeaders,
    setMethod,
    setBody,
  } = useFetch<PostData | null>("", "", {}, null)

  useEffect(() => {
    if (isSearched === false) {
      setUrl(
        `/api/${userArticle}?page=${currentPage}&size=9&isRecruiting=${showRecruiting}`,
      )
    } else {
      setUrl(`/api/articles/filter?${queryString}`)
    }

    setMethod("GET")
    setHeaders()
    setBody()
  }, [userArticle, currentPage, showRecruiting, messageApi])

  useEffect(() => {
    if (fetchDataSuccess) {
      try {
        setPosts(fetchedData?.articleList || [])
        setCount(fetchedData?.totalCnt || 0)
      } catch (error) {
        console.error(error)
      }
    }
  }, [fetchDataSuccess, fetchedData])

  // 모집글, 전체글 토글 버튼
  const toggleRecruitOnly = () => {
    setShowRecruiting((prevShowRecruiting) => {
      const nextShowRecruiting = !prevShowRecruiting

      if (isSearched === true) {
        handleSearch(query, currentPage, pageSize, nextShowRecruiting)
      }

      return nextShowRecruiting
    })
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.roomMateContainer}>
        <div className={styles.roomMateTitle}>
          <div className={styles.roomMateTitleText}>룸메이트 구해요 👋</div>
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
          {fetchDataLoading ? (
            <Spin
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ) : (
            <PostCard
              posts={posts}
              Resultsposts={searchResults}
              currentPage={currentPage}
              showRecruiting={showRecruiting}
            />
          )}
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
