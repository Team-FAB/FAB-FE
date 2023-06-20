import { useEffect, useState } from 'react'
import MyPage from '../myPage'
import styles from './profile.module.css'
import ProfileBasic from './profileBasic'
import ProfileTendency from './profileTendency'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { userMyprofile } from '../../../api'

const Profile: React.FC = () => {

  // profileBasic
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/120')

  // profileTendency
  const [selectedGender, setSelectedGender] = useState('남여')
  const [selectedAge, setSelectedAge] = useState(0)
  const [selectedSmoke, setSelectedSmoke] = useState('할까요?')
  const [selectedMBTI, setSelectedMBTI] = useState('mbti')
  const [selectedregion, setSelectedregion] = useState('여기')
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('0 ~ 0')
  const [selectedActivityTime, setSelectedActivityTime] = useState('오전오후')
  const [mytext, setMytext] = useState('추가로 하고 싶은 말을 자세히 적어주세요! :)')
  const [favoriteTag, setfavoriteTag] = useState<string[]>([])

  // 프로필 성향 업데이트 성공 감지(콜백 함수)
  const [profileUpdated, setProfileUpdated] = useState(false)

  const handleUpdateProfileSuccess = () => {
    setProfileUpdated(prevState => !prevState)
  }

  // 로그인한 user
  const userToken = useSelector((state : RootState) => state.user.data.token)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/${userMyprofile}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: userToken.atk.toString(),
            },
          },
        )

        if (!response.ok) {
          throw new Error(`서버 상태 응답 ${response.status}`)
        }

        const responseData = await response.json()
        
        setSelectedGender(responseData.data.gender === 'null' ? '성별' : responseData.data.gender)
        setNickname(responseData.data.nickname)
        setSelectedAge(responseData.data.myAge === null ? '0' : responseData.data.myAge)
        setEmail(responseData.data.email)
        setProfileImage(responseData.data.image === null ? 'https://via.placeholder.com/120' : responseData.data.image)
        setSelectedSmoke(responseData.data.isSmoker === true ? '합니다' : '하지 않습니다')
        setSelectedMBTI(responseData.data.mbti === 'null' ? 'mbti' : responseData.data.mbti)
        setSelectedregion(responseData.data.region === 'null' ? '여기' : responseData.data.region)
        setSelectedAgeGroup(`${Number(responseData.data.minAge)}-${Number(responseData.data.maxAge)}`)
        setSelectedActivityTime(responseData.data.activityTime === 'null' ? '오전오후' : responseData.data.activityTime)
        setMytext(responseData.data.detail ?? '추가로 하고 싶은 말을 적어주세요! :)')
        setfavoriteTag(responseData.data.tags)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [nickname, profileUpdated])

  return (
    <>
      <MyPage />
      <div className={styles.profileContainer}>
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
      </div>
    </>
  )
}

export default Profile