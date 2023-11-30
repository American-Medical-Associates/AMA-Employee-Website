import React, { useState, useEffect, useRef } from 'react'
// import { Menu } from '@headlessui/react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MenuItem } from './MenuItem'
import DropDownMenu from './DropDownMenu'
import {
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  UsersIcon,
  InboxArrowDownIcon,
  ArrowRightOnRectangleIcon,
  EnvelopeIcon,
  BookOpenIcon,
  ClipboardIcon,
  ComputerDesktopIcon,
  BeakerIcon,
  CloudIcon,
  InboxStackIcon,
} from '@heroicons/react/24/outline'
// import Box from './box'
import { getAuth, signOut, sendEmailVerification } from 'firebase/auth'
import MainButton from '../Buttons/MainButton'
import { auth, isAdmin, GetAllPatientInfo } from '../../firebase/firebase'
import PatientResourcesModal from './PatientResourcesModal'
import ScrollLock, { TouchScrollable } from 'react-scrolllock'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/companySlice'

const Header = ({ selectCompany, routePatientsHome }) => {
  const dispatch = useDispatch()
  const [isUserAdmin, setIsUserAdmin] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [showPatientLookup, setShowPatientLookup] = useState(false)
  // TODO Check if user is patient or employee
  // useEffect(() => {
  //   if (auth.currentUser) {
  //     if (auth.currentUser.emailVerified === false) {
  //       sendEmailVerification(auth.currentUser).then(() => {
  //         alert('Email Verification Sent, Please Check Your Email.')
  //         console.log('Email Verification Sent, Please Check Your Email.')
  //       })
  //     }
  //   }
  // }, [auth.currentUser])

  const [patientInfo, setPatientInfo] = useState([])
  const [isPatient, setIsPatient] = useState(false)
  useEffect(() => {
    if (auth.currentUser) {
      isAdmin({ adminState: setIsUserAdmin })
    }
  }, [])

  const Logout = () => {
    const auth = getAuth()
    signOut(auth).then(() => {
      dispatch(logout())
      router.push('/PatientLogin')
    })
  }
  const ref = useRef(true)
  // const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenMenu(openMenu)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (auth.currentUser) {
      GetAllPatientInfo({
        setPatientInfo: setPatientInfo,
      })
    }
  }, [])

  useEffect(() => {
    if (auth.currentUser) {
      if (patientInfo) {
        setIsPatient(patientInfo.isPatient)
      }
    }
  }, [patientInfo])

  useEffect(() => {
    if (isPatient && routePatientsHome) {
      setIsUserAdmin(false)
      router.push('/PatientPage')
    }
  }, [isPatient])

  const router = useRouter()

  const showMenu = () => {
    if (openMenu) {
      let menuItems = []

      if (auth.currentUser && !isPatient) {
        menuItems = [
          {
            icon: HomeIcon,
            text: "Home",
            onClick: () => router.push('/Login')
          },
          {
            icon: UsersIcon,
            text: "Patients",
            onClick: () => {
              setShowPatientLookup(!showPatientLookup)
              setOpenMenu(false)
            }
          },
          {
            icon: InboxArrowDownIcon,
            text: "Resumes",
            onClick: () => router.push('/SubmitedResumes')
          },
          {
            icon: EnvelopeIcon,
            text: "Messaging",
            onClick: () => router.push('/MassMessagePage')
          },
          {
            icon: BeakerIcon,
            text: "Spravato",
            onClick: () => router.push('/Spravato')
          },
          {
            icon: ClipboardIcon,
            text: "Resources",
            onClick: () => router.push('/Resources')
          },
          {
            icon: CloudIcon,
            text: "Vitalize",
            onClick: () => router.push('/VitalizeNation/Vitalize')
          },
          {
            icon: ComputerDesktopIcon,
            text: "Support",
            onClick: () => router.push('/techSupportPages/TechSupport')
          },
          {
            icon: InboxStackIcon,
            text: "Inventory",
            onClick: () => router.push('/Inventory/Inventory')
          },
          {
            icon: ArrowRightOnRectangleIcon,
            text: "Logout",
            onClick: () => {Logout()}
          },
        ];
      } else if (auth.currentUser && isPatient) {
          menuItems = [
            {
              icon: HomeIcon,
              text: "Home",
              onClick: () => router.push('/PatientPage')
            },
            {
              icon: ArrowRightOnRectangleIcon,
              text: "Logout",
              onClick: () => {Logout()}
            },
          ];
      } else {
        menuItems = [
          {
            icon: ArrowLeftOnRectangleIcon,
            text: "Login",
            onClick: () => router.push('/PatientLogin')
          },
        ];
    } 

    // menuItems.push({
    //   icon: ArrowRightOnRectangleIcon,
    //   text: 'Logout',
    //   onClick: Logout,
    // });

    const renderedMenuItems = menuItems.map(({ icon: Icon, text, onClick }, index) => (
      <MenuItem
        key={index}
        icon={<Icon className="h-10 w-7 cursor-pointer text-black" />}
        text={text}
        onClick={onClick}
        isDropdownItem={true}
      />
    ));
    return (
      <div ref={ref} className="absolute flex justify-start duration-500 ease-in">
        <DropDownMenu
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          item={renderedMenuItems}
        />
      </div>
    );
  } else {
    return null;
  }
};
  return (
    <header className=" w-full">
      <div className=" sticky top-0 z-50 grid  w-full grid-cols-3 flex-row bg-white p-5 shadow-md  md:px-10">
        <div
          ref={ref}
          className=" flex items-start justify-start text-center"
          // onClick={() => {
          //   router.push('/')
          // }}
        >
          {selectCompany == 'AMA' && (
            <div className="flex items-start justify-start text-center">
              <Image
                src="/American Medical Associates.png"
                alt="Logo.png"
                height={50}
                width={50}
              />
              <h1 className=" ml-7 text-center text-4xl text-[#377adf]">AMA</h1>
            </div>
          )}
          {selectCompany == 'Vitalize' && (
            <div className=" flex items-start justify-start text-center">
              <Image
                src="/VITALIZE NATION.png"
                alt="Logo.png"
                height={50}
                width={65}
              />
              <h1 className=" ml-7 text-center text-4xl text-[#377adf]">
                Vitalize Nation
              </h1>
            </div>
          )}
        </div>
        <div></div>

        <div className=" flex justify-end ">
          {/* {openMenu == false && ( */}
          <Bars3Icon
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
    </header>
  )
}
export default Header
