import React from "react";
import { Modal, Badge, Button } from "antd";
import styles from "./PostModal.module.css";

interface PostModalProps {
  post: any;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  const recruit = (isRecruit: boolean) => {
    if (isRecruit) {
      return "모집";
    } else {
      return "마감";
    }
  };

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
        </div>
      ) : (
        <div>
          <Badge className={styles.isBadgePresent}>
            {recruit(post.isRecruit)}
          </Badge>
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
        </div>
      )}
    </Modal>
  );
};

export default PostModal;
