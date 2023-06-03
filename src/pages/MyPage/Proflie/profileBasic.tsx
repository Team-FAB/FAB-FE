import { Button } from 'antd';
import styles from './profile.module.css'

const ProfileBasic: React.FC = () => {

  return (
    <div className={styles.profilePhotoBox}>
      <div>
        <img className={styles.profilePhoto} src='https://via.placeholder.com/120' />
      </div>
      <form className={styles.profileBasic}>
        <div>
          <p>닉네임</p>
          <input type='text' name='displayName' />
        </div>
        <div>
          <p>이메일</p>
          <input type='text' name='email'/>
        </div>
        {/* <input type='submit' value='변경' /> */}
        <Button className={styles.basicBtn} type="primary" style={{ width: 70, height: 30, fontSize: 10, borderRadius: 20 }}>수정</Button>
      </form>
    </div>
  )
}

export default ProfileBasic