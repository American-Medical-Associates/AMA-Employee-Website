import { FirebaseError } from 'firebase/app'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import MainButton from '../components/MainButton'
import TensorFlowBert from '../components/TensorFlowBert'
// import { functions } from '../firebase'
import { httpsCallable, getFunctions } from 'firebase/functions'
// import { sendMessage } from '../components/TwilloMessage'
import { db } from '../firebase'
const Home: NextPage = () => {
  const functions = getFunctions()
  const sendText = httpsCallable(functions, 'sendText')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>AMA</title>
        <link rel="icon" href="/American Medical Associates.png" />
      </Head>
      <Header />

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <TensorFlowBert />
        <MainButton
          buttonText="send text"
          onClick={async () => {
            // await addDoc(collection(db, 'test'), {
            //   text: true,
            //   phone1: '16233133383',
            //   number2: '15204294899',
            // })
            sendText({ message: 'hello', phoneNumber: '+16233133383' }).then(
              (result) => {
                console.log(result)
              }
            )
          }}
        />
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
