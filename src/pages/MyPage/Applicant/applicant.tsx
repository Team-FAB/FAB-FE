import styles from './applicant.module.css'
import { Badge, Card } from "antd"
import { IdcardOutlined, CloseOutlined, WechatOutlined, FileDoneOutlined, CheckOutlined } from "@ant-design/icons"
import Meta from "antd/es/card/Meta"
import { ApplicantProps, ApplyProps } from '../../../interface/interface'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { useEffect, useState } from 'react'
import { userMyApply } from '../../../api'

const Applicant: React.FC<ApplicantProps> = ({ currentPage, showApply }) => {

  const userToken = useSelector((state : RootState) => state.user.data.token)
  const [applyPosts, setApplyPosts] = useState<ApplyProps[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/${userMyApply}/?page=${currentPage}&size=3&isApplicant=${showApply}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: userToken.atk.toString(),
              },
            },
          )

        if (!response.ok) {
          throw new Error(`서버 상태 응답 ${response.status}`)
        }

        const data = await response.json()
        setApplyPosts(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [currentPage, showApply])

  return (
    <>
      <div className={styles.applicantContainer}>
        <Card
          cover={<Badge.Ribbon text={'대기'} />}
          style={{ width: 530, marginBottom: 30 }}
          actions={[
            <IdcardOutlined title="프로필" />,
            <CheckOutlined />,
            <CloseOutlined />,
          ]}
        >
          <Meta
            title="000님이 룸메이트 신청을 하였습니다."
            description="000 게시물에 신청이 도착했습니다 💌"
          />
          <div>
            <p className={styles.content}></p>
          </div>
        </Card>
        <Card
          cover={<Badge.Ribbon text={'대기'} />}
          style={{ width: 530, marginBottom: 30 }}
          actions={[
            <IdcardOutlined title="프로필" />, 
            <FileDoneOutlined key="게시물" />]}
        >
          <Meta
            title="000 게시물에 룸메이트 신청을 하였습니다."
            description="룸메이트 매칭 결과를 기다리세요 🙌🏻"
          />
          <div>
            <p className={styles.content}></p>
          </div>
        </Card>
        <Card
          cover={<Badge.Ribbon text={'거절'} />}
          style={{ width: 530, marginBottom: 30 }}
          actions={[<CloseOutlined key="close" />]}
        >
          <Meta
            title="000 게시물 룸메이트 매칭이 되지 않았습니다."
            description="아쉽네요. 다른 룸메이트를 구해보세요 🥲"
          />
          <div>
            <p className={styles.content}></p>
          </div>
        </Card>
        <Card
          cover={<Badge.Ribbon text={'거절'} />}
          style={{ width: 530, marginBottom: 30 }}
          actions={[<CloseOutlined key="close" />]}
        >
          <Meta
            title="000님의 룸메이트 매칭을 거절 하였습니다."
            description="다른 룸메이트를 구해보세요 🥲"
          />
          <div>
            <p className={styles.content}></p>
          </div>
        </Card>
        <Card
          cover={<Badge.Ribbon text={'승인'} />}
          style={{ width: 530, marginBottom: 30 }}
          actions={[<WechatOutlined />]}
        >
          <Meta
            title="000 게시물 룸메이트 매칭이 되었습니다."
            description="1:1 채팅으로 원활한 대화를 나눠보세요 👏🏻"
          />
          <div>
            <p className={styles.content}></p>
          </div>
        </Card>
      </div>
    </>
  )
}

export default Applicant