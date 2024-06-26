'use client'

import { postKakaopayReady } from "@/actions/payments";
import checkMobileDevice from "@/utils/checkMobileDevice";
import { useRouter } from "next/navigation";

export default async function ButtonOfPayments({price} : {price: string}){

  const router = useRouter();

  async function handlePayment(){

    localStorage.setItem("price", price);
    const res = await postKakaopayReady(`${price}캐시`, 1, Number(price));
    localStorage.setItem("tid", res?.data?.tid);
    localStorage.setItem("partner_order_id", res?.data?.partner_order_id);
    if(checkMobileDevice()){
      window.open(res?.data?.next_redirect_mobile_url)
    }else{
      window.open(res?.data?.next_redirect_pc_url)
    }
  }

  return (
    <button className="bg-yellow-400 w-full h-14 fixed right-0 bottom-2 mt-20 flex items-center justify-center rounded-xl" 
      onClick={handlePayment}
      >결제하기
    </button>
  )
}