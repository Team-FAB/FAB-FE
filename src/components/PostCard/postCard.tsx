import { UserOutlined } from "@ant-design/icons"
import styles from "./postCard.module.css"
import { Badge, Card, message } from "antd"
import PostModal from "../PostModal/postModal"
import { useState } from "react"
import { Props, Post } from "../../interface/interface"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"

const PostCard: React.FC<Props> = ({ showRecruitOnly, posts }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const isLogged = useSelector((state: RootState) => state.user.isLogged)
  const [messageApi, contextHolder] = message.useMessage()

  const handlePostClick = (post: Post) => {
    if (isLogged === true) {
      setSelectedPost(post)
    } else {
      messageApi.info("로그인 후 사용 가능합니다.")
    }
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  const recruit = (isRecruit: boolean) => {
    if (isRecruit) {
      return "모집"
    } else {
      return "마감"
    }
  }

  const postsToShow = showRecruitOnly
    ? posts.filter((post) => post.isRecruit === true)
    : posts

  return (
    <>
      {postsToShow.map((post) => (
        <div
          key={post.id}
          className={styles.cardContainer}
          onClick={() => handlePostClick(post)}
        >
          {post.isRecruit === true ? (
            <Badge.Ribbon key={post.id} text={recruit(post.isRecruit)}>
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
                  <Badge className={styles.cardBadgePeriod}>
                    {post.period}
                  </Badge>
                  <Badge className={styles.cardBadgePrice}>{post.price}</Badge>
                </div>
              </Card>
            </Badge.Ribbon>
          ) : (
            <Badge.Ribbon
              key={post.id}
              text={recruit(post.isRecruit)}
              color="#8a8a8a"
            >
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
                  <Badge className={styles.cardBadgePeriod}>
                    {post.period}
                  </Badge>
                  <Badge className={styles.cardBadgePrice}>{post.price}</Badge>
                </div>
              </Card>
            </Badge.Ribbon>
          )}
        </div>
      ))}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={handleCloseModal} />
      )}
      {contextHolder}
    </>
  )
}

export default PostCard
