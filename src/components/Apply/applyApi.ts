import { useDispatch } from "react-redux"
import { userApplicant, userAprove, userArticleApply, userRefuse } from "../../api"
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { RootState } from "../../Redux/store"
import { useSelector } from "react-redux"
import { fetchData } from "../../Redux/applyReducer"
import { setSaved } from "../../Redux/savedReducer"
import { Modal } from "antd"

// 신청
export const useApply = (postId: number) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>()
  const isSaved = useSelector((state: RootState) => state.saved[postId])
  const userToken = useSelector((state : RootState) => state.user.data.token)

  const toggleApply = async () => {
    try {
      const newIsSaved = !isSaved
      const response = await fetch(`/api/${userArticleApply}/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken.atk.toString(),
        },
      })

      if (!response.ok) {
        if (response.status === 400) {
          Modal.error({
            title: "신청이 불가능합니다 ❌",
            content: "이미 마감되었거나, 신청 거절 이력이 있는 게시글입니다.",
          })
        } 
        throw new Error("신청하기를 처리하는데 실패했습니다.")
      }
      dispatch(setSaved({ postId, isSaved: newIsSaved }))
      dispatch(fetchData({
        showApply: true,
        currentPage: 1,
        userToken: userToken.atk.toString()
      }))
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  return [isSaved, toggleApply] as const
}

// 승인
export const updateApprove = async (userToken: string, userId: number, articleId: number) => {
  try {
    const response = await fetch(`/api/${userAprove}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken, 
      },
      body: JSON.stringify({
        "userId" : userId,
        "articleId" : articleId
      }),
    })

    if (!response.ok) {
      throw new Error('매칭 승인 실패')
    }

    const approveData = await response.json()
    return approveData.data

  } catch (error) {
    console.error('룸메이트 매칭 승인 오류', error)
  }
}

// 거절
export const updateRefuse = async (userToken: string, applyId:number, articleId: number) => {
  try {
    const response = await fetch(`/api/${userRefuse}/${applyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken, 
      },
      body: JSON.stringify(articleId),
    })

    if (!response.ok) {
      throw new Error('매칭 거절 실패')
    }

    const refuseData = await response.json()
    return refuseData.data

  } catch (error) {
    console.error('룸메이트 매칭 거절 오류', error)
  }
}

// 삭제
export const updateDelete = async (userToken: string, applyId:number) => {
  try {
    const response = await fetch(`/api/${userApplicant}/${applyId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken, 
      },
    })

    if (!response.ok) {
      throw new Error('삭제 실패')
    }

    const deleteData = await response.json()
    return deleteData.data

  } catch (error) {
    console.error('룸메이트 신청현황 삭제 오류', error)
  }
}