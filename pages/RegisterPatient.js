import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import MainButton from '../components/MainButton'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'

const RegisterPatient = () => {
  const [registerEmail, setRegisterEmail] = useState('')
  const [requiredRegisterEmail, setRequiredRegisterEmail] = useState(false)
  const [registerPassword, setRegisterPassword] = useState('')
  const [requiredRegisterPassword, setRequiredRegisterPassword] =
    useState(false)
  const [password, setPassword] = useState('')
  const router = useRouter()

  const register = () => {
    createUserWithEmailAndPassword(
      auth,
      registerEmail.toLowerCase().trim(),
      registerPassword.toLowerCase().trim()
    )
      .then(async (userCredential) => {
        const user = userCredential.user.uid
        try {
          await setDoc(
            doc(db, 'companys', 'AMA', 'patients', auth.currentUser.email),
            {
              email: registerEmail.toLowerCase().trim(),
              uid: user,
              isAuthUser: false,
              isPatient: true,
              timestamp: serverTimestamp(),
            },
            { merge: true }
          )
        } catch (error) {
          alert(error)
        }
      })
      .then(() => {
        setRegisterEmail('')
        setRegisterPassword('')
        setPassword('')
        router.push('/PatientPage')
      })
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Header selectCompany={'AMA'} routePatientsHome={false} />
      <div className="m-10 w-[85%] rounded-[30px] shadow-2xl md:w-[50%]">
        <h1 className="m-2 text-center text-4xl font-bold text-[#377adf] opacity-100">
          Register Patient
        </h1>
        <TextInput
          id="email"
          placeHolder="Email"
          widthPercentage="w-3/4"
          onChange={(text) => {
            setRegisterEmail(text.target.value)
          }}
          required
        />

        <TextInput
          id="password"
          placeHolder="Password"
          widthPercentage="w-3/4"
          onChange={(text) => {
            setPassword(text.target.value)
          }}
          required
        />

        <TextInput
          id="password"
          placeHolder="Confirm Password"
          widthPercentage="w-3/4"
          onChange={(text) => {
            setRegisterPassword(text.target.value)
          }}
          required
        />

        <p
          onClick={() => {
            router.push('/PatientLogin')
          }}
          className="cursor-pointer text-center text-[#377adf]"
        >
          Already Have an Account? Click Here
        </p>

        <div className="flex items-center justify-center">
          <MainButton
            buttonText="Register"
            onClick={() => {
              if (registerEmail === '') {
                alert('Please enter your email.')
                setRequiredRegisterEmail(true)
              } else if (password === '') {
                alert('Please enter your password.')
              } else if (registerPassword === '') {
                alert('Please confirm your password.')
                setRequiredRegisterPassword(true)
              } else if (registerPassword !== password) {
                alert(
                  'Passwords do not match. make sure there is no space before or after the password.'
                )
              } else {
                register()
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default RegisterPatient
