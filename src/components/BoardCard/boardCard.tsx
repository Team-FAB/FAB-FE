import styles from './boardCard.module.css'
import { UserOutlined } from "@ant-design/icons";
import { Badge, Card } from "antd";

const BoardCard = () => {
  return (
    <div className={styles.boardCardContainer}>
      <div className={styles.cardContainer}>
        <Card style={{ width: 250, marginTop: 16 }}>
          <div className={styles.cardText}>
            <div className={styles.cardTitleBox}>
              <span className={styles.cardTitle}>제목</span>
              <Badge className={styles.statusBadgeArea}>마감</Badge>
            </div>
            <span className={styles.cardContent}>글 내용</span>
          </div>
          <div className={styles.user}>
            <div className={styles.author}>
              <span>작성자</span>
              <UserOutlined style={{ color: "#ff0000" }} />
            </div>
            <span>2023-10-20</span>
          </div>
          <div className={styles.cardBadgeContainer}>
            <Badge className={styles.cardBadgeArea}>지역</Badge>
            <Badge className={styles.cardBadgePeriod}>3~6개월</Badge>
            <Badge className={styles.cardBadgePrice}>5,000,000원</Badge>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default BoardCard