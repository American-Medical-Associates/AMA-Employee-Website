import React, { useState, useEffect } from 'react'
import TextInput from '../components/TextInput'
import * as XLSX from 'xlsx'
import { NextPage } from 'next'
import Header from '../components/Header'
import { async } from '@firebase/util'
import MainButton from '../components/MainButton'
import { auth, functions } from '../firebase'
import { httpsCallable, getFunctions } from 'firebase/functions'
import { PhoneIcon } from '@heroicons/react/outline'
import classnames from 'classnames'
import CheckBox from '../components/CheckBox'
import { useRouter } from 'next/router'
import SearchComponent from '../components/searchComponent'

const MassMessagePage: NextPage<{}> = () => {
  const [xlsxDoc, setXlsxDoc] = useState<Array<string>>([])
  const [homePhone, setHomePhone] = useState('')
  const [workPhone, setWorkPhone] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [patientBalance, setPatientBalance] = useState('')
  const [accountBalance, setAccountBalance] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [listItemColor, setListItemColor] = useState('bg-[#ebebebc6]')
  const [patients, setPatients] = useState<Array<any>>([])
  const sendMessageFunction = httpsCallable(functions, 'sendMessage')
  const [selectAll, setSelectAll] = useState(false)
  const [customMessage, setCustomMessage] = useState('')
  const [customCheckBox, setCustomCheckBox] = useState(false)
  const [listOfMessageSent, setListOfMessageSent] = useState<Array<string>>([])
  const [leaveAReviewMessageCheckBox, setLeaveAReviewMessageCheckBox] =
    useState(false)
  const [sendBalance, setSendBalance] = useState(false)
  const currentDate = new Date()
  var month = currentDate.getMonth() + 1
  var day = currentDate.getDay()
  const router = useRouter()

  const [refresh, setRefresh] = useState(false)
  const [searched, setSearched] = useState('')
  const [searchedPatients, setSearchedPatients] = useState<Array<any>>([])

  useEffect(() => {
    if (leaveAReviewMessageCheckBox || sendBalance || customCheckBox) {
      if (patients.length > 0) {
        setButtonDisabled(false)
      } else {
        setButtonDisabled(true)
      }
    }
  }, [
    patients,
    refresh,
    sendBalance,
    customCheckBox,
    leaveAReviewMessageCheckBox,
  ])
  useEffect(() => {
    if (leaveAReviewMessageCheckBox || sendBalance) {
      setCustomCheckBox(false)
    }
    if (customCheckBox || sendBalance) {
      setLeaveAReviewMessageCheckBox(false)
    }
    if (leaveAReviewMessageCheckBox || customCheckBox) {
      setSendBalance(false)
    }
  }, [sendBalance, customCheckBox, leaveAReviewMessageCheckBox])

  useEffect(() => {
    if (selectAll) {
      xlsxDoc.forEach((item) => {
        patients.push(item)
        setRefresh(!refresh)
      })
    } else {
      xlsxDoc.forEach((item) => {
        const index = patients.indexOf(item)
        patients.splice(index)
        setRefresh(!refresh)
      })
    }
  }, [selectAll])

  useEffect(() => {
    var searchedName: Array<any> = []
    if (searched != '') {
      xlsxDoc.map((item: any) => {
        if (item[3].toLowerCase().includes(searched.toLowerCase())) {
          searchedName.push(item)
        }
      })
      setSearchedPatients(searchedName)
      searchedName = []
    } else {
      setSearchedPatients(xlsxDoc)
      searchedName = []
    }
  }, [searched, xlsxDoc])

  const list = searchedPatients.map((item: any, index: any) => {
    const indexItem = patients.indexOf(item)

    if (indexItem != -1) {
      return (
        <div
          key={item[1]}
          onClick={() => {
            patients.splice(indexItem, 1)
            console.log(patients)
            setRefresh(!refresh)
          }}
          className={classnames(
            `m-5 flex w-[60%] cursor-pointer flex-row items-center justify-center rounded-[30px] bg-[#0008ff] p-4 px-5 text-center shadow-xl duration-500 hover:scale-[110%]`
          )}
        >
          <h1 className=" text-lg text-[#ffffff]">{item[1]}</h1>
          <h1 className=" ml-5 text-lg text-[#ffff]">{item[3]} </h1>
          <h1 className=" ml-5 text-lg text-[#ffff]">{item[16]} </h1>
          <h1 className=" ml-5 text-lg text-[#ffff]">{item[31]} </h1>
          <h1 className=" ml-5 text-lg text-[#ffff]">Account: {item[38]} </h1>
          <h1 className=" ml-5 text-lg text-[#ffff]">Personal: {item[37]}</h1>
        </div>
      )
    } else {
      return (
        <div
          key={item[1]}
          onClick={async () => {
            await patients.push(item)
            setRefresh(!refresh)
          }}
          className={classnames(
            `m-5 flex w-[60%] cursor-pointer flex-row items-center justify-center rounded-[30px] bg-[#ebebebc6] p-4 px-5 text-center shadow-xl duration-500 hover:scale-[110%]`
          )}
        >
          <h1 className=" text-lg text-[#707070]">{item[1]}</h1>
          <h1 className=" ml-5 text-lg text-[#707070]">{item[3]} </h1>
          <h1 className=" ml-5 text-lg text-[#707070]">{item[16]} </h1>
          <h1 className=" ml-5 text-lg text-[#707070]">{item[31]} </h1>
          <h1 className=" ml-5 text-lg text-[#707070]">Account: {item[38]}</h1>
          <h1 className=" ml-5 text-lg text-[#707070]">Personal: {item[37]}</h1>
        </div>
      )
    }
  })

  const uploadimage = ({ e }: { e: any }) => {
    const [file] = e.target.files
    const reader = new FileReader()

    // console.log(resume)

    reader.onload = async (readEvent) => {
      try {
        const bstr = readEvent!.target?.result as any

        const wb = XLSX.read(bstr, { type: 'binary' })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data: Array<any> = XLSX.utils
          .sheet_to_json(ws, {
            header: 1,
          } as any)
          .splice(1)
        console.log(data)
        setXlsxDoc(data)
        // var worksheet = XLSX.utils.aoa_to_sheet(data as any)
        // var new_workbook = XLSX.utils.book_new()
        // const name: string = data

        await console.log(xlsxDoc)
      } catch (e) {
        alert('Please upload a spread sheet! error code: ' + e)
      }
    }
    reader.readAsBinaryString(file)
  }
  const ListOfMessagesSent = listOfMessageSent.map((item: string) => {
    return (
      <div>
        <p>{item}</p>
      </div>
    )
  })
  const sendMessage = () => {
    patients.forEach((item) => {
      if (item) {
        var message = `Thank You ${item[1]}  for visiting American Medical Associates. Please let us know how we did by clicking the link below. Link:https://www.google.com/search?q=american+medical+associates+az&oq=americanmed&aqs=chrome.2.69i60j0i512j0i10i512j69i57j46i10i175i199i512j69i65j69i60l2.11313j0j7&sourceid=chrome&ie=UTF-8`
        if (leaveAReviewMessageCheckBox) {
          message = `Thank You ${item[1]}  for visiting American Medical Associates. Please let us know how we did by clicking the link below. Link:https://www.google.com/search?q=american+medical+associates+az&oq=americanmed&aqs=chrome.2.69i60j0i512j0i10i512j69i57j46i10i175i199i512j69i65j69i60l2.11313j0j7&sourceid=chrome&ie=UTF-8`
        }

        if (sendBalance) {
          if (item[37] > 0) {
            message = `Hello ${item[1]}, your current balance with AMERICAN MEDICAL ASSOCIATES is $${item[37]}, please be prepared to pay your balance before your next appointment.`
          }
        }
        if (customCheckBox && customMessage != null) {
          message = `Hello ${item[1]}, ${customMessage}`
        }

        if (item[16] != null) {
          console.log(item[16])

          sendMessageFunction({
            message: message,
            phone: `+1${item[16].replaceAll('-', '')}`,
          })
            .then((result) => {
              listOfMessageSent.push(
                `${patients.length} patients were sent messages on ${currentDate}`
              )
              setRefresh(!refresh)
              console.log(result)
            })

            .catch((e) => {
              console.log(e)
            })
        }
      }
    })
  }
  return (
    <div className=" flex h-full w-full flex-col items-center justify-center">
      <Header />

      <main
        className=" flex  h-full w-full flex-col items-center p-10
      "
      >
        <MainButton
          buttonText="Email"
          onClick={() => {
            router.push('/EmailPage')
          }}
        />

        <h3 className=" text-xl">
          Upload a Spread sheet to send texts to them.
        </h3>

        <TextInput
          // ref={filePicker}
          type="file"
          widthPercentage="w-[50%]"
          placeHolder="Upload a Spread Sheet"
          onChange={(text: any) => {
            uploadimage({ e: text })
          }}
        />
        <div className=" my-5 flex w-full items-center justify-center ">
          <SearchComponent
            value={searched}
            widthPercentage="w-[100%]"
            placeHolder="Search Patient"
            onChange={(text: any) => {
              setSearched(text.target.value)
            }}
          />
        </div>
        {xlsxDoc.length != 0 && (
          <div>
            {customCheckBox && (
              <div className=" flex w-full flex-col items-center justify-center">
                <h6>
                  {
                    "Every custom message will begin with 'Hello, {Patients Name}'."
                  }
                </h6>
                <TextInput
                  value={customMessage}
                  onChange={(text: any) => {
                    setCustomMessage(text.target.value)
                  }}
                  placeHolder="custom message"
                  widthPercentage="w-[70%]"
                />
              </div>
            )}

            <div className="flex w-full  flex-row items-center justify-center">
              <h6 className=" mr-15">Select All </h6>

              <CheckBox isChecked={selectAll} checkedState={setSelectAll} />
              <h6 className=" mr-15">Custom Message </h6>

              <CheckBox
                isChecked={customCheckBox}
                checkedState={setCustomCheckBox}
              />
              <h6 className=" mr-15">Leave A Review Message </h6>

              <CheckBox
                isChecked={leaveAReviewMessageCheckBox}
                checkedState={setLeaveAReviewMessageCheckBox}
              />
              <h6 className=" mr-15">Send Balance Message </h6>

              <CheckBox isChecked={sendBalance} checkedState={setSendBalance} />
            </div>
          </div>
        )}

        {list}
        {ListOfMessagesSent}

        <MainButton
          disabled={buttonDisabled}
          buttonText="Send text"
          onClick={() => {
            sendMessage()
          }}
        />
      </main>
    </div>
  )
}
export default MassMessagePage
