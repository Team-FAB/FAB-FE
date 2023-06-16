import styles from "./boardCard.module.css"
import { UserOutlined } from "@ant-design/icons"
import { Badge, Card } from "antd"
import { RoomMateSearchProps } from "../../interface/interface"

const BoardCard: React.FC<RoomMateSearchProps> = ({ post, onClick }) => {
  return (
    <div className={styles.boardCardContainer} onClick={onClick}>
      <div className={styles.cardContainer}>
        <Badge.Ribbon text="마감" style={{ background: "#8a8a8a" }}>
          <Card style={{ width: 250, marginTop: 16 }}>
            <div className={styles.cardText}>
              <div className={styles.cardTitleBox}>
                <span className={styles.cardTitle}>{post.title}</span>
              </div>
              <span className={styles.cardContent}>{post.content}</span>
            </div>
            <div className={styles.user}>
              <div className={styles.author}>
                <span>{post.nickname}</span>
                {post.gender === "여성" ? (
                  <UserOutlined style={{ color: "#ff0000" }} />
                ) : (
                  <UserOutlined style={{ color: "#2858FF" }} />
                )}
              </div>
              <span>{post.createdDate}</span>
            </div>
            <div className={styles.cardBadgeContainer}>
              <Badge className={styles.cardBadgeArea}>{post.region}</Badge>
              <Badge className={styles.cardBadgePeriod}>{post.period}</Badge>
              <Badge className={styles.cardBadgePrice}>{post.price}</Badge>
            </div>
          </Card>
        </Badge.Ribbon>
      </div>
    </div>
  )
}

export default BoardCard
