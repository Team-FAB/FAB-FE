import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import { useEffect, useState } from "react"
import styles from "../PostModal/postModal.module.css"
import { SaveButtonProps } from "../../interface/interface"

const SaveButton: React.FC<SaveButtonProps> = ({ post, userFavorite }) => {
  const [newIsSaved, setNewIsSaved] = useState(false)
  const userToken = useSelector((state: RootState) => state.user.data.token)
  const [isSaved, setIsSaved] = useState(false)

  const saveClassName = newIsSaved
    ? `${styles.save} ${styles.saveActive}`
    : styles.save

  const handleSaveClick = () => {
    setNewIsSaved((prevIsSaved) => !prevIsSaved)
  }

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const response = await fetch(`/api/${userFavorite}/${post.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: userToken.atk.toString(),
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

  return (
    <button className={saveClassName} onClick={handleSaveClick}>찜하기</button>
  )
}

export default SaveButton