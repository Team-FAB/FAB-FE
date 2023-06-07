import styles from './profile.module.css'
import { Modal } from 'antd';
import { Button } from 'antd';
import { Checkbox } from 'antd';
import { Badge } from "antd"
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { Radio } from "antd"
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { activityTime, age, ageGroup, gender, mbti, region, smoke, tendencyChoice } from '../../../object/profileDropdown';

const ProfileTendency: React.FC = () => {

  const [tendencyModal, setTendencyModal] = useState(false)

  const [selectedGender, setSelectedGender] = useState("성별")
  const [genderBoxOpen, setGenderBoxOpen] = useState(false)
  const [selectedAge, setSelectedAge] = useState("00")
  const [ageBoxOpen, setAgeBoxOpen] = useState(false)
  const [selectedSmoke, setSelectedSmoke] = useState("담배")
  const [smokeBoxOpen, setSmokeBoxOpen] = useState(false)
  const [selectedMBTI, setSelectedMBTI] = useState("MBTI")
  const [MBTIBoxOpen, setMBTIBoxOpen] = useState(false)
  const [selectedregion, setSelectedregion] = useState("지역")
  const [regionBoxOpen, setRegionBoxOpen] = useState(false)
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("00 ~ 00")
  const [ageGroupBoxOpen, setAgeGroupBoxOpen] = useState(false)
  const [selectedActivityTime, setSelectedActivityTime] = useState("활동시간")
  const [activityTimeBoxOpen, setActivityTimeBoxOpen] = useState(false)

  const handleToggleGenderBox = () => {
    setGenderBoxOpen(!genderBoxOpen)
  }

  const handleToggleAgeBox = () => {
    setAgeBoxOpen(!ageBoxOpen)
  }

  const handleToggleSmokeBox = () => {
    setSmokeBoxOpen(!smokeBoxOpen)
  }

  const handleToggleMBTIBox = () => {
    setMBTIBoxOpen(!MBTIBoxOpen)
  }

  const handleToggleRegionBox = () => {
    setRegionBoxOpen(!regionBoxOpen)
  }

  const handleToggleAgeGroupBox = () => {
    setAgeGroupBoxOpen(!ageGroupBoxOpen)
  }

  const handleToggleactivityBox = () => {
    setActivityTimeBoxOpen(!activityTimeBoxOpen)
  }

  // 체크박스
  const [selectedTendency, setSelectedTendency] = useState<string[]>([]);

  const handleTendencyChange = (checkedValues: CheckboxValueType[]) => {
    setSelectedTendency(checkedValues as string[]);
  };

  return (
    <div className={styles.profileTenContainer}>
      <p>내 프로필</p>
      <span>룸메이트 신청 시 사용되는 프로필 입니다.</span>
      <div className={styles.dropdownContainer}>
        <Radio.Group onChange={(e) => {
          setSelectedGender(e.target.value);
          setGenderBoxOpen(false);
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}> 저의 성별은</p>
            <div onClick={handleToggleGenderBox}>
              <Badge className={styles.dropdownBadge}>{selectedGender}</Badge>
            </div>
            <p className={styles.dropdownP}> 입니다 ☺️</p>
          </div>
          {genderBoxOpen && (
            <div className={styles.regionRadioBtn}> 
              {gender.map((item, index) => (
                <Radio
                  key={index}
                  value={item.name}
                  className={styles.regionRadio}>
                    {item.name}
                </Radio>
              ))}
            </div>
          )}
        </Radio.Group>
        <Radio.Group onChange={(e) => {
          setSelectedAge(e.target.value);
          setAgeBoxOpen(false);
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}> 저의 연령대는</p>
            <div onClick={handleToggleAgeBox}>
              <Badge className={styles.dropdownBadge}>{selectedAge}</Badge>
            </div>
            <p className={styles.dropdownP}> 입니다 ☺️</p>
          </div>
          {ageBoxOpen && (
            <div className={styles.regionRadioBtn}> 
              {age.map((item, index) => (
                <Radio
                  key={index}
                  value={item.age}
                  className={styles.regionRadio}>
                    {item.age}
                </Radio>
              ))}
            </div>
          )}
        </Radio.Group>
        <Radio.Group onChange={(e) => {
          setSelectedSmoke(e.target.value);
          setSmokeBoxOpen(false);
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}> 저는 흡연을</p>
            <div onClick={handleToggleSmokeBox}>
              <Badge className={styles.dropdownBadge}>{selectedSmoke}</Badge>
            </div>
          </div>
          {smokeBoxOpen && (
            <div className={styles.regionRadioBtn}> 
              {smoke.map((item, index) => (
                <Radio
                  key={index}
                  value={item.smoke}
                  className={styles.regionRadio}>
                    {item.smoke}
                </Radio>
              ))}
            </div>
          )}
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
        <Radio.Group onChange={(e) => {
          setSelectedAgeGroup(e.target.value);
          setAgeGroupBoxOpen(false);
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}>제가 희망하는 연령대는</p>
            <div onClick={handleToggleAgeGroupBox}>
              <Badge className={styles.dropdownBadge}>{selectedAgeGroup}</Badge>
            </div>
            <p className={styles.dropdownP}> 입니다 ☺️</p>
          </div>
          {ageGroupBoxOpen && (
            <div className={styles.regionRadioBtn}> 
              {ageGroup.map((item, index) => (
                <Radio
                  key={index}
                  value={item.ageGroup}
                  className={styles.regionRadio}>
                    {item.ageGroup}
                </Radio>
              ))}
            </div>
          )}
        </Radio.Group>
        <Radio.Group onChange={(e) => {
          setSelectedActivityTime(e.target.value);
          setActivityTimeBoxOpen(false);
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}>저는 대부분</p>
            <div onClick={handleToggleactivityBox}>
              <Badge className={styles.dropdownBadge}>{selectedActivityTime}</Badge>
            </div>
            <p className={styles.dropdownP}> 에 활동합니다 ☺️</p>
          </div>
          {activityTimeBoxOpen && (
            <div className={styles.regionRadioBtn}> 
              {activityTime.map((item, index) => (
                <Radio
                  key={index}
                  value={item.activityTime}
                  className={styles.regionRadio}>
                    {item.activityTime}
                </Radio>
              ))}
            </div>
          )}
        </Radio.Group>
      </div>
      <div className={styles.tagContainer}>
        <div>
          <div className={styles.tendencyDesc}>
            <span>이런 룸메이트가 싫어요 😤</span>
            <Button className={styles.tendencyBtn} type="primary" onClick={() => setTendencyModal(true)} style={{ width: 50, height: 25, fontSize: 10, borderRadius: 20 }}>수정</Button>
            <Modal
              title="이런 룸메이트가 싫어요 😤 (1개 ~ 최대 5개 선택)"
              centered
              open={tendencyModal}
              onOk={() => {
                setTendencyModal(false);
                setSelectedTendency(selectedTendency);
              }}
              onCancel={() => setTendencyModal(false)}>
              <div className={styles.tendencyModalBox}>
                <Checkbox.Group options={tendencyChoice} onChange={handleTendencyChange} disabled/>
              </div>
            </Modal>
          </div>
          <div className={styles.tendencyBox}>
            {selectedTendency.map((item, index) => (
              <span key={index}>#{item}</span>
            ))}
          </div>
        </div>
        <div>
          <div className={styles.tendencyDesc}>
            <span>이런 룸메이트가 좋아요 🥰</span>
            {/* <Button className={styles.tendencyBtn} type="primary" onClick={() => setTendencyModal(true)} style={{ width: 50, height: 25, fontSize: 10, borderRadius: 20 }}>수정</Button> */}
            <Modal
              title="이런 룸메이트가 좋아요 🥰 (1개 ~ 최대 5개 선택)"
              centered
              open={tendencyModal}
              onOk={() => {
                setTendencyModal(false);
                setSelectedTendency(selectedTendency);
              }}
              onCancel={() => setTendencyModal(false)}>
              <div className={styles.tendencyModalBox}>
                <Checkbox.Group options={tendencyChoice} onChange={handleTendencyChange}/>
              </div>
            </Modal>
          </div>
          <div className={styles.tendencyBox}>
            {tendencyChoice
            .filter((option) => !selectedTendency.includes(option.value))
            .map((item, index) => (
              <span key={index}>#{item.value}</span>
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