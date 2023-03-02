import React from 'react'
import TextInput from '../components/TextInput'
import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import MainButton from '../components/MainButton'
import { SignInToAccount, auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import Header from '../components/Header'
const Login: NextPage<{}> = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user != null) {
        router.push('/')
      }
    })
    return () => {
      unsubscribe
    }
  }, [])
  return (
    <div className=" flex flex-col items-center justify-center">
      {/* <Header selectCompany={'AMA'} /> */}
      <div className=" w- m-10 flex h-[200px] w-full justify-center">
        <Image
          alt="AMA"
          src={'/American Medical Associates.png'}
          height={100}
          width={200}
        />
      </div>
      <TextInput
        placeHolder="Email"
        onChange={(text: any) => {
          setEmail(text.target.value)
        }}
        widthPercentage={'w-[60%]'}
        type="email"
        value={email}
      />
      <TextInput
        placeHolder="Password"
        onChange={(text: any) => {
          setPassword(text.target.value)
        }}
        widthPercentage={'w-[60%]'}
        type="email"
        value={password}
      />

      <p
        onClick={() => {
          router.push('/ForgotPassword')
        }}
        className="cursor-pointer text-center text-[#377adf]"
      >
        Forgot Password?
      </p>

      <MainButton
        buttonText=" Sign In"
        onClick={() => {
          SignInToAccount({
            email: email,
            password: password,
          })
        }}
        buttonWidth={'w-[40%]'}
      />

      <MainButton
        buttonText="Patient Login"
        onClick={() => {
          router.push('/PatientLogin')
        }}
      />

      {auth.currentUser && <h1>Welcome {auth.currentUser?.email!}</h1>}
    </div>
  )
}
export default Login
