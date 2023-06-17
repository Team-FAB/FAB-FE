import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { kakaologinUser } from "../../Redux/user"
import { AppDispatch } from "../../Redux/store"
import { PayloadAction } from "@reduxjs/toolkit"
import { Token } from "../../interface/interface"

const Kakao = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code")

    if (code) {
      dispatch(kakaologinUser({ code: code }))
        .then((action: PayloadAction<{ token: Token } | unknown>) => {
          if (kakaologinUser.fulfilled.match(action)) {
            navigate("/MainPage")
          } else {
            console.error("로그인 실패")
          }
        })
        .catch((error: unknown) => {
          console.error("로그인 실패", error)
        })
    }
  }, [dispatch, navigate])

  return null
}

export default Kakao
