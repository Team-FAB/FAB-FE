import React, { useState, useEffect, useRef } from "react"
import styles from "./chat.module.css"
import * as Stomp from "@stomp/stompjs"
import SockJS from 'sockjs-client'
import { ChatMessage } from "../../../interface/interface"

const participants = [
  { id: 1, name: "조유진" },
  { id: 2, name: "황지민" },
  { id: 3, name: "윤장원" },
  { id: 4, name: "고지민" },
  { id: 5, name: "서원호" },
]

const Chat: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [input, setInput] = useState<string>("")
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([])
  const messageEndRef = useRef<HTMLDivElement>(null)

  // stomp 클라이언트 참조
  const stompClient = useRef<Stomp.CompatClient | null>(null) // <Stomp.Client | null>(null)

  const connectHandler = (selectedUser: string) => {
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
        `/chat/room/${selectedUser}`, // 채팅방 구독 주소 (이전 메시지 포함)
        (message) => {
          const parsedMessage = JSON.parse(message.body)
          setMessages((prevMessages) => [...prevMessages, parsedMessage])
        }
      )
    }
    
    stompClient.onDisconnect = () => {
      console.log("STOMP 연결이 해제되었습니다.")
    }

    // STOMP 에러 처리
    stompClient.onStompError = (frame) => {
      console.error(`STOMP 에러: ${frame.headers['message']}`)
    }

    // 웹소켓 에러 처리
    stompClient.onWebSocketError = (event) => {
      console.error(`웹소켓 에러: ${event}`)
    }

    stompClient.activate()
  }

  const disconnectHandler = () => {
    stompClient.current?.deactivate()
    stompClient.current = null
  }

  const handleUserSelect = (user: string) => {
    disconnectHandler()
    setSelectedUser(user)
    connectHandler(user)
  }

  // 채팅 입력
  const handleSend = () => {
    // console.log('room Id : ' + roomId)
    if (input && selectedUser) {
      const createdDate = new Date().toISOString()
      const newMessage:ChatMessage = {
        // roomId: roomId,
        userName: selectedUser, 
        msg: input,
        createdDate: createdDate // 서버에서?
      }

      // STOMP 서버에 메시지 전송
      stompClient.current?.publish ({ // json 형식으로 변환 -> 서버 전송
        destination: "/chat/send", // 백엔드 API
        headers: {}, // 헤더
        body: JSON.stringify(newMessage)
      })

      // UI 즉시 갱신 (메시지 전송에 대한 응답 받은 후, 메시지 표시?)
      setMessages((prevMessages) => [
        ...prevMessages, 
        { 
          user: selectedUser, 
          text: input 
        },
      ])

      setInput("")
    }
  }

  // 채팅창 Enter 입력
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  // 메시지 입력 -> 자동 스크롤
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const selectedUserName =
    participants.find((p) => p.name === selectedUser)?.name || ""

  const userInforClass = 
    selectedUser ? `${styles.userInfor} ${styles.selectedUserInfor}` : `${styles.userInfor}`

  return (
    <div className={styles.userDiv}>
      <div className={userInforClass}>
        <h2>방갑고 채팅방</h2>
        {participants.map((user) => (
          <div
            key={user.name}
            className={styles.userName}
            onClick={() => handleUserSelect(user.name)}
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
