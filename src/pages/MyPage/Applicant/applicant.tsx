import styles from './applicant.module.css'
import { Badge, Card, Modal } from "antd"
import Meta from "antd/es/card/Meta"
import { ApplicantProps, Post, User } from '../../../interface/interface'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { userAprove, userRefuse } from '../../../api'
import { userApplicant } from '../../../api'
import { usersProfile } from '../../../api'
import { useEffect, useState } from 'react'
import RecommendModal from '../../../components/RecommendModal/recommendModal'
import useFetch from '../../../hooks/useFetch'
import PostModal from '../../../components/PostModal/postModal'

const Applicant: React.FC<ApplicantProps> = ({ showApply, post }) => {

  const userToken = useSelector((state : RootState) => state.user.data.token)
  const [otheruser, setOtherUser] = useState<User | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<Post | null>(null)

  const handleUserClick = (userId: number) => {
    userData(userId)
    setIsModalVisible(true)
  }

  // 승인
  const updateApprove = async () => {
    try {
      const response = await fetch(`/api/${userAprove}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken.atk.toString(), 
        },
        body: JSON.stringify({
          "userId" : post.otherUserId,
          "articleId" : post.articleId
        }),
      })

      if (!response.ok) {
        console.log(response)
        throw new Error('매칭 승인 실패')
      } else {
        Modal.success({
          title: "룸메이트 매칭 성공!",
          content: "룸메이트 매칭을 승인하였습니다.",
        });
      }

      const approveData = await response.json()
      window.location.reload()
      console.log(approveData.data)

    } catch (error) {
      console.error('룸메이트 매칭 승인 오류', error)
    }
  }

  // 거절
  const updateRefuse = async () => {
    try {
      const response = await fetch(`/api/${userRefuse}/${post.applyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken.atk.toString(), 
        },
        body: JSON.stringify(post.articleId),
      })

      if (!response.ok) {
        throw new Error('매칭 거절 실패')
      } else {
        Modal.success({
          title: "룸메이트 매칭 거절!",
          content: "룸메이트 매칭을 거절하였습니다.",
        });
      }

      const refuseData = await response.json()
      window.location.reload()
      console.log(refuseData.data)
      return refuseData

    } catch (error) {
      console.error('룸메이트 매칭 거절 오류', error)
    }
  }

  // 삭제
  const updateDelete = async () => {
    try {
      const response = await fetch(`/api/${userApplicant}/${post.applyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken.atk.toString(), 
        },
      })

      if (response.ok) {
        Modal.confirm({
          title: "신청현황 삭제!",
          content: "룸메이트 신청현황을 삭제하였습니다.",
        })
      } else {
        throw new Error('삭제 실패')
      }

      const deleteData = await response.json()
      window.location.reload()
      console.log(deleteData.data)

    } catch (error) {
      console.error('룸메이트 신청현황 삭제 오류', error)
    }
  }

  // 프로필
  const userData = async (userId: number) => {
    try {
      const response = await fetch(`/api/${usersProfile}/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        console.log(response)
        throw new Error(`서버 상태 응답 ${response.status}`)
      }

      const responeData = await response.json()
      setOtherUser(responeData.data)
      setIsModalVisible(true)
    } catch (error) {
      console.error(error)
    }
  }

  // 게시물
  const {
    datas: articleData,
    isSuccess: articleSuccess,
    setUrl: setArticleUrl,
    setHeaders: setArticleHeaders,
    setMethod: setArticleMethod,
    setBody: setArticleBody,
  } = useFetch<Post>("", "", {}, null)

  const handleArticleClick = (articleId: string) => {
    setArticleUrl(`/api/articles/${articleId}`)
    setArticleMethod("GET")
    setArticleHeaders(
      new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    )
    setArticleBody()
  }

  useEffect(() => {
    if (articleSuccess) {
      try {
        setSelectedArticle(articleData)
      } catch (error) {
        console.error(error)
      }
    }
  }, [articleSuccess, articleData])

  return (
    <>
      {
        !showApply ? (
          post.matchStatus === '대기' ? (
            <div key={post.applyId}>
              <Card
                cover={<Badge.Ribbon text={post.matchStatus} />}
                style={{ width: 530, marginBottom: 30 }}
                actions={[
                  <p onClick={()=>handleUserClick(post.otherUserId)}>프로필</p>,
                  <p onClick={updateApprove}>승인</p>,
                  <p onClick={updateRefuse}>거절</p>,
                ]}
              >
                <Meta
                  title={`'${post.otherUserName}'님이 룸메이트 신청을 하였습니다.`}
                  description={`'${post.articleTitle}' 게시물에 신청이 도착했습니다 💌`}
                />
                <div>
                  <p className={styles.content}></p>
                </div>
              </Card>
            </div>
          ) : post.matchStatus === '거절' ? (
            <div key={post.applyId}>
              <Card
                cover={<Badge.Ribbon text={post.matchStatus} />}
                style={{ width: 530, marginBottom: 30 }}
                actions={[<p onClick={updateDelete}>삭제</p>]}
              >
                <Meta
                  title={`'${post.otherUserName}'님의 룸메이트 매칭을 거절 하였습니다.`}
                  description="다른 룸메이트를 구해보세요 🥲"
                />
                <div>
                  <p className={styles.content}></p>
                </div>
              </Card>
            </div>
          ) : post.matchStatus === '승인' ? (
            <div key={post.applyId}>
              <Card
                cover={<Badge.Ribbon text={post.matchStatus} />}
                style={{ width: 530, marginBottom: 30 }}
                actions={[
                  <p>채팅</p>,
                  <p onClick={()=>handleUserClick(post.otherUserId)}>프로필</p>]}
              >
                <Meta
                  title={`'${post.articleTitle}' 게시물에 '${post.otherUserName}'님과 룸메이트 매칭이 되었습니다.`}
                  description="1:1 채팅으로 원활한 대화를 나눠보세요 👏🏻"
                />
                <div>
                  <p className={styles.content}></p>
                </div>
              </Card>
            </div>
          ) : null 
        ) : (
          post.matchStatus === '대기' ? (
            <div key={post.applyId}>
              <Card
                cover={<Badge.Ribbon text={post.matchStatus} />}
                style={{ width: 530, marginBottom: 30 }}
                actions={[
                  <p onClick={()=>handleUserClick(post.otherUserId)}>프로필</p>, 
                  <p onClick={() => handleArticleClick(post.articleId.toString())}>게시물</p>]}
              >
                <Meta
                  title={`'${post.articleTitle}' 게시물에 룸메이트 신청을 하였습니다.`}
                  description="룸메이트 매칭 결과를 기다리세요 🙌🏻"
                />
                <div>
                  <p className={styles.content}></p>
                </div>
              </Card>
            </div>
          ) : post.matchStatus === '거절' ? (
            <div key={post.applyId}>
              <Card
                cover={<Badge.Ribbon text={post.matchStatus} />}
                style={{ width: 530, marginBottom: 30 }}
                actions={[<p onClick={updateDelete}>삭제</p>]}
              >
                <Meta
                  title={`'${post.articleTitle}' 게시물 룸메이트 매칭이 거절 되었습니다.`}
                  description="아쉽네요. 다른 룸메이트를 구해보세요 🥲"
                />
                <div>
                  <p className={styles.content}></p>
                </div>
              </Card>
            </div>
          ) : post.matchStatus === '승인' ? (
            <Card
              cover={<Badge.Ribbon text={post.matchStatus} />}
              style={{ width: 530, marginBottom: 30 }}
              actions={[
                <p>채팅</p>,
                <p onClick={()=>handleUserClick(post.otherUserId)}>프로필</p>]}
            >
              <Meta
                title={`'${post.articleTitle}' 게시물에 '${post.otherUserName}'님과 룸메이트 매칭이 되었습니다.`}
                description="1:1 채팅으로 원활한 대화를 나눠보세요 👏🏻"
              />
              <div>
                <p className={styles.content}></p>
              </div>
            </Card>
          ) : null
        ) 
      }
      {otheruser && (
        <RecommendModal
          userProfile={otheruser}
          visible={isModalVisible}
          onClose={() => setOtherUser(null)}
          showArticles={false}
        />
      )}
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

export default Applicant