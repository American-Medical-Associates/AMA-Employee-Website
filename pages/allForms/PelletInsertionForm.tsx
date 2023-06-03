import React, { useState } from 'react'
import TextInput from '../../components/userInput/TextInput'
import DateInput from '../../components/userInput/DateInput'
import MainButton from '../../components/Buttons/MainButton'
import Signature from '../../components/formComponents/Signature'
import Header from '../../components/navigation/Header'
import { savePatentForms } from '../../firebase'
import GreenCheckMark from '../../components/formComponents/GreenCheckMark'

const PelletInsertionForm = () => {
  const [
    pelletInsertionSignatureCheckBox,
    setPelletInsertionSignatureCheckBox,
  ] = useState(false)
  const [pelletInsertionSignature, setPelletInsertionSignature] = useState('')
  const [pelletInsertionSignatureDate, setPelletInsertionSignatureDate] =
    useState('')
  const [amountPaid, setAmountPaid] = useState('')
  const [paidDate, setPaidDate] = useState('')
  //required useStates for form
  const [
    requirePelletInsertionSignatureCheckBox,
    setRequirePelletInsertionSignatureCheckBox,
  ] = useState(false)
  const [requirePelletInsertionSignature, setRequirePelletInsertionSignature] =
    useState(false)
  const [
    requirePelletInsertionSignatureDate,
    setRequirePelletInsertionSignatureDate,
  ] = useState(false)
  const [requiredAmountPaid, setRequiredAmountPaid] = useState(false)
  const [requiredPaidDate, setRequiredPaidDate] = useState(false)
  const [showGreenCheckMark, setShowGreenCheckMark] = useState(false)

  // Add savePelletInsertion function to handle form submission and save data to Firestore
  const isFormValid = () => {
    let valid = true

    if (!pelletInsertionSignatureCheckBox) {
      setRequirePelletInsertionSignatureCheckBox(true)
      valid = false
    }

    if (!pelletInsertionSignature) {
      setRequirePelletInsertionSignature(true)
      valid = false
    }

    if (!pelletInsertionSignatureDate) {
      setRequirePelletInsertionSignatureDate(true)
      valid = false
    }

    if (!amountPaid) {
      setRequiredAmountPaid(true)
      valid = false
    }

    if (!paidDate) {
      setRequiredPaidDate(true)
      valid = false
    }

    return valid
  }

  return (
    <div>
      <Header selectCompany={'AMA'} routePatientsHome={false} />
      <main className=" container mx-auto my-[50px]">
        <h1 className="text-center text-3xl">Pellet Insertion Consent Form</h1>
        {/* Add your form content here */}
        <p className="my-20 text-center">
          I wish to receive sub dermal hormone pellet implants for the purpose
          of reducing symptoms that are at least in part due to low levels of
          testosterone. Even though sub dermal bio identical hormone
          implantation has been done for over 50 years by a large number of
          doctors, I realize that it is not the usual and customary means of
          hormone replacement. These pellets are a natural soy-derived bio
          identical testosterone inserted under the skin (subcutaneous) of my
          lateral buttocks to achieve a steady and consistent delivery of
          hormones into my bloodstream. I realize that the advantages of
          testosterone, include decreased depression, anxiety, irritability and
          increased energy and motivation, stabilizing moods, and enhancing
          cognitive function. I realize there is potential concerns with
          testosterone therapy, which include the possibility of a current
          prostate cancer to grow more rapidly, For this reason, a rectal exam
          and prostate specific antigen blood test will be done prior to
          starting testosterone therapy, and should be conducted yearly,
          thereafter. If there is a question about possible prostate cancer, I
          agree to a follow up ultrasound of the prostate. The second concern
          with testosterone therapy is that it can increase the patient’s
          hemoglobin and hematocrit, or thicken the blood. This can be reversed
          through donating blood periodically. This problem can be diagnosed
          with a blood test, and a complete blood count should be done yearly.
          The final concern, especially in younger men, is that testosterone
          therapy can suppress the development of sperm, the sperm count could
          dramatically reduce during therapy. However, to date, this appears to
          be reversed once therapy has been discontinued. Any man who is
          concerned about fertility is encouraged to produce a sperm sample and
          have it frozen as a precaution. Also, a semen analysis is encouraged
          prior to initiation of testosterone therapy. Testosterone therapy is
          NOT to be used as a form of male contraception. Pellet extrusion
          (coming out) has been known to occur on rare occasions, between 2-5%
          according to studies. There is a slight chance of wound infection as
          with any other surgical procedure. Any infection can be treated in the
          office with an antibiotic or other means. Please call the office if
          you feel that the sight has become infected. Pellets are considered
          irretrievable once they are inserted, in extraordinary circumstances,
          pellets may be removed by a general surgeon, via a minor out-patient
          surgical procedure. Pellets dissolve completely in 4-12 months.
          Payment requirements: A deposit of the total amount of the cost of the
          pellets (varies from patient to patient) is required prior to AMA
          ordering my pellets. This will include a shipping fee as well. Once my
          pellets have arrived at the office, I will be informed to make an
          appointment. At my appointment the pellet insertion fee of $200 will
          then be due. As a courtesy, I can request AMA to submit a claim to my
          insurance, but no discount will be given for insurance write offs. I
          will be responsible for the entire amount of pellets and the
          insertion, regardless of what my insurance pays, denies or discounts.
          AMA will not enter into a dispute with my insurance company for
          payment. My signature below certifies that I have read and understand
          all of the above, that all my questions regarding this procedure have
          been answered satisfactorily. I wish to proceed with the pellet
          insertion and this consent covers present and future insertions.
        </p>
        <Signature
          requiredCheckBox={requirePelletInsertionSignatureCheckBox}
          requiredSignature={requirePelletInsertionSignature}
          requiredDate={requirePelletInsertionSignatureDate}
          signatureValue={pelletInsertionSignature}
          signatureState={setPelletInsertionSignature}
          agreeThatTheirSignatureIsValid={pelletInsertionSignatureCheckBox}
          agreeThatTheirSignatureIsValidState={
            setPelletInsertionSignatureCheckBox
          }
          date={pelletInsertionSignatureDate}
          dateState={setPelletInsertionSignatureDate}
        />
        <div className="mb-5">
          <TextInput
            required={requiredAmountPaid}
            id="amountPaid"
            placeHolder="Amount Paid"
            widthPercentage="w-2/3"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setAmountPaid(text.target.value)
            }}
            value={amountPaid}
          />
        </div>
        <div className="mb-5">
          <DateInput
            required={requiredPaidDate}
            id="paidDate"
            placeHolder="Paid Date"
            widthPercentage="w-2/3"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setPaidDate(text.target.value)
            }}
            value={paidDate}
          />
        </div>
        <div className="text-center">
          {showGreenCheckMark && (
            <GreenCheckMark
              checkMarkText="Thank You"
              bottomText="Your information has been submitted"
            />
          )}
          <MainButton
            buttonWidth="w-1/2"
            buttonText="Submit"
            onClick={() => {
              if (isFormValid()) {
                savePatentForms({
                  formName: 'PelletInsertionConsentForm',
                  pelletInsertionSignatureCheckBox,
                  pelletInsertionSignature,
                  pelletInsertionSignatureDate,
                  amountPaid,
                  paidDate,
                }).then(() => {
                  setShowGreenCheckMark(true)
                })
              }
            }}
          />
        </div>
      </main>
    </div>
  )
}

export default PelletInsertionForm
