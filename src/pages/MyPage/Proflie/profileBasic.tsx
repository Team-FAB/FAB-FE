import { Input, Button, Form, Upload } from "antd"
import { UserOutlined, MailOutlined } from "@ant-design/icons"
import styles from './profile.module.css'
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";

const ProfileBasic: React.FC = () => {

  // 로그인한 유저 가져오기
  const isLogged = useSelector((state: RootState) => state.user.isLogged)
  const userToken = useSelector((state : RootState) => state.user.data.token)

  // 사진 업로드
  const [profilePhoto, setProfilePhoto] = useState<string>('https://via.placeholder.com/120')

  const handleImageUpload = async (file: File | Blob) => {
    //
  }

  // 새로운 닉네임, 비밀번호 할당
  const [nickname, setNickname] = useState('');
  const [email] = useState('');
  
  const handleProfileBasicChange = async (values: { nickname: string }) => {
    const updatedProfileData = { name: values.nickname }

    console.log("입력된 닉네임:", values.nickname);
    // console.log("입력된 비밀번호:", values.password);

    try {
      const token = '여기에 JWT 토큰을 저장해둔다';
      const updatedProfile = await updateProfile(updatedProfileData, token);
      console.log('프로필 업데이트 성공', updatedProfile);
    } catch (error) {
      console.error('프로필 업데이트 실패', error);
    }
  };

  // 서버 연결
  const updateProfile = async (profileData: { name: string }, token: string) => {
    try {
      const response = await fetch('https://.../api/profile', { // 주소 수정
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 포함
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('프로필 기본 정보 업데이트 실패');
      }

      const updatedProfileBasic = await response.json();
      return updatedProfileBasic;
    } catch (error) {
      console.error('프로필 기본정보 업데이트 오류', error);
      throw error;
    }
  };

  return (
    <div className={styles.profilePhotoBox}>
      <div>
        <Upload
          accept="image/*"
          showUploadList={false}
          beforeUpload={(file) => {
            handleImageUpload(file);
            return false;
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
            value={nickname}
            onChange={(e) => setNickname(e.target.value)} // 닉네임 변경 핸들러 설정
            style={{ width: 200, height: 40 }}/>
        </Form.Item>
        <Form.Item
          name="email">
          <Input
            prefix={<MailOutlined />}
            placeholder="이메일입니다."
            type="email"
            value={email}
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