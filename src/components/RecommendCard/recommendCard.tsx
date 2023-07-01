import styles from "./recommendCard.module.css"
import { Badge, Card, Button } from "antd"
import { mbtiGraph } from "../../object/mbtiGraph"
import { RecommendProps } from "../../interface/interface"

const RecommendPostCard: React.FC<RecommendProps> = ({ user, onClick, data }) => {
  const compatibilityLevels = [
    <div></div>,
    <div></div>,
    <div style={{ color: "#F0CB33" }} className={styles.mbtiResult}>
      <img src="/mbti5.svg" className={styles.mbtiIcon} />
    </div>,
    <div style={{ color: "#70E5AD" }} className={styles.mbtiResult}>
      <img src="/mbti1.svg" className={styles.mbtiIcon} />
    </div>,
    <div style={{ color: "#70B7F2" }} className={styles.mbtiResult}>
      <img src="/mbti3.svg" className={styles.mbtiIcon} />
    </div>,
  ]

  const compatibilityKey = `${data.mbti}-${user.mbti}`

  const compatibility =
    compatibilityKey in mbtiGraph &&
    mbtiGraph[compatibilityKey] >= 2 &&
    mbtiGraph[compatibilityKey] <= 4
      ? compatibilityLevels[mbtiGraph[compatibilityKey]]
      : compatibilityLevels[0]

  return (
    <div onClick={onClick} className={styles.cardContainer}>
      <Badge.Ribbon text="추천">
        <Card style={{ width: 250, marginTop: 16 }}>
          <div>{compatibility}</div>
          <div className={styles.cardText}>
            <span className={styles.cardTitle}>{user.nickname}</span>
          </div>
          <div className={styles.date}>
            {data.nickname }님과 프로필이 비슷한
            <br />
            룸메이트입니다!
            <br /> 확인해보세요 ~
          </div>
          <div className={styles.cardBadgeContainer}>
            <Button className={styles.cardBadgePrice} type="primary">
              프로필 보기
            </Button>
          </div>
        </Card>
      </Badge.Ribbon>
    </div>
  )
}

export default RecommendPostCard
