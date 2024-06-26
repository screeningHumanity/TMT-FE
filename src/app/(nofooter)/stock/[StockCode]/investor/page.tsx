'use server'

import formatNumberWithCommas from '@/utils/formatNumberWithCommas'

async function getInvestorsAPI(stockCode: string) {
  const response = await fetch(
    `${process.env.API_BASE_URL}/stockitem/${stockCode}/investors`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    },
  )

  return response.json()
}

export default async function Page({
  params,
}: {
  params: { StockCode: string }
}) {
  const Investor = await getInvestorsAPI(params.StockCode)
  const data = Investor.data
  const colorFormatting = (value: string) => {
    if (value.includes('-')) {
      return '#0000ff'
    } else {
      return '#ff0000'
    }
  }
  const colorDate = (prdy_vrss_sign: string) => {
    if (prdy_vrss_sign === '2') {
      return '#0000ff'
    } else {
      return '#ff0000'
    }
  }
  const parsedDate = (date: string) => {
    return date
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, '$1-$2-$3')
      .replace(/(\-{1,2})$/g, '')
  }
  return (
    <div className="mt-5">
      <table className="border-collapse w-full ">
        <thead className="h-20  border-b-2">
          <tr>
            <th scope="col" className="font-[Pretendard-Regular] text-xl">
              날짜
            </th>
            <th scope="col" className="font-[Pretendard-Regular]  text-xl">
              개인
            </th>
            <th scope="col" className=" font-[Pretendard-Regular]  text-xl ">
              외국인
            </th>
            <th scope="col" className=" font-[Pretendard-Regular]  text-xl">
              기관
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.stck_bsop_date}>
              <th
                scope="row"
                className=" h-12"
                style={{ color: colorDate(String(item.prdy_vrss_sign)) }}
              >
                {parsedDate(item.stck_bsop_date)}
              </th>
              <td
                className=" text-center"
                style={{ color: colorFormatting(String(item.prsn_ntby_qty)) }}
              >
                {formatNumberWithCommas(item.prsn_ntby_qty)}
              </td>
              <td
                className=" text-center"
                style={{ color: colorFormatting(String(item.frgn_ntby_qty)) }}
              >
                {formatNumberWithCommas(item.frgn_ntby_qty)}
              </td>
              <td
                className=" text-center"
                style={{ color: colorFormatting(String(item.orgn_ntby_qty)) }}
              >
                {formatNumberWithCommas(item.orgn_ntby_qty)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
