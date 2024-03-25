import React from 'react'

const FINANCIALPOLICY: React.FC<{}> = () => {
  return (
    <div className=" flex w-full flex-col items-center justify-center text-center">
      <h3 className=" my-4 text-center text-2xl">FINANCIAL POLICY</h3>
      <fieldset>
        <div className=" flex h-[500px]  w-[400px] scroll-m-20 flex-col justify-center overflow-y-auto rounded-[10px] border-2 border-[#959595] p-10 ">
          <div className=" h-full w-full">
            <p className=" my-5">
              All insurance providers have different coverage and benefit levels
              depending on what you have chosen to purchase or what your
              employer has chosen. It is your responsibility to be aware of your
              benefits. We strongly encourage you to be in contact with your
              insurance agent to determine the level of coverage your plan
              provides, as well as have an understanding of the financial
              figures you will be responsible for. We participate with most
              insurance plans. If you are an HMO patient, you must choose Dr.
              Ehreema Nadir, MD as your primary care physician. This can be done
              by calling your insurance company before your appointment and
              having them list our physician as the PCP. You will be responsible
              for the visit if Dr. Ehreema Nadir, MD is not listed as the PCP,
              or you will have to reschedule to a later date when the physician
              is effective. As a courtesy, we will submit your claim for all
              services to your insurance company. Please remember your health
              insurance policy is a contract between you and your insurance
              company and we are not a party to that contract. Be aware that
              some services may not be covered by your insurance policy. By
              presenting for care, you agree that you are responsible for all
              services and charges regardless of your insurance status. Should
              any provided services not be covered by your insurance, we will
              not alter your claim, change your diagnosis, or report a different
              service than what was performed so that your insurance will cover
              the charge. This constitutes fraud and will not be done and you
              will be responsible for the balance. All co-pays, balances, and
              deductibles are due at the time of service. We file your insurance
              and then any balances that are due by you must be paid within 90
              days unless prior arrangements have been made with the billing
              department. If you have a billing or insurance-related question,
              please contact our billing office at (480) 306-5151 and they will
              be happy to assist you. We ask patients to refrain from discussing
              billing questions with the physicians, nurse practitioners, or
              physician's assistants as they devote their time and expertise to
              your health care and cannot answer billing questions. Any account
              left unpaid after 90 days will be turned over to an outside
              collection agency. Any collection fees necessary for this debt
              will be added to the outstanding balance. Please keep in mind that
              should your account go into collections, any arrangements/payments
              will need to be made directly with the collection agency. In
              addition, once an account has been turned over to the collection
              agency, the patient may receive a letter of discharge from our
              practice.
            </p>
            <h3 className=" my-10  text-left text-xl font-bold">
              Cancellation Policy
            </h3>
            <p className=" my-5 ">
              Each time a patient misses an appointment without providing proper
              notice, another patient is prevented from receiving care. You MUST
              give our office 24 hours' notice before your scheduled
              appointment. Multiple "No-Shows" in any 12 months may result in
              termination from our practice. "No-Show" fees will be billed to
              the patient. This fee is NOT covered by any insurance plan and
              will be your responsibility. Our practice fees are listed below.
              $50.00(Primary), $100(Specialist) - Request to complete
              Disability, FMLA, Life, and various other types of independent
              health forms. Forms MUST be present at the time of visit, or you
              will be asked to be rescheduled. $25.00 - Returned checks for
              non-sufficient funds will have a processing fee that will be
              charged back to the patient. We will be unable to accept any
              personal checks after the first occurrence. $50.00 - Charge for
              missed appointments or appointments canceled with less than
              24-hour notice with the Physician, Nurse Practitioner, or
              Physicians' Assistant. $100.00 - Charge for missed appointments or
              appointments canceled with less than 24-hour notice with the
              Psychiatric Nurse Practitioner and Nephrologist. By signing below,
              I acknowledge that I have read and understood the financial and
              cancellation policies of American Medical Associates and agree to
              the policies set forth.
            </p>
          </div>
        </div>
      </fieldset>
    </div>
  )
}
export default FINANCIALPOLICY
