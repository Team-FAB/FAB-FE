import { useEffect, useState } from 'react';
import BoardCard from '../../../components/BoardCard/boardCard'
import styles from './board.module.css'
import { Post } from '../../../interface/interface';
import PostModal from '../../../components/PostModal/postModal';
import MyPage from '../myPage';

const Board: React.FC = () => {

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  useEffect(() => {
    fetch("../../../../src/assets/posts.json")
      .then((response) => response.json())
      .then((data) => setPosts(data.posts))
  }, [])

  return (
    <>
      <MyPage />
      <div className={styles.boardContainer}>
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

export default Board