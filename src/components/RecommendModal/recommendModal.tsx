import React from "react";
import { Modal, Badge, Button } from "antd";
import styles from "./recommendModal.module.css"

interface User {
  id : number,
  nickname : string,
  image : string,
  email : string,
  gender : string,
  smoke : boolean,
  MBTI : string,
  region : string,
  minAge : number,
  maxAge : number,
  myAge : number,
  activityTime : string,
  faviteTag : string,
  hateTag : string,
  myText : string,
}


interface RecommendModalProps {
  user: User;
  onClose: () => void;
}

const RecommendModal: React.FC<RecommendModalProps> = ({ user, onClose }) => {
    return (
      <Modal
        visible={true}
        onOk={onClose}
        onCancel={onClose}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <Badge className={styles.badgePresent}>신청</Badge>
        <div className={styles.ProfileContainer}>
          <img className={styles.profileImg} src='https://via.placeholder.com/25'></img>
          <span className={styles.ProfileContent}>'{user.nickname}' 님의 프로필</span>
        </div>
        <div>
        </div>
        
        <div className={styles.content}>{user.gender}</div>

        <div className={styles.line}></div>
        <div className={styles.cardBadgeContainer}>
            <Badge className={styles.cardBadgeArea}>지역</Badge>
            <Badge className={styles.cardBadgePeriod}>3~6개월</Badge>
            <Badge className={styles.cardBadgePrice}>5,000,000원</Badge>
        </div>
      </Modal>
    );
};
  
export default RecommendModal;