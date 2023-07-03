import styles from './profile.module.css'
import { Modal, Upload } from "antd"
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { userMyprofileFile } from '../../../api'
import { ProfileFileProps } from '../../../interface/interface'

const ProfileFile = (props: ProfileFileProps) => {
  const userToken = useSelector((state : RootState) => state.user.data.token)

  // 사진 업로드
  const beforeUpload = (file: File) => {
    const fileTypes = ['image/jpeg', 'image/png']
    const maxSize = 10 * 1024 * 1024
    
    if (!fileTypes.includes(file.type)) {
      Modal.warning({
        title: '이미지 형식 오류',
        content: 'JPEG 또는 PNG 이미지만 업로드 가능합니다.',
      })
      return false
    }

    if (file.size > maxSize) {
      Modal.warning({
        title: '이미지 크기 초과',
        content: '이미지 크기는 10MB를 초과할 수 없습니다.',
      })
      return false
    }

    handleImageUpload(file)
    return false
  }

  const handleImageUpload = async (file: File | Blob) => {
    const formData = new FormData()
    formData.append("image", file)

    try {
      const response = await fetch(`/api/${userMyprofileFile}`, {
        method: "POST",
        headers: {
          Authorization: userToken.atk.toString(),
        },
        body: formData,
      })
      const responseData = await response.json()

      if(responseData.data.image) {
        props.setProfileImage(responseData.data.image)
      }

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Upload
        accept="image/*"
        showUploadList={false}
        beforeUpload={beforeUpload}>
        <img className={styles.profilePhoto} src={props.profileImage} alt="Profile" />
      </Upload>
    </>
  )
}

export default ProfileFile