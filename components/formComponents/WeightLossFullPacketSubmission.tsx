import React, { useState, useEffect, useRef } from 'react'
import MainButton from '../MainButton'
import { InformationSection } from './InformationSection'
import { jsPDF } from 'jspdf'
import { WeightLossSurveyTypes } from '../../types/weightLossTypes'

type WeightLossSurveyKeys = keyof WeightLossSurveyTypes

function WeightLossPacketFullSubmission({
  selectedPacket,
}: {
  selectedPacket: WeightLossSurveyTypes
}) {
  const pdfRef = useRef(null)
  const pdf = new jsPDF()

  return (
    <div className="ml-3 flex w-full flex-col items-center justify-center">
      <MainButton
        buttonText="Export PDF"
        onClick={async () => {
          var doc = 1
          if (Array.isArray(selectedPacket) == false) {
            Object.keys(selectedPacket).map(async (item: any) => {
              selectedPacket[item as WeightLossSurveyKeys]
              doc += 1
              const content: any = pdfRef.current
              var y = 15
              const pageHeight = pdf.internal.pageSize.height
              if (doc == 2) {
                await pdf.html(content, {
                  callback: function (doc) {
                    doc.save(`${item.emailValue}.pdf`)
                  },
                  width: 210, // <- here
                  windowWidth: 1000,
                  margin: 0,

                  // <- here
                })
              }
            })
          }
        }}
        buttonWidth="w-[200px]"
      />
      {Array.isArray(selectedPacket) == false && (
        <div
          className="flex w-full flex-col items-center justify-center"
          ref={pdfRef}
        >
          <InformationSection
            title="Patient Information"
            contentInSection={[
              {
                fieldTitle: 'Name',
                fieldValue: selectedPacket?.patientsName,
              },
              {
                fieldTitle: 'Email',
                fieldValue: selectedPacket?.emailValue,
              },
            ]}
          />
          <InformationSection
            title="Weight Loss History and Goals"
            contentInSection={[
              {
                fieldTitle: 'Reason for Weight Loss:',
                fieldValue: selectedPacket?.whyLossWeight,
              },
              {
                fieldTitle: 'Weight Goals:',
                fieldValue: selectedPacket?.weightGoals,
              },
              {
                fieldTitle: 'Time Frame:',
                fieldValue: selectedPacket?.timeFrame,
              },
            ]}
          />
          <InformationSection
            title="Weight History"
            contentInSection={[
              {
                fieldTitle: 'Most Weighed As An Adult',
                fieldValue: selectedPacket?.mostWeighedAsAdult,
              },
              {
                fieldTitle: 'Age At Most Adult Weight',
                fieldValue: selectedPacket?.ageAtAdultWeight,
              },
              {
                fieldTitle: 'Least Weighed As An Adult',
                fieldValue: selectedPacket?.leastWeighedAsAdult,
              },
              {
                fieldTitle: 'Age At Least Adult Weight',
                fieldValue: selectedPacket?.ageAtAdultLeastWeight,
              },
              {
                fieldTitle: 'Weight Change During Life',
                fieldValue: selectedPacket?.weightChangeDuringLife,
              },
              {
                fieldTitle: 'Weight Gained In The Past',
                fieldValue: selectedPacket?.weightGainedInPast,
              },
            ]}
          />

          <InformationSection
            title="Weight Loss Goals and Challenges"
            contentInSection={[
              {
                fieldTitle: 'Challenges Of Weight Management:',
                fieldValue: selectedPacket?.challengesOfWeightManagement,
              },
              {
                fieldTitle: 'Hopes For Weight Loss Management:',
                fieldValue: selectedPacket?.hopesForWeightLossManagement,
              },
              {
                fieldTitle: 'Commitments To Weight Loss:',
                fieldValue: selectedPacket?.commitmentsToWeightLoss,
              },
            ]}
          />
          <h2 className="text-4xl font-bold text-[#1f55f5] underline">
            Previous Weight Loss Programs
          </h2>

          <InformationSection
            title="On Your Own:"
            contentInSection={[
              {
                fieldTitle: 'On Your Own:',
                fieldValue: selectedPacket?.onYourOwn,
              },
              {
                fieldTitle: 'On Your Own Start Date:',
                fieldValue: selectedPacket?.onYourOwnStartDate,
              },
              {
                fieldTitle: 'On Your Own End Date:',
                fieldValue: selectedPacket?.onYourOwnEndDate,
              },
              {
                fieldTitle: 'On Your Own Weight Loss:',
                fieldValue: selectedPacket?.onYourOwnWeightLoss,
              },
              {
                fieldTitle: 'On Your Own Reason For Stopping:',
                fieldValue: selectedPacket?.onYourOwnReasonForStopping,
              },
              {
                fieldTitle: 'On Your Own Reason For Regain:',
                fieldValue: selectedPacket?.onYourOwnReasonForRegain,
              },
            ]}
          />
          <InformationSection
            title="Atkins or Low Carbohydrate:"
            contentInSection={[
              {
                fieldTitle: 'Atkins or Low Carbohydrate:',
                fieldValue: selectedPacket?.atkinsOrLowCarbohydrate,
              },
              {
                fieldTitle: 'Atkins or Low Carbohydrate Start Date:',
                fieldValue: selectedPacket?.atkinsOrLowCarbohydrateStartDate,
              },
              {
                fieldTitle: 'Atkins or Low Carbohydrate End Date:',
                fieldValue: selectedPacket?.atkinsOrLowCarbohydrateEndDate,
              },
              {
                fieldTitle: 'Atkins or Low Carbohydrate Weight Loss:',
                fieldValue: selectedPacket?.atkinsOrLowCarbohydrateWeightLoss,
              },
              {
                fieldTitle: 'Atkins or Low Carbohydrate Reason For Stopping:',
                fieldValue:
                  selectedPacket?.atkinsOrLowCarbohydrateReasonForStopping,
              },
              {
                fieldTitle: 'Atkins or Low Carbohydrate Reason For Regain:',
                fieldValue:
                  selectedPacket?.atkinsOrLowCarbohydrateReasonForRegain,
              },
            ]}
          />
          <InformationSection
            title="Jenny Craig:"
            contentInSection={[
              {
                fieldTitle: 'Jenny Craig:',
                fieldValue: selectedPacket?.jennyCraig,
              },
              {
                fieldTitle: 'Jenny Craig Start Date:',
                fieldValue: selectedPacket?.jennyCraigStartDate,
              },
              {
                fieldTitle: 'Jenny Craig End Date:',
                fieldValue: selectedPacket?.jennyCraigEndDate,
              },
              {
                fieldTitle: 'Jenny Craig Weight Loss:',
                fieldValue: selectedPacket?.jennyCraigWeightLoss,
              },
              {
                fieldTitle: 'Jenny Craig Reason For Stopping:',
                fieldValue: selectedPacket?.jennyCraigReasonForStopping,
              },
              {
                fieldTitle: 'Jenny Craig Reason For Regain:',
                fieldValue: selectedPacket?.jennyCraigReasonForRegain,
              },
            ]}
          />
          <InformationSection
            title="Nutrisystem:"
            contentInSection={[
              {
                fieldTitle: 'Nutrisystem:',
                fieldValue: selectedPacket?.nutrisystem,
              },
              {
                fieldTitle: 'Nutrisystem Start Date:',
                fieldValue: selectedPacket?.nutrisystemStartDate,
              },
              {
                fieldTitle: 'Nutrisystem End Date:',
                fieldValue: selectedPacket?.nutrisystemEndDate,
              },
              {
                fieldTitle: 'Nutrisystem Weight Loss:',
                fieldValue: selectedPacket?.nutrisystemWeightLoss,
              },
              {
                fieldTitle: 'Nutrisystem Reason For Stopping:',
                fieldValue: selectedPacket?.nutrisystemReasonForStopping,
              },
              {
                fieldTitle: 'Nutrisystem Reason For Regain:',
                fieldValue: selectedPacket?.nutrisystemReasonForRegain,
              },
            ]}
          />
          <InformationSection
            title="Weight Watchers:"
            contentInSection={[
              {
                fieldTitle: 'Weight Watchers:',
                fieldValue: selectedPacket?.weightWatchers,
              },
              {
                fieldTitle: 'Weight Watchers Start Date:',
                fieldValue: selectedPacket?.weightWatchersStartDate,
              },
              {
                fieldTitle: 'Weight Watchers End Date:',
                fieldValue: selectedPacket?.weightWatchersEndDate,
              },
              {
                fieldTitle: 'Weight Watchers Weight Loss:',
                fieldValue: selectedPacket?.weightWatchersWeightLoss,
              },
              {
                fieldTitle: 'Weight Watchers Reason For Stopping:',
                fieldValue: selectedPacket?.weightWatchersReasonForStopping,
              },
              {
                fieldTitle: 'Weight Watchers Reason For Regain:',
                fieldValue: selectedPacket?.weightWatchersReasonForRegain,
              },
            ]}
          />
          <InformationSection
            title="SlimFast:"
            contentInSection={[
              { fieldTitle: 'SlimFast:', fieldValue: selectedPacket?.slimfast },
              {
                fieldTitle: 'SlimFast Start Date:',
                fieldValue: selectedPacket?.slimfastStartDate,
              },

              {
                fieldTitle: 'SlimFast End Date:',
                fieldValue: selectedPacket?.slimfastEndDate,
              },
              {
                fieldTitle: 'SlimFast Weight Loss:',
                fieldValue: selectedPacket?.slimfastWeightLoss,
              },
              {
                fieldTitle: 'SlimFast Reason For Stopping:',
                fieldValue: selectedPacket?.slimfastReasonForStopping,
              },
              {
                fieldTitle: 'SlimFast Reason For Regain:',
                fieldValue: selectedPacket?.slimfastReasonForRegain,
              },
            ]}
          />
          <InformationSection
            title="Optifast:"
            contentInSection={[
              { fieldTitle: 'Optifast:', fieldValue: selectedPacket?.optifast },
              {
                fieldTitle: 'Optifast Start Date:',
                fieldValue: selectedPacket?.optifastStartDate,
              },
              {
                fieldTitle: 'Optifast End Date:',
                fieldValue: selectedPacket?.optifastEndDate,
              },
              {
                fieldTitle: 'Optifast Weight Loss:',
                fieldValue: selectedPacket?.optifastWeightLoss,
              },
              {
                fieldTitle: 'Optifast Reason For Stopping:',
                fieldValue: selectedPacket?.optifastReasonForStopping,
              },
              {
                fieldTitle: 'Optifast Reason For Regain:',
                fieldValue: selectedPacket?.optifastReasonForRegain,
              },
            ]}
          />
          <InformationSection
            title="Other Liquid Diet:"
            contentInSection={[
              {
                fieldTitle: 'Other Liquid Diet:',
                fieldValue: selectedPacket?.otherLiquidDiet,
              },
              {
                fieldTitle: 'Other Liquid Diet Start Date:',
                fieldValue: selectedPacket?.otherLiquidDietStartDate,
              },
              {
                fieldTitle: 'Other Liquid Diet End Date:',
                fieldValue: selectedPacket?.otherLiquidDietEndDate,
              },
              {
                fieldTitle: 'Other Liquid Diet Weight Loss:',
                fieldValue: selectedPacket?.otherLiquidDietWeightLoss,
              },
              {
                fieldTitle: 'Other Liquid Diet Reason For Stopping:',
                fieldValue: selectedPacket?.otherLiquidDietReasonForStopping,
              },
              {
                fieldTitle: 'Other Liquid Diet Reason For Regain:',
                fieldValue: selectedPacket?.otherLiquidDietReasonForRegain,
              },
            ]}
          />
          <InformationSection
            title="Other:"
            contentInSection={[
              { fieldTitle: 'Other:', fieldValue: selectedPacket?.other },
              {
                fieldTitle: 'Other Name:',
                fieldValue: selectedPacket?.otherName,
              },
              {
                fieldTitle: 'Other Start Date:',
                fieldValue: selectedPacket?.otherStartDate,
              },
              {
                fieldTitle: 'Other End Date:',
                fieldValue: selectedPacket?.otherEndDate,
              },
              {
                fieldTitle: 'Other Weight Loss:',
                fieldValue: selectedPacket?.otherWeightLoss,
              },
              {
                fieldTitle: 'Other Reason For Stopping:',
                fieldValue: selectedPacket?.otherReasonForStopping,
              },
              {
                fieldTitle: 'Other Reason For Regain:',
                fieldValue: selectedPacket?.otherReasonForRegain,
              },
            ]}
          />
          <InformationSection
            title="Adipex:"
            contentInSection={[
              { fieldTitle: 'Adipex:', fieldValue: selectedPacket?.adipex },
              {
                fieldTitle: 'Adipex Start Date:',
                fieldValue: selectedPacket?.adipexStartDate,
              },
              {
                fieldTitle: 'Adipex End Date:',
                fieldValue: selectedPacket?.adipexEndDate,
              },
              {
                fieldTitle: 'Adipex Weight Loss:',
                fieldValue: selectedPacket?.adipexWeightLoss,
              },
              {
                fieldTitle: 'Adipex Reason For Stopping:',
                fieldValue: selectedPacket?.adipexReasonForStopping,
              },
              {
                fieldTitle: 'Adipex Reason For Regain:',
                fieldValue: selectedPacket?.adipexReasonForRegain,
              },
            ]}
          />
          <InformationSection
            title="Alli:"
            contentInSection={[
              { fieldTitle: 'Alli:', fieldValue: selectedPacket?.alli },
              {
                fieldTitle: 'Alli Start Date:',
                fieldValue: selectedPacket?.alliStartDate,
              },
              {
                fieldTitle: 'Alli End Date:',
                fieldValue: selectedPacket?.alliEndDate,
              },
              {
                fieldTitle: 'Alli Weight Loss:',
                fieldValue: selectedPacket?.alliWeightLoss,
              },
              {
                fieldTitle: 'Alli Reason For Stopping:',
                fieldValue: selectedPacket?.alliReasonForStopping,
              },
              {
                fieldTitle: 'Alli Reason For Regain:',
                fieldValue: selectedPacket?.alliReasonForRegain,
              },
            ]}
          />
          <InformationSection
            title="Belviq:"
            contentInSection={[
              { fieldTitle: 'Belviq:', fieldValue: selectedPacket?.belviq },
              {
                fieldTitle: 'Belviq Start Date:',
                fieldValue: selectedPacket?.belviqStartDate,
              },
              {
                fieldTitle: 'Belviq End Date:',
                fieldValue: selectedPacket?.belviqEndDate,
              },
              {
                fieldTitle: 'Belviq Weight Loss:',
                fieldValue: selectedPacket?.belviqWeightLoss,
              },
              {
                fieldTitle: 'Belviq Reason For Stopping:',
                fieldValue: selectedPacket?.belviqReasonForStopping,
              },
              {
                fieldTitle: 'Belviq Reason For Regain:',
                fieldValue: selectedPacket?.belviqReasonForRegain,
              },
            ]}
          />
          <InformationSection
            title="Dexatrim:"
            contentInSection={[
              { fieldTitle: 'Dexatrim:', fieldValue: selectedPacket?.dexatrim },
              {
                fieldTitle: 'Dexatrim Start Date:',
                fieldValue: selectedPacket?.dexatrimStartDate,
              },
              {
                fieldTitle: 'Dexatrim End Date:',
                fieldValue: selectedPacket?.dexatrimEndDate,
              },
              {
                fieldTitle: 'Dexatrim Weight Loss:',
                fieldValue: selectedPacket?.dexatrimWeightLoss,
              },
              {
                fieldTitle: 'Dexatrim Reason For Stopping:',
                fieldValue: selectedPacket?.dexatrimReasonForStopping,
              },
              {
                fieldTitle: 'Dexatrim Reason For Regain:',
                fieldValue: selectedPacket?.dexatrimReasonForRegain,
              },
            ]}
          />
          <InformationSection
            title="Herbal Weight Loss:"
            contentInSection={[
              {
                fieldTitle: 'Herbal Weight Loss:',
                fieldValue: selectedPacket?.herbalWeightLoss,
              },
              {
                fieldTitle: 'Herbal Weight Loss Start Date:',
                fieldValue: selectedPacket?.herbalWeightLossStartDate,
              },
              {
                fieldTitle: 'Herbal Weight Loss End Date:',
                fieldValue: selectedPacket?.herbalWeightLossEndDate,
              },
              {
                fieldTitle: 'Herbal Weight Loss Weight Loss:',
                fieldValue: selectedPacket?.herbalWeightLossWeightLoss,
              },
              {
                fieldTitle: 'Herbal Weight Loss Reason For Stopping:',
                fieldValue: selectedPacket?.herbalWeightLossReasonForStopping,
              },
              {
                fieldTitle: 'Herbal Weight Loss Reason For Regain:',
                fieldValue: selectedPacket?.herbalWeightLossReasonForRegain,
              },
            ]}
          />
          <InformationSection
            title="Meridia:"
            contentInSection={[
              { fieldTitle: 'Meridia:', fieldValue: selectedPacket?.meridia },
              {
                fieldTitle: 'Meridia Start Date:',
                fieldValue: selectedPacket?.meridiaStartDate,
              },
              {
                fieldTitle: 'Meridia End Date:',
                fieldValue: selectedPacket?.meridiaEndDate,
              },
              {
                fieldTitle: 'Meridia Weight Loss:',
                fieldValue: selectedPacket?.meridiaWeightLoss,
              },
              {
                fieldTitle: 'Meridia Reason For Stopping:',
                fieldValue: selectedPacket?.meridiaReasonForStopping,
              },
              {
                fieldTitle: 'Meridia Reason For Regain:',
                fieldValue: selectedPacket?.meridiaReasonForRegain,
              },
            ]}
          />
          <InformationSection
            title="Phenfen:"
            contentInSection={[
              { fieldTitle: 'Phenfen:', fieldValue: selectedPacket?.phenfen },
              {
                fieldTitle: 'Phenfen Start Date:',
                fieldValue: selectedPacket?.phenfenStartDate,
              },
              {
                fieldTitle: 'Phenfen End Date:',
                fieldValue: selectedPacket?.phenfenEndDate,
              },
              {
                fieldTitle: 'Phenfen Weight Loss:',
                fieldValue: selectedPacket?.phenfenWeightLoss,
              },
              {
                fieldTitle: 'Phenfen Reason For Stopping:',
                fieldValue: selectedPacket?.phenfenReasonForStopping,
              },
              {
                fieldTitle: 'Phenfen Reason For Regain:',
                fieldValue: selectedPacket?.phenfenReasonForRegain,
              },
            ]}
          />
          <InformationSection
            title="Qsymia:"
            contentInSection={[
              { fieldTitle: 'Qsymia:', fieldValue: selectedPacket?.qsymia },
              {
                fieldTitle: 'Qsymia Start Date:',
                fieldValue: selectedPacket?.qsymiaStartDate,
              },
              {
                fieldTitle: 'Qsymia End Date:',
                fieldValue: selectedPacket?.qsymiaEndDate,
              },
              {
                fieldTitle: 'Qsymia Weight Loss:',
                fieldValue: selectedPacket?.qsymiaWeightLoss,
              },
              {
                fieldTitle: 'Qsymia Reason For Stopping:',
                fieldValue: selectedPacket?.qsymiaReasonForStopping,
              },
              {
                fieldTitle: 'Qsymia Reason For Regain:',
                fieldValue: selectedPacket?.qsymiaReasonForRegain,
              },
            ]}
          />
          <InformationSection
            title="Redux:"
            contentInSection={[
              { fieldTitle: 'Redux:', fieldValue: selectedPacket?.redux },
              {
                fieldTitle: 'Redux Start Date:',
                fieldValue: selectedPacket?.reduxStartDate,
              },
              {
                fieldTitle: 'Redux End Date:',
                fieldValue: selectedPacket?.reduxEndDate,
              },
              {
                fieldTitle: 'Redux Weight Loss:',
                fieldValue: selectedPacket?.reduxWeightLoss,
              },
              {
                fieldTitle: 'Redux Reason For Stopping:',
                fieldValue: selectedPacket?.reduxReasonForStopping,
              },
              {
                fieldTitle: 'Redux Reason For Regain:',
                fieldValue: selectedPacket?.reduxReasonForRegain,
              },
            ]}
          />
          <InformationSection
            title="Other Supplements:"
            contentInSection={[
              {
                fieldTitle: 'Other Supplements:',
                fieldValue: selectedPacket?.otherSuppliments,
              },
              {
                fieldTitle: 'Other Supplements Name:',
                fieldValue: selectedPacket?.otherSupplimentsName,
              },
              {
                fieldTitle: 'Other Supplements Start Date:',
                fieldValue: selectedPacket?.otherSupplimentsStartDate,
              },
              {
                fieldTitle: 'Other Supplements End Date:',
                fieldValue: selectedPacket?.otherSupplimentsEndDate,
              },
              {
                fieldTitle: 'Other Supplements Weight Loss:',
                fieldValue: selectedPacket?.otherSupplimentsWeightLoss,
              },
              {
                fieldTitle: 'Other Supplements Reason For Stopping:',
                fieldValue: selectedPacket?.otherSupplimentsReasonForStopping,
              },
              {
                fieldTitle: 'Other Supplements Reason For Regain:',
                fieldValue: selectedPacket?.otherSupplimentsReasonForRegain,
              },
            ]}
          />
          <InformationSection
            title="Home Life and Support:"
            contentInSection={[
              {
                fieldTitle: 'Children Under Eighteen:',
                fieldValue: selectedPacket?.childrenUnderEighteen,
              },
              {
                fieldTitle: 'Children Under Eighteen CheckBox:',
                fieldValue: selectedPacket?.childrenUnderEighteenCheckBox,
              },
              {
                fieldTitle: 'Family Members Obese:',
                fieldValue: selectedPacket?.familyMembersObese,
              },
              { fieldTitle: 'Support:', fieldValue: selectedPacket?.support },
              {
                fieldTitle: 'Support Explanation:',
                fieldValue: selectedPacket?.supportExplination,
              },
            ]}
          />
          <InformationSection
            title="Eating Disorder:"
            contentInSection={[
              {
                fieldTitle: 'Eating Disorder:',
                fieldValue: selectedPacket?.eatingDisorder,
              },
              {
                fieldTitle: 'Anorexia Nervosa:',
                fieldValue: selectedPacket?.anorexiaNervosa,
              },
              {
                fieldTitle: 'Binge Eating:',
                fieldValue: selectedPacket?.bingeEating,
              },
              { fieldTitle: 'Bulimia:', fieldValue: selectedPacket?.bulimia },
              {
                fieldTitle: 'Eating Too Much:',
                fieldValue: selectedPacket?.eatingTooMuch,
              },
            ]}
          />
          <InformationSection
            title="Sleep:"
            contentInSection={[
              {
                fieldTitle: 'Sleep Hours:',
                fieldValue: selectedPacket?.sleepHours,
              },
              {
                fieldTitle: 'Rested When Wake Up:',
                fieldValue: selectedPacket?.restedWhenWakeUp,
              },
              {
                fieldTitle: 'Do You Snore:',
                fieldValue: selectedPacket?.doYouSnore,
              },
              {
                fieldTitle: 'Wear Equipment:',
                fieldValue: selectedPacket?.wearEquipment,
              },
              {
                fieldTitle: 'How Many Nights:',
                fieldValue: selectedPacket?.howManyNights,
              },
              {
                fieldTitle: 'Sleep Wellness:',
                fieldValue: selectedPacket?.sleepWellness,
              },
            ]}
          />

          <InformationSection
            title="Sleeping Habits:"
            contentInSection={[
              {
                fieldTitle: 'Sitting And Reading:',
                fieldValue: selectedPacket?.sittingAndReading,
              },
              {
                fieldTitle: 'Watching TV:',
                fieldValue: selectedPacket?.watchingTv,
              },
              {
                fieldTitle: 'Sitting In Public:',
                fieldValue: selectedPacket?.sittingInPublic,
              },
              {
                fieldTitle: 'Car Passenger:',
                fieldValue: selectedPacket?.carPassanger,
              },
              {
                fieldTitle: 'Lying Down:',
                fieldValue: selectedPacket?.lyingDown,
              },
              {
                fieldTitle: 'Talking To Someone:',
                fieldValue: selectedPacket?.talkingToSomeone,
              },
              {
                fieldTitle: 'Sitting Quietly After Lunch:',
                fieldValue: selectedPacket?.sittingQuietlyAfterLunch,
              },
              {
                fieldTitle: 'In Car While Stopped:',
                fieldValue: selectedPacket?.inCarWhileStopped,
              },
              { fieldTitle: 'Total:', fieldValue: selectedPacket?.total },
              {
                fieldTitle: 'What Describes You on a typical Day:',
                fieldValue: selectedPacket?.typicalDay,
              },
            ]}
          />
          <InformationSection
            title="Exercise:"
            contentInSection={[
              {
                fieldTitle: 'Enjoy Exercise:',
                fieldValue: selectedPacket?.enjoyExercise,
              },
              {
                fieldTitle: 'Gym Membership:',
                fieldValue: selectedPacket?.gymMembership,
              },
              {
                fieldTitle: 'Exercise Equipment:',
                fieldValue: selectedPacket?.exerciseEquipment,
              },
              {
                fieldTitle: 'Exercise Regularly:',
                fieldValue: selectedPacket?.exerciseRegularly,
              },
              {
                fieldTitle: 'Bad Experience Exercise:',
                fieldValue: selectedPacket?.badExperienceExercise,
              },
              { fieldTitle: '6 AM:', fieldValue: selectedPacket?.sixAm },
              { fieldTitle: '9 AM:', fieldValue: selectedPacket?.nineAm },
              { fieldTitle: '12 PM:', fieldValue: selectedPacket?.twelvePm },
              { fieldTitle: '3 PM:', fieldValue: selectedPacket?.threePm },
              { fieldTitle: '6 PM:', fieldValue: selectedPacket?.sixPm },
              { fieldTitle: '9 PM:', fieldValue: selectedPacket?.ninePm },
              {
                fieldTitle: 'Exercise Weekly:',
                fieldValue: selectedPacket?.exerciseWeekly,
              },
              {
                fieldTitle: 'Describe Exercise:',
                fieldValue: selectedPacket?.describeExercise,
              },
              {
                fieldTitle: 'Difficulty Getting Up From Floor:',
                fieldValue: selectedPacket?.difficultyGettingUpFromFloor,
              },
              {
                fieldTitle: 'Type Of Exercise:',
                fieldValue: selectedPacket?.typeOfExercise,
              },
              {
                fieldTitle: 'Exercise Preference:',
                fieldValue: selectedPacket?.exercisePreference,
              },
              {
                fieldTitle: 'Athlete In School:',
                fieldValue: selectedPacket?.athleteInSchool,
              },
              {
                fieldTitle: 'Confident Increase:',
                fieldValue: selectedPacket?.confidentIncrease,
              },
              {
                fieldTitle: 'Major Benefits Of Exercise:',
                fieldValue: selectedPacket?.majorBenefitsOfExercise,
              },
              {
                fieldTitle: 'Exercise Barriers:',
                fieldValue: selectedPacket?.exerciseBarriers,
              },
              {
                fieldTitle: 'Minutes Per Day:',
                fieldValue: selectedPacket?.minutesPerDay,
              },
              {
                fieldTitle: 'Days Per Week:',
                fieldValue: selectedPacket?.daysPerWeek,
              },
            ]}
          />
          <InformationSection
            title="Confidence & Barriers:"
            contentInSection={[
              {
                fieldTitle: 'Confidence Weight Loss Diet:',
                fieldValue: selectedPacket?.confidenceWeightLossDiet,
              },
              {
                fieldTitle: 'Major Barriers Diet:',
                fieldValue: selectedPacket?.majorBarriersDiet,
              },
            ]}
          />

          <InformationSection
            title="Food & Meals:"
            contentInSection={[
              {
                fieldTitle: 'Favorite Foods:',
                fieldValue: selectedPacket?.favoriteFoods,
              },
              {
                fieldTitle: 'Breakfast Type Of Food:',
                fieldValue: selectedPacket?.breakfastTypeOfFood,
              },
              {
                fieldTitle: 'Breakfast Protein Or Carbs:',
                fieldValue: selectedPacket?.breakfastProteinOrCarbs,
              },
              {
                fieldTitle: 'Breakfast Calories:',
                fieldValue: selectedPacket?.breakfastCalories,
              },
              {
                fieldTitle: 'Lunch Type Of Food:',
                fieldValue: selectedPacket?.lunchTypeOfFood,
              },
              {
                fieldTitle: 'Lunch Protein Or Carbs:',
                fieldValue: selectedPacket?.lunchProteinOrCarbs,
              },
              {
                fieldTitle: 'Lunch Calories:',
                fieldValue: selectedPacket?.lunchCalories,
              },
              {
                fieldTitle: 'Dinner Type Of Food:',
                fieldValue: selectedPacket?.dinnerTypeOfFood,
              },
              {
                fieldTitle: 'Dinner Protein Or Carbs:',
                fieldValue: selectedPacket?.dinnerProteinOrCarbs,
              },
              {
                fieldTitle: 'Dinner Calories:',
                fieldValue: selectedPacket?.dinnerCalories,
              },
              {
                fieldTitle: 'Snack One Type Of Food:',
                fieldValue: selectedPacket?.snackOneTypeOfFood,
              },
              {
                fieldTitle: 'Snack One Protein Or Carbs:',
                fieldValue: selectedPacket?.snackOneProteinOrCarbs,
              },
              {
                fieldTitle: 'Snack One Calories:',
                fieldValue: selectedPacket?.snackOneCalories,
              },
              {
                fieldTitle: 'Snack Two Type Of Food:',
                fieldValue: selectedPacket?.snackTwoTypeOfFood,
              },
              {
                fieldTitle: 'Snack Two Protein Or Carbs:',
                fieldValue: selectedPacket?.snackTwoProteinOrCarbs,
              },
              {
                fieldTitle: 'Snack Two Calories:',
                fieldValue: selectedPacket?.snackTwoCalories,
              },
              {
                fieldTitle: 'Coffee Type Of Food:',
                fieldValue: selectedPacket?.coffeeTypeOfFood,
              },
              {
                fieldTitle: 'Coffee Protein Or Carbs:',
                fieldValue: selectedPacket?.coffeeProteinOrCarbs,
              },
              {
                fieldTitle: 'Coffee Calories:',
                fieldValue: selectedPacket?.coffeeCalories,
              },
              {
                fieldTitle: 'Soda Type Of Food:',
                fieldValue: selectedPacket?.sodaTypeOfFood,
              },
              {
                fieldTitle: 'Soda Protein Or Carbs:',
                fieldValue: selectedPacket?.sodaProteinOrCarbs,
              },
              {
                fieldTitle: 'Soda Calories:',
                fieldValue: selectedPacket?.sodaCalories,
              },
              {
                fieldTitle: 'Candy Or Sweets Type Of Food:',
                fieldValue: selectedPacket?.candyOrSweetsTypeOfFood,
              },
              {
                fieldTitle: 'Candy Or Sweets Protein Or Carbs:',
                fieldValue: selectedPacket?.candyOrSweetsProteinOrCarbs,
              },
              {
                fieldTitle: 'Candy Or Sweets Calories:',
                fieldValue: selectedPacket?.candyOrSweetsCalories,
              },
              {
                fieldTitle: 'Other Type Of Food:',
                fieldValue: selectedPacket?.otherTypeOfFood,
              },
              {
                fieldTitle: 'Other Protein Or Carbs:',
                fieldValue: selectedPacket?.otherProteinOrCarbs,
              },
              {
                fieldTitle: 'Other Calories:',
                fieldValue: selectedPacket?.otherCalories,
              },
            ]}
          />
          <InformationSection
            title="Homelife & Support:"
            contentInSection={[
              {
                fieldTitle: 'Number of People Living With:',
                fieldValue: selectedPacket?.numPeopleLiveWith,
              },
              {
                fieldTitle: 'Eat Together:',
                fieldValue: selectedPacket?.eatTogether,
              },
              {
                fieldTitle: 'Who Does Shopping:',
                fieldValue: selectedPacket?.whoDoesShopping,
              },
              {
                fieldTitle: 'Who Does Cooking:',
                fieldValue: selectedPacket?.whoDoesCooking,
              },
              {
                fieldTitle: 'Food Intolerance:',
                fieldValue: selectedPacket?.foodIntolerance,
              },
              {
                fieldTitle: 'Food Intolerance List:',
                fieldValue: selectedPacket?.foodIntoleranceList,
              },
            ]}
          />

          <InformationSection
            title="Eating Habits & Behaviors:"
            contentInSection={[
              {
                fieldTitle: 'Stress Eating:',
                fieldValue: selectedPacket?.stressEating,
              },
              {
                fieldTitle: 'Stress Eating Details:',
                fieldValue: selectedPacket?.stressEatingDetails,
              },
              {
                fieldTitle: 'Binge Eating Experience:',
                fieldValue: selectedPacket?.bingeEatingExperience,
              },
              {
                fieldTitle: 'Binge Eating Details:',
                fieldValue: selectedPacket?.bingeEatingDetails,
              },
              {
                fieldTitle: 'Snacking Experience:',
                fieldValue: selectedPacket?.snackingExperience,
              },
              {
                fieldTitle: 'Snacking Details:',
                fieldValue: selectedPacket?.snackingDetails,
              },
              {
                fieldTitle: 'Eating Middle Of Night Experience:',
                fieldValue: selectedPacket?.eatingMiddleOfNightExperience,
              },
              {
                fieldTitle: 'Eating Middle Of Night Details:',
                fieldValue: selectedPacket?.eatingMiddleOfNightDetails,
              },
              {
                fieldTitle: 'Skipping Meals Experience:',
                fieldValue: selectedPacket?.skippingMealsExperience,
              },
              {
                fieldTitle: 'Skipping Meals Details:',
                fieldValue: selectedPacket?.skippingMealsDetails,
              },
              {
                fieldTitle: 'Eating Out Experience:',
                fieldValue: selectedPacket?.eatingOutExperience,
              },
              {
                fieldTitle: 'Eating Out Details:',
                fieldValue: selectedPacket?.eatingOutDetails,
              },
              {
                fieldTitle: 'Eating In Front Of TV Experience:',
                fieldValue: selectedPacket?.eatingInFrontOfTVExperience,
              },
              {
                fieldTitle: 'Eating In Front Of TV Details:',
                fieldValue: selectedPacket?.eatingInFrontOfTVDetails,
              },
              {
                fieldTitle: 'Eating At Desk Experience:',
                fieldValue: selectedPacket?.eatingAtDeskExperience,
              },
              {
                fieldTitle: 'Eating At Desk Details:',
                fieldValue: selectedPacket?.eatingAtDeskDetails,
              },
              {
                fieldTitle: 'Portion Size Experience:',
                fieldValue: selectedPacket?.portionSizeExperience,
              },
              {
                fieldTitle: 'Portion Size Details:',
                fieldValue: selectedPacket?.portionSizeDetails,
              },
              {
                fieldTitle: 'Eating Too Fast Experience:',
                fieldValue: selectedPacket?.eatingTooFastExperience,
              },
              {
                fieldTitle: 'Eating Too Fast Details:',
                fieldValue: selectedPacket?.eatingTooFastDetails,
              },
              {
                fieldTitle: 'Not Satisfied Experience:',
                fieldValue: selectedPacket?.notSatifiedExperience,
              },
              {
                fieldTitle: 'Not Satisfied Details:',
                fieldValue: selectedPacket?.notSatifiedDetails,
              },
            ]}
          />

          <InformationSection
            title="Food & Beverage Consumption:"
            contentInSection={[
              {
                fieldTitle: 'Regular Soda:',
                fieldValue: selectedPacket?.regularSoda,
              },
              {
                fieldTitle: 'Regular Soda Count:',
                fieldValue: selectedPacket?.regularSodaCount,
              },
              { fieldTitle: 'Juice:', fieldValue: selectedPacket?.juice },
              {
                fieldTitle: 'Juice Count:',
                fieldValue: selectedPacket?.juiceCount,
              },
              {
                fieldTitle: 'Sweet Tea:',
                fieldValue: selectedPacket?.sweetTea,
              },
              {
                fieldTitle: 'Sweet Tea Count:',
                fieldValue: selectedPacket?.sweetTeaCount,
              },
              {
                fieldTitle: 'Alcohol Beverage:',
                fieldValue: selectedPacket?.alchoholBeverage,
              },
              {
                fieldTitle: 'Alcohol Beverage List:',
                fieldValue: selectedPacket?.alchoholBeverageList,
              },
              {
                fieldTitle: 'Fried Foods:',
                fieldValue: selectedPacket?.friedFoods,
              },
              {
                fieldTitle: 'Fried Foods Count:',
                fieldValue: selectedPacket?.friedFoodsCount,
              },
              {
                fieldTitle: 'Fruit Servings:',
                fieldValue: selectedPacket?.fruitServings,
              },
              {
                fieldTitle: 'Vegetables Servings:',
                fieldValue: selectedPacket?.vegetablesServings,
              },
              {
                fieldTitle: 'Whole Grains Servings:',
                fieldValue: selectedPacket?.wholeGrainsServings,
              },
              {
                fieldTitle: 'Low Fat Dairy Servings:',
                fieldValue: selectedPacket?.lowFatDairyServings,
              },
              {
                fieldTitle: 'Lean Protein Servings:',
                fieldValue: selectedPacket?.leanProteinServings,
              },
              {
                fieldTitle: 'Days Per Week Explanation:',
                fieldValue: selectedPacket?.daysPerWeekExplination,
              },
            ]}
          />

          <InformationSection
            title="Medical History & Medications:"
            contentInSection={[
              {
                fieldTitle: 'Medical History:',
                fieldValue: selectedPacket?.medicalHistory,
              },
              {
                fieldTitle: 'Medications Taken:',
                fieldValue: selectedPacket?.medicationsTaken,
              },
              {
                fieldTitle: 'Medications Taken List:',
                fieldValue: selectedPacket?.medicationsTakenList,
              },
            ]}
          />
        </div>
      )}
    </div>
  )
}

export default WeightLossPacketFullSubmission
