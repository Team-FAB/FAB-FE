import React, { useState, useEffect } from "react"
import styles from "./mainPage.module.css"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import MainPostCard from "../../components/MainPostCard/mainPostCard"
import RecommendPostCard from "../../components/RecommendCard/recommendCard"
import MultiCarousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai"
import PostModal from "../../components/PostModal/postModal"
import RecommendModal from "../../components/RecommendModal/recommendModal"
import { userArticle, usersRecommend } from "../../api"
import { message } from "antd"
import { Post, User } from "../../interface/interface"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"

const CustomRightArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.customRightArrow}>
      <AiFillCaretRight className={styles.RightArrow} size={50} />
    </button>
  )
}

const CustomLeftArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.customLeftArrow}>
      <AiFillCaretLeft className={styles.LeftArrow} size={50} />
    </button>
  )
}

const MainPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [messageApi, contextHolder] = message.useMessage()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [data, setData] = useState<null | {
    mbti: string
    recommendDtoList: { id: number; nickname: string; mbti: string }[]
  }>(null)

  const userToken = useSelector((state: RootState) => state.user.data.token)

  useEffect(() => {
    const fetchRecommendedUsers = async () => {
      try {
        const response = await fetch(`/api/${usersRecommend}?size=9`, {
          method: "GET",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
            Authorization: userToken.atk.toString(),
          }),
        })

        if (!response.ok) {
          throw new Error("서버에서 사용자 데이터를 가져오지 못했습니다.")
        }

        const data = await response.json()
        setUsers(data.data.recommendDtoList)
        setData(data.data)
      } catch (error) {
        console.error(error)
        messageApi.error("사용자 데이터를 로드하는 동안 오류가 발생했습니다.")
      }
    }

    fetchRecommendedUsers()
  }, [messageApi])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/${userArticle}?page=1&size=12&isRecruiting=true`,
          {
            method: "GET",
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
            }),
          },
        )
        if (!response.ok) {
          throw new Error("서버에서 데이터를 가져오지 못했습니다")
        }
        const data = await response.json()
        setPosts(data.data)
      } catch (error) {
        console.error(error)
        messageApi.error("데이터를 로드하는 동안 오류가 발생했습니다")
      }
    }

    fetchData()
  }, [messageApi])

  const adImages = [
    "src/assets/001.jpg",
    "src/assets/002.jpg",
    "src/assets/003.jpg",
    "src/assets/004.jpg",
  ]

  const responsive = {
    XLarge: {
      breakpoint: { max: 18000, min: 1200 },
      items: 4,
      slidesToSlide: 4,
    },
    Large: {
      breakpoint: { max: 1200, min: 950 },
      items: 3,
      slidesToSlide: 3,
    },
    midiuem: {
      breakpoint: { max: 950, min: 700 },
      items: 2,
      slidesToSlide: 2,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  }

  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
    setIsModalVisible(false)
  }

  const handleUserClick = (user: User) => {
    setSelectedUser(user)
    setIsModalVisible(true)
  }

  return (
    <div className={styles.conatainer}>
      <div className={styles.adContainer}>
        <Carousel
          showThumbs={false}
          swipeable={true}
          infiniteLoop={true}
          autoPlay
          interval={3000}
          showIndicators={false}
          showStatus={false}
          showArrows={false}
        >
          {adImages.map((url, index) => (
            <div key={index}>
              <img src={url} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className={styles.mainPost}>
        <div className={styles.title}>룸메이트 구해요 👋</div>
        <div className={styles.carouselWrapper}>
          <MultiCarousel
            responsive={responsive}
            infinite={true}
            draggable={true}
            showDots={false}
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
          >
            {posts.slice(0, 12).map((post) => (
              <MainPostCard
                key={post.id}
                post={post}
                onClick={() => handlePostClick(post)}
              />
            ))}
          </MultiCarousel>
        </div>
      </div>
      <div className={styles.recommendPost}>
        <div className={styles.title}>
          방갑고에서 추천하는 룸메이트를 만나보세요 💌
        </div>
        <div className={styles.carouselWrapper}>
          <MultiCarousel
            responsive={responsive}
            infinite={true}
            draggable={true}
            showDots={false}
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
          >
            {users.slice(0, 12).map(
              (user) =>
                data && (
                  <RecommendPostCard 
                    key={user.id}
                    user={user}
                    onClick={() => handleUserClick(user)}
                    data={data}
                  />
                ),
            )}
          </MultiCarousel>
        </div>
      </div>
      {selectedPost && (
        <PostModal post={selectedPost} onClose={handleCloseModal} />
      )}
      {selectedUser && (
        <RecommendModal
          user={selectedUser}
          visible={isModalVisible}
          onClose={() => setSelectedUser(null)}
        />
      )}
      {contextHolder}
    </div>
  )
}

export default MainPage
