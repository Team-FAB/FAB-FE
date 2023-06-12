import React, { useState } from "react"
import { Modal, Button, Select } from "antd"
import styles from "./mbtiCalculatorModal.module.css"
import { mbtiGraph } from "../../object/mbtiGraph"

const { Option } = Select

interface MbitCalculatorModalProps {
  isModalVisible: boolean
  handleOk: () => void
  handleCancel: () => void
}

const MbitCalculatorModal: React.FC<MbitCalculatorModalProps> = ({
  isModalVisible,
  handleOk,
  handleCancel,
}) => {
  const [compatibility, setCompatibility] = useState<React.ReactNode>("")
  const [mbtiType1, setMbtiType1] = useState("")
  const [mbtiType2, setMbtiType2] = useState("")

  const compatibilityLevels = [
    <span style={{ color: "#FF0C00" }}>우리 궁합 다시 생각해봐요.</span>,
    <span style={{ color: "#E2670C" }}>최악은 아니지만 좋지도 않아요.</span>,
    <span style={{ color: "#79E103" }}>안맞는 것 맞는것, 반반!</span>,
    <span style={{ color: "#04F4D7" }}>좋은 관계로 발전 가능!</span>,
    <span style={{ color: "#0052FF" }}>우리 궁합은 천생연분!</span>,
  ]

  const mbtiTypes = [
    "INTJ",
    "INTP",
    "ENTJ",
    "ENTP",
    "INFJ",
    "INFP",
    "ENFJ",
    "ENFP",
    "ISTJ",
    "ISFJ",
    "ESTJ",
    "ESFJ",
    "ISTP",
    "ISFP",
    "ESTP",
    "ESFP",
  ]

  const calculateCompatibility = () => {
    const key1 = `${mbtiType1}-${mbtiType2}`
    if (key1 in mbtiGraph) {
      setCompatibility(compatibilityLevels[mbtiGraph[key1]])
    } else {
      setCompatibility("해당 궁합 정보를 찾을 수 없습니다.")
    }
  }

  return (
    <>
      <Modal
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div className={styles.title}>MBTI 궁합 계산기</div>
        <div className={styles.selectContainer}>
          <Select
            placeholder="첫번째 MBTI 유형을 선택하세요"
            onChange={(value) => setMbtiType1(value)}
            className={styles.select}
          >
            {mbtiTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="두번째 MBTI 유형을 선택하세요"
            onChange={(value) => setMbtiType2(value)}
            className={styles.select}
          >
            {mbtiTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </div>
        <Button onClick={calculateCompatibility} className={styles.button}>
          궁합 계산하기
        </Button>
        <div className={styles.result}>{compatibility}</div>
      </Modal>
    </>
  )
}

export default MbitCalculatorModal
