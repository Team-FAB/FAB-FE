import { useEffect, useState } from 'react';
import BoardCard from '../../../components/BoardCard/boardCard'
import styles from './board.module.css'
import { Post } from '../../../interface/interface';
import PostModal from '../../../components/PostModal/postModal';
import MyPage from '../myPage';
import { userArticle } from '../../../api';
import { message } from 'antd';

const Board: React.FC = () => {

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [messageApi, contextHolder] = message.useMessage()

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
  };

  const handleCloseModal = () => {
    setSelectedPost(null)
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${userArticle}?page=1&size=12&isRecruiting=false`, // 패치 주소 변경 필요
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         },
  //       )

  //       if (!response.ok) {
  //         throw new Error(`서버 상태 응답 ${response.status}`)
  //       }

  //       const data = await response.json()
  //       setPosts(data.data)
  //       console.log(data.data)
  //     } catch (error) {
  //       console.error(error)
  //       messageApi.error("데이터 불러오기 오류")
  //     }
  //   }

  //   fetchData()
  // }, [messageApi])

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