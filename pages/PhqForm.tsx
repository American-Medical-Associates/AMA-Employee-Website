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
  const [poorAppetite, setPoorAppetite] = useState<string[]>([])
  const [requiredPoorAppetite, setRequiredPoorAppetite] = useState(false)
  const [feelingBad, setFeelingBad] = useState<string[]>([])
  const [requiredFeelingBad, setRequiredFeelingBad] = useState(false)
  const [troubleConcentrating, setTroubleConcentrating] = useState<string[]>([])
  const [requiredTroubleConcentrating, setRequiredTroubleConcentrating] =
    useState(false)
  const [speakingSlowly, setSpeakingSlowly] = useState<string[]>([])
  const [requiredSpeakingSlowly, setRequiredSpeakingSlowly] = useState(false)
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
      Array.isArray(littleInterest) ? littleInterest : [],
      Array.isArray(feelingDown) ? feelingDown : [],
      Array.isArray(fallingAsleep) ? fallingAsleep : [],
      Array.isArray(tiredness) ? tiredness : [],
      Array.isArray(poorAppetite) ? poorAppetite : [],
      Array.isArray(feelingBad) ? feelingBad : [],
      Array.isArray(troubleConcentrating) ? troubleConcentrating : [],
      Array.isArray(speakingSlowly) ? speakingSlowly : [],
      Array.isArray(suicidalThoughts) ? suicidalThoughts : [],
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
      { title: 'Question 1: Little Interest', value: littleInterest },
      { title: 'Question 2: Feeling Down', value: feelingDown },
      { title: 'Question 3: Falling Asleep', value: fallingAsleep },
      { title: 'Question 4: Feeling Tired', value: tiredness },
      { title: 'Question 5: Poor Appetite', value: poorAppetite },
      { title: 'Question 6: Feeling Bad', value: feelingBad },
      {
        title: 'Question 7: Trouble Concentrating',
        value: troubleConcentrating,
      },
      { title: 'Question 8: Speaking Slowly', value: speakingSlowly },
      { title: 'Question 9: Suicidal Thoughts', value: suicidalThoughts },
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
          troubleConcentrating: extractNumber(troubleConcentrating[0]),
          speakingSlowly: extractNumber(speakingSlowly[0]),
          suicidalThoughts: extractNumber(suicidalThoughts[0]),
        }).then(async () => {
          setIsSubmitted(true)
          await auth.signOut() // Sign out the user after the form is submitted.
          router.push('/PhqThankYou')
        })
      } catch (error) {
        console.log('Error Submitting PHQ Form:', error)
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
    troubleConcentrating,
    speakingSlowly,
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
            setCheckBoxValues={setPoorAppetite}
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
          <CustomCheckBoxField
            key={'troubleConcentrating'}
            id="troubleConcentrating"
            title="7. Trouble concentrating on things, such as reading the newspaper or watching television."
            checkBoxValues={troubleConcentrating}
            setCheckBoxValues={setTroubleConcentrating}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 - Not at all',
              '1 - Several days',
              '2 - More than half the days',
              '3 - Nearly every day',
            ]}
            required={requiredTroubleConcentrating}
          />
        </div>
        <div className="w-full px-4">
          <CustomCheckBoxField
            key={'speakingSlowly'}
            id="speakingSlowly"
            title="8. Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual."
            checkBoxValues={speakingSlowly}
            setCheckBoxValues={setSpeakingSlowly}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 - Not at all',
              '1 - Several days',
              '2 - More than half the days',
              '3 - Nearly every day',
            ]}
            required={requiredSpeakingSlowly}
          />
        </div>
        <div className="w-full px-4">
          <CustomCheckBoxField
            key={'suicidalThoughts'}
            id="suicidalThoughts"
            title="9. Thoughts that you would be better off dead or of hurting yourself in some way."
            checkBoxValues={suicidalThoughts}
            setCheckBoxValues={setSuicidalThoughts}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 - Not at all',
              '1 - Several days',
              '2 - More than half the days',
              '3 - Nearly every day',
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
            } else if (troubleConcentrating.length === 0) {
              setRequiredTroubleConcentrating(true)
              alert('Please enter your score for question #7.')
            } else if (speakingSlowly.length === 0) {
              setRequiredSpeakingSlowly(true)
              alert('Please enter your score for question #8.')
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
