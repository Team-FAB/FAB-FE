import React, { useState, useEffect } from "react"
import { Button, Checkbox, Input, Modal } from "antd"
import styles from "./recommendModal.module.css"
import { RecommendModalProps } from "../../interface/interface"
import { userArticle } from "../../api"
import { Post } from "../../interface/interface"
import PostModal from "../PostModal/postModal"

const RecommendModal: React.FC<RecommendModalProps> = ({
  visible,
  onClose,
  userProfile,
  user,
}) => {
  const [checkedGender, setCheckedGender] = useState<string[]>([])
  const [checkedSmoking, setCheckedSmoking] = useState<string[]>([])
  const [userArticles, setUserArticles] = useState<Post[]>([])
  const [selectedArticle, setSelectedArticle] = useState<Post | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userProfile) {
          setCheckedGender([userProfile.gender])
          setCheckedSmoking([userProfile.issmoke ? "흡연" : "비흡연"])
          const response = await fetch(`/api/${userArticle}/users/${user.id}`)
          const data = await response.json()
          setUserArticles(data.data)
        }
      } catch (error) {
        console.error("Error:", error)
      }
    }
    fetchData()
  }, [userProfile])

  const smokingOptions = [
    { label: "흡연", value: "흡연" },
    { label: "비흡연", value: "비흡연" },
  ]

  const genderOptions = [
    { label: "여성", value: "여성" },
    { label: "남성", value: "남성" },
  ]

  const handleArticleClick = async (articleId: string) => {
    try {
      const response = await fetch(`/api/articles/${articleId}`, {
        method: "GET",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })
      const data = await response.json()
      setSelectedArticle(data.data)
    } catch (error) {
      console.error("Error:", error)
    }
  }


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
        <div className={styles.profileTitle}>
          <span>
            <span className={styles.userProfileNickname}>
              {userProfile?.nickname}
            </span>{" "}
            님의 프로필
          </span>
        </div>
        <div className={styles.profileBox}>
          <div className={styles.profileSection}>
            <span>성별</span>
            <Checkbox.Group options={genderOptions} value={checkedGender} />
          </div>
          <div className={styles.profileSection}>
            <span>활동시간</span>
            <Input
              value={userProfile?.activityTime}
              style={{ width: 50 }}
              readOnly
            />
          </div>
          <div className={styles.profileSection}>
            <span>흡연</span>
            <Checkbox.Group options={smokingOptions} value={checkedSmoking} />
          </div>
          <div className={styles.profileSection}>
            <span>MBTI</span>
            <Input value={userProfile?.mbti} style={{ width: 50 }} readOnly />
          </div>
          <div className={styles.profileSection}>
            <span>지역</span>
            <Input value={userProfile?.region} style={{ width: 60 }} readOnly />
          </div>
          <div className={styles.profileSection}>
            <span>연령</span>
            <Input value={userProfile?.myAge} style={{ width: 50 }} readOnly />
          </div>
          <div className={styles.profileSection}>
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
            <span>작성한 게시글</span>
            {userArticles.map((article) => (
              <div className={styles.articleTitle} key={article.id}>
                <a  onClick={() => handleArticleClick(article.id.toString())}>
                  {article.title}
                </a>
              </div>
            ))}
          </div>
        </div>
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

export default RecommendModal
