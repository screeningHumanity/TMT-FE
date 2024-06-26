'use client'

import { deleteTokenAPI } from '@/actions/alarm/fcm'
import { signOut } from 'next-auth/react'
import { postSignOut } from "@/actions/member";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation';

export default function ButtonOfSignout() {

  const router = useRouter();

  const signOutButton = async () => {
    const fcmToken = localStorage.getItem('fcmToken')
    console.log(fcmToken)
    if (fcmToken !== null) {
      await deleteTokenAPI(fcmToken as string)
    }
    const res = await postSignOut();
    const resSignOut = await signOut({ redirect: false, callbackUrl: '/'})
    router.push('/')
  }

  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
      <button className="bg-[#7d12ff] text-white text-sm font-semibold rounded-lg w-80 h-10 mx-auto block my-6 mt-20" >로그아웃</button>
    </AlertDialogTrigger>
    <AlertDialogContent className="w-5/6">
      <AlertDialogHeader>
        <AlertDialogTitle>정말로 로그아웃하시겠습니까 ?</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter className="flex flex-row gap-4 items-center justify-center">
        <AlertDialogAction className="w-20" onClick={signOutButton}>네</AlertDialogAction>
        <AlertDialogCancel className="w-20 mt-0" >아니오</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}
