import { NextPage } from 'next'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import FullPersonalInfo from '../components/formComponents/FullPersonalInfo'
import Header from '../components/Header'
import SocialInput from '../components/SocialInput'
import CustomCheckBoxFeild from '../components/formComponents/CustomCheckBoxFeild'
import SexCheckBox from '../components/formComponents/SexCheckBox'
import Camera from '../components/camera'
import TakeAPictureCustom from '../components/formComponents/TakeAPictureCustom'
import TextInput from '../components/TextInput'
import CustomCheckBox from '../components/formComponents/CustomCheckBox'
import MartialStatus from '../components/formComponents/MartialStatus'
import CustomYesOrNo from '../components/formComponents/CustomYesOrNo'
import SectionWithTitle from '../components/formComponents/SectionWithTitle'
import CheckBox from '../components/CheckBox'
import PhoneNumberInput from '../components/PhoneNumberInput'
import AddressInput from '../components/AddressInput'
import UserCreatedListFromInputBox from '../components/formComponents/UserCreatedListFromInputBox'
import DateInput from '../components/DateInput'
import LineDivider from '../components/lineDiveider'
import Signature from '../components/formComponents/Signature'
import AdvancedDirectivesLivingWill from '../components/formComponents/AdvancedDirectives(livingwill)'
import NoticeOfPrivacyPractices from '../components/formComponents/NoticeOfPrivacyPractices'
import HIPPAconsentForm from '../components/formComponents/HIPPAconsentForm'
import FINANCIALPOLICY from '../components/formComponents/FINANCIALPOLICY'
import MainButton from '../components/MainButton'
import {
  AddPictureOfDriverLicenseToStorageAndToDB,
  AddPictureOfPatientFaceToStorageAndToDB,
  AddPictureOfPatientInsuranceToStorageAndToDB,
  submitNewPatientPacketAndCreateNewPatient,
} from '../firebase'

import { useSelector } from 'react-redux'
import { selectCompany } from '../redux/slices/companySlice'
import Head from 'next/head'

const NewPatientPacket: NextPage<{}> = ({}) => {
  const router = useRouter()
  const company = useSelector(selectCompany)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [addressValue, setAddressValue] = useState('')
  const [addressValue2, setAddressValue2] = useState('')
  const [cityValue, setCityValue] = useState('')
  const [USStateValue, setUSStateValue] = useState('')
  const [zipCodeValue, setZipCodeValue] = useState('')
  const [BirthDateValue, setBirthDateValue] = useState('')
  const [phoneNumberValue, setPhoneNumberValue] = useState('')
  const [homePhone, setHomePhone] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [socialValue, setSocialValue] = useState('')
  const [isCheckedMale, setIsCheckedMale] = useState(false)
  const [isCheckedFemale, setIsCheckedFemale] = useState(false)
  const [isCheckedOther, setIsCheckedOther] = useState(false)
  const [pictureOfFrontOfDriverLicense, setPictureOfFrontOfDriverLicense] =
    useState('')
  const [preferredName, setPreferredName] = useState('')
  const [single, setSingle] = useState(false)
  const [married, setMarried] = useState(false)
  const [divorced, setDivorced] = useState(false)
  const [widowed, setWidowed] = useState(false)
  const [separated, setSeparated] = useState(false)
  const [withPartner, setWithPartner] = useState(false)
  const [MayWeTakeYourPicture, setMayWeTakeYourPicture] = useState(false)
  const [pictureOfTheirFace, setPictureOfTheirFace] = useState('')
  const [Ethnicity, setEthnicity] = useState('')
  const [nameOfEmergencyContact, setNameOfEmergency] = useState('')
  const [EmergencyContactRelationShip, setEmergencyContactRelationShip] =
    useState('')
  const [EmergencyContactPhoneNumber, setEmergencyContactPhoneNumber] =
    useState('')
  const [HowDidTheyHearAboutUs, setHowDidTheyHearAboutUs] = useState('')
  const [howDoTheyWishToPay, setHowDoTheyWishToPay] = useState('')
  const [primaryInsurance, setPrimaryInsurance] = useState('')
  const [primaryInsuranceID, setPrimaryInsuranceID] = useState('')
  const [primaryInsuranceGroup, setPrimaryInsuranceGroup] = useState('')
  const [primaryInsurancePhone, setPrimaryInsurancePhone] = useState('')
  const [primaryInsuranceAddress1, setPrimaryInsuranceAddress1] = useState('')
  const [primaryInsuranceAddress2, setPrimaryInsuranceAddress2] = useState('')
  const [primaryInsuranceCity, setPrimaryInsuranceCity] = useState('')
  const [primaryInsuranceState, setPrimaryInsuranceState] = useState('')
  const [primaryInsuranceZip, setPrimaryInsuranceZip] = useState('')

  const [primarySubscribersName, setPrimarySubscribersName] = useState('')
  const [secondaryInsurance, setSecondaryInsurance] = useState('')
  const [secondaryInsuranceID, setSecondaryInsuranceID] = useState('')
  const [secondaryInsuranceGroup, setSecondaryInsuranceGroup] = useState('')
  const [secondaryInsurancePhone, setSecondaryInsurancePhone] = useState('')
  const [secondaryInsuranceAddress1, setSecondaryInsuranceAddress1] =
    useState('')
  const [secondaryInsuranceAddress2, setSecondaryInsuranceAddress2] =
    useState('')
  const [secondaryInsuranceCity, setSecondaryInsuranceCity] = useState('')
  const [secondaryInsuranceState, setSecondaryInsuranceState] = useState('')
  const [secondaryInsuranceZip, setSecondaryInsuranceZip] = useState('')
  const [secondarySubscribersName, setSecondarySubscribersName] = useState('')
  const [
    primaryPictureOfInsuranceCardFront,
    setPrimaryPictureOfInsuranceCardFront,
  ] = useState('')
  const [
    secondaryPictureOfInsuranceCardFront,
    setSecondaryPictureOfInsuranceCardFront,
  ] = useState('')
  const [retailPharmacyName, setRetailPharmacyName] = useState('')
  const [retailPharmacyCrossStreet1, setRetailPharmacyCrossStreet1] =
    useState('')
  const [retailPharmacyCrossStreet2, setRetailPharmacyCrossStreet2] =
    useState('')
  const [retailPharmacyPhoneNumber, setRetailPharmacyPhoneNumber] = useState('')
  const [retailPharmacyFaxNumber, setRetailPharmacyFaxNumber] = useState('')
  const [mailOrderPharmacyName, setMailOrderPharmacyName] = useState('')
  const [mailOrderPharmacyPhoneNumber, setMailOrderPharmacyPhoneNumber] =
    useState('')
  const [mailOrderPharmacyAddress1, setMailOrderPharmacyAddress1] = useState('')
  const [mailOrderPharmacyAddress2, setMailOrderPharmacyAddress2] = useState('')
  const [mailOrderPharmacyCity, setMailOrderPharmacyCity] = useState('')
  const [mailOrderPharmacyState, setMailOrderPharmacyState] = useState('')
  const [mailOrderPharmacyZip, setMailOrderPharmacyZip] = useState('')
  const [areYouAllergicToLatex, setAreYouAllergicToLatex] = useState('')
  const [areYouAllergicToSelfish, setAreYouAllergicToSelfish] = useState('')
  const [areYouAllergicToIodine, setAreYouAllergicToIodine] = useState('')
  const [doYouHaveAnyDrugAllergies, setDoYouHaveAnyDrugAllergies] = useState('')
  const [PatientDrugAllergies, setPatientDrugAllergies] = useState([])
  const [dateOfLastPAP, setDateOfLastPAP] = useState('')
  const [wasPapNormalOrAbnormal, setWasPapNormalOrAbnormal] = useState('')
  const [dateOfLastMammogram, setDateOfLastMammogram] = useState('')
  const [wasMammogramNormalOrAbnormal, setWasMammogramNormalOrAbnormal] =
    useState('')
  const [dateOfLastPSA, setDateOfLastPSA] = useState('')
  const [wasPSANormalOrAbnormal, setWasPSANormalOrAbnormal] = useState('')
  const [
    doYouHaveAHistoryOfAnyMajorIllness,
    setDoYouHaveAHistoryOfAnyMajorIllness,
  ] = useState('')
  const [allMajorIllnesses, setAllMajorIllnesses] = useState([])
  const [doYouHaveAHistoryOfSurgeries, setDoYouHaveAHistoryOfSurgeries] =
    useState('')
  const [
    allMajorSurgeriesAndHospitalizations,
    setAllMajorSurgeriesAndHospitalizations,
  ] = useState([])
  const [boneDensityScreening, setBoneDensityScreening] = useState('')
  const [BoneDensityScreeningDate, setBoneDensityScreeningDate] = useState('')
  const [
    wasBoneDensityScreeningNormalOrAbnormal,
    setWasBoneDensityScreeningNormalOrAbnormal,
  ] = useState('')
  const [colonoscopyScreening, setColonoscopyScreening] = useState('')
  const [dateOfLastColonoscopyScreening, setDateOfLastColonoscopyScreening] =
    useState('')
  const [
    wasColonoscopyScreeningNormalOrAbnormal,
    setWasColonoscopyScreeningNormalOrAbnormal,
  ] = useState('')
  const [allMedicalHistoryOfDisease, setAllMedicalHistoryOfDisease] = useState(
    []
  )
  const [haveTheyEverSmoked, setHaveTheyEverSmoked] = useState('')
  const [howManyPacksPerDay, setHowManyPacksPerDay] = useState('')
  const [anyOtherTobaccoOrEcigarettes, setAnyOtherTobaccoOrEcigarettes] =
    useState('')
  const [describeOtherTobaccoUse, setDescribeOtherTobaccoUse] = useState('')
  const [doYouDrinkCoffee, setDoYouDrinkCoffee] = useState('')
  const [howManyCupsPerDay, setHowManyCupsPerDay] = useState('')
  const [doYouDrinkAlcohol, setDoYouDrinkAlcohol] = useState('')
  const [howManyDrinksPerWeek, setHowManyDrinksPerWeek] = useState('')
  const [
    doYoCurrentlyUseRecreationalDrugs,
    setDoYoCurrentlyUseRecreationalDrugs,
  ] = useState('')
  const [describeRecreationalDrugUse, setDescribeRecreationalDrugUse] =
    useState('')
  const [doYouUseIllegaLStreetDrugs, setDoYouUseIllegaLStreetDrugs] =
    useState('')
  const [describeIllegalStreetDrugUse, setDescribeIllegalStreetDrugUse] =
    useState('')
  const [doYouFeelDepressed, setDoYouFeelDepressed] = useState('')
  const [doYouCryFrequently, setDoYouCryFrequently] = useState('')
  const [
    doYouHaveLittleInterestInDoingThings,
    setDoYouHaveLittleInterestInDoingThings,
  ] = useState('')
  const [
    doYouFeelHopelessDownOrDepressed,
    setDoYouFeelHopelessDownOrDepressed,
  ] = useState('')
  const [
    doYouHaveTroubleFallingAsleepOrSleepingTooMuch,
    setDoYouHaveTroubleFallingAsleepOrSleepingTooMuch,
  ] = useState('')
  const [
    doYouFeelTiredOrHaveLittleEnergy,
    setDoYouFeelTiredOrHaveLittleEnergy,
  ] = useState('')

  const [
    doYouHavAPoorAppetiteOrOverEating,
    setDoYouHavAPoorAppetiteOrOverEating,
  ] = useState('')
  const [doYouFeelBadAboutYourself, setDoYouFeelBadAboutYourself] = useState('')
  const [troubleConcentrating, setTroubleConcentrating] = useState('')
  const [doYouMoveOrSpeakSlowly, setDoYouMoveOrSpeakSlowly] = useState('')
  const [thoughtsYouWouldBeBetterOffDead, setThoughtsYouWouldBeBetterOffDead] =
    useState('')
  const [isStressAMajorProblem, setIsStressAMajorProblem] = useState('')
  const [doYouPanicWhenStressed, setDoYouPanicWhenStressed] = useState('')

  const [haveYouEverAttemptedSuicide, setHaveYouEverAttemptedSuicide] =
    useState('')

  const [
    familyMedicalAlcoholismAddiction,
    setFamilyMedicalAlcoholismAddiction,
  ] = useState([])
  const [familyMedicalBleedingDisorders, setFamilyMedicalBleedingDisorders] =
    useState([])
  const [familyMedicalCancer, setFamilyMedicalCancer] = useState([])
  const [familyMedicalDiabetes, setFamilyMedicalDiabetes] = useState([])
  const [familyMedicalHeartAttack, setFamilyMedicalHeartAttack] = useState([])
  const [familyMedicalHighBloodPressure, setFamilyMedicalHighBloodPressure] =
    useState([])
  const [familyMedicalHighCholesterol, setFamilyMedicalHighCholesterol] =
    useState([])
  const [familyMedicalKidneyDisease, setFamilyMedicalKidneyDisease] = useState(
    []
  )
  const [familyMedicalMentalIllness, setFamilyMedicalMentalIllness] = useState(
    []
  )
  const [familyMedicalStroke, setFamilyMedicalStroke] = useState([])
  const [familyMedicalTuberculosis, setFamilyMedicalTuberculosis] = useState([])
  const [isYourMotherStillLiving, setIsYourMotherStillLiving] = useState('')
  const [isYourFatherStillLiving, setIsYourFatherStillLiving] = useState('')
  const [
    areYouCurrentlyTakingAnyMedications,
    setAreYouCurrentlyTakingAnyMedications,
  ] = useState('')
  const [listOfAllCurrentMedications, setListOfAllCurrentMedications] =
    useState([])
  const [patientMedicalReviewSignature, setPatientMedicalReviewSignature] =
    useState('')
  const [
    PatientMedicalReviewSignatureCheckBox,
    setPatientMedicalReviewSignatureCheckBox,
  ] = useState(false)
  const [
    patientMedicalReviewSignatureDate,
    setPatientMedicalSignatureReviewDate,
  ] = useState('')
  const [AdvancedDirectives, setAdvancedDirectives] = useState<any>({
    healthCarePowerOfAttorney: '',
    healthCarePowerOfAttorneyName: '',
    doYouHaveALivingWill: '',
    preHospitalMedicalDirectives: '',
    phoneNumber: '',
    date: '',
    signature: '',
    agreeThatTheirSignatureIsValid: false,
  })
  const [hippa, setHippa] = useState<any>({
    name: '',
    relationShip: '',
    name2: '',
    relationShip2: '',
    name3: '',
    relationShip3: '',
    name4: '',
    relationShip4: '',
    hippaSignature: '',
    signatureDate: '',
    signatureCheckBoxConsent: '',
  })
  const [financialPolicySignature, setFinancialPolicySignature] = useState('')

  const [
    financialPolicySignatureCheckBox,
    setFinancialPolicySignatureCheckBox,
  ] = useState(false)
  const [financialPolicySignatureDate, setFinancialPolicySignatureDate] =
    useState('')

  const [refresh, setRefresh] = useState(false)

  return (
    <div className=" mb-10">
      <Head>
        <title>AMA</title>
        <link rel="icon" href="/American Medical Associates.png" />
      </Head>
      <Header selectCompany={'AMA'} />
      <h1 className=" my-20 w-full text-center text-4xl">New Patient Packet</h1>
      <FullPersonalInfo
        lastName={lastName}
        setFirstName={setFirstName}
        firstName={firstName}
        setLastName={setLastName}
        addressValue={addressValue}
        addressValue2={addressValue2}
        cityValue={cityValue}
        USStateValue={USStateValue}
        zipCodeValue={zipCodeValue}
        addressState={setAddressValue}
        addressState2={setAddressValue2}
        cityState={setCityValue}
        USStateState={setUSStateValue}
        zipCodeState={setZipCodeValue}
        BirthDateState={setBirthDateValue}
        BirthDateValue={BirthDateValue}
        phoneNumberValue={phoneNumberValue}
        phoneNumberState={setPhoneNumberValue}
        emailState={setEmailValue}
        emailValue={emailValue}
      />
      <PhoneNumberInput
        placeHolder="Home Phone Number"
        value={homePhone}
        onChange={(text: any) => setHomePhone(text.target.value)}
        widthPercentage="w-1/2"
        id={'homePhone'}
      />
      <SocialInput
        placeHolder="Social Security Number"
        widthPercentage="w-1/2"
        value={socialValue}
        onChange={(text: any) => {
          setSocialValue(text.target.value)
        }}
        id={'social'}
      />
      <SexCheckBox
        id="sexCheckBox"
        isCheckedMale={isCheckedMale}
        checkedStateMale={setIsCheckedMale}
        isCheckedFemale={isCheckedFemale}
        checkedStateFemale={setIsCheckedFemale}
        isCheckedOther={isCheckedOther}
        checkedStateOther={setIsCheckedOther}
      />
      <TakeAPictureCustom
        id="takeAPictureOfDriverLicense"
        text="Take A Picture Of The Front Of Your Driver License"
        picture={pictureOfFrontOfDriverLicense}
        setPicture={setPictureOfFrontOfDriverLicense}
        key={1}
      />
      <TextInput
        id="preferredName"
        placeHolder="Preferred Name"
        widthPercentage="w-1/2"
        onChange={(text: any) => {
          setPreferredName(text.target.value)
        }}
        value={preferredName}
      />
      <MartialStatus
        id="martialStatus"
        isCheckedSingle={single}
        checkedStateSingle={setSingle}
        isCheckedMarried={married}
        checkedStateMarried={setMarried}
        isCheckedDivorced={divorced}
        checkedStateDivorced={setDivorced}
        isCheckedWidowed={widowed}
        checkedStateWidowed={setWidowed}
        isCheckedSeparated={separated}
        checkedStateSeparated={setSeparated}
        checkedStateWithPartner={setWithPartner}
        isCheckedWithPartner={withPartner}
      />
      <CustomYesOrNo
        marginLeft="pl-[25%]"
        text="May we take your Picture for your Electronic Medical Record?"
        CheckState={setMayWeTakeYourPicture}
        id="mayWeTakeYourPicture"
      />
      <TakeAPictureCustom
        text="Take A Picture Of You"
        picture={pictureOfTheirFace}
        setPicture={setPictureOfTheirFace}
        key={2}
        id="pictureOfTheirFace"
      />
      <CustomCheckBoxFeild
        id="Ethnicity"
        checkBoxValues={Ethnicity}
        allowMultipleCheckBoxes={false}
        title="Ethnicity"
        setCheckBoxValues={setEthnicity}
        marginLeft="ml-[25%]"
        checkBoxTitles={[
          'White',
          'Asian',
          'Native Hawaiian/ Pacific Islander',
          'Black/African American',
          'American Indian/Alaskan Native',
          'Hispanic/Latino',
          'Prefer not to answer',
          'Other',
        ]}
        howManyCheckBoxes={8}
      />
      ,
      <SectionWithTitle
        title="Emergency Contact"
        subTitle="Please provide the name and phone number of a person we can contact in case of an emergency."
        BgColor="bg-[#e9e7e7b1]"
        children={[
          <TextInput
            id="emergencyContactName"
            placeHolder="Name of Emergency Contact"
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setNameOfEmergency(text.target.value)
            }}
            value={nameOfEmergencyContact}
          />,
          <TextInput
            id="emergencyContactRelationship"
            placeHolder="Relationship"
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setEmergencyContactRelationShip(text.target.value)
            }}
            value={EmergencyContactRelationShip}
          />,
          <PhoneNumberInput
            id="emergencyContactPhoneNumber"
            placeHolder="Phone Number"
            widthPercentage="w-1/2"
            value={EmergencyContactPhoneNumber}
            onChange={(text: any) => {
              setEmergencyContactPhoneNumber(text.target.value)
            }}
          />,
        ]}
      />
      <CustomCheckBoxFeild
        id="howDidYouHearAboutUs"
        checkBoxValues={HowDidTheyHearAboutUs}
        allowMultipleCheckBoxes={false}
        title="How did you hear about us?"
        setCheckBoxValues={setHowDidTheyHearAboutUs}
        marginLeft="ml-[25%]"
        checkBoxTitles={[
          'Google',
          'Facebook',
          'Instagram',
          'Friend',
          'TikTok',
          'Online Ad',
          'Yelp',
          'Email',
          'Other',
        ]}
        howManyCheckBoxes={0}
      />
      <CustomCheckBoxFeild
        id="howDoTheyWishToPay"
        checkBoxValues={howDoTheyWishToPay}
        allowMultipleCheckBoxes={false}
        marginLeft="ml-[25%]"
        title="How do you wish to pay for your care?"
        setCheckBoxValues={setHowDoTheyWishToPay}
        checkBoxTitles={['Out of Pocket', 'Insurance']}
        howManyCheckBoxes={2}
      />
      {howDoTheyWishToPay === 'Insurance' && (
        <SectionWithTitle
          title="Primary Insurance Information"
          subTitle="Please provide all Primary insurance information"
          BgColor="bg-[#e9e7e7b1]"
          children={[
            <TextInput
              id="insuranceName"
              placeHolder="Primary Insurance"
              widthPercentage="w-1/2"
              onChange={(text: any) => {
                setPrimaryInsurance(text.target.value)
              }}
              value={primaryInsurance}
            />,
            <TextInput
              id="insurancePolicyNumber"
              placeHolder="Primary Insurance ID"
              widthPercentage="w-1/2"
              onChange={(text: any) => {
                setPrimaryInsuranceID(text.target.value)
              }}
              value={primaryInsuranceID}
            />,
            <TextInput
              id="insuranceGroupNumber"
              placeHolder="Primary Insurance Group"
              widthPercentage="w-1/2"
              onChange={(text: any) => {
                setPrimaryInsuranceGroup(text.target.value)
              }}
              value={primaryInsuranceGroup}
            />,
            <TextInput
              id="insurancePhoneNumber"
              placeHolder="primary Insurance Phone Number"
              widthPercentage="w-1/2"
              onChange={(text: any) => {
                setPrimaryInsurancePhone(text.target.value)
              }}
              value={primaryInsurancePhone}
            />,
            <div className=" flex w-full items-center justify-center">
              <AddressInput
                id="insuranceAddress"
                addressValue={primaryInsuranceAddress1}
                addressState={setPrimaryInsuranceAddress1}
                addressState2={setPrimaryInsuranceAddress2}
                addressValue2={primaryInsuranceAddress2}
                cityValue={primaryInsuranceCity}
                cityState={setPrimaryInsuranceCity}
                USStateValue={primaryInsuranceState}
                USStateState={setPrimaryInsuranceState}
                zipCodeValue={primaryInsuranceZip}
                zipCodeState={setPrimaryInsuranceZip}
              />
            </div>,
            <TextInput
              id="subscriberName"
              placeHolder="Subscriber Name"
              widthPercentage="w-1/2"
              onChange={(text: any) => {
                setPrimarySubscribersName(text.target.value)
              }}
              value={primarySubscribersName}
            />,
            <div className=" flex w-full items-center justify-center ">
              <TakeAPictureCustom
                id="insuranceCardPicture"
                text="Take A Picture Of Your Insurance Card (Front)"
                picture={primaryPictureOfInsuranceCardFront}
                setPicture={setPrimaryPictureOfInsuranceCardFront}
                key={3}
              />
            </div>,
          ]}
        />
      )}
      {howDoTheyWishToPay === 'Insurance' && (
        <SectionWithTitle
          title="Secondary Insurance Information"
          subTitle="Please provide all secondary insurance information."
          BgColor="bg-[#e9e7e7b1]"
          children={[
            <TextInput
              placeHolder="Secondary Insurance"
              widthPercentage="w-1/2"
              onChange={(text: any) => {
                setSecondaryInsurance(text.target.value)
              }}
              value={secondaryInsurance}
            />,
            <TextInput
              placeHolder="Secondary Insurance ID"
              widthPercentage="w-1/2"
              onChange={(text: any) => {
                setSecondaryInsuranceID(text.target.value)
              }}
              value={secondaryInsuranceID}
            />,
            <TextInput
              placeHolder="Secondary Insurance Group"
              widthPercentage="w-1/2"
              onChange={(text: any) => {
                setSecondaryInsuranceGroup(text.target.value)
              }}
              value={secondaryInsuranceGroup}
            />,
            <TextInput
              placeHolder="Secondary Insurance Phone Number"
              widthPercentage="w-1/2"
              onChange={(text: any) => {
                setSecondaryInsurancePhone(text.target.value)
              }}
              value={secondaryInsurancePhone}
            />,
            <div className=" flex w-full items-center justify-center">
              <AddressInput
                addressValue={secondaryInsuranceAddress1}
                addressState={setSecondaryInsuranceAddress1}
                addressState2={setSecondaryInsuranceAddress2}
                addressValue2={secondaryInsuranceAddress2}
                cityValue={secondaryInsuranceCity}
                cityState={setSecondaryInsuranceCity}
                USStateValue={secondaryInsuranceState}
                USStateState={setSecondaryInsuranceState}
                zipCodeValue={secondaryInsuranceZip}
                zipCodeState={setSecondaryInsuranceZip}
              />
            </div>,
            <TextInput
              placeHolder="Subscriber Name"
              widthPercentage="w-1/2"
              onChange={(text: any) => {
                setSecondarySubscribersName(text.target.value)
              }}
              value={secondarySubscribersName}
            />,
            // <div className=" flex w-full items-center justify-center ">
            //   <TakeAPictureCustom
            //     text="Take A Picture Of Your Insurance Card (Front)"
            //     picture={secondaryPictureOfInsuranceCardFront}
            //     setPicture={setSecondaryPictureOfInsuranceCardFront}
            //   />
            // </div>,
          ]}
        />
      )}
      <SectionWithTitle
        title="Pharmacy Information"
        subTitle="Please provide all pharmacy information"
        BgColor="bg-[#e9e7e7b1]"
        children={[
          <TextInput
            id="pharmacyName"
            placeHolder="Retail Pharmacy Name"
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setRetailPharmacyName(text.target.value)
            }}
            value={retailPharmacyName}
          />,
          <div className=" flex w-full flex-col items-center justify-center">
            <h4 className=" text-center">Retail Pharmacy Cross Streets</h4>
            <div className="flex w-full flex-col items-center justify-center md:flex-row">
              <TextInput
                id="pharmacyCrossStreet1"
                placeHolder="Street 1"
                widthPercentage="w-3/4"
                onChange={(text: any) => {
                  setRetailPharmacyCrossStreet1(text.target.value)
                }}
                value={retailPharmacyCrossStreet1}
              />
              <TextInput
                id="pharmacyCrossStreet2"
                placeHolder="Street 2"
                widthPercentage="w-3/4"
                onChange={(text: any) => {
                  setRetailPharmacyCrossStreet2(text.target.value)
                }}
                value={retailPharmacyCrossStreet2}
              />
            </div>
          </div>,
          <PhoneNumberInput
            id="pharmacyPhoneNumber"
            placeHolder="Retail Pharmacy Phone Number"
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setRetailPharmacyPhoneNumber(text.target.value)
            }}
            value={retailPharmacyPhoneNumber}
          />,
          <PhoneNumberInput
            id="pharmacyFaxNumber"
            placeHolder="Retail Pharmacy Fax Number"
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setRetailPharmacyFaxNumber(text.target.value)
            }}
            value={retailPharmacyFaxNumber}
          />,
        ]}
      />
      <SectionWithTitle
        title="Mail Order Pharmacy Information"
        subTitle="Please provide all mail order pharmacy information"
        BgColor="bg-[#e9e7e7b1]"
        children={[
          <TextInput
            placeHolder="Mail Order Pharmacy Name"
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setMailOrderPharmacyName(text.target.value)
            }}
            value={mailOrderPharmacyName}
          />,
          <AddressInput
            addressValue={mailOrderPharmacyAddress1}
            addressState={setMailOrderPharmacyAddress1}
            addressState2={setMailOrderPharmacyAddress2}
            addressValue2={mailOrderPharmacyAddress2}
            cityValue={mailOrderPharmacyCity}
            cityState={setMailOrderPharmacyCity}
            USStateValue={mailOrderPharmacyState}
            USStateState={setMailOrderPharmacyState}
            zipCodeValue={mailOrderPharmacyZip}
            zipCodeState={setMailOrderPharmacyZip}
          />,
          <PhoneNumberInput
            placeHolder="Mail Order Pharmacy Phone Number"
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setMailOrderPharmacyPhoneNumber(text.target.value)
            }}
            value={mailOrderPharmacyPhoneNumber}
          />,
        ]}
      />
      <div className=" mt-20 flex items-center justify-center">
        <LineDivider
          lineColor="bg-[#e9e7e7b1]"
          lineWidth="w-3/4"
          lineHeight="h-[10px]"
        />
      </div>
      <SectionWithTitle
        title="Patient Medical Review"
        subTitle="Please provide all patient medical information"
        BgColor="bg-[#ffffff]"
        children={[
          <CustomYesOrNo
            id="allergicToLatex"
            marginLeft="pl-[5%]"
            text="Allergic to Latex?"
            CheckState={setAreYouAllergicToLatex}
          />,
          <CustomYesOrNo
            id="allergicToShellfish"
            marginLeft="pl-[5%]"
            text="Allergic to Shellfish?"
            CheckState={setAreYouAllergicToSelfish}
          />,
          <CustomYesOrNo
            id="allergicToIodine"
            marginLeft="pl-[5%]"
            text="Allergic to Iodine?"
            CheckState={setAreYouAllergicToIodine}
          />,
          <CustomYesOrNo
            id="doYouHaveDrugAllergies?"
            marginLeft="pl-[5%]"
            text="Do you have any medication or drug allergies?"
            CheckState={setDoYouHaveAnyDrugAllergies}
          />,
          doYouHaveAnyDrugAllergies === 'Yes' && (
            <UserCreatedListFromInputBox
              id="drugAllergies"
              title="Please type each individual drug you are allergic to and press add item to add it to the list."
              list={PatientDrugAllergies}
              inputBoxPlaceHolder="Drug Allergies"
            />
          ),
        ]}
      />
      <SectionWithTitle
        subTitle="For female patients only"
        BgColor="bg-[#e9e7e7b1]"
        children={[
          <DateInput
            placeHolder="Date of Last Pap Smear (mmddyyyy)"
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setDateOfLastPAP(text.target.value)
            }}
            value={dateOfLastPAP}
          />,

          <CustomCheckBoxFeild
            title="Was the Pap Smear Normal?"
            checkBoxValues={wasPapNormalOrAbnormal}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['Normal', 'Abnormal']}
            setCheckBoxValues={setWasPapNormalOrAbnormal}
            marginLeft="ml-[25%]"
            howManyCheckBoxes={2}
          />,
          <DateInput
            placeHolder="Date of Last Mammogram (mmddyyyy)"
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setDateOfLastMammogram(text.target.value)
            }}
            value={dateOfLastMammogram}
          />,
          <CustomCheckBoxFeild
            title="Was the Mammogram Normal?"
            checkBoxValues={wasMammogramNormalOrAbnormal}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['Normal', 'Abnormal']}
            setCheckBoxValues={setWasMammogramNormalOrAbnormal}
            marginLeft="ml-[25%]"
            howManyCheckBoxes={2}
          />,
        ]}
      />
      <SectionWithTitle
        subTitle="For male Patient's only"
        BgColor="bg-[#e9e7e7b1]"
        children={[
          <DateInput
            placeHolder="Date of Last PSA (mmddyyyy)"
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setDateOfLastPSA(text.target.value)
            }}
            value={dateOfLastPSA}
          />,
          <CustomCheckBoxFeild
            title="Was the PSA Normal?"
            checkBoxValues={wasPSANormalOrAbnormal}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['Normal', 'Abnormal']}
            setCheckBoxValues={setWasPSANormalOrAbnormal}
            marginLeft="ml-[25%]"
            howManyCheckBoxes={2}
          />,
        ]}
      />
      <CustomYesOrNo
        id="doYouHaveAnyMajorIllnesses"
        marginLeft="ml-[25%]"
        text="Do you have a history or currently have any major illnesses?"
        CheckState={setDoYouHaveAHistoryOfAnyMajorIllness}
      />
      {doYouHaveAHistoryOfAnyMajorIllness === 'Yes' && (
        <UserCreatedListFromInputBox
          id="majorIllnesses"
          title='Please list all major illnesses individually and press "Add Item" to add it to the list.'
          inputBoxPlaceHolder="Major Illnesses"
          list={allMajorIllnesses}
        />
      )}
      <CustomYesOrNo
        id="doYouHaveAnySurgeries"
        marginLeft="ml-[25%]"
        text="Do you have a history of any major surgeries or Hospitalizations?"
        CheckState={setDoYouHaveAHistoryOfSurgeries}
      />
      {doYouHaveAHistoryOfSurgeries === 'Yes' && (
        <UserCreatedListFromInputBox
          id="majorSurgeries"
          title='Please list All Surgeries individually and press "Add Item" to add it to the list.'
          inputBoxPlaceHolder="Surgeries and Hospitalizations"
          showDateField={true}
          list={allMajorSurgeriesAndHospitalizations}
          dateFieldPlaceHolder="Date of Surgery or Hospitalizations (mmddyyyy)"
        />
      )}
      <SectionWithTitle
        subTitle="Select What Screenings you have had."
        BgColor="bg-[#e9e7e7b1]"
        children={[
          <CustomYesOrNo
            id="haveYouHadBoneDensityScreening"
            marginLeft="ml-[25%]"
            text="Have  you had a Bone Density screening?"
            CheckState={setBoneDensityScreening}
          />,
          boneDensityScreening == 'Yes' && (
            <DateInput
              id="dateOfBoneDensityScreening"
              placeHolder="Date of Last Bone Density Screening (mmddyyyy)"
              widthPercentage="w-1/2"
              onChange={(text: any) => {
                setBoneDensityScreeningDate(text.target.value)
              }}
              value={BoneDensityScreeningDate}
            />
          ),
          boneDensityScreening == 'Yes' && (
            <CustomCheckBoxFeild
              id="boneDensityScreeningResults"
              title="Was the Bone Density Screening Normal?"
              checkBoxValues={wasBoneDensityScreeningNormalOrAbnormal}
              allowMultipleCheckBoxes={false}
              checkBoxTitles={['Normal', 'Abnormal']}
              setCheckBoxValues={setWasBoneDensityScreeningNormalOrAbnormal}
              marginLeft="ml-[25%]"
              howManyCheckBoxes={2}
            />
          ),
          <CustomYesOrNo
            id="haveYouHadColonoscopy"
            marginLeft="ml-[25%]"
            text="Have you had a Colonoscopy screening?"
            CheckState={setColonoscopyScreening}
          />,
          colonoscopyScreening == 'Yes' && (
            <DateInput
              id="dateOfColonoscopyScreening"
              placeHolder="Date of Last Colonoscopy (mmddyyyy)"
              widthPercentage="w-1/2"
              onChange={(text: any) => {
                setDateOfLastColonoscopyScreening(text.target.value)
              }}
              value={dateOfLastColonoscopyScreening}
            />
          ),
          colonoscopyScreening == 'Yes' && (
            <CustomCheckBoxFeild
              id="colonoscopyScreeningResults"
              title="Was the Colonoscopy Normal?"
              checkBoxValues={wasColonoscopyScreeningNormalOrAbnormal}
              allowMultipleCheckBoxes={false}
              checkBoxTitles={['Normal', 'Abnormal']}
              setCheckBoxValues={setWasColonoscopyScreeningNormalOrAbnormal}
              marginLeft="ml-[25%]"
              howManyCheckBoxes={2}
            />
          ),
        ]}
      />
      <SectionWithTitle
        title="Medical History"
        subTitle="Check if you have had the following (check ALL that apply):"
        BgColor="#ffffff"
        children={[
          <CustomCheckBoxFeild
            checkBoxValues={allMedicalHistoryOfDisease}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              "Crohn's Disease",
              'Pelvic Infection',
              'Anemia',
              'Pneumonia',
              "Lyme's Disease",
              'Hemochromatosis',
              'Diabetes: Type I or II',
              'Arthritis',
              'Hepatitis A, B or C',
              'Dialysis',
              'Asthma',
              'Migraines/Headaches',
              'Auto-Immune Disorder(s)',
              'MTHFR',
              'Eczema',
              'Scleroderma',
              'Bleeding Disorder',
              'Hysterectomy',
              'Shingles',
              'Fibromyalgia',
              'Hormone Replacement',

              'Gallstones',

              'Gastroparesis',
              'Glaucoma',
              'Kidney Stones',

              'Clotting Disorder',
              'Congestive Heart Failure',
              'Heart Disease',
              'COPD',
              'Gall Bladder Disease',
              'Liver Disease',

              'POLIO',
              'HIV/AIDS',
              'STD/STI',
              'Stroke',
              'Tuberculosis',
              'Heart Murmur',
              'Lupus',
              'Alcoholism/Addiction',
              'Heart Valve',
              'Drug Dependency',
              'Measles',
              'Psoriasis',
              'Rheumatic Fever',
              'Meningitis',
              'Diverticulitis',
              'Hiatal Hernia',
              'Rheumatoid Arthritis',
              'Scarlet Fever',
              'High Cholesterol',
              'Emphysema',

              'Multiple Sclerosis',
              'Epilepsy',
              'Mumps',
              'Cataracts',

              'Hypertension',
              'Osteoporosis',

              'Joint Replacement',
              'PCOS',
              'Kidney Disease',
              'Colitis',
              'POTS',
              'Anxiety/Depression',
              'Cancer',
              'Chicken Pox',
              'Connective Tissue Disorder',
              'Gout',

              'Leg Cramps',
              'Pacemaker',

              'Prostate Condition',
              'Stent Placement',
              'Stomach Ulcers',
              'Thyroid Disorder',
              'Vitiligo',
            ].sort()}
            setCheckBoxValues={setAllMedicalHistoryOfDisease}
          />,
          <CustomYesOrNo
            id="haveYouEverSmoked"
            text="Have you ever Smoked?"
            CheckState={setHaveTheyEverSmoked}
          />,
          <TextInput
            id="howManyPacksPerDay"
            placeHolder="If Yes, how many packs per day?"
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setHowManyPacksPerDay(text.target.value)
            }}
            value={howManyPacksPerDay}
          />,
          <CustomYesOrNo
            id="otherTabaccoUse"
            text="any other tobacco, vap or e-cig products?"
            CheckState={setAnyOtherTobaccoOrEcigarettes}
          />,
          <TextInput
            id="describeOtherTobaccoUse"
            placeHolder="If yes, please describe."
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setDescribeOtherTobaccoUse(text.target.value)
            }}
            value={describeOtherTobaccoUse}
          />,
          <CustomYesOrNo
            id="doYouUseRecreationalDrugs"
            text="Have you ever used recreational drugs?"
            CheckState={setDoYoCurrentlyUseRecreationalDrugs}
          />,
          <TextInput
            id="describeRecreationalDrugUse"
            placeHolder="If yes, please describe."
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setDescribeRecreationalDrugUse(text.target.value)
            }}
            value={describeRecreationalDrugUse}
          />,
          <CustomYesOrNo
            id="doYouDrinkAlcohol"
            text="do you drink alcohol"
            CheckState={setDoYouDrinkAlcohol}
          />,
          <TextInput
            id="howManyDrinksPerWeek"
            placeHolder="If yes, how many drinks per week?"
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setHowManyDrinksPerWeek(text.target.value)
            }}
            value={howManyDrinksPerWeek}
          />,
          <CustomYesOrNo
            id="doYouDrinkCoffee"
            text="Do you drink Caffinated Beverages | coffee?"
            CheckState={setDoYouDrinkCoffee}
          />,
          <TextInput
            id="howManyCupsPerDay"
            placeHolder="If yes, how many cups per day?"
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setHowManyCupsPerDay(text.target.value)
            }}
            value={howManyCupsPerDay}
          />,
          <CustomYesOrNo
            id="doYouUseIllegaLStreetDrugs"
            text="Do you use illegal street drugs?"
            CheckState={setDoYouUseIllegaLStreetDrugs}
          />,
          <TextInput
            id="describeIllegalStreetDrugUse"
            placeHolder="If yes, please describe."
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setDescribeIllegalStreetDrugUse(text.target.value)
            }}
            value={describeIllegalStreetDrugUse}
          />,
        ]}
      />
      <SectionWithTitle
        title="Mental Health Questions"
        subTitle="Check if you have had the following (check ALL that apply):"
        BgColor="bg-[#e9e7e7b1]"
        children={[
          <CustomYesOrNo
            id="doYouFeelDepressed"
            text="Do you feel depressed?"
            CheckState={setDoYouFeelDepressed}
          />,
          <div>
            {doYouFeelDepressed == 'Yes' && (
              <div>
                <CustomYesOrNo
                  id="doYouCryFrequently"
                  text="Do you Cry Frequently?"
                  CheckState={setDoYouCryFrequently}
                />
                <CustomCheckBoxFeild
                  id="doYouHaveLittleInterest"
                  title="Do you have little interest or pleasure in doing things?"
                  checkBoxTitles={[
                    'Not at all',
                    'Several days',
                    'More than half the days',
                    'Nearly every day',
                  ]}
                  checkBoxValues={doYouHaveLittleInterestInDoingThings}
                  setCheckBoxValues={setDoYouHaveLittleInterestInDoingThings}
                  allowMultipleCheckBoxes={false}
                />
                <CustomCheckBoxFeild
                  id="doYouFeelHopeless"
                  title="Do you feel down, depressed, or hopeless?"
                  checkBoxTitles={[
                    'Not at all',
                    'Several days',
                    'More than half the days',
                    'Nearly every day',
                  ]}
                  checkBoxValues={doYouFeelHopelessDownOrDepressed}
                  setCheckBoxValues={setDoYouFeelHopelessDownOrDepressed}
                  allowMultipleCheckBoxes={false}
                />
                <CustomCheckBoxFeild
                  id="doYouHaveTroubleFallingAsleep"
                  title="Do you have trouble falling or staying asleep, or sleeping too much?"
                  checkBoxTitles={[
                    'Not at all',
                    'Several days',
                    'More than half the days',
                    'Nearly every day',
                  ]}
                  checkBoxValues={
                    doYouHaveTroubleFallingAsleepOrSleepingTooMuch
                  }
                  setCheckBoxValues={
                    setDoYouHaveTroubleFallingAsleepOrSleepingTooMuch
                  }
                  allowMultipleCheckBoxes={false}
                />
                <CustomCheckBoxFeild
                  id="doYouFeelTired"
                  title="Do you feel tired or have little energy?"
                  checkBoxTitles={[
                    'Not at all',
                    'Several days',
                    'More than half the days',
                    'Nearly every day',
                  ]}
                  checkBoxValues={doYouFeelTiredOrHaveLittleEnergy}
                  setCheckBoxValues={setDoYouFeelTiredOrHaveLittleEnergy}
                  allowMultipleCheckBoxes={false}
                />
                <CustomCheckBoxFeild
                  id="doYouHavAPoorAppetite"
                  title="Do you have poor appetite or overeating?"
                  checkBoxTitles={[
                    'Not at all',
                    'Several days',
                    'More than half the days',
                    'Nearly every day',
                  ]}
                  checkBoxValues={doYouHavAPoorAppetiteOrOverEating}
                  setCheckBoxValues={setDoYouHavAPoorAppetiteOrOverEating}
                  allowMultipleCheckBoxes={false}
                />
                <CustomCheckBoxFeild
                  id="doYouFeelBadAboutYourself"
                  title="Do you feel bad about yourself or that you are a failure or have let yourself or your family down?"
                  checkBoxTitles={[
                    'Not at all',
                    'Several days',
                    'More than half the days',
                    'Nearly every day',
                  ]}
                  checkBoxValues={doYouFeelBadAboutYourself}
                  setCheckBoxValues={setDoYouFeelBadAboutYourself}
                  allowMultipleCheckBoxes={false}
                />
                <CustomCheckBoxFeild
                  id="troubleConcentrating"
                  title="Do you have trouble concentrating on things, such as reading the newspaper or watching television?"
                  checkBoxTitles={[
                    'Not at all',
                    'Several days',
                    'More than half the days',
                    'Nearly every day',
                  ]}
                  checkBoxValues={troubleConcentrating}
                  setCheckBoxValues={setTroubleConcentrating}
                  allowMultipleCheckBoxes={false}
                />
                <CustomCheckBoxFeild
                  id="doYouMoveOrSpeakSlowly"
                  title="Do you move or speak so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?"
                  checkBoxTitles={[
                    'Not at all',
                    'Several days',
                    'More than half the days',
                    'Nearly every day',
                  ]}
                  checkBoxValues={doYouMoveOrSpeakSlowly}
                  setCheckBoxValues={setDoYouMoveOrSpeakSlowly}
                  allowMultipleCheckBoxes={false}
                />
                <CustomCheckBoxFeild
                  id="thoughtsYouWouldBeBetterOffDead"
                  title="Do you have thoughts that you would be better off dead, or of hurting yourself?"
                  checkBoxTitles={[
                    'Not at all',
                    'Several days',
                    'More than half the days',
                    'Nearly every day',
                  ]}
                  checkBoxValues={thoughtsYouWouldBeBetterOffDead}
                  setCheckBoxValues={setThoughtsYouWouldBeBetterOffDead}
                  allowMultipleCheckBoxes={false}
                />

                <CustomYesOrNo
                  id="isStressAMajorProblemForYou"
                  text="Is stress a major problem for you?"
                  CheckState={setIsStressAMajorProblem}
                />
                <CustomYesOrNo
                  id="doYouPanicWhenStressed"
                  text="Do you panic when stressed?"
                  CheckState={setDoYouPanicWhenStressed}
                />
                <CustomYesOrNo
                  id="HaveYouAttemptedSuicide"
                  text="Have you ever attempted suicide or seriously thought about hurting yourself?"
                  CheckState={setHaveYouEverAttemptedSuicide}
                />
              </div>
            )}
          </div>,
        ]}
      />
      <SectionWithTitle
        title="Family Medical History"
        subTitle="Select one or more family members if they had any of the medical conditions below."
        BgColor="bg-[#e9e7e7b1]"
        children={[
          <CustomCheckBoxFeild
            title="Alcoholism/Addiction"
            checkBoxTitles={[
              'Mother',
              'Father',
              'Maternal Mother',
              'Maternal Father',
              'Paternal Mother',
              'Paternal Father',
            ]}
            setCheckBoxValues={setFamilyMedicalAlcoholismAddiction}
            checkBoxValues={familyMedicalAlcoholismAddiction}
            allowMultipleCheckBoxes={true}
          />,
          <CustomCheckBoxFeild
            title="Bleeding Disorder"
            checkBoxTitles={[
              'Mother',
              'Father',
              'Maternal Mother',
              'Maternal Father',
              'Paternal Mother',
              'Paternal Father',
            ]}
            setCheckBoxValues={setFamilyMedicalBleedingDisorders}
            checkBoxValues={familyMedicalBleedingDisorders}
            allowMultipleCheckBoxes={true}
          />,
          <CustomCheckBoxFeild
            title="Cancer"
            checkBoxTitles={[
              'Mother',
              'Father',
              'Maternal Mother',
              'Maternal Father',
              'Paternal Mother',
              'Paternal Father',
            ]}
            setCheckBoxValues={setFamilyMedicalCancer}
            checkBoxValues={familyMedicalCancer}
            allowMultipleCheckBoxes={true}
          />,
          <CustomCheckBoxFeild
            title="Diabetes"
            checkBoxTitles={[
              'Mother',
              'Father',
              'Maternal Mother',
              'Maternal Father',
              'Paternal Mother',
              'Paternal Father',
            ]}
            setCheckBoxValues={setFamilyMedicalDiabetes}
            checkBoxValues={familyMedicalDiabetes}
            allowMultipleCheckBoxes={true}
          />,
          <CustomCheckBoxFeild
            title="Heart Attack"
            checkBoxTitles={[
              'Mother',
              'Father',
              'Maternal Mother',
              'Maternal Father',
              'Paternal Mother',
              'Paternal Father',
            ]}
            setCheckBoxValues={setFamilyMedicalHeartAttack}
            checkBoxValues={familyMedicalHeartAttack}
            allowMultipleCheckBoxes={true}
          />,
          <CustomCheckBoxFeild
            title="High Blood Pressure"
            checkBoxTitles={[
              'Mother',
              'Father',
              'Maternal Mother',
              'Maternal Father',
              'Paternal Mother',
              'Paternal Father',
            ]}
            setCheckBoxValues={setFamilyMedicalHighBloodPressure}
            checkBoxValues={familyMedicalHighBloodPressure}
            allowMultipleCheckBoxes={true}
          />,
          <CustomCheckBoxFeild
            title="High Cholesterol"
            checkBoxTitles={[
              'Mother',
              'Father',
              'Maternal Mother',
              'Maternal Father',
              'Paternal Mother',
              'Paternal Father',
            ]}
            setCheckBoxValues={setFamilyMedicalHighCholesterol}
            checkBoxValues={familyMedicalHighCholesterol}
            allowMultipleCheckBoxes={true}
          />,
          <CustomCheckBoxFeild
            title="Kidney Disease"
            checkBoxTitles={[
              'Mother',
              'Father',
              'Maternal Mother',
              'Maternal Father',
              'Paternal Mother',
              'Paternal Father',
            ]}
            setCheckBoxValues={setFamilyMedicalKidneyDisease}
            checkBoxValues={familyMedicalKidneyDisease}
            allowMultipleCheckBoxes={true}
          />,
          <CustomCheckBoxFeild
            title="Mental Health Disorders"
            checkBoxTitles={[
              'Mother',
              'Father',
              'Maternal Mother',
              'Maternal Father',
              'Paternal Mother',
              'Paternal Father',
            ]}
            setCheckBoxValues={setFamilyMedicalMentalIllness}
            checkBoxValues={familyMedicalMentalIllness}
            allowMultipleCheckBoxes={true}
          />,
          <CustomCheckBoxFeild
            title="Stroke"
            checkBoxTitles={[
              'Mother',
              'Father',
              'Maternal Mother',
              'Maternal Father',
              'Paternal Mother',
              'Paternal Father',
            ]}
            setCheckBoxValues={setFamilyMedicalStroke}
            checkBoxValues={familyMedicalStroke}
            allowMultipleCheckBoxes={true}
          />,
          <CustomCheckBoxFeild
            title="Tuberculosis"
            checkBoxTitles={[
              'Mother',
              'Father',
              'Maternal Mother',
              'Maternal Father',
              'Paternal Mother',
              'Paternal Father',
            ]}
            setCheckBoxValues={setFamilyMedicalTuberculosis}
            checkBoxValues={familyMedicalTuberculosis}
            allowMultipleCheckBoxes={true}
          />,
          <CustomYesOrNo
            text="Is your mother still alive?"
            CheckState={setIsYourMotherStillLiving}
          />,
          <CustomYesOrNo
            text="Is your father still alive?"
            CheckState={setIsYourFatherStillLiving}
          />,
        ]}
      />
      <SectionWithTitle
        title="Medications"
        children={[
          <CustomYesOrNo
            text="Are you currently taking any medications?"
            CheckState={setAreYouCurrentlyTakingAnyMedications}
            id="areYouCurrentlyTakingAnyMedications"
          />,
          areYouCurrentlyTakingAnyMedications === 'Yes' && (
            <UserCreatedListFromInputBox
              title="Please type all medications you are currently taking individually then click add item to add them to the list."
              showAddDrugFields={true}
              list={listOfAllCurrentMedications}
              id="listOfAllCurrentMedications"
            />
          ),
        ]}
      />
      <Signature
        signatureValue={patientMedicalReviewSignature}
        signatureState={setPatientMedicalReviewSignature}
        agreeThatTheirSignatureIsValid={PatientMedicalReviewSignatureCheckBox}
        agreeThatTheirSignatureIsValidState={
          setPatientMedicalReviewSignatureCheckBox
        }
        date={patientMedicalReviewSignatureDate}
        dateState={setPatientMedicalSignatureReviewDate}
        WhatTheyAreSigningFor="I certify that the information provided in this form is true and correct to the best of my knowledge and I have Listed ALL surgeries,hospitalizations,major illnesses, medications,supplements, and noted ANY medical conditions(s) past and current. I understand that it is my responsibility to inform my physician if I, or my minor child of any changes in my medical history."
      />
      <div className=" mt-20 flex items-center justify-center">
        <LineDivider
          lineColor="bg-[#e9e7e7b1]"
          lineWidth="w-3/4"
          lineHeight="h-[10px]"
        />
      </div>
      <AdvancedDirectivesLivingWill
        AdvancedDirectivesLivingWillState={setAdvancedDirectives}
      />
      <div className=" mt-20 flex items-center justify-center">
        <LineDivider
          lineColor="bg-[#e9e7e7b1]"
          lineWidth="w-3/4"
          lineHeight="h-[10px]"
        />
      </div>
      <SectionWithTitle
        title="Notice of Privacy Practices "
        subTitle="If You Need a copy of this form, please ask the office staff."
        children={[
          <div className=" flex w-full items-center justify-center">
            <NoticeOfPrivacyPractices />
          </div>,
        ]}
      />
      <div className=" mt-20 flex items-center justify-center">
        <LineDivider
          lineColor="bg-[#e9e7e7b1]"
          lineWidth="w-3/4"
          lineHeight="h-[10px]"
        />
      </div>
      <SectionWithTitle
        title="HIPPA Authorization for Release of Medical Information"
        subTitle="If You Need a copy of this form, please ask the office staff."
        children={[<HIPPAconsentForm HippaConsentFormState={setHippa} />]}
      />
      <div className=" mt-20 flex items-center justify-center">
        <LineDivider
          lineColor="bg-[#e9e7e7b1]"
          lineWidth="w-3/4"
          lineHeight="h-[10px]"
        />
      </div>
      <SectionWithTitle
        title="FINANCIAL POLICY /CANCELLATION POLICY AGREEMENT"
        subTitle="If You Need a copy of this form, please ask the office staff."
        children={[
          <FINANCIALPOLICY />,
          <div className=" flex w-full items-center justify-center">
            <Signature
              signatureValue={financialPolicySignature}
              signatureState={setFinancialPolicySignature}
              agreeThatTheirSignatureIsValid={financialPolicySignatureCheckBox}
              agreeThatTheirSignatureIsValidState={
                setFinancialPolicySignatureCheckBox
              }
              date={financialPolicySignatureDate}
              dateState={setFinancialPolicySignatureDate}
            />
          </div>,
        ]}
      />
      <div className=" mt-20 flex items-center justify-center">
        <LineDivider
          lineColor="bg-[#e9e7e7b1]"
          lineWidth="w-3/4"
          lineHeight="h-[10px]"
        />
      </div>
      <div className=" mt-10 flex items-center justify-center">
        <MainButton
          onClick={async () => {
            console.log(haveTheyEverSmoked)
            //TODO: Ask Jasmine if she wants to require medications, drug allergies, all Surgeries, major illneses. as of now we ask for them to put none if its none do we want that?
            //TODO: ADD CHECK BOXES for all the list quests to add items
            //TODO: MAKE IT SCROLL TO ERROR
            //make felids are filled out
            if (firstName === '') {
              alert('Please enter your first name')
              return
            } else if (lastName === '') {
              alert('Please enter your last name')
              return
            } else if (BirthDateValue === '') {
              alert('Please enter your birth date')
              return
            } else if (phoneNumberValue === '') {
              alert('Please enter your phone number')
              //scroll to phone number feild
              router.push('/NewPatientPacket/#cellPhone')
              return
            } else if (emailValue === '') {
              alert('Please enter your email')
              router.push('/NewPatientPacket/#email')
              return
            } else if (addressValue === '') {
              alert('Please enter your address')
              return
            } else if (cityValue === '') {
              alert('Please enter your city')
              return
            } else if (USStateValue === '') {
              alert('Please enter your state')
              return
            } else if (zipCodeValue === '') {
              alert('Please enter your zip code')
              return
            } else if (socialValue === '') {
              alert('Please enter your social security number')
              router.push('/NewPatientPacket/#social')
              return
            } else if (nameOfEmergencyContact === '') {
              alert('Please enter the name of your emergency contact')
              router.push('/NewPatientPacket/#emergencyContactName')
              return
            } else if (EmergencyContactRelationShip === '') {
              alert('Please enter the relationship of your emergency contact')
              router.push('/NewPatientPacket/#emergencyContactRelationship')
              return
            } else if (EmergencyContactPhoneNumber === '') {
              alert('Please enter the phone number of your emergency contact')
              router.push('/NewPatientPacket/#emergencyContactPhoneNumber')
              return
            } else if (HowDidTheyHearAboutUs === '') {
              alert('Please enter how you heard about us')
              router.push('/NewPatientPacket/#howDidYouHearAboutUs')
              return
            } else if (howDoTheyWishToPay === '') {
              alert(
                'Please enter how you wish to pay, out of pocket or insurance'
              )
              router.push('/NewPatientPacket/#howDoTheyWishToPay')
              return
            } else if (
              primaryInsurance === '' &&
              howDoTheyWishToPay === 'insurance'
            ) {
              alert('Please enter your insurance name')
              router.push('/NewPatientPacket/#insuranceName')
              return
            } else if (
              primaryInsuranceID === '' &&
              howDoTheyWishToPay === 'insurance'
            ) {
              alert('Please enter your insurance policy number')
              router.push('/NewPatientPacket/#insurancePolicyNumber')
              return
            } else if (
              primaryInsurancePhone === '' &&
              howDoTheyWishToPay === 'insurance'
            ) {
              alert('Please enter your insurance phone number')
              router.push('/NewPatientPacket/#insurancePhoneNumber')
              return
            } else if (
              primaryInsuranceGroup === '' &&
              howDoTheyWishToPay === 'insurance'
            ) {
              alert('Please enter your insurance group number')
              router.push('/NewPatientPacket/#insuranceGroupNumber')
              return
            } else if (
              primaryInsuranceAddress1 === '' &&
              howDoTheyWishToPay === 'insurance'
            ) {
              alert('Please enter your insurance address')
              router.push('/NewPatientPacket/#insuranceAddress')
              return
            } else if (
              primaryInsuranceCity === '' &&
              howDoTheyWishToPay === 'insurance'
            ) {
              alert('Please enter your insurance city')
              router.push('/NewPatientPacket/#insuranceAddress')
              return
            } else if (
              primaryInsuranceState === '' &&
              howDoTheyWishToPay === 'insurance'
            ) {
              alert('Please enter your insurance state')
              router.push('/NewPatientPacket/#insuranceAddress')
              return
            } else if (
              primaryInsuranceZip === '' &&
              howDoTheyWishToPay === 'insurance'
            ) {
              alert('Please enter your insurance zip code')
              router.push('/NewPatientPacket/#insuranceAddress')
              return
            } else if (
              primarySubscribersName === '' &&
              howDoTheyWishToPay === 'insurance'
            ) {
              alert('Please enter your insurance subscribers name')
              router.push('/NewPatientPacket/#subscriberName')
              return
            } else if (
              primaryPictureOfInsuranceCardFront === '' &&
              howDoTheyWishToPay === 'insurance'
            ) {
              alert('Please upload a picture of your insurance card front')
              router.push('/NewPatientPacket/#insuranceCardPicture')
              return
            } else if (retailPharmacyName === '') {
              alert('Please enter your retail pharmacy name')
              router.push('/NewPatientPacket/#pharmacyName')
              return
            } else if (
              retailPharmacyCrossStreet1 === '' ||
              retailPharmacyCrossStreet2 === ''
            ) {
              alert('Please enter your retail pharmacy cross street')
              router.push('/NewPatientPacket/#pharmacyCrossStreet1')
              return
            } else if (retailPharmacyPhoneNumber === '') {
              alert('Please enter your retail pharmacy phone number')
              router.push('/NewPatientPacket/#pharmacyPhoneNumber')
              return
            } else if (areYouAllergicToLatex === '') {
              alert('Please enter if you are allergic to latex')
              router.push('/NewPatientPacket/#allergicToLatex')
              return
            } else if (areYouAllergicToSelfish === '') {
              alert('Please enter if you are allergic to shellfish')
              router.push('/NewPatientPacket/#allergicToShellfish')
              return
            } else if (areYouAllergicToIodine === '') {
              alert('Please enter if you are allergic to iodine')
              router.push('/NewPatientPacket/#allergicToIodine')
              return
              // if patient drug allergies are not empty array
            } else if (doYouHaveAnyDrugAllergies === '') {
              alert('Please enter if you have any drug allergies')
              router.push('/NewPatientPacket/#doYouHaveDrugAllergies')
            } else if (
              doYouHaveAnyDrugAllergies === 'Yes' &&
              PatientDrugAllergies.length < 1
            ) {
              alert('Please enter your drug allergies')
              router.push('/NewPatientPacket/#drugAllergies')
              return
            } else if (doYouHaveAHistoryOfAnyMajorIllness === '') {
              alert('Please enter if you have a history of any major illness')
              router.push('/NewPatientPacket/#doYouHaveAnyMajorIllnesses')
            } else if (
              allMajorIllnesses.length < 1 &&
              doYouHaveAHistoryOfAnyMajorIllness === 'Yes'
            ) {
              alert('Please enter your major illnesses')
              router.push('/NewPatientPacket/#doYouHaveAnyMajorIllnesses')
              return
            } else if (doYouHaveAHistoryOfSurgeries === '') {
              alert(
                'Please enter if you have a history of surgeries or hospitalizations'
              )
              router.push('/NewPatientPacket/#doYouHaveAnySurgeries')
            } else if (
              allMajorSurgeriesAndHospitalizations.length < 1 &&
              doYouHaveAHistoryOfSurgeries === 'Yes'
            ) {
              alert('Please enter your major surgeries and hospitalizations')
              router.push('/NewPatientPacket/#doYouHaveAnySurgeries')
              return
            } else if (boneDensityScreening === '') {
              alert('Please enter if you have had a bone density screening')
              router.push('/NewPatientPacket/#haveYouHadBoneDensityScreening')
              return
            } else if (
              BoneDensityScreeningDate === '' &&
              boneDensityScreening === 'Yes'
            ) {
              alert('Please enter the date of your bone density screening')
              router.push('/NewPatientPacket/#dateOfBoneDensityScreening')
              return
            } else if (
              wasBoneDensityScreeningNormalOrAbnormal === '' &&
              boneDensityScreening === 'Yes'
            ) {
              alert(
                'Please enter if your bone density screening was normal or abnormal'
              )
              router.push('/NewPatientPacket/#boneDensityScreeningResults')
              return
            } else if (colonoscopyScreening === '') {
              alert('Please enter if you have had any of the following')
              router.push('/NewPatientPacket/#haveYouHadColonoscopy')
              return
            } else if (
              dateOfLastColonoscopyScreening === '' &&
              colonoscopyScreening === 'Yes'
            ) {
              alert('Please enter the date of your colonoscopy screening')
              router.push('/NewPatientPacket/#dateOfColonoscopyScreening')
              return
            } else if (
              wasColonoscopyScreeningNormalOrAbnormal === '' &&
              colonoscopyScreening === 'Yes'
            ) {
              alert(
                'Please enter if your colonoscopy screening was normal or abnormal'
              )
              router.push('/NewPatientPacket/#colonoscopyScreeningResults')
              return
            } else if (haveTheyEverSmoked === '') {
              alert('Please enter if you have ever smoked')
              router.push('/NewPatientPacket/#haveYouEverSmoked')
              return
            } else if (
              haveTheyEverSmoked === 'Yes' &&
              howManyPacksPerDay === ''
            ) {
              alert('Please enter how many packs per day')
              router.push('/NewPatientPacket/#howManyPacksPerDay')
              return
            } else if (anyOtherTobaccoOrEcigarettes === '') {
              alert('Please enter if you have used any other tobacco')
              router.push('/NewPatientPacket/#otherTabaccoUse')
              return
            } else if (
              anyOtherTobaccoOrEcigarettes === 'Yes' &&
              describeOtherTobaccoUse === ''
            ) {
              alert('Please enter what other smoking products you have used')
              router.push('/NewPatientPacket/#describeOtherTobaccoUse')
              return
            } else if (doYoCurrentlyUseRecreationalDrugs === '') {
              alert('Please enter if you currently use recreational drugs')
              router.push('/NewPatientPacket/#doYouUseRecreationalDrugs')
              return
            } else if (
              doYoCurrentlyUseRecreationalDrugs === 'Yes' &&
              describeRecreationalDrugUse === ''
            ) {
              alert('Please enter what recreational drugs you use')
              router.push('/NewPatientPacket/#describeRecreationalDrugUse')
              return
            } else if (doYouDrinkAlcohol === '') {
              alert('Please enter if you drink alcohol')
              router.push('/NewPatientPacket/#doYouDrinkAlcohol')
              return
            } else if (
              doYouDrinkAlcohol === 'Yes' &&
              howManyDrinksPerWeek === ''
            ) {
              alert('Please enter how many drinks per week')
              router.push('/NewPatientPacket/#howManyDrinksPerWeek')
              return
            } else if (doYouDrinkCoffee === '') {
              alert('Please enter if you drink coffee')
              router.push('/NewPatientPacket/#doYouDrinkCoffee')
              return
            } else if (doYouDrinkCoffee === 'Yes' && howManyCupsPerDay === '') {
              alert('Please enter how many cups of coffee per day')
              router.push('/NewPatientPacket/#howManyCupsPerDay')
              return
            } else if (doYouUseIllegaLStreetDrugs === '') {
              alert('Please enter if you use illegal street drugs')
              router.push('/NewPatientPacket/#doYouUseIllegaLStreetDrugs')
              return
            } else if (
              doYouUseIllegaLStreetDrugs === 'Yes' &&
              describeIllegalStreetDrugUse === ''
            ) {
              alert('Please enter what illegal street drugs you use')
              router.push('/NewPatientPacket/#describeIllegalStreetDrugUse')
              return
            } else if (doYouFeelDepressed === '') {
              alert('Please enter if you feel depressed')
              router.push('/NewPatientPacket/#doYouFeelDepressed')
              return
            } else if (
              doYouCryFrequently === '' &&
              doYouFeelDepressed === 'Yes'
            ) {
              alert('Please enter if you cry frequently')
              router.push('/NewPatientPacket/#doYouCryFrequently')
              return
            } else if (
              doYouHaveLittleInterestInDoingThings == '' &&
              doYouFeelDepressed === 'Yes'
            ) {
              alert('Please enter if you have little interest in doing things')
              router.push('/NewPatientPacket/#doYouHaveLittleInterest')
              return
            } else if (
              doYouFeelHopelessDownOrDepressed === '' &&
              doYouFeelDepressed === 'Yes'
            ) {
              alert('Please enter if you feel hopeless down or depressed')
              router.push('/NewPatientPacket/#doYouFeelHopeless')
              return
            } else if (
              doYouHaveTroubleFallingAsleepOrSleepingTooMuch === '' &&
              doYouFeelDepressed === 'Yes'
            ) {
              alert(
                'Please enter if you have trouble falling asleep or sleeping too much'
              )
              router.push('/NewPatientPacket/#doYouHaveTroubleSleeping')
              return
            } else if (
              doYouFeelTiredOrHaveLittleEnergy === '' &&
              doYouFeelDepressed === 'Yes'
            ) {
              alert('Please enter if you feel tired or have little energy')
              router.push('/NewPatientPacket/#doYouFeelTired')
              return
            } else if (
              doYouHavAPoorAppetiteOrOverEating === '' &&
              doYouFeelDepressed === 'Yes'
            ) {
              alert('Please enter if you have a poor appetite or over eating')
              router.push('/NewPatientPacket/#doYouHavAPoorAppetite')
              return
            } else if (
              doYouFeelBadAboutYourself === '' &&
              doYouFeelDepressed === 'Yes'
            ) {
              alert('Please enter if you feel bad about yourself')
              router.push('/NewPatientPacket/#doYouFeelBadAboutYourself')
              return
            } else if (
              troubleConcentrating === '' &&
              doYouFeelDepressed === 'Yes'
            ) {
              alert('please enter if you have trouble concentrating')
              router.push('/NewPatientPacket/#troubleConcentrating')
              return
            } else if (
              doYouMoveOrSpeakSlowly === '' &&
              doYouFeelDepressed === 'Yes'
            ) {
              alert('Please enter if you move or speak slowly')
              router.push('/NewPatientPacket/#doYouMoveOrSpeakSlowly')
              return
            } else if (
              thoughtsYouWouldBeBetterOffDead === '' &&
              doYouFeelDepressed === 'Yes'
            ) {
              alert(
                'Please enter if you have thoughts you would be better off dead'
              )
              router.push('/NewPatientPacket/#thoughtsYouWouldBeBetterOffDead')
              return
            } else if (
              haveYouEverAttemptedSuicide === '' &&
              doYouFeelDepressed === 'Yes'
            ) {
              alert('Please enter if you have ever attempted suicide ')
              router.push('/NewPatientPacket/#HaveYouAttemptedSuicide')
              return
            } else if (
              isStressAMajorProblem === '' &&
              doYouFeelDepressed === 'Yes'
            ) {
              alert('Please enter if stress is a major problem for you')
              router.push('/NewPatientPacket/#isStressAMajorProblemForYou')
            } else if (
              doYouPanicWhenStressed === '' &&
              doYouFeelDepressed === 'Yes'
            ) {
              alert('Please enter if you panic when stressed')
              router.push('/NewPatientPacket/#doYouPanicWhenStressed')
            } else if (areYouCurrentlyTakingAnyMedications == '') {
              alert('Please select if you are taking any medications')
              router.push(
                '/NewPatientPacket/#areYouCurrentlyTakingAnyMedications'
              )
            } else if (
              areYouCurrentlyTakingAnyMedications == 'Yes' &&
              listOfAllCurrentMedications.length < 1
            ) {
              alert('Please enter a list of all current medications')
              router.push(
                '/NewPatientPacket/#areYouCurrentlyTakingAnyMedications'
              )
            } else {
              submitNewPatientPacketAndCreateNewPatient({
                firstName: firstName,
                lastName: lastName,
                addressValue: addressValue,
                addressValue2: addressValue2,
                cityValue: cityValue,
                USStateValue: USStateValue,
                zipCodeValue: zipCodeValue,
                BirthDateValue: BirthDateValue,
                phoneNumberValue: phoneNumberValue,
                homePhone: homePhone,
                emailValue: emailValue.trim(),
                socialValue: socialValue,
                isCheckedMale: isCheckedMale,
                isCheckedFemale: isCheckedFemale,
                isCheckedOther: isCheckedOther,
                pictureOfFrontOfDriverLicense: pictureOfFrontOfDriverLicense,
                preferredName: preferredName,
                single: single,
                married: married,
                divorced: divorced,
                widowed: widowed,
                separated: separated,
                withPartner: withPartner,
                MayWeTakeYourPicture: MayWeTakeYourPicture,
                pictureOfTheirFace: pictureOfTheirFace,
                Ethnicity: Ethnicity,
                nameOfEmergencyContact: nameOfEmergencyContact,
                EmergencyContactRelationShip: EmergencyContactRelationShip,
                EmergencyContactPhoneNumber: EmergencyContactPhoneNumber,
                HowDidTheyHearAboutUs: HowDidTheyHearAboutUs,
                howDoTheyWishToPay: howDoTheyWishToPay,
                primaryInsurance: primaryInsurance,
                primaryInsuranceID: primaryInsuranceID,
                primaryInsuranceGroup: primaryInsuranceGroup,
                primaryInsurancePhone: primaryInsurancePhone,
                primaryInsuranceAddress1: primaryInsuranceAddress1,
                primaryInsuranceAddress2: primaryInsuranceAddress2,
                primaryInsuranceCity: primaryInsuranceCity,
                primaryInsuranceState: primaryInsuranceState,
                primaryInsuranceZip: primaryInsuranceZip,
                primarySubscribersName: primarySubscribersName,
                secondaryInsurance: secondaryInsurance,
                secondaryInsuranceID: secondaryInsuranceID,
                secondaryInsuranceGroup: secondaryInsuranceGroup,
                secondaryInsurancePhone: secondaryInsurancePhone,
                secondaryInsuranceAddress1: secondaryInsuranceAddress1,
                secondaryInsuranceAddress2: secondaryInsuranceAddress2,
                secondaryInsuranceCity: secondaryInsuranceCity,
                secondaryInsuranceState: secondaryInsuranceState,
                secondaryInsuranceZip: secondaryInsuranceZip,
                secondarySubscribersName: secondarySubscribersName,
                primaryPictureOfInsuranceCardFront:
                  primaryPictureOfInsuranceCardFront,
                secondaryPictureOfInsuranceCardFront:
                  secondaryPictureOfInsuranceCardFront,
                retailPharmacyName: retailPharmacyName,
                retailPharmacyCrossStreet1: retailPharmacyCrossStreet1,
                retailPharmacyCrossStreet2: retailPharmacyCrossStreet2,
                retailPharmacyPhoneNumber: retailPharmacyPhoneNumber,
                retailPharmacyFaxNumber: retailPharmacyFaxNumber,
                mailOrderPharmacyName: mailOrderPharmacyName,
                mailOrderPharmacyPhoneNumber: mailOrderPharmacyPhoneNumber,
                mailOrderPharmacyAddress1: mailOrderPharmacyAddress1,
                mailOrderPharmacyAddress2: mailOrderPharmacyAddress2,
                mailOrderPharmacyCity: mailOrderPharmacyCity,
                mailOrderPharmacyState: mailOrderPharmacyState,
                mailOrderPharmacyZip: mailOrderPharmacyZip,
                areYouAllergicToLatex: areYouAllergicToLatex,
                areYouAllergicToSelfish: areYouAllergicToSelfish,
                areYouAllergicToIodine: areYouAllergicToIodine,
                PatientDrugAllergies: PatientDrugAllergies,
                dateOfLastPAP: dateOfLastPAP,
                wasPapNormalOrAbnormal: wasPapNormalOrAbnormal,
                dateOfLastMammogram: dateOfLastMammogram,
                wasMammogramNormalOrAbnormal: wasMammogramNormalOrAbnormal,
                dateOfLastPSA: dateOfLastPSA,
                wasPSANormalOrAbnormal: wasPSANormalOrAbnormal,
                allMajorIllnesses: allMajorIllnesses,
                allMajorSurgeriesAndHospitalizations:
                  allMajorSurgeriesAndHospitalizations,
                boneDensityScreening: boneDensityScreening,
                BoneDensityScreeningDate: BoneDensityScreeningDate,
                wasBoneDensityScreeningNormalOrAbnormal:
                  wasBoneDensityScreeningNormalOrAbnormal,
                colonoscopyScreening: colonoscopyScreening,
                dateOfLastColonoscopyScreening: dateOfLastColonoscopyScreening,
                wasColonoscopyScreeningNormalOrAbnormal:
                  wasColonoscopyScreeningNormalOrAbnormal,
                allMedicalHistoryOfDisease: allMedicalHistoryOfDisease,
                haveTheyEverSmoked: haveTheyEverSmoked,
                howManyPacksPerDay: howManyPacksPerDay,
                anyOtherTobaccoOrEcigarettes: anyOtherTobaccoOrEcigarettes,
                describeOtherTobaccoUse: describeOtherTobaccoUse,
                doYouDrinkCoffee: doYouDrinkCoffee,
                howManyCupsPerDay: howManyCupsPerDay,
                doYouDrinkAlcohol: doYouDrinkAlcohol,
                howManyDrinksPerWeek: howManyDrinksPerWeek,
                doYoCurrentlyUseRecreationalDrugs:
                  doYoCurrentlyUseRecreationalDrugs,
                describeRecreationalDrugUse: describeRecreationalDrugUse,
                doYouUseIllegaLStreetDrugs: doYouUseIllegaLStreetDrugs,
                describeIllegalStreetDrugUse: describeIllegalStreetDrugUse,
                doYouFeelDepressed: doYouFeelDepressed,
                doYouCryFrequently: doYouCryFrequently,
                doYouHaveLittleInterestInDoingThings:
                  doYouHaveLittleInterestInDoingThings,
                doYouFeelHopelessDownOrDepressed:
                  doYouFeelHopelessDownOrDepressed,
                doYouHaveTroubleFallingAsleepOrSleepingTooMuch:
                  doYouHaveTroubleFallingAsleepOrSleepingTooMuch,
                doYouFeelTiredOrHaveLittleEnergy:
                  doYouFeelTiredOrHaveLittleEnergy,
                doYouHavAPoorAppetiteOrOverEating:
                  doYouHavAPoorAppetiteOrOverEating,
                doYouFeelBadAboutYourself: doYouFeelBadAboutYourself,
                troubleConcentrating: troubleConcentrating,
                doYouMoveOrSpeakSlowly: doYouMoveOrSpeakSlowly,
                thoughtsYouWouldBeBetterOffDead:
                  thoughtsYouWouldBeBetterOffDead,
                isStressAMajorProblem: isStressAMajorProblem,
                doYouPanicWhenStressed: doYouPanicWhenStressed,
                haveYouEverAttemptedSuicide: haveYouEverAttemptedSuicide,
                familyMedicalAlcoholismAddiction:
                  familyMedicalAlcoholismAddiction,
                familyMedicalBleedingDisorders: familyMedicalBleedingDisorders,
                familyMedicalCancer: familyMedicalCancer,
                familyMedicalDiabetes: familyMedicalDiabetes,
                familyMedicalHeartAttack: familyMedicalHeartAttack,
                familyMedicalHighBloodPressure: familyMedicalHighBloodPressure,
                familyMedicalHighCholesterol: familyMedicalHighCholesterol,
                familyMedicalKidneyDisease: familyMedicalKidneyDisease,
                familyMedicalMentalIllness: familyMedicalMentalIllness,
                familyMedicalStroke: familyMedicalStroke,
                familyMedicalTuberculosis: familyMedicalTuberculosis,
                isYourMotherStillLiving: isYourMotherStillLiving,
                isYourFatherStillLiving: isYourFatherStillLiving,
                listOfAllCurrentMedications: listOfAllCurrentMedications,
                patientMedicalReviewSignature: patientMedicalReviewSignature,
                patientMedicalReviewSignatureDate:
                  patientMedicalReviewSignatureDate,
                PatientMedicalReviewSignatureCheckBox:
                  PatientMedicalReviewSignatureCheckBox,
                AdvancedDirectives: AdvancedDirectives,
                hippa: hippa,
                financialPolicySignature: financialPolicySignature,
                financialPolicySignatureCheckBox:
                  financialPolicySignatureCheckBox,
                financialPolicySignatureDate: financialPolicySignatureDate,
                company: company,
              })
                .then(() => {
                  alert('Packet uploaded successfully now attaching photos')
                })

                .then(() => {
                  AddPictureOfPatientFaceToStorageAndToDB({
                    selectedFile: pictureOfTheirFace,
                    emailValue: emailValue,
                    patientMedicalReviewSignatureDate:
                      patientMedicalReviewSignatureDate,
                    company: company,
                  })
                })
                .then(() => {
                  AddPictureOfPatientInsuranceToStorageAndToDB({
                    selectedFile: primaryPictureOfInsuranceCardFront,
                    emailValue: emailValue,
                    patientMedicalReviewSignatureDate:
                      patientMedicalReviewSignatureDate,
                    company: company,
                  })
                })
                .then(() => {
                  AddPictureOfDriverLicenseToStorageAndToDB({
                    selectedFile: pictureOfFrontOfDriverLicense,
                    emailValue: emailValue,
                    patientMedicalReviewSignatureDate:
                      patientMedicalReviewSignatureDate,
                    company: company,
                  })
                })
                .then(() => {
                  alert('Photos uploaded, thank you for your submission')
                })
            }
          }}
          buttonText="Submit"
          buttonWidth="w-1/2"
        />
      </div>
    </div>
  )
}
export default NewPatientPacket
