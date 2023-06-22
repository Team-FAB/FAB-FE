import { ApplyProps } from "../interface/interface"

export const APPLY = 'APPLY'
export const APPROVE = 'APPROVE'
export const REFUSE = 'REFUSE'
export const DELETE = 'DELETE'

// 액션 타입 정의
interface ApplyAction {
  type: typeof APPLY
  post: ApplyProps
}

interface ApproveAction {
  type: typeof APPROVE
  post: ApplyProps
}

interface RefuseAction {
  type: typeof REFUSE
  post: ApplyProps
}

interface DeleteAction {
  type: typeof DELETE
  post: ApplyProps
}

// 모든 액션들의 타입을 모아둔 유니언 타입
export type PostActionTypes = ApplyAction | ApproveAction | RefuseAction | DeleteAction

// 액션 생성자
export const applyPost = (post: ApplyProps): ApplyAction => {
  return { type: APPLY, post }
}

export const approvePost = (post: ApplyProps): ApproveAction => {
  return { type: APPROVE, post }
}

export const refusePost = (post: ApplyProps): RefuseAction => {
  return { type: REFUSE, post }
}

export const deletePost = (post: ApplyProps): DeleteAction => {
  return { type: DELETE, post }
}
