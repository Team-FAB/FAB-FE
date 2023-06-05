import styles from "./recommendCard.module.css";
import { Badge, Card } from "antd";

const RecommendPostCard: React.FC = () => {
  return (
    <div className={styles.cardContainer}>
      <Badge.Ribbon text="추천">
        <Card style={{ width: 250, marginTop: 16 }}>
          <div className={styles.cardText}>
            <span className={styles.cardTitle}>닉네임</span>
          </div>
          <div className={styles.date}>
            OOO님과 프로필이 비슷한
            <br />
            룸메이트입니다!
            <br /> 확인해보세요 ~
          </div>
          <div className={styles.cardBadgeContainer}>
            <Badge className={styles.cardBadgePrice}>프로필 보기</Badge>
          </div>
        </Card>
      </Badge.Ribbon>
    </div>
  );
};

export default RecommendPostCard;
