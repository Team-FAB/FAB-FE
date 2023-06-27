import React, { useState, useEffect, useRef } from "react"
import styles from "./chat.module.css"
import * as Stomp from "@stomp/stompjs"
import SockJS from 'sockjs-client'
import { ChatList, ChatMessage } from "../../../interface/interface"
import { useSelector } from "react-redux"
import { RootState } from "../../../Redux/store"
import { userChatList } from "../../../api"
import { MessageType } from "../../../interface/interface"

const Chat: React.FC = () => {
  const [chatList, setChatList] = useState<ChatList[]>([])
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [otherUserName, setOtherUserName] = useState('')
  const [selectedRoomId, setSelectedRoomId] = useState('')
  const [input, setInput] = useState<string>("")
  const [messages, setMessages] = useState<MessageType[]>([])
  const messageEndRef = useRef<HTMLDivElement>(null)
  const [stClient, setStClient] = useState<Stomp.Client | null>(null)
  const userToken = useSelector((state : RootState) => state.user.data.token)
  const userEmail = useSelector((state : RootState) => state.user.email)

  // 채팅 목록 불러오기
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await fetch(`/api/${userChatList}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: userToken.atk.toString(),
          },
        })
        if (!response.ok) {
          console.log(response)
          throw new Error(`서버 상태 응답 ${response.status}`)
        }
        const responseData = await response.json()
        setChatList(responseData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchChatList()
  }, [])

  const connectHandler = (roomId: string) => {
    // WebSocket 사용 -> STOMP 서버 연결
    const sock = new WebSocket(`${import.meta.env.VITE_STOMP_URL}`) // 백엔드 API

    const stompConfig = {
      webSocketFactory: () => sock,
      // reconnectDelay: 10000,
      debug: (msg: string) => {
        console.log("[STOMP debug]", msg)
      },
    }

    const stompClient = new Stomp.Client(stompConfig)
    setStClient(stompClient)
   
    // STOMP 서버 연결
    stompClient.onConnect = (frame) => {

      // history subscribe trigger
      const handleSendText = () => {
        stompClient.publish ({
          destination: `/pub/chat.history.${roomId}`,
          headers: { Authorization: userToken.atk.toString() },
        })
        console.log(`/pub/chat.history.${roomId}`)
      }

      handleSendText()

      // history subscribe
      const historySubscription = stompClient.subscribe(
        `/topic/chat.history.${roomId}`,
        (message) => {
          try {
            const parsedMessage = JSON.parse(message.body)
            setMessages(prevMessages => [...prevMessages, ...parsedMessage])
            historySubscription.unsubscribe()
          } catch (error) {
            console.error(error)
          }
        },
        { Authorization: userToken.atk.toString() }
      )

      // 연결 성공 -> 채팅방 ID 구현
      stompClient.subscribe(
        `/topic/chat.${roomId}`,
        (message) => {
          try{
            const parsedMessage = JSON.parse(message.body)
            console.log(parsedMessage)
            setMessages(prevMessages => [...prevMessages, parsedMessage])
          } catch (error) {
            console.error(error)
          }
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

  // 연결 해제
  const disconnectHandler = () => {
    stClient?.deactivate()
  }

  // 사용자 선택
  const handleUserSelect = (roomId: string, userEmail: string, userNickname: string) => {
    disconnectHandler()
    setMessages([])
    setSelectedUser(userEmail)
    setOtherUserName(userNickname)
    setSelectedRoomId(roomId)
    connectHandler(roomId)
  }

  // 채팅 입력
  const handleSend = (roomId: string) => {
    if (input && selectedUser) {
      const newMessage:ChatMessage = {
        msg: input,
        userEmail: selectedUser
      }

      // STOMP 서버에 메시지 전송
      stClient?.publish ({ // json 형식으로 변환 -> 서버 전송
        destination: `/pub/chat.${roomId}`,
        headers: { Authorization: userToken.atk.toString() },
        body: JSON.stringify(newMessage)
      })

      setInput("")
    }
  }

  // 채팅창 Enter 입력
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend(selectedRoomId)
    }
  }

  // 메시지 입력 -> 자동 스크롤
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const userInforClass = 
    selectedUser ? `${styles.userInfor} ${styles.selectedUserInfor}` : `${styles.userInfor}`

  return (
    <div className={styles.userDiv}>
      <div className={userInforClass}>
        <h2>방갑고 채팅방</h2>
        {chatList.map((user) => (
          <div
            key={user.roomId}
            className={styles.userName}
            onClick={() => handleUserSelect(user.roomId, userEmail, user.userNickname)}
          >
            {user.userNickname}
          </div>
        ))}
      </div>

      {selectedUser && ( // otherUserName로 변경 가능?
        <div className={styles.chatDiv}>
          <h2>'{otherUserName}' 님과 원활한 대화를 나눠보세요 ☺️</h2>
          <div className={styles.chat}>
            <div className={styles.chatMessageDiv}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={styles.messageDiv}
                  style={{
                    textAlign: message.userEmail === selectedUser ? "right" : "left"
                  }}
                >
                  {message.msg}
                  <span>{message.createDate}</span>
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
              <button onClick={()=>handleSend(selectedRoomId)}>전송</button>
            </div>
          </div>  
        </div>
      )}
    </div>
  )
}

export default Chat
