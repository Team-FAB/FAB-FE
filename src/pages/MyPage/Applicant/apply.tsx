import { RedoOutlined } from '@ant-design/icons'
import styles from './applicant.module.css'
import { Button, Pagination } from 'antd'
import { useEffect, useState } from 'react'
import Applicant from './applicant'
import MyPage from '../myPage'
import { userMyApply } from '../../../api'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { ApplyProps } from '../../../interface/interface'

const Apply: React.FC = () => {

  const userToken = useSelector((state : RootState) => state.user.data.token)
  const [showApplicant, setShowApplicant] = useState(false)
  const [count, setCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 3
  const [applyPosts, setApplyPosts] = useState<ApplyProps[]>([])

  const toggleRecruitOnly = () => {
    setShowApplicant(!showApplicant)
  }

  const refresh = () => {
    window.location.reload()
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/${userMyApply}/total`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: userToken.atk.toString(),
          },
        })

        if (!response.ok) {
          throw new Error(`서버 상태 응답 ${response.status}`)
        }

        const data = await response.json()
        setCount(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [currentPage, showApplicant])

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
            applyPosts={applyPosts}
            currentPage={currentPage}
            showApplicant={showApplicant}
          />
        </div>
        <Pagination 
          className={styles.pagination}
          current={currentPage}
          onChange={handlePageChange}
          total={count}
          pageSize={pageSize} />
      </div>
    </>
  )
}

export default Apply