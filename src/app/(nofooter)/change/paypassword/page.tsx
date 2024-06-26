'use client'

import PayPasswordCheck from "@/components/pages/password/PayPasswordCheck";
import { useEffect, useState } from "react";
import PayPasswordChange from "@/components/pages/password/PayPasswordChange";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { patchPaypasswordChange } from "@/actions/change";
import Headers from "@/components/ui/Headers";
import { useToast } from "@/components/ui/use-toast";

export default function paypassword (){
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [step, setStep] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);

  const router = useRouter();
  const { toast } = useToast();
  
  function handleStep(){
    if(password.length === 4){
      setStep(!step);
    }else{
      toast({
        title: '비밀번호를 4자리 입력해주세요.',
        variant : "destructive",
      })
    }
  }
    
  async function handleSetPayPassword(){
    if(password === checkPassword && password.length === 4 && checkPassword.length === 4){
      const response = await patchPaypasswordChange(checkPassword)
      if(response.code == 200){
        toast({
          title: '비밀번호가 변경되었습니다.',
          variant : "default",
        })
        router.push("/change/paypassword/complete");
      }
    }else if (checkPassword.length !== 4){
      toast({
        title: '비밀번호를 4자리 입력해주세요.',
        variant : "destructive",
      })
    }
  }

  return(
    <>
      { step ?
        <PayPasswordChange setPassword={setPassword}/> :
        <PayPasswordCheck setCheckPassword={setCheckPassword} />
      }
      { step ?
        (<div className="w-fit mx-auto absolute bottom-6 left-0 right-0">
          <input type="button" className="rounded-lg w-80 h-14 font-bold text-center mx-2 text-white bg-[#7d12ff]" value={"다음으로"} onClick={() => handleStep()}/>
        </div>) :
        (<div className="w-fit mx-auto absolute bottom-6 left-0 right-0">
          <input type="button" className="rounded-lg w-40 h-14 font-bold text-center mx-2 text-white bg-black" value={"이전으로"} onClick={() => router.back()}/>
          <input type="button" className="rounded-lg w-40 h-14 font-bold text-center mx-2 text-white bg-[#7d12ff]" value={"완료"} onClick={() => {handleSetPayPassword() }}/>
        </div>)
      }
    </>
  )
}