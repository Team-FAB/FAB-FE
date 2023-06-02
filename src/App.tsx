import React from "react"
import "../src/App.css"
import { ConfigProvider } from "antd"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Chat from "./components/Chat/chat"
import Header from "./components/Header/header"
import MainPage from "../src/pages/MainPage/mainPage"
import Footer from "./components/Footer/footer"
import Login from "./components/Login/login"
import SignUp from "./components/SignUp/signUp"
import RoomMate from "./pages/RoomMate/roomMate"

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#6231ef",
          fontSize: 12,
        },
      }}
    >
      <BrowserRouter>
        <Chat />
        <Header />
        <Routes>
          <Route path="/RoomMate" element={<RoomMate />} />
          <Route path="/" element={<Login />} />
          <Route path="/MainPage" element={<MainPage />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
