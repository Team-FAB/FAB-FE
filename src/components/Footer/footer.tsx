import styles from "../Footer/footer.module.css"
import { SiNotion } from "react-icons/si"
import { BsYoutube } from "react-icons/bs"
import { ImGithub } from "react-icons/im"

const Footer: React.FC = () => {
  const owner = [
    { name: "BE_윤장원", gitAddress: "https://github.com/yjjjwww" },
    { name: "BE_서원호", gitAddress: "https://github.com/YouJin-Cho" },
    { name: "BE_고지민", gitAddress: "https://github.com/FeelingXD" },
    { name: "FE_조유진", gitAddress: "https://github.com/YouJin-Cho" },
    { name: "FE_황지민", gitAddress: "https://github.com/HwangJiMinn" },
    { name: "FE_권선아", gitAddress: "https://github.com/kwonseona" },
  ]

  const backOwners = owner.filter((item) => item.name.includes("BE"))
  const frontOwners = owner.filter((item) => item.name.includes("FE"))

  return (
    <>
      <div className={styles.footerContainer}>
        <div className={styles.footerBox}>
          <div className={styles.footerDesc}>
            <img src="src/assets/logo(w).svg" />
            <p>COMPANY NAME: 방갑고</p>
            <p>OWNER: First And Best</p>
            <p>Copyright © 2023 - All right reserved</p>
          </div>
          <div className={styles.footerOwner}>
            <p>방갑고 Owner</p>
            <div className={styles.footerGit}>
              <p>Back-End</p>
              {backOwners.map((item) => (
                <div>
                  <p key={item.name}>{item.name}</p>
                  <a
                    href={item.gitAddress}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ImGithub className={styles.bs} />
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.footerOwner}>
            <p>방갑고 Owner</p>
            <div className={styles.footerGit}>
              <p>Front-End</p>
              {frontOwners.map((item, index) => (
                <div>
                  <p key={index}>{item.name}</p>
                  <a
                    href={item.gitAddress}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ImGithub className={styles.bs} />
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.footerSns}>
            <p>방갑고 SNS</p>
            <div className={styles.snsBox}>
              <div>
                <p>History</p>
                <SiNotion className={styles.snsIcon} />
              </div>
              <div>
                <p>Youtube</p>
                <BsYoutube className={styles.snsIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
