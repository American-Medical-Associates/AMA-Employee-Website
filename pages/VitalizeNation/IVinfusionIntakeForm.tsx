import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import TextInput from '../../components/TextInput'
import CustomCheckBoxFeild from '../../components/formComponents/CustomCheckBoxFeild'
import DateInput from '../../components/DateInput'
import MainButton from '../../components/MainButton'
import PhoneNumberInput from '../../components/PhoneNumberInput'
import Header from '../../components/Header'
import Signature from '../../components/formComponents/Signature'
import { AddIVinfusionIntakeForm, auth } from '../../firebase'

const IVinfusionIntakeForm: NextPage<{}> = () => {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [DOB, setDOB] = useState('')
  const [whatTheyConsentTo, setWhatTheyConsentTo] = useState([])
  const [signature, setSignature] = useState('')
  const [signatureDate, setSignatureDate] = useState('')
  const [agreeSignatureIsValid, setAgreeSignatureIsValid] = useState(false)

  return (
    <div className=" flex flex-col items-center justify-center">
      <Header selectCompany={'Vitalize'} routePatientsHome={false} />
      <main className=" my-16 flex flex-col items-center justify-center">
        <h1 className=" my-10 text-2xl font-bold">PATIENT CONSENT FORM </h1>
        <h2 className=" font-semiboldmy-5 text-center text-xl">
          Intravenous (IV) Infusion/ Intramuscular (IM) OR Subscutaneous (SQ)
          Injection Therapy
        </h2>
        <p className=" my-5 ">
          This document is intended to serve as confirmation of my informed
          consent for IV/IM/SQ therapy ordered by Ehreema Nadir, MD PLLC - DBA
          Vitalize Med Spa, by a Vitalize Infusion Center Nurse.
        </p>
        <TextInput
          placeHolder="First Name"
          value={firstName}
          onChange={(text: any) => {
            setFirstName(text.target.value)
          }}
          id="firstName"
          widthPercentage="w-1/2"
        />
        <TextInput
          placeHolder="Last Name"
          value={lastName}
          onChange={(text: any) => {
            setLastName(text.target.value)
          }}
          id="lastName"
          widthPercentage="w-1/2"
        />
        <DateInput
          placeHolder="Date of Birth"
          value={DOB}
          onChange={(text: any) => {
            setDOB(text.target.value)
          }}
          id="DOB"
          widthPercentage="w-1/2"
        />
        <PhoneNumberInput
          placeHolder="Phone Number"
          value={phone}
          onChange={(text: any) => {
            setPhone(text.target.value)
          }}
          id="phone"
          widthPercentage="w-1/2"
        />
        <TextInput
          placeHolder="Email"
          value={email}
          onChange={(text: any) => {
            setEmail(text.target.value)
          }}
          id="email"
          widthPercentage="w-1/2"
        />
        <div className=" my-8 flex w-[50%] items-center justify-center">
          <CustomCheckBoxFeild
            checkBoxValues={whatTheyConsentTo}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '1) I have informed the Nurse and/or Physician of any known allergies to current medications or other substances and supplements.',
              '2) I have informed the Nurse and/or Physician of any known allergies to drugs or other substances, or of	any past reactions to anesthetics and/or medical procedures.',
              '3) I understand that I have the right to consent or refuse any proposed treatment at any time.',
              '4) I understand that I will have limited mobility during the procedure and will need to refrain from any activity that can impact the IV flow.',
              '5) I understand the information provided on this form and consent to treatment by my nurse and/or physician.',
              '6) I have received all the information and explanation I desire pertaining to this procedure.',
              "7) I understand that IV therapies are experimental.  IV infusions, IM and SQ injection therapy and any claims made about these services have not been evaluated by the US Food and Drug Administration (FDA)	and are not intended to diagnose, treat, cure or prevent any medical diseases.  These services are not a substitute for your primary care physician's medical care.",
              '8) Benefits of IV, IM or SQ therapy include:	     a) Injectables are not affected by stomach or intestinal absorption problems.     b) Total amount of infusion is available to the tissue.     c) Nutrients are forced into cells by means of high concentration gradient.	     d) Higher doeses of nutrients can be given, which otherwise not possible by mounth   without intestinal irritation.  	',
              '9) I am aware that other unforseen complications could occur.  I do not expect the Nurse and/or Physician to anticipate and or explain all risk and possible complications.  I rely on their judgement during the course of the treatment with any regard to my procedure.',
              '10) My typed signature below confirms that:      a) This procedure involves inserting a needle into the vein and injecting prescribed solution.      b) Alternatives to IV therapy include, but are not limited to, oral supplements.      c) The potential risks to IV therapy include, but are not limited to:           i) Occassionally: Discomfort, bruising and pain at the injection site          ii) Rarely: Inflammation of the vein used for injection, phlebitis, metabolic disturbances and injury         iii) Extremely Rarely: Severe allergic reaction, anaphylaxis, infection, cardiac arrest and/or death.	',
              '11) I understand that this IV lead is for medical purposes only.  If  any illicit, illegal, or recreational drugs are found, the IV therapy will discontinued and local law enforcement will be contacted immediately.	',
              '12) I release Ehreema Nadir, MD and all medical staff of Vitalize Infusion, from all liabilities for any complications or damages associated with my IV, IM or SQ therapy.',
            ]}
            setCheckBoxValues={setWhatTheyConsentTo}
          />
        </div>
        <Signature
          signatureValue={signature}
          signatureState={setSignature}
          agreeThatTheirSignatureIsValid={agreeSignatureIsValid}
          agreeThatTheirSignatureIsValidState={setAgreeSignatureIsValid}
          date={signatureDate}
          dateState={setSignatureDate}
        />

        <MainButton
          buttonText="Submit"
          onClick={() => {
            //check if all the fields are filled out
            if (
              firstName === '' ||
              lastName === '' ||
              email === '' ||
              phone === '' ||
              DOB === '' ||
              whatTheyConsentTo.length < 12 ||
              signature === '' ||
              signatureDate === '' ||
              !agreeSignatureIsValid
            ) {
              alert('Please fill out all the fields and agree to the signature')
              return
            } else {
              AddIVinfusionIntakeForm({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phone,
                DOB: DOB,
                whatTheyConsentTo: whatTheyConsentTo,
                signature: signature,
                signatureDate: signatureDate,
                AgreeForDigitalSignature: agreeSignatureIsValid,
              }).then(() => {
                router.push('/VitalizeNation/ThankYouForSubmitting')
              })
            }
          }}
          buttonWidth="w-1/2"
        />
      </main>
    </div>
  )
}
export default IVinfusionIntakeForm
