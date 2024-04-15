import React from 'react'
import { useEffect, useState } from 'react'

import Router, { useRouter } from 'next/router'
import { auth, submitPhqForm } from '../firebase/firebase'
import CustomCheckBoxField from '../components/formComponents/CustomCheckBoxField'
import TextInput from '../components/userInput/TextInput'
import DateInput from '../components/userInput/DateInput'
import MainButton from '../components/Buttons/MainButton'

const formatDate = (date: string | number | Date) => {
  const d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  return [month.padStart(2, '0'), day.padStart(2, '0'), year].join('/')
}

export default function PhqForm() {
  const [validationError, setValidationError] = useState('')
  const [name, setName] = useState('')
  const [requiredName, setRequiredName] = useState(false)
  const [date, setDate] = useState(formatDate(new Date()))
  const [requiredDate, setRequiredDate] = useState(false)
  const [littleInterest, setLittleInterest] = useState<string[]>([])
  const [requiredLittleInterest, setRequiredLittleInterest] = useState(false)
  const [feelingDown, setFeelingDown] = useState<string[]>([])
  const [requiredFeelingDown, setRequiredFeelingDown] = useState(false)
  const [fallingAsleep, setFallingAsleep] = useState<string[]>([])
  const [requiredFallingAsleep, setRequiredFallingAsleep] = useState(false)
  const [tiredness, setTiredness] = useState<string[]>([])
  const [requiredTiredness, setRequiredTiredness] = useState(false)
  const [poorAppetite, setReducedPoorAppetite] = useState<string[]>([])
  const [requiredPoorAppetite, setRequiredPoorAppetite] = useState(false)
  const [feelingBad, setFeelingBad] = useState<string[]>([])
  const [requiredFeelingBad, setRequiredFeelingBad] = useState(false)
  const [lassitude, setLassitude] = useState<string[]>([])
  const [requiredLassitude, setRequiredLassitude] = useState(false)
  const [inabilityToFeel, setInabilityToFeel] = useState<string[]>([])
  const [requiredInabilityToFeel, setRequiredInabilityToFeel] = useState(false)
  const [pessimisticThoughts, setPessimisticThoughts] = useState<string[]>([])
  const [requiredPessimisticThoughts, setRequiredPessimisticThoughts] =
    useState(false)
  const [suicidalThoughts, setSuicidalThoughts] = useState<string[]>([])
  const [requiredSuicidalThoughts, setRequiredSuicidalThoughts] =
    useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  // Authenticated user check. Reality this makes it so no one can copy and paste a link to access the page.
  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  const calculateTotalScore = () => {
    const checkBoxArrays = [
      littleInterest,
      feelingDown,
      fallingAsleep,
      tiredness,
      poorAppetite,
      feelingBad,
      lassitude,
      inabilityToFeel,
      pessimisticThoughts,
      suicidalThoughts,
    ]

    const totalScore = checkBoxArrays.reduce((total, checkBoxArray) => {
      const score = checkBoxArray.reduce((sum, value) => {
        // Split the string by space and take the first part
        const numberPart = value.split(' ')[0]

        // Convert the number part to an integer
        const number = parseInt(numberPart, 10)

        // If the extracted value is a number, add it to the sum
        return sum + (isNaN(number) ? 0 : number)
      }, 0)

      return total + score
    }, 0)

    console.log('Total Score: ', totalScore)
    return totalScore
  }

  // Makes sure that only one checkbox is selected for each question.
  const validateSelections = () => {
    const questions = [
      { title: 'Little Interest', value: littleInterest },
      { title: 'Feeling Down', value: feelingDown },
      { title: 'Falling Asleep', value: fallingAsleep },
      { title: 'Feeling Tired', value: tiredness },
      { title: 'Poor Appetite', value: poorAppetite },
      { title: 'Feeling Bad', value: feelingBad },
      { title: 'Lassitude', value: lassitude },
      { title: 'Inability to Feel', value: inabilityToFeel },
      { title: 'Pessimistic Thoughts', value: pessimisticThoughts },
      { title: 'Suicidal Thoughts', value: suicidalThoughts },
    ]

    const invalidQuestion = questions.find(
      (question) => question.value.length > 1,
    )

    if (invalidQuestion) {
      alert(`Please select only one option for '${invalidQuestion.title}'.`)
      return false
    }

    setValidationError('')
    return true
  }

  const extractNumber = (value: string) => {
    return value.split(' ')[0]
  }

  const handleSubmit = async () => {
    if (isSubmitted) {
      alert('The form has already been submitted.')
      return
    }
    if (validateSelections()) {
      try {
        const totalScore = calculateTotalScore()
        submitPhqForm({
          name: name,
          date: date,
          totalScore: totalScore,
          littleInterest: extractNumber(littleInterest[0]),
          feelingDown: extractNumber(feelingDown[0]),
          fallingAsleep: extractNumber(fallingAsleep[0]),
          tiredness: extractNumber(tiredness[0]),
          poorAppetite: extractNumber(poorAppetite[0]),
          feelingBad: extractNumber(feelingBad[0]),
          lassitude: extractNumber(lassitude[0]),
          inabilityToFeel: extractNumber(inabilityToFeel[0]),
          pessimisticThoughts: extractNumber(pessimisticThoughts[0]),
          suicidalThoughts: extractNumber(suicidalThoughts[0]),
        }).then(async () => {
          setIsSubmitted(true)
          await auth.signOut() // Sign out the user after the form is submitted.
          router.push('/MadrsThankYou')
        })
      } catch (error) {
        console.log('Error Submitting MADRS:', error)
      }
    }
  }

  useEffect(() => {
    calculateTotalScore()
  }, [
    littleInterest,
    feelingDown,
    fallingAsleep,
    tiredness,
    poorAppetite,
    feelingBad,
    lassitude,
    inabilityToFeel,
    pessimisticThoughts,
    suicidalThoughts,
  ])

  return (
    <div className="bg-gray-100">
      {/*  */}
      <div className="text-center mx-10 my-5">
        <h1 className="mb-3 font-bold text-xl">
          Patient Health Questionnaire (PHQ-9)
        </h1>
        <p className="ml-10 mr-10">
          <strong>Instructions: </strong>Over the last 2 weeks, how often have
          you been bothered by any of the following problems?
        </p>
      </div>
      <div className="grid grid-flow-col grid-rows-1 w-[100%]">
        <TextInput
          placeHolder="First and Last Name"
          onChange={(e: { target: { value: string } }) =>
            setName(e.target.value)
          }
          widthPercentage={'w-[75%]'}
          required={true}
        />
        <DateInput
          placeHolder="Date (MM/DD/YYYY)"
          onChange={(e: { target: { value: string } }) =>
            setDate(e.target.value)
          }
          widthPercentage={'w-[75%]'}
          required={true}
          value={date}
        />
      </div>
      <div className="flex flex-wrap justify-center items-start mx-8 my-5 bg-white border-4 border-solid rounded-xl shadow-outline shadow-xl shadow-gray">
        <div className="w-full px-4">
          <CustomCheckBoxField
            key={'littleInterest'}
            id="littleInterest"
            title="1. Little interest or pleasure in doing things."
            checkBoxValues={littleInterest}
            setCheckBoxValues={setLittleInterest}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 - Not at all',
              '1 - Several days',
              '2 - More than half the days',
              '3 - Nearly every day',
            ]}
            required={requiredLittleInterest}
          />
        </div>
        <div className="w-full px-4">
          <CustomCheckBoxField
            key={'feelingDown'}
            id="feelingDown"
            title="2. Feeling down, depressed, or hopeless."
            checkBoxValues={feelingDown}
            setCheckBoxValues={setFeelingDown}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 - Not at all',
              '1 - Several days',
              '2 - More than half the days',
              '3 - Nearly every day',
            ]}
            required={requiredFeelingDown}
          />
        </div>
        <div className="w-full px-4">
          <CustomCheckBoxField
            key={'fallingAsleep'}
            id="fallingAsleep"
            title="3. Trouble falling or staying asleep, or sleeping too much."
            checkBoxValues={fallingAsleep}
            setCheckBoxValues={setFallingAsleep}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 - Not at all',
              '1 - Several days',
              '2 - More than half the days',
              '3 - Nearly every day',
            ]}
            required={requiredFallingAsleep}
          />
        </div>
        <div className="w-full px-4">
          <CustomCheckBoxField
            key={'tiredness'}
            id="tiredness"
            title="4. Feeling tired or having little energy."
            checkBoxValues={tiredness}
            setCheckBoxValues={setTiredness}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 - Not at all',
              '1 - Several days',
              '2 - More than half the days',
              '3 - Nearly every day',
            ]}
            required={requiredTiredness}
          />
        </div>
        <div className="w-full px-4">
          <CustomCheckBoxField
            key={'poorAppetite'}
            id="poorAppetite"
            title="5. Poor appetite or overeating."
            checkBoxValues={poorAppetite}
            setCheckBoxValues={setRequiredPoorAppetite}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 - Not at all',
              '1 - Several days',
              '2 - More than half the days',
              '3 - Nearly every day',
            ]}
            required={requiredPoorAppetite}
          />
        </div>
        <div className="w-full px-4">
          <CustomCheckBoxField
            key={'feelingBad'}
            id="feelingBad"
            title="6. Feeling bad about yourself - or that you are a failure or have let yourself or your family down."
            checkBoxValues={feelingBad}
            setCheckBoxValues={setFeelingBad}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 - Not at all',
              '1 - Several days',
              '2 - More than half the days',
              '3 - Nearly every day',
            ]}
            required={requiredFeelingBad}
          />
        </div>
        <div className="w-full px-4">
          <p className="font-bold text-xl">
            Representing a difficulty getting started or slowness initiating and
            performing everyday activities.
          </p>
          <CustomCheckBoxField
            key={'lassitude'}
            id="lassitude"
            title="Lassitude"
            checkBoxValues={lassitude}
            setCheckBoxValues={setLassitude}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 Hardly no difficulty in getting started. No sluggishness.',
              '1',
              '2 Difficulties in starting activities.',
              '3',
              '4 Difficulties in starting simple routine activities which are carried out with effort.',
              '5',
              '6 Complete lassitude. Unable to do anything without help.',
            ]}
            required={requiredLassitude}
          />
        </div>
        <div className="w-full px-4">
          <p className="font-bold text-xl">
            Representing the subjective experience of reduced interest in the
            surroundings, or activites that normally give pleasure. The ability
            to react with adequate emotion to circumstances or people is
            reduced.
          </p>
          <CustomCheckBoxField
            key={'inabilityToFeel'}
            id="inabilityToFeel"
            title="Inability to Feel"
            checkBoxValues={inabilityToFeel}
            setCheckBoxValues={setInabilityToFeel}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 Normal interest in the surroundings and in other people.',
              '1',
              '2 Reduced ability to enjoy usual interest.',
              '3',
              '4 Loss of interest in surroundings. Loss of feelings for friends and acquaintances.',
              '5',
              '6 The experience of being emotionally paralyzed, inability to feel anger, gried or pleasure and a complete or even painful failure to feel for close relatives and friends.',
            ]}
            required={requiredInabilityToFeel}
          />
        </div>
        <div className="w-full px-4">
          <p className="font-bold text-xl">
            Representing thoughts of guilt, inferiority, self-reproach,
            sinfulness, remorse and ruin.
          </p>
          <CustomCheckBoxField
            key={'pessimisticThoughts'}
            id="pessimisticThoughts"
            title="Pessimistic Thoughts"
            checkBoxValues={pessimisticThoughts}
            setCheckBoxValues={setPessimisticThoughts}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 No pessimistic thoughts.',
              '1',
              '2 Fluctuating ideas of failure, self-reproach or self-depreciation.',
              '3',
              '4 Persistent self-accusations, or definite but still rational ideas of guilt or sin. Increasingly pessimistic about the future.',
              '5',
              '6 Delusions of ruin, remorse or unredeemable sin. Self-accusations which are absurd and unshakable.',
            ]}
            required={requiredPessimisticThoughts}
          />
        </div>
        <div className="w-full px-4">
          <p className="font-bold text-xl">
            Representing the feeling that life is not worth living, that a
            natural death would be welcome, suicidal thoughts, and the
            preparations for suicide. Suicidal attempts should not in themselves
            influence the rating.
          </p>
          <CustomCheckBoxField
            key={'suicidalThoughts'}
            id="suicidalThoughts"
            title="Suicidal Thoughts"
            checkBoxValues={suicidalThoughts}
            setCheckBoxValues={setSuicidalThoughts}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 Enjoys life or takes it as it comes.',
              '1',
              '2 Weary of life. Only fleeting suicidal thoughts.',
              '3',
              '4 Probably better off dead. Suicidal thoughts are common, and suicide is considered as a possible solution, but without specific plans or intention.',
              '5',
              '6 Explicit plans for suicide when there is an opportunity. Active preparations for suicide.',
            ]}
            required={requiredSuicidalThoughts}
          />
        </div>

        {validationError && <div className="alert">{validationError}</div>}

        <MainButton
          typeOfButton="submit"
          buttonText="Submit"
          buttonWidth="w-[20%]"
          onClick={() => {
            if (name === '') {
              setRequiredName(true)
              alert('Please enter your name.')
            } else if (date === '') {
              setRequiredDate(true)
              alert('Please enter the current date.')
            } else if (littleInterest.length === 0) {
              setRequiredLittleInterest(true)
              alert('Please enter you score for question #1.')
            } else if (feelingDown.length === 0) {
              setRequiredFeelingDown(true)
              alert('Please enter your score for question #2.')
            } else if (fallingAsleep.length === 0) {
              setRequiredFallingAsleep(true)
              alert('Please enter your score for question #3.')
            } else if (tiredness.length === 0) {
              setRequiredTiredness(true)
              alert('Please enter your score for question #4.')
            } else if (poorAppetite.length === 0) {
              setRequiredPoorAppetite(true)
              alert('Please enter your score for question #5.')
            } else if (feelingBad.length === 0) {
              setRequiredFeelingBad(true)
              alert('Please enter your score for question #6.')
            } else if (lassitude.length === 0) {
              setRequiredLassitude(true)
              alert('Please enter your score for Lassitude.')
            } else if (inabilityToFeel.length === 0) {
              setRequiredInabilityToFeel(true)
              alert('Please enter your score for Inability to Feel.')
            } else if (pessimisticThoughts.length === 0) {
              setRequiredPessimisticThoughts(true)
              alert('Please enter your score for Pessimistic Thoughts.')
            } else if (suicidalThoughts.length === 0) {
              setRequiredSuicidalThoughts(true)
              alert('Please enter your score for Suicidal Thoughts.')
            } else {
              handleSubmit()
            }
          }}
        />
      </div>
    </div>
  )
}
