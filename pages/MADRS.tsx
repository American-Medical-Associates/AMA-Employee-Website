import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../components/navigation/Header'
import Router, { useRouter } from 'next/router'
import { auth, submitMadrs } from '../firebase/firebase'
import CustomCheckBoxField from '../components/formComponents/CustomCheckBoxField'
import TextInput from '../components/userInput/TextInput'
import DateInput from '../components/userInput/DateInput'
import MainButton from '../components/Buttons/MainButton'

export default function MADRS() {
  const [validationError, setValidationError] = useState("");
  const [name, setName] = useState("")
  const [requiredName, setRequiredName] = useState(false)
  const [date, setDate] = useState("")
  const [requiredDate, setRequiredDate] = useState(false)
  const [apparentSadness, setApparentSadness] = useState<string[]>([])
  const [requiredApparentSadness, setRequiredApparentSadness] = useState(false)
  const [reportedSadness, setReportedSadness] = useState<string[]>([])
  const [requiredReportedSadness, setRequiredReportedSadness] = useState(false)
  const [innerTension, setInnerTension] = useState<string[]>([])
  const [requiredInnerTension, setRequiredInnerTension] = useState(false)
  const [reducedSleep, setReducedSleep] = useState<string[]>([])
  const [requiredReducedSleep, setRequiredReducedSleep] = useState(false)
  const [reducedAppetite, setReducedAppetite] = useState<string[]>([])
  const [requiredReducedAppetite, setRequiredReducedAppetite] = useState(false)
  const [concentrationDifficulties, setConcentrationDifficulties] = useState<string[]>([])
  const [
    requiredConcentrationDifficulties,
    setRequiredConcentrationDifficulties,
  ] = useState(false)
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

    const calculateTotalScore = () => {
      const checkBoxArrays = [
        apparentSadness,
        reportedSadness,
        innerTension,
        reducedSleep,
        reducedAppetite,
        concentrationDifficulties,
        lassitude,
        inabilityToFeel,
        pessimisticThoughts,
        suicidalThoughts,
      ];
  
      const totalScore = checkBoxArrays.reduce((total, checkBoxArray) => {
        const score = checkBoxArray.reduce((sum, value) => {

          // Extracting the first character as the number (assuming it's 0-6)
          const number = parseInt(value.charAt(0), 10);
          
          // If the extracted value is a number, add it to the sum
          return sum + (isNaN(number) ? 0 : number);
        }, 0);
  
        return total + score;
      }, 0);
  
      console.log("Total Score: ", totalScore);
      return totalScore;
    };

    // Makes sure that only one checkbox is selected for each question.
    const validateSelections = () => {
      const questions = [
        {title: "Apparent Sadness", value: apparentSadness},
        {title: "Reported Sadness", value: reportedSadness},
        {title: "Inner Tension", value: innerTension},
        {title: "Reduced Sleep", value: reducedSleep},
        {title: "Reduced Appetite", value: reducedAppetite},
        {title: "Concentration Difficulties", value: concentrationDifficulties},
        {title: "Lassitude", value: lassitude},
        {title: "Inability to Feel", value: inabilityToFeel},
        {title: "Pessimistic Thoughts", value: pessimisticThoughts},
        {title: "Suicidal Thoughts", value: suicidalThoughts},
      ];

      const invalidQuestion = questions.find(question => question.value.length > 1);

      if (invalidQuestion){
        alert(`Please select only one option for '${invalidQuestion.title}'.`);
        return false;
      }

      setValidationError("");
      return true;
    };

    const handleSubmit = () => {
      if (validateSelections()) {
        try {
          const totalScore = calculateTotalScore();
          submitMadrs({
            name: name,
            date: date,
            totalScore: totalScore,
            apparentSadness: apparentSadness[0],
            reportedSadness: reportedSadness[0],
            innerTension: innerTension[0],
            reducedSleep: reducedSleep[0],
            reducedAppetite: reducedAppetite[0],
            concentrationDifficulties: concentrationDifficulties[0],
            lassitude: lassitude[0],
            inabilityToFeel: inabilityToFeel[0],
            pessimisticThoughts: pessimisticThoughts[0],
            suicidalThoughts: suicidalThoughts[0],
          });
        } catch (error) {
          console.log("Error Submitting MADRS:", error);
        }
      }
    };
    

    useEffect(() => {
      calculateTotalScore();
    }, [apparentSadness, reportedSadness, innerTension, reducedSleep, reducedAppetite, concentrationDifficulties, lassitude, inabilityToFeel, pessimisticThoughts, suicidalThoughts]);

  // Authenticated user check. Reality this makes it so no one can copy and paste a link to access the page.
  const router = useRouter()
  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  return (
    <div className="bg-gray-100">
      <Header selectCompany={'AMA'} routePatientsHome={true} />
      <div className="text-center mx-10 my-5">
        <h1 className="mb-3 font-bold text-xl">
          Montgomery-Asberg Depression Scale (MADRS)
        </h1>
        <p className="ml-10 mr-10">
          <strong>Instructions: </strong>The ratings should be based on a
          clinical interview moving from broadly phrased questions about
          symptoms to more detailed ones which allow a precise rating of
          severity. The rater must decide whether the rating lies on the defined
          scale stepss (0, 2, 4, 6) or between them (1, 3, 5). It is important
          to remember that it is only rare occasions that a depressed patient is
          encountered who cannot be rated on the items in the scale. If definite
          answers cannot be dictated from the patients, all relevant clues as
          well as information from other sources should be used as a basis for
          the rating in line with customart clinical practice. This scale may be
          used for any time interval between ratings, be it weekly or otherwise,
          but this must be recorded.
        </p>
      </div>
      <div className="grid grid-flow-col grid-rows-1 w-[100%]">
        <TextInput
          placeHolder="First and Last Name"
          onChange={(e: { target: { value: string } }) => setName(e.target.value)}
          widthPercentage={'w-[75%]'}
          required={true}
        />
        <DateInput
          placeHolder="Date (MM/DD/YYYY)"
          onChange={(e: { target: { value: string } }) => setDate(e.target.value)}
          widthPercentage={'w-[75%]'}
          required={true}
        />
      </div>
      <div className="flex flex-wrap justify-center items-start mx-8 my-5 bg-white border-4 border-solid rounded-xl shadow-outline shadow-xl shadow-gray">
        <div className="w-full px-4">
          <p className="font-bold text-xl">
            Representing despondency, gloom and despair, (more than just
            ordinary transient low spirits) reflected in speech, facial
            expression, and posture. Rate on depth of inability to brighten up.
          </p>
          <CustomCheckBoxField
            key={"apparentSadness"}
            id="apparentSadness"
            title="Apparent Sadness"
            checkBoxValues={apparentSadness}
            setCheckBoxValues={setApparentSadness}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 No Sadness',
              '1',
              '2 Looks dispirited but does brighten up without difficulty.',
              '3',
              '4 Appears sad and unhappy most of the time.',
              '5',
              '6 Looks miserable all the time. Extremely despondent.',
            ]}
            required={requiredApparentSadness}
          />
        </div>
        <div className="w-full px-4">
          <p className="font-bold text-xl">
            Representing reports of depressed mood, regardless of whether it is
            reflected in appearance or not. Includes low spirits, despondency or
            feeling of being beyond help wihtout hope. Rate according to
            intensity, duration and the extent to which the mood is reported to
            be influenced by events.
          </p>
          <CustomCheckBoxField
            key={"reportedSadness"}
            id="reportedSadness"
            title="Reported Sadness"
            checkBoxValues={reportedSadness}
            setCheckBoxValues={setReportedSadness}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 Occasional sadness in keeping with the circumstances.',
              '1',
              '2 Sad or low but brightens up without difficulty.',
              '3',
              '4 Pervasive feelings of sadness or gloominess. The mood is still influenced by external circumstances.',
              '5',
              '6 Continous or unvarying sadness, misery, or despondency.',
            ]}
            required={requiredReportedSadness}
          />
        </div>
        <div className="w-full px-4">
          <p className="font-bold text-xl">
            Representing feelings of ill-defined discomfort, edginess, inner
            turmoil mounting to either panic, dread or anguish. Rate according
            to intensity, frequency, duration and the extent of reassurance
            called for.
          </p>
          <CustomCheckBoxField
            key={"innerTension"}
            id="innerTension"
            title="Inner Tension"
            checkBoxValues={innerTension}
            setCheckBoxValues={setInnerTension}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 Placid. Only reflecting inner tension',
              '1',
              '2 Occasional feelings of edginess and ill-defined discomfort.',
              '3',
              '4 Continous feelings of inner tension or intermitten panic which the patient can only master with some difficulty.',
              '5',
              '6 Unrelenting dread or anguish. Overwhelming panic.',
            ]}
            required={requiredInnerTension}
          />
        </div>
        <div className="w-full px-4">
          <p className="font-bold text-xl">
            Representing the experience of reduced duration or depth of sleep
            compared to the subject's own normal pattern when well.
          </p>
          <CustomCheckBoxField
            key={"reducedSleep"}
            id="reducedSleep"
            title="Reduced Sleep"
            checkBoxValues={reducedSleep}
            setCheckBoxValues={setReducedSleep}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 Sleeps as usual.',
              '1',
              '2 Slight difficulty dropping off to sleep or slightly reduced light or fitful sleep.',
              '3',
              '4 Sleep reduced or broken by at least two hours.',
              '5',
              '6 Less than two or three hours of sleep.',
            ]}
            required={requiredReducedSleep}
          />
        </div>
        <div className="w-full px-4">
          <p className="font-bold text-xl">
            Representing the feeling of loss of appetite compared with when
            well. Rate by loss of desire for food or the need to force oneself
            to eat.
          </p>
          <CustomCheckBoxField
            key={"reducedAppetite"}
            id="reducedAppetite"
            title="Reduced Appetite"
            checkBoxValues={reducedAppetite}
            setCheckBoxValues={setReducedAppetite}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 Normal or increased appetite.',
              '1',
              '2 Slightly reduced appetite',
              '3',
              '4 No appetite. Food is tasteless',
              '5',
              '6 Needs persuasion to eat.',
            ]}
            required={requiredReducedAppetite}
          />
        </div>
        <div className="w-full px-4">
          <p className="font-bold text-xl">
            Representing difficulties in collecting one's thoughts mounting to
            incapacitating lack of concentration. Rate according to intensity,
            frequency, and degree of incapacity produced.
          </p>
          <CustomCheckBoxField
            key={"concentrationDifficulties"}
            id="concentrationDifficulties"
            title="Concentration Difficulties"
            checkBoxValues={concentrationDifficulties}
            setCheckBoxValues={setConcentrationDifficulties}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 No difficulties in concentrating.',
              '1',
              '2 Occasional difficulties in collecting ones thoughts.',
              '3',
              '4 Difficulties in concentrating and sustaining thought which reduces ability to read or hold a conversation.',
              '5',
              '6 Unable to read or converse without great initiative.',
            ]}
            required={requiredConcentrationDifficulties}
          />
        </div>
        <div className="w-full px-4">
          <p className="font-bold text-xl">
            Representing a difficulty getting started or slowness initiating and
            performing everyday activities.
          </p>
          <CustomCheckBoxField
            key={"lassitude"}
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
            key={"inabilityToFeel"}
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
            key={"pessimisticThoughts"}
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
            key={"suicidalThoughts"}
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

        {validationError && (
          <div className="alert">
            {validationError}
          </div>
        )}

          <MainButton 
            typeOfButton='submit'
            buttonText='Submit'
            buttonWidth='w-[20%]'
            onClick={() => {
              if (name === ""){
                setRequiredName(true)
                alert("Please enter your name.")
              } else if (date === "") {
                setRequiredDate(true)
                alert("Please enter the current date.")
              } else if (apparentSadness.length === 0) {
                setRequiredApparentSadness(true)
                alert("Please enter you score for Apparent Sadness.")
              } else if (reportedSadness.length === 0) {
                setRequiredReportedSadness(true)
                alert("Please enter your score for Reported Sadness.")
              } else if (innerTension.length === 0) {
                setRequiredInnerTension(true)
                alert("Please enter your score for Inner Tension.")
              } else if (reducedSleep.length === 0) {
                setRequiredReducedSleep(true)
                alert("Please enter your score for Reduced Sleep.")
              } else if (reducedAppetite.length === 0) {
                setRequiredReducedAppetite(true)
                alert("Please enter your score for Reduced Appetite.")
              } else if (concentrationDifficulties.length === 0) {
                setRequiredConcentrationDifficulties(true)
                alert("Please enter your score for Concentration Difficulties.")
              } else if (lassitude.length === 0) {
                setRequiredLassitude(true)
                alert("Please enter your score for Lassitude.")
              } else if (inabilityToFeel.length === 0) {
                setRequiredInabilityToFeel(true)
                alert("Please enter your score for Inability to Feel.")
              } else if (pessimisticThoughts.length === 0) {
                setRequiredPessimisticThoughts(true)
                alert("Please enter your score for Pessimistic Thoughts.")
              } else if (suicidalThoughts.length === 0) {
                setRequiredSuicidalThoughts(true)
                alert("Please enter your score for Suicidal Thoughts.")
              } else {
                handleSubmit()
                alert("Thank you! Your submission has been recorded.")
              }
            }}
          />
      </div>
    </div>
  )
}