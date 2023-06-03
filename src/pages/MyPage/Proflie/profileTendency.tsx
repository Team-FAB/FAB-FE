import styles from './profile.module.css'
import { MenuProps, Modal } from 'antd';
import { Button, Dropdown } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';

const ProfileTendency: React.FC = () => {

  const [tendencyModal, setTendencyModal] = useState(false);

  const tendencyChoice = [
    { tendency: "밥 같이 먹는" },
    { tendency: "밥 혼자 먹는" },
    { tendency: "동갑" },
    { tendency: "흡연하는" },
    { tendency: "금연하는" },
    { tendency: "사생활 존중하는" },
    { tendency: "취미가 같은" },
    { tendency: "음주를 좋아하는" },
    { tendency: "대화를 좋아하는" },
    { tendency: "조용한 분위기를 좋아하는" },
    { tendency: "동물을 좋아하는" },
  ]

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p>여자</p>
      ),
    },
    {
      key: '2',
      label: (
        <p>남자</p>
      ),
    },
  ];

  return (
    <div className={styles.profileTenContainer}>
      <p>내 프로필</p>
      <span>룸메이트 신청 시 사용되는 프로필 입니다.</span>
      <div className={styles.dropdownContainer}>
        <Dropdown menu={{ items }} placement="bottom">
          <p className={styles.dropdownP}>저의 성별은 <Button style={{ borderRadius: 15 }}>여자</Button> 입니다 ☺️</p>
        </Dropdown>
        <Dropdown menu={{ items }} placement="bottom">
          <p>저의 연령대는 <Button style={{ borderRadius: 15 }}>여자</Button> 입니다 ☺️</p>
        </Dropdown>
      </div>
      <div className={styles.tagContainer}>
        <div>
          <div className={styles.tendencyDesc}>
            <span>이런 룸메이트는 싫어요 😤</span>
            <Button className={styles.tendencyBtn} type="primary" onClick={() => setTendencyModal(true)} style={{ width: 50, height: 25, fontSize: 10, borderRadius: 20 }}>수정</Button>
            <Modal
              title="이런 룸메이트는 싫어요 😤 (최대 1개 ~ 5개 선택)"
              centered
              open={tendencyModal}
              onOk={() => setTendencyModal(false)}
              onCancel={() => setTendencyModal(false)}
            >
             <div className={styles.tendencyModalBox}>
              {tendencyChoice.map((item, index) => (
                <span key={index}>#{item.tendency}</span>
              ))}
            </div>
            </Modal>
          </div>
          <div className={styles.tendencyBox}>
            {tendencyChoice.map((item, index) => (
              <span key={index}>#{item.tendency}</span>
            ))}
          </div>
        </div>
        <div>
          <div className={styles.tendencyDesc}>
            <span>이런 룸메이트가 좋아요 🥰</span>
            <Button className={styles.tendencyBtn} type="primary" onClick={() => setTendencyModal(true)} style={{ width: 50, height: 25, fontSize: 10, borderRadius: 20 }}>수정</Button>
            <Modal
              title="이런 룸메이트가 좋아요 🥰 (최대 1개 ~ 최대 5개 선택)"
              centered
              open={tendencyModal}
              onOk={() => setTendencyModal(false)}
              onCancel={() => setTendencyModal(false)}
            >
             <div className={styles.tendencyModalBox}>
              {tendencyChoice.map((item, index) => (
                <span key={index}>#{item.tendency}</span>
              ))}
            </div>
            </Modal>
          </div>
          <div className={styles.tendencyBox}>
            {tendencyChoice.map((item, index) => (
              <span key={index}>#{item.tendency}</span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.IntroducContainer}>
        <p>본인 소개</p>
        <div>
          <TextArea
            showCount
            maxLength={200}
            style={{ width:330, height: 110, resize: 'none', background:'#E5E5E5' }}
            placeholder={`  추가로 하고 싶은 말을 자세히 적어주세요!
  예를들면 먼지 알러지가 있는지, 집에서 밥을 먹지 않는다던지
  자유롭게 얘기해보세요 :)`}
          />
          <Button className={styles.textareaBtn} type="primary" style={{ width: 100, height: 35, fontSize: 10, borderRadius: 20 }}>내 프로필 수정</Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileTendency