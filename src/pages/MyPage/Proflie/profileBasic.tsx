import { Input, Button, Form, Upload, Modal } from "antd"
import { UserOutlined, MailOutlined } from "@ant-design/icons"
import styles from './profile.module.css'
import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../Redux/store"
import { ProfileBasicProps } from "../../../interface/interface"

const ProfileBasic = (props: ProfileBasicProps) => {

  // 로그인한 유저 가져오기
  const userToken = useSelector((state : RootState) => state.user.data.token)

  // 사진 업로드
  const [profilePhoto, setProfilePhoto] = useState<string>('https://via.placeholder.com/120')

  const handleImageUpload = async (file: File | Blob) => {
    //
  }
  
  const handleProfileBasicChange = async ({ nickname, email }: { nickname: string, email: string }) => {
    const updatedProfileData = { nickname: nickname }

    console.log("입력된 닉네임:", nickname)

    try {
      await updateProfile(updatedProfileData)
    } catch (error) {
      console.error('프로필 업데이트 실패', error)
    }
  };

  // 서버 연결
  const updateProfile = async (profileData: { nickname: string }) => {
    try {
      const response = await fetch('https://.../api/profile', { // 주소 수정
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken.atk.toString(),
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        console.log(response)
        throw new Error('프로필 기본 정보 업데이트 실패');
      } else {
        Modal.success({
          title: "닉네임 수정 완료",
          content: "닉네임 수정이 완료되었습니다!",
        })
      }

      const data = await response.json();
      props.setNickname(data.nickname)
    } catch (error) {
      console.error('프로필 기본정보 업데이트 오류', error);
    }
  };

  return (
    <div className={styles.profilePhotoBox}>
      <div>
        <Upload
          accept="image/*"
          showUploadList={false}
          beforeUpload={(file) => {
            handleImageUpload(file)
            return false
          }}>
          <img className={styles.profilePhoto} src={profilePhoto} alt="Profile" />
        </Upload>
      </div>

      <Form
        name="profileBasicUpdate"
        initialValues={{ remember: true }}
        onFinish={handleProfileBasicChange}
        className={styles.profileformBox}>
        <Form.Item
          name="nickname"
          rules={[
            { required: true, message: "새로운 닉네임을 입력하세요." },
            { type: "string", message: "기존 닉네임과 같습니다." },
          ]}>
          <Input
            prefix={<UserOutlined />}
            placeholder="새로운 닉네임을 입력하세요."
            value={props.nickname}
            onChange={(e) => e.target.value}
            style={{ width: 200, height: 40 }}/>
        </Form.Item>
        <Form.Item
          name="email">
          <Input
            prefix={<MailOutlined />}
            placeholder="이메일입니다."
            type="email"
            value={props.email}
            style={{ width: 200, height: 40 }}
            readOnly />
        </Form.Item>
        <Form.Item>
          <Button 
            className={styles.basicBtn} 
            type="primary" 
            htmlType="submit" 
            style={{ width: 70, height: 30, fontSize: 10, borderRadius: 20 }}>
            수정
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ProfileBasic