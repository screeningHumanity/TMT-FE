'use client'
import { useEffect, useState } from 'react'
import DetailCharts from './DetailCharts'
import SimpleCharts from './SimpleCharts'
import RealTimeChart from './RealTimeChart'
import timeCheck from '@/utils/timeCheck'

export default function DetalCheckbox({
  data,
  stockCode,
  link,
  staticStockPrice,
}: {
  data: any
  stockCode: string
  link: string
  staticStockPrice: any
}) {
  const [detail, setDetail] = useState(false)

  const handleChangeDetail = () => {
    setDetail((prev) => !prev)
  }
  const check = timeCheck()

  return (
    <>
      <label className="flex items-center my-3 mx-2 w-2/3">
        <span className="text-lg">간단히 보기</span>
        <div className="relative flex items-center ml-2">
          <input
            className="mt-0"
            type="checkbox"
            id="switch"
            onChange={handleChangeDetail}
          />
          <label htmlFor="switch" className="switch_label">
            <span className="onf_btn" />
          </label>
        </div>
      </label>

      {link === 'real-time' && check == true ? (
        <RealTimeChart data={data} />
      ) : detail ? (
        <SimpleCharts data={data} staticStockPrice={staticStockPrice} />
      ) : (
        <DetailCharts chartData={data} staticStockPrice={staticStockPrice} />
      )}
    </>
  )
}
