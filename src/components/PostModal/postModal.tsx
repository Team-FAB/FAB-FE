import React, { useState } from "react"
import { Modal, Badge, Button } from "antd"
import styles from "./PostModal.module.css"

interface PostModalProps {
  post: any
  onClose: () => void
}

const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  const [isSaved, setIsSaved] = useState(false)
  const recruit = (isRecruit: boolean) => {
    if (isRecruit) {
      return "모집"
    } else {
      return "마감"
    }
  }

  const saveClassName = isSaved
    ? `${styles.save} ${styles.saveActive}`
    : styles.save

  const handleSaveClick = () => {
    setIsSaved(!isSaved)
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
    return (
      "~" +
      price.toLocaleString("ko-KR") + "원"
    )
  }

  return (
    <Modal
      visible={true}
      onOk={onClose}
      onCancel={onClose}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      {post.isRecruit === true ? (
        <div>
          <Badge className={styles.badgePresent}>
            {recruit(post.isRecruit)}
          </Badge>
          <div className={styles.titleContainer}>
            <span className={styles.title}>{post.title}</span>
            <span className={saveClassName} onClick={handleSaveClick}>
              찜하기
            </span>
          </div>
          <div className={styles.content}>{post.content}</div>
          <div className={styles.ProfileContainer}>
            <img
              className={styles.profileImg}
              src="https://via.placeholder.com/25"
            ></img>
            <span className={styles.ProfileContent}>
              {post.nickname} {formatDate(post.createdDate)}
            </span>
            <Button className={styles.apply} type="primary">
              신청하기
            </Button>
          </div>
          <div className={styles.line}></div>
          <div className={styles.cardBadgeContainer}>
            <Badge className={styles.cardBadgeArea}>{post.region}</Badge>
            <Badge className={styles.cardBadgePeriod}>{post.period}</Badge>
            <Badge className={styles.cardBadgePrice}>
              {formatPrice(post.price)}
            </Badge>
          </div>
        </div>
      ) : (
        <div>
          <Badge className={styles.isBadgePresent}>
            {recruit(post.isRecruit)}
          </Badge>
          <div className={styles.titleContainer}>
            <span className={styles.title}>{post.title}</span>
            <span className={saveClassName} onClick={handleSaveClick}>
              찜하기
            </span>
          </div>
          <div className={styles.content}>{post.content}</div>
          <div className={styles.ProfileContainer}>
            <img
              className={styles.profileImg}
              src="https://via.placeholder.com/25"
            ></img>
            <span className={styles.ProfileContent}>
              {post.nickname} {formatDate(post.createdDate)}
            </span>
            <Button className={styles.apply} type="primary">
              신청하기
            </Button>
          </div>
          <div className={styles.line}></div>
          <div className={styles.cardBadgeContainer}>
            <Badge className={styles.cardBadgeArea}>{post.region}</Badge>
            <Badge className={styles.cardBadgePeriod}>{post.period}</Badge>
            <Badge className={styles.cardBadgePrice}>
              {formatPrice(post.price)}
            </Badge>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default PostModal
