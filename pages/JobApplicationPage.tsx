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
import AddressInput from '../components/AddressInput'
import EducationBox from '../components/EducationBox'
import WorkHistory from '../components/WorkHistory'
import Reference from '../components/Refrences'
import APPLICANTCERTIFICATION from '../components/APPLICANTCERTIFICATION'
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
  const [checkBoxAgree3, setCheckBoxAgree3] = useState(false)

  const [scrollComplete, setScrollComplete] = useState(true)
  const [scrollComplete2, setScrollComplete2] = useState(true)

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
  const [positionApplyingfor, setPositionApplyingfor] = useState('')
  const [addressState, setAddressState] = useState('')
  const [addressState2, setAddressState2] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [under18Bool, setUnder18Bool] = useState(null)
  const [typeOfEmployment, setTypeOfEmployment] = useState('Full Time')
  const [previouslyApplied, setPreviouslyApplied] = useState(null)
  const [highSchoolState, setHighSchoolState] = useState('')
  const [highSchoolCourseOfStudyState, setHighSchoolCourseOfStudyState] =
    useState('')
  const [highSchoolGraduateState, setHighSchoolGraduateState] = useState(null)
  const [
    highSchoolNumberOfYearsCompletedState,
    setHighSchoolNumberOfYearsCompletedState,
  ] = useState('')
  const [highSchoolHonorsReceivedState, setHighSchoolHonorsReceivedState] =
    useState('')
  const [collegeState, setCollegeState] = useState('')
  const [collegeCourseOfStudyState, setCollegeCourseOfStudyState] = useState('')
  const [collegeGraduateState, setCollegeGraduateState] = useState(null)
  const [
    collegeNumberOfYearsCompletedState,
    setCollegeNumberOfYearsCompletedState,
  ] = useState('')
  const [collegeHonorsReceivedState, setCollegeHonorsReceivedState] =
    useState('')
  const [GradState, setGradState] = useState('')
  const [GradCourseOfStudyState, setGradCourseOfStudyState] = useState('')
  const [GradNumberOfYearsCompletedState, setGradNumberOfYearsCompletedState] =
    useState('')
  const [GradGraduateState, setGradGraduateState] = useState(null)
  const [GradHonorsReceivedState, setGradHonorsReceivedState] = useState('')
  const [tradeState, setTradeState] = useState('')
  const [tradeCourseOfStudyState, setTradeCourseOfStudyState] = useState('')
  const [tradeGraduateState, setTradeGraduateState] = useState('')
  const [
    tradeNumberOfYearsCompletedState,
    setTradeNumberOfYearsCompletedState,
  ] = useState('')
  const [tradeHonorsReceivedState, setTradeHonorsReceivedState] = useState('')
  const [workNameState, setWorkNameState] = useState('')
  const [typeOfBusinessState, setTypeOfBusinessState] = useState('')
  const [workAddressState, setWorkAddressState] = useState('')
  const [reasonForLeavingState, setReasonForLeavingState] = useState('')
  const [jobTitleState, setJobTitleState] = useState('')
  const [workPhoneNumberState, setWorkPhoneNumberState] = useState('')
  const [supervisorsNameState, setSupervisorsNameState] = useState('')
  const [dutiesState, setDutiesState] = useState('')
  const [mayWeContactState, setMayWeContactState] = useState('')
  const [selectedDateStart1, setSelectedDateStart1] = useState(new Date())
  const [selectedDateEnd1, setSelectedDateEnd1] = useState(new Date())
  const [workNameState2, setWorkNameState2] = useState('')
  const [typeOfBusinessState2, setTypeOfBusinessState2] = useState('')
  const [workAddressState2, setWorkAddressState2] = useState('')
  const [reasonForLeavingState2, setReasonForLeavingState2] = useState('')
  const [jobTitleState2, setJobTitleState2] = useState('')
  const [workPhoneNumberState2, setWorkPhoneNumberState2] = useState('')
  const [supervisorsNameState2, setSupervisorsNameState2] = useState('')
  const [dutiesState2, setDutiesState2] = useState('')
  const [mayWeContactState2, setMayWeContactState2] = useState('')
  const [selectedDateStart2, setSelectedDateStart2] = useState(new Date())
  const [selectedDateEnd2, setSelectedDateEnd2] = useState(new Date())
  const [workNameState3, setWorkNameState3] = useState('')
  const [typeOfBusinessState3, setTypeOfBusinessState3] = useState('')
  const [workAddressState3, setWorkAddressState3] = useState('')
  const [reasonForLeavingState3, setReasonForLeavingState3] = useState('')
  const [jobTitleState3, setJobTitleState3] = useState('')
  const [workPhoneNumberState3, setWorkPhoneNumberState3] = useState('')
  const [supervisorsNameState3, setSupervisorsNameState3] = useState('')
  const [dutiesState3, setDutiesState3] = useState('')
  const [mayWeContactState3, setMayWeContactState3] = useState('')
  const [selectedDateStart3, setSelectedDateStart3] = useState(new Date())
  const [selectedDateEnd3, setSelectedDateEnd3] = useState(new Date())
  const [
    radio_Terminated_upon_mutual_agreement,
    setRadio_Terminated_upon_mutual_agreement,
  ] = useState(null)

  const [
    radio_Choice_to_resign_rather_than_be_terminated,
    setRadio_Choice_to_resign_rather_than_be_terminated,
  ] = useState(null)
  const [referenceNameState, setReferenceNameState] = useState('')
  const [referencePositionState, setReferencePositionState] = useState('')
  const [referenceWorkRelationshipState, setReferenceWorkRelationshipState] =
    useState('')
  const [referenceCompanyState, setReferenceCompanyState] = useState('')
  const [referencePhoneNumberState, setReferencePhoneNumberState] = useState('')
  const [referenceNameValue2, setReferenceNameValue2] = useState('')
  const [referencePositionState2, setReferencePositionState2] = useState('')
  const [referenceWorkRelationshipState2, setReferenceWorkRelationshipState2] =
    useState('')
  const [referenceCompanyValue2, setReferenceCompanyValue2] = useState('')
  const [referencePhoneNumberValue2, setReferencePhoneNumberValue2] =
    useState('')
  const [referenceNameState3, setReferenceNameState3] = useState('')
  const [referencePositionState3, setReferencePositionState3] = useState('')
  const [referenceWorkRelationshipState3, setReferenceWorkRelationshipState3] =
    useState('')
  const [referenceCompanyState3, setReferenceCompanyState3] = useState('')
  const [referencePhoneNumberState3, setReferencePhoneNumberState3] =
    useState('')
  const [referenceNameState4, setReferenceNameState4] = useState('')
  const [referencePositionValue4, setReferencePositionValue4] = useState('')
  const [referenceWorkRelationshipState4, setReferenceWorkRelationshipState4] =
    useState('')
  const [referenceCompanyState4, setReferenceCompanyState4] = useState('')
  const [referencePhoneNumberState4, setReferencePhoneNumberState4] =
    useState('')
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
      !disabilityStatus ||
      !highSchoolState ||
      !referenceNameState ||
      !checkBoxAgree3
    ) {
      alert('Please make sure all the felids are filled out')
    } else if (phoneNumber.length != 10) {
      alert('Plaese make sure your Phone Number is a standard 10 digit number')
    } else if (phoneNumber.includes('9999999999') == true) {
      alert('Please make sure your phone number is valid')
    } else if (phoneNumber.includes('0000000000') == true) {
      alert('Please make sure your phone number is valid')
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
          under_the_age_of_18: under18Bool,
          havePreviouslyApplied: previouslyApplied,
          fullLegalName: fullLegalName,
          race: race,
          gender: gender,
          veteranStatus: veteranStatus,
          DisabilityStatus: disabilityStatus,
          statmentOfAvailbilty: statmentOfAvailability,
          checkbox1: checkBoxAgree,
          checkbox2: checkBoxAgree2,
          positionApplyingFor: positionApplyingfor,
          highSchool: highSchoolState,
          highSchoolCourseOfStudy: highSchoolCourseOfStudyState,
          highSchoolGraduate: highSchoolGraduateState,
          highSchoolNumberOfYearsCompleted:
            highSchoolNumberOfYearsCompletedState,
          highSchoolHonorsReceived: highSchoolHonorsReceivedState,
          college: collegeState,
          collegeCourseOfStudy: collegeCourseOfStudyState,
          collegeGraduate: collegeGraduateState,
          collegeNumberOfYearsCompleted: collegeNumberOfYearsCompletedState,
          collegeHonorsReceived: collegeHonorsReceivedState,
          Grad: GradState,
          GradCourseOfStudy: GradCourseOfStudyState,
          GradNumberOfYearsCompleted: GradNumberOfYearsCompletedState,
          GradGraduate: GradGraduateState,
          GradHonorsReceived: GradHonorsReceivedState,
          trade: tradeState,
          tradeCourseOfStudy: tradeCourseOfStudyState,
          tradeGraduate: tradeGraduateState,
          tradeNumberOfYearsCompleted: tradeNumberOfYearsCompletedState,
          tradeHonorsReceived: tradeHonorsReceivedState,

          selectedDateStart1: selectedDateStart1,
          selectedDateStart2: selectedDateStart2,
          selectedDateStart3: selectedDateStart3,
          selectedDateEnd1: selectedDateEnd1,
          selectedDateEnd2: selectedDateEnd2,
          selectedDateEnd3: selectedDateEnd3,
          typeOfBusiness1: typeOfBusinessState,
          typeOfBusiness2: typeOfBusinessState2,
          typeOfBusiness3: typeOfBusinessState3,
          workNameValue1: workNameState,
          workNameValue2: workNameState2,
          workNameValue3: workNameState3,
          workAddressValue1: workAddressState,
          workAddressValue2: workAddressState2,
          workAddressValue3: workAddressState3,
          reasonForLeaving1: reasonForLeavingState,
          reasonForLeaving2: reasonForLeavingState2,
          reasonForLeaving3: reasonForLeavingState3,
          jobTitleValue1: jobTitleState,
          jobTitleValue2: jobTitleState2,
          jobTitleValue3: jobTitleState3,
          workPhoneNumberValue1: workPhoneNumberState,
          workPhoneNumberValue2: workPhoneNumberState2,
          workPhoneNumberValue3: workPhoneNumberState3,
          supervisorsNameValue1: supervisorsNameState,
          supervisorsNameValue2: supervisorsNameState2,
          supervisorsNameValue3: supervisorsNameState3,
          dutiesValue1: dutiesState,
          dutiesValue2: dutiesState2,
          dutiesValue3: dutiesState3,
          mayWeContactValue1: mayWeContactState,
          mayWeContactValue2: mayWeContactState2,
          mayWeContactValue3: mayWeContactState3,
          referenceNameState: referenceNameState,

          referencePositionState: referencePositionState,

          referenceWorkRelationshipState: referenceWorkRelationshipState,
          referenceCompanyState: referenceCompanyState,

          referencePhoneNumberState: referencePhoneNumberState,

          referenceNameValue2: referenceNameValue2,

          referencePositionState2: referencePositionState2,

          referenceWorkRelationshipState2: referenceWorkRelationshipState2,
          referenceCompanyValue2: referenceCompanyValue2,

          referencePhoneNumberValue2: referencePhoneNumberValue2,

          referenceNameState3: referenceNameState3,

          referencePositionState3: referencePositionState3,

          referenceWorkRelationshipState3: referenceWorkRelationshipState3,
          referenceCompanyState3: referenceCompanyState3,

          referencePhoneNumberState3: referencePhoneNumberState3,

          referenceNameState4: referenceNameState4,

          referencePositionValue4: referencePositionValue4,

          referenceWorkRelationshipState4: referenceWorkRelationshipState4,
          referenceCompanyState4: referenceCompanyState4,

          referencePhoneNumberState4: referencePhoneNumberState4,
        })
      } catch (e) {
        alert(e)
      }
    }
  }
  const showTerminatedTextBox = () => {
    if (
      radio6 == 'Yes' ||
      radio_Terminated_upon_mutual_agreement == 'Yes' ||
      radio_Choice_to_resign_rather_than_be_terminated == 'Yes'
    )
      return (
        <div className=" flex w-full items-center justify-center">
          <LargeTextBox
            heightPercentage="h-[200px]"
            widthPercentage="w-[80%]"
            placeHolder="Please explain the circumstances if answered yes to any of the questions above"
            onChange={(text: any) => {
              setAboutYou(text.target.value)
            }}
            value={aboutYou}
          />
        </div>
      )
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
        <div className=" mt-8 px-60 text-center">
          <p className=" text-lg">
            Please Answer All Questions. Resumes Are Not A Substitute For A
            Completed Application. We are an equal opportunity employer.
            Applicants are considered for positions without regard to veteran
            status, uniformed service member status, race, color, religion, sex,
            national origin, age, physical or mental disability, genetic
            information or any other category protected by applicable federal,
            state, or local laws.
          </p>
          <p className=" mt-5 text-lg">
            THIS COMPANY IS AN AT-WILL EMPLOYER AS ALLOWED BY APPLICABLE STATE
            LAW. THIS MEANS THAT REGARDLESS OF ANY PROVISION IN THIS
            APPLICATION, IF HIRED, THE COMPANY OR I MAY TERMINATE THE EMPLOYMENT
            RELATIONSHIP AT ANY TIME, FOR ANY REASON, WITH OR WITHOUT CAUSE OR
            NOTICE.
          </p>
        </div>

        <div className=" w-fill flex grid-cols-2 flex-row">
          <div className=" flex w-[50%] flex-col  ">
            <div className=" my-12">
              <TextInput
                widthPercentage="w-[80%]"
                placeHolder="First Name"
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
                placeHolder="Position Applying For"
                onChange={(text: any) => {
                  setPositionApplyingfor(text.target.value)
                }}
                value={positionApplyingfor}
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
            <AddressInput
              addressState={setAddressState}
              addressState2={setAddressState2}
              addressValue={addressState}
              addressValue2={addressState2}
              cityState={setCity}
              cityValue={city}
              USStateState={setState}
              USStateValue={state}
              zipCodeState={setZipCode}
              zipCodeValue={zipCode}
            />
          </div>
          <div className=" flex w-[50%] flex-col ">
            <div className="  my-12 flex w-full">
              <TextInput
                widthPercentage="w-[80%]"
                placeHolder="Last Name"
                onChange={(text: any) => {
                  setLastName(text.target.value)
                }}
                type="name"
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
          <div className=" flex flex-col items-center justify-center px-40">
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
            <div className=" mt-5 flex items-center justify-center">
              <ItemPicker
                value={typeOfEmployment}
                onChange={(value: any) => {
                  setTypeOfEmployment(value.target.value)

                  console.log(linkType)
                }}
                options={[
                  <option disabled={true} value="Please Select One">
                    Please Select One
                  </option>,
                  <option value="Full Time">Full Time</option>,
                  <option value="Part Time">Part Time</option>,
                  <option value="In 1-2 weeks">In 1-2 weeks</option>,
                ]}
              />
            </div>
            <div className=" my-12 flex w-full  flex-col items-center justify-center p-2">
              <h5 className=" my-5 text-lg">
                If under the age of 18, can you produce the necessary work
                certificate at the time of employment?
              </h5>
              <RadioButton answerState={setUnder18Bool} />
            </div>
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
              Have you previously applied by American Medical Associates?
            </h5>

            <RadioButton answerState={setPreviouslyApplied} />
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
              Have you ever been convicted of a crime?
            </h5>
            <RadioButton answerState={setRadio7} />
            <LineDivider
              lineColor={'bg-[#ABABAB]'}
              lineHight={'h-[10px]'}
              lineWidth={'w-[60%]'}
              margin={'my-20'}
            />
            <h5 className=" my-5 text-lg">
              Have you ever been terminated from a job?
            </h5>

            <RadioButton answerState={setRadio6} />
            <h5 className=" my-5 text-lg">
              Has your employment ever been terminated upon mutual agreement?
            </h5>
            <RadioButton
              answerState={setRadio_Terminated_upon_mutual_agreement}
            />
            <h5 className=" my-5 text-lg">
              Have you ever been given the choice to resign rather than be
              terminated?
            </h5>
            <RadioButton
              answerState={setRadio_Choice_to_resign_rather_than_be_terminated}
            />

            {showTerminatedTextBox()}
            <LineDivider
              lineColor={'bg-[#ABABAB]'}
              lineHight={'h-[10px]'}
              lineWidth={'w-[60%]'}
              margin={'my-20'}
            />
            <h4 className=" my-10 text-center text-3xl text-[#4e4e4e]">
              Education
            </h4>
            <EducationBox
              highSchoolState={setHighSchoolState}
              highSchoolValue={highSchoolState}
              highSchoolCourseOfStudyState={setHighSchoolCourseOfStudyState}
              highSchoolCourseOfStudyValue={highSchoolCourseOfStudyState}
              highSchoolGraduateState={setHighSchoolGraduateState}
              highSchoolNumberOfYearsCompletedState={
                setHighSchoolNumberOfYearsCompletedState
              }
              highSchoolNumberOfYearsCompletedValue={
                highSchoolNumberOfYearsCompletedState
              }
              highSchoolHonorsReceivedState={setHighSchoolHonorsReceivedState}
              highSchoolHonorsReceivedValue={highSchoolHonorsReceivedState}
              collegeState={setCollegeState}
              collegeValue={collegeState}
              collegeCourseOfStudyState={setCollegeCourseOfStudyState}
              collegeCourseOfStudyValue={collegeCourseOfStudyState}
              collegeGraduateState={setCollegeGraduateState}
              collegeNumberOfYearsCompletedState={
                setCollegeNumberOfYearsCompletedState
              }
              collegeNumberOfYearsCompletedValue={
                collegeNumberOfYearsCompletedState
              }
              collegeHonorsReceivedState={setCollegeHonorsReceivedState}
              collegeHonorsReceivedValue={collegeHonorsReceivedState}
              GradState={setGradState}
              GradValue={GradState}
              GradCourseOfStudyState={setGradCourseOfStudyState}
              GradCourseOfStudyValue={GradCourseOfStudyState}
              GradGraduateState={GradGraduateState}
              GradNumberOfYearsCompletedState={
                setGradNumberOfYearsCompletedState
              }
              GradNumberOfYearsCompletedValue={GradNumberOfYearsCompletedState}
              GradHonorsReceivedState={setGradHonorsReceivedState}
              GradHonorsReceivedValue={GradHonorsReceivedState}
              tradeState={setTradeState}
              tradeValue={tradeState}
              tradeCourseOfStudyState={setTradeCourseOfStudyState}
              tradeCourseOfStudyValue={tradeGraduateState}
              tradeGraduateState={tradeGraduateState}
              tradeNumberOfYearsCompletedState={
                setTradeNumberOfYearsCompletedState
              }
              tradeNumberOfYearsCompletedValue={
                tradeNumberOfYearsCompletedState
              }
              tradeHonorsReceivedState={setTradeHonorsReceivedState}
              tradeHonorsReceivedValue={tradeHonorsReceivedState}
            />
            <WorkHistory
              setSelectedDateStart1={setSelectedDateStart1}
              selectedDateStart1={selectedDateStart1}
              selectedDateEnd1={selectedDateEnd1}
              setSelectedDateEnd1={setSelectedDateEnd1}
              typeOfBusiness1={typeOfBusinessState}
              typeOfBusinessState1={setTypeOfBusinessState}
              workNameState1={setWorkNameState}
              workNameValue1={workNameState}
              workAddressState1={setWorkAddressState}
              workAddressValue1={workAddressState}
              reasonForLeavingState1={setReasonForLeavingState}
              reasonForLeaving1={reasonForLeavingState}
              jobTitleValue1={jobTitleState}
              jobTitleState1={setJobTitleState}
              workPhoneNumberState1={setWorkPhoneNumberState}
              workPhoneNumberValue1={workPhoneNumberState}
              supervisorsNameValue1={supervisorsNameState}
              supervisorsNameState1={setSupervisorsNameState}
              dutiesValue1={dutiesState}
              dutiesState1={setDutiesState}
              mayWeContactState1={setMayWeContactState}
              mayWeContactValue1={mayWeContactState}
              setSelectedDateStart2={setSelectedDateStart2}
              selectedDateStart2={selectedDateStart2}
              selectedDateEnd2={selectedDateEnd2}
              setSelectedDateEnd2={setSelectedDateEnd2}
              typeOfBusiness2={typeOfBusinessState2}
              typeOfBusinessState2={setTypeOfBusinessState2}
              workNameState2={setWorkNameState2}
              workNameValue2={workNameState2}
              workAddressState2={setWorkAddressState2}
              workAddressValue2={workAddressState2}
              reasonForLeavingState2={setReasonForLeavingState2}
              reasonForLeaving2={reasonForLeavingState2}
              jobTitleValue2={jobTitleState2}
              jobTitleState2={setJobTitleState2}
              workPhoneNumberState2={setWorkPhoneNumberState2}
              workPhoneNumberValue2={workPhoneNumberState2}
              supervisorsNameValue2={supervisorsNameState2}
              supervisorsNameState2={setSupervisorsNameState2}
              dutiesValue2={dutiesState2}
              dutiesState2={setDutiesState2}
              mayWeContactState2={setMayWeContactState2}
              mayWeContactValue2={mayWeContactState2}
              setSelectedDateStart3={setSelectedDateStart3}
              selectedDateStart3={selectedDateStart3}
              selectedDateEnd3={selectedDateEnd3}
              setSelectedDateEnd3={setSelectedDateEnd3}
              typeOfBusiness3={typeOfBusinessState3}
              typeOfBusinessState3={setTypeOfBusinessState3}
              workNameState3={setWorkNameState3}
              workNameValue3={workNameState3}
              workAddressState3={setWorkAddressState3}
              workAddressValue3={workAddressState3}
              reasonForLeavingState3={setReasonForLeavingState3}
              reasonForLeaving3={reasonForLeavingState3}
              jobTitleValue3={jobTitleState3}
              jobTitleState3={setJobTitleState3}
              workPhoneNumberState3={setWorkPhoneNumberState3}
              workPhoneNumberValue3={workPhoneNumberState3}
              supervisorsNameValue3={supervisorsNameState3}
              supervisorsNameState3={setSupervisorsNameState3}
              dutiesValue3={dutiesState3}
              dutiesState3={setDutiesState3}
              mayWeContactState3={setMayWeContactState3}
              mayWeContactValue3={mayWeContactState3}
            />
            <Reference
              ReferenceNameValue={referenceNameState}
              ReferenceNameState={setReferenceNameState}
              ReferencePositionValue={referencePositionState}
              ReferencePositionState={setReferencePositionState}
              ReferenceWorkRelationshipState={setReferenceWorkRelationshipState}
              ReferenceWorkRelationshipValue={referenceWorkRelationshipState}
              ReferenceCompanyValue={referenceCompanyState}
              ReferenceCompanyState={setReferenceCompanyState}
              ReferencePhoneNumberValue={referencePhoneNumberState}
              ReferencePhoneNumberState={setReferencePhoneNumberState}
              ReferenceNameValue2={referenceNameValue2}
              ReferenceNameState2={setReferenceNameValue2}
              ReferencePositionValue2={referencePositionState2}
              ReferencePositionState2={setReferencePositionState2}
              ReferenceWorkRelationshipState2={
                setReferenceWorkRelationshipState2
              }
              ReferenceWorkRelationshipValue2={referenceWorkRelationshipState2}
              ReferenceCompanyValue2={referenceCompanyValue2}
              ReferenceCompanyState2={setReferenceCompanyValue2}
              ReferencePhoneNumberValue2={referencePhoneNumberValue2}
              ReferencePhoneNumberState2={setReferencePhoneNumberValue2}
              ReferenceNameValue3={referenceNameState3}
              ReferenceNameState3={setReferenceNameState3}
              ReferencePositionValue3={referencePositionState3}
              ReferencePositionState3={setReferencePositionState3}
              ReferenceWorkRelationshipState3={
                setReferenceWorkRelationshipState3
              }
              ReferenceWorkRelationshipValue3={referenceWorkRelationshipState3}
              ReferenceCompanyValue3={setReferenceCompanyState3}
              ReferenceCompanyState3={referenceCompanyState3}
              ReferencePhoneNumberValue3={referencePhoneNumberState3}
              ReferencePhoneNumberState3={setReferencePhoneNumberState3}
              ReferenceNameValue4={referenceNameState4}
              ReferenceNameState4={setReferenceNameState4}
              ReferencePositionValue4={referencePositionValue4}
              ReferencePositionState4={setReferencePositionValue4}
              ReferenceWorkRelationshipState4={
                setReferenceWorkRelationshipState4
              }
              ReferenceWorkRelationshipValue4={referenceWorkRelationshipState4}
              ReferenceCompanyValue4={referenceCompanyState4}
              ReferenceCompanyState4={setReferenceCompanyState4}
              ReferencePhoneNumberValue4={referencePhoneNumberState4}
              ReferencePhoneNumberState4={setReferencePhoneNumberState4}
            />
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
          <APPLICANTCERTIFICATION setScrollState={setScrollComplete2} />
          <div className=" m-12 flex flex-row justify-center self-center">
            <CheckBox
              disabled={scrollComplete2}
              checkedState={setCheckBoxAgree3}
              isChecked={checkBoxAgree3}
            />
            I acknowledge that I have read and understood American Medical
            Associates's Equal Employee Opportunities.
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
            placeHolder="Signature (Legal Name)"
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
