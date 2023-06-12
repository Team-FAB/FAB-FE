import styles from './profile.module.css'
import { Modal, message } from 'antd'
import { Button } from 'antd'
import { Checkbox } from 'antd'
import { Badge } from "antd"
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import { Radio } from "antd"
import { CheckboxValueType } from 'antd/es/checkbox/Group'
import { activityTime, age, ageGroup, gender, mbti, region, smoke, tendencyChoice } from '../../../object/profileDropdown'
import { profileTendencyDropdown, profileTendencyProps, userProfileData } from '../../../interface/interface'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { userMyprofile } from '../../../api'

const ProfileTendency = (props:profileTendencyProps) => {

  // radio버튼 모달창
  const [tendencyModal, setTendencyModal] = useState(false)
  const [choiceModal, setChoiceModal] = useState(false)

  const [boxStates, setBoxStates] = useState({
    genderBoxOpen: false,
    ageBoxOpen: false,
    smokeBoxOpen: false,
    MBTIBoxOpen: false,
    regionBoxOpen: false,
    ageGroupBoxOpen: false,
    activityTimeBoxOpen: false
  })

  const handleToggleBox = (boxName: keyof profileTendencyDropdown) => {
    setBoxStates((prevState) => ({
      ...prevState,
      [boxName]: !prevState[boxName]
    }))
  }


  const handleTendencyChange = (checkedValues: CheckboxValueType[]) => {
    if (checkedValues.length <= 5) {
      props.setFavoriteTag(checkedValues as string[])
    } else {
      message.error('최대 5개까지 선택할 수 있습니다.')
    }
  }

  const userToken = useSelector((state : RootState) => state.user.data.token)

  // 서버 연결
  const updateProfileTendency = async (profileData: userProfileData) => {

    try {
      console.log(JSON.stringify(profileData))
      const response = await fetch(`/api/${userMyprofile}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken.atk.toString(), 
        },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        console.log(response)
        throw new Error('프로필 성향 정보 업데이트 실패')
      } else {
        Modal.success({
          title: "프로필 작성 완료",
          content: "프로필 수정이 완료되었습니다!",
        });
      }

      const updatedProfileTendency = await response.json()
      console.log(updatedProfileTendency)
      return updatedProfileTendency
    } catch (error) {
      console.error('프로필 성향 정보 업데이트 오류', error);
    }
  };

  // 프로필 정보 업데이트 핸들러
  const handleUpdateProfile = async () => {
    if (
      props.selectedGender === '남여' ||
      props.selectedAge === 0 ||
      props.selectedSmoke === '할까요?' ||
      props.selectedMBTI === 'mbti' ||
      props.selectedregion === '여기' ||
      props.selectedAgeGroup === '0 ~ 0' ||
      props.selectedActivityTime === '오전오후' ||
      props.favoriteTag.length === 0
    ) {
      setChoiceModal(true)
        return
    }
    try {
      const profileData: userProfileData = {
        gender: props.selectedGender,
        myAge: props.selectedAge,
        smoke: props.selectedSmoke === "합니다" ? true : false,
        mbti: props.selectedMBTI,
        region: props.selectedregion,
        minAge: Number(props.selectedAgeGroup.split('-')[0]),
        maxAge: Number(props.selectedAgeGroup.split('-')[1]),
        activityTime: props.selectedActivityTime === '오전' ? 'MORNING' : 'MIDNIGHT',
        myText: props.mytext,
        favoriteTag: props.favoriteTag
      };
      console.log('사용자 입력 데이터:', profileData)

      updateProfileTendency(profileData) // 토큰 값 변경 필요
      props.handleUpdateProfileSuccess()
    } catch (error) {
      console.error('프로필 업데이트 오류', error)
    }
  }
  
  return (
    <div className={styles.profileTenContainer}>
      <p>내 프로필</p>
      <span>룸메이트 신청 시 사용되는 프로필 입니다.</span>
      <div className={styles.dropdownContainer}>
        <Radio.Group onChange={(e) => {
          props.setSelectedGender(e.target.value)
          handleToggleBox("genderBoxOpen")
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}> 저의 성별은</p>
            <div onClick={() => handleToggleBox("genderBoxOpen")}>
              <Badge className={styles.dropdownBadge}>{props.selectedGender}</Badge>
            </div>
            {boxStates.genderBoxOpen && (
              <div className={styles.RadioBtn}>
                {gender.map((item, index) => (
                  <Radio
                    key={index}
                    value={item.name}
                    className={styles.Radio}
                  >
                    {item.name}
                  </Radio>
                ))}
              </div>
            )}
            <p className={styles.dropdownP}> 입니다 ☺️</p>
          </div>
        </Radio.Group>
        <Radio.Group onChange={(e) => {
          props.setSelectedAge(e.target.value);
          handleToggleBox("ageBoxOpen")
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}> 저의 연령대는</p>
            <div onClick={() => handleToggleBox("ageBoxOpen")}>
              <Badge className={styles.dropdownBadge}>{props.selectedAge}</Badge>
            </div>
            {boxStates.ageBoxOpen && (
              <div className={styles.RadioBtn}> 
                {age.map((item, index) => (
                  <Radio
                    key={index}
                    value={item.age}
                    className={styles.Radio}>
                      {item.age}
                  </Radio>
                ))}
              </div>
            )}
            <p className={styles.dropdownP}> 입니다 ☺️</p>
          </div>
        </Radio.Group>
        <Radio.Group onChange={(e) => {
          props.setSelectedSmoke(e.target.value);
          handleToggleBox("smokeBoxOpen")
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}> 저는 흡연을</p>
            <div onClick={() => handleToggleBox("smokeBoxOpen")}>
            <Badge className={styles.dropdownBadge}>{props.selectedSmoke}</Badge>
            </div>
            {boxStates.smokeBoxOpen && (
              <div className={styles.smokeRadioBtn}> 
                {smoke.map((item, index) => (
                  <Radio
                    key={index}
                    value={item.smoke}
                    className={styles.smokeRadio}>
                      {item.smoke}
                  </Radio>
                ))}
              </div>
            )}
          </div>
        </Radio.Group>
        <Radio.Group onChange={(e) => {
          props.setSelectedMBTI(e.target.value);
          handleToggleBox("MBTIBoxOpen")
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}> 저의 MBTI는</p>
            <div onClick={() => handleToggleBox("MBTIBoxOpen")}>
              <Badge className={styles.dropdownBadge}>{props.selectedMBTI}</Badge>
            </div>
            {boxStates.MBTIBoxOpen && (
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
            <p className={styles.dropdownP}> 입니다 ☺️</p>
          </div>
        </Radio.Group>
        <Radio.Group onChange={(e) => {
          props.setSelectedregion(e.target.value);
          handleToggleBox("regionBoxOpen")
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}> 제가 희망하는 지역은 </p>
            <div onClick={() => handleToggleBox("regionBoxOpen")}>
              <Badge className={styles.dropdownBadge}>{props.selectedregion}</Badge>
            </div>
            {boxStates.regionBoxOpen && (
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
            <p className={styles.dropdownP}> 입니다 ☺️</p>
          </div>
        </Radio.Group>
        <Radio.Group onChange={(e) => {
          props.setSelectedAgeGroup(e.target.value);
          handleToggleBox("ageGroupBoxOpen")
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}>제가 희망하는 연령대는</p>
            <div onClick={() => handleToggleBox("ageGroupBoxOpen")}>
              <Badge className={styles.dropdownBadge}>{props.selectedAgeGroup}</Badge>
            </div>
            {boxStates.ageGroupBoxOpen && (
              <div className={styles.ageGroupRadioBtn}> 
                {ageGroup.map((item, index) => (
                  <Radio
                    key={index}
                    value={item.ageGroup}
                    className={styles.ageGroupRadio}>
                      {item.ageGroup}
                  </Radio>
                ))}
              </div>
            )}
            <p className={styles.dropdownP}> 입니다 ☺️</p>
          </div>
        </Radio.Group>
        <Radio.Group onChange={(e) => {
          props.setSelectedActivityTime(e.target.value);
          handleToggleBox("activityTimeBoxOpen")
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}>저는 대부분</p>
            <div onClick={() => handleToggleBox("activityTimeBoxOpen")}>
              <Badge className={styles.dropdownBadge}>{props.selectedActivityTime}</Badge>
            </div>
            {boxStates.activityTimeBoxOpen && (
              <div className={styles.activityRadioBtn}> 
                {activityTime.map((item, index) => (
                  <Radio
                    key={index}
                    value={item.activityTime}
                    className={styles.Radio}>
                      {item.activityTime}
                  </Radio>
                ))}
              </div>
            )}
            <p className={styles.dropdownP}> 에 활동합니다 ☺️</p>
          </div>
        </Radio.Group>
      </div>
      <div className={styles.tagContainer}>
        <div>
          <div className={styles.tendencyDesc}>
            <span>이런 룸메이트가 좋아요 🥰</span>
            <Modal
              title="이런 룸메이트가 좋아요 🥰 (1개 ~ 최대 5개 선택)"
              centered
              open={tendencyModal}
              onOk={() => {
                setTendencyModal(false);
                props.setFavoriteTag(props.favoriteTag);
              }}
              onCancel={() => setTendencyModal(false)}>
              <div className={styles.tendencyModalBox}>
                <Checkbox.Group options={tendencyChoice} onChange={handleTendencyChange}/>
              </div>
            </Modal>
          </div>
          <div className={`${styles.tendencyBox} ${props.favoriteTag === undefined ? styles.tendencyNot : ''}`}>
            {props.favoriteTag === undefined ? (
              <span className={styles.tendencyNotChoice}>성향을 선택해주세요 ⬇️</span>
            ) : (
              props.favoriteTag.map((item, index) => (
                <span key={index}>#{item}</span>
              ))
            )}
          </div>
        </div>
        <div>
          <div className={styles.tendencyDesc}>
            <span>성향을 선택해주세요 ☺️</span>
          </div>
          <div className={styles.tendencyBox}>
            {/* {tendencyChoice
            .filter((option) => !props.favoriteTag.includes(option.value))
            .map((item, index) => (
              <span key={index}>#{item.value}</span>
            ))} */}
          </div>
        </div>
        <Button 
          className={styles.tendencyBtn} 
          type="primary" 
          onClick={() => setTendencyModal(true)} 
          style={{ width: 70, height: 30, fontSize: 10, borderRadius: 20 }}>
          선택
        </Button>
      </div>
      <div className={styles.IntroducContainer}>
        <p>본인 소개</p>
        <div>
          <TextArea
            showCount
            maxLength={200}
            style={{ width:330, height: 110, resize: 'none', background:'#E5E5E5' }}
            onChange={(e) => props.setMytext(e.target.value)}
            value={props.mytext}
            placeholder={`  추가로 하고 싶은 말을 자세히 적어주세요!
  예를들면 먼지 알러지가 있는지, 집에서 밥을 먹지 않는다던지
  자유롭게 얘기해보세요 :)`}
          />
          <Button 
            className={styles.textareaBtn} 
            type="primary" 
            style={{ width: 100, height: 35, fontSize: 10, borderRadius: 20 }}
            onClick={handleUpdateProfile}>
            내 프로필 수정
          </Button>
        </div>
      </div>
      {choiceModal && (
        <Modal
          title="알림"
          open={choiceModal}
          onOk={() => setChoiceModal(false)}
          onCancel={() => setChoiceModal(false)}
        >
          <p>모든 항목을 선택해주세요.</p>
        </Modal>
      )}
    </div>
  )
}

export default ProfileTendency