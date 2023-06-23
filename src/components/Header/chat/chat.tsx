import React, { useState, useEffect, useRef } from "react"
import styles from "./chat.module.css"
import * as Stomp from "@stomp/stompjs"
import SockJS from 'sockjs-client'

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

  // stomp 사용
  const stompClient = useRef<Stomp.Client | null>(null)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  
    // SockJS를 사용 -> STOMP 서버 연결
    const sock = new SockJS("http://localhost:8080/ws") // 백엔드 API

    const stompConfig = {
      webSocketFactory: () => sock,
      reconnectDelay: 30000,
      debug: (msg: string) => {
        console.log("[STOMP Debug]", msg)
      },
    }
    const stompClient = new Stomp.Client(stompConfig)

    // STOMP 서버 연결
    stompClient.onConnect = (frame) => {
      // 연결 성공 -> 채팅방 ID 구현
      stompClient.subscribe(
        "/chat/room/" + selectedUser, // 채팅방 구독 주소
        (message) => {
          const parsedMessage = JSON.parse(message.body)
          setMessages((prevMessages) => [...prevMessages, parsedMessage])
        }
      )
    }

    stompClient.onDisconnect = () => {
      console.log("STOMP 연결이 해제되었습니다.")
    }

    stompClient.activate()

    // STOMP 서버 연결 해제
    return () => {
      stompClient.deactivate()
    }
}, [selectedUser])

// 채팅 입력
const handleSend = () => {
  if (input && selectedUser) {
    // STOMP 서버에 메시지 전송
    stompClient.current?.publish ({
      destination: "/chat/send", // 백엔드 API
      headers: {}, // 헤더
      body: JSON.stringify({ user: selectedUser!, text: input })
    })

    setInput("")
  }
}

  // 채팅 입력
  // const handleSend = () => {
  //   if (input && selectedUser) {
  //     setMessages([...messages, { user: selectedUser!, text: input }])
  //     setInput("")
  //   }
  // }

  // 채팅창 Enter 입력
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
