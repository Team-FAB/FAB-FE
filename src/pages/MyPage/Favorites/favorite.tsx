import { useEffect, useState } from 'react'
import MyPage from '../myPage'
import styles from './favorite.module.css'
import { Post } from '../../../interface/interface'
import { message } from 'antd'
import PostModal from '../../../components/PostModal/postModal'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import PostCard from '../../../components/PostCard/postCard'
import { userMyFavorite } from '../../../api'

const Favorite = () => {

  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [messageApi] = message.useMessage()
  const [favoriteArticles, setFavoriteArticles] = useState([])

  const userToken = useSelector((state : RootState) => state.user.data.token)

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  // 찜한 게시글 가져오기
  useEffect(() => {
    const getFavoriteArticles = async () => {
      try {
        const response = await fetch(userMyFavorite,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: userToken.atk.toString(),
              "ngrok-skip-browser-warning": "69420",
            },
          })
  
        if (response.ok) {
          const data = await response.json()
          setFavoriteArticles(data.data)
        } else {
          throw new Error(`서버 상태 응답 ${response.status}`)
        }
      } catch (error) {
        console.error(error)
        messageApi.error("찜한 목록 불러오기 오류")
      }
    }
    getFavoriteArticles()
  }, []) 

  return(
    <>
      <MyPage />
      <div className={styles.favoriteContainer}>
        {
          favoriteArticles.length > 0 ? (
            <div className={styles.cardGrid}>
              <PostCard link={userMyFavorite} token={userToken.atk.toString()} posts={[]}/>
            </div>
          ) : (
            <p>찜한 게시물이 없습니다.</p>
          )
        }
        {selectedPost && (
          <PostModal post={selectedPost} onClose={handleCloseModal} />
        )}
      </div>
    </>
  )
}

export default Favorite