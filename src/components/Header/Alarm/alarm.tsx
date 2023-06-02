import { useState } from "react"
import {
  BellFilled,
  CloseOutlined,
  EditOutlined,
  IdcardOutlined,
  WechatOutlined,
} from "@ant-design/icons"
import styles from "./alarm.module.css"
import { Badge, Card, Drawer } from "antd"
import Meta from "antd/es/card/Meta"

const Alarm: React.FC = () => {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <div className={styles.alarmContainer}>
      <div className={styles.alarmIcon} onClick={showDrawer}>
        <Badge dot>
          <BellFilled style={{ fontSize: 18, color: "#6231ef" }} />
        </Badge>
      </div>
      <Drawer title="알림" placement="right" onClose={onClose} open={open}>
        <Card
          cover={<Badge.Ribbon text="신청" />}
          style={{ width: 330, marginBottom: 10 }}
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
          style={{ width: 330, marginBottom: 10 }}
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
          style={{ width: 330, marginBottom: 10 }}
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
      </Drawer>
    </div>
  )
}

export default Alarm
