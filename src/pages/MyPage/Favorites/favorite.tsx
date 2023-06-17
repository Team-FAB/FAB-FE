import { useEffect, useState } from 'react'
import MyPage from '../myPage'
import styles from './favorite.module.css'
import { Post } from '../../../interface/interface'
import PostModal from '../../../components/PostModal/postModal'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import PostCard from '../../../components/PostCard/postCard'
import { userMyFavorite } from '../../../api'

const Favorite = () => {

  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const userToken = useSelector((state : RootState) => state.user.data.token)

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/${userMyFavorite}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken.atk.toString()
        },
      })

      if (!response.ok) {
        throw new Error(`서버 상태 응답 ${response.status}`)
      }

      const responseData = await response.json()
      setPosts(responseData.data)

      if(responseData.data.newIsSaved === false) {
        window.location.reload()
      }

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  
  return(
    <>
      <MyPage />
      <div className={styles.favoriteContainer}>
        <div className={styles.cardGrid}>
          <PostCard posts={posts}/>
        </div>
        {selectedPost && (
          <PostModal
            post={selectedPost} onClose={handleCloseModal} />
        )}
      </div>
    </>
  )
}

export default Favorite