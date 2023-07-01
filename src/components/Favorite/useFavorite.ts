import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { RootState } from "../../Redux/store"
import { userFavorite } from '../../api'
import { setSaved } from "../../Redux/savedReducer"
import { fetchFavorites } from './favoritesThunk'
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"

const useFavorite = (postId: number) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>()
  const isSaved = useSelector((state: RootState) => state.saved[postId])
  const userToken = useSelector((state : RootState) => state.user.data.token)

  // 찜하기, 취소하기
  const toggleFavorite = async () => {
    try {
      const newIsSaved = !isSaved
      const response = await fetch(`/api/${userFavorite}/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken.atk.toString(),
        },
      })

      if (!response.ok) {
        throw new Error("찜하기를 처리하는데 실패했습니다.")
      }

      dispatch(setSaved({ postId, isSaved: newIsSaved }))
      dispatch(fetchFavorites())
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  
  return [isSaved, toggleFavorite] as const
}

export default useFavorite