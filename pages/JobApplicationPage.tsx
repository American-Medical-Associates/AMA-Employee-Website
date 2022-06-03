import React, { useState, useRef } from 'react'
import ItemPicker from '../components/ItemPicker'
import MainButton from '../components/MainButton'
import TextInput from '../components/TextInput'
import LargeTextBox from '../components/LargeTextBox'
import { submitResume, AddToStorageAndToDB } from '../firebase'
import LineDivider from '../components/lineDiveider'
import RadioButton from '../components/RadioButton'
import CheckBox from '../components/CheckBox'
import EmployeeOpportunitiesDisclosure from '../components/EmployeeOpportunitiesDisclosure'
import Header from '../components/Header'

const JobApplicationPage: React.FC<{}> = () => {
  const filePicker = useRef(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [profileLink, setProfileLink] = useState(null)
  const [linkType, setLinkType] = useState('LinkedIn')
  const [aboutYou, setAboutYou] = useState(null)
  const [resume, setResume] = useState(null)
  const [radio1, setRadio1] = useState(null)
  const [radio2, setRadio2] = useState(null)
  const [radio3, setRadio3] = useState(null)
  const [radio4, setRadio4] = useState(null)
  const [radio5, setRadio5] = useState(null)
  const [radio6, setRadio6] = useState(null)
  const [radio7, setRadio7] = useState(null)
  const [checkBoxAgree, setCheckBoxAgree] = useState(false)
  const [checkBoxAgree2, setCheckBoxAgree2] = useState(false)
  const [scrollComplete, setScrollComplete] = useState(true)
  const [statmentOfAvailability, setStatmentOfAvailability] =
    useState('Immediately')
  const [fullLegalName, setFullLegalName] = useState(null)
  const [disabilityStatus, setDisabilityStatus] = useState(
    'Yes I have disability (or previously had a disability)'
  )
  const [race, setRace] = useState('Hispanic or Latino')
  const [gender, setGender] = useState('Male')
  const [veteranStatus, setVeteranStatus] = useState(
    'I am not a protected veteran'
  )

  const checkForInput: any = () => {
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !profileLink ||
      !linkType ||
      !aboutYou ||
      !resume ||
      !radio1 ||
      !radio2 ||
      !radio3 ||
      !radio4 ||
      !radio5 ||
      !radio6 ||
      !radio7 ||
      !fullLegalName ||
      !race ||
      !gender ||
      !veteranStatus ||
      !statmentOfAvailability ||
      !disabilityStatus
    ) {
      alert('Please Make sure all the felids are filled out')
    } else if (phoneNumber.length != 10) {
      alert('plaese Make sure your Phone Number is a standard 10 digit number')
    } else if (email.includes('@') == false) {
      alert('Please make sure your email valid')
    } else if (checkBoxAgree2 != true || checkBoxAgree != true) {
      alert(
        'Please acknowledge with checkboxes that you have read all of the information '
      )
    } else {
      try {
        AddToStorageAndToDB({
          storagePath: `resume/${email}/resume`,
          selectedFile: resume,
          SetDocPath: ['applications', email],
          email: email,
        })
        submitResume({
          email: email,
          firstName: firstName,
          lastName: lastName,
          linkType: linkType,
          phoneNumber: phoneNumber,
          profileLink: profileLink,
          aboutYou: aboutYou,
          radio1: radio1,
          radio2: radio2,
          radio3: radio3,
          radio4: radio4,
          radio5: radio5,
          radio6: radio6,
          radio7: radio7,
          fullLegalName: fullLegalName,
          race: race,
          gender: gender,
          veteranStatus: veteranStatus,
          DisabilityStatus: disabilityStatus,
          statmentOfAvailbilty: statmentOfAvailability,
          checkbox1: checkBoxAgree,
          checkbox2: checkBoxAgree2,
        })
      } catch (e) {
        alert(e)
      }
    }
  }

  const uploadimage = ({ e }: { e: any }) => {
    try {
      const reader = new FileReader()
      if (e.target.files[0]) {
        // console.log(resume)
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (readEvent) => {
          setResume(readEvent!.target?.result as any)
          console.log(resume)
        }
      }
    } catch (e) {
      alert('please upload your Resume')
    }
  }

  return (
    <div className=" flex  w-full flex-1 flex-col">
      <Header />
      <main className=" flex w-full flex-col text-center ">
        <h1 className=" mt-8 text-4xl text-[#4e4e4e]"> Application</h1>

        <div className=" w-fill flex grid-cols-2 flex-row">
          <div className=" flex w-[50%] flex-col  ">
            <div className=" my-12">
              <TextInput
                widthPercentage="w-[80%]"
                placeHolder="Legal First Name"
                onChange={(text: any) => {
                  setFirstName(text.target.value)
                }}
                value={firstName}
                type={'text'}
              />
            </div>

            <div className=" my-12">
              <TextInput
                widthPercentage="w-[80%]"
                placeHolder="Phone Number"
                onChange={(text: any) => {
                  text.hand
                  setPhoneNumber(text.target.value)
                }}
                value={phoneNumber}
              />
            </div>
            <div className=" my-12 flex w-full  flex-col items-center justify-center p-2">
              <h3 className=" text-lg text-[#838383]"> Portfolio Link</h3>
              <TextInput
                widthPercentage="w-[80%]"
                placeHolder="Profile Link"
                onChange={(text: any) => {
                  setProfileLink(text.target.value)
                }}
                type={'url'}
                value={profileLink}
              />
            </div>
          </div>
          <div className=" flex w-[50%] flex-col ">
            <div className="  my-12 flex w-full">
              <TextInput
                widthPercentage="w-[80%]"
                placeHolder="Legal Last Name"
                onChange={(text: any) => {
                  setLastName(text.target.value)
                }}
                type={'name'}
                value={lastName}
              />
            </div>
            <div className="  my-12 flex w-full ">
              <TextInput
                type={'email'}
                widthPercentage="w-[80%]"
                placeHolder="Email"
                onChange={(text: any) => {
                  setEmail(text.target.value)
                }}
                value={email}
              />
            </div>
            <div className=" my-12 flex w-full flex-col  items-center justify-center p-4">
              <h3 className=" mb-1 text-lg text-[#838383]">Link Type</h3>
              <ItemPicker
                value={linkType}
                onChange={(value: any) => {
                  setLinkType(value.target.value)

                  console.log(linkType)
                }}
                options={[
                  <option disabled={true} value="Please Select One">
                    Please Select One
                  </option>,
                  <option value="LinkedIn">LinkedIn</option>,
                  <option value="FaceBook">FaceBook</option>,
                  <option value="Indeed">Indeed</option>,
                  <option value="Portfolio">Portfolio</option>,
                ]}
              />
            </div>
            <div className="  my-12 flex w-full"></div>
          </div>
        </div>
        <div className=" my-12 flex w-full flex-col items-center justify-center">
          <h3 className=" text-lg text-[#838383]">Upload a Resume</h3>
          <TextInput
            // ref={filePicker}
            type="file"
            widthPercentage="w-[50%]"
            placeHolder="Upload a Resume"
            onChange={(text: any) => {
              uploadimage({ e: text })
              console.log(resume)
            }}
            value={uploadimage}
          />
          <LargeTextBox
            heightPercentage="h-[200px]"
            widthPercentage="w-[80%]"
            placeHolder="Evidence of Excellence"
            onChange={(text: any) => {
              setAboutYou(text.target.value)
            }}
            value={aboutYou}
          />
          <LineDivider
            lineColor={'bg-[#ABABAB]'}
            lineHight={'h-[10px]'}
            lineWidth={'w-[60%]'}
            margin={'my-20'}
          />
          <div className=" px-40">
            <h3 className=" mb-10 text-center text-4xl text-[#4e4e4e]">
              Legal Acknowledgment
            </h3>
            <h5 className=" my-5 text-lg">
              What is your availability or notice period?
            </h5>
            <ItemPicker
              value={statmentOfAvailability}
              onChange={(value: any) => {
                setStatmentOfAvailability(value.target.value)

                console.log(linkType)
              }}
              options={[
                <option disabled={true} value="Please Select One">
                  Please Select One
                </option>,
                <option value="Immediately">Immediately</option>,
                <option value="In 1-2 weeks">In 1-2 weeks</option>,
                <option value="In 1-2 weeks">In 1-2 weeks</option>,
                <option value="In 3-4 weeks">In 3-4 weeks</option>,
                <option value="In 5-12 weeks">In 5-12 weeks</option>,
                <option value="More then 12 weeks">More then 12 weeks</option>,
              ]}
            />
            <h5 className=" my-5 text-lg">
              Will you now or in the future require immigration sponsorship for
              employment with American Medical Associates?
            </h5>
            <RadioButton answerState={setRadio1} />
            <h5 className=" my-5 text-lg">
              I authorize American Medical Associates to consider me for other
              job opportunities for the next 24 months within American Medical
              Associates in addition to the specific job I am applying for.
            </h5>
            <RadioButton answerState={setRadio2} />
            <h5 className=" my-5 text-lg">
              Have you previously been employed by American Medical Associates?
            </h5>
            <RadioButton answerState={setRadio3} />
            <h5 className=" my-5 text-lg">
              Are you a former/current intern or contractor?
            </h5>
            <RadioButton answerState={setRadio4} />
            <h5 className=" my-5 text-lg">
              Do you consent to receiving text messages throughout your
              application process including but not limited to interview
              details, pre-employment screening notifications and reminders?
            </h5>
            <RadioButton answerState={setRadio5} />
            <h5 className=" my-5 text-lg">
              Have you ever been terminated from a job?
            </h5>
            <RadioButton answerState={setRadio6} />
            <h5 className=" my-5 text-lg">
              Have you ever been convicted of a crime?
            </h5>
            <RadioButton answerState={setRadio7} />

            <h4 className=" my-10 text-center text-3xl text-[#4e4e4e]">
              Acknowledgment
            </h4>

            <p className=" text-lg">
              1. I certify that all statements I have made on this application
              and on my resume or any other supplementary materials are true and
              correct. I acknowledge that any false statement or
              misrepresentation on this application, my resume, or supplementary
              materials will be cause for refusal to hire, or for immediate
              termination of employment at any time during the period of my
              employment. 2. I understand and agree that, if I am offered a
              position, it will be offered on condition that my employment will
              be at will and for no definite period, and that my employment may
              be terminated, at any time, with or without cause and with or
              without prior notice. 3. I understand that no supervisor or
              manager may alter or amend the above conditions except in writing,
              signed by a company officer.
            </p>
            <div className=" m-12 flex flex-row justify-center self-center">
              <CheckBox
                checkedState={setCheckBoxAgree}
                isChecked={checkBoxAgree}
              />
              I have read and understand the statements above and accept them as
              conditions of employment.
            </div>
          </div>
          <LineDivider
            lineColor={'bg-[#ABABAB]'}
            lineHight={'h-[10px]'}
            lineWidth={'w-[60%]'}
            margin={'my-20'}
          />
          <EmployeeOpportunitiesDisclosure setScrollState={setScrollComplete} />
          <div className=" m-12 flex flex-row justify-center self-center">
            <CheckBox
              disabled={scrollComplete}
              checkedState={setCheckBoxAgree2}
              isChecked={checkBoxAgree2}
            />
            I acknowledge that I have read and understood American Medical
            Associates's Equal Employee Opportunities.
          </div>
          <div className=" flex w-full grid-cols-2 items-center justify-center">
            <div className=" flex w-full flex-col items-center justify-center">
              <div className=" m-10 w-full">
                <h3 className=" mb-1 text-lg text-[#838383]">Disability</h3>
                <ItemPicker
                  value={disabilityStatus}
                  onChange={(value: any) => {
                    setDisabilityStatus(value.target.value)

                    console.log(linkType)
                  }}
                  options={[
                    <option disabled={true} value="Please Select One">
                      Please Select One
                    </option>,
                    <option value="Yes I have disability (or previously had a disability)">
                      Yes I have disability (or previously had a disability)
                    </option>,
                    <option value="No i do not have a disability">
                      No i do not have a disability
                    </option>,
                    <option value="I choose not to disclose">
                      I choose not to disclose
                    </option>,
                  ]}
                />
              </div>
              <h3 className=" mb-1 text-lg text-[#838383]">Race/Ethnicity</h3>
              <ItemPicker
                value={race}
                onChange={(value: any) => {
                  setRace(value.target.value)

                  console.log(linkType)
                }}
                options={[
                  <option disabled={true} value="Please Select One">
                    Please Select One
                  </option>,
                  <option value="Hispanic or Latino">
                    Hispanic or Latino
                  </option>,
                  <option value="White">White</option>,
                  <option value="Black">Black</option>,
                  <option value="Asian">Asian</option>,
                  <option value="Native American or Alaskan Native">
                    Native American or Alaskan Native
                  </option>,
                  <option value="Native Hawaiian or other Pacific Islander">
                    Native Hawaiian or other Pacific Islander
                  </option>,
                  <option value="Two or more races">Two or more races</option>,
                  <option value="I choose not to disclose">
                    I choose not to disclose{' '}
                  </option>,
                ]}
              />
            </div>
            <div className=" flex w-full flex-col items-center justify-center">
              <div className=" m-10 w-full">
                <h3 className=" mb-1 text-lg text-[#838383]">Gender</h3>
                <ItemPicker
                  value={gender}
                  onChange={(value: any) => {
                    setGender(value.target.value)
                  }}
                  options={[
                    <option disabled={true} value="Please Select One">
                      Please Select One
                    </option>,
                    <option value="Male">Male</option>,
                    <option value="Female">Female</option>,
                    <option value="I choose not to disclose">
                      I choose not to disclose
                    </option>,
                  ]}
                />
              </div>
              <h3 className=" mb-1 text-lg text-[#838383]">Veteran Status</h3>
              <ItemPicker
                value={veteranStatus}
                onChange={(value: any) => {
                  setVeteranStatus(value.target.value)
                }}
                options={[
                  <option disabled={true} value="Please Select One">
                    Please Select One
                  </option>,
                  <option value="I am not a protected veteran">
                    I am not a protected veteran
                  </option>,
                  <option
                    value="Fac I identify as one or more of the classifications of a
                      protected veteranseBook"
                  >
                    I identify as one or more of the classifications of a
                    protected veterans
                  </option>,
                  <option value="I choose not to disclose">
                    I choose not to disclose
                  </option>,
                ]}
              />
            </div>
          </div>
          <TextInput
            placeHolder="Legal Name"
            type="name"
            widthPercentage=" w-[50%]"
            onChange={(text: any) => {
              setFullLegalName(text.target.value)
            }}
            value={fullLegalName}
          />
          <div className=" my-3 flex w-full items-center justify-center">
            <MainButton
              typeOfButton={'submit'}
              buttonWidth="w-[60%]"
              onClick={() => {
                checkForInput()
              }}
              buttonText="Submit"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
export default JobApplicationPage
