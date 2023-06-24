import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { googleloginUser } from "../../Redux/user"
import { AppDispatch } from "../../Redux/store"
import { PayloadAction } from "@reduxjs/toolkit"
import { Token } from "../../interface/interface"

const Google = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const parsedHash = new URLSearchParams(window.location.hash.substring(1))
    const accessToken = parsedHash.get("access_token")

    if (accessToken) {
      dispatch(googleloginUser({ accessToken }))
        .then((action: PayloadAction<{ token: Token } | unknown>) => {
          if (googleloginUser.fulfilled.match(action)) {
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

export default Google
