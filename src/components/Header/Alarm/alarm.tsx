import { useState } from "react"
import {
  CheckOutlined,
  CloseOutlined,
  IdcardOutlined,
  WechatOutlined,
} from "@ant-design/icons"
import styles from "./alarm.module.css"
import { Badge, Button, Card, Checkbox, Drawer, Input, Modal } from "antd"
import Meta from "antd/es/card/Meta"

const Alarm: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [modal2Open, setModal2Open] = useState(false)
  const [checked, setChecked] = useState(["female"])
  const [checkedSmoking, setCheckedSmoking] = useState(["Apple"])
  const readOnly = true

  const handleChange = (checkedValues: any[]) => {
    if (readOnly) {
      setChecked(["female"])
    }
  }

  const handleSmokingChange = (checkedValues: any[]) => {
    if (readOnly) {
      setCheckedSmoking(["Apple"])
    }
  }

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const smokingOptions = [
    { label: "흡연", value: "Apple" },
    { label: "비흡연", value: "Pear" },
  ]

  const genderOptions = [
    { label: "여성", value: "female" },
    { label: "남성", value: "male" },
  ]

  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  return (
    <div className={styles.alarmContainer}>
      <div className={styles.alarmIcon} onClick={showDrawer}>
        <span>알림</span>
      </div>
      <Drawer title="알림" placement="right" onClose={onClose} open={open}>
        <Card
          cover={<Badge.Ribbon text="신청" />}
          style={{ width: 330, marginBottom: 10 }}
          actions={[
            <button onClick={() => setModal2Open(true)}>
              <IdcardOutlined />
            </button>,
            <CheckOutlined />,
            <CloseOutlined />,
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
          actions={[
            <button onClick={() => setModal2Open(true)}>
              <IdcardOutlined />
            </button>,
            <WechatOutlined />,
          ]}
        >
          <Meta
            title="000님이 룸메이트 신청이 승인 되었습니다!"
            description="채팅을 통해 소통해보세요!"
          />
          <div>
            <p className={styles.content}></p>
          </div>
        </Card>
      </Drawer>
      <Modal
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        closeIcon={null}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={() => setModal2Open(false)}
          >
            닫기
          </Button>,
        ]}
      >
        <div className={styles.profileTitle}>
          <Badge count="신청" showZero color="#6231ef" />
          <span>OOO님의 프로필</span>
        </div>
        <div className={styles.profileBox}>
          <div className={styles.profileSection}>
            <span>성별</span>
            <Checkbox.Group
              options={genderOptions}
              value={checked}
              onChange={handleChange}
            />
          </div>
          <div className={styles.profileSection}>
            <span>활동시간</span>
            <Input value={"오전"} style={{ width: 50 }} readOnly />
          </div>
          <div className={styles.profileSection}>
            <span>흡연</span>
            <Checkbox.Group
              options={smokingOptions}
              value={checkedSmoking}
              onChange={handleSmokingChange}
            />
          </div>
          <div className={styles.profileSection}>
            <span>MBTI</span>
            <Input value={"ISTJ"} style={{ width: 50 }} readOnly />
          </div>
          <div className={styles.profileSection}>
            <span>지역</span>
            <Input value={"마포구"} style={{ width: 60 }} readOnly />
          </div>
          <div className={styles.profileSection}>
            <span>연령</span>
            <Input value={"20대"} style={{ width: 50 }} readOnly />
          </div>
          <div className={styles.profileSection}>
            <span>본인 소개</span>
            <Input.TextArea
              autoSize={{ minRows: 1, maxRows: 5 }}
              value={lorem}
              style={{
                maxWidth: 472,
                overflowWrap: "break-word",
                wordWrap: "break-word",
              }}
              readOnly
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Alarm
