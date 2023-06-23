import React, { useState, useEffect, useRef } from "react"
import styles from "./chat.module.css"

const participants = [
  { id: 1, name: "조유진" },
  { id: 2, name: "황지민" },
  { id: 3, name: "윤장원" },
  { id: 4, name: "고지민" },
  { id: 5, name: "서원호" },
]

const Chat: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [input, setInput] = useState<string>("")
  const [messages, setMessages] = useState<{ user: number; text: string }[]>([])
  const messageEndRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (input) {
      setMessages([...messages, { user: selectedUser!, text: input }])
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const selectedUserName =
    participants.find((p) => p.id === selectedUser)?.name || ""

  const userInforClass = 
    selectedUser ? `${styles.userInfor} ${styles.selectedUserInfor}` : `${styles.userInfor}`

  return (
    <div className={styles.userDiv}>
      <div className={userInforClass}>
        <h2>방갑고 채팅방</h2>
        {participants.map((user) => (
          <div
            key={user.id}
            className={styles.userName}
            onClick={() => setSelectedUser(user.id)}
          >
            {user.name}
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className={styles.chatDiv}>
          <h2>'{selectedUserName}' 님과 원활한 대화를 나눠보세요 ☺️</h2>
          <div className={styles.chat}>
            <div className={styles.chatMessageDiv}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={styles.messageDiv}
                  style={{
                    textAlign: message.user === selectedUser ? "right" : "left",
                  }}
                >
                  {message.text}
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
            <div className={styles.messageInput}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="채팅글 작성"
              />
              <button onClick={handleSend}>전송</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chat
