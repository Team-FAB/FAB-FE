import React, { useEffect, useState } from "react"
import { Modal, Badge, Button } from "antd"
import styles from "./PostModal.module.css"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import { userFavorite } from "../../api"
import { userArticle } from "../../api"

interface PostModalProps {
  post: any
  onClose: () => void
}

const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  const [isSaved, setIsSaved] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const userEmail = localStorage.getItem("email")
  const navigate = useNavigate()

  const decodeHTML = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent || ""
  }

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

  const [newIsSaved, setNewIsSaved] = useState(false)
  const userToken = useSelector((state : RootState) => state.user.data.token)

  const saveClassName = newIsSaved
  ? `${styles.save} ${styles.saveActive}`
  : styles.save
    
  const handleSaveClick = () => {
    setNewIsSaved((prevIsSaved) => !prevIsSaved)
  }

  const handleOnCancel = useCallback(async () => {
    if (newIsSaved !== isSaved) {
      try {
        const response = await fetch(`${userFavorite}/${post.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: userToken.atk.toString(),
          },
        });

        if (!response.ok) {
          throw new Error("찜하기를 처리하는데 실패했습니다.")
        }

        setIsSaved(newIsSaved)
      } catch (error) {
        console.error(error)
        setNewIsSaved(isSaved)
      }
    }
    onClose()
    }, [newIsSaved, isSaved, onClose])
  
  // 찜하기 상태 가져오기
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const response = await fetch(`${userFavorite}/${post.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: userToken.atk.toString(),
            "ngrok-skip-browser-warning": "69420",
          },
        })

        if (response.ok) {
          const data = await response.json()
          setIsSaved(data.data)
          setNewIsSaved(data.data)
        } else {
          throw new Error("찜 상태를 가져오는데 실패했습니다.")
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchFavoriteStatus()

  }, [post.id])

  //
  const handleDeleteClick = async () => {
    Modal.confirm({
      title: "이 포스트를 정말로 삭제하시겠습니까?",
      okText: "네",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        try {
          const response = await fetch(`${userArticle}/${post.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: userToken.atk.toString(),
            },
          })

          if (response.ok) {
            setIsDeleted(true)
          } else {
            throw new Error("포스트를 삭제하는데 실패했습니다.")
          }
        } catch (error) {
          Modal.error({
            title: "에러 발생",
            content:
              "포스트를 삭제하는데 오류가 발생했습니다. 다시 시도해 주세요.",
          })
        }
      },
    })
  }

  useEffect(() => {
    if (isDeleted) {
      Modal.success({
        title: "성공적으로 삭제되었습니다.",
        content: "이 포스트는 삭제되었습니다.",
        onOk: () => {
          window.location.reload()
        },
      })
    }
  }, [isDeleted])

  return (
    <Modal
      open={true}
      onOk={onClose}
      onCancel={handleOnCancel}
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
            {userEmail !== post.email && (
              <span className={saveClassName} onClick={handleSaveClick}>
                찜하기
              </span>
            )}
          </div>
          <div className={styles.content}>{decodeHTML(post.content)}</div>
          <div className={styles.ProfileContainer}>
            <img
              className={styles.profileImg}
              src="https://via.placeholder.com/25"
            ></img>
            <span className={styles.ProfileContent}>
              {post.nickname} {formatDate(post.createdDate)}
            </span>
            {userEmail === post.email ? (
              <div className={styles.buttonContainer}>
                <Button className={styles.editButton} onClick={handleEditClick}>
                  수정
                </Button>
                <Button
                  className={styles.deleteButton}
                  onClick={handleDeleteClick}
                >
                  삭제
                </Button>
              </div>
            ) : (
              <Button className={styles.apply} type="primary">
                신청하기
              </Button>
            )}
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
            {userEmail !== post.email && (
              <span className={saveClassName} onClick={handleSaveClick}>
                찜하기
              </span>
            )}
          </div>
          <div className={styles.content}>{decodeHTML(post.content)}</div>
          <div className={styles.ProfileContainer}>
            <img
              className={styles.profileImg}
              src="https://via.placeholder.com/25"
            ></img>
            <span className={styles.ProfileContent}>
              {post.nickname} {formatDate(post.createdDate)}
            </span>
            {userEmail === post.email ? (
              <div className={styles.buttonContainer}>
                <Button className={styles.editButton} onClick={handleEditClick}>
                  수정
                </Button>
                <Button
                  className={styles.deleteButton}
                  onClick={handleDeleteClick}
                >
                  삭제
                </Button>
              </div>
            ) : (
              <Button className={styles.apply} type="primary">
                신청하기
              </Button>
            )}
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
