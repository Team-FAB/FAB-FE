import BoardCard from '../../../components/BoardCard/boardCard'
import PostCard from '../../../components/PostCard/postCard'
import styles from './board.module.css'

const Board = () => {
  return (
    <div className={styles.boardContainer}>
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
        <BoardCard />
    </div>
  )
}

export default Board