import React from "react"
import { Modal, Badge, Button } from "antd"
import styles from "./recommendModal.module.css"

interface User {
  id: number
  nickname: string
  image: string
  email: string
  gender: string
  smoke: boolean
  MBTI: string
  region: string
  minAge: number
  maxAge: number
  myAge: number
  activityTime: string
  faviteTag: string
  hateTag: string
  myText: string
}

interface RecommendModalProps {
  user: User
  onClose: () => void
}

const RecommendModal: React.FC<RecommendModalProps> = ({ user, onClose }) => {
  return (
    <Modal
      open={true}
      onOk={onClose}
      onCancel={onClose}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <Badge className={styles.badgePresent}>신청</Badge>
      <div className={styles.ProfileContainer}>
        <img
          className={styles.profileImg}
          src="https://via.placeholder.com/25"
        ></img>
        <span className={styles.ProfileContent}>
          '{user.nickname}' 님의 프로필
        </span>
      </div>
      <div className={styles.information}>
        <div className={styles.time}>
          <div className={styles.timeTitle}>활동시간</div>
          <span>오전</span> <span className={styles.box}></span>{" "}
          <span>오후</span> <span className={styles.box}></span>
        </div>
        <div className={styles.smoke}>
          <div className={styles.smokeTitle}>흡연</div>
          <span>오전</span> <span className={styles.box}></span>{" "}
          <span>오후</span> <span className={styles.box}></span>
        </div>
      </div>
    </Modal>
  )
}

export default RecommendModal
