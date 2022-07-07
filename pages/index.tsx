import { FirebaseError } from 'firebase/app'
import React, { useEffect } from 'react'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import MainButton from '../components/MainButton'
import TensorFlowBert from '../components/TensorFlowBert'
import { auth, functions } from '../firebase'
import { httpsCallable, getFunctions } from 'firebase/functions'
// import { sendMessage } from '../components/TwilloMessage'
import { db } from '../firebase'
import { useRouter } from 'next/router'
const Home: NextPage = () => {
  // const functions = getFunctions()
  const sendMessage = httpsCallable(functions, 'sendMessage')
  const helloWorld = httpsCallable(functions, 'helloWorld')
  const router = useRouter()
  useEffect(() => {
    if (auth.currentUser?.email == null) {
      router.push('/Login')
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>AMA</title>
        <link rel="icon" href="/American Medical Associates.png" />
      </Head>
      <Header />

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1>{auth.currentUser?.email}</h1>
        <TensorFlowBert />
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default Home
