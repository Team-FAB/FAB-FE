import { useEffect, useState } from 'react'
import MyPage from '../myPage'
import styles from './favorite.module.css'
import { userArticle } from '../../../api'
import { Post } from '../../../interface/interface'
import { message } from 'antd'
import BoardCard from '../../../components/BoardCard/boardCard'
import PostModal from '../../../components/PostModal/postModal'

const Favorite = () => {

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([])
  const [messageApi, contextHolder] = message.useMessage()

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  // 찜한 게시글 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${userArticle}?page=1&size=12&isRecruiting=false`, // 찜한 게시글 패치 주소 변경 필요
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        )

        if (!response.ok) {
          throw new Error(`서버 상태 응답 ${response.status}`)
        }

        const data = await response.json()
        setPosts(data.data)
        console.log(data.data)
      } catch (error) {
        console.error(error)
        messageApi.error("데이터 불러오기 오류")
      }
    }

    fetchData()
  }, [messageApi]) // messageAPI 확인


  return(
    <>
      <MyPage />
      <div className={styles.favoriteContainer}>
        {posts.map((post) => (
          <BoardCard
            key={post.id}
            post={post}
            onClick={() => handlePostClick(post)}
          />
        ))}
        {selectedPost && (
          <PostModal post={selectedPost} onClose={handleCloseModal} />
        )}
      </div>
    </>
  )
}

export default Favorite