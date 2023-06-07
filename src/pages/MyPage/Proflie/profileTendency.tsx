import styles from './profile.module.css'
import { Modal } from 'antd';
import { Button } from 'antd';
import { Checkbox } from 'antd';
import { Badge } from "antd"
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { Radio } from "antd"

const ProfileTendency: React.FC = () => {

  const [tendencyModal, setTendencyModal] = useState(false)
  const [selectedMBTI, setSelectedMBTI] = useState("mbti")
  const [MBTIBoxOpen, setMBTIBoxOpen] = useState(false)
  const [selectedregion, setSelectedregion] = useState("지역")
  const [regionBoxOpen, setRegionBoxOpen] = useState(false)

  const handleToggleMBTIBox = () => {
    setMBTIBoxOpen(!MBTIBoxOpen)
  }

  const handleToggleRegionBox = () => {
    setRegionBoxOpen(!regionBoxOpen)
  }

  const tendencyChoice = [
    { label: "밥 같이 먹는", value: "밥 같이 먹는" },
    { label: "밥 혼자 먹는", value: "밥 혼자 먹는" },
    { label: "동갑", value: "동갑" },
    { label: "흡연하는", value: "흡연하는" },
    { label: "금연하는", value: "금연하는" },
    { label: "사생활 존중하는", value: "사생활 존중하는" },
    { label: "취미가 같은", value: "취미가 같은" },
    { label: "음주를 좋아하는", value: "음주를 좋아하는" },
    { label: "대화를 좋아하는", value: "대화를 좋아하는" },
    { label: "조용한 분위기를 좋아하는", value: "조용한 분위기를 좋아하는" },
    { label: "동물을 좋아하는", value: "동물을 좋아하는" },
  ];

  const gender = [{ name: "여성" }, { name: "남성" }]

  const age= [
    {age: 20},
    {age: 30}
  ]

  const ageGroup = [
    {ageGroup: '20-25'},
    {ageGroup: '25-30'},
    {ageGroup: '30-35'},
  ]

  const smoke = [{ smoke: "합니다" }, { smoke: "하지 않습니다" }]

  const activityTime = [{ activityTime: '오전' }, { activityTime: '오후' }]

  const mbti = [
    {mbti : 'ISTJ'},
    {mbti : 'ISFJ'},
    {mbti : 'INFJ'},
    {mbti : 'INTJ'},
    {mbti : 'ISTP'},
    {mbti : 'ISFP'},
    {mbti : 'INFP'},
    {mbti : 'INTP'},
    {mbti : 'ESTP'},
    {mbti : 'ESFP'},
    {mbti : 'ENFP'},
    {mbti : 'ENTP'},
    {mbti : 'ESTJ'},
    {mbti : 'ESFJ'},
    {mbti : 'ENFJ'},
    {mbti : 'ENTJ'},
  ]

  const region = [
    { region: "마포구" },
    { region: "서대문구" },
    { region: "은평구" },
    { region: "용산구" },
    { region: "중구" },
    { region: "종로구" },
    { region: "성북구" },
    { region: "성동구" },
    { region: "동대문구" },
    { region: "광진구" },
    { region: "중랑구" },
    { region: "강북구" },
    { region: "도봉구" },
    { region: "노원구" },
    { region: "강서구" },
    { region: "양천구" },
    { region: "구로구" },
    { region: "영등포구" },
    { region: "동작구" },
    { region: "금천구" },
    { region: "관악구" },
    { region: "서초구" },
    { region: "강남구" },
    { region: "송파구" },
    { region: "강동구" },
  ]

  return (
    <div className={styles.profileTenContainer}>
      <p>내 프로필</p>
      <span>룸메이트 신청 시 사용되는 프로필 입니다.</span>
      <div className={styles.dropdownContainer}>
        <Radio.Group>
          <p className={styles.dropdownP}> 저의 성별은
            {
              gender.map((item, index) => (
                <Radio
                key={index}
                value={item.name}
                className={styles.radioBtn}>
                  {item.name}
                </Radio>
              ))
            }
            입니다 ☺️
          </p>
        </Radio.Group>
        <Radio.Group>
          <p className={styles.dropdownP}> 저의 연령대는
            {
              age.map((item, index) => (
                <Radio
                key={index}
                value={item.age}
                className={styles.radioBtn}>
                  {item.age}
                </Radio>
              ))
            }
            입니다 ☺️
          </p>
        </Radio.Group>
        <Radio.Group>
          <p className={styles.dropdownP}> 저는 흡연을
            {
              smoke.map((item, index) => (
                <Radio
                key={index}
                value={item.smoke}
                className={styles.radioBtn}>
                  {item.smoke}
                </Radio>
              ))
            }
          </p>
        </Radio.Group>
        <Radio.Group onChange={(e) => {
          setSelectedMBTI(e.target.value);
          setMBTIBoxOpen(false);
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}> 저의 MBTI는</p>
            <div onClick={handleToggleMBTIBox}>
              <Badge className={styles.dropdownBadge}>{selectedMBTI}</Badge>
            </div>
            <p className={styles.dropdownP}> 입니다 ☺️</p>
          </div>
          {MBTIBoxOpen && (
            <div className={styles.mbtiRadioBtn}> 
              {mbti.map((item, index) => (
                <Radio
                  key={index}
                  value={item.mbti}
                  className={styles.mbtiRadio}>
                    {item.mbti}
                </Radio>
              ))}
            </div>
          )}
        </Radio.Group>
        <Radio.Group onChange={(e) => {
          setSelectedregion(e.target.value);
          setRegionBoxOpen(false);
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}> 제가 희망하는 지역은 </p>
            <div onClick={handleToggleRegionBox}>
              <Badge className={styles.dropdownBadge}>{selectedregion}</Badge>
            </div>
            <p className={styles.dropdownP}> 입니다 ☺️</p>
          </div>
          {regionBoxOpen && (
            <div className={styles.regionRadioBtn}> 
              {region.map((item, index) => (
                <Radio
                  key={index}
                  value={item.region}
                  className={styles.regionRadio}>
                    {item.region}
                </Radio>
              ))}
            </div>
          )}
        </Radio.Group>
        <Radio.Group>
          <p className={styles.dropdownP}>희망하는 연령대는
            {
              ageGroup.map((item, index) => (
                <Radio
                key={index}
                value={item.ageGroup}
                className={styles.radioBtn}>
                  {item.ageGroup}
                </Radio>
              ))
            }
            입니다 ☺️
          </p>
        </Radio.Group>
        <Radio.Group>
          <p className={styles.dropdownP}> 저는 대부분
            {
              activityTime.map((item, index) => (
                <Radio
                key={index}
                value={item.activityTime}
                className={styles.radioBtn}>
                  {item.activityTime}
                </Radio>
              ))
            }
            에 활동합니다 ☺️
          </p>
        </Radio.Group>
      </div>
      <div className={styles.tagContainer}>
        <div>
          <div className={styles.tendencyDesc}>
            <span>이런 룸메이트는 싫어요 😤</span>
            <Button className={styles.tendencyBtn} type="primary" onClick={() => setTendencyModal(true)} style={{ width: 50, height: 25, fontSize: 10, borderRadius: 20 }}>수정</Button>
            <Modal
              title="이런 룸메이트는 싫어요 😤 (1개 ~ 5개 선택)"
              centered
              open={tendencyModal}
              onOk={() => setTendencyModal(false)}
              onCancel={() => setTendencyModal(false)}>
              <div className={styles.tendencyModalBox}>
                <Checkbox.Group options={tendencyChoice} />
              </div>
            </Modal>
          </div>
          <div className={styles.tendencyBox}>
            {tendencyChoice.map((item, index) => (
              <span key={index}>#{item.label}</span>
            ))}
          </div>
        </div>
        <div>
          <div className={styles.tendencyDesc}>
            <span>이런 룸메이트가 좋아요 🥰</span>
            <Button className={styles.tendencyBtn} type="primary" onClick={() => setTendencyModal(true)} style={{ width: 50, height: 25, fontSize: 10, borderRadius: 20 }}>수정</Button>
            <Modal
              title="이런 룸메이트가 좋아요 🥰 (1개 ~ 최대 5개 선택)"
              centered
              open={tendencyModal}
              onOk={() => setTendencyModal(false)}
              onCancel={() => setTendencyModal(false)}>
              <div className={styles.tendencyModalBox}>
                <Checkbox.Group options={tendencyChoice} />
              </div>
            </Modal>
          </div>
          <div className={styles.tendencyBox}>
            {tendencyChoice.map((item, index) => (
              <span key={index}>#{item.label}</span>
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
          <Button className={styles.textareaBtn} type="primary" style={{ width: 100, height: 35, fontSize: 10, borderRadius: 20 }}>
            내 프로필 수정
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileTendency