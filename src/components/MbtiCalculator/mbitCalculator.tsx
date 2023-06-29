import React, { useState } from "react"
import styles from "./mbitCalculator.module.css"
import MbitCalculatorModal from "./mbtiCalculatorModal"
import { Button } from "antd"

const MbitCalculator: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Button className={styles.logoButton} onClick={showModal} type="primary">
        <img
          className={styles.mbtiIcon}
          src="/mbti.svg"
          alt="mbti로고"
        />
      </Button>
      <MbitCalculatorModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  )
}

export default MbitCalculator
