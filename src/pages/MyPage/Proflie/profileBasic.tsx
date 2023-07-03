import { Input, Button, Form, Modal } from "antd"
import { UserOutlined, MailOutlined } from "@ant-design/icons"
import styles from './profile.module.css'
import { useSelector } from "react-redux"
import { RootState } from "../../../Redux/store"
import { ProfileBasicProps } from "../../../interface/interface"
import { userMyprofileNickname } from '../../../api'
import ProfileFile from "./profileFile"

const ProfileBasic = (props: ProfileBasicProps) => {
  const userToken = useSelector((state : RootState) => state.user.data.token)
  
  // 프로필 기본 정보 수정
  const handleProfileBasicChange = async ({ nickname }: { nickname: string}) => {
    const updatedProfileData = { nickname: nickname }

    try {
      await updateProfile(updatedProfileData)
    } catch (error) {
      console.error('프로필 업데이트 실패', error)
    }
  }

  // 닉네임 수정
  const updateProfile = async (profileData: { nickname: string }) => {
    try {
      const response = await fetch(`/api/${userMyprofileNickname}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken.atk.toString(),
        },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        if (response.status === 400) {
          Modal.error({
            title: "오류",
            content: "닉네임이 중복되었습니다.",
          })
        } 
        throw new Error('프로필 기본 정보 업데이트 실패')
        
      } else {
        Modal.success({
          title: "닉네임 수정 완료",
          content: "닉네임 수정이 완료되었습니다!",
        })
      }

      const responseData = await response.json()
      props.setNickname(responseData.data.nickname)
    } catch (error) {
      console.error('프로필 기본정보 업데이트 오류', error)
    }
  }

  return (
    <div className={styles.profilePhotoBox}>
      <div>
        <ProfileFile profileImage={props.profileImage} setProfileImage={props.setProfileImage}/>
      </div>
      <Form
        name="profileBasicUpdate"
        initialValues={{ remember: true }}
        onFinish={handleProfileBasicChange}
        className={styles.profileformBox}
      >
        <div className={styles.originNickname}>{props.nickname} 님</div>
        <Input
          prefix={<MailOutlined />}
          placeholder="이메일입니다."
          type="email"
          value={props.email}
          style={{ width: 200, height: 40, textAlign: 'center', marginBottom: 12 }}
          readOnly />
        <Form.Item
          name="nickname"
          initialValue={props.nickname}
          rules={[
            { required: true, message: "새로운 닉네임을 입력하세요." },
            { type: "string", message: "기존 닉네임과 같습니다." },
          ]}
        >
          <Input
          prefix={<UserOutlined />}
          placeholder="새로운 닉네임을 입력하세요."
          onChange={(e) => e.target.value }
          style={{ width: 200, height: 40, textAlign: 'center' }}/>
        </Form.Item>
        <Button 
          className={styles.basicBtn} 
          type="primary" 
          htmlType="submit" 
          style={{ width: 70, height: 30, fontSize: 10, borderRadius: 20 }}>
          닉네임 수정
        </Button>
      </Form>
    </div>
  )
}

export default ProfileBasic