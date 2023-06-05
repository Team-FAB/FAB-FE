import { UserOutlined } from "@ant-design/icons"
import styles from "./postCard.module.css"
import { Badge, Card } from "antd"
import postsData from "../../assets/posts.json"

const PostCard: React.FC = () => {
  return (
    <div className={styles.cardContainer}>
      {postsData.posts.map((post) => (
        <Badge.Ribbon key={post.id} text="모집">
          <Card style={{ width: 250, marginTop: 16 }}>
            <div className={styles.cardText}>
              <span className={styles.cardTitle}>{post.title}</span>
              <span className={styles.cardContent}>{post.content}</span>
            </div>
            <div className={styles.user}>
              <div className={styles.author}>
                <span>{post.nickname}</span>
                <UserOutlined style={{ color: "#ff0000" }} />
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
      ))}
    </div>
  )
}

export default PostCard
