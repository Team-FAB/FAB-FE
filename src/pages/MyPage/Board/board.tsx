import { useEffect, useState } from 'react';
import styles from './board.module.css'
import { Post } from '../../../interface/interface';
import PostModal from '../../../components/PostModal/postModal';
import MyPage from '../myPage';
import { userMyArticles } from '../../../api';
import PostCard from '../../../components/PostCard/postCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';

const Board: React.FC = () => {

  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const userToken = useSelector((state : RootState) => state.user.data.token)

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/${userMyArticles}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: userToken.atk.toString(),
          },
        })

        if (!response.ok) {
          throw new Error(`서버 상태 응답 ${response.status}`)
        }

        const data = await response.json()
        setPosts(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <MyPage />
      <div className={styles.boardContainer}>
        <div className={styles.cardGrid}>
            <PostCard posts={posts}/>
        </div>
        {selectedPost && (
          <PostModal post={selectedPost} onClose={handleCloseModal} />
        )}
      </div>
    </>
  )
}

export default Board