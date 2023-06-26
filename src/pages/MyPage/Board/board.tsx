import { useEffect, useState } from 'react';
import styles from './board.module.css'
import { Post } from '../../../interface/interface';
import PostModal from '../../../components/PostModal/postModal';
import MyPage from '../myPage';
import { userMyArticles } from '../../../api';
import PostCard from '../../../components/PostCard/postCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import useFetch from '../../../hooks/useFetch';
import { Spin } from 'antd';

const Board: React.FC = () => {

  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const userToken = useSelector((state : RootState) => state.user.data.token)

  // 게시글 불러오기
  const {
    datas: boardData,
    isLoading: boardDataLoading,
    isSuccess: boardSuccess,
    setUrl: setBoardUrl,
    setHeaders: setBoardHeaders,
    setMethod: setBoardMethod,
    setBody: setBoardBody,
  } = useFetch<Post[] | null>("", "", {}, null)

  const handleBoard = () => {
    setBoardUrl(`/api/${userMyArticles}`)
    setBoardMethod("GET")
    setBoardHeaders(
      new Headers({
        "Content-Type": "application/json",
        Authorization: userToken.atk.toString(),
      }),
    )
    setBoardBody()
  }

  useEffect(() => {
    if (boardSuccess && boardData) {
      try {
        setPosts(boardData)
      } catch (error) {
        console.error(error)
      }
    }
  }, [boardSuccess, boardData])

  useEffect(() => {
    handleBoard()
  }, [])

  // 게시글 모달창 닫기
  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  return (
    <>
      <MyPage />
      <div className={styles.boardContainer}>
        <div className={styles.cardGrid}>
          {
            boardDataLoading ? (
              <Spin />
            ) : (
              <PostCard posts={posts}/>
            )
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