import { useState } from 'react';
import styles from './board.module.css'
import { Post } from '../../../interface/interface';
import PostModal from '../../../components/PostModal/postModal';
import MyPage from '../myPage';
import { userMyArticles } from '../../../api';
import PostCard from '../../../components/PostCard/postCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';

const Board: React.FC = () => {

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const userToken = useSelector((state : RootState) => state.user.data.token)

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  return (
    <>
      <MyPage />
      <div className={styles.boardContainer}>
        <div className={styles.cardGrid}>
          {
            <PostCard link={userMyArticles} token={userToken.atk.toString()} posts={[]}/>
          }
        </div>
        {selectedPost && (
          <PostModal post={selectedPost} onClose={handleCloseModal} />
        )}
      </div>
    </>
  )
}

export default Board