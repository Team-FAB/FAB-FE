import styles from "./recommendCard.module.css";
import { Badge, Card , Button } from "antd";

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

interface Props {
  user: User;
  onClick?: () => void;
}

const RecommendPostCard: React.FC<Props> = ({ user, onClick }) => {
  return (
    <div onClick={onClick} className={styles.cardContainer}>
      <Badge.Ribbon text="추천">
        <Card style={{ width: 250, marginTop: 16 }}>
          <div className={styles.cardText}>
            <span className={styles.cardTitle}>{user.nickname}</span>
          </div>
          <div className={styles.date}>
            OOO님과 프로필이 비슷한
            <br />
            룸메이트입니다!
            <br /> 확인해보세요 ~
          </div>
          <div className={styles.cardBadgeContainer}>
            <Button className={styles.cardBadgePrice} type="primary">프로필 보기</Button>
          </div>
        </Card>
      </Badge.Ribbon>
    </div>
  );
};

export default RecommendPostCard;
