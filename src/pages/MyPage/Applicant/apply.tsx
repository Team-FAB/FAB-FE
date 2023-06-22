import { RedoOutlined } from '@ant-design/icons'
import styles from './applicant.module.css'
import { Button, Pagination } from 'antd'
import { useEffect, useState } from 'react'
import Applicant from './applicant'
import MyPage from '../myPage'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../Redux/store'
import { useDispatch } from 'react-redux'
import { fetchData } from '../../../Redux/applyReducer'

const Apply: React.FC = () => {

  const userToken = useSelector((state : RootState) => state.user.data.token)
  const [showApply, setShowApply] = useState(false)
  const [toCurrentPage, setToCurrentPage] = useState(1)
  const [fromCurrentPage, setFromCurrentPage] = useState(1)
  const pageSize = 3

  const dispatch: AppDispatch = useDispatch();
  const { applyPosts, totalCount } = useSelector((state: RootState) => state.apply)

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
    dispatch(fetchData({ 
      showApply: showApply, 
      currentPage: showApply ? toCurrentPage : fromCurrentPage, 
      userToken: userToken.atk.toString()
    }))
  }, [dispatch, toCurrentPage, fromCurrentPage, showApply, userToken])

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
              total={totalCount}
              pageSize={pageSize} />
          ) : (
            <Pagination 
              className={styles.pagination}
              current={fromCurrentPage}
              onChange={handleFromPageChange}
              total={totalCount}
              pageSize={pageSize} />
          )}
        </div>
        
      </div>
    </>
  )
}

export default Apply