import React from 'react'
import MainButton from '../components/MainButton'
import { httpsCallable, getFunctions } from 'firebase/functions'
import { auth, functions } from '../firebase'
const PatientManagment = () => {
  //use selenium to add patient information to eclinic database
  const addPatientToEclincical = httpsCallable(
    functions,
    'addPatientToEclinicalPuppeteer'
  )
  return (
    <div>
      <h1>Patient Managment</h1>
      <MainButton
        buttonText="Add Patient"
        onClick={() => {
          addPatientToEclincical().then((result) => {
            alert('Successfully added patient to eclinic')
          })
        }}
      />
    </div>
  )
}
export default PatientManagment
