'use client'

import ButtonOfSignout from "@/components/ui/buttons/ButtonOfSignout";
import ButtonToMyPage from "@/components/ui/buttons/ButtonToMyPage";
import Image from "next/image";

export default function complete (){
  return(
    <section>
      <Image src={"/assets/images/logo3.svg"} alt="logo3" width={300} height={200} className="mx-auto pr-20 mt-60 mb-6"/>
      <div className="text-xl font-bold w-80 mx-auto">
        닉네임 변경완료 <br/>
        <span className="text-xs text-[#3a3f52] w-80 mx-auto">닉네임이 변경되었습니다</span>
      </div>
      <ButtonToMyPage />
    </section>
  )
}