import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import DateInput from '../components/DateInput'
import TextInput from '../components/TextInput'
import { NextPage } from 'next'
import CustomCheckBoxFeild from '../components/formComponents/CustomCheckBoxFeild'
import CustomYesOrNo from '../components/formComponents/CustomYesOrNo'
import UserCreatedListFromInputBox from '../components/formComponents/UserCreatedListFromInputBox'
import SectionWithTitle from '../components/formComponents/SectionWithTitle'
import MainButton from '../components/MainButton'

const WeightLossSurvey: NextPage<{}> = () => {
  const [date, setDate] = useState('')
  const [patientsName, setPatientsName] = useState('')
  const [whyLossWeight, setWhyLossWeight] = useState('')
  const [weightGoals, setWeightGoals] = useState('')
  const [timeFrame, setTimeFrame] = useState('')
  const [mostWeighedAsAdult, setMostWeighedAsAdult] = useState('')
  const [ageAtAdultWeight, setAgeAtAdultMostWeight] = useState('')
  const [leastWeighedAsAdult, setLeastWeighedAsAdult] = useState('')
  const [ageAtAdultLeastWeight, setAgeAtAdultLeastWeight] = useState('')
  const [weightChangeDuringLife, setWeightChangeDuringLife] = useState('')
  const [weightGainedInPast, setWeightGainedInPast] = useState('')
  const [challengesOfWeightManagement, setChallengesOfWeightManagement] =
    useState('')
  const [hopesForWeightLossManagement, setHopesForWeightLossManagement] =
    useState('')
  const [commitmentsToWeightLoss, setCommitmentsToWeightLoss] = useState('')
  const [onYourOwn, setOnYourOwn] = useState('')
  const [checkIfTried, setCheckIfTried] = useState([])
  const [onYourOwnStartDate, setOnYourOwnStartDate] = useState('')
  const [onYourOwnEndDate, setOnYourOwnEndDate] = useState('')
  const [onYourOwnWeightLoss, setOnYourOwnWeightLoss] = useState('')
  const [onYourOwnReasonForStopping, setOnYourOwnReasonForStopping] =
    useState('')
  const [onYourOwnReasonForRegain, setOnYourOwnReasonForRegain] = useState('')
  const [atkinsOrLowCarbohydrate, setAtkinsOrLowCarbohydrate] = useState('')
  const [
    atkinsOrLowCarbohydrateStartDate,
    setAtkinsOrLowCarbohydrateStartDate,
  ] = useState('')
  const [atkinsOrLowCarbohydrateEndDate, setAtkinsOrLowCarbohydrateEndDate] =
    useState('')
  const [
    atkinsOrLowCarbohydrateWeightLoss,
    setAtkinsOrLowCarbohydrateWeightLoss,
  ] = useState('')
  const [
    atkinsOrLowCarbohydrateReasonForStopping,
    setAtkinsOrLowCarbohydrateReasonForStopping,
  ] = useState('')
  const [
    atkinsOrLowCarbohydrateReasonForRegain,
    setAtkinsOrLowCarbohydrateReasonForRegain,
  ] = useState('')
  const [jennyCraig, setJennyCraig] = useState('')
  const [jennyCraigStartDate, setJennyCraigStartDate] = useState('')
  const [jennyCraigEndDate, setJennyCraigEndDate] = useState('')
  const [jennyCraigWeightLoss, setJennyCraigWeightLoss] = useState('')
  const [jennyCraigReasonForStopping, setJennyCraigReasonForStopping] =
    useState('')
  const [jennyCraigReasonForRegain, setJennyCraigReasonForRegain] = useState('')
  const [nutrisystem, setNutrisystem] = useState('')
  const [nutrisystemStartDate, setNutrisystemStartDate] = useState('')
  const [nutrisystemEndDate, setNutrisystemEndDate] = useState('')
  const [nutrisystemWeightLoss, setNutrisystemWeightLoss] = useState('')
  const [nutrisystemReasonForStopping, setNutrisystemReasonForStopping] =
    useState('')
  const [nutrisystemReasonForRegain, setNutrisystemReasonForRegain] =
    useState('')
  const [weightWatchers, setWeightWatchers] = useState('')
  const [weightWatchersStartDate, setWeightWatchersStartDate] = useState('')
  const [weightWatchersEndDate, setWeightWatchersEndDate] = useState('')
  const [weightWatchersWeightLoss, setWeightWatchersWeightLoss] = useState('')
  const [weightWatchersReasonForStopping, setWeightWatchersReasonForStopping] =
    useState('')
  const [weightWatchersReasonForRegain, setWeightWatchersReasonForRegain] =
    useState('')
  const [slimfast, setSlimfast] = useState('')
  const [slimfastStartDate, setSlimfastStartDate] = useState('')
  const [slimfastEndDate, setSlimfastEndDate] = useState('')
  const [slimfastWeightLoss, setSlimfastWeightLoss] = useState('')
  const [slimfastReasonForStopping, setSlimfastReasonForStopping] = useState('')
  const [slimfastReasonForRegain, setSlimfastReasonForRegain] = useState('')
  const [optifast, setOptifast] = useState('')
  const [optifastStartDate, setOptifastStartDate] = useState('')
  const [optifastEndDate, setOptifastEndDate] = useState('')
  const [optifastWeightLoss, setOptifastWeightLoss] = useState('')
  const [optifastReasonForStopping, setOptifastReasonForStopping] = useState('')
  const [optifastReasonForRegain, setOptifastReasonForRegain] = useState('')
  const [otherLiquidDiet, setOtherLiquidDiet] = useState('')
  const [otherLiquidDietStartDate, setOtherLiquidDietStartDate] = useState('')
  const [otherLiquidDietEndDate, setOtherLiquidDietEndDate] = useState('')
  const [otherLiquidDietWeightLoss, setOtherLiquidDietWeightLoss] = useState('')
  const [
    otherLiquidDietReasonForStopping,
    setOtherLiquidDietReasonForStopping,
  ] = useState('')
  const [otherLiquidDietReasonForRegain, setOtherLiquidDietReasonForRegain] =
    useState('')
  const [other, setOther] = useState('')
  const [otherName, setOtherName] = useState('')
  const [otherStartDate, setOtherStartDate] = useState('')
  const [otherEndDate, setOtherEndDate] = useState('')
  const [otherWeightLoss, setOtherWeightLoss] = useState('')
  const [otherReasonForStopping, setOtherReasonForStopping] = useState('')
  const [otherReasonForRegain, setOtherReasonForRegain] = useState('')
  const [adipex, setAdipex] = useState('')
  const [adipexStartDate, setAdipexStartDate] = useState('')
  const [adipexEndDate, setAdipexEndDate] = useState('')
  const [adipexWeightLoss, setAdipexWeightLoss] = useState('')
  const [adipexReasonForStopping, setAdipexReasonForStopping] = useState('')
  const [adipexReasonForRegain, setAdipexReasonForRegain] = useState('')
  const [alli, setAlli] = useState('')
  const [alliStartDate, setAlliStartDate] = useState('')
  const [alliEndDate, setAlliEndDate] = useState('')
  const [alliWeightLoss, setAlliWeightLoss] = useState('')
  const [alliReasonForStopping, setAlliReasonForStopping] = useState('')
  const [alliReasonForRegain, setAlliReasonForRegain] = useState('')
  const [belviq, setBelviq] = useState('')
  const [belviqStartDate, setBelviqStartDate] = useState('')
  const [belviqEndDate, setBelviqEndDate] = useState('')
  const [belviqWeightLoss, setBelviqWeightLoss] = useState('')
  const [belviqReasonForStopping, setBelviqReasonForStopping] = useState('')
  const [belviqReasonForRegain, setBelviqReasonForRegain] = useState('')
  const [dexatrim, setDexatrim] = useState('')
  const [dexatrimStartDate, setDexatrimStartDate] = useState('')
  const [dexatrimEndDate, setDexatrimEndDate] = useState('')
  const [dexatrimWeightLoss, setDexatrimWeightLoss] = useState('')
  const [dexatrimReasonForStopping, setDexatrimReasonForStopping] = useState('')
  const [dexatrimReasonForRegain, setDexatrimReasonForRegain] = useState('')
  const [herbalWeightLoss, setHerbalWeightLoss] = useState('')
  const [herbalWeightLossStartDate, setHerbalWeightLossStartDate] = useState('')
  const [herbalWeightLossEndDate, setHerbalWeightLossEndDate] = useState('')
  const [herbalWeightLossWeightLoss, setHerbalWeightLossWeightLoss] =
    useState('')
  const [
    herbalWeightLossReasonForStopping,
    setHerbalWeightLossReasonForStopping,
  ] = useState('')
  const [herbalWeightLossReasonForRegain, setHerbalWeightLossReasonForRegain] =
    useState('')
  const [meridia, setMeridia] = useState('')
  const [meridiaStartDate, setMeridiaStartDate] = useState('')
  const [meridiaEndDate, setMeridiaEndDate] = useState('')
  const [meridiaWeightLoss, setMeridiaWeightLoss] = useState('')
  const [meridiaReasonForStopping, setMeridiaReasonForStopping] = useState('')
  const [meridiaReasonForRegain, setMeridiaReasonForRegain] = useState('')
  const [phenfen, setPhenfen] = useState('')
  const [phenfenStartDate, setPhenfenStartDate] = useState('')
  const [phenfenEndDate, setPhenfenEndDate] = useState('')
  const [phenfenWeightLoss, setPhenfenWeightLoss] = useState('')
  const [phenfenReasonForStopping, setPhenfenReasonForStopping] = useState('')
  const [phenfenReasonForRegain, setPhenfenReasonForRegain] = useState('')
  const [qsymia, setQsymia] = useState('')
  const [qsymiaStartDate, setQsymiaStartDate] = useState('')
  const [qsymiaEndDate, setQsymiaEndDate] = useState('')
  const [qsymiaWeightLoss, setQsymiaWeightLoss] = useState('')
  const [qsymiaReasonForStopping, setQsymiaReasonForStopping] = useState('')
  const [qsymiaReasonForRegain, setQsymiaReasonForRegain] = useState('')
  const [redux, setRedux] = useState('')
  const [reduxStartDate, setReduxStartDate] = useState('')
  const [reduxEndDate, setReduxEndDate] = useState('')
  const [reduxWeightLoss, setReduxWeightLoss] = useState('')
  const [reduxReasonForStopping, setReduxReasonForStopping] = useState('')
  const [reduxReasonForRegain, setReduxReasonForRegain] = useState('')
  const [otherSupplements, setOtherSupplements] = useState('')
  const [otherSupplementsName, setOtherSupplementsName] = useState('')
  const [otherSupplementsStartDate, setOtherSupplementsStartDate] = useState('')
  const [otherSupplementsEndDate, setOtherSupplementsEndDate] = useState('')
  const [otherSupplementsWeightLoss, setOtherSupplementsWeightLoss] =
    useState('')
  const [
    otherSupplementsReasonForStopping,
    setOtherSupplementsReasonForStopping,
  ] = useState('')
  const [otherSupplementsReasonForRegain, setOtherSupplementsReasonForRegain] =
    useState('')
  const [childrenUnderEighteen, setChildrenUnderEighteen] = useState('')
  const [childrenUnderEighteenCheckBox, setChildrenUnderEighteenCheckBox] =
    useState('')
  const [familyMemebersObese, setFamilyMemebersObese] = useState('')
  const [support, setSupport] = useState('')
  const [supportExplaination, setSupportExplaination] = useState('')
  const [eatingDisorder, setEatingDisorder] = useState('')
  const [anorexiaNervosa, setAnorexiaNervosa] = useState('')
  const [bingeEating, setBingeEating] = useState('')
  const [bulimia, setBulimia] = useState('')
  const [eatingTooMuch, setEatingTooMuch] = useState('')
  const [sleepHours, setSleepHours] = useState('')
  const [restedWhenWakeUp, setRestedWhenWakeUp] = useState('')
  const [doYouSnore, setDoYouSnore] = useState('')
  const [wearEquipment, setWearEquipment] = useState('')
  const [howManyNights, setHowManyNights] = useState('')
  const [sleepWellness, setSleepWellness] = useState('')
  const [sittingAndReading, setSittingAndReading] = useState('')
  const [watchingTv, setWatchingTv] = useState('')
  const [sittingInPublic, setSittingInPublic] = useState('')
  const [carPassanger, setCarPassanger] = useState('')
  const [lyingDown, setLyingDown] = useState('')
  const [talkingToSomeone, setTalkingToSomeone] = useState('')
  const [sittingQuietlyAfterLunch, setSittingQuietlyAfterLunch] = useState('')
  const [inCarWhileStopped, setInCarWhileStopped] = useState('')
  const [total, setTotal] = useState('')
  const [typicalDay, setTypicalDay] = useState('')
  const [enjoyExercise, setEnjoyExercise] = useState('')
  const [gymMembership, setGymMembership] = useState('')
  const [exerciseEquipment, setExerciseEquipment] = useState('')
  const [exerciseRegularly, setExerciseRegularly] = useState('')
  const [badExerciseExperience, setBadExerciseExperience] = useState('')
  const [encourageExercise, setEncourageExercise] = useState('')
  const [sixAm, setSixAm] = useState('')
  const [nineAm, setNineAm] = useState('')
  const [twelvePm, setTwelvePm] = useState('')
  const [threePm, setThreePm] = useState('')
  const [sixPm, setSixPm] = useState('')
  const [ninePm, setNinePm] = useState('')
  const [exerciseWeekly, setExerciseWeekly] = useState('')
  const [describeExercise, setDescribeExercise] = useState('')
  const [difficultyGettingUpFromFloor, setDifficultyGettingUpFromFloor] =
    useState('')
  const [typeOfExercise, setTypeOfExercise] = useState('')
  const [exercisePreference, setExercisePreference] = useState('')
  const [athleteInSchool, setAthleteInSchool] = useState('')
  const [confidentIncrease, setConfidentIncrease] = useState('')
  const [majorBenefitsOfExercise, setMajorBenefitsOfExercise] = useState('')
  const [exerciseBarriers, setExerciseBarriers] = useState('')
  const [minutesPerDay, setMinutesPerDay] = useState('')
  const [daysPerWeek, setDaysPerWeek] = useState('')
  const [confidenceWeightLossDiet, setConfidenceWeightLossDiet] = useState('')
  const [majorBarriersDiet, setMajorBarriersDiet] = useState('')
  const [favoriteFoods, setFavoriteFoods] = useState('')
  const [breakfastTypeOfFood, setBreakfastTypeOfFood] = useState('')
  const [breakfastProteinOrCarbs, setBreakfastProteinOrCarbs] = useState('')
  const [breakfastCalories, setBreakfastCalories] = useState('')
  const [lunchTypeOfFood, setLunchTypeOfFood] = useState('')
  const [lunchProteinOrCarbs, setLunchProteinOrCarbs] = useState('')
  const [lunchCalories, setLunchCalories] = useState('')
  const [dinnerTypeOfFood, setDinnerTypeOfFood] = useState('')
  const [dinnerProteinOrCarbs, setDinnerProteinOrCarbs] = useState('')
  const [dinnerCalories, setDinnerCalories] = useState('')
  const [snackOneTypeOfFood, setSnackOneTypeOfFood] = useState('')
  const [snackOneProteinOrCarbs, setSnackOneProteinOrCarbs] = useState('')
  const [snackOneCalories, setSnackOneCalories] = useState('')
  const [snackTwoTypeOfFood, setSnackTwoTypeOfFood] = useState('')
  const [snackTwoProteinOrCarbs, setSnackTwoProteinOrCarbs] = useState('')
  const [snackTwoCalories, setSnackTwoCalories] = useState('')
  const [coffeeTypeOfFood, setCoffeeTypeOfFood] = useState('')
  const [coffeeProteinOrCarbs, setCoffeeProteinOrCarbs] = useState('')
  const [coffeeCalories, setCoffeeCalories] = useState('')
  const [sodaTypeOfFood, setSodaTypeOfFood] = useState('')
  const [sodaProteinOrCarbs, setSodaProteinOrCarbs] = useState('')
  const [sodaCalories, setSodaCalories] = useState('')
  const [candyOrSweetsTypeOfFood, setCandyOrSweetsTypeOfFood] = useState('')
  const [candyOrSweetsProteinOrCarbs, setCandyOrSweetsProteinOrCarbs] =
    useState('')
  const [candyOrSweetsCalories, setCandyOrSweetsCalories] = useState('')
  const [otherTypeOfFood, setOtherTypeOfFood] = useState('')
  const [otherProteinOrCarbs, setOtherProteinOrCarbs] = useState('')
  const [otherCalories, setOtherCalories] = useState('')
  const [numPeopleLiveWith, setNumPeopleLiveWith] = useState('')
  const [eatTogether, setEatTogether] = useState('')
  const [whoDoesShopping, setWhoDoesShopping] = useState('')
  const [whoDoesCooking, setWhoDoesCooking] = useState('')
  const [foodIntolerance, setFoodIntolerance] = useState('')
  const [foodIntoleranceList, setFoodIntoleranceList] = useState('')
  const [stressEating, setStressEating] = useState('')
  const [stressEatingList, setStressEatingList] = useState([])
  const [bingeEatingExperience, setBingeEatingExperience] = useState('')
  const [bingeEatingList, setBingeEatingList] = useState([])
  const [snackingExperience, setSnackingExperience] = useState('')
  const [snackingList, setSnackingList] = useState([])
  const [eatingMiddleOfNightExperience, setEatingMiddleOfNightExperience] =
    useState('')
  const [eatingMiddleOfNightList, setEatingMiddleOfNightList] = useState([])
  const [skippingMealsExperience, setSkippingMealsExperience] = useState('')
  const [skippingMealsList, setSkippingMealsList] = useState([])
  const [eatingOutExperience, setEatingOutExperience] = useState('')
  const [eatingOutList, setEatingOutList] = useState([])
  const [eatingInFrontOfTVExperience, setEatingInFrontOfTVExperience] =
    useState('')
  const [eatingInFrontOfTVList, setEatingInFrontOfTVList] = useState([])
  const [eatingAtDeskExperience, setEatingAtDeskExperience] = useState('')
  const [eatingAtDeskList, setEatingAtDeskList] = useState([])
  const [portionSizeExperience, setPortionSizeExperience] = useState('')
  const [portionSizeList, setPortionSizeList] = useState([])
  const [eatingTooFastExperience, setEatingTooFastExperience] = useState('')
  const [eatingTooFastList, setEatingTooFastList] = useState([])
  const [notSatifiedExperience, setNotSatifiedExperience] = useState('')
  const [notSatifiedList, setNotSatifiedList] = useState([])
  const [regularSoda, setRegularSoda] = useState('')
  const [regularSodaList, setRegularSodaList] = useState([])
  const [juice, setJuice] = useState('')
  const [juiceList, setJuiceList] = useState([])
  const [sweetTea, setSweetTea] = useState('')
  const [sweetTeaList, setSweetTeaList] = useState([])
  const [alchoholBeverages, setAlchoholBeverages] = useState('')
  const [alchoholBeveragesList, setAlchoholBeveragesList] = useState([])
  const [friedFoods, setFriedFoods] = useState('')
  const [friedFoodsList, setFriedFoodsList] = useState([])
  const [fruitServings, setFruitServings] = useState('')
  const [vegetableServings, setVegetableServings] = useState('')
  const [wholeGrainServings, setWholeGrainServings] = useState('')
  const [lowFatDairyServings, setLowFatDairyServings] = useState('')
  const [leanProteinServings, setLeanProteinServings] = useState('')
  const [daysPerWeekExplination, setDaysPerWeekExplination] = useState('')
  const [medicalHistory, setMedicalHistory] = useState('')
  const [medicationsTaken, setMedicationsTaken] = useState('')
  const [medicationsTakenList, setMedicationsTakenList] = useState([])

  return (
    <div>
      <Header selectCompany={'AMA'} routePatientsHome={true} />
      <div className="align-center m-5 flex justify-center">
        <DateInput
          placeHolder="Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDate(text.target.value)
          }}
        />
        <TextInput
          id="patientsName"
          placeHolder="Patients Name"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setPatientsName(text.target.value)
          }}
        />
      </div>
      <h1 className="m-3 text-center text-lg font-bold">
        Please answer the following questionnaire as complete as possible.
      </h1>
      <div className="mb-10">
        <TextInput
          id="whyLossWeight"
          placeHolder="Why do you want to lose weight?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setWhyLossWeight(text.target.value)
          }}
        />
      </div>
      <div className="mb-10">
        <TextInput
          id="weightGoals"
          placeHolder="What are your weight goals?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setWeightGoals(text.target.value)
          }}
        />
      </div>
      <div className="mb-10">
        <TextInput
          id="timeFrame"
          placeHolder="What is your time frame to change your habits to reach this weight loss goal?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setTimeFrame(text.target.value)
          }}
        />
      </div>
      <div className="flex">
        <TextInput
          id="mostWieghedAsAdult"
          placeHolder="What is the most you have weighed as an adult?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setMostWeighedAsAdult(text.target.value)
          }}
        />
        <TextInput
          id="ageAtWeight"
          placeHolder="Age at this weight?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAgeAtAdultMostWeight(text.target.value)
          }}
        />
      </div>
      <div className="flex">
        <TextInput
          id="leastWieghedAsAdult"
          placeHolder="What is the least you have weighed as an adult?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setLeastWeighedAsAdult(text.target.value)
          }}
        />
        <TextInput
          id="ageAtWeight"
          placeHolder="Age at this weight?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAgeAtAdultLeastWeight(text.target.value)
          }}
        />
      </div>
      <div className="align-center flex justify-center text-lg">
        <CustomCheckBoxFeild
          id="howHasWeightChangedDuringLife"
          title="How has your weight changed during your life? (Check all that apply)"
          checkBoxValues={weightChangeDuringLife}
          setCheckBoxValues={setWeightChangeDuringLife}
          allowMultipleCheckBoxes={true}
          checkBoxTitles={[
            'Gradual increase with a small amount each year',
            'One or more rapid increase(s) in weight',
            'Up and down',
          ]}
        />
      </div>
      <div className="align-center flex justify-center text-lg">
        <CustomCheckBoxFeild
          id="causeOfWeightGainInPast"
          title="What has caused you to gain weight in the past? (Mark all that apply)"
          checkBoxValues={weightGainedInPast}
          setCheckBoxValues={setWeightGainedInPast}
          allowMultipleCheckBoxes={true}
          checkBoxTitles={[
            'Death of Family/Friend',
            'Illness of Family/Friend',
            'Illness',
            'Injury',
            'Quitting Smoking',
            'Menopause',
            'Medications',
            'Stress',
            'Other',
          ]}
        />
      </div>
      <div>
        <TextInput
          id="challengesOfWeightManagement"
          placeHolder="What challenges have you had in the past with weight management?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setChallengesOfWeightManagement(text.target.value)
          }}
        />
      </div>
      <div className="align-center flex justify-center text-lg">
        <CustomCheckBoxFeild
          id="hopesForWeightLossManagement"
          title="What are you hoping that weight loss management can do for you? (Mark all that apply)"
          checkBoxValues={hopesForWeightLossManagement}
          setCheckBoxValues={setHopesForWeightLossManagement}
          allowMultipleCheckBoxes={true}
          checkBoxTitles={[
            'Improve health/Feel better',
            'Increase energy/Allow me to do more daily activities',
            'Lose weight',
            'Prevent medical problems',
            'Reverse medical problems/Allow me to stop medications',
            'Other',
          ]}
        />
      </div>
      <div>
        <TextInput
          id="commitmentsToWeightLoss"
          placeHolder="What commitments are you willing to make for your weight management success?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setCommitmentsToWeightLoss(text.target.value)
          }}
        />
      </div>
      <h2 className="text-md m-10 text-center font-bold">
        Please indicate on the list below which of the following diet, diet
        aids, or programs you have tried in the past. For those you have tried,
        please enter the date started, date stopped, amount of weight loss,
        reason for stopping the diet, diet aid, or program, and reason for
        weight regain after stopping.
      </h2>
      <p className="text-center text-xl font-bold">On Your Own</p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="onYourOwn"
          text="Check if Tried"
          CheckState={setOnYourOwn}
          isChecked={onYourOwn}
        />
      </div>
      <div className="flex">
        <DateInput
          id="onYourOwnStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOnYourOwnStartDate(text.target.value)
          }}
        />
        <DateInput
          id="onYourOwnEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOnYourOwnEndDate(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="onYourOwnWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOnYourOwnWeightLoss(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="onYourOwnReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOnYourOwnReasonForStopping(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="onYourOwnReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOnYourOwnReasonForRegain(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">
        Atkins or low carbohydrate
      </p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="atkinsOrLowCarbohydrate"
          text="Check if Tried"
          CheckState={setAtkinsOrLowCarbohydrate}
          isChecked={atkinsOrLowCarbohydrate}
        />
      </div>
      <div className="flex">
        <DateInput
          id="atkinsOrLowCarbohydrateStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAtkinsOrLowCarbohydrateStartDate(text.target.value)
          }}
        />
        <DateInput
          id="atkinsOrLowCarbohydrateEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAtkinsOrLowCarbohydrateEndDate(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="atkinsOrLowCarbohydrateWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAtkinsOrLowCarbohydrateWeightLoss(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="atkinsOrLowCarbohydrateReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAtkinsOrLowCarbohydrateReasonForStopping(text.target.value)
          }}
        />
        <TextInput
          id="atkinsOrLowCarbohydrateReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAtkinsOrLowCarbohydrateReasonForRegain(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">Jenny Craig</p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="jennyCraig"
          text="Check if Tried"
          CheckState={setJennyCraig}
          isChecked={jennyCraig}
        />
      </div>
      <div className="flex">
        <DateInput
          id="jennyCraigStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setJennyCraigStartDate(text.target.value)
          }}
        />
        <DateInput
          id="jennyCraigEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setJennyCraigEndDate(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="jennyCraigWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setJennyCraigWeightLoss(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="jennyCraigReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setJennyCraigReasonForStopping(text.target.value)
          }}
        />
        <TextInput
          id="jennyCraigReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setJennyCraigReasonForRegain(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">Nutrisystem</p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="nutrisystem"
          text="Check if Tried"
          CheckState={setNutrisystem}
          isChecked={nutrisystem}
        />
      </div>
      <div className="flex">
        <DateInput
          id="nutrisystemStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setNutrisystemStartDate(text.target.value)
          }}
        />
        <DateInput
          id="nutrisystemEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setNutrisystemEndDate(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="nutrisystemWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setNutrisystemWeightLoss(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="nutrisystemReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setNutrisystemReasonForStopping(text.target.value)
          }}
        />
        <TextInput
          id="nutrisystemReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setNutrisystemReasonForRegain(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">Weight Watchers</p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="weightWatchers"
          text="Check if Tried"
          CheckState={setWeightWatchers}
          isChecked={weightWatchers}
        />
      </div>
      <div className="flex">
        <DateInput
          id="weightWatchersStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setWeightWatchersStartDate(text.target.value)
          }}
        />
        <DateInput
          id="weightWatchersEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setWeightWatchersEndDate(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="weightWatchersWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setWeightWatchersWeightLoss(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="weightWatchersReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setWeightWatchersReasonForStopping(text.target.value)
          }}
        />
        <TextInput
          id="weightWatchersReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setWeightWatchersReasonForRegain(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">Slimfast</p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="slimfast"
          text="Check if Tried"
          CheckState={setSlimfast}
          isChecked={slimfast}
        />
      </div>
      <div className="flex">
        <DateInput
          id="slimfastStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSlimfastStartDate(text.target.value)
          }}
        />
        <DateInput
          id="slimfastEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSlimfastEndDate(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="slimfastWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSlimfastWeightLoss(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="slimfastReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSlimfastReasonForStopping(text.target.value)
          }}
        />
        <TextInput
          id="slimfastReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSlimfastReasonForRegain(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">Optifast</p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="optifast"
          text="Check if Tried"
          CheckState={setOptifast}
          isChecked={optifast}
        />
      </div>
      <div className="flex">
        <DateInput
          id="optifastStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOptifastStartDate(text.target.value)
          }}
        />
        <DateInput
          id="optifastEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOptifastEndDate(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="optifastWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOptifastWeightLoss(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="optifastReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOptifastReasonForStopping(text.target.value)
          }}
        />
        <TextInput
          id="optifastReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOptifastReasonForRegain(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">Other liquid diet</p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="otherLiquidDiet"
          text="Check if Tried"
          CheckState={setOtherLiquidDiet}
          isChecked={otherLiquidDiet}
        />
      </div>
      <div className="flex">
        <DateInput
          id="otherLiquidDietStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherLiquidDietStartDate(text.target.value)
          }}
        />
        <DateInput
          id="otherLiquidDietEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherLiquidDietEndDate(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="otherLiquidDietWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherLiquidDietWeightLoss(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="otherLiquidDietReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherLiquidDietReasonForStopping(text.target.value)
          }}
        />
        <TextInput
          id="otherLiquidDietReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherLiquidDietReasonForRegain(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">
        Other (please specify)
      </p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="other"
          text="Check if Tried"
          CheckState={setOther}
          isChecked={other}
        />
      </div>
      <div>
        <TextInput
          id="otherName"
          placeHolder="Name of Diet"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherName(text.target.value)
          }}
        />
      </div>
      <div className="flex">
        <DateInput
          id="otherStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherStartDate(text.target.value)
          }}
        />
        <DateInput
          id="otherEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherEndDate(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="otherWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherWeightLoss(text.target.value)
          }}
        />
      </div>
      <div className="mb-10">
        <TextInput
          id="otherReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherReasonForStopping(text.target.value)
          }}
        />
        <TextInput
          id="otherReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherReasonForRegain(text.target.value)
          }}
        />
      </div>
      <div className="bg-[#e8e8e8] p-3 shadow-md"></div>
      <p className="mt-10 text-center text-xl font-bold">
        Adipex®, Fastin® (Phentermine)
      </p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="adipex"
          text="Check if Tried"
          CheckState={setAdipex}
          isChecked={adipex}
        />
      </div>
      <div className="flex">
        <DateInput
          id="adipexStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAdipexStartDate(text.target.value)
          }}
        />
        <DateInput
          id="adipexEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAdipexEndDate(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="adipexWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAdipexWeightLoss(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="adipexReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAdipexReasonForStopping(text.target.value)
          }}
        />
        <TextInput
          id="adipexReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAdipexReasonForRegain(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">
        Alli®, Xenical® (Orlistat)
      </p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="alli"
          text="Check if Tried"
          CheckState={setAlli}
          isChecked={alli}
        />
      </div>
      <div className="flex">
        <DateInput
          id="alliStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAlliStartDate(text.target.value)
          }}
        />
        <DateInput
          id="alliEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAlliEndDate(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="alliWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAlliWeightLoss(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="alliReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAlliReasonForStopping(text.target.value)
          }}
        />
        <TextInput
          id="alliReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setAlliReasonForRegain(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">Belviq® (Locaserin)</p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="belviq"
          text="Check if Tried"
          CheckState={setBelviq}
          isChecked={belviq}
        />
      </div>
      <div className="flex">
        <DateInput
          id="belviqStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setBelviqStartDate(text.target.value)
          }}
        />
        <DateInput
          id="belviqEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setBelviqEndDate(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="belviqWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setBelviqWeightLoss(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="belviqReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setBelviqReasonForStopping(text.target.value)
          }}
        />
        <TextInput
          id="belviqReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setBelviqReasonForRegain(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">Dexatrim®</p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="dexatrim"
          text="Check if Tried"
          CheckState={setDexatrim}
          isChecked={dexatrim}
        />
      </div>
      <div className="flex">
        <DateInput
          id="dexatrimStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDexatrimStartDate(text.target.value)
          }}
        />
        <DateInput
          id="dexatrimEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDexatrimEndDate(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="dexatrimWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDexatrimWeightLoss(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="dexatrimReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDexatrimReasonForStopping(text.target.value)
          }}
        />
        <TextInput
          id="dexatrimReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDexatrimReasonForRegain(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">
        Herbal weight loss products
      </p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="herbalWeightLoss"
          text="Check if Tried"
          CheckState={setHerbalWeightLoss}
          isChecked={herbalWeightLoss}
        />
      </div>
      <div className="flex">
        <DateInput
          id="herbalWeightLossStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setHerbalWeightLossStartDate(text.target.value)
          }}
        />
        <DateInput
          id="herbalWeightLossEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setHerbalWeightLossEndDate(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="herbalWeightLossWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setHerbalWeightLossWeightLoss(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="herbalWeightLossReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setHerbalWeightLossReasonForStopping(text.target.value)
          }}
        />
        <TextInput
          id="herbalWeightLossReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setHerbalWeightLossReasonForRegain(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">
        Meredia® (Sibutramine)
      </p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="meridia"
          text="Check if Tried"
          CheckState={setMeridia}
          isChecked={meridia}
        />
      </div>
      <div className="flex">
        <DateInput
          id="meridiaStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setMeridiaStartDate(text.target.value)
          }}
        />
        <DateInput
          id="meridiaEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setMeridiaEndDate(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="meridiaWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setMeridiaWeightLoss(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="meridiaReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setMeridiaReasonForStopping(text.target.value)
          }}
        />
        <TextInput
          id="meridiaReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setMeridiaReasonForRegain(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">Phen-fen</p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="phenfen"
          text="Check if Tried"
          CheckState={setPhenfen}
          isChecked={phenfen}
        />
      </div>
      <div className="flex">
        <DateInput
          id="phenfenStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setPhenfenStartDate(text.target.value)
          }}
        />
        <DateInput
          id="phenfenEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setPhenfenEndDate(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="phenfenWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setPhenfenWeightLoss(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="phenfenReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setPhenfenReasonForStopping(text.target.value)
          }}
        />
        <TextInput
          id="phenfenReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setPhenfenReasonForRegain(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">Qsymia®</p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="qsymia"
          text="Check if Tried"
          CheckState={setQsymia}
          isChecked={qsymia}
        />
      </div>
      <div className="flex">
        <DateInput
          id="qsymiaStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setQsymiaStartDate(text.target.value)
          }}
        />
        <DateInput
          id="qsymiaEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setQsymiaEndDate(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="qsymiaWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setQsymiaWeightLoss(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="qsymiaReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setQsymiaReasonForStopping(text.target.value)
          }}
        />
        <TextInput
          id="qsymiaReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setQsymiaReasonForRegain(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">Redux®</p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="redux"
          text="Check if Tried"
          CheckState={setRedux}
          isChecked={redux}
        />
      </div>
      <div className="flex">
        <DateInput
          id="reduxStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setReduxStartDate(text.target.value)
          }}
        />
        <DateInput
          id="reduxEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setReduxEndDate(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="reduxWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setReduxWeightLoss(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="reduxReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setReduxReasonForStopping(text.target.value)
          }}
        />
        <TextInput
          id="reduxReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setReduxReasonForRegain(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-xl font-bold">
        Other (please specify)
      </p>
      <div className="align-center flex justify-center">
        <CustomYesOrNo
          id="other"
          text="Check if Tried"
          CheckState={setOtherSupplements}
          isChecked={otherSupplements}
        />
      </div>
      <div>
        <TextInput
          id="otherSupplements"
          placeHolder="Other Supplements"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherSupplementsName(text.target.value)
          }}
        />
      </div>
      <div className="flex">
        <DateInput
          id="otherSupplementsStartDate"
          placeHolder="Start Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherSupplementsStartDate(text.target.value)
          }}
        />
        <DateInput
          id="otherSupplementsEndDate"
          placeHolder="End Date"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherSupplementsEndDate(text.target.value)
          }}
        />
      </div>
      <div>
        <TextInput
          id="otherSupplementsWeightLoss"
          placeHolder="Amount of Weight Lost"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherSupplementsWeightLoss(text.target.value)
          }}
        />
      </div>
      <div className=" mb-10">
        <TextInput
          id="otherSupplementsReasonForStopping"
          placeHolder="Reason for Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherSupplementsReasonForStopping(text.target.value)
          }}
        />
        <TextInput
          id="otherSupplementsReasonForRegain"
          placeHolder="Reason Weight Regained After Stopping"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherSupplementsReasonForRegain(text.target.value)
          }}
        />
      </div>
      <div className="bg-[#e8e8e8] p-3 shadow-md"></div>
      <div className="mt-10">
        <TextInput
          id="childrenUnderEighteen"
          placeHolder="How many children under age 18 live with you?"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setChildrenUnderEighteen(text.target.value)
          }}
        />
      </div>
      <div className="align-center flex justify-center text-lg">
        <CustomCheckBoxFeild
          id="childrenUnderEighteenCheckBox"
          title="Select"
          checkBoxValues={childrenUnderEighteenCheckBox}
          setCheckBoxValues={setChildrenUnderEighteenCheckBox}
          allowMultipleCheckBoxes={true}
          checkBoxTitles={['Child(ren)', 'Grandchild(ren)', 'Other']}
        />
      </div>
      <div className="align-center flex justify-center text-lg">
        <CustomCheckBoxFeild
          id="familyMemebersObese"
          title="Please check if any family members are (or were) overweight or obese: (Mark all that apply)"
          checkBoxValues={familyMemebersObese}
          setCheckBoxValues={setFamilyMemebersObese}
          allowMultipleCheckBoxes={true}
          checkBoxTitles={[
            'Spouse',
            'Son',
            'Daughter',
            'Mother',
            'Father',
            'Sister',
            'Brother',
            'Grandparent',
            'Other',
          ]}
        />
      </div>
      <div className="align-center flex justify-center text-lg">
        <CustomCheckBoxFeild
          id="support"
          title="Will your family/friends support you in your weight loss?"
          checkBoxValues={support}
          setCheckBoxValues={setSupport}
          allowMultipleCheckBoxes={false}
          checkBoxTitles={['Yes', 'No', 'Maybe']}
        />
      </div>
      <div>
        <TextInput
          id="supportExplaination"
          placeHolder="Explain"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSupportExplaination(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-lg font-bold">
        Please indicate if you have a history of any of the following:
      </p>
      <div className="flex flex-col justify-center text-lg md:flex-row">
        <div className="m-5">
          <CustomYesOrNo
            id="eatingDisorder"
            text="Eating Disorder"
            CheckState={setEatingDisorder}
            isChecked={eatingDisorder}
          />
        </div>
        <div className="m-5">
          <CustomYesOrNo
            id="anorexiaNervosa"
            text="Anorexia Nervosa"
            CheckState={setAnorexiaNervosa}
            isChecked={anorexiaNervosa}
          />
        </div>
        <div className="m-5">
          <CustomYesOrNo
            id="bingeEating"
            text="Binge Eating"
            CheckState={setBingeEating}
            isChecked={bingeEating}
          />
        </div>
        <div className="m-5">
          <CustomYesOrNo
            id="bulimia"
            text="Making yourself throw up/Bulimia"
            CheckState={setBulimia}
            isChecked={bulimia}
          />
        </div>
      </div>
      <div className="mt-5 flex justify-center text-lg">
        <CustomYesOrNo
          id="EatingTooMuch"
          text="Eating so much at one time that you have to throw up"
          CheckState={setEatingTooMuch}
          isChecked={eatingTooMuch}
        />
      </div>
      <div className="mt-10 mb-10 bg-[#e8e8e8] p-3 shadow-md"></div>
      <p className="text-center text-lg font-bold">
        Please answer the following Sleep/Restfulness questions
      </p>
      <div>
        <TextInput
          id="sleepHours"
          placeHolder="On average over the past month, how many hours of sleep did you get per night?"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSleepHours(text.target.value)
          }}
        />
      </div>
      <div className="flex justify-center text-lg">
        <div className="m-5 w-[25%]">
          <CustomYesOrNo
            id="restedWhenWakeUp"
            text="Do you feel rested when you wake up?"
            CheckState={setRestedWhenWakeUp}
            isChecked={restedWhenWakeUp}
          />
        </div>
        <div className="m-5 w-[25%]">
          <CustomYesOrNo
            id="doYouSnore"
            text="Do you snore?"
            CheckState={setDoYouSnore}
            isChecked={doYouSnore}
          />
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <div className="w-[25%]">
          <CustomYesOrNo
            id="wearEquipment"
            text="Have you ever been told to wear CPAP or BiPAP for sleep apnea?"
            CheckState={setWearEquipment}
            isChecked={wearEquipment}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <TextInput
          id="howManyNights"
          placeHolder="How many nights per week?"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setHowManyNights(text.target.value)
          }}
        />
      </div>
      <div className="flex justify-center">
        <CustomCheckBoxFeild
          id="sleepWellness"
          title="How well have you slept over the past month?"
          checkBoxValues={sleepWellness}
          setCheckBoxValues={setSleepWellness}
          allowMultipleCheckBoxes={false}
          checkBoxTitles={[
            'Very Good',
            'Fairly Good',
            'Fairly Bad',
            'Very Bad',
          ]}
        />
      </div>
      <p className="mt-10 text-center text-lg font-bold">
        Select the checkbox choice for how likely are you to doze off or fall
        asleep in the situations described below, in contrast to feeling just
        tired? This refers to your usual way of life in recent times. Even if
        you haven’t done some of these things recently, try to work out how they
        would have affected you. Use the following scale for each situation: 0 =
        Would never doze, 1 = Slight chance of dozing, 2 = Moderate chance of
        dozing, 3 = High chance of dozing
      </p>

      <div className="flex justify-center text-lg">
        <div className="w-[25%]">
          <CustomCheckBoxFeild
            id="sittingAndReading"
            title="Sitting and reading"
            checkBoxValues={sittingAndReading}
            setCheckBoxValues={setSittingAndReading}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['0', '1', '2', '3']}
          />
        </div>
        <div className="w-[25%]">
          <CustomCheckBoxFeild
            id="watchingTv"
            title="Watching TV"
            checkBoxValues={watchingTv}
            setCheckBoxValues={setWatchingTv}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['0', '1', '2', '3']}
          />
        </div>
      </div>
      <div className="flex justify-center text-lg">
        <div className="w-[25%]">
          <CustomCheckBoxFeild
            id="sittingInPublic"
            title="Sitting in a public place (theater or meeting)"
            checkBoxValues={sittingInPublic}
            setCheckBoxValues={setSittingInPublic}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['0', '1', '2', '3']}
          />
        </div>
        <div className="w-[25%]">
          <CustomCheckBoxFeild
            id="carPassanger"
            title="Passenger in a car for one hour or more"
            checkBoxValues={carPassanger}
            setCheckBoxValues={setCarPassanger}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['0', '1', '2', '3']}
          />
        </div>
      </div>
      <div className="flex justify-center text-lg">
        <div className="w-[25%]">
          <CustomCheckBoxFeild
            id="lyingDown"
            title="Lying down to rest in the afternoon"
            checkBoxValues={lyingDown}
            setCheckBoxValues={setLyingDown}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['0', '1', '2', '3']}
          />
        </div>
        <div className="w-[25%]">
          <CustomCheckBoxFeild
            id="talkingToSomeone"
            title="Sitting and talking to someone"
            checkBoxValues={talkingToSomeone}
            setCheckBoxValues={setTalkingToSomeone}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['0', '1', '2', '3']}
          />
        </div>
      </div>
      <div className="flex justify-center text-lg">
        <div className="w-[25%]">
          <CustomCheckBoxFeild
            id="sittingQuietlyAfterLunch"
            title="Sitting quietly after lunch without alcohol"
            checkBoxValues={sittingQuietlyAfterLunch}
            setCheckBoxValues={setSittingQuietlyAfterLunch}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['0', '1', '2', '3']}
          />
        </div>
        <div className="w-[25%]">
          <CustomCheckBoxFeild
            id="inCarWhileStopped"
            title="In a car, while stopped for a few minutes in traffic"
            checkBoxValues={inCarWhileStopped}
            setCheckBoxValues={setInCarWhileStopped}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['0', '1', '2', '3']}
          />
        </div>
      </div>
      <div className="flex justify-center text-lg">
        <TextInput
          id="Total"
          placeHolder="Total"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setTotal(text.target.value)
          }}
        />
      </div>
      <div className="bg-[#e8e8e8] p-3 shadow-md"></div>
      <div className="flex justify-center">
        <CustomCheckBoxFeild
          id="typicalDay"
          title="On a typical day, which describes you?"
          checkBoxValues={typicalDay}
          setCheckBoxValues={setTypicalDay}
          allowMultipleCheckBoxes={false}
          checkBoxTitles={[
            'Mostly sitting',
            'Mostly walking',
            'Mostly heavy labor',
            'Unsure',
            'Other',
          ]}
        />
      </div>
      <SectionWithTitle
        title="Exercise"
        subTitle=" Please check Yes or No for the following"
        BgColor="bg-[#e8e8e8]"
        children={[
          <CustomYesOrNo
            id="enjoyExercise"
            text="Do you enjoy exercise?"
            CheckState={setEnjoyExercise}
            isChecked={enjoyExercise}
          />,
          <CustomYesOrNo
            id="gymMembership"
            text="Do you have a gym membership?"
            CheckState={setGymMembership}
            isChecked={gymMembership}
          />,
          <CustomYesOrNo
            id="exerciseEquipment"
            text="Do you have exercise equipment at home?"
            CheckState={setExerciseEquipment}
            isChecked={exerciseEquipment}
          />,
          <CustomYesOrNo
            id="exerciseRegularly"
            text="Do you exercise regularly?"
            CheckState={setExerciseRegularly}
            isChecked={exerciseRegularly}
          />,
          <CustomYesOrNo
            id="badExerciseExperience"
            text="Do you have any negative feelings about exercise or had any bad experiences with exercise?"
            CheckState={setBadExerciseExperience}
            isChecked={badExerciseExperience}
          />,
          <CustomYesOrNo
            id="encourageExercise"
            text="Do you have any family members or friends who are willing to encourage you to exercise or possibly exercise with you?"
            CheckState={setEncourageExercise}
            isChecked={encourageExercise}
          />,
          <p className="mt-5 text-center text-lg font-bold">
            Current Activity Routine: (Include exercise and job-related
            activity)
          </p>,
          <TextInput
            id="sixAm"
            placeHolder="6:00 AM - 9:00 AM"
            widthPercentage="w-2/3"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setSixAm(text.target.value)
            }}
          />,
          <TextInput
            id="nineAm"
            placeHolder="9:00 AM - 12:00 PM"
            widthPercentage="w-2/3"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setNineAm(text.target.value)
            }}
          />,
          <TextInput
            id="twelvePm"
            placeHolder="12:00 PM - 3:00 PM"
            widthPercentage="w-2/3"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setTwelvePm(text.target.value)
            }}
          />,
          <TextInput
            id="threePm"
            placeHolder="3:00 PM - 6:00 PM"
            widthPercentage="w-2/3"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setThreePm(text.target.value)
            }}
          />,
          <TextInput
            id="sixPm"
            placeHolder="6:00 PM - 9:00 PM"
            widthPercentage="w-2/3"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setSixPm(text.target.value)
            }}
          />,
          <TextInput
            id="ninePm"
            placeHolder="9:00 PM - 12:00 AM"
            widthPercentage="w-2/3"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setNinePm(text.target.value)
            }}
          />,
          <CustomYesOrNo
            id="exerciseWeekly"
            text="Do you exercise regularly (at least 150 minutes per week; such as 5 days a week for at least 30 minutes per session)?"
            CheckState={setExerciseWeekly}
            isChecked={exerciseWeekly}
          />,
          <TextInput
            id="describeExercise"
            placeHolder="Describe"
            widthPercentage="w-2/3"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setDescribeExercise(text.target.value)
            }}
          />,
          <CustomCheckBoxFeild
            id="difficultyGettingUpFromFloor"
            title="Difficulty level getting back up from the floor"
            checkBoxValues={difficultyGettingUpFromFloor}
            setCheckBoxValues={setDifficultyGettingUpFromFloor}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={[
              'No difficulty',
              'Some difficulty',
              'Moderate difficulty',
              'Heavy difficulty',
              'Cannot get up unassisted',
            ]}
          />,
          <CustomCheckBoxFeild
            id="typeOfExercise"
            title="What type of exercise are you currently involved in? (Mark all that apply)"
            checkBoxValues={typeOfExercise}
            setCheckBoxValues={setTypeOfExercise}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              'Aerobics classes',
              'Outdoor Biking',
              'Stationary Biking',
              'Crossfit/Boot Camp',
              'Elliptical Machine',
              'Exercise videos',
              'Hiking',
              'Pilates',
              'Running',
              'Stretching',
              'Swimming',
              'Walking',
              'Water/Pool Exercise',
              'Weight Training',
              'Yoga',
              'Zumba',
              'None',
              'Other',
            ]}
          />,
          <CustomCheckBoxFeild
            id="typeOfExercise"
            title="What type of exercise do you prefer or would enjoy the most? (Mark all that apply)"
            checkBoxValues={exercisePreference}
            setCheckBoxValues={setExercisePreference}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              'Aerobics classes',
              'Outdoor Biking',
              'Stationary Biking',
              'Crossfit/Boot Camp',
              'Elliptical Machine',
              'Exercise videos',
              'Hiking',
              'Pilates',
              'Running',
              'Stretching',
              'Swimming',
              'Walking',
              'Water/Pool Exercise',
              'Weight Training',
              'Yoga',
              'Zumba',
              'None',
              'Other',
            ]}
          />,
          <CustomCheckBoxFeild
            id="athleteInSchool"
            title="Were you an athlete in school?"
            checkBoxValues={athleteInSchool}
            setCheckBoxValues={setAthleteInSchool}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={['Yes, in High School', 'Yes, in College', 'No']}
          />,
          <CustomCheckBoxFeild
            id="confidentIncrease"
            title="How confident are you that you could increase the amount of exercise you do? (Check One)"
            checkBoxValues={confidentIncrease}
            setCheckBoxValues={setConfidentIncrease}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={[
              'Very confident',
              'Moderately confident',
              'Only a little confident',
              'Not at all confident',
            ]}
          />,
          <CustomCheckBoxFeild
            id="majorBenefitsOfExercise"
            title="What are the major benefits of exercise for you? (Mark all that apply)"
            checkBoxValues={majorBenefitsOfExercise}
            setCheckBoxValues={setMajorBenefitsOfExercise}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              'Increased energy',
              'Improved health',
              'Improved arthritis',
              'Improved mobility',
              'Other',
            ]}
          />,
          <CustomCheckBoxFeild
            id="exerciseBarriers"
            title="What are your major barriers to increasing the amount of exercise you do? (Mark all that apply)"
            checkBoxValues={exerciseBarriers}
            setCheckBoxValues={setExerciseBarriers}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              'Lack of motivation',
              'Lack of time',
              'Lack of equipment',
              'Lack of access to exercise facilities',
              'Injuries',
              'Health problems',
              'Other',
            ]}
          />,
          <p className="text-2xl text-gray-700">
            How much time are you willing to commit to exercise?
          </p>,
          <TextInput
            id="minutesPerDay"
            placeHolder="minutes/day"
            widthPercentage="w-2/3"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setMinutesPerDay(text.target.value)
            }}
          />,
          <TextInput
            id="daysPerWeek"
            placeHolder="days/week"
            widthPercentage="w-2/3"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setDaysPerWeek(text.target.value)
            }}
          />,
        ]}
      />
      <div className="mt-10 mb-10 bg-[#e8e8e8] p-3 shadow-md"></div>
      <SectionWithTitle
        title="Additional information related to diet"
        BgColor="bg-[#e8e8e8]"
        children={[
          <CustomCheckBoxFeild
            id="confidenceWeightlossDiet"
            title="How confident are you that you can follow a weight loss diet? (Check One)"
            checkBoxValues={confidenceWeightLossDiet}
            setCheckBoxValues={setConfidenceWeightLossDiet}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={[
              'Very confident',
              'Moderately confident',
              'Only a little confident',
              'Not at all confident',
            ]}
          />,
          <CustomCheckBoxFeild
            id="majorBarriersDiet"
            title="What are your major barriers to following a weight loss diet? (Mark all that apply)"
            checkBoxValues={majorBarriersDiet}
            setCheckBoxValues={setMajorBarriersDiet}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              'Access to healthy foods',
              'Access to cooking appliances (Stove, Microwave, Grill)',
              'Religion',
              'Access to refrigerator and/or freezer',
              'Cost',
              'Family/household diet',
              'Hunger',
              'Healthy food doesn’t taste good',
              'Lack of family/peer support',
              'Food intolerances/dislikes',
              'Lack of knowledge of food to eat/buy',
              'Time to plan/prepare healthy diet',
              'Work atmosphere',
              'Other',
            ]}
          />,
          <TextInput
            id="favoriteFoods"
            placeHolder="Favorite foods"
            widthPercentage="w-2/3"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setFavoriteFoods(text.target.value)
            }}
          />,
        ]}
      />
      <p className="mt-10 text-center text-2xl font-bold">
        Current Eating Habits
      </p>
      <div className="m-5 flex flex-col md:flex-row">
        <div className=" flex items-center justify-center">
          <p className="mt-5 text-center text-xl font-bold">Breakfast</p>
        </div>
        <TextInput
          id="breakfastTypeOfFood"
          placeHolder="Types of Food"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setBreakfastTypeOfFood(text.target.value)
          }}
        />
        <TextInput
          id="breakfastProteinOrCarbs"
          placeHolder="Protein or Carbs"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setBreakfastProteinOrCarbs(text.target.value)
          }}
        />
        <TextInput
          id="breakfastCalories"
          placeHolder="Calories"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setBreakfastCalories(text.target.value)
          }}
        />
      </div>
      <div className="m-5 flex flex-col md:flex-row">
        <div className=" flex items-center justify-center">
          <p className="mt-5 text-center text-xl font-bold">Lunch</p>
        </div>
        <TextInput
          id="lunchTypeOfFood"
          placeHolder="Types of Food"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setLunchTypeOfFood(text.target.value)
          }}
        />
        <TextInput
          id="lunchProteinOrCarbs"
          placeHolder="Protein or Carbs"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setLunchProteinOrCarbs(text.target.value)
          }}
        />
        <TextInput
          id="lunchCalories"
          placeHolder="Calories"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setLunchCalories(text.target.value)
          }}
        />
      </div>
      <div className="m-5 flex flex-col md:flex-row">
        <div className=" flex items-center justify-center">
          <p className="mt-5 text-center text-xl font-bold">Dinner</p>
        </div>
        <TextInput
          id="dinnerTypeOfFood"
          placeHolder="Types of Food"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDinnerTypeOfFood(text.target.value)
          }}
        />
        <TextInput
          id="dinnerProteinOrCarbs"
          placeHolder="Protein or Carbs"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDinnerProteinOrCarbs(text.target.value)
          }}
        />
        <TextInput
          id="dinnerCalories"
          placeHolder="Calories"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDinnerCalories(text.target.value)
          }}
        />
      </div>
      <div className="m-5 flex flex-col md:flex-row">
        <div className=" flex items-center justify-center">
          <p className="mt-5 text-center text-xl font-bold">Snack 1</p>
        </div>
        <TextInput
          id="snackOneTypeOfFood"
          placeHolder="Types of Food"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSnackOneTypeOfFood(text.target.value)
          }}
        />
        <TextInput
          id="snackOneProteinOrCarbs"
          placeHolder="Protein or Carbs"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSnackOneProteinOrCarbs(text.target.value)
          }}
        />
        <TextInput
          id="snackOneCalories"
          placeHolder="Calories"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSnackOneCalories(text.target.value)
          }}
        />
      </div>
      <div className="m-5 flex flex-col md:flex-row">
        <div className=" flex items-center justify-center">
          <p className="mt-5 text-center text-xl font-bold">Snack 2</p>
        </div>
        <TextInput
          id="snackTwoTypeOfFood"
          placeHolder="Types of Food"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSnackTwoTypeOfFood(text.target.value)
          }}
        />
        <TextInput
          id="snackTwoProteinOrCarbs"
          placeHolder="Protein or Carbs"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSnackTwoProteinOrCarbs(text.target.value)
          }}
        />
        <TextInput
          id="snackTwoCalories"
          placeHolder="Calories"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSnackTwoCalories(text.target.value)
          }}
        />
      </div>
      <div className="m-5 flex flex-col md:flex-row">
        <div className=" flex items-center justify-center">
          <p className="mt-5 text-center text-xl font-bold">Coffee</p>
        </div>
        <TextInput
          id="coffeeTypeOfFood"
          placeHolder="Types of Food"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setCoffeeTypeOfFood(text.target.value)
          }}
        />
        <TextInput
          id="coffeeProteinOrCarbs"
          placeHolder="Protein or Carbs"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setCoffeeProteinOrCarbs(text.target.value)
          }}
        />
        <TextInput
          id="coffeeCalories"
          placeHolder="Calories"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setCoffeeCalories(text.target.value)
          }}
        />
      </div>
      <div className="m-5 flex flex-col md:flex-row">
        <div className=" flex items-center justify-center">
          <p className="mt-5 text-center text-xl font-bold">Soda</p>
        </div>
        <TextInput
          id="sodaTypeOfFood"
          placeHolder="Types of Food"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSodaTypeOfFood(text.target.value)
          }}
        />
        <TextInput
          id="sodaProteinOrCarbs"
          placeHolder="Protein or Carbs"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSodaProteinOrCarbs(text.target.value)
          }}
        />
        <TextInput
          id="sodaCalories"
          placeHolder="Calories"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setSodaCalories(text.target.value)
          }}
        />
      </div>
      <div className="m-5 flex flex-col md:flex-row">
        <div className=" flex items-center justify-center">
          <p className="mt-5 text-center text-xl font-bold">Candy/Sweets</p>
        </div>
        <TextInput
          id="candyOrSweetsTypeOfFood"
          placeHolder="Types of Food"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setCandyOrSweetsTypeOfFood(text.target.value)
          }}
        />
        <TextInput
          id="candyOrSweetsProteinOrCarbs"
          placeHolder="Protein or Carbs"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setCandyOrSweetsProteinOrCarbs(text.target.value)
          }}
        />
        <TextInput
          id="candyOrSweetsCalories"
          placeHolder="Calories"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setCandyOrSweetsCalories(text.target.value)
          }}
        />
      </div>
      <div className="m-5 flex flex-col md:flex-row">
        <div className=" flex items-center justify-center">
          <p className="mt-5 text-center text-xl font-bold">Other</p>
        </div>
        <TextInput
          id="otherTypeOfFood"
          placeHolder="Types of Food"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherTypeOfFood(text.target.value)
          }}
        />
        <TextInput
          id="otherProteinOrCarbs"
          placeHolder="Protein or Carbs"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherProteinOrCarbs(text.target.value)
          }}
        />
        <TextInput
          id="otherCalories"
          placeHolder="Calories"
          widthPercentage="w-3/4"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setOtherCalories(text.target.value)
          }}
        />
      </div>
      <div className="bg-[#e8e8e8] p-3 shadow-md"></div>
      <div className="mt-10">
        <TextInput
          id="numPeopleLiveWith"
          placeHolder="Number of People You Live With"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setNumPeopleLiveWith(text.target.value)
          }}
        />
      </div>
      <div className="flex items-center justify-center">
        <CustomYesOrNo
          id="eatTogether"
          text="Are meals eaten together? "
          CheckState={setEatTogether}
          isChecked={eatTogether}
        />
      </div>
      <div className="flex items-center justify-center">
        <CustomCheckBoxFeild
          id="whoDoesShopping"
          title="Who does the grocery shopping?"
          checkBoxValues={whoDoesShopping}
          setCheckBoxValues={setWhoDoesShopping}
          allowMultipleCheckBoxes={true}
          checkBoxTitles={['Self', 'Spouse', 'Parent', 'Other']}
        />
      </div>
      <div className="flex items-center justify-center">
        <CustomCheckBoxFeild
          id="whoDoesCooking"
          title="Who cooks/prepares the meals?"
          checkBoxValues={whoDoesCooking}
          setCheckBoxValues={setWhoDoesCooking}
          allowMultipleCheckBoxes={true}
          checkBoxTitles={['Self', 'Spouse', 'Parent', 'Other']}
        />
      </div>
      <div className="flex items-center justify-center">
        <CustomYesOrNo
          id="foodIntolerance"
          text="Do you have any food intolerances or food allergies or are there particular foods you dislike?"
          CheckState={setFoodIntolerance}
          isChecked={foodIntolerance}
        />
      </div>
      <div className="flex items-center justify-center">
        <TextInput
          id="foodIntoleranceList"
          placeHolder="Please List"
          widthPercentage="w-1/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setFoodIntoleranceList(text.target.value)
          }}
        />
      </div>
      <SectionWithTitle
        title="Have you done or experienced any of the following in the past 6 months?"
        BgColor="bg-[#e8e8e8]"
        children={[
          <CustomYesOrNo
            id="stressEating"
            text="Eating when stressed, emotional or bored"
            CheckState={setStressEating}
            isChecked={stressEating}
          />,
          stressEating === 'Yes' && (
            <UserCreatedListFromInputBox
              id="stressEatingList"
              title="Please List"
              list={stressEatingList}
              inputBoxPlaceHolder="Details/Comments"
            />
          ),
          <CustomYesOrNo
            id="bingeEatingExperience"
            text="Binge Eating"
            CheckState={setBingeEatingExperience}
            isChecked={bingeEatingExperience}
          />,
          bingeEatingExperience === 'Yes' && (
            <UserCreatedListFromInputBox
              id="bingeEatingList"
              title="Please List"
              list={bingeEatingList}
              inputBoxPlaceHolder="Details/Comments"
            />
          ),
          <CustomYesOrNo
            id="snackingExperience"
            text="Grazing or Frequent Snacking"
            CheckState={setSnackingExperience}
            isChecked={snackingExperience}
          />,
          snackingExperience === 'Yes' && (
            <UserCreatedListFromInputBox
              id="snackingList"
              title="Please List"
              list={snackingList}
              inputBoxPlaceHolder="Details/Comments"
            />
          ),
          <CustomYesOrNo
            id="eatingMiddleOfNightExperience"
            text="Eating in the middle of the night"
            CheckState={setEatingMiddleOfNightExperience}
            isChecked={eatingMiddleOfNightExperience}
          />,
          eatingMiddleOfNightExperience === 'Yes' && (
            <UserCreatedListFromInputBox
              id="eatingMiddleOfNightList"
              title="Please List"
              list={eatingMiddleOfNightList}
              inputBoxPlaceHolder="Details/Comments"
            />
          ),
          <CustomYesOrNo
            id="skippingMealsExperience"
            text="Skipping meals"
            CheckState={setSkippingMealsExperience}
            isChecked={skippingMealsExperience}
          />,
          skippingMealsExperience === 'Yes' && (
            <UserCreatedListFromInputBox
              id="skippingMealsList"
              title="Please List"
              list={skippingMealsList}
              inputBoxPlaceHolder="Details/Comments"
            />
          ),
          <CustomYesOrNo
            id="eatingOutExperience"
            text="Eat out at restaurants or ordering take out"
            CheckState={setEatingOutExperience}
            isChecked={eatingOutExperience}
          />,
          eatingOutExperience === 'Yes' && (
            <UserCreatedListFromInputBox
              id="eatingOutList"
              title="Please List"
              list={eatingOutList}
              inputBoxPlaceHolder="Details/Comments"
            />
          ),
          <CustomYesOrNo
            id="eatingInFrontOfTVExperience"
            text="Eating in front of the TV"
            CheckState={setEatingInFrontOfTVExperience}
            isChecked={eatingInFrontOfTVExperience}
          />,
          eatingInFrontOfTVExperience === 'Yes' && (
            <UserCreatedListFromInputBox
              id="eatingInFrontOfTVList"
              title="Please List"
              list={eatingInFrontOfTVList}
              inputBoxPlaceHolder="Details/Comments"
            />
          ),
          <CustomYesOrNo
            id="eatingAtDeskExperience"
            text="Eating at desk/computer/while working"
            CheckState={setEatingAtDeskExperience}
            isChecked={eatingAtDeskExperience}
          />,
          eatingAtDeskExperience === 'Yes' && (
            <UserCreatedListFromInputBox
              id="eatingAtDeskList"
              title="Please List"
              list={eatingAtDeskList}
              inputBoxPlaceHolder="Details/Comments"
            />
          ),
          <CustomYesOrNo
            id="portionSizeExperience"
            text="Eat more than one helping/large portion sizes"
            CheckState={setPortionSizeExperience}
            isChecked={portionSizeExperience}
          />,
          portionSizeExperience === 'Yes' && (
            <UserCreatedListFromInputBox
              id="portionSizeList"
              title="Please List"
              list={portionSizeList}
              inputBoxPlaceHolder="Details/Comments"
            />
          ),
          <CustomYesOrNo
            id="eatingTooFastExperience"
            text="Eating too fast"
            CheckState={setEatingTooFastExperience}
            isChecked={eatingTooFastExperience}
          />,
          eatingTooFastExperience === 'Yes' && (
            <UserCreatedListFromInputBox
              id="eatingTooFastList"
              title="Please List"
              list={eatingTooFastList}
              inputBoxPlaceHolder="Details/Comments"
            />
          ),
          <CustomYesOrNo
            id="notSatifiedExperience"
            text="Do NOT feel satisfied or full after a meal"
            CheckState={setNotSatifiedExperience}
            isChecked={notSatifiedExperience}
          />,
          notSatifiedExperience === 'Yes' && (
            <UserCreatedListFromInputBox
              id="notSatifiedList"
              title="Please List"
              list={notSatifiedList}
              inputBoxPlaceHolder="Details/Comments"
            />
          ),
        ]}
      />

      <SectionWithTitle
        title="Which of the following do you consume more than once a week?"
        BgColor="bg-[#e8e8e8]"
        children={[
          <CustomYesOrNo
            id="regularSoda"
            text="Regular Soda"
            CheckState={setRegularSoda}
            isChecked={regularSoda}
          />,
          regularSoda === 'Yes' && (
            <UserCreatedListFromInputBox
              id="regularSodaList"
              list={regularSodaList}
              inputBoxPlaceHolder="Number Per Day (Average)"
            />
          ),
          <CustomYesOrNo
            id="juice"
            text="Juice"
            CheckState={setJuice}
            isChecked={juice}
          />,
          juice === 'Yes' && (
            <UserCreatedListFromInputBox
              id="juiceList"
              list={juiceList}
              inputBoxPlaceHolder="Number Per Day (Average)"
            />
          ),
          <CustomYesOrNo
            id="sweetTea"
            text="Sweet Tea"
            CheckState={setSweetTea}
            isChecked={sweetTea}
          />,
          sweetTea === 'Yes' && (
            <UserCreatedListFromInputBox
              id="sweetTeaList"
              list={sweetTeaList}
              inputBoxPlaceHolder="Number Per Day (Average)"
            />
          ),
          <CustomYesOrNo
            id="alchoholBeverages"
            text="Alchohol Beverages"
            CheckState={setAlchoholBeverages}
            isChecked={alchoholBeverages}
          />,
          alchoholBeverages === 'Yes' && (
            <UserCreatedListFromInputBox
              id="alchoholBeveragesList"
              list={alchoholBeveragesList}
              inputBoxPlaceHolder="Number Per Day (Average)"
            />
          ),
          <CustomYesOrNo
            id="friedFoods"
            text="Fried Foods"
            CheckState={setFriedFoods}
            isChecked={friedFoods}
          />,
          friedFoods === 'Yes' && (
            <UserCreatedListFromInputBox
              id="friedFoodsList"
              list={friedFoodsList}
              inputBoxPlaceHolder="Number Per Day (Average)"
            />
          ),
        ]}
      />
      <p className="mt-10 text-center text-xl">
        Please indicate the number of servings of each of the below that you
        typically consume during an average day
      </p>
      <div className="mt-10 flex flex-col items-center justify-center md:flex-row">
        <TextInput
          id="fruitServings"
          placeHolder='Fruit Servings (e.g. "1")'
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setFruitServings(text.target.value)
          }}
        />
        <TextInput
          id="vegetableServings"
          placeHolder='Vegetable Servings (e.g. "1")'
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setVegetableServings(text.target.value)
          }}
        />
        <TextInput
          id="wholeGrainServings"
          placeHolder='Whole Grain Servings (e.g. "1")'
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setWholeGrainServings(text.target.value)
          }}
        />
      </div>
      <div className="mt-10 flex flex-col items-center justify-center md:flex-row">
        <TextInput
          id="lowFatDairyServings"
          placeHolder='Low Fat Dairy Servings (e.g. "1")'
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setLowFatDairyServings(text.target.value)
          }}
        />
        <TextInput
          id="leanProteinServings"
          placeHolder='Lean Protein Servings (e.g. "1")'
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setLeanProteinServings(text.target.value)
          }}
        />
      </div>
      <p className="mt-10 text-center text-xl">
        How many days per week will you be able to commit to cooking/meal
        prepping to meet your weight loss goals?
      </p>
      <div className="mt-5 flex items-center justify-center">
        <TextInput
          id="daysPerWeekExplination"
          placeHolder="Explain"
          widthPercentage="w-2/3"
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDaysPerWeekExplination(text.target.value)
          }}
        />
      </div>
      <SectionWithTitle
        title="Past Medical History"
        BgColor="bg-[#e8e8e8]"
        children={[
          <CustomCheckBoxFeild
            id="medicalHistory"
            title="Please check all that apply"
            checkBoxValues={medicalHistory}
            setCheckBoxValues={setMedicalHistory}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              'Diabetes',
              'Damage to Kidneys from Diabetes',
              'Damage to Eyes from Diabetes',
              'Damage to Nerves from Diabetes',
              'Obstructive Sleep Apnea',
              'High blood pressure',
              'High cholesterol',
              'Thyroid Disease',
              'Arthritis',
              'Cancer',
              'Heart Attack(s)',
              'Heart murmur/Valve problems',
              'Heart Failure',
              'Organ Transplant',
              'Polycystic Ovary Disease',
              'Kidney disease',
              'Kidney stones',
              'Dialysis',
              'Pancreatitis',
              'Asthma',
              'Pulmonary embolism',
              'Emphysema, COPD',
              'Reflux/Heartburn',
              'Crohn’s disease',
              'Gallstones',
              'Epilepsy (seizures)',
              'Colitis',
              'Stroke',
              'Depression',
              'Anxiety',
              'Cataracts',
              'Glaucoma',
              'Other Eye Disease',
              'Peripheral artery disease',
              'Clotting Disorder',
              'Rheumatoid Arthritis',
              'Lupus',
              'Gout',
              'Other Rheumatologic Disease',
              'Liver disease',
              'Hepatitis',
              'HIV/AID',
              'Other',
            ]}
          />,
          <CustomYesOrNo
            id="medicationsTaken"
            text="Are you currently taking any medications?"
            CheckState={setMedicationsTaken}
            isChecked={medicationsTaken}
          />,
          medicationsTaken === 'Yes' && (
            <UserCreatedListFromInputBox
              id="medicationsTakenList"
              list={medicationsTakenList}
              inputBoxPlaceHolder="Medication Name"
            />
          ),
        ]}
      />
      <div className="mt-10 flex items-center justify-center">
        <MainButton
          buttonText="Submit"
          onClick={() => {
            alert('Survey Submitted Successfully')
            console.log('submit')
          }}
        />
      </div>
    </div>
  )
}

export default WeightLossSurvey
