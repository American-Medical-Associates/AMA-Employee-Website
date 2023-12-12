import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Header from '../components/navigation/Header'
import TextInput from '../components/userInput/TextInput'
import MainButton from '../components/Buttons/MainButton'
import { useRouter } from 'next/router'
import { Main } from 'next/document'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { SignInToAccount } from '../firebase/firebase'

const PatientLogin: NextPage<{}> = () => {
  const [email, setEmail] = useState('')
  const [requiredEmail, setRequiredEmail] = useState(false)
  const [password, setPassword] = useState('')
  const [requiredPassword, setRequiredPassword] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user != null) {
        router.push('/PatientPage')
      }
    })
    return () => {
      unsubscribe
    }
  }, [])

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Header selectCompany={'AMA'} routePatientsHome={false} />
      <div className="m-10 w-[85%] rounded-[30px] shadow-2xl md:w-[50%]">
        <div className="  item-center flex justify-end p-3">
          <p
            onClick={() => {
              router.push('/PatientHelpPage')
            }}
            className=" mx-10 cursor-pointer text-[#377adf] underline"
          >
            Need Help?
          </p>
        </div>
        <h1 className="m-2 text-center text-4xl font-bold text-[#377adf] opacity-100">
          Login
        </h1>
        <TextInput
          id="email"
          placeHolder="Email"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(text.target.value)
          }}
          required={requiredEmail}
        />

        <TextInput
          id="password"
          placeHolder="Password"
          widthPercentage="w-3/4"
          type='password'
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(text.target.value)
          }}
          required={requiredPassword}
        />

        <p
          onClick={() => {
            router.push('/ForgotPassword')
          }}
          className="cursor-pointer text-center text-[#377adf]"
        >
          Forgot Password?
        </p>

        <p
          onClick={() => {
            router.push('/RegisterPatient')
          }}
          className="cursor-pointer text-center text-[#377adf]"
        >
          Don't have an account? Register here.
        </p>

        <div className="flex items-center justify-center">
          <MainButton
            buttonText="Login"
            onClick={() => {
              if (email === '') {
                alert('Please enter your email.')
                setRequiredEmail(true)
              } else if (password === '') {
                alert('Please enter your password.')
                setRequiredPassword(true)
              } else {
                SignInToAccount({
                  email: email,
                  password: password,
                })
              }
            }}
          />
        </div>
        <div className="flex items-center justify-center">
          <MainButton
            buttonText="Employee Login Portal"
            onClick={() => {
              router.push('/Login')
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default PatientLogin
