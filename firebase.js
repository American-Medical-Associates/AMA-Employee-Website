// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFunctions } from 'firebase/functions'
import {
  getStorage,
  getDownloadURL,
  uploadString,
  ref,
  uploadBytes,
  deleteObject,
} from 'firebase/storage'
import { addDoc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import {
  arrayUnion,
  deleteDoc,
  documentId,
  DocumentSnapshot,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  Timestamp,
  collection,
  setDoc,
  doc,
  where,
  getDocs,
} from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'
import { emit } from 'process'
import { async } from '@firebase/util'
import { Faxes } from './pages/Faxes'
import { setChannelID, setNewPatientPacket } from './redux/slices/companySlice'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBCwzGo9wi9_EnYzIGBcxUQyS59uEoNXAU',
  authDomain: 'ama-app-a5e7b.firebaseapp.com',
  projectId: 'ama-app-a5e7b',
  storageBucket: 'ama-app-a5e7b.appspot.com',
  messagingSenderId: '137084495352',
  appId: '1:137084495352:web:f58d8bce30e6dd6d57e20d',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

//export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp
export const auth = getAuth(app)
const storage = getStorage(app)
export const db = getFirestore(app)
export const functions = getFunctions(app)
// set storage cors config
// https://firebase.google.com/docs/storage/web/download-files#cors_configuration

export async function submitResume({
  email,
  profileLink,
  linkType,
  lastName,
  phoneNumber,
  firstName,
  aboutYou,
  radio1,
  radio2,
  radio3,
  radio4,
  radio5,
  radio6,
  radio7,
  fullLegalName,
  applicantAddress1,
  applicantAddress2,
  applicantCity,
  applicantState,
  applicantZip,

  // race,
  //gender,
  //veteranStatus,
  //DisabilityStatus,
  statmentOfAvailbilty,
  checkbox1,
  checkbox2,
  highSchool,
  highSchoolCourseOfStudy,
  highSchoolGraduate,
  positionApplyingFor,
  highSchoolNumberOfYearsCompleted,
  highSchoolHonorsReceived,
  college,
  collegeCourseOfStudy,
  collegeGraduate,
  collegeNumberOfYearsCompleted,
  collegeHonorsReceived,
  Grad,
  GradCourseOfStudy,
  GradNumberOfYearsCompleted,
  GradGraduate,
  GradHonorsReceived,
  trade,
  tradeCourseOfStudy,
  tradeGraduate,
  tradeNumberOfYearsCompleted,
  tradeHonorsReceived,
  selectedDateStart1,
  selectedDateStart2,
  selectedDateStart3,
  selectedDateEnd1,
  selectedDateEnd2,
  selectedDateEnd3,
  typeOfBusiness1,
  typeOfBusiness2,
  typeOfBusiness3,
  workNameValue1,
  workNameValue2,
  workNameValue3,
  workAddressValue1,
  workAddressValue2,
  workAddressValue3,
  reasonForLeaving1,
  reasonForLeaving2,
  reasonForLeaving3,
  jobTitleValue1,
  jobTitleValue2,
  jobTitleValue3,
  workPhoneNumberValue1,
  workPhoneNumberValue2,
  workPhoneNumberValue3,
  supervisorsNameValue1,
  supervisorsNameValue2,
  supervisorsNameValue3,
  dutiesValue1,
  dutiesValue2,
  dutiesValue3,
  mayWeContactValue1,
  mayWeContactValue2,
  mayWeContactValue3,
  referenceNameState,
  referencePositionState,
  referenceWorkRelationshipState,
  referenceCompanyState,
  referencePhoneNumberState,
  referenceNameValue2,
  referencePositionState2,
  referenceWorkRelationshipState2,
  referenceCompanyValue2,
  referencePhoneNumberValue2,
  referenceNameState3,
  referencePositionState3,
  referenceWorkRelationshipState3,
  referenceCompanyState3,
  referencePhoneNumberState3,
  referenceNameState4,
  referencePositionValue4,
  referenceWorkRelationshipState4,
  referenceCompanyState4,
  referencePhoneNumberState4,
  havePreviouslyApplied,
  under_the_age_of_18,
  WhyTerminatedTextBox,
  resumeFileType,
  radio_Terminated_upon_mutual_agreement,
  radio_Choice_to_resign_rather_than_be_terminated,
  middleInitial,
  WhenAndWhereDidYouApply,
  previouslyEmployedBox,
  previouslyExternOrContractor,
  convictedOfACrimeBox,
  canYouWorkOvertime,
  reasonForImmigrationBox,
  socialSecurity,
}) {
  try {
    await setDoc(
      doc(db, 'applications', email),
      {
        email: email,
        firstName: firstName,
        lastName: lastName,
        profileLink: profileLink,
        linkType: linkType,
        fullLegalName: fullLegalName,
        phoneNumber: phoneNumber,
        // race: race,
        //gender: gender,
        require_immigration_sponsorShip: radio1,
        authorize_job_application: radio2,
        previously_been_employed: radio3,
        former_or_current_extern_or_contractor: radio4,
        consent_to_receiving_text_messages_throughout_your_application_process:
          radio5,
        Have_you_ever_been_terminated_from_a_job: radio6,
        Have_you_ever_been_convicted_of_a_crime: radio7,
        accept_them_as_conditions_of_employment: checkbox1,
        employee_opportunitiesDisclosure: checkbox2,
        // DisabilityStatus: DisabilityStatus,
        statmentOfAvailbilty: statmentOfAvailbilty,
        // veteranStatus,
        aboutYou: aboutYou,
        under_the_age_of_18: under_the_age_of_18,
        havePreviouslyApplied: havePreviouslyApplied,
        highSchool: highSchool,
        highSchoolCourseOfStudy: highSchoolCourseOfStudy,
        highSchoolGraduate: highSchoolGraduate,
        positionApplyingFor: positionApplyingFor,
        highSchoolNumberOfYearsCompleted: highSchoolNumberOfYearsCompleted,
        highSchoolHonorsReceived: highSchoolHonorsReceived,
        college: college,
        collegeCourseOfStudy: collegeCourseOfStudy,
        collegeGraduate: collegeGraduate,
        collegeNumberOfYearsCompleted: collegeNumberOfYearsCompleted,
        collegeHonorsReceived: collegeHonorsReceived,
        Grad: Grad,
        GradCourseOfStudy: GradCourseOfStudy,
        GradNumberOfYearsCompleted: GradNumberOfYearsCompleted,
        GradGraduate: GradGraduate,
        GradHonorsReceived: GradHonorsReceived,
        trade: trade,
        tradeCourseOfStudy: tradeCourseOfStudy,
        tradeGraduate: tradeGraduate,
        tradeNumberOfYearsCompleted: tradeNumberOfYearsCompleted,
        tradeHonorsReceived: tradeHonorsReceived,
        selectedDateStart1: selectedDateStart1,
        selectedDateStart2: selectedDateStart2,
        selectedDateStart3: selectedDateStart3,
        selectedDateEnd1: selectedDateEnd1,
        selectedDateEnd2: selectedDateEnd2,
        selectedDateEnd3: selectedDateEnd3,
        typeOfBusiness1: typeOfBusiness1,
        typeOfBusiness2: typeOfBusiness2,
        typeOfBusiness3: typeOfBusiness3,
        workNameValue1: workNameValue1,
        workNameValue2: workNameValue2,
        workNameValue3: workNameValue3,
        workAddressValue1: workAddressValue1,
        workAddressValue2: workAddressValue2,
        workAddressValue3: workAddressValue3,
        reasonForLeaving1: reasonForLeaving1,
        reasonForLeaving2: reasonForLeaving2,
        reasonForLeaving3: reasonForLeaving3,
        jobTitleValue1: jobTitleValue1,
        jobTitleValue2: jobTitleValue2,
        jobTitleValue3: jobTitleValue3,
        workPhoneNumberValue1: workPhoneNumberValue1,
        workPhoneNumberValue2: workPhoneNumberValue2,
        workPhoneNumberValue3: workPhoneNumberValue3,
        supervisorsNameValue1: supervisorsNameValue1,
        supervisorsNameValue2: supervisorsNameValue2,
        supervisorsNameValue3: supervisorsNameValue3,
        dutiesValue1: dutiesValue1,
        dutiesValue2: dutiesValue2,
        dutiesValue3: dutiesValue3,
        mayWeContactValue1: mayWeContactValue1,
        mayWeContactValue2: mayWeContactValue2,
        mayWeContactValue3: mayWeContactValue3,
        ReferenceNameValue: referenceNameState,

        ReferencePositionValue: referencePositionState,

        ReferenceWorkRelationshipValue: referenceWorkRelationshipState,
        ReferenceCompanyValue: referenceCompanyState,

        ReferencePhoneNumberValue: referencePhoneNumberState,

        ReferenceNameValue2: referenceNameValue2,

        ReferencePositionValue2: referencePositionState2,

        ReferenceWorkRelationshipValue2: referenceWorkRelationshipState2,
        ReferenceCompanyValue2: referenceCompanyValue2,

        ReferencePhoneNumberValue2: referencePhoneNumberValue2,

        ReferenceNameValue3: referenceNameState3,

        ReferencePositionValue3: referencePositionState3,

        ReferenceWorkRelationshipValue3: referenceWorkRelationshipState3,
        ReferenceCompanyValue3: referenceCompanyState3,

        ReferencePhoneNumberValue3: referencePhoneNumberState3,

        ReferenceNameValue4: referenceNameState4,

        ReferencePositionValue4: referencePositionValue4,

        ReferenceWorkRelationshipValue4: referenceWorkRelationshipState4,
        ReferenceCompanyValue4: referenceCompanyState4,

        ReferencePhoneNumberValue4: referencePhoneNumberState4,
        WhyTerminatedTextBox: WhyTerminatedTextBox,
        resumeFileType: resumeFileType,
        radio_Terminated_upon_mutual_agreement:
          radio_Terminated_upon_mutual_agreement,
        radio_Choice_to_resign_rather_than_be_terminated:
          radio_Choice_to_resign_rather_than_be_terminated,
        middleInitial: middleInitial,
        whenAndWhereDidYouApply: WhenAndWhereDidYouApply,
        previouslyEmployedBox: previouslyEmployedBox,
        previouslyExternOrContractor: previouslyExternOrContractor,
        convictedOfACrimeBox: convictedOfACrimeBox,
        canYouWorkOvertime: canYouWorkOvertime,
        archive: false,
        reasonForImmigrationBox: reasonForImmigrationBox,
        socialSecurity: socialSecurity,
        applicantAddress1: applicantAddress1,
        applicantAddress2: applicantAddress2,
        applicantCity: applicantCity,
        applicantState: applicantState,
        applicantZip: applicantZip,
        timestamp: serverTimestamp(),
      },
      { merge: true }
    )
  } catch (error) {
    alert(error)
    console.log(error)
  }
}

export async function AddToStorageAndToDB({
  storagePath,
  selectedFile,
  SetDocPath,
  email,
}) {
  const imageRef = ref(storage, `resume/${email}/resume`)
  await uploadString(imageRef, selectedFile, 'data_url').then(
    async (snapshot) => {
      const download = await getDownloadURL(imageRef)
      console.log('good')
      await setDoc(
        doc(db, 'applications', email),
        {
          resume: download,
        },
        { merge: true }
      )
    }
  )
}
export function isAdmin({ adminState }) {
  onSnapshot(doc(db, 'users', auth.currentUser?.email), (doc) => {
    adminState(doc.get('isAuthUser'))
  })
}
export function SignInToAccount({ email, password }) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log('it worked')
      // const user = userCredential.user;

      // ...
    })
    .catch((error) => {
      alert(error)
      // const errorCode = error.code;
      // const errorMessage = error.message;
    })
}
export function getResumes({ applicationtState: applicationState }) {
  onSnapshot(
    query(collection(db, 'applications'), orderBy('timestamp', 'desc')),
    (querySnapshot) => {
      const arrays = []
      querySnapshot.forEach((snap) => {
        arrays.push(snap.data())
        // key: snap.id;
      })
      applicationState(arrays)
      // console.log(products);
    }
  )
}
export async function archiveItem({ collections, docs, archiveBool }) {
  await setDoc(
    doc(db, collections, docs),
    {
      archive: archiveBool,
    },
    { merge: true }
  )
}
export const SearchForApplicationsArchived = ({
  ApplicantArray,
  Application,
}) => {
  try {
    onSnapshot(
      query(
        collection(db, 'applications'),
        where('email', '>=', Application),
        where('archive', '==', 'true')
      ),
      (querySnapshot) => {
        const quantitysnap = []

        querySnapshot.forEach((snap) => {
          quantitysnap.push(snap.data())

          // key: snap.id;
        })
        ApplicantArray(quantitysnap)

        console.log(' fireeee x' + quantitysnap)
      }
    )
  } catch (e) {
    e
  }
}
export function SearchForApplicationsNOTArchived({
  ApplicantArray,
  Application,
}) {
  try {
    onSnapshot(
      query(collection(db, 'applications'), where('email', '>=', Application)),
      (querySnapshot) => {
        const quantitysnap = []

        querySnapshot.forEach((snap) => {
          quantitysnap.push(snap.data())

          // key: snap.id;
        })
        ApplicantArray(quantitysnap)

        // console.log(' fireeee x  ' + quantitysnap)
      }
    )
  } catch (e) {
    e
  }
}
export function getFaxes({ singleFax }) {
  try {
    onSnapshot(query(collection(db, 'faxes')), (querySnapshot) => {
      const quantitysnap = []
      querySnapshot.forEach((snap) => {
        const snaps = quantitysnap.push(snap.get('fax'))
        singleFax(snaps)

        // key: snap.id;
      })
      // setFax(quantitysnap)
    })
  } catch (error) {
    console.log(error)
  }
}
export async function addSpravatoTracking({
  email,
  lastName,
  firstName,
  DOB,
  MA,
  dateReceived,
  dateAdministered,
  phoneNumber,
  dose,
  dateOrdered,
  numberOfDevices,
  lotNumber,
  snNumber,
}) {
  await setDoc(
    doc(db, 'spravato', snNumber),
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      MA: MA,
      dose: dose,
      dateAdministered: dateAdministered,
      dateAdministeredString: dateAdministered.toString(),
      dateReceived: dateReceived,
      dateReceivedString: dateReceived.toString(),
      dateOrdered: dateOrdered,
      dateOrderedString: dateOrdered.toString(),
      DOB: DOB,
      spravatoTracking: 'spravatoTracking',
      numberOfDevices: numberOfDevices,
      lotNumber: lotNumber,
      snNumber: snNumber,
      dateAddedToDB: serverTimestamp(),
    },
    { merge: true }
  ).then(async () => {
    await setDoc(
      doc(
        db,
        'companys',
        'AMA',
        'patients',
        email,
        'spravatoTracking',
        snNumber
      ),

      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        MA: MA,
        dose: dose,
        dateAdministered: dateAdministered,
        dateAdministeredString: dateAdministered.toString(),
        dateReceived: dateReceived,
        dateReceivedString: dateReceived.toString(),
        dateOrdered: dateOrdered,
        dateOrderedString: dateOrdered.toString(),
        DOB: DOB,
        spravatoTracking: 'spravatoTracking',
        numberOfDevices: numberOfDevices,
        dateAddedToDB: serverTimestamp(),
      },
      { merge: true }
    )
  })
}
export async function editSpravatoTracking({
  lastName,
  firstName,

  MA,
  dateAdministeredString,
  phoneNumber,
  dose,
  numberOfDevices,
  lotNumber,
  snNumber,
  email,
}) {
  await setDoc(
    doc(db, 'spravato', snNumber),
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      MA: MA,
      dose: dose,

      numberOfDevices: numberOfDevices,
      lotNumber: lotNumber,
      // snNumber: snNumber,
      dateEdited: serverTimestamp(),
    },
    { merge: true }
  ).then(async () => {
    await setDoc(
      doc(
        db,
        'companys',
        'AMA',
        'patients',
        email,
        'spravatoTracking',
        snNumber
      ),

      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        MA: MA,
        dose: dose,

        numberOfDevices: numberOfDevices,
        dateEdited: serverTimestamp(),
      },
      { merge: true }
    )
  })
}
export async function addNewPatient({
  email,
  lastName,
  firstName,
  phoneNumber,
  DOB,
  address,
  company,
}) {
  await setDoc(
    doc(db, 'companys', company, 'patients', email),
    {
      fullName: lastName + ', ' + firstName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      DOB: DOB,
      address: address,
      dateAdded: serverTimestamp(),
    },
    { merge: true }
  )
}

export async function patientSearchListAMA({
  patientArray,
  company,
  searchName,
  DOB,
}) {
  try {
    if (searchName != '' && DOB === '') {
      onSnapshot(
        query(
          collection(db, 'companys', company, 'patients'),
          where('fullName', '==', searchName)
        ),

        (querySnapshot) => {
          const quantitysnap = []

          querySnapshot.forEach((snap) => {
            quantitysnap.push(snap.data())
          })
          patientArray(quantitysnap)
        }
      )
    } else if (searchName === '' && DOB != '') {
      onSnapshot(
        query(
          collection(db, 'companys', company, 'patients'),
          where('DOB', '==', DOB)
        ),

        (querySnapshot) => {
          const quantitysnap = []

          querySnapshot.forEach((snap) => {
            quantitysnap.push(snap.data())
          })
          patientArray(quantitysnap)
        }
      )
    } else if (searchName != '' && DOB != '') {
      onSnapshot(
        query(
          collection(db, 'companys', company, 'patients'),
          where('DOB', '>=', DOB),
          where('fullName', '>=', searchName)
        ),

        (querySnapshot) => {
          const quantitysnap = []

          querySnapshot.forEach((snap) => {
            quantitysnap.push(snap.data())
          })
          patientArray(quantitysnap)
        }
      )
    }
  } catch (e) {
    e
  }
}
export function GetSpravatoTracking({ SpravatoTrackingArray }) {
  try {
    onSnapshot(
      query(
        collection(db, 'spravato'),
        orderBy('dateAdministered', 'asc')
        // where('fullName', '>=', searchName)
      ),

      (querySnapshot) => {
        const quantitysnap = []

        querySnapshot.forEach((snap) => {
          quantitysnap.push(snap.data())

          // key: snap.id;
        })
        SpravatoTrackingArray(quantitysnap)

        // console.log(' fireeee x  ' + quantitysnap)
      }
    )
  } catch (e) {
    e
  }
}
// export function getCompany({ setCompany, setCompanyDispatch }) {
//   onSnapshot(doc(db, 'users', auth.currentUser.email), (doc) => {
//     // setCompanyDB(doc.get("company"));
//     setCompanyDispatch(setCompany(doc.get('company')))
//   })
// }
export function getAllUserInfo({
  setChannelID,
  setCompany,
  dispatch,
  // isPatient,
}) {
  onSnapshot(doc(db, 'users', auth.currentUser.email), (doc) => {
    // setCompanyDB(doc.get("company"));
    dispatch(setCompany(doc.get('company')))
    dispatch(setChannelID(doc.get('channels')))
  })
}

export async function submitNewPatientPacketAndCreateNewPatient({
  firstName,
  lastName,
  addressValue,
  addressValue2,
  cityValue,
  USStateValue,
  zipCodeValue,
  BirthDateValue,
  phoneNumberValue,
  homePhone,
  emailValue,
  socialValue,
  isCheckedMale,
  isCheckedFemale,
  isCheckedOther,
  pictureOfFrontOfDriverLicense,
  preferredName,
  single,
  married,
  divorced,
  widowed,
  separated,
  withPartner,
  MayWeTakeYourPicture,
  pictureOfTheirFace,
  Ethnicity,
  nameOfEmergencyContact,
  EmergencyContactRelationShip,
  EmergencyContactPhoneNumber,
  HowDidTheyHearAboutUs,
  howDoTheyWishToPay,
  primaryInsurance,
  primaryInsuranceID,
  primaryInsuranceGroup,
  primaryInsurancePhone,
  primaryInsuranceAddress1,
  primaryInsuranceAddress2,
  primaryInsuranceCity,
  primaryInsuranceState,
  primaryInsuranceZip,
  primarySubscribersName,
  primarySubscribersDOB,
  secondaryInsurance,
  secondaryInsuranceID,
  secondaryInsuranceGroup,
  secondaryInsurancePhone,
  secondaryInsuranceAddress1,
  secondaryInsuranceAddress2,
  secondaryInsuranceCity,
  secondaryInsuranceState,
  secondaryInsuranceZip,
  secondarySubscribersName,
  secondarySubscribersDOB,
  primaryPictureOfInsuranceCardFront,
  primaryPictureOfInsuranceCardBack,
  secondaryPictureOfInsuranceCardFront,
  secondaryPictureOfInsuranceCardBack,
  retailPharmacyName,
  retailPharmacyCrossStreet1,
  retailPharmacyCrossStreet2,
  retailPharmacyPhoneNumber,
  retailPharmacyFaxNumber,
  mailOrderPharmacyName,
  mailOrderPharmacyPhoneNumber,
  mailOrderPharmacyAddress1,
  mailOrderPharmacyAddress2,
  mailOrderPharmacyCity,
  mailOrderPharmacyState,
  mailOrderPharmacyZip,
  areYouAllergicToLatex,
  areYouAllergicToSelfish,
  areYouAllergicToIodine,
  PatientDrugAllergies,
  dateOfLastPAP,
  wasPapNormalOrAbnormal,
  dateOfLastMammogram,
  wasMammogramNormalOrAbnormal,
  dateOfLastPSA,
  wasPSANormalOrAbnormal,
  allMajorIllnesses,
  allMajorSurgeriesAndHospitalizations,
  boneDensityScreening,
  BoneDensityScreeningDate,
  wasBoneDensityScreeningNormalOrAbnormal,
  colonoscopyScreening,
  dateOfLastColonoscopyScreening,
  wasColonoscopyScreeningNormalOrAbnormal,
  allMedicalHistoryOfDisease,
  haveTheyEverSmoked,
  howManyPacksPerDay,
  anyOtherTobaccoOrEcigarettes,
  describeOtherTobaccoUse,
  doYouDrinkCoffee,
  howManyCupsPerDay,
  doYouDrinkAlcohol,
  howManyDrinksPerWeek,
  doYoCurrentlyUseRecreationalDrugs,
  describeRecreationalDrugUse,
  doYouUseIllegaLStreetDrugs,
  describeIllegalStreetDrugUse,
  doYouFeelDepressed,
  doYouCryFrequently,
  doYouHaveLittleInterestInDoingThings,
  doYouFeelHopelessDownOrDepressed,
  doYouHaveTroubleFallingAsleepOrSleepingTooMuch,
  doYouFeelTiredOrHaveLittleEnergy,
  doYouHavAPoorAppetiteOrOverEating,
  doYouFeelBadAboutYourself,
  troubleConcentrating,
  doYouMoveOrSpeakSlowly,
  thoughtsYouWouldBeBetterOffDead,
  isStressAMajorProblem,
  doYouPanicWhenStressed,
  haveYouEverAttemptedSuicide,
  familyMedicalAlcoholismAddiction,
  familyMedicalBleedingDisorders,
  familyMedicalCancer,
  familyMedicalDiabetes,
  familyMedicalHeartAttack,
  familyMedicalHighBloodPressure,
  familyMedicalHighCholesterol,
  familyMedicalKidneyDisease,
  familyMedicalMentalIllness,
  familyMedicalStroke,
  familyMedicalTuberculosis,
  isYourMotherStillLiving,
  isYourFatherStillLiving,
  listOfAllCurrentMedications,
  patientMedicalReviewSignature,
  PatientMedicalReviewSignatureCheckBox,
  patientMedicalReviewSignatureDate,
  AdvancedDirectives,
  hippa,
  financialPolicySignature,
  financialPolicySignatureCheckBox,
  financialPolicySignatureDate,
  company,
}) {
  await setDoc(
    doc(db, 'companys', 'AMA', 'NewPatientPacket', emailValue),
    {
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
      emailValue: emailValue,
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
      primaryPictureOfInsuranceCardFront: primaryPictureOfInsuranceCardFront,
      primaryPictureOfInsuranceCardBack: primaryPictureOfInsuranceCardBack,
      secondaryPictureOfInsuranceCardFront:
        secondaryPictureOfInsuranceCardFront,
      secondaryPictureOfInsuranceCardBack: secondaryPictureOfInsuranceCardBack,
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
      dateAdded: serverTimestamp(),
      company: 'AMA',
      archived: false,
    },
    { merge: true }
  )
    .then(async () => {
      await setDoc(
        doc(db, 'companys', 'AMA', 'patients', emailValue),
        {
          fullName:
            lastName.toLowerCase().trim() +
            ',' +
            firstName.toLowerCase().trim(),
          firstName: firstName.toLowerCase().trim(),
          lastName: lastName.toLowerCase().trim(),
          email: emailValue,
          phoneNumber: phoneNumberValue,
          homePhone: homePhone,
          DOB: BirthDateValue,
          address1: addressValue,
          address2: addressValue2,
          city: cityValue,
          state: USStateValue,
          zip: zipCodeValue,
          socialSecurity: socialValue,
          company: 'AMA',
          gender: {
            isCheckedFemale: isCheckedFemale,
            isCheckedMale: isCheckedMale,
            isCheckedOther: isCheckedOther,
          },
          pictureOfFrontOfDriverLicense: pictureOfFrontOfDriverLicense,
          preferredName: preferredName,
          maritalStatus: {
            single: single,
            married: married,
            divorced: divorced,
            widowed: widowed,
            separated: separated,
            withPartner: withPartner,
          },
          MayWeTakeYourPicture: MayWeTakeYourPicture,

          Ethnicity: Ethnicity,
          nameOfEmergencyContact: nameOfEmergencyContact,
          EmergencyContactRelationShip,
          EmergencyContactPhoneNumber,
          HowDidTheyHearAboutUs,
          insuranceInfo: {
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
          },
          PrarmacyInfo: {
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
          },
          dateLastUpdated: serverTimestamp(),
        },
        { merge: true }
      )
    })

    .then(async () => {
      setDoc(
        doc(
          db,
          'companys',
          'AMA',
          'patients',
          emailValue,
          'NewPatientPacket',
          emailValue
        ),
        {
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
          emailValue: emailValue,
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
          company: 'AMA',
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
          primaryPictureOfInsuranceCardBack: primaryPictureOfInsuranceCardBack,
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
          dateAdded: serverTimestamp(),
          archived: false,
        },
        { merge: true }
      ).then(() => {
        setDoc(
          doc(
            db,
            'companys',
            'AMA',
            'patients',
            emailValue,
            'patientMedicalHistory',
            'allPatientMedicalHistory'
          ),
          {
            company: 'AMA',
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
            mentalHeath: {
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
              thoughtsYouWouldBeBetterOffDead: thoughtsYouWouldBeBetterOffDead,
              isStressAMajorProblem: isStressAMajorProblem,
              doYouPanicWhenStressed: doYouPanicWhenStressed,
              haveYouEverAttemptedSuicide: haveYouEverAttemptedSuicide,
            },
            familyMedicalHistory: {
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
            },
            dateLastUpdated: serverTimestamp(),
          },

          { merge: true }
        )
      })
    })
}
export async function AddPictureOfPatientFaceToStorageAndToDB({
  selectedFile,
  emailValue,
  company,
}) {
  const imageRef = ref(storage, `NewPatientPacket/${emailValue}/patientFace`)
  await uploadString(imageRef, selectedFile, 'data_url').then(
    async (snapshot) => {
      const download = await getDownloadURL(imageRef)
      console.log('good')
      await setDoc(
        doc(db, 'companys', 'AMA', 'NewPatientPacket', emailValue),
        {
          pictureOfTheirFace: download,
        },
        { merge: true }
      )
        .then(async () => {
          await setDoc(
            doc(db, 'companys', 'AMA', 'patients', emailValue),
            {
              pictureOfTheirFace: download,
            },
            { merge: true }
          )
        })
        .then(async () => {
          await setDoc(
            doc(
              db,

              'companys',
              'AMA',
              'patients',
              emailValue,
              'NewPatientPacket',
              emailValue
            ),
            {
              pictureOfTheirFace: download,
            },
            { merge: true }
          )
        })
    }
  )
}
export async function AddPictureOfPatientInsuranceToStorageAndToDB({
  selectedFile,

  emailValue,
  company,
}) {
  const imageRef = ref(
    storage,
    `NewPatientPacket/${emailValue}/PrimaryInsuranceCard`
  )
  await uploadString(imageRef, selectedFile, 'data_url').then(
    async (snapshot) => {
      const download = await getDownloadURL(imageRef)
      console.log('good')
      await setDoc(
        doc(db, 'companys', 'AMA', 'NewPatientPacket', emailValue),
        {
          primaryPictureOfInsuranceCardFront: download,
        },
        { merge: true }
      )
        .then(async () => {
          await setDoc(
            doc(db, 'companys', 'AMA', 'patients', emailValue),
            {
              primaryPictureOfInsuranceCardFront: download,
            },
            { merge: true }
          )
        })
        .then(async () => {
          await setDoc(
            doc(
              db,

              'companys',
              'AMA',
              'patients',
              emailValue,
              'NewPatientPacket',
              emailValue
            ),
            {
              primaryPictureOfInsuranceCardFront: download,
            },
            { merge: true }
          )
        })
    }
  )
}
export async function AddPictureOfPatientInsuranceBackToStorageAndToDB({
  selectedFile,

  emailValue,
  company,
}) {
  const imageRef = ref(
    storage,
    `NewPatientPacket/${emailValue}/PrimaryInsuranceCardBack`
  )
  await uploadString(imageRef, selectedFile, 'data_url').then(
    async (snapshot) => {
      const download = await getDownloadURL(imageRef)
      console.log('good')
      await setDoc(
        doc(db, 'companys', 'AMA', 'NewPatientPacket', emailValue),
        {
          primaryPictureOfInsuranceCardBack: download,
        },
        { merge: true }
      )
        .then(async () => {
          await setDoc(
            doc(db, 'companys', 'AMA', 'patients', emailValue),
            {
              primaryPictureOfInsuranceCardBack: download,
            },
            { merge: true }
          )
        })
        .then(async () => {
          await setDoc(
            doc(
              db,

              'companys',
              'AMA',
              'patients',
              emailValue,
              'NewPatientPacket',
              emailValue
            ),
            {
              primaryPictureOfInsuranceCardBack: download,
            },
            { merge: true }
          )
        })
    }
  )
}
export async function AddPictureOfPatientInsuranceSecondaryToStorageAndToDB({
  selectedFile,

  emailValue,
  company,
}) {
  const imageRef = ref(
    storage,
    `NewPatientPacket/${emailValue}/SecondaryInsuranceCard`
  )
  await uploadString(imageRef, selectedFile, 'data_url').then(
    async (snapshot) => {
      const download = await getDownloadURL(imageRef)
      console.log('good')
      await setDoc(
        doc(db, 'companys', 'AMA', 'NewPatientPacket', emailValue),
        {
          secondaryPictureOfInsuranceCardFront: download,
        },
        { merge: true }
      )
        .then(async () => {
          await setDoc(
            doc(db, 'companys', 'AMA', 'patients', emailValue),
            {
              secondaryPictureOfInsuranceCardFront: download,
            },
            { merge: true }
          )
        })
        .then(async () => {
          await setDoc(
            doc(
              db,

              'companys',
              'AMA',
              'patients',
              emailValue,
              'NewPatientPacket',
              emailValue
            ),
            {
              secondaryPictureOfInsuranceCardFront: download,
            },
            { merge: true }
          )
        })
    }
  )
}
export async function AddPictureOfPatientInsuranceSecondaryBackToStorageAndToDB({
  selectedFile,

  emailValue,
  company,
}) {
  const imageRef = ref(
    storage,
    `NewPatientPacket/${emailValue}/SecondaryInsuranceCardBack`
  )
  await uploadString(imageRef, selectedFile, 'data_url').then(
    async (snapshot) => {
      const download = await getDownloadURL(imageRef)
      console.log('good')
      await setDoc(
        doc(db, 'companys', 'AMA', 'NewPatientPacket', emailValue),
        {
          secondaryPictureOfInsuranceCardBack: download,
        },
        { merge: true }
      )
        .then(async () => {
          await setDoc(
            doc(db, 'companys', 'AMA', 'patients', emailValue),
            {
              secondaryPictureOfInsuranceCardBack: download,
            },
            { merge: true }
          )
        })
        .then(async () => {
          await setDoc(
            doc(
              db,

              'companys',
              'AMA',
              'patients',
              emailValue,
              'NewPatientPacket',
              emailValue
            ),
            {
              secondaryPictureOfInsuranceCardBack: download,
            },
            { merge: true }
          )
        })
    }
  )
}

export async function AddPictureOfDriverLicenseToStorageAndToDB({
  selectedFile,

  emailValue,
  company,
}) {
  const imageRef = ref(storage, `NewPatientPacket/${emailValue}/DriverLicense`)
  await uploadString(imageRef, selectedFile, 'data_url').then(
    async (snapshot) => {
      const download = await getDownloadURL(imageRef)
      console.log('good')
      await setDoc(
        doc(db, 'companys', 'AMA', 'NewPatientPacket', emailValue),
        {
          pictureOfFrontOfDriverLicense: download,
        },
        { merge: true }
      )
        .then(async () => {
          await setDoc(
            doc(db, 'companys', 'AMA', 'patients', emailValue),
            {
              pictureOfFrontOfDriverLicense: download,
            },
            { merge: true }
          )
        })
        .then(async () => {
          await setDoc(
            doc(
              db,
              'companys',
              'AMA',
              'patients',
              emailValue,
              'NewPatientPacket',
              emailValue
            ),
            {
              pictureOfFrontOfDriverLicense: download,
            },
            { merge: true }
          )
        })
    }
  )
}
export function GetNewPatientPacketSubmissions({
  company,
  NewPatientPacketsState,
  archived,
}) {
  onSnapshot(
    query(
      collection(db, 'companys', 'AMA', 'NewPatientPacket'),
      where('archived', '==', archived)
    ),

    (querySnapshot) => {
      const arrays = []
      querySnapshot.forEach((snap) => {
        arrays.push(snap.data())
        // key: snap.id;
      })
      NewPatientPacketsState(arrays)
      // console.log(arrays)
    }
  )
}

export function BookAnAppointment({
  firstName,
  lastName,
  phoneNumber,
  email,
  date,
  time,
  message,
}) {
  setDoc(
    doc(db, 'companys', 'Vitalize Infusion', 'BookedAppointments', email),
    {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      date: date,
      time: time,
      dateToString: date.toDateString(),
      message: message,
      timestamp: serverTimestamp(),
      company: 'Vitalize Infusion',
    },
    { merge: true }
  )
    .then(() => {
      //add a patient to the database
      setDoc(
        doc(db, 'companys', 'Vitalize Infusion', 'patients', email),
        {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
          timestamp: serverTimestamp(),
          company: 'Vitalize Infusion',
        },
        { merge: true }
      )
    })
    .then(() => {
      //add to patients booked appointments
      setDoc(
        doc(
          db,
          'companys',
          'Vitalize Infusion',
          'patients',
          email,
          'BookedAppointments',
          date.toDateString()
        ),
        {
          date: date,
          time: time,
          dateToString: date.toDateString(),
          message: message,
          email: email,
          timestamp: serverTimestamp(),
          company: 'Vitalize Infusion',
        },
        { merge: true }
      )
    })
}
//book an appointment
export function BookAnAppointmentToTrackUserInput({
  firstName,
  lastName,
  phoneNumber,
  email,
  date,
  time,
  message,
  randomNumber,
}) {
  setDoc(
    doc(
      db,
      'companys',
      'Vitalize Infusion',
      'BookedAppointments',
      `test-${randomNumber}`
    ),
    {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      date: date,
      time: time,
      dateToString: date.toDateString(),
      message: message,
      timestamp: serverTimestamp(),
      company: 'Vitalize Infusion',
      isThisATest: true,
    },
    { merge: true }
  )
}

//get booked appointments
export function GetBookedAppointments({ BookedAppointmentsState }) {
  onSnapshot(
    query(
      collection(db, 'companys', 'Vitalize Infusion', 'BookedAppointments')
      //orderBy('timestamp', 'desc')
    ),
    (querySnapshot) => {
      const arrays = []
      querySnapshot.forEach((snap) => {
        arrays.push(snap.data())
        // key: snap.id;
      })
      BookedAppointmentsState(arrays)
      console.log(arrays)
    }
  )
}
//add a support ticket
export async function AddSupportTicket({
  subject,
  message,
  company,
  firstName,

  urgent,
  whatKindOfIssueIsIt,
  urgentCallBackPhoneNumber,
  ticketNumber,
}) {
  await setDoc(
    doc(db, 'supportTickets', ticketNumber),
    {
      firstName: firstName,

      company: company,
      message: message,
      urgent: urgent,
      subject: subject,
      ticketNumber: ticketNumber,
      whatKindOfIssueIsIt: whatKindOfIssueIsIt,
      urgentCallBackPhoneNumber: urgentCallBackPhoneNumber,
      email: auth.currentUser.email,
      timestamp: serverTimestamp(),
      company: company,
      workingOnTicket: false,
    },
    { merge: true }
  )
}
export async function AddScreenShotForSupportTicketsStorageAndDB({
  selectedFile,
  ticketNumber,
  subject,
}) {
  const imageRef = ref(
    storage,
    `supportTickets/${ticketNumber}${subject}/ScreenShot`
  )
  await uploadString(imageRef, selectedFile, 'data_url').then(
    async (snapshot) => {
      const download = await getDownloadURL(imageRef)

      await setDoc(
        doc(db, 'supportTickets', ticketNumber),
        {
          screenShot: download,
        },
        { merge: true }
      )
    }
  )
}
export async function GetSupportTickets({ supportTicketsState }) {
  onSnapshot(
    query(collection(db, 'supportTickets'), orderBy('timestamp', 'desc')),
    (querySnapshot) => {
      const arrays = []
      querySnapshot.forEach((snap) => {
        arrays.push(snap.data())
        // key: snap.id;
      })
      supportTicketsState(arrays)
      console.log(arrays)
    }
  )
}
export async function AddNPToArchive({ email, archiveState }) {
  await setDoc(
    doc(db, 'companys', 'AMA', 'NewPatientPacket', email),
    {
      archived: archiveState,
    },
    { merge: true }
  )
}
//add person who is working on the support ticket
export async function AddPersonWorkingOnSupportTicket({ ticketNumber }) {
  await setDoc(
    doc(db, 'supportTickets', ticketNumber),
    {
      personWorkingOnTicket: auth.currentUser.email,
      workingOnTicket: true,
    },
    { merge: true }
  )
}
//close support ticket
export async function CloseSupportTicket({ ticketNumber, openTicketState }) {
  await setDoc(
    doc(db, 'supportTickets', ticketNumber),
    {
      workingOnTicket: false,
      openTicket: openTicketState,
      whoClosedTicket: auth.currentUser.email,
      dateTicketWasClosed: serverTimestamp(),
    },
    { merge: true }
  )
}
//add a note to a support ticket
export async function AddNoteToSupportTicket({ ticketNumber, note }) {
  await setDoc(
    doc(db, 'supportTickets', ticketNumber),
    {
      note: note,
      noteTimestamp: serverTimestamp(),
      noteBy: auth.currentUser.email,
    },
    { merge: true }
  )
}
//add  a message to a support
export async function CreateChannelMessageToSupport({ company, ticketNumber }) {
  await setDoc(
    doc(db, 'Messages', `support-${ticketNumber}`),
    {
      messageTimestamp: serverTimestamp(),
      channelMembers: [
        auth.currentUser.email,
        'juju@gmail.com',
        'z.rizzo@americanmedicalassociatesaz.com',
      ],
      channelName: `support-${ticketNumber}`,
      channelType: 'support',
      company: company,
    },
    { merge: true }
  )
    .then(async () => {
      await setDoc(
        doc(db, 'users', auth.currentUser.email),
        {
          channels: arrayUnion(`support-${ticketNumber}`),
        },
        { merge: true }
      )
    })
    .then(async () => {
      await setDoc(
        doc(db, 'users', 'juju@gmail.com'),
        {
          channels: arrayUnion(`support-${ticketNumber}`),
        },
        { merge: true }
      )
    })
    .then(async () => {
      await setDoc(
        doc(db, 'users', 'z.rizzo@americanmedicalassociatesaz.com'),
        {
          channels: arrayUnion(`support-${ticketNumber}`),
        },
        { merge: true }
      )
    })
}
//get messages for a support ticket
export async function getMessages({ ChannelID, messagesState }) {
  onSnapshot(
    query(
      collection(db, 'Messages', ChannelID, 'messages'),
      orderBy('messageTimestamp', 'desc')
    ),
    (querySnapshot) => {
      const arrays = []
      querySnapshot.forEach((snap) => {
        arrays.push(snap.data())
        // key: snap.id;
      })
      messagesState(arrays)
      console.log(arrays)
    }
  )
}
// add IVinfusionIntakeForm to database
export async function AddIVinfusionIntakeForm({
  firstName,
  lastName,
  email,
  phoneNumber,
  DOB,
  signature,

  signatureDate,
  AgreeForDigitalSignature,
  whatTheyConsentTo,
}) {
  await setDoc(
    doc(db, 'companys', 'Vitalize Nation', 'IVinfusionIntakeForm', email),
    {
      firstName: firstName,
      lastName: lastName,
      fullName: lastName + ', ' + firstName,
      email: email,
      phoneNumber: phoneNumber,
      DOB: DOB,
      signature: signature,
      company: 'Vitalize Nation',
      signatureDate: signatureDate,
      AgreeForDigitalSignature: AgreeForDigitalSignature,
      whatTheyConsentTo: whatTheyConsentTo,
      timestamp: serverTimestamp(),
    },
    { merge: true }
  )
    .then(async () => {
      //add patient to Vitalize Nation
      await setDoc(
        doc(db, 'companys', 'Vitalize Nation', 'patients', email),
        {
          firstName: firstName,
          lastName: lastName,
          fullName: lastName + ', ' + firstName,
          email: email,
          phoneNumber: phoneNumber,
          DOB: DOB,
          signature: signature,
          company: 'Vitalize Nation',
          timestamp: serverTimestamp(),
        },
        { merge: true }
      )
    })
    .then(async () => {
      // add to patients submition collection
      await setDoc(
        doc(
          db,
          'companys',
          'Vitalize Nation',
          'patients',
          email,
          'Forms',
          'IVinfusionIntakeForm'
        ),
        {
          firstName: firstName,
          lastName: lastName,
          fullName: lastName + ', ' + firstName,
          email: email,
          phoneNumber: phoneNumber,
          DOB: DOB,
          signature: signature,
          company: 'Vitalize Nation',
          signatureDate: signatureDate,
          AgreeForDigitalSignature: AgreeForDigitalSignature,
          whatTheyConsentTo: whatTheyConsentTo,
          timestamp: serverTimestamp(),
        },
        { merge: true }
      )
    })
}
export async function GetInventory({ company, inventoryState, itemType }) {
  onSnapshot(
    query(
      collection(db, 'companys', company, itemType, item),
      orderBy('timestamp', 'desc')
    ),
    (querySnapshot) => {
      const arrays = []
      querySnapshot.forEach((snap) => {
        arrays.push(snap.data())
        // key: snap.id;
      })
      inventoryState(arrays)
      console.log(arrays)
    }
  )
}
//add svg of user signature to storage and store the link in the database
export async function AddSignatureToStorage({ signature }) {
  const randomNumber = Math.floor((Math.random() * 1000000000) / 10)
  const storageRef = ref(
    storage,
    `signatures/${auth.currentUser.email}/${randomNumber}`
  )
  const response = await fetch(signature)
  const blob = await response.blob()
  await uploadBytes(storageRef, blob)
    .then(async (snapshot) => {
      const downloadURL = await getDownloadURL(storageRef)
      await setDoc(
        doc(
          db,
          'users',
          auth.currentUser.email,
          'signatures',
          randomNumber.toString()
        ),
        {
          signature: downloadURL,
          timestamp: serverTimestamp(),
          ID: randomNumber.toString(),
        },
        { merge: true }
      )
    })
    .catch((error) => {
      console.log(error)
    })
}
//get all the signatures for a user
export async function GetSignatures({ signaturesState }) {
  try {
    onSnapshot(
      query(
        collection(db, 'users', auth.currentUser.email, 'signatures'),
        orderBy('timestamp', 'desc')
      ),
      (querySnapshot) => {
        const arrays = []
        querySnapshot.forEach((snap) => {
          arrays.push(snap.data())
          // key: snap.id;
        })
        signaturesState(arrays)
        console.log(arrays)
      }
    )
  } catch (error) {}
}

//add pdf to storage and store the link in a sub collection under the user
export async function AddPDFToStorage({ pdf, name, requiredPages }) {
  const randomNumber = Math.floor((Math.random() * 1000000000) / 10)
  const storageRef = ref(
    storage,
    `pdfs/${auth.currentUser.email}/${randomNumber}`
  )
  const response = await fetch(pdf)
  const blob = await response.blob()
  await uploadBytes(storageRef, blob)
    .then(async (snapshot) => {
      const downloadURL = await getDownloadURL(storageRef)
      await setDoc(
        doc(
          db,
          'users',
          auth.currentUser.email,
          'pdfs',
          randomNumber.toString()
        ),
        {
          pdf: downloadURL,
          name: name,
          timestamp: serverTimestamp(),
          requiredPages: requiredPages,
          ID: randomNumber,
        },
        { merge: true }
      )
    })
    .catch((error) => {
      console.log(error)
    })
}
//get all the pdfs for a user
export async function GetUsersPDFs({ pdfState }) {
  try {
    onSnapshot(
      query(
        collection(db, 'users', auth.currentUser.email, 'pdfs'),
        orderBy('timestamp', 'desc')
      ),
      (querySnapshot) => {
        const arrays = []
        querySnapshot.forEach((snap) => {
          arrays.push(snap.data())
          // key: snap.id;
        })
        pdfState(arrays)
        console.log(arrays)
      }
    )
  } catch (error) {}
}
//get all users
export async function GetUsers({ usersState }) {
  try {
    onSnapshot(query(collection(db, 'users')), (querySnapshot) => {
      const arrays = []
      querySnapshot.forEach((snap) => {
        arrays.push(snap.data())
        // key: snap.id;
      })
      usersState(arrays)
      console.log(arrays)
    })
  } catch (error) {
    alert(error)
  }
}
//add selected pdf to selected user

export async function AddPDFToUser({ pdf, name, email, requiredPages }) {
  const randomNumber = Math.floor((Math.random() * 1000000000) / 10)
  const storageRef = ref(storage, `pdfs/${email}/${randomNumber}`)
  const response = await fetch(pdf)
  const blob = await response.blob()
  await uploadBytes(storageRef, blob)
    .then(async (snapshot) => {
      const downloadURL = await getDownloadURL(storageRef)
      await setDoc(
        doc(db, 'users', email, 'pdfs', randomNumber.toString()),
        {
          pdf: downloadURL,
          name: name,
          timestamp: serverTimestamp(),
          requiredPages: requiredPages,
          ID: randomNumber,
        },
        { merge: true }
      )
    })
    .catch((error) => {
      console.log(error)
    })
}

//delete signature
export async function DeleteSignature({ signature }) {
  try {
    await deleteDoc(
      doc(db, 'users', auth.currentUser.email, 'signatures', signature)
    ).then(async () => {
      const storageRef = ref(
        storage,
        `signatures/${auth.currentUser.email}/${signature}`
      )
      await deleteObject(storageRef)
    })
  } catch (error) {
    alert(error)
  }
}

//delete pdf
export async function DeletePDF({ pdf }) {
  try {
    await deleteDoc(doc(db, 'users', auth.currentUser.email, 'pdfs', pdf)).then(
      async () => {
        const storageRef = ref(storage, `pdfs/${auth.currentUser.email}/${pdf}`)
        await deleteObject(storageRef)
      }
    )
  } catch (error) {
    alert(error)
  }
}

export async function submitMentalHeathGroupSurvey({
  age,
  gender,
  currentClient,
  medication,
  OneonOne,
  interest,
  insuranceCoverage,
  focusArea,
  daysOfWeek,
  timeOfDay,
  sessionLength,
}) {
  const randomNumber = Math.floor((Math.random() * 1000000000) / 10)
  try {
    await setDoc(
      doc(db, 'companys', 'AMA', 'mentalHealthSurvey', randomNumber.toString()),
      {
        gender: gender,
        age: age,
        currentClient: currentClient,
        medication: medication,
        OneonOne: OneonOne,
        interest: interest,
        insuranceCoverage: insuranceCoverage,
        focusArea: focusArea,
        daysOfWeek: daysOfWeek,
        timeOfDay: timeOfDay,
        sessionLength: sessionLength,
        timestamp: serverTimestamp(),
        company: 'AMA',
        id: randomNumber.toString(),
      }
    )
  } catch (error) {
    alert(error)
  }
}

export function GetSurveys({ setSurveys }) {
  try {
    onSnapshot(
      query(collection(db, 'companys', 'AMA', 'mentalHealthSurvey')),
      (querySnapshot) => {
        const arrays = []
        querySnapshot.forEach((snap) => {
          arrays.push(snap.data())
          // key: snap.id;
        })
        setSurveys(arrays)
      }
    )
  } catch (error) {
    alert(error)
  }
}

export async function NewPatientPacketAutoSave({
  setSuccess,
  firstName,
  lastName,
  addressValue,
  addressValue2,
  cityValue,
  USStateValue,
  zipCodeValue,
  BirthDateValue,
  phoneNumberValue,
  homePhone,
  emailValue,
  socialValue,
  isCheckedMale,
  isCheckedFemale,
  isCheckedOther,
  pictureOfFrontOfDriverLicense,
  preferredName,
  single,
  married,
  divorced,
  widowed,
  separated,
  withPartner,
  MayWeTakeYourPicture,
  Ethnicity,
  nameOfEmergencyContact,
  EmergencyContactRelationShip,
  EmergencyContactPhoneNumber,
  HowDidTheyHearAboutUs,
  howDoTheyWishToPay,
  primaryInsurance,
  primaryInsuranceID,
  primaryInsuranceGroup,
  primaryInsurancePhone,
  primaryInsuranceAddress1,
  primaryInsuranceAddress2,
  primaryInsuranceCity,
  primaryInsuranceState,
  primaryInsuranceZip,
  primarySubscribersName,
  primarySubscribersDOB,
  secondaryInsurance,
  secondaryInsuranceID,
  secondaryInsuranceGroup,
  secondaryInsurancePhone,
  secondaryInsuranceAddress1,
  secondaryInsuranceAddress2,
  secondaryInsuranceCity,
  secondaryInsuranceState,
  secondaryInsuranceZip,
  secondarySubscribersName,
  secondarySubscribersDOB,
  retailPharmacyName,
  retailPharmacyCrossStreet1,
  retailPharmacyCrossStreet2,
  retailPharmacyPhoneNumber,
  retailPharmacyFaxNumber,
  mailOrderPharmacyName,
  mailOrderPharmacyPhoneNumber,
  mailOrderPharmacyAddress1,
  mailOrderPharmacyAddress2,
  mailOrderPharmacyCity,
  mailOrderPharmacyState,
  mailOrderPharmacyZip,
  areYouAllergicToLatex,
  areYouAllergicToSelfish,
  areYouAllergicToIodine,
  doYouHaveAnyDrugAllergies,
  PatientDrugAllergies,
  dateOfLastPAP,
  wasPapNormalOrAbnormal,
  dateOfLastMammogram,
  wasMammogramNormalOrAbnormal,
  dateOfLastPSA,
  wasPSANormalOrAbnormal,
  doYouHaveAHistoryOfAnyMajorIllness,
  allMajorIllnesses,
  doYouHaveAHistoryOfSurgeries,
  allMajorSurgeriesAndHospitalizations,
  boneDensityScreening,
  BoneDensityScreeningDate,
  wasBoneDensityScreeningNormalOrAbnormal,
  colonoscopyScreening,
  dateOfLastColonoscopyScreening,
  wasColonoscopyScreeningNormalOrAbnormal,
  allMedicalHistoryOfDisease,
  haveTheyEverSmoked,
  howManyPacksPerDay,
  anyOtherTobaccoOrEcigarettes,
  describeOtherTobaccoUse,
  doYouDrinkCoffee,
  howManyCupsPerDay,
  doYouDrinkAlcohol,
  howManyDrinksPerWeek,
  doYoCurrentlyUseRecreationalDrugs,
  describeRecreationalDrugUse,
  doYouUseIllegaLStreetDrugs,
  describeIllegalStreetDrugUse,
  doYouFeelDepressed,
  doYouCryFrequently,
  doYouHaveLittleInterestInDoingThings,
  doYouFeelHopelessDownOrDepressed,
  doYouHaveTroubleFallingAsleepOrSleepingTooMuch,
  doYouFeelTiredOrHaveLittleEnergy,
  doYouHavAPoorAppetiteOrOverEating,
  doYouFeelBadAboutYourself,
  troubleConcentrating,
  doYouMoveOrSpeakSlowly,
  thoughtsYouWouldBeBetterOffDead,
  isStressAMajorProblem,
  doYouPanicWhenStressed,
  haveYouEverAttemptedSuicide,
  familyMedicalAlcoholismAddiction,
  familyMedicalBleedingDisorders,
  familyMedicalCancer,
  familyMedicalDiabetes,
  familyMedicalHeartAttack,
  familyMedicalHighBloodPressure,
  familyMedicalHighCholesterol,
  familyMedicalKidneyDisease,
  familyMedicalMentalIllness,
  familyMedicalStroke,
  familyMedicalTuberculosis,
  isYourMotherStillLiving,
  isYourFatherStillLiving,
  areYouCurrentlyTakingAnyMedications,
  listOfAllCurrentMedications,
  patientMedicalReviewSignature,
  PatientMedicalReviewSignatureCheckBox,
  patientMedicalReviewSignatureDate,
  AdvancedDirectives,
  hippa,
  financialPolicySignature,
  financialPolicySignatureCheckBox,
  financialPolicySignatureDate,
  company,
}) {
  try {
    await setDoc(
      doc(
        db,
        'companys',
        'AMA',
        'patients',
        emailValue,
        'AutoSaveNewPatientPacket',
        emailValue
      ),
      {
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
        emailValue: emailValue,
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
        // primaryPictureOfInsuranceCardFront: primaryPictureOfInsuranceCardFront,
        // primaryPictureOfInsuranceCardBack: primaryPictureOfInsuranceCardBack,
        // secondaryPictureOfInsuranceCardFront:
        //   secondaryPictureOfInsuranceCardFront,
        // secondaryPictureOfInsuranceCardBack:
        //   secondaryPictureOfInsuranceCardBack,
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
        dateAdded: serverTimestamp(),
        company: 'AMA',
        archived: false,
      },
      { merge: true }
    ).then(() => {
      setSuccess(true)
    })
  } catch (error) {
    console.log(error)
    setSuccess(false)
  }
}

export function GetPatientInfo({ email, setPatientInfo }) {
  onSnapshot(doc(db, 'companys', 'AMA', 'patients', email), (doc) => {
    setPatientInfo(doc.data())
  })
}

export function GetPatientAutoSaveInfo({
  dispatch,
  email,
  setPatientAutoSaveInfo,
}) {
  onSnapshot(
    doc(
      db,
      'companys',
      'AMA',
      'patients',
      email,
      'AutoSaveNewPatientPacket',
      email
    ),
    (doc) => {
      setPatientAutoSaveInfo(doc.data())
      dispatch(setNewPatientPacket(doc.data()))
    }
  )
}
// /companys/AMA/patients/z@gmail.com/NewPatientPacket/z@gmail.com
export async function SubmittedPacket({ email, setSubmittedPacket }) {
  // onSnapshot(
  //   query(
  //     collection(
  //       db,
  //       'companys',
  //       'AMA',
  //       'patients',
  //       auth.currentUser.email,
  //       'NewPatientPacket'
  //     )
  //     // where('email', '==', email)
  //   ),
  //   (querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       setSubmittedPacket(doc.data())
  //     })
  //   }
  // )
  onSnapshot(
    doc(
      db,
      'companys',
      'AMA',
      'patients',
      auth.currentUser.email,
      'NewPatientPacket',
      auth.currentUser.email
    ),
    (doc) => {
      setSubmittedPacket(doc.data())
    }
  )
}

export function GetAllPatientInfo({ setPatientInfo }) {
  onSnapshot(
    doc(db, 'companys', 'AMA', 'patients', auth.currentUser.email),
    (doc) => {
      setPatientInfo(doc.data())
    }
  )
}

export async function WeightLossAutoSave({
  setSuccess,
  emailValue,
  date,
  patientsName,
  primaryDoctor,
  whyLossWeight,
  weightGoals,
  timeFrame,
  mostWeighedAsAdult,
  ageAtAdultMostWeight,
  leastWeighedAsAdult,
  ageAtAdultLeastWeight,
  weightChangeDuringLife,
  weightGainedInPast,
  challengesOfWeightManagement,
  hopesForWeightLossManagement,
  commitmentsToWeightLoss,
  currentDietAids,
  onYourOwn,
  checkIfTried,
  onYourOwnStartDate,
  onYourOwnEndDate,
  onYourOwnWeightLoss,
  onYourOwnReasonForStopping,
  onYourOwnReasonForRegain,
  atkinsOrLowCarbohydrate,
  atkinsOrLowCarbohydrateStartDate,
  atkinsOrLowCarbohydrateEndDate,
  atkinsOrLowCarbohydrateWeightLoss,
  atkinsOrLowCarbohydrateReasonForStopping,
  atkinsOrLowCarbohydrateReasonForRegain,
  jennyCraig,
  jennyCraigStartDate,
  jennyCraigEndDate,
  jennyCraigWeightLoss,
  jennyCraigReasonForStopping,
  jennyCraigReasonForRegain,
  nutrisystem,
  nutrisystemStartDate,
  nutrisystemEndDate,
  nutrisystemWeightLoss,
  nutrisystemReasonForStopping,
  nutrisystemReasonForRegain,
  weightWatchers,
  weightWatchersStartDate,
  weightWatchersEndDate,
  weightWatchersWeightLoss,
  weightWatchersReasonForStopping,
  weightWatchersReasonForRegain,
  slimfast,
  slimfastStartDate,
  slimfastEndDate,
  slimfastWeightLoss,
  slimfastReasonForStopping,
  slimfastReasonForRegain,
  optifast,
  optifastStartDate,
  optifastEndDate,
  optifastWeightLoss,
  optifastReasonForStopping,
  optifastReasonForRegain,
  otherLiquidDiet,
  otherLiquidDietStartDate,
  otherLiquidDietEndDate,
  otherLiquidDietWeightLoss,
  otherLiquidDietReasonForStopping,
  otherLiquidDietReasonForRegain,
  other,
  otherName,
  otherStartDate,
  otherEndDate,
  otherWeightLoss,
  otherReasonForStopping,
  otherReasonForRegain,
  adipex,
  adipexStartDate,
  adipexEndDate,
  adipexWeightLoss,
  adipexReasonForStopping,
  adipexReasonForRegain,
  alli,
  alliStartDate,
  alliEndDate,
  alliWeightLoss,
  alliReasonForStopping,
  alliReasonForRegain,
  belviq,
  belviqStartDate,
  belviqEndDate,
  belviqWeightLoss,
  belviqReasonForStopping,
  belviqReasonForRegain,
  dexatrim,
  dexatrimStartDate,
  dexatrimEndDate,
  dexatrimWeightLoss,
  dexatrimReasonForStopping,
  dexatrimReasonForRegain,
  herbalWeightLoss,
  herbalWeightLossStartDate,
  herbalWeightLossEndDate,
  herbalWeightLossWeightLoss,
  herbalWeightLossReasonForStopping,
  herbalWeightLossReasonForRegain,
  meridia,
  meridiaStartDate,
  meridiaEndDate,
  meridiaWeightLoss,
  meridiaReasonForStopping,
  meridiaReasonForRegain,
  phenfen,
  phenfenStartDate,
  phenfenEndDate,
  phenfenWeightLoss,
  phenfenReasonForStopping,
  phenfenReasonForRegain,
  qsymia,
  qsymiaStartDate,
  qsymiaEndDate,
  qsymiaWeightLoss,
  qsymiaReasonForStopping,
  qsymiaReasonForRegain,
  redux,
  reduxStartDate,
  reduxEndDate,
  reduxWeightLoss,
  reduxReasonForStopping,
  reduxReasonForRegain,
  otherSupplements,
  otherSupplementsName,
  otherSupplementsStartDate,
  otherSupplementsEndDate,
  otherSupplementsWeightLoss,
  otherSupplementsReasonForStopping,
  otherSupplementsReasonForRegain,
  childrenUnderEighteen,
  childrenUnderEighteenCheckBox,
  familyMemebersObese,
  support,
  supportExplaination,
  eatingDisorder,
  anorexiaNervosa,
  bingeEating,
  bulimia,
  eatingTooMuch,
  sleepHours,
  restedWhenWakeUp,
  doYouSnore,
  wearEquipment,
  howManyNights,
  sleepWellness,
  sittingAndReading,
  watchingTv,
  sittingInPublic,
  carPassanger,
  lyingDown,
  talkingToSomeone,
  sittingQuietlyAfterLunch,
  inCarWhileStopped,
  total,
  typicalDay,
  enjoyExercise,
  gymMembership,
  exerciseEquipment,
  exerciseRegularly,
  badExerciseExperience,
  encourageExercise,
  sixAm,
  nineAm,
  twelvePm,
  threePm,
  sixPm,
  ninePm,
  exerciseWeekly,
  describeExercise,
  difficultyGettingUpFromFloor,
  typeOfExercise,
  exercisePreference,
  athleteInSchool,
  confidentIncrease,
  majorBenefitsOfExercise,
  exerciseBarriers,
  minutesPerDay,
  daysPerWeek,
  confidenceWeightLossDiet,
  majorBarriersDiet,
  favoriteFoods,
  breakfastTypeOfFood,
  breakfastProteinOrCarbs,
  breakfastCalories,
  lunchTypeOfFood,
  lunchProteinOrCarbs,
  lunchCalories,
  dinnerTypeOfFood,
  dinnerProteinOrCarbs,
  dinnerCalories,
  snackOneTypeOfFood,
  snackOneProteinOrCarbs,
  snackOneCalories,
  snackTwoTypeOfFood,
  snackTwoProteinOrCarbs,
  snackTwoCalories,
  coffeeTypeOfFood,
  coffeeProteinOrCarbs,
  coffeeCalories,
  sodaTypeOfFood,
  sodaProteinOrCarbs,
  sodaCalories,
  candyOrSweetsTypeOfFood,
  candyOrSweetsProteinOrCarbs,
  candyOrSweetsCalories,
  otherTypeOfFood,
  otherProteinOrCarbs,
  otherCalories,
  numPeopleLiveWith,
  eatTogether,
  whoDoesShopping,
  whoDoesCooking,
  foodIntolerance,
  foodIntoleranceList,
  stressEating,
  stressEatingDetails,
  bingeEatingExperience,
  bingeEatingDetails,
  snackingExperience,
  snackingDetails,
  eatingMiddleOfNightExperience,
  eatingMiddleOfNightDetails,
  skippingMealsExperience,
  skippingMealsDetails,
  eatingOutExperience,
  eatingOutDetails,
  eatingInFrontOfTVExperience,
  eatingInFrontOfTVDetails,
  eatingAtDeskExperience,
  eatingAtDeskDetails,
  portionSizeExperience,
  portionSizeDetails,
  eatingTooFastExperience,
  eatingTooFastDetails,
  notSatifiedExperience,
  notSatifiedDetails,
  regularSoda,
  regularSodaCount,
  juice,
  juiceCount,
  sweetTea,
  sweetTeaCount,
  alchoholBeverages,
  alchoholBeveragesCount,
  friedFoods,
  friedFoodsCount,
  fruitServings,
  vegetableServings,
  wholeGrainServings,
  lowFatDairyServings,
  leanProteinServings,
  daysPerWeekExplination,
  medicalHistory,
  medicationsTaken,
  medicationsTakenList,
}) {
  {
    try {
      await setDoc(
        doc(
          db,
          'companys',
          'AMA',
          'patients',
          emailValue,
          'WeightLossAutoSave',
          emailValue
        ),
        {
          emailValue: emailValue,
          patientsName: patientsName,
          date: date,
          primaryDoctor: primaryDoctor,
          whyLossWeight: whyLossWeight,
          weightGoals: weightGoals,
          timeFrame: timeFrame,
          mostWeighedAsAdult: mostWeighedAsAdult,
          ageAtAdultMostWeight: ageAtAdultMostWeight,
          leastWeighedAsAdult: leastWeighedAsAdult,
          ageAtAdultLeastWeight: ageAtAdultLeastWeight,
          weightChangeDuringLife: weightChangeDuringLife,
          weightGainedInPast: weightGainedInPast,
          challengesOfWeightManagement: challengesOfWeightManagement,
          hopesForWeightLossManagement: hopesForWeightLossManagement,
          commitmentsToWeightLoss: commitmentsToWeightLoss,
          currentDietAids: currentDietAids,
          onYourOwn: onYourOwn,
          checkIfTried: checkIfTried,
          onYourOwnStartDate: onYourOwnStartDate,
          onYourOwnEndDate: onYourOwnEndDate,
          onYourOwnWeightLoss: onYourOwnWeightLoss,
          onYourOwnReasonForStopping: onYourOwnReasonForStopping,
          onYourOwnReasonForRegain: onYourOwnReasonForRegain,
          atkinsOrLowCarbohydrate: atkinsOrLowCarbohydrate,
          atkinsOrLowCarbohydrateStartDate: atkinsOrLowCarbohydrateStartDate,
          atkinsOrLowCarbohydrateEndDate: atkinsOrLowCarbohydrateEndDate,
          atkinsOrLowCarbohydrateWeightLoss: atkinsOrLowCarbohydrateWeightLoss,
          atkinsOrLowCarbohydrateReasonForStopping:
            atkinsOrLowCarbohydrateReasonForStopping,
          atkinsOrLowCarbohydrateReasonForRegain:
            atkinsOrLowCarbohydrateReasonForRegain,
          jennyCraig: jennyCraig,
          jennyCraigStartDate: jennyCraigStartDate,
          jennyCraigEndDate: jennyCraigEndDate,
          jennyCraigWeightLoss: jennyCraigWeightLoss,
          jennyCraigReasonForStopping: jennyCraigReasonForStopping,
          jennyCraigReasonForRegain: jennyCraigReasonForRegain,
          nutrisystem: nutrisystem,
          nutrisystemStartDate: nutrisystemStartDate,
          nutrisystemEndDate: nutrisystemEndDate,
          nutrisystemWeightLoss: nutrisystemWeightLoss,
          nutrisystemReasonForStopping: nutrisystemReasonForStopping,
          nutrisystemReasonForRegain: nutrisystemReasonForRegain,
          weightWatchers: weightWatchers,
          weightWatchersStartDate: weightWatchersStartDate,
          weightWatchersEndDate: weightWatchersEndDate,
          weightWatchersWeightLoss: weightWatchersWeightLoss,
          weightWatchersReasonForStopping: weightWatchersReasonForStopping,
          weightWatchersReasonForRegain: weightWatchersReasonForRegain,
          slimfast: slimfast,
          slimfastStartDate: slimfastStartDate,
          slimfastEndDate: slimfastEndDate,
          slimfastWeightLoss: slimfastWeightLoss,
          slimfastReasonForStopping: slimfastReasonForStopping,
          slimfastReasonForRegain: slimfastReasonForRegain,
          optifast: optifast,
          optifastStartDate: optifastStartDate,
          optifastEndDate: optifastEndDate,
          optifastWeightLoss: optifastWeightLoss,
          optifastReasonForStopping: optifastReasonForStopping,
          optifastReasonForRegain: optifastReasonForRegain,
          otherLiquidDiet: otherLiquidDiet,
          otherLiquidDietStartDate: otherLiquidDietStartDate,
          otherLiquidDietEndDate: otherLiquidDietEndDate,
          otherLiquidDietWeightLoss: otherLiquidDietWeightLoss,
          otherLiquidDietReasonForStopping: otherLiquidDietReasonForStopping,
          otherLiquidDietReasonForRegain: otherLiquidDietReasonForRegain,
          other: other,
          otherName: otherName,
          otherStartDate: otherStartDate,
          otherEndDate: otherEndDate,
          otherWeightLoss: otherWeightLoss,
          otherReasonForStopping: otherReasonForStopping,
          otherReasonForRegain: otherReasonForRegain,
          adipex: adipex,
          adipexStartDate: adipexStartDate,
          adipexEndDate: adipexEndDate,
          adipexWeightLoss: adipexWeightLoss,
          adipexReasonForStopping: adipexReasonForStopping,
          adipexReasonForRegain: adipexReasonForRegain,
          alli: alli,
          alliStartDate: alliStartDate,
          alliEndDate: alliEndDate,
          alliWeightLoss: alliWeightLoss,
          alliReasonForStopping: alliReasonForStopping,
          alliReasonForRegain: alliReasonForRegain,
          belviq: belviq,
          belviqStartDate: belviqStartDate,
          belviqEndDate: belviqEndDate,
          belviqWeightLoss: belviqWeightLoss,
          belviqReasonForStopping: belviqReasonForStopping,
          belviqReasonForRegain: belviqReasonForRegain,
          dexatrim: dexatrim,
          dexatrimStartDate: dexatrimStartDate,
          dexatrimEndDate: dexatrimEndDate,
          dexatrimWeightLoss: dexatrimWeightLoss,
          dexatrimReasonForStopping: dexatrimReasonForStopping,
          dexatrimReasonForRegain: dexatrimReasonForRegain,
          herbalWeightLoss: herbalWeightLoss,
          herbalWeightLossStartDate: herbalWeightLossStartDate,
          herbalWeightLossEndDate: herbalWeightLossEndDate,
          herbalWeightLossWeightLoss: herbalWeightLossWeightLoss,
          herbalWeightLossReasonForStopping: herbalWeightLossReasonForStopping,
          herbalWeightLossReasonForRegain: herbalWeightLossReasonForRegain,
          meridia: meridia,
          meridiaStartDate: meridiaStartDate,
          meridiaEndDate: meridiaEndDate,
          meridiaWeightLoss: meridiaWeightLoss,
          meridiaReasonForStopping: meridiaReasonForStopping,
          meridiaReasonForRegain: meridiaReasonForRegain,
          phenfen: phenfen,
          phenfenStartDate: phenfenStartDate,
          phenfenEndDate: phenfenEndDate,
          phenfenWeightLoss: phenfenWeightLoss,
          phenfenReasonForStopping: phenfenReasonForStopping,
          phenfenReasonForRegain: phenfenReasonForRegain,
          qsymia: qsymia,
          qsymiaStartDate: qsymiaStartDate,
          qsymiaEndDate: qsymiaEndDate,
          qsymiaWeightLoss: qsymiaWeightLoss,
          qsymiaReasonForStopping: qsymiaReasonForStopping,
          qsymiaReasonForRegain: qsymiaReasonForRegain,
          redux: redux,
          reduxStartDate: reduxStartDate,
          reduxEndDate: reduxEndDate,
          reduxWeightLoss: reduxWeightLoss,
          reduxReasonForStopping: reduxReasonForStopping,
          reduxReasonForRegain: reduxReasonForRegain,
          otherSupplements: otherSupplements,
          otherSupplementsName: otherSupplementsName,
          otherSupplementsStartDate: otherSupplementsStartDate,
          otherSupplementsEndDate: otherSupplementsEndDate,
          otherSupplementsWeightLoss: otherSupplementsWeightLoss,
          otherSupplementsReasonForStopping: otherSupplementsReasonForStopping,
          otherSupplementsReasonForRegain: otherSupplementsReasonForRegain,
          childrenUnderEighteen: childrenUnderEighteen,
          childrenUnderEighteenCheckBox: childrenUnderEighteenCheckBox,
          familyMemebersObese: familyMemebersObese,
          support: support,
          supportExplaination: supportExplaination,
          eatingDisorder: eatingDisorder,
          anorexiaNervosa: anorexiaNervosa,
          bingeEating: bingeEating,
          bulimia: bulimia,
          eatingTooMuch: eatingTooMuch,
          sleepHours: sleepHours,
          restedWhenWakeUp: restedWhenWakeUp,
          doYouSnore: doYouSnore,
          wearEquipment: wearEquipment,
          howManyNights: howManyNights,
          sleepWellness: sleepWellness,
          sittingAndReading: sittingAndReading,
          watchingTv: watchingTv,
          sittingInPublic: sittingInPublic,
          carPassanger: carPassanger,
          lyingDown: lyingDown,
          talkingToSomeone: talkingToSomeone,
          sittingQuietlyAfterLunch: sittingQuietlyAfterLunch,
          inCarWhileStopped: inCarWhileStopped,
          total: total,
          typicalDay: typicalDay,
          enjoyExercise: enjoyExercise,
          gymMembership: gymMembership,
          exerciseEquipment: exerciseEquipment,
          exerciseRegularly: exerciseRegularly,
          badExerciseExperience: badExerciseExperience,
          encourageExercise: encourageExercise,
          sixAm: sixAm,
          nineAm: nineAm,
          twelvePm: twelvePm,
          threePm: threePm,
          sixPm: sixPm,
          ninePm: ninePm,
          exerciseWeekly: exerciseWeekly,
          describeExercise: describeExercise,
          difficultyGettingUpFromFloor: difficultyGettingUpFromFloor,
          typeOfExercise: typeOfExercise,
          exercisePreference: exercisePreference,
          athleteInSchool: athleteInSchool,
          confidentIncrease: confidentIncrease,
          majorBenefitsOfExercise: majorBenefitsOfExercise,
          exerciseBarriers: exerciseBarriers,
          minutesPerDay: minutesPerDay,
          daysPerWeek: daysPerWeek,
          confidenceWeightLossDiet: confidenceWeightLossDiet,
          majorBarriersDiet: majorBarriersDiet,
          favoriteFoods: favoriteFoods,
          breakfastTypeOfFood: breakfastTypeOfFood,
          breakfastProteinOrCarbs: breakfastProteinOrCarbs,
          breakfastCalories: breakfastCalories,
          lunchTypeOfFood: lunchTypeOfFood,
          lunchProteinOrCarbs: lunchProteinOrCarbs,
          lunchCalories: lunchCalories,
          dinnerTypeOfFood: dinnerTypeOfFood,
          dinnerProteinOrCarbs: dinnerProteinOrCarbs,
          dinnerCalories: dinnerCalories,
          snackOneTypeOfFood: snackOneTypeOfFood,
          snackOneProteinOrCarbs: snackOneProteinOrCarbs,
          snackOneCalories: snackOneCalories,
          snackTwoTypeOfFood: snackTwoTypeOfFood,
          snackTwoProteinOrCarbs: snackTwoProteinOrCarbs,
          snackTwoCalories: snackTwoCalories,
          coffeeTypeOfFood: coffeeTypeOfFood,
          coffeeProteinOrCarbs: coffeeProteinOrCarbs,
          coffeeCalories: coffeeCalories,
          sodaTypeOfFood: sodaTypeOfFood,
          sodaProteinOrCarbs: sodaProteinOrCarbs,
          sodaCalories: sodaCalories,
          candyOrSweetsTypeOfFood: candyOrSweetsTypeOfFood,
          candyOrSweetsProteinOrCarbs: candyOrSweetsProteinOrCarbs,
          candyOrSweetsCalories: candyOrSweetsCalories,
          otherTypeOfFood: otherTypeOfFood,
          otherProteinOrCarbs: otherProteinOrCarbs,
          otherCalories: otherCalories,
          numPeopleLiveWith: numPeopleLiveWith,
          eatTogether: eatTogether,
          whoDoesShopping: whoDoesShopping,
          whoDoesCooking: whoDoesCooking,
          foodIntolerance: foodIntolerance,
          foodIntoleranceList: foodIntoleranceList,
          stressEating: stressEating,
          stressEatingDetails: stressEatingDetails,
          bingeEatingExperience: bingeEatingExperience,
          bingeEatingDetails: bingeEatingDetails,
          snackingExperience: snackingExperience,
          snackingDetails: snackingDetails,
          eatingMiddleOfNightExperience: eatingMiddleOfNightExperience,
          eatingMiddleOfNightDetails: eatingMiddleOfNightDetails,
          skippingMealsExperience: skippingMealsExperience,
          skippingMealsDetails: skippingMealsDetails,
          eatingOutExperience: eatingOutExperience,
          eatingOutDetails: eatingOutDetails,
          eatingInFrontOfTVExperience: eatingInFrontOfTVExperience,
          eatingInFrontOfTVDetails: eatingInFrontOfTVDetails,
          eatingAtDeskExperience: eatingAtDeskExperience,
          eatingAtDeskDetails: eatingAtDeskDetails,
          portionSizeExperience: portionSizeExperience,
          portionSizeDetails: portionSizeDetails,
          eatingTooFastExperience: eatingTooFastExperience,
          eatingTooFastDetails: eatingTooFastDetails,
          notSatifiedExperience: notSatifiedExperience,
          notSatifiedDetails: notSatifiedDetails,
          regularSoda: regularSoda,
          regularSodaCount: regularSodaCount,
          juice: juice,
          juiceCount: juiceCount,
          sweetTea: sweetTea,
          sweetTeaCount: sweetTeaCount,
          alchoholBeverages: alchoholBeverages,
          alchoholBeveragesCount: alchoholBeveragesCount,
          friedFoods: friedFoods,
          friedFoodsCount: friedFoodsCount,
          fruitServings: fruitServings,
          vegetableServings: vegetableServings,
          wholeGrainServings: wholeGrainServings,
          lowFatDairyServings: lowFatDairyServings,
          leanProteinServings: leanProteinServings,
          daysPerWeekExplination: daysPerWeekExplination,
          medicalHistory: medicalHistory,
          medicationsTaken: medicationsTaken,
          medicationsTakenList: medicationsTakenList,
        }
      ).then(() => {
        setSuccess(true)
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export async function GetWeightLossSurveyPatient({
  dispatch,
  email,
  setWeightLossSurveyPatient,
}) {
  onSnapshot(
    doc(
      db,
      'companys',
      'AMA',
      'patients',
      auth.currentUser.email,
      'WeightLossAutoSave',
      auth.currentUser.email
    ),
    (doc) => {
      dispatch(setWeightLossSurveyPatient(doc.data()))
    }
  )
}

export async function SubmitWeightLossSurvey({
  emailValue,
  date,
  patientsName,
  primaryDoctor,
  whyLossWeight,
  weightGoals,
  timeFrame,
  mostWeighedAsAdult,
  ageAtAdultMostWeight,
  leastWeighedAsAdult,
  ageAtAdultLeastWeight,
  weightChangeDuringLife,
  weightGainedInPast,
  challengesOfWeightManagement,
  hopesForWeightLossManagement,
  commitmentsToWeightLoss,
  currentDietAids,
  onYourOwn,
  checkIfTried,
  onYourOwnStartDate,
  onYourOwnEndDate,
  onYourOwnWeightLoss,
  onYourOwnReasonForStopping,
  onYourOwnReasonForRegain,
  atkinsOrLowCarbohydrate,
  atkinsOrLowCarbohydrateStartDate,
  atkinsOrLowCarbohydrateEndDate,
  atkinsOrLowCarbohydrateWeightLoss,
  atkinsOrLowCarbohydrateReasonForStopping,
  atkinsOrLowCarbohydrateReasonForRegain,
  jennyCraig,
  jennyCraigStartDate,
  jennyCraigEndDate,
  jennyCraigWeightLoss,
  jennyCraigReasonForStopping,
  jennyCraigReasonForRegain,
  nutrisystem,
  nutrisystemStartDate,
  nutrisystemEndDate,
  nutrisystemWeightLoss,
  nutrisystemReasonForStopping,
  nutrisystemReasonForRegain,
  weightWatchers,
  weightWatchersStartDate,
  weightWatchersEndDate,
  weightWatchersWeightLoss,
  weightWatchersReasonForStopping,
  weightWatchersReasonForRegain,
  slimfast,
  slimfastStartDate,
  slimfastEndDate,
  slimfastWeightLoss,
  slimfastReasonForStopping,
  slimfastReasonForRegain,
  optifast,
  optifastStartDate,
  optifastEndDate,
  optifastWeightLoss,
  optifastReasonForStopping,
  optifastReasonForRegain,
  otherLiquidDiet,
  otherLiquidDietStartDate,
  otherLiquidDietEndDate,
  otherLiquidDietWeightLoss,
  otherLiquidDietReasonForStopping,
  otherLiquidDietReasonForRegain,
  other,
  otherName,
  otherStartDate,
  otherEndDate,
  otherWeightLoss,
  otherReasonForStopping,
  otherReasonForRegain,
  adipex,
  adipexStartDate,
  adipexEndDate,
  adipexWeightLoss,
  adipexReasonForStopping,
  adipexReasonForRegain,
  alli,
  alliStartDate,
  alliEndDate,
  alliWeightLoss,
  alliReasonForStopping,
  alliReasonForRegain,
  belviq,
  belviqStartDate,
  belviqEndDate,
  belviqWeightLoss,
  belviqReasonForStopping,
  belviqReasonForRegain,
  dexatrim,
  dexatrimStartDate,
  dexatrimEndDate,
  dexatrimWeightLoss,
  dexatrimReasonForStopping,
  dexatrimReasonForRegain,
  herbalWeightLoss,
  herbalWeightLossStartDate,
  herbalWeightLossEndDate,
  herbalWeightLossWeightLoss,
  herbalWeightLossReasonForStopping,
  herbalWeightLossReasonForRegain,
  meridia,
  meridiaStartDate,
  meridiaEndDate,
  meridiaWeightLoss,
  meridiaReasonForStopping,
  meridiaReasonForRegain,
  phenfen,
  phenfenStartDate,
  phenfenEndDate,
  phenfenWeightLoss,
  phenfenReasonForStopping,
  phenfenReasonForRegain,
  qsymia,
  qsymiaStartDate,
  qsymiaEndDate,
  qsymiaWeightLoss,
  qsymiaReasonForStopping,
  qsymiaReasonForRegain,
  redux,
  reduxStartDate,
  reduxEndDate,
  reduxWeightLoss,
  reduxReasonForStopping,
  reduxReasonForRegain,
  otherSupplements,
  otherSupplementsName,
  otherSupplementsStartDate,
  otherSupplementsEndDate,
  otherSupplementsWeightLoss,
  otherSupplementsReasonForStopping,
  otherSupplementsReasonForRegain,
  childrenUnderEighteen,
  childrenUnderEighteenCheckBox,
  familyMemebersObese,
  support,
  supportExplaination,
  eatingDisorder,
  anorexiaNervosa,
  bingeEating,
  bulimia,
  eatingTooMuch,
  sleepHours,
  restedWhenWakeUp,
  doYouSnore,
  wearEquipment,
  howManyNights,
  sleepWellness,
  sittingAndReading,
  watchingTv,
  sittingInPublic,
  carPassanger,
  lyingDown,
  talkingToSomeone,
  sittingQuietlyAfterLunch,
  inCarWhileStopped,
  total,
  typicalDay,
  enjoyExercise,
  gymMembership,
  exerciseEquipment,
  exerciseRegularly,
  badExerciseExperience,
  encourageExercise,
  sixAm,
  nineAm,
  twelvePm,
  threePm,
  sixPm,
  ninePm,
  exerciseWeekly,
  describeExercise,
  difficultyGettingUpFromFloor,
  typeOfExercise,
  exercisePreference,
  athleteInSchool,
  confidentIncrease,
  majorBenefitsOfExercise,
  exerciseBarriers,
  minutesPerDay,
  daysPerWeek,
  confidenceWeightLossDiet,
  majorBarriersDiet,
  favoriteFoods,
  breakfastTypeOfFood,
  breakfastProteinOrCarbs,
  breakfastCalories,
  lunchTypeOfFood,
  lunchProteinOrCarbs,
  lunchCalories,
  dinnerTypeOfFood,
  dinnerProteinOrCarbs,
  dinnerCalories,
  snackOneTypeOfFood,
  snackOneProteinOrCarbs,
  snackOneCalories,
  snackTwoTypeOfFood,
  snackTwoProteinOrCarbs,
  snackTwoCalories,
  coffeeTypeOfFood,
  coffeeProteinOrCarbs,
  coffeeCalories,
  sodaTypeOfFood,
  sodaProteinOrCarbs,
  sodaCalories,
  candyOrSweetsTypeOfFood,
  candyOrSweetsProteinOrCarbs,
  candyOrSweetsCalories,
  otherTypeOfFood,
  otherProteinOrCarbs,
  otherCalories,
  numPeopleLiveWith,
  eatTogether,
  whoDoesShopping,
  whoDoesCooking,
  foodIntolerance,
  foodIntoleranceList,
  stressEating,
  stressEatingDetails,
  bingeEatingExperience,
  bingeEatingDetails,
  snackingExperience,
  snackingDetails,
  eatingMiddleOfNightExperience,
  eatingMiddleOfNightDetails,
  skippingMealsExperience,
  skippingMealsDetails,
  eatingOutExperience,
  eatingOutDetails,
  eatingInFrontOfTVExperience,
  eatingInFrontOfTVDetails,
  eatingAtDeskExperience,
  eatingAtDeskDetails,
  portionSizeExperience,
  portionSizeDetails,
  eatingTooFastExperience,
  eatingTooFastDetails,
  notSatifiedExperience,
  notSatifiedDetails,
  regularSoda,
  regularSodaCount,
  juice,
  juiceCount,
  sweetTea,
  sweetTeaCount,
  alchoholBeverages,
  alchoholBeveragesCount,
  friedFoods,
  friedFoodsCount,
  fruitServings,
  vegetableServings,
  wholeGrainServings,
  lowFatDairyServings,
  leanProteinServings,
  daysPerWeekExplination,
  medicalHistory,
  medicationsTaken,
  medicationsTakenList,
}) {
  await setDoc(
    doc(
      db,
      'companys',
      'AMA',
      'patients',
      emailValue,
      'WeightLoss',
      emailValue
    ),
    {
      emailValue: emailValue,
      patientsName: patientsName,
      date: date,
      primaryDoctor: primaryDoctor,
      whyLossWeight: whyLossWeight,
      weightGoals: weightGoals,
      timeFrame: timeFrame,
      mostWeighedAsAdult: mostWeighedAsAdult,
      ageAtAdultMostWeight: ageAtAdultMostWeight,
      leastWeighedAsAdult: leastWeighedAsAdult,
      ageAtAdultLeastWeight: ageAtAdultLeastWeight,
      weightChangeDuringLife: weightChangeDuringLife,
      weightGainedInPast: weightGainedInPast,
      challengesOfWeightManagement: challengesOfWeightManagement,
      hopesForWeightLossManagement: hopesForWeightLossManagement,
      commitmentsToWeightLoss: commitmentsToWeightLoss,
      currentDietAids: currentDietAids,
      onYourOwn: onYourOwn,
      checkIfTried: checkIfTried,
      onYourOwnStartDate: onYourOwnStartDate,
      onYourOwnEndDate: onYourOwnEndDate,
      onYourOwnWeightLoss: onYourOwnWeightLoss,
      onYourOwnReasonForStopping: onYourOwnReasonForStopping,
      onYourOwnReasonForRegain: onYourOwnReasonForRegain,
      atkinsOrLowCarbohydrate: atkinsOrLowCarbohydrate,
      atkinsOrLowCarbohydrateStartDate: atkinsOrLowCarbohydrateStartDate,
      atkinsOrLowCarbohydrateEndDate: atkinsOrLowCarbohydrateEndDate,
      atkinsOrLowCarbohydrateWeightLoss: atkinsOrLowCarbohydrateWeightLoss,
      atkinsOrLowCarbohydrateReasonForStopping:
        atkinsOrLowCarbohydrateReasonForStopping,
      atkinsOrLowCarbohydrateReasonForRegain:
        atkinsOrLowCarbohydrateReasonForRegain,
      jennyCraig: jennyCraig,
      jennyCraigStartDate: jennyCraigStartDate,
      jennyCraigEndDate: jennyCraigEndDate,
      jennyCraigWeightLoss: jennyCraigWeightLoss,
      jennyCraigReasonForStopping: jennyCraigReasonForStopping,
      jennyCraigReasonForRegain: jennyCraigReasonForRegain,
      nutrisystem: nutrisystem,
      nutrisystemStartDate: nutrisystemStartDate,
      nutrisystemEndDate: nutrisystemEndDate,
      nutrisystemWeightLoss: nutrisystemWeightLoss,
      nutrisystemReasonForStopping: nutrisystemReasonForStopping,
      nutrisystemReasonForRegain: nutrisystemReasonForRegain,
      weightWatchers: weightWatchers,
      weightWatchersStartDate: weightWatchersStartDate,
      weightWatchersEndDate: weightWatchersEndDate,
      weightWatchersWeightLoss: weightWatchersWeightLoss,
      weightWatchersReasonForStopping: weightWatchersReasonForStopping,
      weightWatchersReasonForRegain: weightWatchersReasonForRegain,
      slimfast: slimfast,
      slimfastStartDate: slimfastStartDate,
      slimfastEndDate: slimfastEndDate,
      slimfastWeightLoss: slimfastWeightLoss,
      slimfastReasonForStopping: slimfastReasonForStopping,
      slimfastReasonForRegain: slimfastReasonForRegain,
      optifast: optifast,
      optifastStartDate: optifastStartDate,
      optifastEndDate: optifastEndDate,
      optifastWeightLoss: optifastWeightLoss,
      optifastReasonForStopping: optifastReasonForStopping,
      optifastReasonForRegain: optifastReasonForRegain,
      otherLiquidDiet: otherLiquidDiet,
      otherLiquidDietStartDate: otherLiquidDietStartDate,
      otherLiquidDietEndDate: otherLiquidDietEndDate,
      otherLiquidDietWeightLoss: otherLiquidDietWeightLoss,
      otherLiquidDietReasonForStopping: otherLiquidDietReasonForStopping,
      otherLiquidDietReasonForRegain: otherLiquidDietReasonForRegain,
      other: other,
      otherName: otherName,
      otherStartDate: otherStartDate,
      otherEndDate: otherEndDate,
      otherWeightLoss: otherWeightLoss,
      otherReasonForStopping: otherReasonForStopping,
      otherReasonForRegain: otherReasonForRegain,
      adipex: adipex,
      adipexStartDate: adipexStartDate,
      adipexEndDate: adipexEndDate,
      adipexWeightLoss: adipexWeightLoss,
      adipexReasonForStopping: adipexReasonForStopping,
      adipexReasonForRegain: adipexReasonForRegain,
      alli: alli,
      alliStartDate: alliStartDate,
      alliEndDate: alliEndDate,
      alliWeightLoss: alliWeightLoss,
      alliReasonForStopping: alliReasonForStopping,
      alliReasonForRegain: alliReasonForRegain,
      belviq: belviq,
      belviqStartDate: belviqStartDate,
      belviqEndDate: belviqEndDate,
      belviqWeightLoss: belviqWeightLoss,
      belviqReasonForStopping: belviqReasonForStopping,
      belviqReasonForRegain: belviqReasonForRegain,
      dexatrim: dexatrim,
      dexatrimStartDate: dexatrimStartDate,
      dexatrimEndDate: dexatrimEndDate,
      dexatrimWeightLoss: dexatrimWeightLoss,
      dexatrimReasonForStopping: dexatrimReasonForStopping,
      dexatrimReasonForRegain: dexatrimReasonForRegain,
      herbalWeightLoss: herbalWeightLoss,
      herbalWeightLossStartDate: herbalWeightLossStartDate,
      herbalWeightLossEndDate: herbalWeightLossEndDate,
      herbalWeightLossWeightLoss: herbalWeightLossWeightLoss,
      herbalWeightLossReasonForStopping: herbalWeightLossReasonForStopping,
      herbalWeightLossReasonForRegain: herbalWeightLossReasonForRegain,
      meridia: meridia,
      meridiaStartDate: meridiaStartDate,
      meridiaEndDate: meridiaEndDate,
      meridiaWeightLoss: meridiaWeightLoss,
      meridiaReasonForStopping: meridiaReasonForStopping,
      meridiaReasonForRegain: meridiaReasonForRegain,
      phenfen: phenfen,
      phenfenStartDate: phenfenStartDate,
      phenfenEndDate: phenfenEndDate,
      phenfenWeightLoss: phenfenWeightLoss,
      phenfenReasonForStopping: phenfenReasonForStopping,
      phenfenReasonForRegain: phenfenReasonForRegain,
      qsymia: qsymia,
      qsymiaStartDate: qsymiaStartDate,
      qsymiaEndDate: qsymiaEndDate,
      qsymiaWeightLoss: qsymiaWeightLoss,
      qsymiaReasonForStopping: qsymiaReasonForStopping,
      qsymiaReasonForRegain: qsymiaReasonForRegain,
      redux: redux,
      reduxStartDate: reduxStartDate,
      reduxEndDate: reduxEndDate,
      reduxWeightLoss: reduxWeightLoss,
      reduxReasonForStopping: reduxReasonForStopping,
      reduxReasonForRegain: reduxReasonForRegain,
      otherSupplements: otherSupplements,
      otherSupplementsName: otherSupplementsName,
      otherSupplementsStartDate: otherSupplementsStartDate,
      otherSupplementsEndDate: otherSupplementsEndDate,
      otherSupplementsWeightLoss: otherSupplementsWeightLoss,
      otherSupplementsReasonForStopping: otherSupplementsReasonForStopping,
      otherSupplementsReasonForRegain: otherSupplementsReasonForRegain,
      childrenUnderEighteen: childrenUnderEighteen,
      childrenUnderEighteenCheckBox: childrenUnderEighteenCheckBox,
      familyMemebersObese: familyMemebersObese,
      support: support,
      supportExplaination: supportExplaination,
      eatingDisorder: eatingDisorder,
      anorexiaNervosa: anorexiaNervosa,
      bingeEating: bingeEating,
      bulimia: bulimia,
      eatingTooMuch: eatingTooMuch,
      sleepHours: sleepHours,
      restedWhenWakeUp: restedWhenWakeUp,
      doYouSnore: doYouSnore,
      wearEquipment: wearEquipment,
      howManyNights: howManyNights,
      sleepWellness: sleepWellness,
      sittingAndReading: sittingAndReading,
      watchingTv: watchingTv,
      sittingInPublic: sittingInPublic,
      carPassanger: carPassanger,
      lyingDown: lyingDown,
      talkingToSomeone: talkingToSomeone,
      sittingQuietlyAfterLunch: sittingQuietlyAfterLunch,
      inCarWhileStopped: inCarWhileStopped,
      total: total,
      typicalDay: typicalDay,
      enjoyExercise: enjoyExercise,
      gymMembership: gymMembership,
      exerciseEquipment: exerciseEquipment,
      exerciseRegularly: exerciseRegularly,
      badExerciseExperience: badExerciseExperience,
      encourageExercise: encourageExercise,
      sixAm: sixAm,
      nineAm: nineAm,
      twelvePm: twelvePm,
      threePm: threePm,
      sixPm: sixPm,
      ninePm: ninePm,
      exerciseWeekly: exerciseWeekly,
      describeExercise: describeExercise,
      difficultyGettingUpFromFloor: difficultyGettingUpFromFloor,
      typeOfExercise: typeOfExercise,
      exercisePreference: exercisePreference,
      athleteInSchool: athleteInSchool,
      confidentIncrease: confidentIncrease,
      majorBenefitsOfExercise: majorBenefitsOfExercise,
      exerciseBarriers: exerciseBarriers,
      minutesPerDay: minutesPerDay,
      daysPerWeek: daysPerWeek,
      confidenceWeightLossDiet: confidenceWeightLossDiet,
      majorBarriersDiet: majorBarriersDiet,
      favoriteFoods: favoriteFoods,
      breakfastTypeOfFood: breakfastTypeOfFood,
      breakfastProteinOrCarbs: breakfastProteinOrCarbs,
      breakfastCalories: breakfastCalories,
      lunchTypeOfFood: lunchTypeOfFood,
      lunchProteinOrCarbs: lunchProteinOrCarbs,
      lunchCalories: lunchCalories,
      dinnerTypeOfFood: dinnerTypeOfFood,
      dinnerProteinOrCarbs: dinnerProteinOrCarbs,
      dinnerCalories: dinnerCalories,
      snackOneTypeOfFood: snackOneTypeOfFood,
      snackOneProteinOrCarbs: snackOneProteinOrCarbs,
      snackOneCalories: snackOneCalories,
      snackTwoTypeOfFood: snackTwoTypeOfFood,
      snackTwoProteinOrCarbs: snackTwoProteinOrCarbs,
      snackTwoCalories: snackTwoCalories,
      coffeeTypeOfFood: coffeeTypeOfFood,
      coffeeProteinOrCarbs: coffeeProteinOrCarbs,
      coffeeCalories: coffeeCalories,
      sodaTypeOfFood: sodaTypeOfFood,
      sodaProteinOrCarbs: sodaProteinOrCarbs,
      sodaCalories: sodaCalories,
      candyOrSweetsTypeOfFood: candyOrSweetsTypeOfFood,
      candyOrSweetsProteinOrCarbs: candyOrSweetsProteinOrCarbs,
      candyOrSweetsCalories: candyOrSweetsCalories,
      otherTypeOfFood: otherTypeOfFood,
      otherProteinOrCarbs: otherProteinOrCarbs,
      otherCalories: otherCalories,
      numPeopleLiveWith: numPeopleLiveWith,
      eatTogether: eatTogether,
      whoDoesShopping: whoDoesShopping,
      whoDoesCooking: whoDoesCooking,
      foodIntolerance: foodIntolerance,
      foodIntoleranceList: foodIntoleranceList,
      stressEating: stressEating,
      stressEatingDetails: stressEatingDetails,
      bingeEatingExperience: bingeEatingExperience,
      bingeEatingDetails: bingeEatingDetails,
      snackingExperience: snackingExperience,
      snackingDetails: snackingDetails,
      eatingMiddleOfNightExperience: eatingMiddleOfNightExperience,
      eatingMiddleOfNightDetails: eatingMiddleOfNightDetails,
      skippingMealsExperience: skippingMealsExperience,
      skippingMealsDetails: skippingMealsDetails,
      eatingOutExperience: eatingOutExperience,
      eatingOutDetails: eatingOutDetails,
      eatingInFrontOfTVExperience: eatingInFrontOfTVExperience,
      eatingInFrontOfTVDetails: eatingInFrontOfTVDetails,
      eatingAtDeskExperience: eatingAtDeskExperience,
      eatingAtDeskDetails: eatingAtDeskDetails,
      portionSizeExperience: portionSizeExperience,
      portionSizeDetails: portionSizeDetails,
      eatingTooFastExperience: eatingTooFastExperience,
      eatingTooFastDetails: eatingTooFastDetails,
      notSatifiedExperience: notSatifiedExperience,
      notSatifiedDetails: notSatifiedDetails,
      regularSoda: regularSoda,
      regularSodaCount: regularSodaCount,
      juice: juice,
      juiceCount: juiceCount,
      sweetTea: sweetTea,
      sweetTeaCount: sweetTeaCount,
      alchoholBeverages: alchoholBeverages,
      alchoholBeveragesCount: alchoholBeveragesCount,
      friedFoods: friedFoods,
      friedFoodsCount: friedFoodsCount,
      fruitServings: fruitServings,
      vegetableServings: vegetableServings,
      wholeGrainServings: wholeGrainServings,
      lowFatDairyServings: lowFatDairyServings,
      leanProteinServings: leanProteinServings,
      daysPerWeekExplination: daysPerWeekExplination,
      medicalHistory: medicalHistory,
      medicationsTaken: medicationsTaken,
      medicationsTakenList: medicationsTakenList,
    }
  ).then(async () => {
    await setDoc(doc(db, 'companys', 'AMA', 'WeightLoss', emailValue), {
      emailValue: emailValue,
      patientsName: patientsName,
      date: date,
      primaryDoctor: primaryDoctor,
      whyLossWeight: whyLossWeight,
      weightGoals: weightGoals,
      timeFrame: timeFrame,
      mostWeighedAsAdult: mostWeighedAsAdult,
      ageAtAdultMostWeight: ageAtAdultMostWeight,
      leastWeighedAsAdult: leastWeighedAsAdult,
      ageAtAdultLeastWeight: ageAtAdultLeastWeight,
      weightChangeDuringLife: weightChangeDuringLife,
      weightGainedInPast: weightGainedInPast,
      challengesOfWeightManagement: challengesOfWeightManagement,
      hopesForWeightLossManagement: hopesForWeightLossManagement,
      commitmentsToWeightLoss: commitmentsToWeightLoss,
      currentDietAids: currentDietAids,
      onYourOwn: onYourOwn,
      checkIfTried: checkIfTried,
      onYourOwnStartDate: onYourOwnStartDate,
      onYourOwnEndDate: onYourOwnEndDate,
      onYourOwnWeightLoss: onYourOwnWeightLoss,
      onYourOwnReasonForStopping: onYourOwnReasonForStopping,
      onYourOwnReasonForRegain: onYourOwnReasonForRegain,
      atkinsOrLowCarbohydrate: atkinsOrLowCarbohydrate,
      atkinsOrLowCarbohydrateStartDate: atkinsOrLowCarbohydrateStartDate,
      atkinsOrLowCarbohydrateEndDate: atkinsOrLowCarbohydrateEndDate,
      atkinsOrLowCarbohydrateWeightLoss: atkinsOrLowCarbohydrateWeightLoss,
      atkinsOrLowCarbohydrateReasonForStopping:
        atkinsOrLowCarbohydrateReasonForStopping,
      atkinsOrLowCarbohydrateReasonForRegain:
        atkinsOrLowCarbohydrateReasonForRegain,
      jennyCraig: jennyCraig,
      jennyCraigStartDate: jennyCraigStartDate,
      jennyCraigEndDate: jennyCraigEndDate,
      jennyCraigWeightLoss: jennyCraigWeightLoss,
      jennyCraigReasonForStopping: jennyCraigReasonForStopping,
      jennyCraigReasonForRegain: jennyCraigReasonForRegain,
      nutrisystem: nutrisystem,
      nutrisystemStartDate: nutrisystemStartDate,
      nutrisystemEndDate: nutrisystemEndDate,
      nutrisystemWeightLoss: nutrisystemWeightLoss,
      nutrisystemReasonForStopping: nutrisystemReasonForStopping,
      nutrisystemReasonForRegain: nutrisystemReasonForRegain,
      weightWatchers: weightWatchers,
      weightWatchersStartDate: weightWatchersStartDate,
      weightWatchersEndDate: weightWatchersEndDate,
      weightWatchersWeightLoss: weightWatchersWeightLoss,
      weightWatchersReasonForStopping: weightWatchersReasonForStopping,
      weightWatchersReasonForRegain: weightWatchersReasonForRegain,
      slimfast: slimfast,
      slimfastStartDate: slimfastStartDate,
      slimfastEndDate: slimfastEndDate,
      slimfastWeightLoss: slimfastWeightLoss,
      slimfastReasonForStopping: slimfastReasonForStopping,
      slimfastReasonForRegain: slimfastReasonForRegain,
      optifast: optifast,
      optifastStartDate: optifastStartDate,
      optifastEndDate: optifastEndDate,
      optifastWeightLoss: optifastWeightLoss,
      optifastReasonForStopping: optifastReasonForStopping,
      optifastReasonForRegain: optifastReasonForRegain,
      otherLiquidDiet: otherLiquidDiet,
      otherLiquidDietStartDate: otherLiquidDietStartDate,
      otherLiquidDietEndDate: otherLiquidDietEndDate,
      otherLiquidDietWeightLoss: otherLiquidDietWeightLoss,
      otherLiquidDietReasonForStopping: otherLiquidDietReasonForStopping,
      otherLiquidDietReasonForRegain: otherLiquidDietReasonForRegain,
      other: other,
      otherName: otherName,
      otherStartDate: otherStartDate,
      otherEndDate: otherEndDate,
      otherWeightLoss: otherWeightLoss,
      otherReasonForStopping: otherReasonForStopping,
      otherReasonForRegain: otherReasonForRegain,
      adipex: adipex,
      adipexStartDate: adipexStartDate,
      adipexEndDate: adipexEndDate,
      adipexWeightLoss: adipexWeightLoss,
      adipexReasonForStopping: adipexReasonForStopping,
      adipexReasonForRegain: adipexReasonForRegain,
      alli: alli,
      alliStartDate: alliStartDate,
      alliEndDate: alliEndDate,
      alliWeightLoss: alliWeightLoss,
      alliReasonForStopping: alliReasonForStopping,
      alliReasonForRegain: alliReasonForRegain,
      belviq: belviq,
      belviqStartDate: belviqStartDate,
      belviqEndDate: belviqEndDate,
      belviqWeightLoss: belviqWeightLoss,
      belviqReasonForStopping: belviqReasonForStopping,
      belviqReasonForRegain: belviqReasonForRegain,
      dexatrim: dexatrim,
      dexatrimStartDate: dexatrimStartDate,
      dexatrimEndDate: dexatrimEndDate,
      dexatrimWeightLoss: dexatrimWeightLoss,
      dexatrimReasonForStopping: dexatrimReasonForStopping,
      dexatrimReasonForRegain: dexatrimReasonForRegain,
      herbalWeightLoss: herbalWeightLoss,
      herbalWeightLossStartDate: herbalWeightLossStartDate,
      herbalWeightLossEndDate: herbalWeightLossEndDate,
      herbalWeightLossWeightLoss: herbalWeightLossWeightLoss,
      herbalWeightLossReasonForStopping: herbalWeightLossReasonForStopping,
      herbalWeightLossReasonForRegain: herbalWeightLossReasonForRegain,
      meridia: meridia,
      meridiaStartDate: meridiaStartDate,
      meridiaEndDate: meridiaEndDate,
      meridiaWeightLoss: meridiaWeightLoss,
      meridiaReasonForStopping: meridiaReasonForStopping,
      meridiaReasonForRegain: meridiaReasonForRegain,
      phenfen: phenfen,
      phenfenStartDate: phenfenStartDate,
      phenfenEndDate: phenfenEndDate,
      phenfenWeightLoss: phenfenWeightLoss,
      phenfenReasonForStopping: phenfenReasonForStopping,
      phenfenReasonForRegain: phenfenReasonForRegain,
      qsymia: qsymia,
      qsymiaStartDate: qsymiaStartDate,
      qsymiaEndDate: qsymiaEndDate,
      qsymiaWeightLoss: qsymiaWeightLoss,
      qsymiaReasonForStopping: qsymiaReasonForStopping,
      qsymiaReasonForRegain: qsymiaReasonForRegain,
      redux: redux,
      reduxStartDate: reduxStartDate,
      reduxEndDate: reduxEndDate,
      reduxWeightLoss: reduxWeightLoss,
      reduxReasonForStopping: reduxReasonForStopping,
      reduxReasonForRegain: reduxReasonForRegain,
      otherSupplements: otherSupplements,
      otherSupplementsName: otherSupplementsName,
      otherSupplementsStartDate: otherSupplementsStartDate,
      otherSupplementsEndDate: otherSupplementsEndDate,
      otherSupplementsWeightLoss: otherSupplementsWeightLoss,
      otherSupplementsReasonForStopping: otherSupplementsReasonForStopping,
      otherSupplementsReasonForRegain: otherSupplementsReasonForRegain,
      childrenUnderEighteen: childrenUnderEighteen,
      childrenUnderEighteenCheckBox: childrenUnderEighteenCheckBox,
      familyMemebersObese: familyMemebersObese,
      support: support,
      supportExplaination: supportExplaination,
      eatingDisorder: eatingDisorder,
      anorexiaNervosa: anorexiaNervosa,
      bingeEating: bingeEating,
      bulimia: bulimia,
      eatingTooMuch: eatingTooMuch,
      sleepHours: sleepHours,
      restedWhenWakeUp: restedWhenWakeUp,
      doYouSnore: doYouSnore,
      wearEquipment: wearEquipment,
      howManyNights: howManyNights,
      sleepWellness: sleepWellness,
      sittingAndReading: sittingAndReading,
      watchingTv: watchingTv,
      sittingInPublic: sittingInPublic,
      carPassanger: carPassanger,
      lyingDown: lyingDown,
      talkingToSomeone: talkingToSomeone,
      sittingQuietlyAfterLunch: sittingQuietlyAfterLunch,
      inCarWhileStopped: inCarWhileStopped,
      total: total,
      typicalDay: typicalDay,
      enjoyExercise: enjoyExercise,
      gymMembership: gymMembership,
      exerciseEquipment: exerciseEquipment,
      exerciseRegularly: exerciseRegularly,
      badExerciseExperience: badExerciseExperience,
      encourageExercise: encourageExercise,
      sixAm: sixAm,
      nineAm: nineAm,
      twelvePm: twelvePm,
      threePm: threePm,
      sixPm: sixPm,
      ninePm: ninePm,
      exerciseWeekly: exerciseWeekly,
      describeExercise: describeExercise,
      difficultyGettingUpFromFloor: difficultyGettingUpFromFloor,
      typeOfExercise: typeOfExercise,
      exercisePreference: exercisePreference,
      athleteInSchool: athleteInSchool,
      confidentIncrease: confidentIncrease,
      majorBenefitsOfExercise: majorBenefitsOfExercise,
      exerciseBarriers: exerciseBarriers,
      minutesPerDay: minutesPerDay,
      daysPerWeek: daysPerWeek,
      confidenceWeightLossDiet: confidenceWeightLossDiet,
      majorBarriersDiet: majorBarriersDiet,
      favoriteFoods: favoriteFoods,
      breakfastTypeOfFood: breakfastTypeOfFood,
      breakfastProteinOrCarbs: breakfastProteinOrCarbs,
      breakfastCalories: breakfastCalories,
      lunchTypeOfFood: lunchTypeOfFood,
      lunchProteinOrCarbs: lunchProteinOrCarbs,
      lunchCalories: lunchCalories,
      dinnerTypeOfFood: dinnerTypeOfFood,
      dinnerProteinOrCarbs: dinnerProteinOrCarbs,
      dinnerCalories: dinnerCalories,
      snackOneTypeOfFood: snackOneTypeOfFood,
      snackOneProteinOrCarbs: snackOneProteinOrCarbs,
      snackOneCalories: snackOneCalories,
      snackTwoTypeOfFood: snackTwoTypeOfFood,
      snackTwoProteinOrCarbs: snackTwoProteinOrCarbs,
      snackTwoCalories: snackTwoCalories,
      coffeeTypeOfFood: coffeeTypeOfFood,
      coffeeProteinOrCarbs: coffeeProteinOrCarbs,
      coffeeCalories: coffeeCalories,
      sodaTypeOfFood: sodaTypeOfFood,
      sodaProteinOrCarbs: sodaProteinOrCarbs,
      sodaCalories: sodaCalories,
      candyOrSweetsTypeOfFood: candyOrSweetsTypeOfFood,
      candyOrSweetsProteinOrCarbs: candyOrSweetsProteinOrCarbs,
      candyOrSweetsCalories: candyOrSweetsCalories,
      otherTypeOfFood: otherTypeOfFood,
      otherProteinOrCarbs: otherProteinOrCarbs,
      otherCalories: otherCalories,
      numPeopleLiveWith: numPeopleLiveWith,
      eatTogether: eatTogether,
      whoDoesShopping: whoDoesShopping,
      whoDoesCooking: whoDoesCooking,
      foodIntolerance: foodIntolerance,
      foodIntoleranceList: foodIntoleranceList,
      stressEating: stressEating,
      stressEatingDetails: stressEatingDetails,
      bingeEatingExperience: bingeEatingExperience,
      bingeEatingDetails: bingeEatingDetails,
      snackingExperience: snackingExperience,
      snackingDetails: snackingDetails,
      eatingMiddleOfNightExperience: eatingMiddleOfNightExperience,
      eatingMiddleOfNightDetails: eatingMiddleOfNightDetails,
      skippingMealsExperience: skippingMealsExperience,
      skippingMealsDetails: skippingMealsDetails,
      eatingOutExperience: eatingOutExperience,
      eatingOutDetails: eatingOutDetails,
      eatingInFrontOfTVExperience: eatingInFrontOfTVExperience,
      eatingInFrontOfTVDetails: eatingInFrontOfTVDetails,
      eatingAtDeskExperience: eatingAtDeskExperience,
      eatingAtDeskDetails: eatingAtDeskDetails,
      portionSizeExperience: portionSizeExperience,
      portionSizeDetails: portionSizeDetails,
      eatingTooFastExperience: eatingTooFastExperience,
      eatingTooFastDetails: eatingTooFastDetails,
      notSatifiedExperience: notSatifiedExperience,
      notSatifiedDetails: notSatifiedDetails,
      regularSoda: regularSoda,
      regularSodaCount: regularSodaCount,
      juice: juice,
      juiceCount: juiceCount,
      sweetTea: sweetTea,
      sweetTeaCount: sweetTeaCount,
      alchoholBeverages: alchoholBeverages,
      alchoholBeveragesCount: alchoholBeveragesCount,
      friedFoods: friedFoods,
      friedFoodsCount: friedFoodsCount,
      fruitServings: fruitServings,
      vegetableServings: vegetableServings,
      wholeGrainServings: wholeGrainServings,
      lowFatDairyServings: lowFatDairyServings,
      leanProteinServings: leanProteinServings,
      daysPerWeekExplination: daysPerWeekExplination,
      medicalHistory: medicalHistory,
      medicationsTaken: medicationsTaken,
      medicationsTakenList: medicationsTakenList,
    })
  })
}
//update patient info if they are in weight loss program
export async function UpdatePatientInfoWeightLoss({
  weightLossProgram,
  emailValue,
}) {
  await setDoc(
    doc(db, 'companys', 'AMA', 'patients', emailValue),
    {
      isInWeightLossProgram: weightLossProgram,
    },
    { merge: true }
  )
}

export async function savePatentForms(data) {
  try {
    const recordsRequestCollection = doc(
      db,
      'companys',
      'AMA',
      data.formName,
      auth.currentUser.email
    )
    const recordsRequestCollectionInPatient = doc(
      db,
      'companys',
      'AMA',
      'patients',
      auth.currentUser.email,
      data.formName,
      auth.currentUser.email
    )

    const docRef = await setDoc(
      recordsRequestCollection,
      {
        ...data,
      },
      { merge: true }
    ).then(() => {
      setDoc(
        recordsRequestCollectionInPatient,
        {
          ...data,
        },
        { merge: true }
      )
    })
  } catch (error) {
    console.error(`Error adding document: ${error}`)
  }
}

// get all forms for a patient using a query
export function getPatientForms({ setPatientDocs, selectedForm }) {
  onSnapshot(
    query(
      collection(db, 'companys', 'AMA', 'patients', 'z@gmail.com', selectedForm)
    ),
    (querySnapshot) => {
      const patientDocs = []
      querySnapshot.forEach((doc) => {
        patientDocs.push(doc.data())
      })
      setPatientDocs(patientDocs)
    }
  )
}

// Define the async function updateFieldsToLowerCase that takes a collection path as input
export async function updateFieldsToLowerCase() {
  const collectionPath = ['companys', 'AMA', 'patients']
  // Get a reference to the collection using the provided path
  const collectionRef = collection(db, 'companys', 'AMA', 'patients')
  // Retrieve all documents in the collection
  const querySnapshot = await getDocs(collectionRef)
  try {
    // Iterate through each document in the collection
    querySnapshot.forEach(async (docSnapshot) => {
      // Get the data of the current document
      const data = docSnapshot.data()
      // Initialize a flag to check if an update is needed and an object to store the updated data
      let shouldUpdate = false
      const updatedData = {}

      // Check if the fullName field exists, set its value to lowercase, and update the flag
      if (data.firstName) {
        updatedData.firstName = data.firstName.toLowerCase().trim()
        shouldUpdate = true
      }
      // Check if the firstName field exists, set its value to lowercase, and update the flag
      if (data.fullName.includes(', ')) {
        updatedData.fullName = data.fullName.replace(', ', ',').trim()
        shouldUpdate = true
      }
      if (data.fullName.includes(' , ')) {
        updatedData.fullName = data.fullName.replace(' , ', ',').trim()
        shouldUpdate = true
      }
      if (data.fullName.includes(' ,')) {
        updatedData.fullName = data.fullName.replace(', ', ',').trim()
        shouldUpdate = true
      }
      // Check if the lastName field exists, set its value to lowercase, and update the flag
      if (data.lastName) {
        updatedData.lastName = data.lastName.toLowerCase()
        shouldUpdate = true
      }

      // If any of the fields were updated, update the document in Firestore with the new data
      if (shouldUpdate) {
        const docRef = doc(db, 'companys', 'AMA', 'patients', docSnapshot.id)
        await updateDoc(docRef, updatedData)
      }
    })
  } catch (error) {
    console.log(error)
  }
}
