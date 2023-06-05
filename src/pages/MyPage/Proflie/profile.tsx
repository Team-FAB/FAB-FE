import MyPage from '../myPage'
import styles from './profile.module.css'
import ProfileBasic from './profileBasic'
import ProfileTendency from './profileTendency'

const Profile: React.FC = () => {

  return (
    <>
      <MyPage />
      <div className={styles.profileContainer}>
        <ProfileBasic />
        <ProfileTendency />
      </div>
    </>
  )
}

export default Profile