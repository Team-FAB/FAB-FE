import React, { useCallback, useEffect, useState } from "react"
import { Modal, Badge, Button } from "antd"
import styles from "./PostModal.module.css"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"

interface PostModalProps {
  post: any
  onClose: () => void
}

const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  const [isSaved, setIsSaved] = useState(false)
  const userEmail = localStorage.getItem("email")
  const navigate = useNavigate()

  const handleEditClick = () => {
    navigate(`/editPage/${post.id}`, { state: { post } })
  }

  const recruit = (isRecruit: boolean) => {
    if (isRecruit) {
      return "모집"
    } else {
      return "마감"
    }
  }

  const saveClassName = isSaved
    ? `${styles.save} ${styles.saveActive}`
    : styles.save

  const formatDate = (dateString: string): string => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    } as const
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const formatPrice = (price: number): string => {
    return "~" + price.toLocaleString("ko-KR") + "원"
  }

    const decodeHTML = (html: string) => {
      const doc = new DOMParser().parseFromString(html, "text/html")
      return doc.body.textContent || ""
    }


  /* 유진 추가 */
  // const userToken = useSelector((state : RootState) => state.user.data.token)

  // const [isModalOpen, setIsModalOpen] = useState(true) // 모달창 open 여부

  const handleSaveClick = async () => {
    setIsSaved((prevIsSaved) => !prevIsSaved)
  }

  // const handleSaveClick = useCallback(async () => {
  //   setIsSaved((prevIsSaved) => !prevIsSaved) // true <-> false

  //   // 모달이 열려있는 동안 POST 요청을 보내지 X
  //   if (isModalOpen) {
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`api/article/favorite?id=${post.id}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: userToken.atk.toString(),
  //       },
  //     });

  //     if (response.ok) {
  //       throw new Error("찜하기를 처리하는데 실패했습니다.");
  //     }

  //   } catch (error) {
  //     console.error(error)
  //   }
  // }, [isModalOpen])

  // const handleModalCancel = useCallback(() => {
  //   setIsModalOpen(false) // 모달이 닫힘 추적
  //   onClose() // onClose 이벤트 핸들러 호출
  // }, [onClose])

  // 모달창 오픈 시, 찜하기 상태 가져오기
  // useEffect(() => {
  //   const fetchFavoriteStatus = async () => {
  //     try {
  //       const response = await fetch(`api/article/favoriteStatus?id=${post.id}`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: userToken.atk.toString(),
  //         },
  //       });

  //       if (response.ok) {
  //         const data = await response.json()
  //         setIsSaved(data.isSaved) // favorite?
  //       } else {
  //         throw new Error("찜 상태를 가져오는데 실패했습니다.")
  //       }
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  //   fetchFavoriteStatus()
  // }, [post.id]) // 해당 post가 바뀔때마다

  // onCancel={handleModalCancel} //추가하기
  /* 유진 추가 */

  return (
    <Modal
      open={true}
      onOk={onClose}
      onCancel={onClose}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      {post.isRecruit === true ? (
        <div>
          <Badge className={styles.badgePresent}>
            {recruit(post.isRecruit)}
          </Badge>
          <div className={styles.titleContainer}>
            <span className={styles.title}>{post.title}</span>
            <span className={saveClassName} onClick={handleSaveClick}>
              찜하기
            </span>
          </div>
          <div className={styles.content}>{decodeHTML(post.content)}</div>
          <div className={styles.ProfileContainer}>
            {userEmail === post.email && ( // 추가된 부분
              <div className={styles.buttonContainer}>
                <Button className={styles.editButton} onClick={handleEditClick}>
                  수정
                </Button>
                <Button className={styles.deleteButton}>삭제</Button>
              </div>
            )}
            <img
              className={styles.profileImg}
              src="https://via.placeholder.com/25"
            ></img>
            <span className={styles.ProfileContent}>
              {post.nickname} {formatDate(post.createdDate)}
            </span>
            <Button className={styles.apply} type="primary">
              신청하기
            </Button>
          </div>
          <div className={styles.line}></div>
          <div className={styles.cardBadgeContainer}>
            <Badge className={styles.cardBadgeArea}>{post.region}</Badge>
            <Badge className={styles.cardBadgePeriod}>{post.period}</Badge>
            <Badge className={styles.cardBadgePrice}>
              {formatPrice(post.price)}
            </Badge>
          </div>
        </div>
      ) : (
        <div>
          <Badge className={styles.isBadgePresent}>
            {recruit(post.isRecruit)}
          </Badge>
          <div className={styles.titleContainer}>
            <span className={styles.title}>{post.title}</span>
            <span className={saveClassName} onClick={handleSaveClick}>
              찜하기
            </span>
          </div>
          <div className={styles.content}>{decodeHTML(post.content)}</div>
          <div className={styles.ProfileContainer}>
            {userEmail === post.email && ( // 추가된 부분
              <div className={styles.buttonContainer}>
                <Button className={styles.editButton} onClick={handleEditClick}>
                  수정
                </Button>
                <Button className={styles.deleteButton}>삭제</Button>
              </div>
            )}
            <img
              className={styles.profileImg}
              src="https://via.placeholder.com/25"
            ></img>
            <span className={styles.ProfileContent}>
              {post.nickname} {formatDate(post.createdDate)}
            </span>
            <Button className={styles.apply} type="primary">
              신청하기
            </Button>
          </div>
          <div className={styles.line}></div>
          <div className={styles.cardBadgeContainer}>
            <Badge className={styles.cardBadgeArea}>{post.region}</Badge>
            <Badge className={styles.cardBadgePeriod}>{post.period}</Badge>
            <Badge className={styles.cardBadgePrice}>
              {formatPrice(post.price)}
            </Badge>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default PostModal
