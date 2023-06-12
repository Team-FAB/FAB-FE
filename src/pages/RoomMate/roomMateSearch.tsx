import { SearchOutlined, CaretDownOutlined } from "@ant-design/icons"
import { Badge, Button } from "antd"
import styles from "./roomMateSearch.module.css"
import { Radio, RadioChangeEvent } from "antd"
import { useState } from "react"
import { region, gender, period, price } from "../../object/profileDropdown"
import { userArticle } from "../../api"

const RoomMateSearch = () => {
  const [searchBoxOpen, setSearchBoxOpen] = useState(false)
  const [selectedArea, setSelectedArea] = useState("지역")
  const [selectedPeriod, setSelectedPeriod] = useState("기간")
  const [selectedPrice, setSelectedPrice] = useState("보증금")
  const [selectedGender, setSelectedGender] = useState("성별")
  const [selectedDeposit, setSelectedDeposit] = useState<string | undefined>(
    undefined,
  )

  const handleToggleSearchBox = () => {
    if (!searchBoxOpen) {
      setSelectedArea(region[0].region)
      setSelectedPeriod(period[0].quarter)
      setSelectedPrice(price[0].display)
      setSelectedGender(gender[0].name)
    }

    setSearchBoxOpen(!searchBoxOpen)
  }

  const handlePriceChange = (e: RadioChangeEvent) => {
    const deposit = e.target.value
    setSelectedDeposit(deposit)

    const selectedPriceDisplay = price.find(
      (item) => item.deposit === deposit,
    )?.display

    setSelectedPrice(selectedPriceDisplay || "Deposit")
  }

  const handleSearch = async (page = 1, size = 5) => {
    const searchParams = {
      region: selectedArea,
      period: selectedPeriod,
      price: selectedDeposit?.toString() ?? "",
      gender: selectedGender,
      page: page.toString(),
      size: size.toString(),
    }

    const queryString = new URLSearchParams(searchParams).toString()

    try {
      const response = await fetch(`${userArticle}/filter?${queryString}`, {
        method: "GET",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })

      if (!response.ok) {
        throw new Error("서버 연결 실패")
      }

      const data = await response.json()

      setSearchBoxOpen(!searchBoxOpen)
      console.log(data)
    } catch (error) {
      setSearchBoxOpen(!searchBoxOpen)
      console.error("에러", error)
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
              onClick={() => handleSearch()}
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
                    value={selectedDeposit}
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
                onClick={() => handleSearch()}
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
