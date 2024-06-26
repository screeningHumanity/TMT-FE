'use client'
import 'regenerator-runtime/runtime'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { searchNameAPI } from '@/actions/search'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import { SearchDataType } from '@/types/Search'
import Link from 'next/link'
import { useToast } from './use-toast'

export default function SearchBar() {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition()
  const [text, setText] = useState('')
  const [searchData, setSearchData] = useState<SearchDataType[]>([])
  const [selectValue, setSelectValue] = useState('stocks')
  const { toast } = useToast()

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening()
    } else {
      SpeechRecognition.startListening({ language: 'ko-KR' })
    }
  }

  if (!browserSupportsSpeechRecognition) {
  }

  const fetchData = async (query: string) => {
    const res = await searchNameAPI(query, selectValue)
    setSearchData(res.data)
  }

  useEffect(() => {
    if (transcript) {
      fetchData(transcript)
      setText(transcript)
    }
  }, [transcript])

  useEffect(() => {
    if (text) {
      fetchData(text)
    }
  }, [text])

  return (
    <>
      <div className="flex">
        <select
          className="border-2  w-24 h-14 my-4 ml-4 text-center font-bold text-xl"
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
        >
          <option value="stocks">주식</option>
          <option value="members">회원</option>
        </select>
        <div className="m-3 w-full h-16 rounded-2xl border-2 font-bold text-xl flex justify-between">
          <Image
            src="/assets/images/search.svg"
            alt="search--v1"
            className="m-1"
            width={30}
            height={30}
          />

          <input
            className="w-full focus:outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={toggleListening}>
            <Image
              src="/assets/images/microphone.svg"
              alt="microphone--v1"
              className="m-1"
              width={35}
              height={35}
            />
          </button>
        </div>
      </div>
      <div>
        {searchData != null &&
          searchData.map((data) => (
            <Link href={`/stock/${data.id}`}>
              <div
                className="w-full h-20 text-2xl font-bold pl-10 flex items-center border"
                key={data.id}
              >
                {data.name}
              </div>
            </Link>
          ))}
      </div>
    </>
  )
}
