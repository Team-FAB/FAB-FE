import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { kakaologinUser } from "../../Redux/user"
import { AppDispatch } from "../../Redux/store"
import { PayloadAction } from "@reduxjs/toolkit"
import { Token } from "../../interface/interface"

const Kakao = () => {
  const [code, setCode] = useState("")
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const urlCode = new URL(window.location.href).searchParams.get("code")

    if (urlCode) {
      setCode(urlCode)

      dispatch(kakaologinUser(urlCode))
        .then((action: PayloadAction<{ token: Token } | unknown>) => {
          if (kakaologinUser.fulfilled.match(action)) {
            const fulfilledAction = action as PayloadAction<{ token: Token }>
            console.log("로그인 성공 token: ", fulfilledAction.payload.token)
            navigate("/MainPage")
          } else {
            console.error("로그인 실패")
          }
        })
        .catch((error: unknown) => {
          console.error("Login error: ", error)
          alert("Login failed.")
        })
    }
  }, [dispatch, navigate])

  return <div>{`Code: ${code}`}</div>
}

export default Kakao
