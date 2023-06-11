import { useEffect, useState } from 'react'
import MyPage from '../myPage'
import styles from './profile.module.css'
import ProfileBasic from './profileBasic'
import ProfileTendency from './profileTendency'
import { activityTime, age, ageGroup, gender, mbti, region, smoke } from '../../../object/profileDropdown'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'

const Profile: React.FC = () => {

  // profileBasic
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')

  // profileTendency
  const [selectedGender, setSelectedGender] = useState(gender[0].name)
  const [selectedAge, setSelectedAge] = useState(age[0].age)
  const [selectedSmoke, setSelectedSmoke] = useState(smoke[0].smoke)
  const [selectedMBTI, setSelectedMBTI] = useState(mbti[0].mbti)
  const [selectedregion, setSelectedregion] = useState(region[0].region)
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(ageGroup[0].ageGroup)
  const [selectedActivityTime, setSelectedActivityTime] = useState(activityTime[0].activityTime)
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
        const response = await fetch('https://.../api/profile',
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
        console.log(data)
        setNickname(data.nickname)
        setEmail(data.email)
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