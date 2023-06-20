import { useState, useEffect } from "react"

const useFetch = <T = unknown>(
  initialUrl: string,
  initialMethod: string,
  initialHeaders: HeadersInit,
  initialBody: BodyInit | null,
): {
  datas: T | null
  isLoading: boolean
  isSuccess: boolean
  error: unknown
  setUrl: Function
  setHeaders: Function
  setMethod: Function
  setBody: Function
} => {
  const [datas, setDatas] = useState<T | null>(null)
  const [url, setUrl] = useState(initialUrl)
  const [headers, setHeaders] = useState<HeadersInit>(initialHeaders)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const [method, setMethod] = useState(initialMethod)
  const [body, setBody] = useState(initialBody)

  useEffect(() => {
    const fetchData = async () => {
      if (!method || !url) {
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(url, {
          method: method,
          headers: headers,
          body: JSON.stringify(body),
        })
        if (!response.ok) {
          throw new Error(`서버 상태 응답 ${response.status}`)
        }
        const result = await response.json()
        setDatas(result.data)
        setIsSuccess(true)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [url, method, headers, body])

  return {
    datas,
    isLoading,
    error,
    isSuccess,
    setUrl,
    setHeaders,
    setMethod,
    setBody,
  }
}

export default useFetch
