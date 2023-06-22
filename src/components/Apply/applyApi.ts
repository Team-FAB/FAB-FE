import { userApplicant, userAprove, userArticleApply, userRefuse, usersProfile } from "../../api";

// 신청하기
export const applyPost = async (userToken: string, postId: number) => {
  try {
    const response = await fetch(`/api/${userArticleApply}/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
    })

    if (!response.ok) {
      throw new Error("신청하기를 실패했습니다.")
    }

    const responeData = await response.json()
    return responeData.data;

  } catch (error) {
    console.error(error)
  }
}

// 신청상태 가져오기
export const fetchApplyStatus = async (userToken: string, postId: number) => {
  try {
    const response = await fetch(`/api/${userArticleApply}/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
    })

    if (!response.ok) {
      throw new Error("신청현황을 가져오는데 실패했습니다.")
    }

    const responseData = await response.json()
    return responseData.data.apply;

  } catch (error) {
    console.error(error)
  }
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
    });

    if (!response.ok) {
      throw new Error('매칭 승인 실패')
    }

    const approveData = await response.json()
    return approveData.data;

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
    return refuseData.data;

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
    return deleteData.data;

  } catch (error) {
    console.error('룸메이트 신청현황 삭제 오류', error)
  }
}

// 프로필
export const userData = async (userId: number) => {
  try {
    const response = await fetch(`/api/${usersProfile}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`서버 상태 응답 ${response.status}`)
    }

    const responeData = await response.json()
    return responeData.data;
    
  } catch (error) {
    console.error(error)
  }
}
