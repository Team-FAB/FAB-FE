import { UserOutlined } from "@ant-design/icons"
import styles from "./postCard.module.css"
import { Badge, Card } from "antd"
import PostModal from "../PostModal/postModal"
import postsData from "../../assets/posts.json"
import { useState } from "react"
import { Post } from "../../interface/interface"

const PostCard: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  return (
    <>
      {postsData.posts.map((post) => (
        <div
          className={styles.cardContainer}
          onClick={() => handlePostClick(post)}
        >
          <Badge.Ribbon key={post.id} text="모집">
            <Card style={{ width: 250, marginTop: 16 }}>
              <div className={styles.cardText}>
                <span className={styles.cardTitle}>{post.title}</span>
                <span className={styles.cardContent}>{post.content}</span>
              </div>
              <div className={styles.user}>
                <div className={styles.author}>
                  <span>{post.nickname}</span>
                  {post.gender === "FEMALE" ? (
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
      ))}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={handleCloseModal} />
      )}
    </>
  )
}

export default PostCard
