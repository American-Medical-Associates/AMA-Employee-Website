import React, { useState, useEffect } from 'react'
import {
  XMarkIcon,
  UserPlusIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import SearchComponent from '../userInput/searchComponent'
import DateInput from '../userInput/DateInput'
import TextInput from '../userInput/TextInput'
import PhoneNumberInput from '../userInput/PhoneNumberInput'
import MainButton from '../Buttons/MainButton'
import {
  addNewPatient,
  patientSearchListAMA,
  updateFieldsToLowerCase,
} from '../../firebase/firebase'
import {
  selectCompany,
  setPatientDetails,
} from '../../redux/slices/companySlice'
import { useDispatch, useSelector } from 'react-redux'
import CustomCheckBox from '../formComponents/CustomCheckBox'
import { useRouter } from 'next/router'
import { CircularButton } from '../Buttons/CircularButtonIcon'
import { LoadingSpinner } from '../General/LoadingSpinner'

const PatientResourcesModal: React.FC<{ setClose: any }> = ({ setClose }) => {
  const [showAddNewUser, setShowAddNewUser] = useState(false)
  const [searchName, setSearchName] = useState('')
  const [searchDob, setSearchDob] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [DOB, setDOB] = useState('')
  const [patientListArray, setPatientListArray] = useState<Array<any>>(Array)
  const [searched, setSearched] = useState<any>(null)
  const company = useSelector(selectCompany)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleSearch = async () => {
    setLoading(true)
    setPatientListArray([])
    setSearched(null)
    await patientSearchListAMA({
      patientArray: setPatientListArray,
      company: company,
      searchName: searchName.replaceAll(' ', '').toLowerCase(),
      DOB: searchDob,
    })
  }
  console.log(loading)
  useEffect(() => {
    if (
      searched.map((item: any) => {
        return item.DOB
      }) >= searchDob ||
      searched.map((item: any) => {
        return item.fullName
      }) >= searchName
    ) {
      setLoading(false)
    }
  }, [searched, patientListArray, searchDob, searchName])

  useEffect(() => {
    if (searchName == ' ' || searchDob == '') {
      setSearched(null)
    }
  }, [searchName, searchDob])

  useEffect(() => {
    var searchedPatient: Array<any> = []
    if (searchName != '' || searchDob != '') {
      patientListArray.map((item: any) => {
        const fullName: string = JSON.stringify(item.fullName) as string
        const DOB: string = JSON.stringify(item.DOB) as string
        // if (applicationSearch.length > 1) {
        if (fullName && DOB) {
          if (
            fullName.toLowerCase().includes(searchName.toLowerCase()) == true &&
            DOB.includes(searchDob)
          ) {
            searchedPatient.push(item)
          }
        }
      })
      setSearched(searchedPatient)
    } else {
      searchedPatient = []
      setSearched(null)
    }
  }, [searchName, searchDob, patientListArray])

  const patientList = () => {
    if (searched != null) {
      const list = searched.map((item: any) => {
        var month = item.DOB.slice(0, 2)
        var day = item.DOB.slice(2, 4)
        var year = item.DOB.slice(4, 8)

        var index = patientListArray.indexOf(item)

        return (
          <div
            key={index}
            onClick={() => {
              router.push(`/PatientDetailsPage`)
              dispatch(setPatientDetails(item))
              setClose(false)
            }}
            className=" m-4 flex h-[20px] cursor-pointer flex-row items-center justify-center overflow-clip overflow-x-hidden rounded-[30px] bg-[#ebebebc6]  p-8   text-center shadow-xl duration-500 hover:scale-[110%]"
          >
            <h1 className="  mx-5 my-4 text-center text-lg text-[#707070]">
              {item.fullName}
            </h1>
            <h1 className=" mx-5 my-4  text-center text-lg text-[#707070]">
              {month}/{day}/{year}
            </h1>
          </div>
        )
      })

      return list
    }
    {
      setSearched([])
    }
  }

  const showAddPatientOrSearch = () => {
    if (showAddNewUser == false) {
      return (
        <div className=" flex h-[85%] flex-col justify-center md:items-center ">
          <div className=" flex w-full flex-col justify-center px-5 md:h-[20%] md:flex-row md:items-start ">
            <div className=" mx-10">
              {searchDob.length == 0 && (
                <TextInput
                  value={searchName}
                  onChange={(text: any) => {
                    setSearchName(text.target.value)
                  }}
                  placeHolder="Last Name , First Name"
                />
              )}
            </div>

            <div className=" mx-10">
              {searchName.length == 0 && (
                <DateInput
                  placeHolder="DOB"
                  value={searchDob}
                  onChange={(text: any) => {
                    setSearchDob(text.target.value)
                  }}
                />
              )}
            </div>
            <div className=" flex h-full items-center  justify-center">
              <CircularButton
                isSelection={true}
                icon={<MagnifyingGlassIcon className="h-6 w-6 text-white" />}
                onClick={() => {
                  handleSearch()
                }}
              />
            </div>
          </div>
          <div className="  flex h-[75%] flex-col overflow-y-auto p-5 md:w-[75%] ">
            {loading && (
              <LoadingSpinner
                lineWidth="border-b-4"
                hight="h-20"
                width="w-20"
                loadingText="Loading Patients..."
              />
            )}
            {patientList()}
          </div>
        </div>
      )
    } else {
      return (
        <div className=" text-center">
          <div className=" flex-rows flex h-[85%] grid-cols-2">
            <div className=" w-full">
              <div>
                <TextInput
                  value={lastName}
                  onChange={(text: any) => {
                    setLastName(text.target.value)
                  }}
                  placeHolder="Last Name"
                />
              </div>
              <div className=" mt-10">
                <DateInput
                  value={DOB}
                  onChange={(text: any) => {
                    setDOB(text.target.value)
                  }}
                  placeHolder="DOB"
                />
              </div>
            </div>
            <div className=" w-full">
              <TextInput
                value={firstName}
                onChange={(text: any) => {
                  setFirstName(text.target.value)
                }}
                placeHolder="First Name"
              />
              <div className=" mt-10">
                <PhoneNumberInput
                  value={phoneNumber}
                  onChange={(text: any) => {
                    setPhoneNumber(text.target.value)
                  }}
                  placeHolder="Phone Number"
                />
              </div>
              {/* <div className=" mt-10">
                <TextInput
                  value={address}
                  onChange={(text: any) => {
                    setAddress(text.target.value)
                  }}
                  placeHolder="Address"
                />
              </div> */}
            </div>
          </div>
          <div className=" mt-10">
            <TextInput
              value={email}
              onChange={(text: any) => {
                setEmail(text.target.value)
              }}
              placeHolder="Email"
            />
          </div>
          <MainButton
            onClick={() => {
              if (
                firstName == '' ||
                lastName == '' ||
                DOB == '' ||
                phoneNumber == '' ||
                email == ''
              ) {
                alert('Please fill out all fields')
              } else {
                addNewPatient({
                  email: email,
                  lastName: lastName,
                  firstName: firstName,
                  DOB: DOB,
                  phoneNumber: phoneNumber,
                  address: address,
                  company: company,
                })
                setEmail('')
                setFirstName('')
                setLastName('')
                setPhoneNumber('')
                setAddress('')
                setAddress('')
                setDOB('')
              }
            }}
            buttonText="Add patient"
          />
        </div>
      )
    }
  }

  return (
    <div className="fixed flex h-[100vh] w-full translate-y-[-13%] items-center justify-center bg-[#dcdcdcac]">
      <div className=" h-[70%] w-[60%] rounded-[30px] bg-[#ffffff] shadow-2xl ">
        <div className="flex h-[15%] grid-rows-3 flex-row  rounded-tl-[30px] rounded-tr-[30px] bg-[#0b5ce9db] ">
          <div className=" mx-10 mt-5 w-full">
            <UserPlusIcon
              onClick={() => {
                setShowAddNewUser(!showAddNewUser)
              }}
              className=" h-10 w-7 cursor-pointer  text-white duration-[500s] ease-in"
            />
          </div>
          <div className=" mx-10 mt-5 w-full ">
            <h3 className="w-full text-center text-2xl text-white">Patients</h3>
          </div>
          <div className=" mx-10 mt-5 flex w-full justify-end">
            <XMarkIcon
              onClick={() => {
                setClose(false)
              }}
              className=" h-10 w-7 cursor-pointer  text-white duration-[500s] ease-in"
            />
          </div>
        </div>
        <h3 className="text-md w-full text-center text-[#4f4f4fdb]">
          {company},{patientListArray.length},{searched?.length}
        </h3>
        {showAddPatientOrSearch()}
      </div>
    </div>
  )
}
export default PatientResourcesModal
