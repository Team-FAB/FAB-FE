import { RedoOutlined } from '@ant-design/icons'
import styles from './applicant.module.css'
import { Button, Pagination } from 'antd'
import { useEffect, useState } from 'react'
import Applicant from './applicant'
import MyPage from '../myPage'
import { userMyToApplicants, userMyFromApplicants } from '../../../api'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { ApplyProps } from '../../../interface/interface'

const Apply: React.FC = () => {

  const userToken = useSelector((state : RootState) => state.user.data.token)
  const [showApply, setShowApply] = useState(false)
  const [count, setCount] = useState(0)
  const [toCurrentPage, setToCurrentPage] = useState(1)
  const [fromCurrentPage, setFromCurrentPage] = useState(1)
  const pageSize = 3
  const [applyPosts, setApplyPosts] = useState<ApplyProps[]>([])

  const toggleShowApply = () => {
    setShowApply(!showApply)
  }

  const refresh = () => {
    window.location.reload()
  }

  const handleToPageChange = (page: number) => {
    setToCurrentPage(page)
  }

  const handleFromPageChange = (page: number) => {
    setFromCurrentPage(page)
  }

  useEffect(() => {
    const fetchData = async () => {
      let apiEndpoint

      if (showApply) {
        apiEndpoint = `/api/${userMyToApplicants}?page=${toCurrentPage}&size=3`
      } else {
        apiEndpoint = `/api/${userMyFromApplicants}?page=${fromCurrentPage}&size=3`
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
          console.log(response)
          throw new Error(`서버 상태 응답 ${response.status}`)
        }

        const responeData = await response.json()
        console.log(responeData.data.applyPageList)
        setCount(responeData.data.totalCount)
        setApplyPosts(responeData.data.applyPageList)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [toCurrentPage, fromCurrentPage, showApply])

  return (
    <>
      <MyPage />
      <div className={styles.applyContainer}>
        <div className={styles.applyTitle}>
          {showApply ? <h3>신청한 현황입니다 👋🏻</h3> : <h3>신청 받은 현황입니다 👋🏻</h3>}
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
                  post={post}
                  currentPage={showApply ? toCurrentPage : fromCurrentPage}
                  showApply={showApply} />
              </div>
            ))
          }
          {showApply ? (
            <Pagination 
              className={styles.pagination}
              current={toCurrentPage}
              onChange={handleToPageChange}
              total={count}
              pageSize={pageSize} />
          ) : (
            <Pagination 
              className={styles.pagination}
              current={fromCurrentPage}
              onChange={handleFromPageChange}
              total={count}
              pageSize={pageSize} />
          )}
        </div>
        
      </div>
    </>
  )
}

export default Apply