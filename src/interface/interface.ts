export interface UserState {
  isLogged: boolean
  signUp: boolean
  data: {
    token: Token
  }
  kakao: boolean
  google: boolean
  email: string
}

export interface LoginValues {
  email: string
  password: string
}

export interface Post {
  id: number
  title: string
  nickname: string
  content: string
  gender: string
  createdDate: string
  region: string
  period: string
  price: string
  recruiting: boolean
}

export interface User {
  id: number
  nickname: string
  image: string
  email: string
  gender: string
  smoke: boolean
  MBTI: string
  region: string
  minAge: number
  maxAge: number
  myAge: number
  activityTime: string
  faviteTag: string
  hateTag: string
  myText: string
}

export interface PostModalProps {
  post: string
  visible: boolean
  onClose: () => void
}

export interface Props {
  posts: Array<{
    id: number
    title: string
    nickname: string
    content: string
    gender: string
    createdDate: string
    region: string
    period: string
    price: string
    isRecruit: boolean
  }>
  showRecruitOnly?: boolean
}

export interface Token {
  atk: string
  rtk: string
}

export interface GlobalState {
  isLogged: boolean
  msg: string
  status: string
  signUp: boolean
  kakao: boolean
  google: boolean
  token: Token
}

export interface profileTendencyDropdown {
  genderBoxOpen: boolean
  ageBoxOpen: boolean
  smokeBoxOpen: boolean
  MBTIBoxOpen: boolean
  regionBoxOpen: boolean
  ageGroupBoxOpen: boolean
  activityTimeBoxOpen: boolean
}

export interface profileBasicValues {
  nickname?: string
  email?: string
}

export interface userProfileData {
  // id: number
  // image: string
  nickname?: string
  email?: string
  password?: string
  gender?: string
  smoke?: boolean
  MBTI?: string
  region?: string
  minAge?: number
  maxAge?: number
  myAge?: number
  activityTime?: string
  favoriteTag?: string[]
  hateTag?: string
  myText?: string
}
