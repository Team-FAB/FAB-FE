import { useEffect, useState } from 'react'
import MyPage from '../myPage'
import styles from './favorite.module.css'
import { userFavorite } from '../../../api'
import { Post } from '../../../interface/interface'
import { message } from 'antd'
import PostModal from '../../../components/PostModal/postModal'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import PostCard from '../../../components/PostCard/postCard'

const Favorite = () => {

  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [messageApi] = message.useMessage()
  const [favoriteArticles, setFavoriteArticles] = useState([]) // 배열로 받는 값들 확인 ex.<Article[]>
  const favoritePosts = favoriteArticles

  const userToken = useSelector((state : RootState) => state.user.data.token)

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  // 찜한 게시글 가져오기
  // const fetchFavoriteArticles = async () => {
  //   try {
  //     const response = await fetch(
  //       `${userFavorite}?page=1&size=9`, // 찜한 게시글 패치 주소 변경 필요
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: userToken.atk.toString(),
  //         },
  //       },
  //     )

  //     if (!response.ok) {
  //       throw new Error(`서버 상태 응답 ${response.status}`)
  //     }

  //     const data = await response.json()
  //     console.log(data)
  //     return data.articles 
  //   } catch (error) {
  //     console.error(error)
  //     messageApi.error("찜한 목록 불러오기 오류")
  //   }
  // }

  // useEffect(() => {
  //   const getFavoriteArticles = async () => {
  //     try {
  //       const favoriteArticles = await fetchFavoriteArticles();
  //       // 가져온 찜한 게시물 목록을 상태로 업데이트
  //       setFavoriteArticles(favoriteArticles);
  //     } catch (error) {
  //       messageApi.error("찜한 게시물을 가져오는데 실패했습니다.");
  //     }
  //   };

  //   getFavoriteArticles();
  // }, []) // 삭제될 때 useEffect()

  return(
    <>
      <MyPage />
      <div className={styles.favoriteContainer}>
        {
          favoritePosts.length > 0 ? (
            <div className={styles.cardGrid}>
              <PostCard posts={[]} />
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