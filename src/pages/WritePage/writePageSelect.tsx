import { Badge, Input, Form, RadioChangeEvent } from "antd";
import styles from "./writePageSelect.module.css";
import { Radio } from "antd";
import { useState } from "react";
import { FormInstance } from "antd";

interface WritePageSelectProps {
  form: FormInstance;
}

const writePageSelect: React.FC<WritePageSelectProps> = ({ form }) => {
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>("지역");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("기간");
  const [selectedPrice, setSelectedPrice] = useState<String>("보증금");
  const [selectedGender, setSelectedGender] = useState<string>("성별");

  const handleRegionChange = (e: RadioChangeEvent) => {
    const region = e.target.value;
    setSelectedArea(region);
    form.setFieldsValue({ region });
  };

  const handlePeriodChange = (e: RadioChangeEvent) => {
    const period = e.target.value;
    setSelectedPeriod(period);
    form.setFieldsValue({ period });
  };

  const handlePriceChange = (e: RadioChangeEvent) => {
    const price = e.target.value
    setSelectedPrice(price);
    form.setFieldsValue({ price });
  };

  const handleGenderChange = (e: RadioChangeEvent) => {
    const gender = e.target.value;
    setSelectedGender(gender);
    form.setFieldsValue({ gender });
  };

  const handleToggleSearchBox = () => {
    setSearchBoxOpen(!searchBoxOpen);
  };

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
  ];

  const period = [
    { quarter: "1개월 ~ 3개월" },
    { quarter: "3개월 ~ 6개월" },
    { quarter: "6개월 ~ 9개월" },
    { quarter: "9개월 ~ 12개월" },
    { quarter: "1년 이상 ~" },
  ];

  const price = [
    { deposit: "~ 1,000,000원" },
    { deposit: "~ 3,000,000원" },
    { deposit: "~ 5,000,000원" },
    { deposit: "~ 8,000,000원" },
    { deposit: "~ 10,000,000원" },
  ];

  const gender = [{ name: "여성" }, { name: "남성" }];

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
                      {item.deposit}
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
    </>
  );
};

export default writePageSelect;
