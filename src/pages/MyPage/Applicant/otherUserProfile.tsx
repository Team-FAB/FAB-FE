import { Button, Input, Modal, Radio } from "antd"
import React from "react"
import styles from "../../../components/RecommendModal/recommendModal.module.css"
import { Post, RecommendModalProps } from "../../../interface/interface"
import { useEffect, useState } from "react"
import PostModal from "../../../components/PostModal/postModal"

const OtherUserProfile: React.FC<RecommendModalProps> = ({
  visible,
  onClose,
  userProfile,
}) => {
  const [checkedGender, setCheckedGender] = useState<string>("")
  const [checkedSmoking, setCheckedSmoking] = useState<string>("")
  const [selectedArticle, setSelectedArticle] = useState<Post | null>(null)
  
  // 유저 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userProfile) {
          setCheckedGender(userProfile.gender)
          setCheckedSmoking(userProfile.isSmoker ? "흡연" : "비흡연")
        }
      } catch (error) {
        console.error("Error:", error)
      }
    }
    fetchData()
  }, [])

  const smokingOptions = [
    { label: "흡연", value: "흡연" },
    { label: "비흡연", value: "비흡연" },
  ]

  const genderOptions = [
    { label: "여성", value: "여성" },
    { label: "남성", value: "남성" },
  ]

  return (
    <>
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
      {userProfile && (
        <>
        <div className={styles.profileTitle}>
          <span>
            <span className={styles.userProfileNickname}>
              {userProfile?.nickname}
            </span>{" "}
            님의 프로필
          </span>
        </div>
        <div className={styles.profileBox}>
          <div
            className={`${styles.profileSection} ${styles.profileSection2Col}`}
          >
            <span>성별</span>
            <Radio.Group
              options={genderOptions}
              value={checkedGender}
              optionType="button"
            />
          </div>
          <div
            className={`${styles.profileSection} ${styles.profileSection2Col}`}
          >
            <span>흡연</span>
            <Radio.Group
              options={smokingOptions}
              value={checkedSmoking}
              optionType="button"
            />
          </div>
          <div className={styles.profileSection}>
            <span>활동시간</span>
            <Input
              value={userProfile?.activityTime}
              style={{ width: 50 }}
              readOnly
            />
          </div>
          <div
            className={`${styles.profileSection} ${styles.profileSection4Col}`}
          >
            <span>MBTI</span>
            <Input value={userProfile?.mbti} style={{ width: 50 }} readOnly />
          </div>
          <div
            className={`${styles.profileSection} ${styles.profileSection4Col}`}
          >
            <span>지역</span>
            <Input value={userProfile?.region} style={{ width: 60 }} readOnly />
          </div>
          <div
            className={`${styles.profileSection} ${styles.profileSection4Col}`}
          >
            <span>연령</span>
            <Input value={userProfile?.myAge} style={{ width: 50 }} readOnly />
          </div>
          <div
            className={`${styles.profileSection} ${styles.profileSection4Col}`}
          >
            <span>본인 소개</span>
            <Input.TextArea
              autoSize={{ minRows: 1, maxRows: 5 }}
              value={userProfile?.detail}
              style={{
                maxWidth: 472,
                overflowWrap: "break-word",
                wordWrap: "break-word",
              }}
              readOnly
            />
          </div>
        </div>
      </>
      )}
      </Modal>
      {selectedArticle && (
        <PostModal
          visible={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          post={selectedArticle}
        />
      )}
    </>
  )
}

export default OtherUserProfile
