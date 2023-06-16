import styles from './applicant.module.css'
import { Badge, Card } from "antd"
import { IdcardOutlined, CloseOutlined, WechatOutlined, FileDoneOutlined, CheckOutlined } from "@ant-design/icons"
import Meta from "antd/es/card/Meta"
import { ApplicantProps, ApplyProps } from '../../../interface/interface'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { useState } from 'react'

const Applicant: React.FC<ApplicantProps> = ({ currentPage, showApply }) => {

  const userToken = useSelector((state : RootState) => state.user.data.token)
  const [applyPosts, setApplyPosts] = useState<ApplyProps[]>([])


  return (
    <>
      {
        applyPosts.map((post) => {
          if(showApply) {
            if(post.matchStatus === '대기') {
              return (
                <div key={post.applyId}>
                  <Card
                    cover={<Badge.Ribbon text={post.matchStatus} />}
                    style={{ width: 530, marginBottom: 30 }}
                    actions={[
                      <IdcardOutlined title="프로필" />,
                      <CheckOutlined />,
                      <CloseOutlined />,
                    ]}
                  >
                    <Meta
                      title={`${post.otherUserName}님이 룸메이트 신청을 하였습니다.`}
                      description={`${post.articleTitle} 게시물에 신청이 도착했습니다 💌`}
                    />
                    <div>
                      <p className={styles.content}></p>
                    </div>
                  </Card>
                </div>
              )
            } else if(post.matchStatus === '거절') {
              return (
                <div key={post.applyId}>
                  <Card
                    cover={<Badge.Ribbon text={post.matchStatus} />}
                    style={{ width: 530, marginBottom: 30 }}
                    actions={[<CloseOutlined key="close" />]}
                  >
                    <Meta
                      title={`${post.otherUserName}님의 룸메이트 매칭을 거절 하였습니다.`}
                      description="다른 룸메이트를 구해보세요 🥲"
                    />
                    <div>
                      <p className={styles.content}></p>
                    </div>
                  </Card>
                </div>
              )
            } else if(post.matchStatus === '승인') {
              return (
                <Card
                  cover={<Badge.Ribbon text={post.matchStatus} />}
                  style={{ width: 530, marginBottom: 30 }}
                  actions={[<WechatOutlined />]}
                >
                  <Meta
                    title={`${post.articleTitle} 게시물 룸메이트 매칭이 되었습니다.`}
                    description="1:1 채팅으로 원활한 대화를 나눠보세요 👏🏻"
                  />
                  <div>
                    <p className={styles.content}></p>
                  </div>
                </Card>
              )
            }
          } else {
            if(post.matchStatus === '대기') {
              return (
                <div key={post.applyId}>
                  <Card
                    cover={<Badge.Ribbon text={post.matchStatus} />}
                    style={{ width: 530, marginBottom: 30 }}
                    actions={[
                      <IdcardOutlined title="프로필" />, 
                      <FileDoneOutlined key="게시물" />]}
                  >
                    <Meta
                      title={`${post.articleTitle} 게시물에 룸메이트 신청을 하였습니다.`}
                      description="룸메이트 매칭 결과를 기다리세요 🙌🏻"
                    />
                    <div>
                      <p className={styles.content}></p>
                    </div>
                  </Card>
                </div>
              )
            } else if(post.matchStatus === '거절') {
              return (
                <div key={post.applyId}>
                  <Card
                    cover={<Badge.Ribbon text={post.matchStatus} />}
                    style={{ width: 530, marginBottom: 30 }}
                    actions={[<CloseOutlined key="close" />]}
                  >
                    <Meta
                      title={`${post.articleTitle} 게시물 룸메이트 매칭이 거절 되었습니다.`}
                      description="아쉽네요. 다른 룸메이트를 구해보세요 🥲"
                    />
                    <div>
                      <p className={styles.content}></p>
                    </div>
                  </Card>
                </div>
              )
            } else if(post.matchStatus === '승인') {
              return (
                <Card
                  cover={<Badge.Ribbon text={post.matchStatus} />}
                  style={{ width: 530, marginBottom: 30 }}
                  actions={[<WechatOutlined />]}
                >
                  <Meta
                    title={`${post.articleTitle} 게시물 룸메이트 매칭이 되었습니다.`}
                    description="1:1 채팅으로 원활한 대화를 나눠보세요 👏🏻"
                  />
                  <div>
                    <p className={styles.content}></p>
                  </div>
                </Card>
              )
            }
          }
        })
      }
    </>
  )
}

export default Applicant