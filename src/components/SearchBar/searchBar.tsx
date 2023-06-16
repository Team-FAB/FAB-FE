import { SearchOutlined, CaretDownOutlined } from "@ant-design/icons"
import { Badge, Radio, Button, RadioChangeEvent } from "antd"
import { region, period, price, gender } from "../../object/profileDropdown"
import styles from "../../components/SearchBar/searchBar.module.css"
import { useState } from "react"
import { RoomMateSearchProps } from "../../interface/interface"

const SearchBar: React.FC<RoomMateSearchProps> = ({ onSearch }) => {
  const [searchBoxOpen, setSearchBoxOpen] = useState(false)
  const [selectedArea, setSelectedArea] = useState("지역")
  const [selectedPeriod, setSelectedPeriod] = useState("기간")
  const [selectedPrice, setSelectedPrice] = useState("보증금")
  const [selectedGender, setSelectedGender] = useState("성별")
  const [selectedDeposit, setSelectedDeposit] = useState<string | undefined>(
    undefined,
  )

  const handleSearch = () => {
    const query = {
      area: selectedArea,
      period: selectedPeriod,
      price: selectedDeposit,
      gender: selectedGender,
    }

    onSearch?.(query)
    setSearchBoxOpen(!searchBoxOpen)
  }

  // 검색
  const handleToggleSearchBox = () => {
    setSearchBoxOpen(!searchBoxOpen)
  }

  // 검색 모달 금액
  const handlePriceChange = (e: RadioChangeEvent) => {
    const deposit = e.target.value
    setSelectedDeposit(deposit)

    const selectedPriceDisplay = price.find(
      (item) => item.deposit === deposit,
    )?.display

    setSelectedPrice(selectedPriceDisplay || "Deposit")
  }

  return (
    <div className={styles.searchContainer}>
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
          <SearchOutlined
            className={styles.searchIcon}
            onClick={() => handleSearch()}
            style={{ fontSize: 20, color: "#b9b9b9" }}
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
  )
}

export default SearchBar
