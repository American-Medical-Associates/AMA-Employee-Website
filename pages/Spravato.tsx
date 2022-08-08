import { NextPage } from 'next'
import React from 'react'
import Header from '../components/Header'
import { MenuItem } from '../components/MenuItem'
import { useRouter } from 'next/router'

const Spravato: NextPage<{}> = () => {
  const router = useRouter()
  return (
    <div>
      <Header />
      <main className=" mt-8">
        <h1 className=" text-center text-4xl text-[#0008ff]">Spravato</h1>
        <div className=" mt-10 flex flex-row">
          <div className=" mx-10 flex w-[20%]">
            <MenuItem
              text="Spravato tracking Sheet"
              onClick={() => {
                router.push('/SpravatoTracking')
              }}
            />
          </div>

          <div>hd</div>
        </div>
      </main>
    </div>
  )
}
export default Spravato
