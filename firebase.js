// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFunctions } from 'firebase/functions'
import { getStorage, getDownloadURL, uploadString, ref } from 'firebase/storage'
import { getFirestore, updateDoc } from 'firebase/firestore'
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
export function getResumes({ applicationtState }) {
  onSnapshot(
    query(collection(db, 'applications'), orderBy('timestamp', 'desc')),
    (querySnapshot) => {
      const arrays = []
      querySnapshot.forEach((snap) => {
        arrays.push(snap.data())
        // key: snap.id;
      })
      applicationtState(arrays)
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
}) {
  await setDoc(
    doc(db, 'companys', 'AMA', 'patients', email),
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

export function patientSearchListAMA({ patientArray }) {
  try {
    onSnapshot(
      query(
        collection(db, 'companys', 'AMA', 'patients')
        // where('fullName', '>=', searchName)
      ),

      (querySnapshot) => {
        const quantitysnap = []

        querySnapshot.forEach((snap) => {
          quantitysnap.push(snap.data())

          // key: snap.id;
        })
        patientArray(quantitysnap)

        // console.log(' fireeee x  ' + quantitysnap)
      }
    )
  } catch (e) {
    e
  }
}
export function GetSpravatoTracking({ SpravatoTrackingArray }) {
  try {
    onSnapshot(
      query(
        collection(db, 'spravato')
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
