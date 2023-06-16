import styles from "./roomMate.module.css"
import PostCard from "../../components/PostCard/postCard"
import {
  Badge,
  Button,
  Pagination,
  Radio,
  RadioChangeEvent,
  message,
} from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import roomMateTitle from "../../assets/RoommateTitle.svg"
import { userArticle } from "../../api"
import { Post } from "../../interface/interface"
import { RoomMateSearchProps } from "../../interface/interface"
import {
  CaretDownOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons"
import { region, period, price, gender } from "../../object/profileDropdown"

const RoomMate: React.FC<RoomMateSearchProps> = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [showRecruiting, setShowRecruiting] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [count, setCount] = useState(0)
  const isLogged = useSelector((state: RootState) => state.user.isLogged)
  const pageSize = 9
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const [isSearched, setIsSearched] = useState(false)
  const [searchBoxOpen, setSearchBoxOpen] = useState(false)
  const [selectedArea, setSelectedArea] = useState("지역")
  const [selectedPeriod, setSelectedPeriod] = useState("기간")
  const [selectedPrice, setSelectedPrice] = useState("보증금")
  const [selectedGender, setSelectedGender] = useState("성별")
  const [selectedDeposit, setSelectedDeposit] = useState<string | undefined>(
    undefined,
  )

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

  // 검색
  const handleToggleSearchBox = () => {
    if (!searchBoxOpen) {
      setSelectedArea(region[0].region)
      setSelectedPeriod(period[0].quarter)
      setSelectedPrice(price[0].display)
      setSelectedGender(gender[0].name)
    }

    setSearchBoxOpen(!searchBoxOpen)
  }

  // 검색 모달 금액
  const handlePriceChange = (e: RadioChangeEvent) => {
    const deposit = e.target.value
    setSelectedDeposit(deposit)

    const selectedPriceDisplay = price.find(
      (item) => item.deposit === deposit,
    )?.display

    setSelectedPrice(selectedPriceDisplay || "Deposit")
  }

  // 검색 필터링
  const handleSearch = async (page = 1, size = 5) => {
    const searchParams = {
      page: page.toString(),
      size: size.toString(),
      region: selectedArea,
      period: selectedPeriod,
      price: selectedDeposit?.toString() ?? "",
      gender: selectedGender,
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
        handleSearchResults(data.data)
        setSearchBoxOpen(!searchBoxOpen)
      } else {
        throw new Error("API Error: " + data.msg)
      }
    } catch (error: unknown) {
      console.error("에러", error)
      setSearchBoxOpen(!searchBoxOpen)
      messageApi.error("검색 오류" + error)
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

        const countResponse = await fetch(`/api/${userArticle}/total`, {
          method: "GET",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        })

        if (!response.ok || !countResponse.ok) {
          throw new Error(`서버 상태 응답 ${response.status}`)
        }

        const data = await response.json()
        const countData = await countResponse.json()

        setPosts(data.data)
        setCount(countData.data)
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
      <div className={styles.searchContainer}>
        <SearchOutlined
          className={styles.searchIcon}
          style={{ fontSize: 28 }}
        />
        <div className={styles.searchBox}>
          <div className={styles.searchBar} onClick={handleToggleSearchBox}>
            <div>
              <p>지역</p>
              <Badge className={styles.cardBadgeArea}>{selectedArea}</Badge>
            </div>
            <div>
              <p>기간</p>
              <Badge className={styles.cardBadgePeriod}>{selectedPeriod}</Badge>
            </div>
            <div>
              <p>보증금</p>
              <Badge className={styles.cardBadgePrice}>{selectedPrice}</Badge>
            </div>
            <div className={styles.lastDiv}>
              <p>성별</p>
              <Badge className={styles.cardBadgeGender}>{selectedGender}</Badge>
            </div>
            <CaretDownOutlined
              className={styles.lastDiv}
              onClick={() => handleSearch()}
              style={{ color: "#4c2ad3" }}
            />
          </div>
          {searchBoxOpen && (
            <div className={styles.searchChoiceContainer}>
              <div className={styles.searchChoiceBox}>
                <div className={styles.searchChoiceArea}>
                  <p>지역</p>
                  <div className={styles.areaRadioGroup}>
                    <Radio.Group
                      onChange={(e) => setSelectedArea(e.target.value)}
                    >
                      {region.map((item, index) => (
                        <Radio
                          key={index}
                          value={item.region}
                          className={styles.areaRadioBtn}
                        >
                          {item.region}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </div>
                </div>
                <div className={styles.searchChoicePeriod}>
                  <p>기간</p>
                  <Radio.Group
                    className={styles.periodRadioGroup}
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                  >
                    {period.map((item, index) => (
                      <Radio
                        key={index}
                        value={item.quarter}
                        className={styles.periodRadioBtn}
                      >
                        {item.quarter}
                      </Radio>
                    ))}
                  </Radio.Group>
                </div>
                <div className={styles.searchChoicePrice}>
                  <p>보증금</p>
                  <Radio.Group
                    className={styles.priceRadioGroup}
                    value={selectedDeposit}
                    onChange={handlePriceChange}
                  >
                    {price.map((item, index) => (
                      <Radio
                        key={index}
                        value={item.deposit}
                        className={styles.priceRadioBtn}
                      >
                        {item.display}
                      </Radio>
                    ))}
                  </Radio.Group>
                </div>
                <div className={styles.searchChoiceGender}>
                  <p>성별</p>
                  <Radio.Group
                    className={styles.genderRadioGroup}
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                  >
                    {gender.map((item, index) => (
                      <Radio
                        key={index}
                        value={item.name}
                        className={styles.genderRadioBtn}
                      >
                        {item.name}
                      </Radio>
                    ))}
                  </Radio.Group>
                </div>
              </div>
              <Button
                className={styles.searchChoiceBtn}
                type="primary"
                onClick={() => handleSearch()}
              >
                검색하기
              </Button>
            </div>
          )}
        </div>
      </div>
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
