import React, { useState } from "react"
import { Modal, Button, Select } from "antd"
import styles from "./mbtiCalculatorModal.module.css"
import { mbtiGraph, mbtiTypes } from "../../object/mbtiGraph"
import { MbitCalculatorModalProps } from "../../interface/interface"

const { Option } = Select

const MbitCalculatorModal: React.FC<MbitCalculatorModalProps> = ({
  isModalVisible,
  handleOk,
  handleCancel,
}) => {
  const [compatibility, setCompatibility] = useState<React.ReactNode>("")
  const [mbtiType1, setMbtiType1] = useState("")
  const [mbtiType2, setMbtiType2] = useState("")

  const compatibilityLevels = [
    <div style={{ color: "#F04333" }} className={styles.mbtiResult}>
      <img src="/mbti4.svg" className={styles.mbtiIcon} />
      <span>우리 궁합 다시 생각해봐요.</span>
    </div>,
    <div style={{ color: "#F07933" }} className={styles.mbtiResult}>
      <img src="/mbti2.svg" className={styles.mbtiIcon} />
      <span>최악은 아니지만 좋지도 않아요.</span>
    </div>,
    <div style={{ color: "#F0CB33" }} className={styles.mbtiResult}>
      <img src="/mbti5.svg" className={styles.mbtiIcon} />
      <span>안맞는 것 맞는것, 반반!</span>
    </div>,
    <div style={{ color: "#70E5AD" }} className={styles.mbtiResult}>
      <img src="/mbti1.svg" className={styles.mbtiIcon} />
      <span>좋은 관계로 발전 가능!</span>
    </div>,
    <div style={{ color: "#70B7F2" }} className={styles.mbtiResult}>
      <img src="/mbti3.svg" className={styles.mbtiIcon} />
      <span>우리 궁합은 천생연분!</span>
    </div>,
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
        className={styles.mbtiModal}
      >
        <div className={styles.title}>MBTI 궁합 계산기</div>
        <div className={styles.selectContainer}>
          <Select
            placeholder="MBTI를 선택해주세요."
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
            placeholder="MBTI를 선택해주세요."
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
        <Button
          onClick={calculateCompatibility}
          className={styles.button}
          type="primary"
        >
          궁합 계산하기
        </Button>
        <div className={styles.result}>{compatibility}</div>
        <div className={styles.informContainer}>
          <span style={{ color: "#70B7F2" }} className={styles.mbtiBox}>
            <img src="/mbti3.svg" className={styles.mbtiIcon} />
            우리 궁합은 천생연분!
          </span>
          <span style={{ color: "#70E5AD" }} className={styles.mbtiBox}>
            <img src="/mbti1.svg" className={styles.mbtiIcon} />
            좋은 관계로 발전 가능!
          </span>
          <span style={{ color: "#F0CB33" }} className={styles.mbtiBox}>
            <img src="/mbti5.svg" className={styles.mbtiIcon} />
            안맞는 것 맞는것, 반반!
          </span>
          <span style={{ color: "#F07933" }} className={styles.mbtiBox}>
            <img src="/mbti2.svg" className={styles.mbtiIcon} />
            최악은 아니지만 좋지도 않아요.
          </span>
          <span style={{ color: "#F04333" }} className={styles.mbtiBox}>
            <img src="/mbti4.svg" className={styles.mbtiIcon} />
            우리 궁합 다시 생각해봐요.
          </span>
        </div>
      </Modal>
    </>
  )
}

export default MbitCalculatorModal
