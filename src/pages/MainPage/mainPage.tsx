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
import { userArticle, usersRecommend, usersProfile } from "../../api"
import { message, Spin } from "antd"
import { Post, User, FetchData, PostData } from "../../interface/interface"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import { mbtiGraph } from "../../object/mbtiGraph"
import useFetch from "../../hooks/useFetch"

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
  const [selectedUserProfile, setSelectedUserProfile] = useState<User | null>(
    null,
  )
  const [messageApi, contextHolder] = message.useMessage()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [data, setData] = useState<FetchData | null>(null)
  const userToken = useSelector((state: RootState) => state.user.data.token)

  // 로그인 상태 체크
  const isLogged = useSelector((state: RootState) =>
    Boolean(state.user.data.token.atk),
  )

  //추천 룸메이트
  const {
    datas: recommendDatas,
    isSuccess: recommendSuccess,
    error: recommendError,
    setUrl: setRecommendUrl,
    setHeaders: setRecommendHeaders,
    setMethod: setRecommendMethod,
    setBody: setRecommendBody,
    isLoading: recommendLoading,
  } = useFetch<FetchData | null>("", "", {}, null)

  // 추천 룸메이트 표시 제목
  let recommendTitle: React.ReactNode =
    "방갑고에서 추천하는 룸메이트를 만나보세요 💌"
  if (!isLogged) {
    recommendTitle = "로그인 후 추천하는 룸메이트를 만나보세요 💌"
  } else if (recommendError) {
    recommendTitle = (
      <>
        회원님의 정보를 입력 후 <br /> 추천하는 룸메이트를 만나보세요 💌
      </>
    )
  }

  useEffect(() => {
    setRecommendUrl(`/api/${usersRecommend}?size=12`)
    setRecommendMethod("GET")
    setRecommendHeaders({
      "ngrok-skip-browser-warning": "69420",
      Authorization: userToken.atk.toString(),
    })
    setRecommendBody()
  }, [usersRecommend, userToken.atk])

  useEffect(() => {
    if (recommendSuccess) {
      try {
        setUsers((recommendDatas?.recommendDtoList as User[]) || [])
        setData(recommendDatas)
      } catch (error) {
        console.error(error)
      }
    }
  }, [recommendSuccess, recommendDatas])

  //메인페이지 게시글

  const {
    datas: postDatas,
    isSuccess: postSuccess,
    isLoading: postLoading,
    setUrl: setPostUrl,
    setHeaders: setPostHeaders,
    setMethod: setPostMethod,
    setBody: setPostBody,
  } = useFetch<PostData | null>("", "", {}, null)

  useEffect(() => {
    setPostUrl(`/api/${userArticle}?page=1&size=12&isRecruiting=true`)
    setPostMethod("GET")
    setPostHeaders({
      "ngrok-skip-browser-warning": "69420",
    })
    setPostBody()
  }, [userArticle])

  useEffect(() => {
    if (postSuccess) {
      try {
        setPosts(postDatas?.articleList || [])
      } catch (error) {
        console.error(error)
      }
    }
  }, [postSuccess, postDatas])

  // 추천 룸메이트 정보

  const {
    datas: profileDatas,
    isSuccess: profileDatasSuccess,
    setUrl: setProfileDatasUrl,
    setHeaders: setProfileHeaders,
    setMethod: setProfileMethod,
    setBody: setProfileBody,
  } = useFetch<User | null>("", "", {}, null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (selectedUser) {
          setProfileDatasUrl(`/api/${usersProfile}/${selectedUser.id}`)
          setProfileMethod("GET")
          setProfileHeaders({
            Authorization: userToken.atk.toString(),
          })
          setProfileBody()
          setSelectedUserProfile(profileDatas)
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (selectedUser) {
      fetchUserProfile()
    }
  }, [selectedUser, messageApi, userToken, profileDatasSuccess, profileDatas])

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
      centermode: true,
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
          {postLoading ? (
            <Spin />
          ) : (
            <MultiCarousel
              responsive={responsive}
              infinite={false}
              draggable={true}
              showDots={false}
              customRightArrow={<CustomRightArrow />}
              customLeftArrow={<CustomLeftArrow />}
            >
              {posts.slice(0, 12).map((post) => (
                <div key={post.id} className={styles.carouselItem}>
                  <MainPostCard
                    key={post.id}
                    post={post}
                    onClick={() => handlePostClick(post)}
                  />
                </div>
              ))}
            </MultiCarousel>
          )}
        </div>
      </div>
      <div className={styles.recommendPost}>
        <div className={styles.title}>{recommendTitle}</div>
        <div className={styles.carouselWrapper}>
          {recommendLoading ? (
            <Spin />
          ) : users.length > 0 ? (
            <MultiCarousel
              responsive={responsive}
              infinite={false}
              draggable={true}
              showDots={false}
              customRightArrow={<CustomRightArrow />}
              customLeftArrow={<CustomLeftArrow />}
            >
              {users
                .filter(
                  (user) =>
                    data &&
                    `${data.mbti}-${user.mbti}` in mbtiGraph &&
                    mbtiGraph[`${data.mbti}-${user.mbti}`] >= 2 &&
                    mbtiGraph[`${data.mbti}-${user.mbti}`] <= 4,
                )
                .slice(0, 12)
                .map((user) =>
                  data ? (
                    <div key={user.id} className={styles.carouselItem}>
                      <RecommendPostCard
                        key={user.id}
                        user={user}
                        onClick={() => handleUserClick(user)}
                        data={data}
                      />
                    </div>
                  ) : null,
                )}
            </MultiCarousel>
          ) : (
            <p className={styles.noRecommend}>추천하는 사람이 없습니다.</p>
          )}
        </div>
      </div>
      {selectedPost && (
        <PostModal post={selectedPost} onClose={handleCloseModal} />
      )}
      {selectedUser && (
        <RecommendModal
          user={selectedUser}
          userProfile={selectedUserProfile}
          visible={isModalVisible}
          onClose={() => setSelectedUser(null)}
        />
      )}
      {contextHolder}
    </div>
  )
}

export default MainPage
