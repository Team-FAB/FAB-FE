export interface Token {
  atk: string
  rtk: string
}

export interface UserState {
  isLogged: boolean
  signUp: boolean
  data: {
    token: Token
  }
  email: string
  status: "idle" | "loading" | "fulfilled" | "error"
  accessToken?: string
}

export interface LoginValues {
  email: string
  password: string
}

export interface Post {
  id: number
  email?: string
  title: string
  nickname: string
  content: string
  gender: string
  createdDate: string
  region: string
  period: string
  price: number
  recruiting: boolean
  image?: string
}

export interface User {
  id: number
  nickname: string
  image: string
  email: string
  gender: string
  isSmoker: boolean
  mbti: string
  region: string
  minAge: number
  maxAge: number
  myAge: number
  activityTime: string
  faviteTag: string
  hateTag: string
  myText: string
  post: Post
  detail: string
}

export interface ModalProps {
  visible?: boolean
  onClose: () => void
}

export interface PostModalProps extends ModalProps {
  post: Post
}

export interface Props {
  posts: Post[]
  currentPage?: number
  showRecruiting?: boolean
  isSearched?: boolean
  initialPosts?: string
  Resultsposts?: Post[]
}

export interface GlobalState extends UserState {
  msg: string
  kakao: boolean
  google: boolean
  token: Token
}

export interface profileTendencyDropdown {
  genderBoxOpen: boolean
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

export interface userProfileData extends profileBasicValues {
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

export interface ProfileBasicProps extends profileBasicValues {
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

export interface SearchQuery {
  area: string
  period: string
  price: string | undefined
  gender: string
}

export interface RoomMateSearchProps {
  onSearch?: (query: SearchQuery, page?: number, size?: number) => Promise<void>
  post?: Post
  onClick?: () => void
  query?: Post[]
}

export interface ApplyProps {
  applyId: number
  articleId: number
  articleTitle: string
  otherUserId: number
  otherUserName: string
  matchStatus: string
}

export interface ApplicantProps {
  post: ApplyProps
  currentPage: number
  showApply: boolean
}

export interface RecommendModalProps extends ModalProps {
  userProfile: User | null
  user?: User
  showArticles?: boolean
}

export interface Data {
  mbti: string
  nickname: string
  recommendDtoList: {
    id: number
    nickname: string
    mbti: string
  }[]
}


export interface RecommendUser {
  id: number
  nickname: string
  mbti: string
}

export interface UserProfile {
  email: string
  nickname: string
  image: string
  isSmoker: boolean
  activityTime: string
  gender: string
  region: string
  mbti: string
  tags: [string]
  minAge: number
  maxAge: number
  myAge: number
  detail: string
}

export interface Article {
  id: number
  title: string
}

export interface FetchData {
  mbti: string
  nickname: string
  recommendDtoList: { id: number; nickname: string; mbti: string }[]
}

export interface PostData {
  articleList: Post[]
  totalCnt : number
}

export interface ChatMessage {
  msg: string
  userEmail: string
  createData?: string
}

export interface ChatList {
  userNickname: string
  roomId: string
}

export interface MessageType {
  roomId: string
  userEmail: string
  msg: string
  createDate: string
}