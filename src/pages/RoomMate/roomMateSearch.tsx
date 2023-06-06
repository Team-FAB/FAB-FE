import { SearchOutlined, CaretDownOutlined } from "@ant-design/icons"
import { Badge } from "antd"
import styles from "./roomMateSearch.module.css"
import { Radio } from "antd"
import { useState } from "react"

const RoomMateSearch = () => {
  const [searchBoxOpen, setSearchBoxOpen] = useState(false)
  const [selectedArea, setSelectedArea] = useState("지역")
  const [selectedPeriod, setSelectedPeriod] = useState("기간")
  const [selectedPrice, setSelectedPrice] = useState("보증금")
  const [selectedGender, setSelectedGender] = useState("성별")

  const handleToggleSearchBox = () => {
    setSearchBoxOpen(!searchBoxOpen)
  }

  const area = [
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

  const period = [
    { quarter: "1개월 ~ 3개월" },
    { quarter: "3개월 ~ 6개월" },
    { quarter: "6개월 ~ 9개월" },
    { quarter: "9개월 ~ 12개월" },
    { quarter: "1년 이상 ~" },
  ]

  const price = [
    { deposit: "~ 1,000,000원" },
    { deposit: "~ 3,000,000원" },
    { deposit: "~ 5,000,000원" },
    { deposit: "~ 8,000,000원" },
    { deposit: "~ 10,000,000원" },
  ]

  const gender = [{ name: "여성" }, { name: "남성" }]

  return (
    <>
      <div className={styles.searchContainer}>
        <SearchOutlined
          className={styles.searchIcon}
          style={{ fontSize: 28 }}
        />
        <div className={styles.searchBox}>
          <div className={styles.searchBar}>
            <div>
              <p>지역</p>
              <Badge className={styles.cardBadgeArea}>{selectedArea}</Badge>
            </div>
            <div>
              <p>기간</p>
              <Badge className={styles.cardBadgePeriod}>{selectedPeriod}</Badge>
            </div>
            <div>
              <p>보증금</p>
              <Badge className={styles.cardBadgePrice}>{selectedPrice}</Badge>
            </div>
            <div className={styles.lastDiv}>
              <p>성별</p>
              <Badge className={styles.cardBadgeGender}>{selectedGender}</Badge>
            </div>
            <CaretDownOutlined
              className={styles.lastDiv}
              onClick={handleToggleSearchBox}
              style={{ color: "#4c2ad3" }}
            />
          </div>
          {searchBoxOpen && (
            <div className={styles.searchChoiceContainer}>
              <div className={styles.searchChoiceArea}>
                <p>지역</p>
                <div className={styles.areaRadioGroup}>
                  <Radio.Group
                    onChange={(e) => setSelectedArea(e.target.value)}
                  >
                    {area.map((item, index) => (
                      <Radio
                        key={index}
                        value={item.region}
                        className={styles.areaRadioBtn}
                      >
                        {item.region}
                      </Radio>
                    ))}
                  </Radio.Group>
                </div>
              </div>
              <div className={styles.searchChoicePeriod}>
                <p>기간</p>
                <Radio.Group
                  className={styles.periodRadioGroup}
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
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
              </div>
              <div className={styles.searchChoicePrice}>
                <p>보증금</p>
                <Radio.Group
                  className={styles.priceRadioGroup}
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                >
                  {price.map((item, index) => (
                    <Radio
                      key={index}
                      value={item.deposit}
                      className={styles.priceRadioBtn}
                    >
                      {item.deposit}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
              <div className={styles.searchChoiceGender}>
                <p>성별</p>
                <Radio.Group
                  className={styles.genderRadioGroup}
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
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
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default RoomMateSearch
