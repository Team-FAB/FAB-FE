import { useEffect, useState } from "react"
import { UserOutlined } from "@ant-design/icons"
import styles from "./postCard.module.css"
import { Badge, Card, message } from "antd"
import PostModal from "../PostModal/postModal"
import { Props, Post } from "../../interface/interface"
import { userArticle } from "../../api"

const PostCard: React.FC<Props> = ({ currentPage, showRecruitOnly, link, token}) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [messageApi, contextHolder] = message.useMessage()

  const recruit = (isRecruit: boolean) => {
    return isRecruit ? "모집" : "마감"
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = link && token ?  
        await fetch(link,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
              "ngrok-skip-browser-warning": "69420",
            },
          })
        : await fetch(
          `${userArticle}?page=${currentPage}&size=9&isRecruiting=false`,
          {
            method: "GET",
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
            }),
          },
        )

        if (!response.ok) {
          throw new Error(`서버 상태 응답 ${response.status}`)
        }

        const data = await response.json()
        setPosts(data.data)
      } catch (error) {
        console.error(error)
        messageApi.error("데이터 불러오기 오류")
      }
    }

    fetchData()
  }, [currentPage, showRecruitOnly, messageApi])

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  const postsToShow = showRecruitOnly
    ? posts.filter((data) => data.recruiting)
    : posts

  const decodeHTML = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent || ""
  }

  return (
    <>
      {postsToShow.length > 0 ? postsToShow.map((post) => (
        <div
          key={post.id}
          className={styles.cardContainer}
          onClick={() => handlePostClick(post)}
        >
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
                <Badge className={styles.cardBadgePeriod}>{post.period}</Badge>
                <Badge className={styles.cardBadgePrice}>
                  {formatPrice(post.price)}
                </Badge>
              </div>
            </Card>
          </Badge.Ribbon>
        </div>
      )) : (
        <div className={styles.noPosts}>글이 존재하지 않습니다.</div>
      )}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={handleCloseModal} />
      )}
      {contextHolder}
    </>
  )
}

export default PostCard
