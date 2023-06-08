import { SearchOutlined, CaretDownOutlined } from "@ant-design/icons"
import { Badge, Button } from "antd"
import styles from "./roomMateSearch.module.css"
import { Radio } from "antd"
import { useState } from "react"
import { region, gender, period, price } from "../../object/profileDropdown"
import { userArticleRecent } from "../../api"

const RoomMateSearch = () => {
  const [searchBoxOpen, setSearchBoxOpen] = useState(false)
  const [selectedArea, setSelectedArea] = useState("지역")
  const [selectedPeriod, setSelectedPeriod] = useState("기간")
  const [selectedPrice, setSelectedPrice] = useState("보증금")
  const [selectedGender, setSelectedGender] = useState("성별")

  const handleToggleSearchBox = () => {
    setSearchBoxOpen(!searchBoxOpen)
  }

  const handleSearch = async () => {
    // const searchParams = {
    //   region: selectedArea,
    //   period: selectedPeriod,
    //   price: selectedPrice,
    //   gender: selectedGender,
    // }

    // const queryString = new URLSearchParams(searchParams).toString()

    try {
      const response = await fetch(userArticleRecent)

      if (!response.ok) {
        throw new Error("서버 연결 안됨")
      }

      const data = await response.json()
      setSearchBoxOpen(!searchBoxOpen)
      console.log(data)
    } catch (error) {
      setSearchBoxOpen(!searchBoxOpen)
      console.error("데이터 불러오기 오류", error)
    }
  }

  return (
    <>
      <div className={styles.searchContainer}>
        <SearchOutlined
          className={styles.searchIcon}
          style={{ fontSize: 28 }}
        />
        <div className={styles.searchBox}>
          <div className={styles.searchBar} onClick={handleToggleSearchBox}>
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
              <div className={styles.searchChoiceBox}>
                <div className={styles.searchChoiceArea}>
                  <p>지역</p>
                  <div className={styles.areaRadioGroup}>
                    <Radio.Group
                      onChange={(e) => setSelectedArea(e.target.value)}
                    >
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
              <Button
                className={styles.searchChoiceBtn}
                type="primary"
                onClick={handleSearch}
              >
                검색하기
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default RoomMateSearch
