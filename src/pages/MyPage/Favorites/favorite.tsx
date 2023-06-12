import { useState } from 'react'
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
  const userToken = useSelector((state : RootState) => state.user.data.token)
  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  return(
    <>
      <MyPage />
      <div className={styles.favoriteContainer}>
        <div className={styles.cardGrid}>
          {
            <PostCard link={userMyFavorite} token={userToken.atk.toString()} posts={[]}/>
          }
        </div>
        {selectedPost && (
          <PostModal post={selectedPost} onClose={handleCloseModal} />
        )}
      </div>
    </>
  )
}

export default Favorite
