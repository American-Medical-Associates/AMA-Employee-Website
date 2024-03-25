import React, { useState, useEffect } from 'react'

import { NextPage } from 'next'
import MainButton from '../components/Buttons/MainButton'
import GreenCheckMark from '../components/formComponents/GreenCheckMark'
import CustomCheckBoxField from '../components/formComponents/CustomCheckBoxField'
import TextInput from '../components/userInput/TextInput'

import CustomYesOrNo from '../components/formComponents/CustomYesOrNo'
import { submitMentalHeathGroupSurvey } from '../firebase/firebase'
import { useRouter } from 'next/router'
import { auth } from '../firebase/firebase'

const MentalHealthQuestionnaire: NextPage<{}> = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [interest, setInterest] = useState('')
  const [focusArea, setFocusArea] = useState([])
  const [loading, setLoading] = useState(false)
  const [checkMark, setCheckMark] = useState(false)

  // Sets the required infomation to false and needs to be true in order to submit
  const [requiredAge, setRequiredAge] = useState(false)
  const [requiredGender, setRequiredGender] = useState(false)
  const [requiredCurrentClient, setRequiredCurrentClient] = useState(false)
  const [requiredMedication, setRequiredMedication] = useState(false)
  const [requiredOneonOne, setrequiredOneonOne] = useState(false)
  const [requiredInterest, setRequiredInterest] = useState(false)
  const [requiredInsuranceCoverage, setRequiredInsuranceCoverage] =
    useState(false)
  const [requiredFocusArea, setRequiredFocusArea] = useState(false)
  const [requiredDaysOfWeek, setRequiredDaysOfWeek] = useState(false)
  const [requiredTimeOfDay, setRequiredTimeOfDay] = useState(false)
  const [requiredSessionLength, setRequiredSessionLength] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-5">
        <div className="mb-5 text-center text-4xl">Mental Health Survey</div>

        <div className="flex">
          <TextInput
            id="name"
            placeHolder="Name"
            widthPercentage="w-2/4"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setName(text.target.value)
            }}
            required={requiredAge}
            value={name}
          />
        </div>

        <CustomYesOrNo
          id="Interest"
          text="Do you have interest in group counseling? Now or in the future?"
          CheckState={setInterest}
          required={requiredInterest}
        />

        {/* The list is in the email, impliment them when you can. */}
        <CustomCheckBoxField
          id="FocusArea"
          checkBoxValues={focusArea}
          allowMultipleCheckBoxes={true}
          title="If you joined in group therapy, which areas of focus might interest you most? (Select all that apply)"
          setCheckBoxValues={setFocusArea}
          required={requiredFocusArea}
          checkBoxTitles={[
            'Stress / Anxiety Management',
            'Depression',
            'Anger Managment',
          ]}
        />

        {checkMark && (
          <GreenCheckMark
            checkMarkText="Thank you!"
            bottomText="Your information has been submitted."
          />
        )}
        <div className="text-center">
          <MainButton
            onClick={() => {
              if (name === '') {
                alert('Please enter your name')
                setRequiredAge(true)
                router.push('/MentalHealthQuestionnaire/#age').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                  //scroll up 200px
                })
                setLoading(false)
                return
              } else if (interest === '') {
                setRequiredInterest(true)
                router.push('/MentalHealthQuestionnaire/#Interest').then(() => {
                  setTimeout(() => {
                    window.scrollBy(0, -150)
                  }, 100)
                })
                setLoading(false)
                return
              } else if (focusArea.length <= 0) {
                setRequiredFocusArea(true)
                router
                  .push('/MentalHealthQuestionnaire/#FocusArea')
                  .then(() => {
                    setTimeout(() => {
                      window.scrollBy(0, -150)
                    }, 100)
                  })
                setLoading(false)
                return
              }
              setLoading(true)
              submitMentalHeathGroupSurvey({
                name: name,
                interest: interest,
                focusArea: focusArea,
              }).then(() => {
                setLoading(false)
                setCheckMark(true)
              })
            }}
            buttonText="Submit"
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}

export default MentalHealthQuestionnaire
