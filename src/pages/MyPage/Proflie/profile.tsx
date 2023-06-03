import styles from './profile.module.css'
import ProfileBasic from './profileBasic'
import ProfileTendency from './profileTendency'

const Profile: React.FC = () => {

  return (
    <div className={styles.profileContainer}>
      <ProfileBasic />
      <ProfileTendency />
    </div>
  )
}

export default Profile