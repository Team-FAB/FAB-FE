import { UserOutlined } from "@ant-design/icons"
import styles from "./mainpostCard.module.css"
import { Badge, Card } from "antd"
import { RoomMateSearchProps } from "../../interface/interface"

const MainPostCard: React.FC<RoomMateSearchProps> = ({ post, onClick }) => {
  const formatDate = (dateString: string): string => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    } as const
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const formatPrice = (price: number): string => {
    return "~" + price.toLocaleString("ko-KR") + "원"
  }

  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <Badge.Ribbon text="모집">
        <Card style={{ width: 250, marginTop: 16 }}>
          <div className={styles.cardText}>
            <span className={styles.cardTitle}>{post?.title}</span>
          </div>
          <div className={styles.author}>
            <span>{post?.nickname}</span>
            {post?.gender === "여성" ? (
              <UserOutlined style={{ color: "#ff0000" }} />
            ) : (
              <UserOutlined style={{ color: "#2858FF" }} />
            )}
          </div>
          <div className={styles.date}>
            {post?.createdDate ? formatDate(post.createdDate) : "N/A"}
          </div>
          <div className={styles.cardBadgeContainer}>
            <Badge className={styles.cardBadgeArea}>{post?.region}</Badge>
            <Badge className={styles.cardBadgePeriod}>{post?.period}</Badge>
            <Badge className={styles.cardBadgePrice}>
              {post?.price ? formatPrice(post.price) : "N/A"}
            </Badge>
          </div>
        </Card>
      </Badge.Ribbon>
    </div>
  )
}

export default MainPostCard
