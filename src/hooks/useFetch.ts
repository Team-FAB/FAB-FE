import { useState, useEffect } from "react"

const useFetch = <T = unknown>(
  initialUrl: string,
  initialMethod: string,
  initialHeaders: HeadersInit,
  initialBody: BodyInit | null,
  initialParams: RequestInit,
): {
  data: T | null
  isLoading: boolean
  error: unknown
  setUrl: Function
  setHeaders: Function
  setParams: Function
  setMethod: Function
  setBody: Function
} => {
  const [data, setData] = useState<T | null>(null)
  const [url, setUrl] = useState(initialUrl)
  const [headers, setHeaders] = useState<HeadersInit>(initialHeaders)
  const [params, setParams] = useState(initialParams)
  const [isLoading, setIsLoading] = useState(false)
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
          ...params,
        })
        if (!response.ok) {
          throw new Error(`서버 상태 응답 ${response.status}`)
        }
        const result = await response.json()
        setData(result.data)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [url, method, headers, body, params])

  return {
    data,
    isLoading,
    error,
    setUrl,
    setHeaders,
    setParams,
    setMethod,
    setBody,
  }
}

export default useFetch
