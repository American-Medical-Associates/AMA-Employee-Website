import React, { useState } from 'react'
import Header from '../components/Header'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'
import TextInput from '../components/TextInput'
import MainButton from '../components/MainButton'
import router from 'next/router'

// CURRENTLY A WORK IN PROGRESS

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {/* TODO: Add prop to header component */}
      <Header selectCompany={'AMA'} />

      <div className="w-[50%] rounded-[30px] p-5 text-center shadow-2xl">
        <h1 className="text-3xl font-bold text-[#377adf]">Reset Password</h1>
        <TextInput
          placeHolder="Email"
          type="email"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
        />
        <div className="flex flex-col items-center justify-center">
          <MainButton
            buttonWidth="w-[40%]"
            buttonText="Reset Password"
            onClick={() => {
              if (
                email === '' ||
                !email.includes('@') ||
                !email.includes('.')
              ) {
                setErrorMessage(true)
              } else {
                sendPasswordResetEmail(auth, email).then(() => {
                  alert('Password reset email sent!')
                  router.push('/PatientLogin')
                })
              }
            }}
          />
          {errorMessage && (
            <p className="mt-5">Please enter a valid email address</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
