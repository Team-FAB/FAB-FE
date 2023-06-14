import styles from './profile.module.css'
import { Upload } from "antd"
import { useState } from "react"
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'


const ProfileFile = () => {

  // 사진 업로드
  const [profilePhoto, setProfilePhoto] = useState<string>('https://via.placeholder.com/120')
  const userToken = useSelector((state : RootState) => state.user.data.token)

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setProfilePhoto(event.target.files[0])
  // }

  const handleImageUpload = async (file: File | Blob) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken.atk.toString(),
        },
        body: formData,
      })
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Upload
        accept="image/*"
        showUploadList={false}
        beforeUpload={(file) => {
          handleImageUpload(file)
          // handleFileChange
          return false
        }}>
        <img className={styles.profilePhoto} src={profilePhoto} alt="Profile" />
      </Upload>
    </>
  )
}

export default ProfileFile