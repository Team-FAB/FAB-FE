import { useEffect, useState } from 'react'
import MyPage from '../myPage'
import styles from './profile.module.css'
import ProfileBasic from './profileBasic'
import ProfileTendency from './profileTendency'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { userMyprofile } from '../../../api'
import useFetch from '../../../hooks/useFetch'
import { UserProfile } from '../../../interface/interface'
import { Spin } from 'antd'
import img from "/mbti1.svg"

const Profile: React.FC = () => {
  const userToken = useSelector((state : RootState) => state.user.data.token)

  // profileBasic
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [profileImage, setProfileImage] = useState(img)

  // profileTendency
  const [selectedGender, setSelectedGender] = useState('')
  const [selectedAge, setSelectedAge] = useState(0)
  const [selectedSmoke, setSelectedSmoke] = useState('')
  const [selectedMBTI, setSelectedMBTI] = useState('')
  const [selectedregion, setSelectedregion] = useState('')
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('')
  const [selectedActivityTime, setSelectedActivityTime] = useState('')
  const [mytext, setMytext] = useState('')
  const [favoriteTag, setfavoriteTag] = useState<string[]>([])

  // 프로필 성향 업데이트 성공 감지(콜백 함수)
  const [, setProfileUpdated] = useState(false)

  const handleUpdateProfileSuccess = () => {
    setProfileUpdated(prevState => !prevState)
  }

  // 프로필 불러오기
  const {
    datas: profileData,
    isLoading: fetchProfileLoading,
    setUrl: setProfileUrl,
    setHeaders: setProfileHeaders,
    setMethod: setProfileMethod,
    setBody: setProfileBody,
  } = useFetch<UserProfile | null>("", "", {}, null)
  
  const handleProfile = () => {
    setProfileUrl(`/api/${userMyprofile}`)
    setProfileMethod("GET")
    setProfileHeaders({
      "Content-Type": "application/json",
      Authorization: userToken.atk.toString(),
    })
    setProfileBody()
  }
  
  useEffect(() => {
    if (profileData) {
      setSelectedGender(profileData.gender === 'null' ? '성별' : profileData.gender)
      setNickname(profileData.nickname)
      setSelectedAge(profileData.myAge === null ? 0 : profileData.myAge)
      setEmail(profileData.email)
      setProfileImage(profileData.image === null ? img : profileData.image)
      setSelectedSmoke(profileData.isSmoker === true ? '합니다' : '하지 않습니다')
      setSelectedMBTI(profileData.mbti === 'null' ? 'mbti' : profileData.mbti)
      setSelectedregion(profileData.region === 'null' ? '여기' : profileData.region)
      setSelectedAgeGroup(`${Number(profileData.minAge)}-${Number(profileData.maxAge)}`)
      setSelectedActivityTime(profileData.activityTime === 'null' ? '오전오후' : profileData.activityTime)
      setMytext(profileData.detail ?? '추가로 하고 싶은 말을 적어주세요! :)')
      setfavoriteTag(profileData.tags)
    }
  }, [profileData])

  useEffect(() => {
    handleProfile()
  }, []) 

  return (
    <>
      <MyPage />
      <div className={styles.profileContainer}>
        {
          fetchProfileLoading ? (
            <Spin style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}/>
          ) : (
            <>
              <ProfileBasic 
                nickname={nickname} 
                setNickname={setNickname}
                email={email}
                setEmail={setEmail}
                profileImage={profileImage}
                setProfileImage={setProfileImage}/>
              <ProfileTendency
                selectedGender={selectedGender} 
                setSelectedGender={setSelectedGender}
                selectedAge={selectedAge}
                setSelectedAge={setSelectedAge}
                selectedSmoke={selectedSmoke}
                setSelectedSmoke={setSelectedSmoke}
                selectedMBTI={selectedMBTI}
                setSelectedMBTI={setSelectedMBTI}
                selectedregion={selectedregion}
                setSelectedregion={setSelectedregion}
                selectedAgeGroup={selectedAgeGroup}
                setSelectedAgeGroup={setSelectedAgeGroup}
                selectedActivityTime={selectedActivityTime}
                setSelectedActivityTime={setSelectedActivityTime}
                mytext={mytext}
                setMytext={setMytext}
                favoriteTag={favoriteTag}
                setFavoriteTag={setfavoriteTag}
                handleUpdateProfileSuccess={handleUpdateProfileSuccess}
                />
            </>
          )
        }
      </div>
    </>
  )
}

export default Profile