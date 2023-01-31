import React, { useState } from 'react'

import { NextPage } from 'next'
import MainButton from '../components/MainButton'
import GreenCheckMark from '../components/formComponents/GreenCheckMark'
import CustomCheckBoxFeild from '../components/formComponents/CustomCheckBoxFeild'
import TextInput from '../components/TextInput'
import Header from '../components/Header'
import CustomYesOrNo from '../components/formComponents/CustomYesOrNo'
import { Main } from 'next/document'
import { submitMentalHeathGroupSurvey } from '../firebase'
import { useRouter } from 'next/router'

const MentalHealthQuestionnaire: NextPage<{}> = () => {
  const router = useRouter()
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [currentClient, setCurrentClient] = useState('')
  const [medication, setMedication] = useState('')
  const [OneonOne, setOneonOne] = useState('')
  const [interest, setInterest] = useState('')
  const [insuranceCoverage, setInsuranceCoverage] = useState('')
  const [focusArea, setFocusArea] = useState([])
  const [joinTherapy, setJoinTherapy] = useState([])
  const [time, setTime] = useState([])
  const [sessionLength, setSessionLength] = useState([])
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
  const [requiredJoinTherapy, setRequiredJoinTherapy] = useState(false)
  const [requiredTime, setRequiredTime] = useState(false)
  const [requiredSessionLength, setRequiredSessionLength] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center">
      <Header selectCompany={'AMA'} />
      <div className="mt-5">
        <div className="mb-5 text-center text-4xl">Mental Health Survey</div>

        <div className="flex">
          <TextInput
            id="age"
            placeHolder="Age"
            widthPercentage="w-2/4"
            onChange={(text: any) => {
              setAge(text.target.value)
            }}
            required={requiredAge}
            value={age}
          />
        </div>

        <CustomCheckBoxFeild
          id="gender"
          checkBoxValues={gender}
          allowMultipleCheckBoxes={false}
          title="Please select your gender."
          setCheckBoxValues={setGender}
          required={requiredGender}
          checkBoxTitles={['Male', 'Female', 'Id prefer not to disclose']}
        />

        <CustomYesOrNo
          id="CurrentClientYesNo"
          text="Are you a current client at American Medical Associates?"
          CheckState={setCurrentClient}
          required={requiredCurrentClient}
        />

        <CustomYesOrNo
          id="Medication"
          text="Are you managing with Mental Health medication?"
          CheckState={setMedication}
          required={requiredMedication}
        />

        <CustomYesOrNo
          id="1on1"
          text="Are you currently engaged in 1 on 1 counseling sessions (AMA or other)?"
          CheckState={setOneonOne}
          required={requiredOneonOne}
        />

        <CustomYesOrNo
          id="Interest"
          text="Do you have interest in group counseling? Now or in the future?"
          CheckState={setInterest}
          required={requiredInterest}
        />

        {/* The list is in the email, impliment them when you can. */}
        <CustomCheckBoxFeild
          id="FocusArea"
          checkBoxValues={focusArea}
          allowMultipleCheckBoxes={true}
          title="If you joined in group therapy, which areas of focus might interest you most? (Select all that apply)"
          setCheckBoxValues={setFocusArea}
          required={requiredFocusArea}
          checkBoxTitles={[
            'Trauma',
            'Grief',
            'Communication Strategies',
            'Emotional Identification',
            'Relationship / Marriage / Family',
            'Stress / Anxiety Management',
            'Depression',
            'Anger Managment',
            'Social Skills',
            'Conflict Resolution',
            'Coping Skills',
            'Substance Use / Relapse Prevention',
          ]}
        />

        {/* Create a list of days with check boxes. */}
        <CustomCheckBoxFeild
          id="joinTherapy"
          checkBoxValues={joinTherapy}
          allowMultipleCheckBoxes={true}
          title="If interested in joining group therapy, what days of the week would best fit your schedule? (Select all that apply)"
          setCheckBoxValues={setJoinTherapy}
          required={requiredJoinTherapy}
          checkBoxTitles={[
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
          ]}
        />

        {/* List of times are located in the email. */}
        <CustomCheckBoxFeild
          id="time"
          checkBoxValues={time}
          allowMultipleCheckBoxes={true}
          title="If interested in joining group therapy, what times of the day would best fit your schedule? (Select all that apply)"
          setCheckBoxValues={setTime}
          required={requiredTime}
          checkBoxTitles={[
            'Morning',
            'Mid Morning',
            'Noon',
            'Early Afternoon',
            'Mid Afternoon',
            'Late Afternoon / Early Evening',
          ]}
        />

        {/* List can be found in email. */}
        <CustomCheckBoxFeild
          id="sessionLength"
          checkBoxValues={sessionLength}
          allowMultipleCheckBoxes={true}
          title="What length of group sessions would you be able and willing to commit to if pursuing group therapy? (Select all that apply)"
          setCheckBoxValues={setSessionLength}
          required={requiredSessionLength}
          checkBoxTitles={['60 Minutes', '90 Minutes', '120 Minutes']}
        />

        {/* YES or NO question. */}
        <CustomYesOrNo
          id="insuranceCoverage"
          text="If interested in group therapy, would you be more likely to join if covered by insurance?"
          CheckState={setInsuranceCoverage}
          required={requiredInsuranceCoverage}
        />
      </div>

      {checkMark && (
        <GreenCheckMark
          checkMarkText="Thank you!"
          bottomText="Your information has been submitted."
        />
      )}

      <MainButton
        onClick={() => {
          if (age === '') {
            alert('Please enter your age')
            setRequiredAge(true)
            router.push('/MentalHealthQuestionnaire/#age').then(() => {
              setTimeout(() => {
                window.scrollBy(0, -150)
              }, 100)
              //scroll up 200px
            })
            setLoading(false)
            return
          } else if (gender === '') {
            setRequiredGender(true)
            router.push('/MentalHealthQuestionnaire/#gender').then(() => {
              setTimeout(() => {
                window.scrollBy(0, -150)
              }, 100)
              //scroll up 200px
            })
            setLoading(false)
            return
          } else if (currentClient === '') {
            setRequiredCurrentClient(true)
            router
              .push('/MentalHealthQuestionnaire/#CurrentClientYesNo')
              .then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
            setLoading(false)
            return
          } else if (medication === '') {
            setRequiredMedication(true)
            router.push('/MentalHealthQuestionnaire/#Medication').then(() => {
              setTimeout(() => {
                window.scrollBy(0, -150)
              }, 100)
            })
            setLoading(false)
            return
          } else if (OneonOne === '') {
            setrequiredOneonOne(true)
            router.push('/MentalHealthQuestionnaire/#1on1').then(() => {
              setTimeout(() => {
                window.scrollBy(0, -150)
              }, 100)
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
            router.push('/MentalHealthQuestionnaire/#FocusArea').then(() => {
              setTimeout(() => {
                window.scrollBy(0, -150)
              }, 100)
            })
            setLoading(false)
            return
          } else if (joinTherapy.length <= 0) {
            setRequiredJoinTherapy(true)
            router.push('/MentalHealthQuestionnaire/#joinTherapy').then(() => {
              setTimeout(() => {
                window.scrollBy(0, -150)
              }, 100)
            })
            setLoading(false)
            return
          } else if (time.length <= 0) {
            setRequiredTime(true)
            router.push('/MentalHealthQuestionnaire/#time').then(() => {
              setTimeout(() => {
                window.scrollBy(0, -150)
              }, 100)
            })
            setLoading(false)
            return
          } else if (sessionLength.length <= 0) {
            setRequiredSessionLength(true)
            router
              .push('/MentalHealthQuestionnaire/#sessionLength')
              .then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
            setLoading(false)
            return
          } else if (insuranceCoverage === '') {
            setRequiredInsuranceCoverage(true)
            router
              .push('/MentalHealthQuestionnaire/#insuranceCoverage')
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
            age: age,
            gender: gender,
            currentClient: currentClient,
            medication: medication,
            OneonOne: OneonOne,
            interest: interest,
            insuranceCoverage: insuranceCoverage,
            focusArea: focusArea,
            joinTherapy: joinTherapy,
            time: time,
            sessionLength: sessionLength,
          }).then(() => {
            setLoading(false)
            setCheckMark(true)
          })
        }}
        buttonText="Submit"
        loading={loading}
      />
    </div>
  )
}

export default MentalHealthQuestionnaire
