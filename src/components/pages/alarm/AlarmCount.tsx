'use client'
import { alarmCountAPI } from '@/actions/alarm/fcm'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function AlarmCount() {
  const [count, setCount] = useState<number>(0)
  const [accessToken, setAccessToken] = useState<string>('')

  const countAlarm = async () => {
    const res = await alarmCountAPI()

    setCount(res?.data?.notificationLogCount)
  }

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession()
      if (session?.user.data.accessToken) {
        setAccessToken(session?.user.data.accessToken)
      }
    }
    fetchSession()
  }, [])

  useEffect(() => {
    if (accessToken) {
      countAlarm()
    }
  }, [accessToken])

  return (
    <>
      {count !== 0 && (
        <span className="absolute top-4 right-6 bg-red-500 text-white rounded-full w-4  h-4  flex items-center justify-center text-xs">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </>
  )
}
