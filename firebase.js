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
} from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'
import { emit } from 'process'
import { async } from '@firebase/util'
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
  race,
  gender,
  veteranStatus,
  DisabilityStatus,
  statmentOfAvailbilty,
  checkbox1,
  checkbox2,
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
        race: race,
        gender: gender,
        require_immigration_sponsorShip: radio1,
        authorize_job_application: radio2,
        previously_been_employed: radio3,
        former_or_current_intern_or_contractor: radio4,
        consent_to_receiving_text_messages_throughout_your_application_process:
          radio5,
        Have_you_ever_been_terminated_from_a_job: radio6,
        Have_you_ever_been_convicted_of_a_crime: radio7,
        accept_them_as_conditions_of_employment: checkbox1,
        employee_opportunitiesDisclosure: checkbox2,
        DisabilityStatus: DisabilityStatus,
        statmentOfAvailbilty: statmentOfAvailbilty,
        veteranStatus,
        aboutYou: aboutYou,
        veteranStatus,
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
    adminState(doc.get('adminUser'))
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
