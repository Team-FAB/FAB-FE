import { RedoOutlined } from '@ant-design/icons'
import styles from './applicant.module.css'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import Applicant from './applicant'
import MyPage from '../myPage'
import { userMyApply } from '../../../api'

const Apply = () => {

  const [showApplicant, setShowApplicant] = useState(false)

  const toggleRecruitOnly = () => {
    setShowApplicant(!showApplicant)
  }

  const refresh = () => {
    window.location.reload()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/${userMyApply}/total`, {
          method: "GET",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        })

        if (!response.ok) {
          throw new Error(`서버 상태 응답 ${response.status}`)
        }

        const data = await response.json()
        // setCount(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <MyPage />
      <div className={styles.applyContainer}>
        <div className={styles.applyTitle}>
          <h3>룸메이트를 찾아보세요 👋🏻</h3>
          <div className={styles.applyBtn}>
            <Button className={styles.circleBtn} shape="circle" onClick={refresh}>
              <RedoOutlined />
            </Button>
            <Button style={{ width: 90, display: 'flex', justifyContent: 'center' }} onClick={toggleRecruitOnly}>
              {showApplicant ? "신청 받았어요" : "신청 했어요"}
            </Button>
          </div>
        </div>
        <div className={styles.applicantContainer}>
          <Applicant
          />
        </div>
      </div>
    </>
  )
}

export default Apply