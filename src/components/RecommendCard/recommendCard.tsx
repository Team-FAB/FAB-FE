import { useState, useEffect } from "react"
import styles from "./recommendCard.module.css"
import { Badge, Card, Button } from "antd"
import { mbtiGraph } from "../../object/mbtiGraph"

interface User {
  id: number
  nickname: string
  mbti: string
}

interface Data {
  mbti: string
  recommendDtoList: {
    id: number
    nickname: string
    mbti: string
  }[]
}

interface Props {
  user: User
  onClick?: () => void
  data: Data
}

const RecommendPostCard: React.FC<Props> = ({ user, onClick, data }) => {
  const [compatibility, setCompatibility] = useState<React.ReactNode>("")

  const compatibilityLevels = [
    <div style={{ color: "#F04333" }} className={styles.mbtiResult}>
      <img src="src/assets/mbti4.svg" className={styles.mbtiIcon} />
    </div>,
    <div style={{ color: "#F07933" }} className={styles.mbtiResult}>
      <img src="src/assets/mbti2.svg" className={styles.mbtiIcon} />
    </div>,
    <div style={{ color: "#F0CB33" }} className={styles.mbtiResult}>
      <img src="src/assets/mbti5.svg" className={styles.mbtiIcon} />
    </div>,
    <div style={{ color: "#70E5AD" }} className={styles.mbtiResult}>
      <img src="src/assets/mbti1.svg" className={styles.mbtiIcon} />
    </div>,
    <div style={{ color: "#70B7F2" }} className={styles.mbtiResult}>
      <img src="src/assets/mbti3.svg" className={styles.mbtiIcon} />
    </div>,
  ]

  const calculateCompatibility = () => {
    const key1 = `${data.mbti}-${user.mbti}`
    if (key1 in mbtiGraph) {
      setCompatibility(compatibilityLevels[mbtiGraph[key1]])
    } else {
      setCompatibility("해당 궁합 정보를 찾을 수 없습니다.")
    }
  }
  useEffect(() => {
    calculateCompatibility()
  }, [data.mbti, user.mbti])

  console.log(data.mbti)
  return (
    <div onClick={onClick} className={styles.cardContainer}>
      <Badge.Ribbon text="추천">
        <Card style={{ width: 250, marginTop: 16 }}>
          <div>{compatibility}</div>
          <div className={styles.cardText}>
            <span className={styles.cardTitle}>{user.nickname}</span>
          </div>
          <div className={styles.date}>
            님과 프로필이 비슷한
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
