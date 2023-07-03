import { useEffect, useState } from 'react'
import styles from './board.module.css'
import { Post } from '../../../interface/interface'
import PostModal from '../../../components/PostModal/postModal'
import MyPage from '../myPage'
import { userMyArticles } from '../../../api'
import PostCard from '../../../components/PostCard/postCard'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import useFetch from '../../../hooks/useFetch'
import { Spin } from 'antd'

const Board: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const userToken = useSelector((state : RootState) => state.user.data.token)

  // 게시글
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

  // 게시글 불러오기
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
        {boardDataLoading ? (
          <Spin style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}/>
        ) : posts.length === 0 ? (
          <div className={styles.emptyBoard}>작성한 게시글이 없습니다 😐</div>
        ) : (
          <div className={styles.cardGrid}>
            <PostCard posts={posts} />
          </div>
        )}
        {selectedPost && (
          <PostModal post={selectedPost} onClose={handleCloseModal} />
        )}
      </div>
    </>
  )
}

export default Board