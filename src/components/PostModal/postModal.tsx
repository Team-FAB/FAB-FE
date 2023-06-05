import React from "react"
import { Modal, Badge, Button } from "antd"
import styles from "./postModal.module.css"

interface PostModalProps {
  post: any
  onClose: () => void
}

const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  return (
    <Modal
      visible={true}
      onOk={onClose}
      onCancel={onClose}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <Badge className={styles.badgePresent}>모집</Badge>
      <div className={styles.titleContainer}>
        <span className={styles.title}>{post.title}</span>
        <Badge className={styles.save}>찜하기</Badge>
      </div>
      <div className={styles.content}>{post.content}</div>
      <div className={styles.ProfileContainer}>
        <img
          className={styles.profileImg}
          src="https://via.placeholder.com/25"
        ></img>
        <span className={styles.ProfileContent}>
          {post.nickname} {post.createdDate}
        </span>
        <Button className={styles.apply}>신청하기</Button>
      </div>
      <div className={styles.line}></div>
      <div className={styles.cardBadgeContainer}>
        <Badge className={styles.cardBadgeArea}>{post.region}</Badge>
        <Badge className={styles.cardBadgePeriod}>{post.period}</Badge>
        <Badge className={styles.cardBadgePrice}>{post.price}</Badge>
      </div>
    </Modal>
  )
}

export default PostModal
