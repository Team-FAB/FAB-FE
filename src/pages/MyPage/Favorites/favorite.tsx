import { useEffect, useState } from 'react'
import MyPage from '../myPage'
import styles from './favorite.module.css'
import { Post } from '../../../interface/interface'
import PostModal from '../../../components/PostModal/postModal'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../Redux/store'
import PostCard from '../../../components/PostCard/postCard'
import { useDispatch } from 'react-redux'
import { fetchFavorites } from '../../../components/Favorite/favoritesThunk'

const Favorite = () => {

  const dispatch: AppDispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.favorites)

  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  useEffect(() => {
    dispatch(fetchFavorites())
  }, [dispatch])
  
  return(
    <>
      <MyPage />
      <div className={styles.favoriteContainer}>
        <div className={styles.cardGrid}>
          <PostCard posts={favorites}/>
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