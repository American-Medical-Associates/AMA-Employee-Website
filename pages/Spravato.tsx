import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import Header from '../components/navigation/Header'
import { MenuItem } from '../components/navigation/MenuItem'
import { useRouter } from 'next/router'
import {
  ClipboardDocumentListIcon,
  PencilIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'
import { auth, editSpravatoTracking, GetSpravatoTracking } from '../firebase/firebase'
import TextInput from '../components/userInput/TextInput'
import Datepicker from '../components/userInput/Datepicker'
import { addSpravatoTracking } from '../firebase/firebase'
import MainButton from '../components/Buttons/MainButton'

const Spravato: NextPage<{}> = () => {
  const [spravtoTrackingArray, setSpravtoTrackingArray] = useState<Array<any>>(
    [],
  )
  const [searched, setSearched] = useState('')
  const [showFullItem, setShowFullItem] = useState(false)
  const [patients, setPatients] = useState<Array<any>>([])
  const [edit, setEdit] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [DOB, setDOB] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dose, setDose] = useState('')
  const [dateOrdered, setDateOrdered] = useState(new Date())
  const [numberOfDevices, setNumberOfDevices] = useState('')
  const [dateReceived, setDateReceived] = useState(new Date())
  const [dateAdministered, setDateAdministered] = useState(new Date())
  const [Ma, setMa] = useState('')
  const [lotNumber, setLotNumber] = useState('')
  const [snNumber, setSnNumber] = useState('')
  const [sparavotoSearchedArray, setSparavotoSearchedArray] = useState<
    Array<any>
  >([])
  const router = useRouter()
  useEffect(() => {
    GetSpravatoTracking({ SpravatoTrackingArray: setSpravtoTrackingArray })
  }, [])

  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  useEffect(() => {
    var searchedSparavto: Array<any> = []
    setSparavotoSearchedArray([])
    if (searched != '') {
      spravtoTrackingArray.map((item: any) => {
        if (item.snNumber.toLowerCase().includes(searched.toLowerCase())) {
          searchedSparavto.push(item)
        }
      })
      setSparavotoSearchedArray(searchedSparavto)
      searchedSparavto = []
    } else {
      // while (searchedPatients.length > 0) {
      //   searchedPatients.pop()
      // }
      setSparavotoSearchedArray([])
      searchedSparavto = []
      setSparavotoSearchedArray(spravtoTrackingArray)
    }
  }, [searched, spravtoTrackingArray])

  // const predefinedHeaders = [
  //   'dateAdministeredString',
  //   'DOB',
  //   'MA',
  //   'email',
  //   'dateReceivedString',
  //   'dateAddedToDB',
  //   'lotNumber',
  //   'spravatoTracking',
  //   'dateEdited',
  //   'dateOrderedString',
  //   'dateOrdered',
  //   'firstName',
  //   'phoneNumber',
  //   'dateReceived',
  //   'lastName',
  //   'dose',
  //   'dateAdministered',
  //   'snNumber',
  //   'numberOfDevices',
  // ]
  // @ts-ignore
  function JSONToCSV(jsonData: Array<{[key: string]: any}>): string {
    if (!jsonData.length) return '';
  
    // Remove Timestamp fields and get headers
    jsonData = jsonData.map(item => {
        for (let key in item) {
            if (item[key] && item[key].seconds) {
                delete item[key];  // Remove the timestamp
            }
        }
        return item;
    });

    const headers: string[] = Object.keys(jsonData[0]);
    let csv: string = headers.join(',') + '\n';
  
    // Loop through each data entry
    jsonData.forEach(item => {
      let row: string = headers.map(header => {
        let value: string | number | boolean | undefined = item[header];
  
        // If value contains comma, new line or double-quote, 
        // then wrap it with double quotes
        if (typeof value === 'string' && /[",\n]/.test(value)) {
          value = `"${value.replace(/"/g, '""')}"`;
        }
  
        return value;
      }).join(',');
      csv += row + '\n';
    });
  
    return csv;
}
  
// const data = [spravtoTrackingArray];
const csvData = JSONToCSV(spravtoTrackingArray);
console.log(csvData);
  // Combine headers and rows to form CSV
  // @ts-ignore
  function downloadCSV(csvString, filename = 'output.csv') {
    const blob = new Blob([csvString], { type: 'text/csv' })
    const link = document.createElement('a')

    link.href = URL.createObjectURL(blob)
    link.download = filename

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Remove the following line, you don't need it.
  // downloadCSV(csvString);

  const sparavtoTrackingList = () => {
    const list = sparavotoSearchedArray.map((item) => {
      const indexItem = patients.indexOf(item)

      if (indexItem != -1) {
        if (edit) {
          return (
            <div
              key={item.snNumber}
              onClick={() => {
                if (!edit) {
                  patients.splice(indexItem, 1)
                }
                //router.push('/SparavtoTrackingInduvidualPage')
              }}
              className=" m-4 flex cursor-pointer    flex-col overflow-x-hidden rounded-[30px] bg-[#f9f9f9]  p-4   text-center shadow-xl duration-500 hover:scale-[110%]"
            >
              <div className=" flex flex-row justify-end">
                <PencilIcon
                  onClick={() => {
                    // const fixVoid = () => {
                    //   if (email == '') {
                    //     setEmail(item.email)
                    //   }
                    //   if (Ma == '' || Ma == null) {
                    //     setMa(item.MA)
                    //   }
                    //   if (firstName == '') {
                    //     setFirstName(item.firstName)
                    //   }
                    //   if (lastName == '') {
                    //     setLastName(item.lastName)
                    //   }
                    //   if (phoneNumber == '') {
                    //     setPhoneNumber(item.phoneNumber)
                    //   }
                    //   if (numberOfDevices == '') {
                    //     setNumberOfDevices(item.lotNumber)
                    //   }
                    //   if (lotNumber == '') {
                    //     setLotNumber(item.lotNumber)
                    //   }
                    //   if (snNumber == '') {
                    //     setSnNumber(item.snNumber)
                    //   }

                    //   return Promise.resolve(snNumber)
                    // }
                    // fixVoid()
                    //   .then(() => {
                    editSpravatoTracking({
                      email: email,
                      MA: Ma,
                      dateAdministeredString: item.dateAdministeredString,
                      dose: dose,
                      firstName: firstName,
                      lastName: lastName,

                      phoneNumber: phoneNumber,
                      numberOfDevices: numberOfDevices,
                      lotNumber: lotNumber,
                      snNumber: snNumber,
                    })
                      // })
                      .then(() => {
                        setEmail('')
                        setMa('')
                        setDose('')
                        setFirstName('')
                        setLastName('')
                        setDOB('')
                        setPhoneNumber('')
                        setNumberOfDevices('')
                        setLotNumber('')
                        setSnNumber('')
                        setEdit(!edit)
                        setShowFullItem(!showFullItem)
                        patients.splice(indexItem, 1)
                      })
                  }}
                  className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in"
                />
              </div>
              <div className=" flex grid-cols-2 flex-row justify-center ">
                <div className=" w-[50%]">
                  <h3>First Name</h3>
                </div>
                <div className=" w-[50%]">
                  <h3>Last Name</h3>
                </div>
              </div>
              <div className=" flex flex-row ">
                <TextInput
                  widthPercentage="w-[80%]"
                  placeHolder={item.firstName}
                  onChange={(text: any) => {
                    setFirstName(text.target.value)
                  }}
                  value={firstName}
                  type={'text'}
                />
                <TextInput
                  widthPercentage="w-[80%]"
                  placeHolder={item.lastName}
                  onChange={(text: any) => {
                    setLastName(text.target.value)
                  }}
                  value={lastName}
                  type={'text'}
                />
              </div>

              <div className=" flex flex-col items-center justify-center">
                <h3>Email</h3>
                <h1 className="mx-5 mb-5 text-center text-lg text-[#707070]">
                  {item.email}
                </h1>
                <h3>Phone Number</h3>
                <TextInput
                  widthPercentage="w-[60%]"
                  placeHolder={item.phoneNumber}
                  onChange={(text: any) => {
                    setPhoneNumber(text.target.value)
                  }}
                  value={phoneNumber}
                  type={'text'}
                />
                {/* <h3>SN Number</h3>
                <TextInput
                  widthPercentage="w-[60%]"
                  placeHolder={item.snNumber}
                  onChange={(text: any) => {
                    setSnNumber(text.target.value)
                  }}
                  value={snNumber}
                  type={'text'}
                /> */}
                <h3>Dose</h3>
                <TextInput
                  widthPercentage="w-[60%]"
                  placeHolder={item.dose}
                  onChange={(text: any) => {
                    setDose(text.target.value)
                  }}
                  value={dose}
                  type={'text'}
                />
                <h3>Number of Devices</h3>
                <TextInput
                  widthPercentage="w-[60%]"
                  placeHolder={item.numberOfDevices}
                  onChange={(text: any) => {
                    setNumberOfDevices(text.target.value)
                  }}
                  value={numberOfDevices}
                  type={'text'}
                />
                <h3>Lot Number</h3>
                <TextInput
                  widthPercentage="w-[60%]"
                  placeHolder={item.lotNumber}
                  onChange={(text: any) => {
                    setLotNumber(text.target.value)
                  }}
                  value={lotNumber}
                  type={'text'}
                />
                <h3>MA</h3>
                <TextInput
                  widthPercentage="w-[60%]"
                  placeHolder={item.MA}
                  onChange={(text: any) => {
                    setMa(text.target.value)
                  }}
                  value={Ma}
                  type={'text'}
                />
                <h3>Date Administered</h3>
                <h1 className=" mx-5 text-center text-lg text-[#707070]">
                  {item.dateAdministeredString}
                </h1>
                <h3>Date ordered</h3>
                <h1 className="mx-5 mb-5 text-center text-lg text-[#707070]">
                  {item.dateOrderedString}
                </h1>
                <h3>Date Received</h3>
                <h1 className="mx-5 mb-5 text-center text-lg text-[#707070]">
                  {item.dateReceivedString}
                </h1>
              </div>
            </div>
          )
        } else {
          return (
            <div className=" m-4 flex cursor-pointer    flex-col overflow-x-hidden rounded-[30px] bg-[#f9f9f9]  p-4   text-center shadow-xl duration-500 hover:scale-[110%]">
              <div className=" flex flex-row justify-end">
                <PencilIcon
                  onClick={() => {
                    setEdit(!edit)
                  }}
                  className=" h-5 w-7 cursor-pointer  text-black duration-[500s] ease-in"
                />
              </div>
              <div
                key={item.snNumber}
                onClick={() => {
                  patients.splice(indexItem, 1)

                  //router.push('/SparavtoTrackingInduvidualPage')
                  setShowFullItem(!showFullItem)
                }}
              >
                <div className=" flex flex-col items-center justify-center">
                  <div className=" flex flex-row ">
                    <h1 className=" mx-5 text-center text-lg text-[#707070]">
                      {item.firstName}
                    </h1>
                    <h1 className=" mx-5 text-center text-lg text-[#707070]">
                      {item.lastName}
                    </h1>
                  </div>
                  <h3>Email</h3>
                  <h1 className="mx-5 mb-5 text-center text-lg text-[#707070]">
                    {item.email}
                  </h1>
                  <h3>Phone Number</h3>
                  <h1 className="mx-5 mb-5 text-center text-lg text-[#707070]">
                    {item.phoneNumber}
                  </h1>
                  <h3>DOB</h3>
                  <h1 className="mx-5 mb-5 text-center text-lg text-[#707070]">
                    {item.DOB}
                  </h1>
                  <div className=" flex flex-col">
                    <h3>SN Number</h3>
                    <h1 className="  mb-5 text-center text-lg text-[#707070]">
                      {item.snNumber}
                    </h1>
                    <h3>Dose</h3>
                    <h1 className=" mx-5 mb-5 text-center text-lg text-[#707070]">
                      {item.dose}
                    </h1>
                    <h3>Number of Devices</h3>
                    <h1 className="mx-5 mb-5 text-center text-lg text-[#707070]">
                      {item.numberOfDevices}
                    </h1>
                    <h3>Lot Number</h3>
                    <h1 className="mx-5 mb-5 text-center text-lg text-[#707070]">
                      {item.lotNumber}
                    </h1>
                    <h3>MA</h3>
                    <h1 className="mx-5 mb-5 text-center text-lg text-[#707070]">
                      {item.MA}
                    </h1>

                    <h3>Date Administered</h3>
                    <h1 className="mx-5 mb-5 text-center text-lg text-[#707070]">
                      {item.dateAdministeredString}
                    </h1>
                    <h3>Date ordered</h3>
                    <h1 className="mx-5 mb-5 text-center text-lg text-[#707070]">
                      {item.dateOrderedString}
                    </h1>
                    <h3>Date Received</h3>
                    <h1 className="mx-5 mb-5 text-center text-lg text-[#707070]">
                      {item.dateReceivedString}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      } else {
        return (
          <div
            key={item.snNumber}
            onClick={async () => {
              //router.push('/SparavtoTrackingInduvidualPage')
              if (edit == false && patients.length < 1) {
                setEmail(item.email)

                setMa(item.MA)

                setFirstName(item.firstName)

                setLastName(item.lastName)

                setPhoneNumber(item.phoneNumber)

                setNumberOfDevices(item.numberOfDevices)

                setLotNumber(item.lotNumber)

                setSnNumber(item.snNumber)
                setDose(item.dose)

                // setPatients([])
                setEdit(false)
                await patients.push(item)
              }
              setShowFullItem(!showFullItem)
            }}
            className=" m-4 flex w-[70%] cursor-pointer  items-center  justify-center overflow-x-hidden rounded-[30px] bg-[#f9f9f9]  p-4   text-center shadow-xl duration-500 hover:scale-[110%]"
          >
            <h1 className=" mx-5  text-center text-lg text-[#707070]">
              {item.firstName}
            </h1>
            <h1 className="mx-5  text-center text-lg text-[#707070]">
              {item.lastName}
            </h1>
            <h1 className="mx-5  text-center text-lg text-[#707070]">
              {item.snNumber}
            </h1>
            <div></div>
          </div>
        )
      }
    })
    return list
  }
  return (
    <div>
      <Header selectCompany={'AMA'} routePatientsHome={true} />
      <main className=" mt-8">
        <h1 className=" text-center text-4xl text-[#0008ff]">Spravato</h1>

        <div className=" mt-10 flex flex-row ">
          <div className=" mx-10 flex h-20 w-[23%] flex-col ">
            <MenuItem
              icon={
                <ClipboardDocumentListIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
              }
              text="Spravato Tracking Sheet"
              onClick={() => {
                router.push('/SpravatoTracking')
              }}
            />
            <MenuItem
              icon={
                <ChartBarIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
              }
              text="Spravato Analytics"
              onClick={() => {
                router.push('/SpravtoAnalytics')
              }}
            />
          </div>
          <div className="  flex w-[77%] flex-col items-center justify-center p-20">
            <MainButton
              onClick={() => {
                // @ts-ignore
                const csvString = JSONToCSV(spravtoTrackingArray)
                downloadCSV(csvString)
              }}
              buttonText={'Download Spreadsheet CSV'}
            />
            <TextInput
              widthPercentage="w-[80%]"
              placeHolder="SN Number"
              onChange={(text: any) => {
                setSearched(text.target.value)
              }}
              value={searched}
              type={'text'}
            />
            {sparavtoTrackingList()}
          </div>
        </div>
      </main>
    </div>
  )
}
export default Spravato
