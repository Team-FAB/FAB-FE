import { Badge, Form, RadioChangeEvent } from "antd"
import styles from "./editPageSelect.module.css"
import { Radio } from "antd"
import { useState, useEffect } from "react"
import { FormInstance } from "antd"
import { region, gender, period, price } from "../../object/profileDropdown"
import { useLocation } from "react-router-dom"

interface EditPageSelectProps {
  form: FormInstance
}

const editPageSelect: React.FC<EditPageSelectProps> = ({ form }) => {
  const [searchBoxOpen, setSearchBoxOpen] = useState(false)
  const [selectedArea, setSelectedArea] = useState<string>("지역")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("기간")
  const [selectedPrice, setSelectedPrice] = useState<String>("보증금")
  const [selectedGender, setSelectedGender] = useState<string>("성별")

  const editPost = useLocation().state.post

  const handleRegionChange = (e: RadioChangeEvent) => {
    const region = e.target.value
    setSelectedArea(region)
    form.setFieldsValue({ region })
  }

  const handlePeriodChange = (e: RadioChangeEvent) => {
    const period = e.target.value
    setSelectedPeriod(period)
    form.setFieldsValue({ period })
  }

  const handlePriceChange = (e: RadioChangeEvent) => {
    const deposit = e.target.value
    const selectedPriceDisplay = price.find(
      (item) => item.deposit === deposit,
    )?.display
    setSelectedPrice(selectedPriceDisplay || "보증금")
    form.setFieldsValue({ price: deposit })
  }

  const handleGenderChange = (e: RadioChangeEvent) => {
    const gender = e.target.value
    setSelectedGender(gender)
    form.setFieldsValue({ gender })
  }

  const handleToggleSearchBox = () => {
    setSearchBoxOpen(!searchBoxOpen)
  }

  useEffect(() => {
    if (editPost) {
      setSelectedArea(editPost.region)
      setSelectedPeriod(editPost.period)
      const formattedPrice = `~${parseInt(editPost.price).toLocaleString()}원`
      setSelectedPrice(formattedPrice)
      setSelectedGender(editPost.gender)
    }
  }, [editPost])

  return (
    <>
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <div className={styles.searchBar} onClick={handleToggleSearchBox}>
            <div>
              <p>
                <span className={styles.require}>*</span>지역
              </p>
              <Badge className={styles.cardBadgeArea}>{selectedArea}</Badge>
            </div>
            <div>
              <p>
                <span className={styles.require}>*</span>기간
              </p>
              <Badge className={styles.cardBadgePeriod}>{selectedPeriod}</Badge>
            </div>
            <div>
              <p>
                <span className={styles.require}>*</span>보증금
              </p>
              <Badge className={styles.cardBadgePrice}>{selectedPrice}</Badge>
            </div>
            <div className={styles.lastDiv}>
              <p>
                <span className={styles.require}>*</span>성별
              </p>
              <Badge className={styles.cardBadgeGender}>{selectedGender}</Badge>
            </div>
          </div>
          <div
            className={
              searchBoxOpen
                ? styles.searchChoiceContainer
                : styles.searchChoiceContainerHide
            }
          >
            <div className={styles.searchChoiceBox}>
              <div className={styles.searchChoiceArea}>
                <p>지역</p>
                <div className={styles.areaRadioGroup}>
                  <Form.Item
                    name="region"
                    rules={[
                      {
                        required: true,
                        message: "지역을 선택해 주세요.",
                      },
                    ]}
                  >
                    <Radio.Group onChange={handleRegionChange}>
                      {region.map((item, index) => (
                        <Radio
                          key={index}
                          value={item.region}
                          className={styles.areaRadioBtn}
                        >
                          {item.region}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
              <div className={styles.searchChoicePeriod}>
                <p>기간</p>
                <Form.Item
                  name="period"
                  rules={[
                    {
                      required: true,
                      message: "기간을 선택해 주세요.",
                    },
                  ]}
                >
                  <Radio.Group
                    className={styles.periodRadioGroup}
                    value={selectedPeriod}
                    onChange={handlePeriodChange}
                  >
                    {period.map((item, index) => (
                      <Radio
                        key={index}
                        value={item.quarter}
                        className={styles.periodRadioBtn}
                      >
                        {item.quarter}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className={styles.searchChoicePrice}>
                <p>보증금</p>
                <Form.Item
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "소유한 보증금을 선택해 주세요.",
                    },
                  ]}
                >
                  <Radio.Group
                    className={styles.priceRadioGroup}
                    value={selectedPeriod}
                    onChange={handlePriceChange}
                  >
                    {price.map((item, index) => (
                      <Radio
                        key={index}
                        value={item.deposit}
                        className={styles.priceRadioBtn}
                      >
                        {item.display}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className={styles.searchChoiceGender}>
                <p>성별</p>
                <Form.Item
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: "성별을 선택해 주세요.",
                    },
                  ]}
                >
                  <Radio.Group
                    className={styles.genderRadioGroup}
                    value={selectedGender}
                    onChange={handleGenderChange}
                  >
                    {gender.map((item, index) => (
                      <Radio
                        key={index}
                        value={item.name}
                        className={styles.genderRadioBtn}
                      >
                        {item.name}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default editPageSelect
