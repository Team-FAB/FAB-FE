import MyPage from '../myPage'
import styles from './applicant.module.css'
import { Badge, Card } from "antd"
import { EditOutlined, IdcardOutlined, CloseOutlined, WechatOutlined } from "@ant-design/icons"
import Meta from "antd/es/card/Meta"

const Applicant = () => {
  return (
    <>
      <MyPage />
      <div className={styles.applicantContainer}>
        <Card
          cover={<Badge.Ribbon text="신청" />}
          style={{ width: 530, marginBottom: 30 }}
          actions={[
            <IdcardOutlined title="프로필" />,
            <EditOutlined key="edit" />,
          ]}
        >
          <Meta
            title="000님이 룸메이트 신청을 하셨습니다."
            description="새로운 룸메이트 신청이 도착했습니다 💌"
          />
          <div>
            <p className={styles.content}></p>
          </div>
        </Card>
        <Card
          cover={<Badge.Ribbon text="거절" />}
          style={{ width: 530, marginBottom: 30 }}
          actions={[<CloseOutlined key="close" />]}
        >
          <Meta
            title="룸메이트 신청이 거절 되었습니다."
            description="룸메이트 매칭에 실패 했습니다 🥲"
          />
          <div>
            <p className={styles.content}></p>
          </div>
        </Card>
        <Card
          cover={<Badge.Ribbon text="승인" />}
          style={{ width: 530, marginBottom: 30 }}
          actions={[<WechatOutlined />, <EditOutlined key="edit" />]}
        >
          <Meta
            title="000님이 룸메이트 신청을 하셨습니다."
            description="새로운 룸메이트 신청이 도착했습니다 💌"
          />
          <div>
            <p className={styles.content}></p>
          </div>
        </Card>
      </div>
    </>
  )
}

export default Applicant