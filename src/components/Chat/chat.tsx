import React, { useState } from "react";
import { RiMessage3Fill } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import styles from "./Chat.module.css";

const Chat: React.FC = () => {

  const [chatOpen, setChatOpen] = useState(false);

  const ButtonClick = () => {
    setChatOpen(!chatOpen);
  };
  
  const ButtonClose = () => {
    setChatOpen(false);
  };
  
  return (
    <div className={styles.chatContainer}>
      <button className={styles.iconButton} onClick={ButtonClick}>
        <RiMessage3Fill className={styles.icon} size={50} />
        <div className={styles.alarm}>1</div>
      </button>
      
      <div
        className={`${styles.chatBox} ${chatOpen ? styles.chatBoxOpen : ""}`}
      >
        <div className={styles.closeIconBox} onClick={ButtonClose}>
          <IoCloseSharp size={35} className={styles.closeIcon} />
        </div>
        <div className={styles.font}>채팅</div>
        <div className={styles.line}></div>
        <div className={styles.opponentMessage}></div>
        <div className={styles.myMessage}></div>
        <div className={styles.messageInput}>
          <input type="text" placeholder="채팅글 작성" />
          <button>전송</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
