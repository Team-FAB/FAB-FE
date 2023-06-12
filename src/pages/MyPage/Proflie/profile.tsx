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

        const data = await response.json()
        console.log(data.data)
        setNickname(data.data.nickname)
        setEmail(data.data.email)
        setSelectedSmoke(data.data.isSmoker)
        setSelectedMBTI(data.data.mbti)
        setSelectedregion(data.data.region)
        // setSelectedAgeGroup(`${Number(data.data.minAge)} ~ ${Number(data.data.maxAge)}`)
        setSelectedActivityTime(data.data.activityTime)
        setMytext(data.data.detail)
        setfavoriteTag(data.data.tags)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [userToken.atk, nickname, profileUpdated])

  return (
    <>
      <MyPage />
      <div className={styles.profileContainer}>
        <ProfileBasic 
          nickname={nickname} 
          setNickname={setNickname}
          email={email}/>
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