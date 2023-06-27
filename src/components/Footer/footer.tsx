import styles from "../Footer/footer.module.css"
import { SiNotion } from "react-icons/si"
import { BsYoutube } from "react-icons/bs"
import img from "../../assets/logo(w).svg"
import { Button, Dropdown } from "antd"
import { GithubOutlined } from "@ant-design/icons"

const Footer: React.FC = () => {
  const items = [
    {
      key: "BE_윤장원",
      label: <a href="https://github.com/yjjjwww" target="_blank" rel="noopener noreferrer">BE_윤장원</a>,
    },
    {
      key: "BE_서원호",
      label: <a href="https://github.com/wonho-seo" target="_blank" rel="noopener noreferrer">BE_서원호</a>,
    },
    {
      key: "BE_고지민",
      label: <a href="https://github.com/FeelingXD" target="_blank" rel="noopener noreferrer">BE_고지민</a>,
    },
    {
      key: "FE_조유진",
      label: <a href="https://github.com/YouJin-Cho" target="_blank" rel="noopener noreferrer">FE_조유진</a>,
    },
    {
      key: "FE_황지민",
      label: <a href="https://github.com/HwangJiMinn"target="_blank" rel="noopener noreferrer">FE_황지민</a>,
    },
    {
      key: "FE_권선아",
      label: <a href="https://github.com/kwonseona" target="_blank" rel="noopener noreferrer">FE_권선아</a>,
    },
  ]

  return (
    <>
      <div className={styles.footerContainer}>
        <div className={styles.footerBox}>
          <div className={styles.footerDesc}>
            <img src={img} />
            <div className={styles.info}>
              <p>COMPANY NAME: 방갑고</p>
              <p>Team: First And Best</p>
            </div>
            <p>
              Copyright ⓒ 2023 by First And Best All Pictures cannot be copied
              without permission
            </p>
          </div>
          <div className={styles.footerOwner}>
            <div className={styles.footerGit}>
              <Dropdown menu={{ items }} placement="top">
                <Button
                  shape="circle"
                  icon={
                    <GithubOutlined
                      style={{ fontSize: "20px", color: "#6231ef" }}
                    />
                  }
                />
              </Dropdown>
              <Button
                shape="circle"
                icon={
                  <SiNotion style={{ fontSize: "20px", color: "#6231ef" }} />
                }
              />
              <Button
                shape="circle"
                icon={
                  <BsYoutube style={{ fontSize: "20px", color: "#6231ef" }} />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
