import React, { useCallback, useEffect, useState } from "react"
import { Modal, Badge, Button } from "antd"
import styles from "./PostModal.module.css"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import { userArticleApply, userFavorite } from "../../api"
import { userArticle } from "../../api"
import { PostModalProps } from "../../interface/interface"
import useFavorite from "../Favorite/useFavorite"
import useFetch from "../../hooks/useFetch"
import { useApply } from "../Apply/applyApi"
import img from "../../assets/mbti1.svg"

const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  const [isDeleted, setIsDeleted] = useState(false)
  const userEmail = useSelector((state: RootState) => state.user.email)
  const navigate = useNavigate()

  const decodeHTML = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent || ""
  }

  const handleEditClick = () => {
    navigate(`/editPage/${post.id}`, { state: { post } })
  }

  const recruit = (recruiting: boolean) => {
    if (recruiting) {
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

 // 찜하기 상태 
  const userToken = useSelector((state: RootState) => state.user.data.token)
  const [, toggleFavorite] = useFavorite(post.id)
  const [localIsSaved, setLocalIsSaved] = useState(false)
  const saveClassName = localIsSaved
    ? `${styles.save} ${styles.saveActive}`
    : styles.save

  // 찜하기
  const handleSaveClick = useCallback(async () => {
    try {
      await toggleFavorite()
      setLocalIsSaved((prevIsSaved) => !prevIsSaved)
    } catch (error) {
      console.error(error)
    }
  }, [])

  // 신청 상태
  const [, toggleApply] = useApply(post.id)
  const [applyIsSaved, setApplyIsSaved] = useState(false)
  const applySave = applyIsSaved
    ? `${styles.apply} ${styles.applyActive}`
    : styles.apply

  // 신청하기
  const handleApplyClick = useCallback(async () => {
    try {
      await toggleApply()
      setApplyIsSaved((prevIsSaved) => !prevIsSaved)
    } catch (error) {
      console.error(error)
    }
  }, [])

  // 찜하기, 신청현황 가져오기
  useEffect(() => {
    const fetchData = async (url: string, setter: (data: boolean) => void, errorMessage: string, apply?: boolean) => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: userToken.atk.toString(),
          },
        })

        if (!response.ok) {
          throw new Error(errorMessage)
        }

        const responseData = await response.json()
        apply ? setter(responseData.data.apply) : setter(responseData.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData(`/api/${userFavorite}/${post.id}`, setLocalIsSaved, "찜 상태를 가져오는데 실패했습니다.")
    fetchData(`/api/${userArticleApply}/${post.id}`, setApplyIsSaved, "신청현황을 가져오는데 실패했습니다.", true)
  }, [post.id])

  // 삭제하기
  const {
    isLoading: deleteLoading,
    isSuccess: deleteSuccess,
    error: deleteError,
    setUrl: setDeleteUrl,
    setHeaders: setDeleteHeaders,
    setMethod: setDeleteMethod,
    setBody: setDeleteBody,
  } = useFetch<unknown>("", "", {}, null)

  const handleDeleteClick = async () => {
    Modal.confirm({
      title: "이 포스트를 정말로 삭제하시겠습니까?",
      okText: "네",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        setDeleteUrl(`/api/${userArticle}/${post.id}`)
        setDeleteMethod("DELETE")
        setDeleteHeaders({
          "Content-Type": "application/json",
          Authorization: userToken.atk.toString(),
        })
        setDeleteBody()
      },
    })
  }

  useEffect(() => {
    if (!deleteLoading && deleteSuccess) {
      setIsDeleted(true)
    } else if (!deleteLoading && deleteError) {
      console.error("Error:", deleteError)
      Modal.error({
        title: "에러 발생",
        content: "포스트를 삭제하는데 오류가 발생했습니다. 다시 시도해 주세요.",
      })
    }
  }, [deleteLoading, deleteSuccess, deleteError])

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
      onCancel={onClose}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      {post.recruiting === true ? (
        <div>
          <Badge className={styles.badgePresent}>
            {recruit(post.recruiting)}
          </Badge>
          <div className={styles.titleContainer}>
            <span className={styles.title}>{post.title}</span>
            {userEmail !== post.email && (
              <button onClick={handleSaveClick} className={saveClassName}>
                찜하기
              </button>
            )}
          </div>
          <div className={styles.content}>{decodeHTML(post.content)}</div>
          <div className={styles.ProfileContainer}>
            <img
              className={styles.profileImg}
              src={post.image ? post.image : img}
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
              <button
                className={applySave}
                style={{ float: "right" }}
                onClick={handleApplyClick}
              >
                신청하기
              </button>
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
            {recruit(post.recruiting)}
          </Badge>
          <div className={styles.titleContainer}>
            <span className={styles.title}>{post.title}</span>
            {userEmail !== post.email && (
              <button onClick={handleSaveClick} className={saveClassName}>
                찜하기
              </button>
            )}
          </div>
          <div className={styles.content}>{post.content}</div>
          <div className={styles.ProfileContainer}>
            <img
              className={styles.profileImg}
              src={post.image ? post.image : img}
            ></img>
            <span className={styles.ProfileContent}>
              {post.nickname} {formatDate(post.createdDate)}
            </span>
            {userEmail === post.email ? (
              <div className={styles.buttonContainer}>
                <Button
                  className={styles.deleteButton}
                  onClick={handleDeleteClick}> 
                  삭제
                </Button>
              </div>
            ) : (
              <button
                className={applySave}
                style={{ float: "right" }}
                onClick={handleApplyClick}
              >
                신청하기
              </button>
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
