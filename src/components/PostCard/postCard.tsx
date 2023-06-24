import { useState } from "react"
import { UserOutlined } from "@ant-design/icons"
import styles from "./postCard.module.css"
import { Badge, Card, message } from "antd"
import PostModal from "../PostModal/postModal"
import { Props, Post } from "../../interface/interface"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"

const PostCard: React.FC<Props> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [messageApi, contextHolder] = message.useMessage()
  const isLogged = useSelector((state: RootState) =>
    Boolean(state.user.data.token.atk),
  )

  const recruit = (recruiting: boolean) => {
    return recruiting ? "모집" : "마감"
  }

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

  const handlePostClick = (post: Post) => {
    if (isLogged === true) {
      setSelectedPost(post)
    } else {
      messageApi.error("로그인이 필요합니다.")
    }
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  const decodeHTML = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent || ""
  }

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          className={styles.cardContainer}
          onClick={() => handlePostClick(post)}
        >
          {post.recruiting === true ? (
            <Badge.Ribbon key={post.id} text={recruit(post.recruiting)}>
              <Card style={{ width: 250, marginTop: 16 }}>
                <div className={styles.cardText}>
                  <span className={styles.cardTitle}>{post.title}</span>
                  <span className={styles.cardContent}>
                    {decodeHTML(post.content)}
                  </span>
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
                  <span>{formatDate(post.createdDate)}</span>
                </div>
                <div className={styles.cardBadgeContainer}>
                  <Badge className={styles.cardBadgeArea}>{post.region}</Badge>
                  <Badge className={styles.cardBadgePeriod}>
                    {post.period}
                  </Badge>
                  <Badge className={styles.cardBadgePrice}>
                    {formatPrice(post.price)}
                  </Badge>
                </div>
              </Card>
            </Badge.Ribbon>
          ) : (
            <Badge.Ribbon
              key={post.id}
              text={recruit(post.recruiting)}
              style={{ background: "#8a8a8a", color: "#8a8a8a" }}
            >
              <Card style={{ width: 250, marginTop: 16 }}>
                <div className={styles.cardText}>
                  <span className={styles.cardTitle}>{post.title}</span>
                  <span className={styles.cardContent}>
                    {decodeHTML(post.content)}
                  </span>
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
                  <span>{formatDate(post.createdDate)}</span>
                </div>
                <div className={styles.cardBadgeContainer}>
                  <Badge className={styles.cardBadgeArea}>{post.region}</Badge>
                  <Badge className={styles.cardBadgePeriod}>
                    {post.period}
                  </Badge>
                  <Badge className={styles.cardBadgePrice}>
                    {formatPrice(post.price)}
                  </Badge>
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
