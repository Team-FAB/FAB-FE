import { UserOutlined } from "@ant-design/icons";
import styles from "./mainpostCard.module.css";
import { Badge, Card } from "antd";

interface MainPostCardProps {
  onClick: () => void;
  post: any;
}


const MainPostCard: React.FC<MainPostCardProps> = ({ post, onClick}) => {
  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <Badge.Ribbon text="모집">
        <Card style={{ width: 250, marginTop: 16 }}>
          <div className={styles.cardText}>
            <span className={styles.cardTitle}>{post.title}</span>
          </div>
          <div className={styles.author}>
            <span>{post.nickname}</span>
            <UserOutlined style={{ color: "#ff0000" }} />
          </div>
          <div className={styles.date}>{post.createdDate}</div>
          <div className={styles.cardBadgeContainer}>
            <Badge className={styles.cardBadgeArea}>{post.region}</Badge>
            <Badge className={styles.cardBadgePeriod}>{post.period}</Badge>
            <Badge className={styles.cardBadgePrice}>{post.price}</Badge>
          </div>
        </Card>
      </Badge.Ribbon>
    </div>
  );
};

export default MainPostCard;
