import React, { useState, useEffect, useRef } from 'react'
import MainButton from '../Buttons/MainButton'
import { InformationSection } from './InformationSection'
import { jsPDF } from 'jspdf'
import { PacketInfo } from '../../types/NewPatientPacketTypes'

type PacketInfoKeys = keyof PacketInfo

function NewPatientPacketFullSubmission({
  selectedPacket,
}: {
  selectedPacket: PacketInfo
}) {
  const pdfRef = useRef(null)
  const pdf = new jsPDF()

  // TODO:
  // - Grab the submission of the New Patient Packet by user email
  // - Map through all the information in the submission

  return (
    <div className="w-95 flex flex-col items-center justify-center">
      {/* This Main Button allows the user to access a PDF version of their New Patient Packet in case they wanted to print. */}
      <MainButton
        buttonText="Export PDF"
        onClick={async () => {
          var doc = 1
          if (Array.isArray(selectedPacket) == false) {
            Object.keys(selectedPacket).map(async (item: any) => {
              selectedPacket[item as PacketInfoKeys]
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
      {/* This is the div that the PDF will be rendered in. */}
      {Array.isArray(selectedPacket) == false && (
        <div
          className=" flex w-full flex-col items-center justify-center"
          ref={pdfRef}
        >
          <InformationSection
            title="Patient Information"
            contentInSection={[
              {
                fieldTitle: 'First Name:',
                fieldValue: selectedPacket.firstName,
              },
              {
                fieldTitle: 'Last Name:',
                fieldValue: selectedPacket.lastName,
              },
              {
                fieldTitle: 'Preferred Name:',
                fieldValue: selectedPacket.preferredName,
              },
              {
                fieldTitle: 'Birth Date:',
                fieldValue: selectedPacket.BirthDateValue,
              },
              {
                fieldTitle: 'Phone Number:',
                fieldValue: selectedPacket.phoneNumberValue,
              },
              {
                fieldTitle: 'Home Phone:',
                fieldValue: selectedPacket.homePhone,
              },
              {
                fieldTitle: 'Email:',
                fieldValue: selectedPacket.emailValue,
              },
              {
                fieldTitle: 'Address:',
                fieldValue: selectedPacket.addressValue,
              },
              {
                fieldTitle: 'Address 2:',
                fieldValue: selectedPacket.addressValue2,
              },
              {
                fieldTitle: 'City:',
                fieldValue: selectedPacket.cityValue,
              },
              {
                fieldTitle: 'State:',
                fieldValue: selectedPacket.USStateValue,
              },
              {
                fieldTitle: 'Zip Code:',
                fieldValue: selectedPacket.zipCodeValue,
              },
              {
                fieldTitle: 'Social Security Number:',
                fieldValue: selectedPacket.socialValue,
              },
              selectedPacket.isCheckedMale && {
                fieldTitle: 'Gender:',
                fieldValue: 'Male',
                realValue: selectedPacket.isCheckedMale,
              },
              selectedPacket.isCheckedFemale && {
                fieldTitle: 'Gender:',
                fieldValue: 'Female',
                realValue: selectedPacket.isCheckedFemale,
              },
              selectedPacket.isCheckedOther && {
                fieldTitle: 'Gender:',
                fieldValue: 'Other',
                realValue: selectedPacket.isCheckedOther,
              },
              selectedPacket.single && {
                fieldTitle: 'Marital Status:',
                fieldValue: 'Single',
                realValue: selectedPacket.single,
              },
              selectedPacket.married && {
                fieldTitle: 'Marital Status:',
                fieldValue: 'Married',
                realValue: selectedPacket.married,
              },
              selectedPacket.divorced && {
                fieldTitle: 'Marital Status:',
                fieldValue: 'Divorced',
                realValue: selectedPacket.divorced,
              },
              selectedPacket.widowed && {
                fieldTitle: 'Marital Status:',
                fieldValue: 'Widowed',
                realValue: selectedPacket.widowed,
              },
              selectedPacket.separated && {
                fieldTitle: 'Marital Status:',
                fieldValue: 'Separated',
                realValue: selectedPacket.separated,
              },
              selectedPacket.withPartner && {
                fieldTitle: 'Marital Status:',
                fieldValue: 'With Partner',
                realValue: selectedPacket.withPartner,
              },
              {
                fieldTitle: 'May we take your picture:',
                fieldValue: selectedPacket.MayWeTakeYourPicture,
              },
              {
                fieldTitle: 'Ethnicity',
                fieldValue: selectedPacket.Ethnicity,
              },
              {
                fieldTitle: 'How did they hear about us:',
                fieldValue: selectedPacket.HowDidTheyHearAboutUs,
              },
            ]}
          />
          {selectedPacket.pictureOfFrontOfDriverLicense && (
            <figure className="flex flex-col items-center justify-center">
              <figcaption className=" text-2xl font-bold">
                Driver License
              </figcaption>
              <img src={selectedPacket.pictureOfFrontOfDriverLicense} />
            </figure>
          )}
          {selectedPacket.pictureOfTheirFace && (
            <figure className="flex flex-col items-center justify-center">
              <figcaption className=" text-2xl font-bold">
                Picture Of Their Face
              </figcaption>
              <img src={selectedPacket.pictureOfTheirFace} />
            </figure>
          )}
          <InformationSection
            title="Emergency Contact Information"
            contentInSection={[
              {
                fieldTitle: 'Name:',
                fieldValue: selectedPacket.nameOfEmergencyContact,
              },
              {
                fieldTitle: 'Relationship:',
                fieldValue: selectedPacket.EmergencyContactRelationShip,
              },
              {
                fieldTitle: 'Phone Number:',
                fieldValue: selectedPacket.EmergencyContactPhoneNumber,
              },
            ]}
          />
          <InformationSection
            title="Insurance Information"
            contentInSection={[
              {
                fieldTitle: 'How do they wish to pay:',
                fieldValue: selectedPacket.howDoTheyWishToPay,
              },
              selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                fieldTitle: 'Primary Insurance Company:',
                fieldValue: selectedPacket.primaryInsurance,
              },
              selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                fieldTitle: 'Primary Insurance Policy Number:',
                fieldValue: selectedPacket.primaryInsuranceID,
              },
              selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                fieldTitle: 'Primary Insurance Group Number:',
                fieldValue: selectedPacket.primaryInsuranceGroup,
              },
              selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                fieldTitle: 'Primary Insurance Phone Number:',
                fieldValue: selectedPacket.primaryInsurancePhone,
              },
              selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                fieldTitle: 'Primary Insurance Address:',
                fieldValue: selectedPacket.primaryInsuranceAddress1,
              },
              selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                fieldTitle: 'Primary Insurance Address 2:',
                fieldValue: selectedPacket.primaryInsuranceAddress2,
              },
              selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                fieldTitle: 'Primary Insurance City:',
                fieldValue: selectedPacket.primaryInsuranceCity,
              },
              selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                fieldTitle: 'Primary Insurance State:',
                fieldValue: selectedPacket.primaryInsuranceState,
              },
              selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                fieldTitle: 'Primary Insurance Zip Code:',
                fieldValue: selectedPacket.primaryInsuranceZipCode,
              },
              selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                fieldTitle: 'Primary Insurance Subscriber Name:',
                fieldValue: selectedPacket.primarySubscribersName,
              },
              selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                fieldTitle: 'Primary Insurance Subscriber DOB:',
                fieldValue: selectedPacket.primarySubscribersDOB,
              },

              selectedPacket.secondaryInsurance != '' && {
                fieldTitle: 'Secondary Insurance Company:',
                fieldValue: selectedPacket.secondaryInsurance,
              },
              selectedPacket.secondaryInsuranceID != '' && {
                fieldTitle: 'Secondary Insurance Policy Number:',
                fieldValue: selectedPacket.secondaryInsuranceID,
              },
              selectedPacket.secondaryInsuranceGroup != '' && {
                fieldTitle: 'Secondary Insurance Group Number:',
                fieldValue: selectedPacket.secondaryInsuranceGroup,
              },
              selectedPacket.secondaryInsurancePhone != '' && {
                fieldTitle: 'Secondary Insurance Phone Number:',
                fieldValue: selectedPacket.secondaryInsurancePhone,
              },
              selectedPacket.secondaryInsuranceAddress1 != '' && {
                fieldTitle: 'Secondary Insurance Address:',
                fieldValue: selectedPacket.secondaryInsuranceAddress1,
              },
              selectedPacket.secondaryInsuranceAddress2 != '' && {
                fieldTitle: 'Secondary Insurance Address 2:',
                fieldValue: selectedPacket.secondaryInsuranceAddress2,
              },
              selectedPacket.secondaryInsuranceCity != '' && {
                fieldTitle: 'Secondary Insurance City:',
                fieldValue: selectedPacket.secondaryInsuranceCity,
              },
              selectedPacket.secondaryInsuranceState != '' && {
                fieldTitle: 'Secondary Insurance State:',
                fieldValue: selectedPacket.secondaryInsuranceState,
              },
              selectedPacket.secondaryInsuranceZipCode != '' && {
                fieldTitle: 'Secondary Insurance Zip Code:',
                fieldValue: selectedPacket.secondaryInsuranceZipCode,
              },
              selectedPacket.secondarySubscribersName != '' && {
                fieldTitle: 'Secondary Insurance Subscriber Name:',
                fieldValue: selectedPacket.secondarySubscribersName,
              },
              selectedPacket.secondarySubscribersDOB != '' && {
                fieldTitle: 'Secondary Insurance Subscriber DOB:',
                fieldValue: selectedPacket.secondarySubscribersDOB,
              },
            ]}
          />
          {selectedPacket.primaryPictureOfInsuranceCardFront && (
            <figure className="flex flex-col items-center justify-center">
              <figcaption className=" text-2xl font-bold">
                Insurance Card Front
              </figcaption>
              <img src={selectedPacket.primaryPictureOfInsuranceCardFront} />
            </figure>
          )}
          {selectedPacket.primaryPictureOfInsuranceCardBack && (
            <figure className="flex flex-col items-center justify-center">
              <figcaption className=" text-2xl font-bold">
                Insurance Card Back
              </figcaption>
              <img src={selectedPacket.primaryPictureOfInsuranceCardBack} />
            </figure>
          )}
          {selectedPacket.secondaryPictureOfInsuranceCardFront && (
            <figure className="flex flex-col items-center justify-center">
              <figcaption className=" text-2xl font-bold">
                Secondary Insurance Card Front
              </figcaption>
              <img src={selectedPacket.secondaryPictureOfInsuranceCardFront} />
            </figure>
          )}
          {selectedPacket.secondaryPictureOfInsuranceCardBack && (
            <figure className="flex flex-col items-center justify-center">
              <figcaption className=" text-2xl font-bold">
                Secondary Insurance Card Back
              </figcaption>
              <img src={selectedPacket.secondaryPictureOfInsuranceCardBack} />
            </figure>
          )}
          <InformationSection
            title="Retail pharmacy information"
            contentInSection={[
              {
                fieldTitle: 'Name of Pharmacy:',
                fieldValue: selectedPacket.retailPharmacyName,
              },
              {
                fieldTitle: 'Pharmacy Cross Street One:',
                fieldValue: selectedPacket.retailPharmacyCrossStreet1,
              },
              {
                fieldTitle: 'Pharmacy Cross Street Two:',
                fieldValue: selectedPacket.retailPharmacyCrossStreet2,
              },
              {
                fieldTitle: 'Pharmacy Phone Number:',
                fieldValue: selectedPacket.retailPharmacyPhoneNumber,
              },
              {
                fieldTitle: 'Pharmacy Fax Number:',
                fieldValue: selectedPacket.retailPharmacyFaxNumber,
              },
            ]}
          />
          <InformationSection
            title="Mail order pharmacy information"
            contentInSection={[
              {
                fieldTitle: 'Name of Pharmacy:',
                fieldValue: selectedPacket.mailOrderPharmacyName,
              },
              {
                fieldTitle: 'Pharmacy Cross Street One:',
                fieldValue: selectedPacket.mailOrderPharmacyAddress1,
              },
              {
                fieldTitle: 'Pharmacy Cross Street Two:',
                fieldValue: selectedPacket.mailOrderPharmacyAddress2,
              },
              {
                fieldTitle: 'Pharmacy Phone Number:',
                fieldValue: selectedPacket.mailOrderPharmacyPhoneNumber,
              },
            ]}
          />
          <h3 className=" my-10 text-4xl font-bold text-[#1969f4] underline">
            Patient Medical Information
          </h3>
          <InformationSection
            title="Allergies"
            contentInSection={[
              {
                fieldTitle: 'Are you allergic to Latex:',
                fieldValue: selectedPacket.areYouAllergicToLatex,
              },
              {
                fieldTitle: 'Are you allergic to Shellfish:',
                fieldValue: selectedPacket.areYouAllergicToSelfish,
              },
              {
                fieldTitle: 'Are you allergic to Iodine:',
                fieldValue: selectedPacket.areYouAllergicToIodine,
              },
              {
                fieldTitle: 'Drug Allergies:',
                fieldValue: selectedPacket.PatientDrugAllergies,
              },
            ]}
          />
          <InformationSection
            title="PAP History"
            contentInSection={[
              {
                fieldTitle: 'Date of last PAP:',
                fieldValue: selectedPacket.dateOfLastPAP,
              },
              {
                fieldTitle: 'Was PAP Normal:',
                fieldValue: selectedPacket.wasPapNormalOrAbnormal,
              },
              {
                fieldTitle: 'Date of last Mammogram:',
                fieldValue: selectedPacket.dateOfLastMammogram,
              },
              {
                fieldTitle: 'Was Mammogram Normal:',
                fieldValue: selectedPacket.wasMammogramNormalOrAbnormal,
              },
            ]}
          />
          <InformationSection
            title="PSA History"
            contentInSection={[
              {
                fieldTitle: 'Date of last PAS:',
                fieldValue: selectedPacket.dateOfLastPSA,
              },
              {
                fieldTitle: 'Was PAS Normal:',
                fieldValue: selectedPacket.wasPSANormalOrAbnormal,
              },
            ]}
          />
          <InformationSection
            title="Medical History"
            contentInSection={[
              {
                fieldTitle: 'All Major Illnesses:',
                fieldValue: selectedPacket.allMajorIllnesses,
              },
              {
                fieldTitle: 'All Major Surgeries:',
                fieldValue: selectedPacket.allMajorSurgeriesAndHospitalizations,
              },
              {
                fieldTitle: 'All History of Disease:',
                fieldValue: selectedPacket.allMedicalHistoryOfDisease,
              },
              {
                fieldTitle: 'All Medications:',
                fieldValue: selectedPacket.listOfAllCurrentMedications,
              },
              {
                fieldTitle: 'Have they had a Bone Density Screening :',
                fieldValue: selectedPacket.boneDensityScreening,
              },
              selectedPacket.boneDensityScreening == 'Yes' && {
                fieldTitle: 'Date of last Bone Density Screening:',
                fieldValue: selectedPacket.BoneDensityScreeningDate,
              },
              selectedPacket.boneDensityScreening == 'Yes' && {
                fieldTitle: 'Was Bone Density Screening Normal:',
                fieldValue:
                  selectedPacket.wasBoneDensityScreeningNormalOrAbnormal,
              },
              {
                fieldTitle: 'Have they had a Colonoscopy:',
                fieldValue: selectedPacket.colonoscopyScreening,
              },
              selectedPacket.colonoscopy == 'Yes' && {
                fieldTitle: 'Date of last Colonoscopy:',
                fieldValue: selectedPacket.dateOfLastColonoscopyScreening,
              },
              selectedPacket.colonoscopy == 'Yes' && {
                fieldTitle: 'Was Colonoscopy Normal:',
                fieldValue:
                  selectedPacket.wasColonoscopyScreeningNormalOrAbnormal,
              },
              {
                fieldTitle: 'Have they ever smoked:',
                fieldValue: selectedPacket.haveTheyEverSmoked,
              },
              selectedPacket.haveTheyEverSmoked == 'Yes' && {
                fieldTitle: 'How many packs per day:',
                fieldValue: selectedPacket.howManyPacksPerDay,
              },
              {
                fieldTitle: 'Any Other Tobacco Or E-Cigarettes:',
                fieldValue: selectedPacket.anyOtherTobaccoOrEcigarettes,
              },
              selectedPacket.anyOtherTobaccoOrEcigarettes == 'Yes' && {
                fieldTitle: 'Describe other tobacco use:',
                fieldValue: selectedPacket.describeOtherTobaccoUse,
              },
              {
                fieldTitle: 'Do they drink coffee:',
                fieldValue: selectedPacket.doYouDrinkCoffee,
              },
              selectedPacket.doYouDrinkCoffee == 'Yes' && {
                fieldTitle: 'How many cups per day:',
                fieldValue: selectedPacket.howManyCupsPerDay,
              },
              {
                fieldTitle: 'Do they drink alcohol:',
                fieldValue: selectedPacket.doYouDrinkAlcohol,
              },
              selectedPacket.doYouDrinkAlcohol == 'Yes' && {
                fieldTitle: 'How many drinks per week:',
                fieldValue: selectedPacket.howManyDrinksPerWeek,
              },
              {
                fieldTitle: 'Do they use recreational drugs:',
                fieldValue: selectedPacket.doYoCurrentlyUseRecreationalDrugs,
              },
              selectedPacket.doYoCurrentlyUseRecreationalDrugs == 'Yes' && {
                fieldTitle: 'Describe recreational drug use:',
                fieldValue: selectedPacket.describeRecreationalDrugUse,
              },
              {
                fieldTitle: 'Do they use illegal street drugs:',
                fieldValue: selectedPacket.doYouUseIllegaLStreetDrugs,
              },
              selectedPacket.doYouUseIllegaLStreetDrugs == 'Yes' && {
                fieldTitle: 'Describe illegal street drug use:',
                fieldValue: selectedPacket.describeIllegalStreetDrugUse,
              },
            ]}
          />
          <InformationSection
            title="Mental Health"
            contentInSection={[
              {
                fieldTitle: 'Do you feel depressed:',
                fieldValue: selectedPacket.doYouFeelDepressed,
              },
              selectedPacket.doYouFeelDepressed == 'Yes' && {
                fieldTitle: 'Do you cry frequently:',
                fieldValue: selectedPacket.doYouCryFrequently,
              },
              selectedPacket.doYouFeelDepressed == 'Yes' && {
                fieldTitle: 'Do you have little interest in doing things:',
                fieldValue: selectedPacket.doYouHaveLittleInterestInDoingThings,
              },
              selectedPacket.doYouFeelDepressed == 'Yes' && {
                fieldTitle: 'Do you feel hopeless:',
                fieldValue: selectedPacket.doYouFeelHopelessDownOrDepressed,
              },
              selectedPacket.doYouFeelDepressed == 'Yes' && {
                fieldTitle:
                  'Are you having trouble falling asleep, or are sleeping too much:',
                fieldValue:
                  selectedPacket.doYouHaveTroubleFallingAsleepOrSleepingTooMuch,
              },

              selectedPacket.doYouFeelDepressed == 'Yes' && {
                fieldTitle: 'Do you feel tired or have little energy:',
                fieldValue: selectedPacket.doYouFeelTiredOrHaveLittleEnergy,
              },
              selectedPacket.doYouFeelDepressed == 'Yes' && {
                fieldTitle: 'Do you have poor appetite or overeat:',
                fieldValue: selectedPacket.doYouHavAPoorAppetiteOrOverEating,
              },
              selectedPacket.doYouFeelDepressed == 'Yes' && {
                fieldTitle: 'Do you feel bad about yourself:',
                fieldValue: selectedPacket.doYouFeelBadAboutYourself,
              },
              selectedPacket.doYouFeelDepressed == 'Yes' && {
                fieldTitle: 'Do you have trouble concentrating:',
                fieldValue: selectedPacket.troubleConcentrating,
              },
              selectedPacket.doYouFeelDepressed == 'Yes' && {
                fieldTitle:
                  'Do you move or speak so slowly that other people could have noticed:',
                fieldValue: selectedPacket.doYouMoveOrSpeakSlowly,
              },
              selectedPacket.doYouFeelDepressed == 'Yes' && {
                fieldTitle: "Do you think you'd be better dead:",
                fieldValue: selectedPacket.thoughtsYouWouldBeBetterOffDead,
              },
              selectedPacket.doYouFeelDepressed == 'Yes' && {
                fieldTitle: 'Is stress a major problem:',
                fieldValue: selectedPacket.isStressAMajorProblem,
              },
              selectedPacket.doYouFeelDepressed == 'Yes' && {
                fieldTitle: 'Do you panic when stressed:',
                fieldValue: selectedPacket.doYouPanicWhenStressed,
              },
              selectedPacket.doYouFeelDepressed == 'Yes' && {
                fieldTitle: 'Have you attempted suicide:',
                fieldValue: selectedPacket.haveYouEverAttemptedSuicide,
              },
            ]}
          />
          <InformationSection
            title="Family History"
            contentInSection={[
              {
                fieldTitle: 'Family Alcohol Disorder:',
                fieldValue: selectedPacket.familyMedicalAlcoholismAddiction,
              },

              {
                fieldTitle: 'Family Bleeding Disorder:',
                fieldValue: selectedPacket.familyMedicalBleedingDisorders,
              },
              {
                fieldTitle: 'Family Cancer:',
                fieldValue: selectedPacket.familyMedicalCancer,
              },
              {
                fieldTitle: 'Family Diabetes:',
                fieldValue: selectedPacket.familyMedicalDiabetes,
              },
              {
                fieldTitle: 'Family hHeart Attack:',
                fieldValue: selectedPacket.familyMedicalHeartAttack,
              },
              {
                fieldTitle: 'Family High Blood Pressure:',
                fieldValue: selectedPacket.familyMedicalHighBloodPressure,
              },
              {
                fieldTitle: 'Family High Cholesterol:',
                fieldValue: selectedPacket.familyMedicalHighCholesterol,
              },
              {
                fieldTitle: 'Family Kidney Disease:',
                fieldValue: selectedPacket.familyMedicalKidneyDisease,
              },
              {
                fieldTitle: 'Family Mental Illness:',
                fieldValue: selectedPacket.familyMedicalMentalIllness,
              },
              {
                fieldTitle: 'Family Stroke:',
                fieldValue: selectedPacket.familyMedicalStroke,
              },
              {
                fieldTitle: 'Family Tuberculosis:',
                fieldValue: selectedPacket.familyMedicalTuberculosis,
              },
              {
                fieldTitle: 'Father Still Living:',
                fieldValue: selectedPacket.isYourFatherStillLiving,
              },
              {
                fieldTitle: 'Mother Still Living:',
                fieldValue: selectedPacket.isYourMotherStillLiving,
              },
            ]}
          />
          <InformationSection
            title="Signature"
            contentInSection={[
              {
                fieldTitle: 'Medical Review Signature:',
                fieldValue: selectedPacket.patientMedicalReviewSignature,
              },
              {
                fieldTitle: 'Medical Review Signature Date:',
                fieldValue: selectedPacket.patientMedicalReviewSignatureDate,
              },
              selectedPacket.PatientMedicalReviewSignatureCheckBox && {
                fieldTitle: 'Approval of Electronic Signature:',
                fieldValue: 'Yes',
              },
              !selectedPacket.PatientMedicalReviewSignatureCheckBox && {
                fieldTitle: 'Approval of Electronic Signature:',
                fieldValue: 'No',
              },
            ]}
          />
          <InformationSection
            title="HIPAA"
            contentInSection={[
              {
                fieldTitle: 'HIPAA Signature:',
                fieldValue: selectedPacket.hippa.hippaSignature,
              },
              {
                fieldTitle: 'HIPAA Signature Date:',
                fieldValue: selectedPacket.hippa.signatureDate,
              },
              selectedPacket.hippa.signatureCheckBoxConsent && {
                fieldTitle: 'Approval of Electronic Signature:',
                fieldValue: 'Yes',
              },

              !selectedPacket.hippa.signatureCheckBoxConsent && {
                fieldTitle: 'Approval of Electronic Signature:',
                fieldValue: 'No',
              },
              {
                fieldTitle: 'Name 1:',
                fieldValue: selectedPacket.hippa.name,
              },
              {
                fieldTitle: 'RelationShip 1:',
                fieldValue: selectedPacket.hippa.relationShip,
              },
              {
                fieldTitle: 'Name 2:',
                fieldValue: selectedPacket.hippa.name2,
              },
              {
                fieldTitle: 'RelationShip 2:',
                fieldValue: selectedPacket.hippa.relationShip2,
              },
              {
                fieldTitle: 'Name 3:',
                fieldValue: selectedPacket.hippa.name3,
              },
              {
                fieldTitle: 'RelationShip 3:',
                fieldValue: selectedPacket.hippa.relationShip3,
              },
              {
                fieldTitle: 'Name 4:',
                fieldValue: selectedPacket.hippa.name4,
              },
              {
                fieldTitle: 'RelationShip 4:',
                fieldValue: selectedPacket.hippa.relationShip4,
              },
            ]}
          />
          <InformationSection
            title="Advanced Directives"
            contentInSection={[
              {
                fieldTitle: 'Living Will:',
                fieldValue: selectedPacket.AdvancedDirectives.signature,
              },
              {
                fieldTitle: 'Living Will Date:',
                fieldValue: selectedPacket.AdvancedDirectives.date,
              },
              selectedPacket.AdvancedDirectives
                .agreeThatTheirSignatureIsValid && {
                fieldTitle: 'Approval of Electronic Signature:',
                fieldValue: 'Yes',
              },
              !selectedPacket.AdvancedDirectives
                .agreeThatTheirSignatureIsValid && {
                fieldTitle: 'Approval of Electronic Signature:',
                fieldValue: 'No',
              },
              {
                fieldTitle: 'Health Care Power of Attorney:',
                fieldValue:
                  selectedPacket.AdvancedDirectives.healthCarePowerOfAttorney,
              },
              {
                fieldTitle: 'Health Care Power of Attorney Name:',
                fieldValue:
                  selectedPacket.AdvancedDirectives
                    .healthCarePowerOfAttorneyName,
              },
              {
                fieldTitle: 'Phone Number:',
                fieldValue: selectedPacket.AdvancedDirectives.phoneNumber,
              },
              {
                fieldTitle: 'Pre Hospital Medical Directives:',
                fieldValue:
                  selectedPacket.AdvancedDirectives
                    .preHospitalMedicalDirectives,
              },
              {
                fieldTitle: 'Do They Have A Living Will:',
                fieldValue:
                  selectedPacket.AdvancedDirectives.doYouHaveALivingWill,
              },
            ]}
          />
          <InformationSection
            title="Financial policy"
            contentInSection={[
              {
                fieldTitle: 'Financial Policy Signature:',
                fieldValue: selectedPacket.financialPolicySignature,
              },
              {
                fieldTitle: 'Financial Policy Signature Date:',
                fieldValue: selectedPacket.financialPolicySignatureDate,
              },
              selectedPacket.financialPolicySignatureCheckBox && {
                fieldTitle: 'Approval of Electronic Signature:',
                fieldValue: 'Yes',
              },
              !selectedPacket.financialPolicySignatureCheckBox && {
                fieldTitle: 'Approval of Electronic Signature:',
                fieldValue: 'No',
              },
            ]}
          />
        </div>
      )}
    </div>
  )
}

export default NewPatientPacketFullSubmission
