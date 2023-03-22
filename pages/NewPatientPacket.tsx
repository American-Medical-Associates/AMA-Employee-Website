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
  AddPictureOfPatientInsuranceBackToStorageAndToDB,
  AddPictureOfPatientInsuranceSecondaryBackToStorageAndToDB,
  AddPictureOfPatientInsuranceSecondaryToStorageAndToDB,
  AddPictureOfPatientInsuranceToStorageAndToDB,
  auth,
  submitNewPatientPacketAndCreateNewPatient,
} from '../firebase'

import { useSelector } from 'react-redux'
import {
  selectCompany,
  selectNewPatientPacket,
} from '../redux/slices/companySlice'
import Head from 'next/head'
import GreenCheckMark from '../components/formComponents/GreenCheckMark'
import { MenuItem } from '../components/MenuItem'
import { UserIcon } from '@heroicons/react/24/outline'
import { NewPatientPacketAutoSave } from '../firebase'
import AutoSaveLine from '../components/formComponents/AutoSaveLine'

const NewPatientPacket: NextPage<{}> = ({}) => {
  interface Directives {
    healthCarePowerOfAttorney: ''
    healthCarePowerOfAttorneyName: ''
    doYouHaveALivingWill: ''
    preHospitalMedicalDirectives: ''
    phoneNumber: ''
    date: ''
    signature: ''
    agreeThatTheirSignatureIsValid: false
  }

  interface Hippa {
    name: ''
    relationShip: ''
    name2: ''
    relationShip2: ''
    name3: ''
    relationShip3: ''
    name4: ''
    relationShip4: ''
    hippaSignature: ''
    signatureDate: ''
    signatureCheckBoxConsent: ''
    agreeThatTheirSignatureIsValid: ''
  }

  const [loading, setLoading] = useState(false)
  const [showCheckMark, setShowCheckMark] = useState(false)
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
  const [primarySubscribersDOB, setPrimarySubscribersDOB] = useState('')
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
  const [secondarySubscribersDOB, setSecondarySubscribersDOB] = useState('')
  const [
    primaryPictureOfInsuranceCardFront,
    setPrimaryPictureOfInsuranceCardFront,
  ] = useState('')
  const [
    primaryPictureOfInsuranceCardBack,
    setPrimaryPictureOfInsuranceCardBack,
  ] = useState('')
  const [
    secondaryPictureOfInsuranceCardFront,
    setSecondaryPictureOfInsuranceCardFront,
  ] = useState('')
  const [
    secondaryPictureOfInsuranceCardBack,
    setSecondaryPictureOfInsuranceCardBack,
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
  const [allMajorIllnesses, setAllMajorIllnesses] = useState<Array<string>>([])
  const [doYouHaveAHistoryOfSurgeries, setDoYouHaveAHistoryOfSurgeries] =
    useState('')
  const [
    allMajorSurgeriesAndHospitalizations,
    setAllMajorSurgeriesAndHospitalizations,
  ] = useState<Array<string>>([])
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
  const [allMedicalHistoryOfDisease, setAllMedicalHistoryOfDisease] = useState<
    Array<string>
  >([])
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
  ] = useState<Array<string>>([])
  const [familyMedicalBleedingDisorders, setFamilyMedicalBleedingDisorders] =
    useState<Array<string>>([])
  const [familyMedicalCancer, setFamilyMedicalCancer] = useState<Array<string>>(
    []
  )
  const [familyMedicalDiabetes, setFamilyMedicalDiabetes] = useState<
    Array<string>
  >([])
  const [familyMedicalHeartAttack, setFamilyMedicalHeartAttack] = useState<
    Array<string>
  >([])
  const [familyMedicalHighBloodPressure, setFamilyMedicalHighBloodPressure] =
    useState<Array<string>>([])
  const [familyMedicalHighCholesterol, setFamilyMedicalHighCholesterol] =
    useState<Array<string>>([])
  const [familyMedicalKidneyDisease, setFamilyMedicalKidneyDisease] = useState<
    Array<string>
  >([])
  const [familyMedicalMentalIllness, setFamilyMedicalMentalIllness] = useState<
    Array<string>
  >([])
  const [familyMedicalStroke, setFamilyMedicalStroke] = useState<Array<string>>(
    []
  )
  const [familyMedicalTuberculosis, setFamilyMedicalTuberculosis] = useState<
    Array<string>
  >([])
  const [isYourMotherStillLiving, setIsYourMotherStillLiving] = useState('')
  const [isYourFatherStillLiving, setIsYourFatherStillLiving] = useState('')
  const [
    areYouCurrentlyTakingAnyMedications,
    setAreYouCurrentlyTakingAnyMedications,
  ] = useState('')
  const [listOfAllCurrentMedications, setListOfAllCurrentMedications] =
    useState<Array<string>>([])
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
  const [AdvancedDirectives, setAdvancedDirectives] = useState<Directives>({
    healthCarePowerOfAttorney: '',
    healthCarePowerOfAttorneyName: '',
    doYouHaveALivingWill: '',
    preHospitalMedicalDirectives: '',
    phoneNumber: '',
    date: '',
    signature: '',
    agreeThatTheirSignatureIsValid: false,
  })
  const [hippa, setHippa] = useState<Hippa>({
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
    agreeThatTheirSignatureIsValid: '',
  })
  const [financialPolicySignature, setFinancialPolicySignature] = useState('')

  const [
    financialPolicySignatureCheckBox,
    setFinancialPolicySignatureCheckBox,
  ] = useState(false)
  const [financialPolicySignatureDate, setFinancialPolicySignatureDate] =
    useState('')

  const [refresh, setRefresh] = useState(false)

  /////////////
  //required states
  ///////
  const [requiredFirstName, setRequiredFirstName] = useState(false)
  const [requiredAddress, setRequiredAddress] = useState(false)
  const [requiredDateOfBirth, setRequiredDateOfBirth] = useState(false)
  const [requiredPhoneNumber, setRequiredPhoneNumber] = useState(false)
  const [requiredEmail, setRequiredEmail] = useState(false)
  const [requireSocial, setRequireSocial] = useState(false)
  const [requiredNameOfEmergencyContact, setRequiredNameOfEmergencyContact] =
    useState(false)
  const [
    requiredEmergencyContactPhoneNumber,
    setRequiredEmergencyContactPhoneNumber,
  ] = useState(false)
  const [
    requiredEmergencyContactRelationship,
    setRequiredEmergencyContactRelationship,
  ] = useState(false)
  const [requiredHowDidTheyHearAboutUs, setRequiredHowDidTheyHearAboutUs] =
    useState(false)
  const [requiredHowDoTheyWishToPay, setRequiredHowDoTheyWishToPay] =
    useState(false)
  const [requiredPrimaryInsurance, setRequiredPrimaryInsurance] =
    useState(false)
  const [requiredPrimaryInsuranceID, setRequiredPrimaryInsuranceID] =
    useState(false)
  const [requiredPrimaryInsuranceGroup, setRequiredPrimaryInsuranceGroup] =
    useState(false)
  const [requiredPrimaryInsurancePhone, setRequiredPrimaryInsurancePhone] =
    useState(false)
  const [requiredPrimarySubscribersName, setRequiredPrimarySubscribersName] =
    useState(false)
  const [requiredPrimarySubscribersDOB, setRequiredPrimarySubscribersDOB] =
    useState(false)
  const [
    requiredPrimaryPictureOfInsuranceCardFront,
    setRequiredPrimaryPictureOfInsuranceCardFront,
  ] = useState(false)
  const [
    requiredPrimaryPictureOfInsuranceCardBack,
    setRequiredPrimaryPictureOfInsuranceCardBack,
  ] = useState(false)
  const [requiredRetailPharmacyName, setRequiredRetailPharmacyName] =
    useState(false)
  const [
    requiredRetailPharmacyCrossStreet1,
    setRequiredRetailPharmacyCrossStreet1,
  ] = useState(false)
  const [
    requiredRetailPharmacyCrossStreet2,
    setRequiredRetailPharmacyCrossStreet2,
  ] = useState(false)
  const [
    requiredRetailPharmacyPhoneNumber,
    setRequiredRetailPharmacyPhoneNumber,
  ] = useState(false)
  const [requiredAreYouAllergicToLatex, setRequiredAreYouAllergicToLatex] =
    useState(false)
  const [requiredAreYouAllergicToSelfish, setRequiredAreYouAllergicToSelfish] =
    useState(false)
  const [requiredAreYouAllergicToIodine, setRequiredAreYouAllergicToIodine] =
    useState(false)
  const [
    requiredDoYouHaveAnyDrugAllergies,
    setRequiredDoYouHaveAnyDrugAllergies,
  ] = useState(false)
  const [requiredDrugAllergies, setRequiredDrugAllergies] = useState(false)
  const [
    requiredDoYouHaveAHistoryOfAnyMajorIllness,
    setRequiredDoYouHaveAHistoryOfAnyMajorIllness,
  ] = useState(false)
  const [requiredMajorIllnesses, setRequiredMajorIllnesses] = useState(false)
  const [
    requiredDoYouHaveAHistoryOfSurgeries,
    setRequiredDoYouHaveAHistoryOfSurgeries,
  ] = useState(false)
  const [
    requiredMajorSurgeriesAndHospitalizations,
    setRequiredMajorSurgeriesAndHospitalizations,
  ] = useState(false)
  const [requiredBoneDensityScreening, setRequiredBoneDensityScreening] =
    useState(false)
  const [
    requiredBoneDensityScreeningDate,
    setRequiredBoneDensityScreeningDate,
  ] = useState(false)
  const [
    requiredWasBoneDensityScreeningNormalOrAbnormal,
    setRequiredWasBoneDensityScreeningNormalOrAbnormal,
  ] = useState(false)
  const [requiredColonoscopyScreening, setRequiredColonoscopyScreening] =
    useState(false)
  const [
    requiredDateOfLastColonoscopyScreening,
    setRequiredDateOfLastColonoscopyScreening,
  ] = useState(false)
  const [
    requiredWasColonoscopyScreeningNormalOrAbnormal,
    setRequiredWasColonoscopyScreeningNormalOrAbnormal,
  ] = useState(false)
  const [requiredHaveTheyEverSmoked, setRequiredHaveTheyEverSmoked] =
    useState(false)
  const [requiredHowManyPacksPerDay, setRequiredHowManyPacksPerDay] =
    useState(false)
  const [
    requiredAnyOtherTobaccoOrEcigarettes,
    setRequiredAnyOtherTobaccoOrEcigarettes,
  ] = useState(false)
  const [requiredDescribeOtherTobaccoUse, setRequiredDescribeOtherTobaccoUse] =
    useState(false)
  const [
    requiredDoYoCurrentlyUseRecreationalDrugs,
    setRequiredDoYoCurrentlyUseRecreationalDrugs,
  ] = useState(false)
  const [
    requiredDescribeRecreationalDrugUse,
    setRequiredDescribeRecreationalDrugUse,
  ] = useState(false)
  const [requiredDoYouDrinkAlcohol, setRequiredDoYouDrinkAlcohol] =
    useState(false)
  const [requiredHowManyDrinksPerWeek, setRequiredHowManyDrinksPerWeek] =
    useState(false)
  const [requiredDoYouDrinkCoffee, setRequiredDoYouDrinkCoffee] =
    useState(false)
  const [requiredHowManyCupsPerDay, setRequiredHowManyCupsPerDay] =
    useState(false)
  const [
    requiredDoYouUseIllegaLStreetDrugs,
    setRequiredDoYouUseIllegaLStreetDrugs,
  ] = useState(false)
  const [
    requiredDescribeIllegaLStreetDrugUse,
    setRequiredDescribeIllegaLStreetDrugUse,
  ] = useState(false)
  const [requiredDoYouFeelDepressed, setRequiredDoYouFeelDepressed] =
    useState(false)
  const [requiredDoYouCryFrequently, setRequiredDoYouCryFrequently] =
    useState(false)
  const [
    requiredDoYouHaveLittleInterestInDoingThings,
    setRequiredDoYouHaveLittleInterestInDoingThings,
  ] = useState(false)
  const [
    requiredDoYouFeelHopelessDownOrDepressed,
    setRequiredDoYouFeelHopelessDownOrDepressed,
  ] = useState(false)
  const [
    requiredDoYouHaveTroubleFallingAsleepOrSleepingTooMuch,
    setRequiredDoYouHaveTroubleFallingAsleepOrSleepingTooMuch,
  ] = useState(false)
  const [
    requiredDoYouFeelTiredOrHaveLittleEnergy,
    setRequiredDoYouFeelTiredOrHaveLittleEnergy,
  ] = useState(false)
  const [
    requiredDoYouHavAPoorAppetiteOrOverEating,
    setRequiredDoYouHavAPoorAppetiteOrOverEating,
  ] = useState(false)
  const [
    requiredDoYouFeelBadAboutYourself,
    setRequiredDoYouFeelBadAboutYourself,
  ] = useState(false)
  const [requiredTroubleConcentrating, setRequiredTroubleConcentrating] =
    useState(false)
  const [requiredDoYouMoveOrSpeakSlowly, setRequiredDoYouMoveOrSpeakSlowly] =
    useState(false)
  const [
    requiredThoughtsYouWouldBeBetterOffDead,
    setRequiredThoughtsYouWouldBeBetterOffDead,
  ] = useState(false)
  const [requiredIsStressAMajorProblem, setRequiredIsStressAMajorProblem] =
    useState(false)
  const [requiredDoYouPanicWhenStressed, setRequiredDoYouPanicWhenStressed] =
    useState(false)
  const [
    requiredHaveYouEverAttemptedSuicide,
    setRequiredHaveYouEverAttemptedSuicide,
  ] = useState(false)
  const [
    requireAreYouCurrentlyTakingAnyMedications,
    setRequireAreYouCurrentlyTakingAnyMedications,
  ] = useState(false)
  const [
    requireListOfAllCurrentMedications,
    setRequireListOfAllCurrentMedications,
  ] = useState(false)
  const [
    requirePatientMedicalReviewSignatureCheckBox,
    setRequirePatientMedicalReviewSignatureCheckBox,
  ] = useState(false)
  const [
    requirePatientMedicalReviewSignature,
    setRequirePatientMedicalReviewSignature,
  ] = useState(false)
  const [
    requirePatientMedicalReviewSignatureDate,
    setRequirePatientMedicalReviewSignatureDate,
  ] = useState(false)
  const [
    requireAdvancedDirectivesSignature,
    setRequireAdvancedDirectivesSignature,
  ] = useState(false)
  const [requireHippaSignature, setRequireHippaSignature] = useState(false)
  const [
    requireFinancialPolicySignatureCheckBox,
    setRequireFinancialPolicySignatureCheckBox,
  ] = useState(false)
  const [requireFinancialPolicySignature, setRequireFinancialPolicySignature] =
    useState(false)
  const [
    requireFinancialPolicySignatureDate,
    setRequireFinancialPolicySignatureDate,
  ] = useState(false)
  const [autoSaveCheck, setAutoSaveCheck] = useState<boolean>()
  const [autoSaveMentalHealth, setAutoSaveMentalHealth] = useState<boolean>()
  const [autoSaveMedicalSignature, setAutoSaveMedicalSignature] =
    useState<boolean>()

  const newPatientPackSelector = useSelector(selectNewPatientPacket)
  // const [checkBoxValues, setCheckBoxValues] = useState([])

  useEffect(() => {
    if (newPatientPackSelector) {
      setFirstName(newPatientPackSelector.firstName)
      setLastName(newPatientPackSelector.lastName)
      setAddressValue(newPatientPackSelector.addressValue)
      setAddressValue2(newPatientPackSelector.addressValue2)
      setCityValue(newPatientPackSelector.cityValue)
      setUSStateValue(newPatientPackSelector.USStateValue)
      setZipCodeValue(newPatientPackSelector.zipCodeValue)
      setBirthDateValue(newPatientPackSelector.BirthDateValue)
      setPhoneNumberValue(newPatientPackSelector.phoneNumberValue)
      setHomePhone(newPatientPackSelector.homePhone)
      setEmailValue(newPatientPackSelector.emailValue)
      setSocialValue(newPatientPackSelector.socialValue)
      setIsCheckedMale(newPatientPackSelector.isCheckedMale)
      setIsCheckedFemale(newPatientPackSelector.isCheckedFemale)
      setIsCheckedOther(newPatientPackSelector.isCheckedOther)
      setPictureOfFrontOfDriverLicense('')
      // setPictureOfFrontOfDriverLicense(
      //   newPatientPackSelector.pictureOfFrontOfDriverLicense
      // )
      setPreferredName(newPatientPackSelector.preferredName)
      setSingle(newPatientPackSelector.single)
      setMarried(newPatientPackSelector.married)
      setDivorced(newPatientPackSelector.divorced)
      setWidowed(newPatientPackSelector.widowed)
      setSeparated(newPatientPackSelector.separated)
      setWithPartner(newPatientPackSelector.withPartner)
      setMayWeTakeYourPicture(newPatientPackSelector.MayWeTakeYourPicture)
      // if (newPatientPackSelector.pictureOfTheirFace !== undefined) {
      //   setPictureOfTheirFace(newPatientPackSelector.pictureOfTheirFace)
      // }
      setEthnicity(newPatientPackSelector.Ethnicity)
      setNameOfEmergency(newPatientPackSelector.nameOfEmergencyContact)
      setEmergencyContactRelationShip(
        newPatientPackSelector.EmergencyContactRelationShip
      )
      setEmergencyContactPhoneNumber(
        newPatientPackSelector.EmergencyContactPhoneNumber
      )
      setHowDidTheyHearAboutUs(newPatientPackSelector.HowDidTheyHearAboutUs)
      setHowDoTheyWishToPay(newPatientPackSelector.howDoTheyWishToPay)
      setPrimaryInsurance(newPatientPackSelector.primaryInsurance)
      setPrimaryInsuranceID(newPatientPackSelector.primaryInsuranceID)
      setPrimaryInsuranceGroup(newPatientPackSelector.primaryInsuranceGroup)
      setPrimaryInsurancePhone(newPatientPackSelector.primaryInsurancePhone)
      setPrimarySubscribersName(newPatientPackSelector.primarySubscribersName)
      setPrimarySubscribersDOB(newPatientPackSelector.primarySubscribersDOB)
      setSecondaryInsurance(newPatientPackSelector.secondaryInsurance)
      setSecondaryInsuranceID(newPatientPackSelector.secondaryInsuranceID)
      setSecondaryInsuranceGroup(newPatientPackSelector.secondaryInsuranceGroup)
      setSecondaryInsurancePhone(newPatientPackSelector.secondaryInsurancePhone)
      setSecondarySubscribersName(
        newPatientPackSelector.secondarySubscribersName
      )
      setSecondarySubscribersDOB(newPatientPackSelector.secondarySubscribersDOB)

      setRetailPharmacyName(newPatientPackSelector.retailPharmacyName)
      setRetailPharmacyCrossStreet1(
        newPatientPackSelector.retailPharmacyCrossStreet1
      )
      setRetailPharmacyCrossStreet2(
        newPatientPackSelector.retailPharmacyCrossStreet2
      )
      setRetailPharmacyPhoneNumber(
        newPatientPackSelector.retailPharmacyPhoneNumber
      )
      setRetailPharmacyFaxNumber(newPatientPackSelector.retailPharmacyFaxNumber)
      setMailOrderPharmacyName(newPatientPackSelector.mailOrderPharmacyName)
      setMailOrderPharmacyPhoneNumber(
        newPatientPackSelector.mailOrderPharmacyPhoneNumber
      )
      setMailOrderPharmacyAddress1(
        newPatientPackSelector.mailOrderPharmacyAddress1
      )
      setMailOrderPharmacyAddress2(
        newPatientPackSelector.mailOrderPharmacyAddress2
      )
      setMailOrderPharmacyCity(newPatientPackSelector.mailOrderPharmacyCity)
      setMailOrderPharmacyState(newPatientPackSelector.mailOrderPharmacyState)
      setMailOrderPharmacyZip(newPatientPackSelector.mailOrderPharmacyZip)
      setAreYouAllergicToLatex(newPatientPackSelector.areYouAllergicToLatex)
      setAreYouAllergicToSelfish(newPatientPackSelector.areYouAllergicToSelfish)
      setAreYouAllergicToIodine(newPatientPackSelector.areYouAllergicToIodine)
      setDoYouHaveAnyDrugAllergies(
        newPatientPackSelector.doYouHaveAnyDrugAllergies
      )
      if (
        newPatientPackSelector.PatientDrugAllergies &&
        newPatientPackSelector.PatientDrugAllergies.length > 0
      ) {
        setPatientDrugAllergies(newPatientPackSelector.PatientDrugAllergies)
      }
      setDateOfLastPAP(newPatientPackSelector.dateOfLastPAP)
      setWasPapNormalOrAbnormal(newPatientPackSelector.wasPapNormalOrAbnormal)
      setDateOfLastMammogram(newPatientPackSelector.dateOfLastMammogram)
      setWasMammogramNormalOrAbnormal(
        newPatientPackSelector.wasMammogramNormalOrAbnormal
      )
      setDateOfLastPSA(newPatientPackSelector.dateOfLastPSA)
      setWasPSANormalOrAbnormal(newPatientPackSelector.wasPSANormalOrAbnormal)
      setDoYouHaveAHistoryOfAnyMajorIllness(
        newPatientPackSelector.doYouHaveAHistoryOfAnyMajorIllness
      )
      if (
        newPatientPackSelector.allMajorIllnesses &&
        newPatientPackSelector.allMajorIllnesses.length > 0
      ) {
        newPatientPackSelector.allMajorIllnesses.forEach((item: string) => {
          if (allMajorIllnesses.includes(item) == false) {
            allMajorIllnesses.push(item)
          }
        })
      }
      setDoYouHaveAHistoryOfSurgeries(
        newPatientPackSelector.doYouHaveAHistoryOfSurgeries
      )
      if (
        newPatientPackSelector.allMajorSurgeriesAndHospitalizations &&
        newPatientPackSelector.allMajorSurgeriesAndHospitalizations.length > 0
      ) {
        newPatientPackSelector.allMajorSurgeriesAndHospitalizations.forEach(
          (item: any) => {
            //if the object is not already in the array, add it
            if (
              allMajorSurgeriesAndHospitalizations.filter(
                (obj: any) => obj.twoItems.input == item.twoItems.input
              ).length == 0
            ) {
              allMajorSurgeriesAndHospitalizations.push(item)
            }
          }
        )
      }
      if (newPatientPackSelector.boneDensityScreening) {
        setBoneDensityScreening(newPatientPackSelector.boneDensityScreening)
      }
      if (newPatientPackSelector.BoneDensityScreeningDate) {
        setBoneDensityScreeningDate(
          newPatientPackSelector.BoneDensityScreeningDate
        )
      }
      setWasBoneDensityScreeningNormalOrAbnormal(
        newPatientPackSelector.wasBoneDensityScreeningNormalOrAbnormal
      )
      if (newPatientPackSelector.colonoscopyScreening) {
        setColonoscopyScreening(newPatientPackSelector.colonoscopyScreening)
      }
      setDateOfLastColonoscopyScreening(
        newPatientPackSelector.dateOfLastColonoscopyScreening
      )
      setWasColonoscopyScreeningNormalOrAbnormal(
        newPatientPackSelector.wasColonoscopyScreeningNormalOrAbnormal
      )

      if (newPatientPackSelector.allMedicalHistoryOfDisease) {
        setAllMedicalHistoryOfDisease(
          newPatientPackSelector.allMedicalHistoryOfDisease
        )
      } else {
        setAllMedicalHistoryOfDisease([])
      }
      // if (newPatientPackSelector.allMedicalHistoryOfDisease) {
      //   newPatientPackSelector.allMedicalHistoryOfDisease.forEach(
      //     (item: string) => {
      //       setAllMedicalHistoryOfDisease((prev) => [...prev, item])
      //     }
      //   )
      // } else {
      //   setAllMedicalHistoryOfDisease([])
      // }
      setHaveTheyEverSmoked(newPatientPackSelector.haveTheyEverSmoked)
      setHowManyPacksPerDay(newPatientPackSelector.howManyPacksPerDay)
      setAnyOtherTobaccoOrEcigarettes(
        newPatientPackSelector.anyOtherTobaccoOrEcigarettes
      )
      setDescribeOtherTobaccoUse(newPatientPackSelector.describeOtherTobaccoUse)
      setDoYouDrinkCoffee(newPatientPackSelector.doYouDrinkCoffee)
      setHowManyCupsPerDay(newPatientPackSelector.howManyCupsPerDay)
      setDoYouDrinkAlcohol(newPatientPackSelector.doYouDrinkAlcohol)
      setHowManyDrinksPerWeek(newPatientPackSelector.howManyDrinksPerWeek)
      setDoYoCurrentlyUseRecreationalDrugs(
        newPatientPackSelector.doYoCurrentlyUseRecreationalDrugs
      )
      setDescribeRecreationalDrugUse(
        newPatientPackSelector.describeRecreationalDrugUse
      )
      setDoYouUseIllegaLStreetDrugs(
        newPatientPackSelector.doYouUseIllegaLStreetDrugs
      )
      if (newPatientPackSelector.describeIllegalStreetDrugUse) {
        setDescribeIllegalStreetDrugUse(
          newPatientPackSelector.describeIllegalStreetDrugUse
        )
      }
      setDoYouFeelDepressed(newPatientPackSelector.doYouFeelDepressed)
      setDoYouCryFrequently(newPatientPackSelector.doYouCryFrequently)
      setDoYouHaveLittleInterestInDoingThings(
        newPatientPackSelector.doYouHaveLittleInterestInDoingThings
      )
      setDoYouFeelHopelessDownOrDepressed(
        newPatientPackSelector.doYouFeelHopelessDownOrDepressed
      )
      setDoYouHaveTroubleFallingAsleepOrSleepingTooMuch(
        newPatientPackSelector.doYouHaveTroubleFallingAsleepOrSleepingTooMuch
      )
      setDoYouFeelTiredOrHaveLittleEnergy(
        newPatientPackSelector.doYouFeelTiredOrHaveLittleEnergy
      )
      setDoYouHavAPoorAppetiteOrOverEating(
        newPatientPackSelector.doYouHavAPoorAppetiteOrOverEating
      )
      setDoYouFeelBadAboutYourself(
        newPatientPackSelector.doYouFeelBadAboutYourself
      )
      setTroubleConcentrating(newPatientPackSelector.troubleConcentrating)
      setDoYouMoveOrSpeakSlowly(newPatientPackSelector.doYouMoveOrSpeakSlowly)
      setThoughtsYouWouldBeBetterOffDead(
        newPatientPackSelector.thoughtsYouWouldBeBetterOffDead
      )
      setIsStressAMajorProblem(newPatientPackSelector.isStressAMajorProblem)
      setDoYouPanicWhenStressed(newPatientPackSelector.doYouPanicWhenStressed)
      setHaveYouEverAttemptedSuicide(
        newPatientPackSelector.haveYouEverAttemptedSuicide
      )
      if (
        newPatientPackSelector.familyMedicalAlcoholismAddiction &&
        newPatientPackSelector.familyMedicalAlcoholismAddiction.length > 0
      ) {
        setFamilyMedicalAlcoholismAddiction(
          newPatientPackSelector.familyMedicalAlcoholismAddiction
        )
      }
      if (
        newPatientPackSelector.familyMedicalBleedingDisorders &&
        newPatientPackSelector.familyMedicalBleedingDisorders.length > 0
      ) {
        setFamilyMedicalBleedingDisorders(
          newPatientPackSelector.familyMedicalBleedingDisorders
        )
      }
      if (
        newPatientPackSelector.familyMedicalCancer &&
        newPatientPackSelector.familyMedicalCancer.length > 0
      ) {
        setFamilyMedicalCancer(newPatientPackSelector.familyMedicalCancer)
      }
      if (
        newPatientPackSelector.familyMedicalDiabetes &&
        newPatientPackSelector.familyMedicalDiabetes.length > 0
      ) {
        setFamilyMedicalDiabetes(newPatientPackSelector.familyMedicalDiabetes)
      }
      if (
        newPatientPackSelector.familyMedicalHeartAttack &&
        newPatientPackSelector.familyMedicalHeartAttack.length > 0
      ) {
        setFamilyMedicalHeartAttack(
          newPatientPackSelector.familyMedicalHeartAttack
        )
      }
      if (
        newPatientPackSelector.familyMedicalHighBloodPressure &&
        newPatientPackSelector.familyMedicalHighBloodPressure.length > 0
      ) {
        setFamilyMedicalHighBloodPressure(
          newPatientPackSelector.familyMedicalHighBloodPressure
        )
      }
      if (
        newPatientPackSelector.familyMedicalHighCholesterol &&
        newPatientPackSelector.familyMedicalHighCholesterol.length > 0
      ) {
        setFamilyMedicalHighCholesterol(
          newPatientPackSelector.familyMedicalHighCholesterol
        )
      }
      if (
        newPatientPackSelector.familyMedicalKidneyDisease &&
        newPatientPackSelector.familyMedicalKidneyDisease.length > 0
      ) {
        setFamilyMedicalKidneyDisease(
          newPatientPackSelector.familyMedicalKidneyDisease
        )
      }
      if (
        newPatientPackSelector.familyMedicalMentalIllness &&
        newPatientPackSelector.familyMedicalMentalIllness.length > 0
      ) {
        setFamilyMedicalMentalIllness(
          newPatientPackSelector.familyMedicalMentalIllness
        )
      }
      if (
        newPatientPackSelector.familyMedicalStroke &&
        newPatientPackSelector.familyMedicalStroke.length > 0
      ) {
        setFamilyMedicalStroke(newPatientPackSelector.familyMedicalStroke)
      }
      if (
        newPatientPackSelector.familyMedicalTuberculosis &&
        newPatientPackSelector.familyMedicalTuberculosis.length > 0
      ) {
        setFamilyMedicalTuberculosis(
          newPatientPackSelector.familyMedicalTuberculosis
        )
      }
      setIsYourMotherStillLiving(newPatientPackSelector.isYourMotherStillLiving)
      setIsYourFatherStillLiving(newPatientPackSelector.isYourFatherStillLiving)
      setAreYouCurrentlyTakingAnyMedications(
        areYouCurrentlyTakingAnyMedications
      )
      setAreYouCurrentlyTakingAnyMedications(
        newPatientPackSelector.areYouCurrentlyTakingAnyMedications
      )
      if (
        newPatientPackSelector.listOfAllCurrentMedications &&
        newPatientPackSelector.listOfAllCurrentMedications.length > 0
      ) {
        newPatientPackSelector.listOfAllCurrentMedications.forEach(
          //if th object exists in the array don't add it to the array
          (item: any) => {
            if (
              listOfAllCurrentMedications.filter(
                (obj: any) => obj.drug.DrugName === item.drug.DrugName
              ).length === 0
            ) {
              listOfAllCurrentMedications.push(item)
            }
          }
        )
      }
    }
  }, [newPatientPackSelector])
  console.log(allMajorSurgeriesAndHospitalizations)
  //console.log(newPatientPackSelector.listOfAllCurrentMedications)

  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  const autoSaveDivRef = useRef(null)
  const [isVisibleAutoSaveMentalHealth, setIsVisibleAutoSaveMentalHealth] =
    useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisibleAutoSaveMentalHealth(entry.isIntersecting)
      },
      { threshold: 0.5 } // Trigger when 50% of component is visible
    )

    if (autoSaveDivRef.current) {
      observer.observe(autoSaveDivRef.current)
    }

    return () => {
      if (autoSaveDivRef.current) {
        observer.unobserve(autoSaveDivRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (
      autoSaveMentalHealth == false &&
      isVisibleAutoSaveMentalHealth == true
    ) {
      NewPatientPacketAutoSave({
        setSuccess: setAutoSaveMentalHealth,
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
        emailValue: auth.currentUser?.email,
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
        primarySubscribersDOB: primarySubscribersDOB,
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
        secondarySubscribersDOB: secondarySubscribersDOB,
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
        doYouHaveAnyDrugAllergies: doYouHaveAnyDrugAllergies,
        PatientDrugAllergies: PatientDrugAllergies,
        dateOfLastPAP: dateOfLastPAP,
        wasPapNormalOrAbnormal: wasPapNormalOrAbnormal,
        dateOfLastMammogram: dateOfLastMammogram,
        wasMammogramNormalOrAbnormal: wasMammogramNormalOrAbnormal,
        dateOfLastPSA: dateOfLastPSA,
        wasPSANormalOrAbnormal: wasPSANormalOrAbnormal,
        doYouHaveAHistoryOfAnyMajorIllness: doYouHaveAHistoryOfAnyMajorIllness,
        allMajorIllnesses: allMajorIllnesses,
        doYouHaveAHistoryOfSurgeries: doYouHaveAHistoryOfSurgeries,
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
        doYoCurrentlyUseRecreationalDrugs: doYoCurrentlyUseRecreationalDrugs,
        describeRecreationalDrugUse: describeRecreationalDrugUse,
        doYouUseIllegaLStreetDrugs: doYouUseIllegaLStreetDrugs,
        describeIllegalStreetDrugUse: describeIllegalStreetDrugUse,
        doYouFeelDepressed: doYouFeelDepressed,
        doYouCryFrequently: doYouCryFrequently,
        doYouHaveLittleInterestInDoingThings:
          doYouHaveLittleInterestInDoingThings,
        doYouFeelHopelessDownOrDepressed: doYouFeelHopelessDownOrDepressed,
        doYouHaveTroubleFallingAsleepOrSleepingTooMuch:
          doYouHaveTroubleFallingAsleepOrSleepingTooMuch,
        doYouFeelTiredOrHaveLittleEnergy: doYouFeelTiredOrHaveLittleEnergy,
        doYouHavAPoorAppetiteOrOverEating: doYouHavAPoorAppetiteOrOverEating,
        doYouFeelBadAboutYourself: doYouFeelBadAboutYourself,
        troubleConcentrating: troubleConcentrating,
        doYouMoveOrSpeakSlowly: doYouMoveOrSpeakSlowly,
        thoughtsYouWouldBeBetterOffDead: thoughtsYouWouldBeBetterOffDead,
        isStressAMajorProblem: isStressAMajorProblem,
        doYouPanicWhenStressed: doYouPanicWhenStressed,
        haveYouEverAttemptedSuicide: haveYouEverAttemptedSuicide,
        familyMedicalAlcoholismAddiction: familyMedicalAlcoholismAddiction,
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
        areYouCurrentlyTakingAnyMedications:
          areYouCurrentlyTakingAnyMedications,
        listOfAllCurrentMedications: listOfAllCurrentMedications,
        patientMedicalReviewSignature: patientMedicalReviewSignature,
        patientMedicalReviewSignatureDate: patientMedicalReviewSignatureDate,
        PatientMedicalReviewSignatureCheckBox:
          PatientMedicalReviewSignatureCheckBox,
        AdvancedDirectives: AdvancedDirectives,
        hippa: hippa,
        financialPolicySignature: financialPolicySignature,
        financialPolicySignatureCheckBox: financialPolicySignatureCheckBox,
        financialPolicySignatureDate: financialPolicySignatureDate,
        company: company,
      }).then(() => {
        console.log('success')
      })
    }
  }, [isVisibleAutoSaveMentalHealth])

  // console.log(familyMedicalStroke)
  return (
    <div
      className="item-center
      mb-10 flex w-full flex-col justify-center"
    >
      <Head>
        <title>AMA</title>
        <link rel="icon" href="/American Medical Associates.png" />
      </Head>
      <Header selectCompany={'AMA'} routePatientsHome={false} />
      <div className="flex w-full flex-col items-center justify-end">
        <div className="flex w-full items-center justify-end">
          <div className=" m-10 ">
            <MenuItem
              onClick={() => {
                router.push('/PatientLogin')
              }}
              text="Patient Page"
              icon={
                <UserIcon className="justify-content h-6 w-6 items-center" />
              }
            />
          </div>
        </div>
        <div className=" item-center  flex w-full justify-end p-3">
          <p
            onClick={() => {
              router.push('/PatientHelpPage')
            }}
            className=" mx-10 cursor-pointer text-[#377adf] underline"
          >
            Need Help?
          </p>
        </div>
      </div>

      <main className=" flex w-full flex-col  justify-center">
        <h1 className=" my-20 w-full text-center text-4xl">
          New Patient Packet
        </h1>
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
          firstNameRequired={requiredFirstName}
          addressRequired={requiredAddress}
          dateOfBirthRequired={requiredDateOfBirth}
          phoneNumberRequired={requiredPhoneNumber}
          emailRequired={requiredEmail}
        />
        <PhoneNumberInput
          placeHolder="Home Phone Number"
          value={homePhone}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
            setHomePhone(text.target.value)
          }
          widthPercentage="w-3/4"
          id={'homePhone'}
        />
        <AutoSaveLine success={autoSaveCheck} />
        <SocialInput
          placeHolder="Social Security Number"
          widthPercentage="w-3/4"
          value={socialValue}
          onClick={() => {
            const setAutoSave = async () => {
              setAutoSaveCheck(false)
            }
            setAutoSave().then(() => {
              NewPatientPacketAutoSave({
                setSuccess: setAutoSaveCheck,
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
                emailValue: auth.currentUser?.email,
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
                primarySubscribersDOB: primarySubscribersDOB,
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
                secondarySubscribersDOB: secondarySubscribersDOB,
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
                doYouHaveAnyDrugAllergies: doYouHaveAnyDrugAllergies,
                PatientDrugAllergies: PatientDrugAllergies,
                dateOfLastPAP: dateOfLastPAP,
                wasPapNormalOrAbnormal: wasPapNormalOrAbnormal,
                dateOfLastMammogram: dateOfLastMammogram,
                wasMammogramNormalOrAbnormal: wasMammogramNormalOrAbnormal,
                dateOfLastPSA: dateOfLastPSA,
                wasPSANormalOrAbnormal: wasPSANormalOrAbnormal,
                doYouHaveAHistoryOfAnyMajorIllness:
                  doYouHaveAHistoryOfAnyMajorIllness,
                allMajorIllnesses: allMajorIllnesses,
                doYouHaveAHistoryOfSurgeries: doYouHaveAHistoryOfSurgeries,
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
                areYouCurrentlyTakingAnyMedications:
                  areYouCurrentlyTakingAnyMedications,

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
            })
          }}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSocialValue(text.target.value)
          }}
          id={'social'}
          required={requireSocial}
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
        <div className="align-center flex w-full justify-center text-center">
          <div className="w-[50%]">
            <TakeAPictureCustom
              id="takeAPictureOfDriverLicense"
              text="Take A Picture Of The Front Of Your Drivers License (Click 'Choose File' to access camera.)"
              picture={pictureOfFrontOfDriverLicense}
              setPicture={setPictureOfFrontOfDriverLicense}
              key={1}
            />
          </div>
        </div>
        <TextInput
          id="preferredName"
          placeHolder="Preferred Name"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
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
        <div className=" w-[80%]">
          <CustomYesOrNo
            marginLeft="pl-[30%]"
            text="May we take your Picture for your Electronic Medical Record?"
            CheckState={setMayWeTakeYourPicture}
            isChecked={MayWeTakeYourPicture}
            id="mayWeTakeYourPicture"
          />
        </div>
        <div className="align-center flex w-full justify-center text-center">
          <div className="w-[50%]">
            <TakeAPictureCustom
              text="Take A Picture Of You (Click 'Choose File' to access camera.)"
              picture={pictureOfTheirFace}
              setPicture={setPictureOfTheirFace}
              key={2}
              id="pictureOfTheirFace"
            />
          </div>
        </div>
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
        />
        <SectionWithTitle
          title="Emergency Contact"
          subTitle="Please provide the name and phone number of a person we can contact in case of an emergency."
          BgColor="bg-[#e9e7e7b1]"
          children={[
            <TextInput
              id="emergencyContactName"
              placeHolder="Name of Emergency Contact"
              widthPercentage="w-full"
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setNameOfEmergency(text.target.value)
              }}
              value={nameOfEmergencyContact}
              required={requiredNameOfEmergencyContact}
            />,
            <TextInput
              id="emergencyContactRelationship"
              placeHolder="Relationship"
              widthPercentage="w-full"
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setEmergencyContactRelationShip(text.target.value)
              }}
              value={EmergencyContactRelationShip}
              required={requiredEmergencyContactRelationship}
            />,
            <PhoneNumberInput
              id="emergencyContactPhoneNumber"
              placeHolder="Phone Number"
              widthPercentage="w-full"
              value={EmergencyContactPhoneNumber}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setEmergencyContactPhoneNumber(text.target.value)
              }}
              required={requiredEmergencyContactPhoneNumber}
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
          required={requiredHowDidTheyHearAboutUs}
        />
        <CustomCheckBoxFeild
          id="howDoTheyWishToPay"
          checkBoxValues={howDoTheyWishToPay}
          allowMultipleCheckBoxes={false}
          marginLeft="ml-[25%]"
          title="How do you wish to pay for your care?"
          setCheckBoxValues={setHowDoTheyWishToPay}
          checkBoxTitles={['Out of Pocket', 'Insurance']}
          required={requiredHowDoTheyWishToPay}
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
                widthPercentage="w-full"
                onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                  setPrimaryInsurance(text.target.value)
                }}
                value={primaryInsurance}
                required={requiredPrimaryInsurance}
              />,
              <TextInput
                id="insurancePolicyNumber"
                placeHolder="Primary Insurance ID"
                widthPercentage="w-full"
                onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                  setPrimaryInsuranceID(text.target.value)
                }}
                value={primaryInsuranceID}
                required={requiredPrimaryInsuranceID}
              />,
              <TextInput
                id="insuranceGroupNumber"
                placeHolder="Primary Insurance Group"
                widthPercentage="w-full"
                onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                  setPrimaryInsuranceGroup(text.target.value)
                }}
                value={primaryInsuranceGroup}
                required={requiredPrimaryInsuranceGroup}
              />,
              <TextInput
                id="insurancePhoneNumber"
                placeHolder="primary Insurance Phone Number"
                widthPercentage="w-full"
                onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                  setPrimaryInsurancePhone(text.target.value)
                }}
                value={primaryInsurancePhone}
                required={requiredPrimaryInsurancePhone}
              />,
              // <div className=" flex w-full items-center justify-center">
              //   <AddressInput
              //     id="insuranceAddress"
              //     addressValue={primaryInsuranceAddress1}
              //     addressState={setPrimaryInsuranceAddress1}
              //     addressState2={setPrimaryInsuranceAddress2}
              //     addressValue2={primaryInsuranceAddress2}
              //     cityValue={primaryInsuranceCity}
              //     cityState={setPrimaryInsuranceCity}
              //     USStateValue={primaryInsuranceState}
              //     USStateState={setPrimaryInsuranceState}
              //     zipCodeValue={primaryInsuranceZip}
              //     zipCodeState={setPrimaryInsuranceZip}
              //   />
              // </div>,
              <TextInput
                id="subscriberName"
                placeHolder="Subscriber Name"
                widthPercentage="w-full"
                onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                  setPrimarySubscribersName(text.target.value)
                }}
                value={primarySubscribersName}
                required={requiredPrimarySubscribersName}
              />,
              <DateInput
                id="subscriberDOB"
                placeHolder="Subscriber Date Of Birth"
                widthPercentage="w-full"
                onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                  setPrimarySubscribersDOB(text.target.value)
                }}
                value={primarySubscribersDOB}
                required={requiredPrimarySubscribersDOB}
              />,

              <div className=" flex w-full flex-col items-center justify-center">
                <TakeAPictureCustom
                  id="insuranceCardPicture"
                  text="Take A Picture Of Your Insurance Card (Front)"
                  picture={primaryPictureOfInsuranceCardFront}
                  setPicture={setPrimaryPictureOfInsuranceCardFront}
                  key={3}
                  required={requiredPrimaryPictureOfInsuranceCardFront}
                />
                <TakeAPictureCustom
                  id="insuranceCardPictureBack"
                  text="Take A Picture Of Your Insurance Card (Back)"
                  picture={primaryPictureOfInsuranceCardBack}
                  setPicture={setPrimaryPictureOfInsuranceCardBack}
                  key={4}
                  required={requiredPrimaryPictureOfInsuranceCardBack}
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
                widthPercentage="w-full"
                onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                  setSecondaryInsurance(text.target.value)
                }}
                value={secondaryInsurance}
              />,
              <TextInput
                placeHolder="Secondary Insurance ID"
                widthPercentage="w-full"
                onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                  setSecondaryInsuranceID(text.target.value)
                }}
                value={secondaryInsuranceID}
              />,
              <TextInput
                placeHolder="Secondary Insurance Group"
                widthPercentage="w-full"
                onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                  setSecondaryInsuranceGroup(text.target.value)
                }}
                value={secondaryInsuranceGroup}
              />,
              <TextInput
                placeHolder="Secondary Insurance Phone Number"
                widthPercentage="w-full"
                onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                  setSecondaryInsurancePhone(text.target.value)
                }}
                value={secondaryInsurancePhone}
              />,
              // <div className=" flex w-full items-center justify-center">
              //   <AddressInput
              //     addressValue={secondaryInsuranceAddress1}
              //     addressState={setSecondaryInsuranceAddress1}
              //     addressState2={setSecondaryInsuranceAddress2}
              //     addressValue2={secondaryInsuranceAddress2}
              //     cityValue={secondaryInsuranceCity}
              //     cityState={setSecondaryInsuranceCity}
              //     USStateValue={secondaryInsuranceState}
              //     USStateState={setSecondaryInsuranceState}
              //     zipCodeValue={secondaryInsuranceZip}
              //     zipCodeState={setSecondaryInsuranceZip}
              //   />
              // </div>,
              <TextInput
                placeHolder="Subscriber Name"
                widthPercentage="w-full"
                onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                  setSecondarySubscribersName(text.target.value)
                }}
                value={secondarySubscribersName}
              />,
              <DateInput
                placeHolder="Subscriber Date Of Birth"
                widthPercentage="w-full"
                onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                  setSecondarySubscribersDOB(text.target.value)
                }}
                value={secondarySubscribersDOB}
              />,

              <div className="flex w-full flex-col items-center justify-center ">
                <TakeAPictureCustom
                  text="Take A Picture Of Your Insurance Card (Front)"
                  picture={secondaryPictureOfInsuranceCardFront}
                  setPicture={setSecondaryPictureOfInsuranceCardFront}
                  key={5}
                  id="SecondaryInsuranceCardPicture"
                />
                <TakeAPictureCustom
                  text="Take A Picture Of Your Insurance Card (Back)"
                  picture={secondaryPictureOfInsuranceCardBack}
                  setPicture={setSecondaryPictureOfInsuranceCardBack}
                  key={6}
                  id="SecondaryInsuranceCardPictureBack"
                />
              </div>,
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
              widthPercentage="w-full"
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setRetailPharmacyName(text.target.value)
              }}
              value={retailPharmacyName}
              required={requiredRetailPharmacyName}
            />,
            <div className=" flex w-full flex-col items-center justify-center">
              <h4 className=" text-center">Retail Pharmacy Cross Streets</h4>
              <div className="flex w-full flex-col items-center justify-center md:flex-row">
                <TextInput
                  id="pharmacyCrossStreet1"
                  placeHolder="Street 1"
                  widthPercentage="w-full"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setRetailPharmacyCrossStreet1(text.target.value)
                  }}
                  value={retailPharmacyCrossStreet1}
                  required={requiredRetailPharmacyCrossStreet1}
                />
                <TextInput
                  id="pharmacyCrossStreet2"
                  placeHolder="Street 2"
                  widthPercentage="w-full"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    setRetailPharmacyCrossStreet2(text.target.value)
                  }}
                  value={retailPharmacyCrossStreet2}
                  required={requiredRetailPharmacyCrossStreet2}
                />
              </div>
            </div>,
            <PhoneNumberInput
              id="pharmacyPhoneNumber"
              placeHolder="Retail Pharmacy Phone Number"
              widthPercentage="w-full"
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setRetailPharmacyPhoneNumber(text.target.value)
              }}
              value={retailPharmacyPhoneNumber}
              required={requiredRetailPharmacyPhoneNumber}
            />,
            <PhoneNumberInput
              id="pharmacyFaxNumber"
              placeHolder="Retail Pharmacy Fax Number"
              widthPercentage="w-full"
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
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
              widthPercentage="w-full"
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
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
              widthPercentage="w-full"
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setMailOrderPharmacyPhoneNumber(text.target.value)
              }}
              value={mailOrderPharmacyPhoneNumber}
            />,
          ]}
        />
        <div className=" mt-20 flex items-center justify-center">
          <LineDivider
            lineColor="bg-[#e9e7e7b1]"
            lineWidth="w-full"
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
              isChecked={areYouAllergicToLatex}
              CheckState={setAreYouAllergicToLatex}
              required={requiredAreYouAllergicToLatex}
            />,
            <CustomYesOrNo
              id="allergicToShellfish"
              marginLeft="pl-[5%]"
              text="Allergic to shellfish?"
              isChecked={areYouAllergicToSelfish}
              CheckState={setAreYouAllergicToSelfish}
              required={requiredAreYouAllergicToSelfish}
            />,
            <CustomYesOrNo
              id="allergicToIodine"
              marginLeft="pl-[5%]"
              text="Allergic to iodine?"
              isChecked={areYouAllergicToIodine}
              CheckState={setAreYouAllergicToIodine}
              required={requiredAreYouAllergicToIodine}
            />,
            <CustomYesOrNo
              id="doYouHaveDrugAllergies"
              marginLeft="pl-[5%]"
              text="Do you have any medication or drug allergies?"
              isChecked={doYouHaveAnyDrugAllergies}
              CheckState={setDoYouHaveAnyDrugAllergies}
              required={requiredDoYouHaveAnyDrugAllergies}
            />,
            doYouHaveAnyDrugAllergies === 'Yes' && (
              <UserCreatedListFromInputBox
                id="doYouHaveDrugAllergies"
                title="Please type each individual drug you are allergic to and press add item to add it to the list."
                list={PatientDrugAllergies}
                inputBoxPlaceHolder="Drug Allergies"
                required={requiredDrugAllergies}
              />
            ),
          ]}
        />
        <SectionWithTitle
          subTitle="For female patients only"
          BgColor="bg-[#e9e7e7b1]"
          children={[
            <DateInput
              placeHolder="Date of last pap smear (mmddyyyy)"
              widthPercentage="w-full"
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setDateOfLastPAP(text.target.value)
              }}
              value={dateOfLastPAP}
            />,

            <CustomCheckBoxFeild
              title="Was the pap smear normal?"
              checkBoxValues={wasPapNormalOrAbnormal}
              allowMultipleCheckBoxes={false}
              checkBoxTitles={['Normal', 'Abnormal']}
              setCheckBoxValues={setWasPapNormalOrAbnormal}
              marginLeft="ml-[25%]"
            />,
            <DateInput
              placeHolder="Date of last mammogram (mmddyyyy)"
              widthPercentage="w-full"
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setDateOfLastMammogram(text.target.value)
              }}
              value={dateOfLastMammogram}
            />,
            <CustomCheckBoxFeild
              title="Was the mammogram normal?"
              checkBoxValues={wasMammogramNormalOrAbnormal}
              allowMultipleCheckBoxes={false}
              checkBoxTitles={['Normal', 'Abnormal']}
              setCheckBoxValues={setWasMammogramNormalOrAbnormal}
              marginLeft="ml-[25%]"
            />,
          ]}
        />
        <SectionWithTitle
          subTitle="For male Patient's only"
          BgColor="bg-[#e9e7e7b1]"
          children={[
            <DateInput
              placeHolder="Date of Last PSA (mmddyyyy)"
              widthPercentage="w-full"
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setDateOfLastPSA(text.target.value)
              }}
              value={dateOfLastPSA}
            />,
            <CustomCheckBoxFeild
              title="Was the PSA normal?"
              checkBoxValues={wasPSANormalOrAbnormal}
              allowMultipleCheckBoxes={false}
              checkBoxTitles={['Normal', 'Abnormal']}
              setCheckBoxValues={setWasPSANormalOrAbnormal}
              marginLeft="ml-[25%]"
            />,
          ]}
        />
        <CustomYesOrNo
          id="doYouHaveAnyMajorIllnesses"
          marginLeft="ml-[30%]"
          text="Do you have a history or currently have any major illnesses?"
          isChecked={doYouHaveAHistoryOfAnyMajorIllness}
          CheckState={setDoYouHaveAHistoryOfAnyMajorIllness}
          required={requiredDoYouHaveAHistoryOfAnyMajorIllness}
        />
        {doYouHaveAHistoryOfAnyMajorIllness === 'Yes' && (
          <UserCreatedListFromInputBox
            id="majorIllnesses"
            title='Please list all major illnesses individually and press "Add Item" to add it to the list.'
            inputBoxPlaceHolder="Major Illnesses"
            list={allMajorIllnesses}
            required={requiredMajorIllnesses}
          />
        )}
        <CustomYesOrNo
          id="doYouHaveAnySurgeries"
          marginLeft="ml-[30%]"
          text="Do you have a history of any major surgeries or hospitalizations?"
          isChecked={doYouHaveAHistoryOfSurgeries}
          CheckState={setDoYouHaveAHistoryOfSurgeries}
          required={requiredDoYouHaveAHistoryOfSurgeries}
        />
        {doYouHaveAHistoryOfSurgeries === 'Yes' && (
          <UserCreatedListFromInputBox
            id="majorSurgeries"
            title='Please list all Surgeries individually and press "Add Item" to add it to the list.'
            inputBoxPlaceHolder="Surgeries and Hospitalizations"
            showDateField={true}
            list={allMajorSurgeriesAndHospitalizations}
            dateFieldPlaceHolder="Date of Surgery or Hospitalizations (mmddyyyy)"
            required={requiredMajorSurgeriesAndHospitalizations}
          />
        )}
        <SectionWithTitle
          subTitle="Select what screenings you have had."
          BgColor="bg-[#e9e7e7b1]"
          children={[
            <CustomYesOrNo
              id="haveYouHadBoneDensityScreening"
              marginLeft="ml-[25%]"
              text="Have  you had a Bone Density screening?"
              isChecked={boneDensityScreening}
              CheckState={setBoneDensityScreening}
              required={requiredBoneDensityScreening}
            />,
            boneDensityScreening == 'Yes' && (
              <DateInput
                id="dateOfBoneDensityScreening"
                placeHolder="Date of last bone density screening (mmddyyyy)"
                widthPercentage="w-3/4"
                onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                  setBoneDensityScreeningDate(text.target.value)
                }}
                value={BoneDensityScreeningDate}
                required={requiredBoneDensityScreeningDate}
              />
            ),
            boneDensityScreening == 'Yes' && (
              <CustomCheckBoxFeild
                id="boneDensityScreeningResults"
                title="Was the bone density screening normal?"
                checkBoxValues={wasBoneDensityScreeningNormalOrAbnormal}
                allowMultipleCheckBoxes={false}
                checkBoxTitles={['Normal', 'Abnormal']}
                setCheckBoxValues={setWasBoneDensityScreeningNormalOrAbnormal}
                marginLeft="ml-[25%]"
                required={requiredWasBoneDensityScreeningNormalOrAbnormal}
              />
            ),
            <CustomYesOrNo
              id="haveYouHadColonoscopy"
              marginLeft="ml-[25%]"
              text="Have you had a colonoscopy screening?"
              isChecked={colonoscopyScreening}
              CheckState={setColonoscopyScreening}
              required={requiredColonoscopyScreening}
            />,
            colonoscopyScreening == 'Yes' && (
              <DateInput
                id="dateOfColonoscopyScreening"
                placeHolder="Date of last colonoscopy (mmddyyyy)"
                widthPercentage="w-full"
                onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                  setDateOfLastColonoscopyScreening(text.target.value)
                }}
                value={dateOfLastColonoscopyScreening}
                required={requiredDateOfLastColonoscopyScreening}
              />
            ),
            colonoscopyScreening == 'Yes' && (
              <CustomCheckBoxFeild
                id="colonoscopyScreeningResults"
                title="Was the colonoscopy normal?"
                checkBoxValues={wasColonoscopyScreeningNormalOrAbnormal}
                allowMultipleCheckBoxes={false}
                checkBoxTitles={['Normal', 'Abnormal']}
                setCheckBoxValues={setWasColonoscopyScreeningNormalOrAbnormal}
                marginLeft="ml-[25%]"
                required={requiredWasColonoscopyScreeningNormalOrAbnormal}
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
              text="Have you ever smoked?"
              isChecked={haveTheyEverSmoked}
              CheckState={setHaveTheyEverSmoked}
              required={requiredHaveTheyEverSmoked}
            />,
            <TextInput
              id="howManyPacksPerDay"
              placeHolder="If yes, how many packs per day?"
              widthPercentage="w-full"
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setHowManyPacksPerDay(text.target.value)
              }}
              value={howManyPacksPerDay}
              required={requiredHowManyPacksPerDay}
            />,
            <CustomYesOrNo
              id="otherTabaccoUse"
              text="Any other tobacco, vap or e-cig products?"
              isChecked={anyOtherTobaccoOrEcigarettes}
              CheckState={setAnyOtherTobaccoOrEcigarettes}
              required={requiredAnyOtherTobaccoOrEcigarettes}
            />,
            <TextInput
              id="describeOtherTobaccoUse"
              placeHolder="If yes, please describe."
              widthPercentage="w-full"
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setDescribeOtherTobaccoUse(text.target.value)
              }}
              value={describeOtherTobaccoUse}
              required={requiredDescribeOtherTobaccoUse}
            />,
            <CustomYesOrNo
              id="doYouUseRecreationalDrugs"
              text="Have you ever used recreational drugs?"
              isChecked={doYoCurrentlyUseRecreationalDrugs}
              CheckState={setDoYoCurrentlyUseRecreationalDrugs}
              required={requiredDoYoCurrentlyUseRecreationalDrugs}
            />,
            <TextInput
              id="describeRecreationalDrugUse"
              placeHolder="If yes, please describe."
              widthPercentage="w-full"
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setDescribeRecreationalDrugUse(text.target.value)
              }}
              value={describeRecreationalDrugUse}
              required={requiredDescribeRecreationalDrugUse}
            />,
            <CustomYesOrNo
              id="doYouDrinkAlcohol"
              text="Do you drink alcohol"
              isChecked={doYouDrinkAlcohol}
              CheckState={setDoYouDrinkAlcohol}
              required={requiredDoYouDrinkAlcohol}
            />,
            <TextInput
              id="howManyDrinksPerWeek"
              placeHolder="If yes, how many drinks per week?"
              widthPercentage="w-full"
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setHowManyDrinksPerWeek(text.target.value)
              }}
              value={howManyDrinksPerWeek}
              required={requiredHowManyDrinksPerWeek}
            />,
            <CustomYesOrNo
              id="doYouDrinkCoffee"
              text="Do you drink caffinated beverages | coffee?"
              isChecked={doYouDrinkCoffee}
              CheckState={setDoYouDrinkCoffee}
              required={requiredDoYouDrinkCoffee}
            />,
            <TextInput
              id="howManyCupsPerDay"
              placeHolder="If yes, how many cups per day?"
              widthPercentage="w-full"
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setHowManyCupsPerDay(text.target.value)
              }}
              value={howManyCupsPerDay}
              required={requiredHowManyCupsPerDay}
            />,
            <CustomYesOrNo
              id="doYouUseIllegaLStreetDrugs"
              text="Do you use illegal street drugs?"
              isChecked={doYouUseIllegaLStreetDrugs}
              CheckState={setDoYouUseIllegaLStreetDrugs}
              required={requiredDoYouUseIllegaLStreetDrugs}
            />,
            <TextInput
              id="describeIllegalStreetDrugUse"
              placeHolder="If yes, please describe."
              widthPercentage="w-full"
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setDescribeIllegalStreetDrugUse(text.target.value)
              }}
              value={describeIllegalStreetDrugUse}
              required={requiredDescribeIllegaLStreetDrugUse}
            />,
          ]}
        />
        <AutoSaveLine success={autoSaveMentalHealth} />
        <div
          className="h-16 w-full"
          onMouseEnter={() => {
            const setAutoSave = async () => {
              setAutoSaveMentalHealth(false)
            }
            if (autoSaveMentalHealth !== true) {
              setAutoSave().then(() => {
                NewPatientPacketAutoSave({
                  setSuccess: setAutoSaveMentalHealth,
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
                  primarySubscribersDOB: primarySubscribersDOB,
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
                  secondarySubscribersDOB: secondarySubscribersDOB,
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
                  doYouHaveAnyDrugAllergies: doYouHaveAnyDrugAllergies,
                  PatientDrugAllergies: PatientDrugAllergies,
                  dateOfLastPAP: dateOfLastPAP,
                  wasPapNormalOrAbnormal: wasPapNormalOrAbnormal,
                  dateOfLastMammogram: dateOfLastMammogram,
                  wasMammogramNormalOrAbnormal: wasMammogramNormalOrAbnormal,
                  dateOfLastPSA: dateOfLastPSA,
                  wasPSANormalOrAbnormal: wasPSANormalOrAbnormal,
                  doYouHaveAHistoryOfAnyMajorIllness:
                    doYouHaveAHistoryOfAnyMajorIllness,
                  allMajorIllnesses: allMajorIllnesses,
                  doYouHaveAHistoryOfSurgeries: doYouHaveAHistoryOfSurgeries,
                  allMajorSurgeriesAndHospitalizations:
                    allMajorSurgeriesAndHospitalizations,
                  boneDensityScreening: boneDensityScreening,
                  BoneDensityScreeningDate: BoneDensityScreeningDate,
                  wasBoneDensityScreeningNormalOrAbnormal:
                    wasBoneDensityScreeningNormalOrAbnormal,
                  colonoscopyScreening: colonoscopyScreening,
                  dateOfLastColonoscopyScreening:
                    dateOfLastColonoscopyScreening,
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
                  familyMedicalBleedingDisorders:
                    familyMedicalBleedingDisorders,
                  familyMedicalCancer: familyMedicalCancer,
                  familyMedicalDiabetes: familyMedicalDiabetes,
                  familyMedicalHeartAttack: familyMedicalHeartAttack,
                  familyMedicalHighBloodPressure:
                    familyMedicalHighBloodPressure,
                  familyMedicalHighCholesterol: familyMedicalHighCholesterol,
                  familyMedicalKidneyDisease: familyMedicalKidneyDisease,
                  familyMedicalMentalIllness: familyMedicalMentalIllness,
                  familyMedicalStroke: familyMedicalStroke,
                  familyMedicalTuberculosis: familyMedicalTuberculosis,
                  isYourMotherStillLiving: isYourMotherStillLiving,
                  isYourFatherStillLiving: isYourFatherStillLiving,
                  areYouCurrentlyTakingAnyMedications:
                    areYouCurrentlyTakingAnyMedications,
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
              })
            }
          }}
        ></div>
        <SectionWithTitle
          title="Mental Health Questions"
          subTitle="Check if you have had the following (check ALL that apply):"
          BgColor="bg-[#e9e7e7b1]"
          children={[
            <div>
              <CustomYesOrNo
                id="doYouFeelDepressed"
                text="Do you feel depressed?"
                isChecked={doYouFeelDepressed}
                CheckState={setDoYouFeelDepressed}
                required={requiredDoYouFeelDepressed}
              />
            </div>,
            <div>
              {doYouFeelDepressed == 'Yes' && (
                <div>
                  <CustomYesOrNo
                    id="doYouCryFrequently"
                    text="Do you cry frequently?"
                    isChecked={doYouCryFrequently}
                    CheckState={setDoYouCryFrequently}
                    required={requiredDoYouCryFrequently}
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
                    required={requiredDoYouHaveLittleInterestInDoingThings}
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
                    required={requiredDoYouFeelHopelessDownOrDepressed}
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
                    required={
                      requiredDoYouHaveTroubleFallingAsleepOrSleepingTooMuch
                    }
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
                    required={requiredDoYouFeelTiredOrHaveLittleEnergy}
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
                    required={requiredDoYouHavAPoorAppetiteOrOverEating}
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
                    required={requiredDoYouFeelBadAboutYourself}
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
                    required={requiredTroubleConcentrating}
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
                    required={requiredDoYouMoveOrSpeakSlowly}
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
                    required={requiredThoughtsYouWouldBeBetterOffDead}
                  />

                  <CustomYesOrNo
                    id="isStressAMajorProblemForYou"
                    text="Is stress a major problem for you?"
                    CheckState={setIsStressAMajorProblem}
                    required={requiredIsStressAMajorProblem}
                  />
                  <CustomYesOrNo
                    id="doYouPanicWhenStressed"
                    text="Do you panic when stressed?"
                    CheckState={setDoYouPanicWhenStressed}
                    required={requiredDoYouPanicWhenStressed}
                  />
                  <CustomYesOrNo
                    id="HaveYouAttemptedSuicide"
                    text="Have you ever attempted suicide or seriously thought about hurting yourself?"
                    CheckState={setHaveYouEverAttemptedSuicide}
                    required={requiredHaveYouEverAttemptedSuicide}
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
                'Maternal Grandmother',
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
                'Maternal Grandmother',
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
                'Maternal Grandmother',
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
                'Maternal Grandmother',
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
                'Maternal Grandmother',
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
                'Maternal Grandmother',
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
                'Maternal Grandmother',
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
                'Maternal Grandmother',
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
                'Maternal Grandmother',
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
                'Maternal Grandmother',
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
                'Maternal Grandmother',
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
              isChecked={isYourMotherStillLiving}
            />,
            <CustomYesOrNo
              text="Is your father still alive?"
              CheckState={setIsYourFatherStillLiving}
              isChecked={isYourFatherStillLiving}
            />,
          ]}
        />

        <SectionWithTitle
          title="Medications"
          children={[
            <div>
              <CustomYesOrNo
                text="Are you currently taking any medications?"
                CheckState={setAreYouCurrentlyTakingAnyMedications}
                id="areYouCurrentlyTakingAnyMedications"
                isChecked={areYouCurrentlyTakingAnyMedications}
                required={requireAreYouCurrentlyTakingAnyMedications}
              />
            </div>,
            areYouCurrentlyTakingAnyMedications === 'Yes' && (
              <UserCreatedListFromInputBox
                title="Please type all medications you are currently taking individually then click add item to add them to the list."
                showAddDrugFields={true}
                list={listOfAllCurrentMedications}
                id="listOfAllCurrentMedications"
                required={requireListOfAllCurrentMedications}
              />
            ),
          ]}
        />
        <div className=" mx-6">
          <AutoSaveLine success={autoSaveMedicalSignature} />
          <Signature
            requiredCheckBox={requirePatientMedicalReviewSignatureCheckBox}
            requiredSignature={requirePatientMedicalReviewSignature}
            requiredDate={requirePatientMedicalReviewSignatureDate}
            id="patientMedicalReviewSignature"
            signatureValue={patientMedicalReviewSignature}
            signatureState={setPatientMedicalReviewSignature}
            agreeThatTheirSignatureIsValid={
              PatientMedicalReviewSignatureCheckBox
            }
            agreeThatTheirSignatureIsValidState={
              setPatientMedicalReviewSignatureCheckBox
            }
            date={patientMedicalReviewSignatureDate}
            dateState={setPatientMedicalSignatureReviewDate}
            WhatTheyAreSigningFor="I certify that the information provided in this form is true and correct to the best of my knowledge and I have Listed ALL surgeries,hospitalizations,major illnesses, medications,supplements, and noted ANY medical conditions(s) past and current. I understand that it is my responsibility to inform my physician if I, or my minor child of any changes in my medical history."
            signatureOnClick={() => {
              const setAutoSave = async () => {
                setAutoSaveMedicalSignature(false)
              }
              setAutoSave().then(() => {
                NewPatientPacketAutoSave({
                  setSuccess: setAutoSaveMedicalSignature,
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
                  primarySubscribersDOB: primarySubscribersDOB,
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
                  secondarySubscribersDOB: secondarySubscribersDOB,
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
                  doYouHaveAnyDrugAllergies: doYouHaveAnyDrugAllergies,
                  PatientDrugAllergies: PatientDrugAllergies,
                  dateOfLastPAP: dateOfLastPAP,
                  wasPapNormalOrAbnormal: wasPapNormalOrAbnormal,
                  dateOfLastMammogram: dateOfLastMammogram,
                  wasMammogramNormalOrAbnormal: wasMammogramNormalOrAbnormal,
                  dateOfLastPSA: dateOfLastPSA,
                  wasPSANormalOrAbnormal: wasPSANormalOrAbnormal,
                  doYouHaveAHistoryOfAnyMajorIllness:
                    doYouHaveAHistoryOfAnyMajorIllness,
                  allMajorIllnesses: allMajorIllnesses,
                  allMajorSurgeriesAndHospitalizations:
                    allMajorSurgeriesAndHospitalizations,
                  doYouHaveAHistoryOfSurgeries: doYouHaveAHistoryOfSurgeries,
                  boneDensityScreening: boneDensityScreening,
                  BoneDensityScreeningDate: BoneDensityScreeningDate,
                  wasBoneDensityScreeningNormalOrAbnormal:
                    wasBoneDensityScreeningNormalOrAbnormal,
                  colonoscopyScreening: colonoscopyScreening,
                  dateOfLastColonoscopyScreening:
                    dateOfLastColonoscopyScreening,
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
                  familyMedicalBleedingDisorders:
                    familyMedicalBleedingDisorders,
                  familyMedicalCancer: familyMedicalCancer,
                  familyMedicalDiabetes: familyMedicalDiabetes,
                  familyMedicalHeartAttack: familyMedicalHeartAttack,
                  familyMedicalHighBloodPressure:
                    familyMedicalHighBloodPressure,
                  familyMedicalHighCholesterol: familyMedicalHighCholesterol,
                  familyMedicalKidneyDisease: familyMedicalKidneyDisease,
                  familyMedicalMentalIllness: familyMedicalMentalIllness,
                  familyMedicalStroke: familyMedicalStroke,
                  familyMedicalTuberculosis: familyMedicalTuberculosis,
                  isYourMotherStillLiving: isYourMotherStillLiving,
                  isYourFatherStillLiving: isYourFatherStillLiving,
                  areYouCurrentlyTakingAnyMedications:
                    areYouCurrentlyTakingAnyMedications,
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
              })
            }}
          />
        </div>
        <div className=" mt-20 flex items-center justify-center">
          <LineDivider
            lineColor="bg-[#e9e7e7b1]"
            lineWidth="w-3/4"
            lineHeight="h-[10px]"
          />
        </div>
        <AdvancedDirectivesLivingWill
          id="advancedDirectivesLivingWill"
          AdvancedDirectivesLivingWillState={setAdvancedDirectives}
          required={requireAdvancedDirectivesSignature}
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
          children={[
            <HIPPAconsentForm
              id="hippa"
              HippaConsentFormState={setHippa}
              required={requireHippaSignature}
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
          title="FINANCIAL POLICY /CANCELLATION POLICY AGREEMENT"
          subTitle="If You Need a copy of this form, please ask the office staff."
          children={[
            <FINANCIALPOLICY />,
            <div
              id="financialPolicy"
              className=" flex w-full items-center justify-center"
            >
              <Signature
                requiredCheckBox={requireFinancialPolicySignatureCheckBox}
                requiredSignature={requireFinancialPolicySignature}
                requiredDate={requireFinancialPolicySignatureDate}
                signatureValue={financialPolicySignature}
                signatureState={setFinancialPolicySignature}
                agreeThatTheirSignatureIsValid={
                  financialPolicySignatureCheckBox
                }
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
        {showCheckMark && (
          <GreenCheckMark
            checkMarkText="Thank You"
            bottomText="Your information has been submitted"
          />
        )}
        {loading && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-center font-bold  text-red-500 md:text-xl ">
              If your packet is taking longer then expected then click to resume
              your progress from last auto save.
            </p>
            <p
              className="cursor-pointer text-xl  font-bold text-[#377adf] underline"
              onClick={() => {
                setLoading(false)
                router.push('/PatientLogin')
              }}
            >
              Click Here
            </p>
          </div>
        )}

        <div className=" mt-10 flex flex-col items-center justify-center">
          <p
            onClick={() => {
              router.push('/PatientHelpPage')
            }}
            className=" mx-10 cursor-pointer text-[#377adf] underline"
          >
            Need Help?
          </p>
          <MainButton
            onClick={async () => {
              setLoading(true)
              //TODO: Ask Jasmine if she wants to require medications, drug allergies, all Surgeries, major illneses. as of now we ask for them to put none if its none do we want that?
              //TODO: ADD CHECK BOXES for all the list quests to add items
              //TODO: MAKE IT SCROLL TO ERROR
              //make felids are filled out
              if (firstName === '') {
                //alert('Please enter your first name')
                setRequiredFirstName(true)
                router.push('/NewPatientPacket/#fullName').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                  //scroll up 200px
                })
                setLoading(false)
                return
              } else if (lastName === '') {
                setRequiredFirstName(true)
                router.push('/NewPatientPacket/#fullName').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                  //scroll up 200px
                })
                //alert('Please enter your last name')
                setLoading(false)
                return
              } else if (BirthDateValue === '') {
                setRequiredDateOfBirth(true)
                router.push('/NewPatientPacket/#birthDate').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                  //scroll up 200px
                })
                //alert('Please enter your birth date')
                setLoading(false)
                return
              } else if (phoneNumberValue === '') {
                setRequiredPhoneNumber(true)
                //alert('Please enter your phone number')
                //scroll to phone number feild
                router.push('/NewPatientPacket/#phoneNumber').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                //scroll up 200px
                // window.scrollBy(0, -200)
                return
              } else if (emailValue === '') {
                setRequiredEmail(true)
                router.push('/NewPatientPacket/#email').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })

                //alert('Please enter your email')
                setLoading(false)

                return
              } else if (addressValue === '') {
                setRequiredAddress(true)
                router.push('/NewPatientPacket/#fullAddress').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                //alert('Please enter your address')
                setLoading(false)
                return
              } else if (cityValue === '') {
                setRequiredAddress(true)
                router.push('/NewPatientPacket/#email').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                //alert('Please enter your city')
                setLoading(false)
                return
              } else if (USStateValue === '') {
                setRequiredAddress(true)
                router.push('/NewPatientPacket/#email').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                //alert('Please enter your state')
                setLoading(false)
                return
              } else if (zipCodeValue === '') {
                setRequiredAddress(true)
                router.push('/NewPatientPacket/#email').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                //alert('Please enter your zip code')
                setLoading(false)
                return
              } else if (socialValue === '') {
                setRequireSocial(true)
                //alert('Please enter your social security number')
                router.push('/NewPatientPacket/#social').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
              } else if (nameOfEmergencyContact === '') {
                setRequiredNameOfEmergencyContact(true)
                router
                  .push('/NewPatientPacket/#emergencyContactName')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })

                //alert('Please enter the name of your emergency contact')

                window.scrollBy(0, -1500)
                setLoading(false)

                return
              } else if (EmergencyContactRelationShip === '') {
                setRequiredEmergencyContactRelationship(true)
                //alert('Please enter the relationship of your emergency contact')
                router
                  .push('/NewPatientPacket/#emergencyContactRelationship')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (EmergencyContactPhoneNumber === '') {
                setRequiredEmergencyContactPhoneNumber(true)
                //alert('Please enter the phone number of your emergency contact')
                router
                  .push('/NewPatientPacket/#emergencyContactPhoneNumber')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (HowDidTheyHearAboutUs === '') {
                setRequiredHowDidTheyHearAboutUs(true)
                //alert('Please enter how you heard about us')
                router
                  .push('/NewPatientPacket/#howDidYouHearAboutUs')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (howDoTheyWishToPay === '') {
                setRequiredHowDoTheyWishToPay(true)
                //alert(
                //   'Please enter how you wish to pay, out of pocket or insurance'
                // )
                router
                  .push('/NewPatientPacket/#howDoTheyWishToPay')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                primaryInsurance === '' &&
                howDoTheyWishToPay === 'Insurance'
              ) {
                setRequiredPrimaryInsurance(true)
                //alert('Please enter your insurance name')
                router.push('/NewPatientPacket/#insuranceName').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
              } else if (
                primaryInsuranceID === '' &&
                howDoTheyWishToPay === 'Insurance'
              ) {
                setRequiredPrimaryInsuranceID(true)
                //alert('Please enter your insurance policy number')
                router
                  .push('/NewPatientPacket/#insurancePolicyNumber')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                primaryInsurancePhone === '' &&
                howDoTheyWishToPay === 'Insurance'
              ) {
                setRequiredPrimaryInsurancePhone(true)
                //alert('Please enter your insurance phone number')
                router
                  .push('/NewPatientPacket/#insurancePhoneNumber')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                primaryInsuranceGroup === '' &&
                howDoTheyWishToPay === 'Insurance'
              ) {
                setRequiredPrimaryInsuranceGroup(true)
                //alert('Please enter your insurance group number')
                router
                  .push('/NewPatientPacket/#insuranceGroupNumber')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              }
              // if (
              //   primaryInsuranceAddress1 === '' &&
              //   howDoTheyWishToPay === 'Insurance'
              // ) {

              //   //alert('Please enter your insurance address')
              //   router.push('/NewPatientPacket/#insuranceAddress').then(() => {
              //     setTimeout(() => {
              //       window.scrollBy(0, -150)
              //     }, 100)
              //   })
              //   return
              // } else if (
              //   primaryInsuranceCity === '' &&
              //   howDoTheyWishToPay === 'Insurance'
              // ) {
              //   //alert('Please enter your insurance city')
              //   router.push('/NewPatientPacket/#insuranceAddress').then(() => {
              //     setTimeout(() => {
              //       window.scrollBy(0, -150)
              //     }, 100)
              //   })
              //   return
              // } else if (
              //   primaryInsuranceState === '' &&
              //   howDoTheyWishToPay === 'Insurance'
              // ) {
              //   //alert('Please enter your insurance state')
              //   router.push('/NewPatientPacket/#insuranceAddress').then(() => {
              //     setTimeout(() => {
              //       window.scrollBy(0, -150)
              //     }, 100)
              //   })
              //   return
              // } else if (
              //   primaryInsuranceZip === '' &&
              //   howDoTheyWishToPay === 'Insurance'
              // ) {
              //   //alert('Please enter your insurance zip code')
              //   router.push('/NewPatientPacket/#insuranceAddress').then(() => {
              //     setTimeout(() => {
              //       window.scrollBy(0, -150)
              //     }, 100)
              //   })
              //   return
              // } else
              else if (
                primarySubscribersName === '' &&
                howDoTheyWishToPay === 'Insurance'
              ) {
                setRequiredPrimarySubscribersName(true)
                //alert('Please enter your insurance subscribers name')
                router.push('/NewPatientPacket/#subscriberName').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
              } else if (
                primaryPictureOfInsuranceCardFront === '' &&
                howDoTheyWishToPay === 'Insurance'
              ) {
                setRequiredPrimaryPictureOfInsuranceCardFront(true)
                //alert('Please upload a picture of your insurance card front')
                router
                  .push('/NewPatientPacket/#insuranceCardPicture')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                primaryPictureOfInsuranceCardBack === '' &&
                howDoTheyWishToPay === 'Insurance'
              ) {
                setRequiredPrimaryPictureOfInsuranceCardBack(true)
                //alert('Please upload a picture of your insurance card front')
                router
                  .push('/NewPatientPacket/#insuranceCardPictureBack')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (retailPharmacyName === '') {
                setRequiredRetailPharmacyName(true)
                //alert('Please enter your retail pharmacy name')
                router.push('/NewPatientPacket/#pharmacyName').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
              } else if (
                retailPharmacyCrossStreet1 === '' ||
                retailPharmacyCrossStreet2 === ''
              ) {
                setRequiredRetailPharmacyCrossStreet1(true)
                setRequiredRetailPharmacyCrossStreet2(true)
                //alert('Please enter your retail pharmacy cross street')
                router
                  .push('/NewPatientPacket/#pharmacyCrossStreet1')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (retailPharmacyPhoneNumber === '') {
                setRequiredRetailPharmacyPhoneNumber(true)
                //alert('Please enter your retail pharmacy phone number')
                router
                  .push('/NewPatientPacket/#pharmacyPhoneNumber')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (areYouAllergicToLatex === '') {
                setRequiredAreYouAllergicToLatex(true)
                //alert('Please enter if you are allergic to latex')
                router.push('/NewPatientPacket/#allergicToLatex').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
              } else if (areYouAllergicToSelfish === '') {
                setRequiredAreYouAllergicToSelfish(true)
                //alert('Please enter if you are allergic to shellfish')
                router
                  .push('/NewPatientPacket/#allergicToShellfish')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (areYouAllergicToIodine === '') {
                setRequiredAreYouAllergicToIodine(true)
                //alert('Please enter if you are allergic to iodine')
                router.push('/NewPatientPacket/#allergicToIodine').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
                // if patient drug allergies are not empty array
              } else if (doYouHaveAnyDrugAllergies === '') {
                setRequiredDoYouHaveAnyDrugAllergies(true)
                //alert('Please enter if you have any drug allergies')
                router
                  .push('/NewPatientPacket/#doYouHaveDrugAllergies')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                doYouHaveAnyDrugAllergies === 'Yes' &&
                PatientDrugAllergies.length < 1
              ) {
                setRequiredDrugAllergies(true)
                //alert('Please enter your drug allergies')
                router
                  .push('/NewPatientPacket/#doYouHaveDrugAllergies')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (doYouHaveAHistoryOfAnyMajorIllness === '') {
                setRequiredDoYouHaveAHistoryOfAnyMajorIllness(true)
                //alert('Please enter if you have a history of any major illness')
                router
                  .push('/NewPatientPacket/#doYouHaveAnyMajorIllnesses')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                allMajorIllnesses.length < 1 &&
                doYouHaveAHistoryOfAnyMajorIllness === 'Yes'
              ) {
                setRequiredMajorIllnesses(true)
                //alert('Please enter your major illnesses')
                router
                  .push('/NewPatientPacket/#doYouHaveAnyMajorIllnesses')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (doYouHaveAHistoryOfSurgeries === '') {
                setRequiredDoYouHaveAHistoryOfSurgeries(true)
                //alert(
                //   'Please enter if you have a history of surgeries or hospitalizations'
                // )
                router
                  .push('/NewPatientPacket/#doYouHaveAnySurgeries')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                allMajorSurgeriesAndHospitalizations.length < 1 &&
                doYouHaveAHistoryOfSurgeries === 'Yes'
              ) {
                setRequiredMajorSurgeriesAndHospitalizations(true)
                //alert('Please enter your major surgeries and hospitalizations')
                router
                  .push('/NewPatientPacket/#doYouHaveAnySurgeries')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (boneDensityScreening === '') {
                setRequiredBoneDensityScreening(true)
                //alert('Please enter if you have had a bone density screening')

                router
                  .push('/NewPatientPacket/#haveYouHadBoneDensityScreening')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                BoneDensityScreeningDate === '' &&
                boneDensityScreening === 'Yes'
              ) {
                setRequiredBoneDensityScreeningDate(true)
                //alert('Please enter the date of your bone density screening')
                router
                  .push('/NewPatientPacket/#dateOfBoneDensityScreening')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                wasBoneDensityScreeningNormalOrAbnormal === '' &&
                boneDensityScreening === 'Yes'
              ) {
                setRequiredWasBoneDensityScreeningNormalOrAbnormal(true)
                // //alert(
                //   'Please enter if your bone density screening was normal or abnormal'
                // )
                router
                  .push('/NewPatientPacket/#boneDensityScreeningResults')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (colonoscopyScreening === '') {
                setRequiredColonoscopyScreening(true)
                //alert('Please enter if you have had any of the following')
                router
                  .push('/NewPatientPacket/#haveYouHadColonoscopy')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                dateOfLastColonoscopyScreening === '' &&
                colonoscopyScreening === 'Yes'
              ) {
                setRequiredDateOfLastColonoscopyScreening(true)
                //alert('Please enter the date of your colonoscopy screening')
                router
                  .push('/NewPatientPacket/#dateOfColonoscopyScreening')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                wasColonoscopyScreeningNormalOrAbnormal === '' &&
                colonoscopyScreening === 'Yes'
              ) {
                setRequiredWasColonoscopyScreeningNormalOrAbnormal(true)
                // //alert(
                //   'Please enter if your colonoscopy screening was normal or abnormal'
                // )
                router
                  .push('/NewPatientPacket/#colonoscopyScreeningResults')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (haveTheyEverSmoked === '') {
                setRequiredHaveTheyEverSmoked(true)
                //alert('Please enter if you have ever smoked')
                router.push('/NewPatientPacket/#haveYouEverSmoked').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
              } else if (
                haveTheyEverSmoked === 'Yes' &&
                howManyPacksPerDay === ''
              ) {
                setRequiredHowManyPacksPerDay(true)

                //alert('Please enter how many packs per day')
                router
                  .push('/NewPatientPacket/#howManyPacksPerDay')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (anyOtherTobaccoOrEcigarettes === '') {
                setRequiredAnyOtherTobaccoOrEcigarettes(true)
                //alert('Please enter if you have used any other tobacco')
                router.push('/NewPatientPacket/#otherTabaccoUse').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
              } else if (
                anyOtherTobaccoOrEcigarettes === 'Yes' &&
                describeOtherTobaccoUse === ''
              ) {
                setRequiredDescribeOtherTobaccoUse(true)
                //alert('Please enter what other smoking products you have used')
                router
                  .push('/NewPatientPacket/#describeOtherTobaccoUse')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (doYoCurrentlyUseRecreationalDrugs === '') {
                setRequiredDoYoCurrentlyUseRecreationalDrugs(true)
                //alert('Please enter if you currently use recreational drugs')
                router
                  .push('/NewPatientPacket/#doYouUseRecreationalDrugs')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                doYoCurrentlyUseRecreationalDrugs === 'Yes' &&
                describeRecreationalDrugUse === ''
              ) {
                setRequiredDescribeRecreationalDrugUse(true)
                //alert('Please enter what recreational drugs you use')
                router
                  .push('/NewPatientPacket/#describeRecreationalDrugUse')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (doYouDrinkAlcohol === '') {
                setRequiredDoYouDrinkAlcohol(true)
                //alert('Please enter if you drink alcohol')
                router.push('/NewPatientPacket/#doYouDrinkAlcohol').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
              } else if (
                doYouDrinkAlcohol === 'Yes' &&
                howManyDrinksPerWeek === ''
              ) {
                setRequiredHowManyDrinksPerWeek(true)
                //alert('Please enter how many drinks per week')
                router
                  .push('/NewPatientPacket/#howManyDrinksPerWeek')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (doYouDrinkCoffee === '') {
                setRequiredDoYouDrinkCoffee(true)
                //alert('Please enter if you drink coffee')
                router.push('/NewPatientPacket/#doYouDrinkCoffee').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
              } else if (
                doYouDrinkCoffee === 'Yes' &&
                howManyCupsPerDay === ''
              ) {
                setRequiredHowManyCupsPerDay(true)
                //alert('Please enter how many cups of coffee per day')
                router.push('/NewPatientPacket/#howManyCupsPerDay').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
              } else if (doYouUseIllegaLStreetDrugs === '') {
                setRequiredDoYouUseIllegaLStreetDrugs(true)
                //alert('Please enter if you use illegal street drugs')
                router
                  .push('/NewPatientPacket/#doYouUseIllegaLStreetDrugs')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                doYouUseIllegaLStreetDrugs === 'Yes' &&
                describeIllegalStreetDrugUse === ''
              ) {
                setRequiredDescribeIllegaLStreetDrugUse(true)
                //alert('Please enter what illegal street drugs you use')
                router
                  .push('/NewPatientPacket/#describeIllegalStreetDrugUse')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (doYouFeelDepressed === '') {
                setRequiredDoYouFeelDepressed(true)
                //alert('Please enter if you feel depressed')
                router
                  .push('/NewPatientPacket/#doYouFeelDepressed')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                doYouCryFrequently === '' &&
                doYouFeelDepressed === 'Yes'
              ) {
                setRequiredDoYouCryFrequently(true)
                //alert('Please enter if you cry frequently')
                router
                  .push('/NewPatientPacket/#doYouFeelDepressed')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -50)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                doYouHaveLittleInterestInDoingThings == '' &&
                doYouFeelDepressed === 'Yes'
              ) {
                setRequiredDoYouHaveLittleInterestInDoingThings(true)
                // //alert(
                //   'Please enter if you have little interest in doing things'
                // )
                router
                  .push('/NewPatientPacket/#doYouHaveLittleInterest')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                doYouFeelHopelessDownOrDepressed === '' &&
                doYouFeelDepressed === 'Yes'
              ) {
                setRequiredDoYouFeelHopelessDownOrDepressed(true)
                //alert('Please enter if you feel hopeless down or depressed')
                router.push('/NewPatientPacket/#doYouFeelHopeless').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
              } else if (
                doYouHaveTroubleFallingAsleepOrSleepingTooMuch === '' &&
                doYouFeelDepressed === 'Yes'
              ) {
                setRequiredDoYouHaveTroubleFallingAsleepOrSleepingTooMuch(true)
                // //alert(
                //   'Please enter if you have trouble falling asleep or sleeping too much'
                // )
                router
                  .push('/NewPatientPacket/#doYouHaveTroubleFallingAsleep')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                doYouFeelTiredOrHaveLittleEnergy === '' &&
                doYouFeelDepressed === 'Yes'
              ) {
                setRequiredDoYouFeelTiredOrHaveLittleEnergy(true)
                //alert('Please enter if you feel tired or have little energy')
                router.push('/NewPatientPacket/#doYouFeelTired').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
              } else if (
                doYouHavAPoorAppetiteOrOverEating === '' &&
                doYouFeelDepressed === 'Yes'
              ) {
                setRequiredDoYouHavAPoorAppetiteOrOverEating(true)
                //alert('Please enter if you have a poor appetite or over eating')
                router
                  .push('/NewPatientPacket/#doYouHavAPoorAppetite')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                doYouFeelBadAboutYourself === '' &&
                doYouFeelDepressed === 'Yes'
              ) {
                setRequiredDoYouFeelBadAboutYourself(true)
                //alert('Please enter if you feel bad about yourself')
                router
                  .push('/NewPatientPacket/#doYouFeelBadAboutYourself')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                troubleConcentrating === '' &&
                doYouFeelDepressed === 'Yes'
              ) {
                setRequiredTroubleConcentrating(true)
                //alert('please enter if you have trouble concentrating')
                router
                  .push('/NewPatientPacket/#troubleConcentrating')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                doYouMoveOrSpeakSlowly === '' &&
                doYouFeelDepressed === 'Yes'
              ) {
                setRequiredDoYouMoveOrSpeakSlowly(true)
                //alert('Please enter if you move or speak slowly')
                router
                  .push('/NewPatientPacket/#doYouMoveOrSpeakSlowly')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                thoughtsYouWouldBeBetterOffDead === '' &&
                doYouFeelDepressed === 'Yes'
              ) {
                setRequiredThoughtsYouWouldBeBetterOffDead(true)
                // //alert(
                //   'Please enter if you have thoughts you would be better off dead'
                // )
                router
                  .push('/NewPatientPacket/#thoughtsYouWouldBeBetterOffDead')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                haveYouEverAttemptedSuicide === '' &&
                doYouFeelDepressed === 'Yes'
              ) {
                setRequiredHaveYouEverAttemptedSuicide(true)
                //alert('Please enter if you have ever attempted suicide ')
                router
                  .push('/NewPatientPacket/#HaveYouAttemptedSuicide')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                isStressAMajorProblem === '' &&
                doYouFeelDepressed === 'Yes'
              ) {
                setRequiredIsStressAMajorProblem(true)
                //alert('Please enter if stress is a major problem for you')
                router
                  .push('/NewPatientPacket/#isStressAMajorProblemForYou')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                doYouPanicWhenStressed === '' &&
                doYouFeelDepressed === 'Yes'
              ) {
                setRequiredDoYouPanicWhenStressed(true)
                //alert('Please enter if you panic when stressed')
                router
                  .push('/NewPatientPacket/#doYouPanicWhenStressed')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -250)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (areYouCurrentlyTakingAnyMedications == '') {
                setRequireAreYouCurrentlyTakingAnyMedications(true)
                //alert('Please select if you are taking any medications')
                router
                  .push(
                    '/NewPatientPacket/#areYouCurrentlyTakingAnyMedications'
                  )
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                return setLoading(false)
              } else if (
                areYouCurrentlyTakingAnyMedications == 'Yes' &&
                listOfAllCurrentMedications.length < 1
              ) {
                setRequireListOfAllCurrentMedications(true)
                //alert('Please enter a list of all current medications')
                router
                  .push(
                    '/NewPatientPacket/#areYouCurrentlyTakingAnyMedications'
                  )
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (!PatientMedicalReviewSignatureCheckBox) {
                setRequirePatientMedicalReviewSignatureCheckBox(true)
                //alert('Please agree to the medical review signature')
                router
                  .push('/NewPatientPacket/#patientMedicalReviewSignature')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (patientMedicalReviewSignatureDate == '') {
                setRequirePatientMedicalReviewSignature(true)
                setRequirePatientMedicalReviewSignatureDate(true)
                //alert('Please enter the date of the medical review signature')
                router
                  .push('/NewPatientPacket/#patientMedicalReviewSignature')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (patientMedicalReviewSignature == '') {
                setRequirePatientMedicalReviewSignature(true)
                //alert('Please enter your signature')
                router
                  .push('/NewPatientPacket/#patientMedicalReviewSignature')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (AdvancedDirectives?.signature == '') {
                setRequireAdvancedDirectivesSignature(true)
                //alert('Please enter your signature for Advanced Directives')
                router
                  .push('/NewPatientPacket/#advancedDirectivesLivingWill')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (AdvancedDirectives?.date == '') {
                setRequireAdvancedDirectivesSignature(true)
                //alert('Please enter the date of the signature')
                router
                  .push('/NewPatientPacket/#advancedDirectivesLivingWill')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (
                !AdvancedDirectives?.agreeThatTheirSignatureIsValid ||
                AdvancedDirectives.agreeThatTheirSignatureIsValid == '' ||
                AdvancedDirectives.agreeThatTheirSignatureIsValid ==
                  undefined ||
                AdvancedDirectives.agreeThatTheirSignatureIsValid == null
              ) {
                setRequireAdvancedDirectivesSignature(true)
                //alert('Please agree that your signature is valid')
                router
                  .push('/NewPatientPacket/#advancedDirectivesLivingWill')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              } else if (hippa?.hippaSignature == '') {
                setRequireHippaSignature(true)
                //alert('Please enter your signature for HIPPA')
                router.push('/NewPatientPacket/#hippa').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
              } else if (hippa?.signatureDate == '') {
                setRequireHippaSignature(true)
                //alert('Please enter the date of the signature')
                router.push('/NewPatientPacket/#hippa').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
              } else if (hippa?.agreeThatTheirSignatureIsValid == '') {
                setRequireHippaSignature(true)
                //alert('Please agree that your signature is valid')
                router.push('/NewPatientPacket/#hippa').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
              } else if (financialPolicySignature == '') {
                setRequireFinancialPolicySignature(true)
                //alert('Please enter your signature for Financial Policy')
                router.push('/NewPatientPacket/#financialPolicy').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
              } else if (financialPolicySignatureDate == '') {
                setRequireFinancialPolicySignatureDate(true)
                //alert('Please enter the date of the signature')
                router.push('/NewPatientPacket/#financialPolicy').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
              } else if (!financialPolicySignatureCheckBox) {
                setRequireFinancialPolicySignatureCheckBox(true)
                //alert('Please agree that your signature is valid')
                router.push('/NewPatientPacket/#financialPolicy').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
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
                  primarySubscribersDOB: primarySubscribersDOB,
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
                  secondarySubscribersDOB: secondarySubscribersDOB,
                  primaryPictureOfInsuranceCardFront:
                    primaryPictureOfInsuranceCardFront,
                  primaryPictureOfInsuranceCardBack:
                    primaryPictureOfInsuranceCardBack,
                  secondaryPictureOfInsuranceCardFront:
                    secondaryPictureOfInsuranceCardFront,
                  secondaryPictureOfInsuranceCardBack:
                    secondaryPictureOfInsuranceCardBack,
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
                  dateOfLastColonoscopyScreening:
                    dateOfLastColonoscopyScreening,
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
                  familyMedicalBleedingDisorders:
                    familyMedicalBleedingDisorders,
                  familyMedicalCancer: familyMedicalCancer,
                  familyMedicalDiabetes: familyMedicalDiabetes,
                  familyMedicalHeartAttack: familyMedicalHeartAttack,
                  familyMedicalHighBloodPressure:
                    familyMedicalHighBloodPressure,
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
                    AddPictureOfPatientFaceToStorageAndToDB({
                      selectedFile: pictureOfTheirFace,
                      emailValue: emailValue,
                      company: company,
                    })
                  })
                  .then(() => {
                    AddPictureOfPatientInsuranceToStorageAndToDB({
                      selectedFile: primaryPictureOfInsuranceCardFront,
                      emailValue: emailValue,
                      company: company,
                    })
                  })
                  .then(() => {
                    AddPictureOfPatientInsuranceBackToStorageAndToDB({
                      selectedFile: primaryPictureOfInsuranceCardBack,
                      emailValue: emailValue,
                      company: company,
                    })
                  })
                  .then(() => {
                    AddPictureOfPatientInsuranceSecondaryToStorageAndToDB({
                      selectedFile: secondaryPictureOfInsuranceCardFront,
                      emailValue: emailValue,
                      company: company,
                    })
                  })
                  .then(() => {
                    AddPictureOfPatientInsuranceSecondaryBackToStorageAndToDB({
                      selectedFile: secondaryPictureOfInsuranceCardBack,
                      emailValue: emailValue,
                      company: company,
                    })
                  })

                  .then(() => {
                    AddPictureOfDriverLicenseToStorageAndToDB({
                      selectedFile: pictureOfFrontOfDriverLicense,
                      emailValue: emailValue,
                      company: company,
                    })
                  })
                  // .then(() => {
                  //   //alert('thank you for your submission')
                  // })
                  .then(() => {
                    setLoading(false)
                  })
                  .then(() => {
                    setShowCheckMark(true)
                  })
              }
            }}
            buttonText="Submit"
            buttonWidth="w-1/2"
            loading={loading}
          />
          {loading && (
            <p
              onClick={() => {
                setLoading(false)
              }}
              className=" mx-10 cursor-pointer text-[#377adf] underline"
            >
              Cancel submission
            </p>
          )}
        </div>
      </main>
    </div>
    ///jjj
  )
  //q:add new repository to be able to push to it this is the url https://github.com/zachrizzo/AMA_Employee_Website
  //a: git remote add origin https://github.com/zachrizzo/AMA_Employee_Website
  //q: how to push to new repository
}
export default NewPatientPacket
