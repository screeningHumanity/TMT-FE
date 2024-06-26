'use client'
import Image from 'next/image'
import { getSocketData } from '@/actions/stock/getSocketData'
import { use, useEffect, useState } from 'react'
import { socketStockCode } from '@/utils/socketStockCode'
import formatNumberWithCommas from '@/utils/formatNumberWithCommas'
import { SocketStockDataType, staticStockType } from '@/types/Stock'
import timeCheck from '@/utils/timeCheck'
import Bookmark from '@/components/ui/Bookmark'

export default function StockNamePrice({
  stockName,
  stockCode,
  stockPrice,
}: {
  stockName: string
  stockCode: string
  stockPrice: staticStockType
}) {
  const check = timeCheck()
  let data
  if (socketStockCode.includes(stockCode) && check === true) {
    data = getSocketData(stockCode)
  }
  let color = ''

  if (stockPrice?.prdy_vrss_sign == '2' || stockPrice?.prdy_vrss_sign == '1') {
    color = '#ff0000'
  } else if (
    stockPrice?.prdy_vrss_sign == '4' ||
    stockPrice?.prdy_vrss_sign == '5'
  ) {
    color = '#0000ff'
  }

  return (
    <section className="bg-slate-100">
      <div
        className="mx-3 mt-3 rounded-lg"
        style={{ backgroundColor: '#ABABAB' }}
      >
        <div className="w-full h-24 rounded-xl flex items-center relative">
          <Bookmark stockCode={stockCode} stockName={stockName} />
          <span className="text-xl font-bold text-white  ">{stockName}</span>
          {data != undefined ? (
            <div className="flex flex-col items-end absolute mr-2 right-0">
              <span className="text-lg text-white">
                {formatNumberWithCommas(data?.now_price as any)}
              </span>
              <div className="flex">
                {data?.color === '#ff0000' ? (
                  <Image
                    src="/assets/images/upPrice.svg"
                    alt="부호"
                    width={15}
                    height={10}
                  />
                ) : (
                  <Image
                    src="/assets/images/downPrice.svg"
                    alt="부호"
                    width={15}
                    height={10}
                  />
                )}

                <span className="text-sm ml-1" style={{ color: data?.color }}>
                  {/* {String(data?.prdy_ctrt)}% */}
                  {data?.prdy_ctrt != undefined ? String(data?.prdy_ctrt) : 0}%
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-end absolute mr-2 right-0">
              <span className="text-lg text-white">
                {formatNumberWithCommas(stockPrice?.stck_prpr)}
              </span>
              <div className="flex">
                {color === '#ff0000' ? (
                  <Image
                    src="/assets/images/upPrice.svg"
                    alt="부호"
                    width={18}
                    height={10}
                  />
                ) : (
                  <Image
                    src="/assets/images/downPrice.svg"
                    alt="부호"
                    width={18}
                    height={10}
                  />
                )}

                <span className="text-lg ml-1" style={{ color: color }}>
                  {String(stockPrice?.prdy_ctrt)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
