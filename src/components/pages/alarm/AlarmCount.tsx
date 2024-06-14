'use client'
import { alarmCountAPI } from '@/actions/alarm/fcm'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function AlarmCount() {
  const [count, setCount] = useState<number>(0)
  const [accessToken, setAccessToken] = useState<string>('')

  const countAlarm = async () => {
    const res = await alarmCountAPI()
    console.log('res in countAlarm:', res.data.notificationLogCount)
    setCount(res.data.notificationLogCount)
  }

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession()
      console.log('session:', session)
      if (session?.user.data.accessToken) {
        setAccessToken(session.user.data.accessToken)
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
        <span className="absolute top-2 right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </>
  )
}
