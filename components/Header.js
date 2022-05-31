import React, { useState, useEffect } from 'react'
// import { Menu } from '@headlessui/react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MenuItem } from './MenuItem'
import DropDownMenu from './DropDownMenu'
import {
  MenuIcon,
  LogoutIcon,
  LoginIcon,
  HomeIcon,
} from '@heroicons/react/outline'
// import Box from './box'
import { getAuth, signOut } from 'firebase/auth'
import MainButton from './MainButton'
import { auth, isAdmin } from '../firebase'

const Header = () => {
  const [isUserAdmin, setIsUserAdmin] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  useEffect(() => {
    if (auth.currentUser) {
      isAdmin({ adminState: setIsUserAdmin })
    }
  }, [])
  const Logout = () => {
    const auth = getAuth()
    signOut(auth).then(() => {
      router.push('/')
    })
  }
  const router = useRouter()
  // const { data: session } = useSession()
  // console.log(session)
  return (
    <div className="sticky top-0 z-50  grid w-full grid-cols-3 flex-row bg-white p-5 shadow-md  md:px-10">
      <div
        className=" flex items-start justify-start text-center"
        onClick={() => {
          router.push('/')
        }}
      >
        <Image
          src="/American Medical Associates.png"
          alt="Logo.png"
          height={50}
          width={50}
          className=" cursor-pointer"
        />
        <h1 className=" ml-7 text-center text-4xl text-[#377adf]">AMA</h1>
      </div>
      <div></div>
      {isUserAdmin && (
        <div>
          <div className=" flex items-start justify-end ">
            <MainButton
              buttonText="Application"
              onClick={() => {
                router.push('/JobApplicationPage')
              }}
            />

            {/* <button
          onClick={() => {
            router.push('/SignUp')
          }}
          className="  mx-4 rounded-full bg-gray-50 px-9 py-4 font-bold text-[#7B3AF5]  shadow-md transition duration-150 hover:shadow-lg active:scale-90 "
        >
          Create account
        </button> */}
            {/* <h1>{session?.user?.name}</h1> */}

            <MenuIcon
              // onClick={() => menuDropdown}
              className=" h-10  w-7 cursor-pointer text-black"
            />
          </div>
        </div>
      )}
      <div className=" flex justify-end ">
        <MenuIcon
          onClick={() => {
            setOpenMenu(!openMenu)
          }}
          className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in"
        />
        {openMenu && (
          <div className=" absolute flex justify-start duration-[500s] ease-in">
            <DropDownMenu
              // open={openMenu}
              // setOpen={setOpenMenu}
              item={[
                <MenuItem
                  icon={
                    <HomeIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text={'Home'}
                  onClick={() => {
                    router.push('/')
                  }}
                />,
                <MenuItem
                  icon={
                    <LoginIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text={'Login'}
                  onClick={() => {
                    router.push('/Login')
                  }}
                />,
                <MenuItem
                  icon={
                    <LogoutIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text={'Logout'}
                  onClick={() => {
                    Logout
                  }}
                />,
              ]}
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default Header
