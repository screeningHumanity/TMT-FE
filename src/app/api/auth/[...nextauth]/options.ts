import { throws } from "assert";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; 
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

export const options: NextAuthOptions = {

  providers : [
    CredentialsProvider({
      name : "Credentials",
      credentials : {
        name : { label : "name", type :"text"},
        password : { label : "password", type :"password"},
        phoneNumber : { label : "phoneNumber", type : "text"},
      },
      async authorize(credentials){
        if(!credentials?.phoneNumber || !credentials?.name || !credentials?.password){
          console.log("credentials is null")
          return null
        }

        const res = await fetch(`${process.env.API_BASE_URL}/member/signin`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name : credentials.name,
            password: credentials.password,
            phoneNumber: credentials.phoneNumber,
          })
        })
        if (res.ok) {
          const user = await res.json()
          console.log("user : ", user);
      
          return user;
        }

        throw new Error("Failed to login");
      }
    }),
    KakaoProvider(
      {
        clientId: process.env.KAKAO_CLIENT_ID || "",
        clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
      },
    ),
    NaverProvider(
      {
        clientId: process.env.NAVER_CLIENT_ID || "",
        clientSecret: process.env.NAVER_CLIENT_SECRET || "",
      },
    ),
  ],
  callbacks: {
    async signIn({ user, profile}) {
      // if(profile) {
      //   console.log(profile)
      //   // 회원인지 아닌지 확인
      //   const res = await fetch(`${process.env.API_BASE_URL}/auth/oauth2`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       oauthId: user.id,
      //     })
      //   })
      //   console.log(res)
      //   if (res.ok) {
      //     const user = await res.json()
      //     console.log('ssg user',user)
      //     // this.session.update({user})
      //     // 회원정보를 받아서 세션에 저장
      //   }

      //   console.log('not ssg user',user)
      //   // 회원이 아니면 회원가입 페이지로 이동
        
      // // 
      // }

      return true;
    },

    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },

    async redirect({url, baseUrl}) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  pages: {
    signIn: "/member/signin",
    error: "/member/signin",
  },

}