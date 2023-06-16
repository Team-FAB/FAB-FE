import React, { useState } from "react"
import { Button, Checkbox, Input, Modal } from "antd"
import styles from "./recommendModal.module.css"
import { RecommendModalProps } from "../../interface/interface"

const RecommendModal: React.FC<RecommendModalProps> = ({
  visible,
  onClose,
}) => {
  const [checked, setChecked] = useState(["female"])
  const [checkedSmoking, setCheckedSmoking] = useState(["Apple"])
  const readOnly = true

  const handleChange = () => {
    if (readOnly) {
      setChecked(["female"])
    }
  }

  const handleSmokingChange = () => {
    if (readOnly) {
      setCheckedSmoking(["Apple"])
    }
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
    <Modal
      centered
      open={visible}
      onOk={onClose}
      onCancel={onClose}
      closeIcon={null}
      footer={[
        <Button key="submit" type="primary" onClick={onClose}>
          닫기
        </Button>,
      ]}
    >
      <div className={styles.profileTitle}>
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
  )
}

export default RecommendModal
