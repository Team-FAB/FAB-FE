import { UserOutlined } from "@ant-design/icons";
import styles from "./mainpostCard.module.css";
import { Badge, Card } from "antd";

const MainPostCard: React.FC = () => {
  return (
    <div className={styles.cardContainer}>
      <Badge.Ribbon text="모집">
        <Card style={{ width: 250, marginTop: 16 }}>
          <div className={styles.cardText}>
            <span className={styles.cardTitle}>제목</span>
          </div>
          <div className={styles.author}>
            <span>작성자</span>
            <UserOutlined style={{ color: "#ff0000" }} />
          </div>
          <div className={styles.date}>2023-10-20</div>
          <div className={styles.cardBadgeContainer}>
            <Badge className={styles.cardBadgeArea}>지역</Badge>
            <Badge className={styles.cardBadgePeriod}>3~6개월</Badge>
            <Badge className={styles.cardBadgePrice}>5,000,000원</Badge>
          </div>
        </Card>
      </Badge.Ribbon>
    </div>
  );
};

export default MainPostCard;
