import React, { useState, useEffect, useRef } from 'react'
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
  InboxInIcon,
  MailIcon,
  BookOpenIcon,
  UsersIcon,
} from '@heroicons/react/outline'
// import Box from './box'
import { getAuth, signOut } from 'firebase/auth'
import MainButton from './MainButton'
import { auth, isAdmin } from '../firebase'
import PatientResourcesModal from './PatientResourcesModal'
import ScrollLock, { TouchScrollable } from 'react-scrolllock'

const Header = () => {
  const [isUserAdmin, setIsUserAdmin] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [showPatientLookup, setShowPatientLookup] = useState(false)
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
  const ref = useRef(true)
  // const [open, setOpen] = useState(false)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenMenu(!openMenu)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [openMenu, ref])
  const router = useRouter()
  const showMenu = () => {
    if (openMenu) {
      if (auth.currentUser) {
        return (
          <div
            ref={ref}
            className=" absolute flex justify-start duration-[500s] ease-in"
          >
            <DropDownMenu
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              item={[
                <MenuItem
                  icon={
                    <HomeIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text={'Home'}
                  onClick={() => {
                    router.push('/Login')
                  }}
                />,
                <MenuItem
                  icon={
                    <UsersIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text={'Patients'}
                  onClick={() => {
                    setShowPatientLookup(!showPatientLookup)
                    setOpenMenu(false)
                  }}
                />,
                <MenuItem
                  icon={
                    <InboxInIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text={'Resumes'}
                  onClick={() => {
                    router.push('/SubmitedResumes')
                  }}
                />,
                <MenuItem
                  icon={
                    <MailIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text={'Messaging'}
                  onClick={() => {
                    router.push('/MassMessagePage')
                  }}
                />,
                <MenuItem
                  icon={
                    <BookOpenIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text={'Spravato'}
                  onClick={() => {
                    router.push('/Spravato')
                  }}
                />,
                <MenuItem
                  icon={
                    <BookOpenIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text={'PatientManagment'}
                  onClick={() => {
                    router.push('/PatientManagment')
                  }}
                />,

                <MenuItem
                  icon={
                    <LogoutIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text={'Logout'}
                  onClick={() => {
                    Logout()
                  }}
                />,
              ]}
            />
          </div>
        )
      } else {
        return (
          <div
            ref={ref}
            className=" absolute flex justify-start  duration-[500s] ease-in"
          >
            <DropDownMenu
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              item={[
                // <MenuItem
                //   icon={
                //     <HomeIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                //   }
                //   text={'Home'}
                //   onClick={() => {
                //     router.push('/')
                //   }}
                // />,
                <MenuItem
                  icon={
                    <LoginIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text={'Login'}
                  onClick={() => {
                    router.push('/Login')
                  }}
                />,
              ]}
            />
          </div>
        )
      }
    } else {
      return null
    }
  }
  // const { data: session } = useSession()
  // console.log(session)
  return (
    <div className=" w-full">
      <div className=" sticky top-0 z-50 grid  w-full grid-cols-3 flex-row bg-white p-5 shadow-md  md:px-10">
        <div
          ref={ref}
          className=" flex items-start justify-start text-center"
          // onClick={() => {
          //   router.push('/')
          // }}
        >
          <Image
            src="/American Medical Associates.png"
            alt="Logo.png"
            height={50}
            width={50}
          />
          <h1 className=" ml-7 text-center text-4xl text-[#377adf]">AMA</h1>
        </div>
        <div></div>

        <div className=" flex justify-end ">
          {/* {openMenu == false && ( */}
          <MenuIcon
            onClick={() => {
              setOpenMenu(!openMenu)
            }}
            className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in"
          />
          {/* )} */}

          {showMenu()}
        </div>
      </div>
      {showPatientLookup && (
        <div>
          <ScrollLock isActive={true} />
          <PatientResourcesModal setClose={setShowPatientLookup} />
        </div>
      )}
    </div>
  )
}
export default Header
