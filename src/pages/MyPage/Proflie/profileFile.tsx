import styles from './profile.module.css'
import { Upload } from "antd"
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { userMyprofileFile } from '../../../api'
import { ProfileFileProps } from '../../../interface/interface'


const ProfileFile = (props: ProfileFileProps) => {

  // 사진 업로드
  const userToken = useSelector((state : RootState) => state.user.data.token)

  const handleImageUpload = async (file: File | Blob) => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch(`/api/${userMyprofileFile}`, {
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: userToken.atk.toString(),
        },
        body: formData,
      })
      const data = await response.json()

      if(data && data.url) {
        props.setProfileImage(data.url)
      }
      console.log(data)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Upload
        accept="image/*"
        showUploadList={false}
        beforeUpload={(file) => {
          handleImageUpload(file)
          return false
        }}>
        <img className={styles.profilePhoto} src={props.profileImage} alt="Profile" />
      </Upload>
    </>
  )
}

export default ProfileFile