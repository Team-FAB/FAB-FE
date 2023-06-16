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
  const [showApply, setShowApply] = useState(true)
  const [count, setCount] = useState(0)
  const [isLeaderCurrentPage, setIsLeaderCurrentPage] = useState(1)
  const [isNotLeaderCurrentPage, setIsNotLeaderCurrentPage] = useState(1)
  const pageSize = 3
  const [applyPosts, setApplyPosts] = useState<ApplyProps[]>([])

  const toggleShowApply = () => {
    setShowApply(!showApply)
  }

  const refresh = () => {
    window.location.reload()
  }

  const handleisLeaderPage = (page: number) => {
    setIsLeaderCurrentPage(page)
  }

  const handleisNotLeaderPage = (page: number) => {
    setIsNotLeaderCurrentPage(page)
  }

  useEffect(() => {
    const fetchData = async () => {
      let apiEndpoint

      if (showApply) {
        apiEndpoint = `/api/${userMyApply}?page=${isLeaderCurrentPage}&size=3&isLeader=true`
      } else {
        apiEndpoint = `/api/${userMyApply}?page=${isNotLeaderCurrentPage}&size=3&isLeader=false`
      }

      try {
        const response = await fetch(apiEndpoint, {
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
        setCount(data.data) // 개수로 수정
        setApplyPosts(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [isLeaderCurrentPage, isNotLeaderCurrentPage, showApply])

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
            <Button style={{ width: 90, display: 'flex', justifyContent: 'center' }} onClick={toggleShowApply}>
              {showApply ? "신청 받았어요" : "신청 했어요"}
            </Button>
          </div>
        </div>
        <div className={styles.applicantContainer}>
          {
            applyPosts.map((post) => (
              <div key={post.applyId}>
                <Applicant
                  applyPosts={applyPosts}
                  currentPage={showApply ? isLeaderCurrentPage : isNotLeaderCurrentPage}
                  showApply={showApply} />
              </div>
            ))
          }
          {showApply ? (
            <Pagination 
              className={styles.pagination}
              current={isLeaderCurrentPage}
              onChange={handleisLeaderPage}
              total={count}
              pageSize={pageSize} />
          ) : (
            <Pagination 
              className={styles.pagination}
              current={isNotLeaderCurrentPage}
              onChange={handleisNotLeaderPage}
              total={count}
              pageSize={pageSize} />
          )}
        </div>
        
      </div>
    </>
  )
}

export default Apply