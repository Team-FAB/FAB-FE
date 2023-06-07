import { Input, Button, Form, Upload } from "antd"
import { UserOutlined, MailOutlined } from "@ant-design/icons"
import styles from './profile.module.css'
import { useState } from "react";

const ProfileBasic: React.FC = () => {

  const [profilePhoto, setProfilePhoto] = useState<string>('https://via.placeholder.com/120');

  const handleImageUpload = (file: File | Blob) => {
    const imageURL = URL.createObjectURL(file);
    setProfilePhoto(imageURL);
  };

  return (
    <div className={styles.profilePhotoBox}>
      <div>
        <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={(file) => {
              handleImageUpload(file);
              return false; // 업로드 후 자동으로 업로드 목록에 추가되지 않도록 설정
            }}>
          <img className={styles.profilePhoto} src={profilePhoto} alt="Profile" />
        </Upload>
      </div>

      <Form
        name="signUp"
        initialValues={{ remember: true }}
        className={styles.profileformBox}>
        <Form.Item
          name="nickname"
          rules={[
            { required: true, message: "새로운 닉네임을 입력하세요." },
            { type: "email", message: "기존 닉네임과 같습니다." },
          ]}>
          <Input
            prefix={<UserOutlined />}
            placeholder="새로운 닉네임을 입력하세요."
            style={{ width: 200, height: 40 }}/>
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "새로운 이메일을 입력하세요." }]}>
          <Input
            prefix={<MailOutlined />}
            type="email"
            placeholder="새로운 이메일을 입력하세요."
            style={{ width: 200, height: 40 }}/>
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