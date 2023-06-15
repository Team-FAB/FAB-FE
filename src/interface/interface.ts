export interface UserState {
  isLogged: boolean
  signUp: boolean
  data: {
    token: Token
  }
  kakao: boolean
  google: boolean
  email: string
  status: "idle" | "loading" | "fulfilled" | "error"
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
  price: number
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
    price: number
    recruiting: boolean
  }>
  currentPage?: number
  showRecruiting?: boolean
  link?: string
  token?: string
  isSearched?: boolean
  initialPosts?: string
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
  mbti?: string
  region?: string
  minAge?: number
  maxAge?: number
  myAge?: number
  activityTime?: string
  favoriteTag?: string[]
  hateTag?: string
  myText?: string
}

export interface ProfileBasicProps {
  nickname: string
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setNickname: React.Dispatch<React.SetStateAction<string>>
  profileImage: string
  setProfileImage: React.Dispatch<React.SetStateAction<string>>
}

export interface ProfileFileProps {
  profileImage: string
  setProfileImage: React.Dispatch<React.SetStateAction<string>>
}

export interface profileTendencyProps {
  selectedGender: string
  setSelectedGender: React.Dispatch<React.SetStateAction<string>>
  selectedAge: number
  setSelectedAge: React.Dispatch<React.SetStateAction<number>>
  selectedSmoke: string
  setSelectedSmoke: React.Dispatch<React.SetStateAction<string>>
  selectedMBTI: string
  setSelectedMBTI: React.Dispatch<React.SetStateAction<string>>
  selectedregion: string
  setSelectedregion: React.Dispatch<React.SetStateAction<string>>
  selectedAgeGroup: string
  setSelectedAgeGroup: React.Dispatch<React.SetStateAction<string>>
  selectedActivityTime: string
  setSelectedActivityTime: React.Dispatch<React.SetStateAction<string>>
  mytext: string
  setMytext: React.Dispatch<React.SetStateAction<string>>
  favoriteTag: string[]
  setFavoriteTag: React.Dispatch<React.SetStateAction<string[]>>
  handleUpdateProfileSuccess: () => void
}

export interface RoomMateSearchProps {
  onSearch?: (results: Post[]) => void
}

export interface Apply {
  applyId: number
  leader: boolean
  articleId: number
  articleTitle: string
  otherUserId: number
  otherUserName: string
  matchStatus: string
}

export interface ApplicantProps {
  applyPosts: Array<{
    applyId: number
    leader: boolean
    articleId: number
    articleTitle: string
    otherUserId: number
    otherUserName: string
    matchStatus: string
  }>
  currentPage?: number
  showApplicant?: boolean
}