import React, { useRef, useState } from 'react'

const APPLICANTCERTIFICATION: React.FC<{ setScrollState: any }> = ({
  setScrollState,
}) => {
  const listInnerRef: any = useRef()
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current
      if (scrollTop + clientHeight === scrollHeight) {
        setScrollState(false)
      }
    }
  }
  return (
    <div className=" flex flex-col items-center justify-center text-center">
      <h3 className=" my-4 text-center text-2xl">APPLICANT CERTIFICATION </h3>
      <fieldset>
        <div
          onScroll={onScroll}
          ref={listInnerRef}
          className=" flex h-[500px]  w-[400px] scroll-m-20 flex-col justify-center overflow-y-auto rounded-[10px] border-2 border-[#959595] p-10 "
        >
          <div className=" h-full w-full">
            {/* <h3 className=" mb-10 text-left text-xl font-bold">
              Pre-Offer Invitation to Self-Identify - Race/Ethnicity, Sex, and
              Veteran Status
            </h3> */}

            {/* <h3 className=" my-10  text-left text-xl font-bold">
              Race/Ethnicity Definitions
            </h3> */}
            <p className=" my-5">
              I understand that the Company may now have, or may establish, a
              drug-free workplace or drug and/or alcohol testing program
              consistent with applicable federal, state, and local law. If the
              Company has such a program and I am offered a conditional offer of
              employment, I understand that if a pre-employment (post-offer)
              drug and/or alcohol test is positive, the employment offer may be
              withdrawn. I agree to work under the conditions requiring a
              drug-free workplace, consistent with applicable federal, state,
              and local law. I also understand that all employees of the
              location, pursuant to the Company's policy and federal, state, and
              local law, may be subject to urinalysis and/or blood screening or
              other medically recognized tests designed to detect the presence
              of alcohol or illegal or controlled drugs. If employed, I
              understand that the taking of alcohol and/or drug tests is a
              condition of continual employment and I agree to undergo alcohol
              and drug testing consistent with the Company's policies and
              applicable federal, state, and local law. If employed by the
              Company, I understand and agree that the Company, to the extent
              permitted by federal, state, and local law, may exercise its
              right, without prior warning , or notice, to conduct
              investigations of property (including, but not limited to, files,
              lockers, desks, vehicle, and computers) and, in certain
              circumstances, my personal property. I understand and agree that
              as a condition of employment and to the extent permitted by
              federal, state, and local law, I may be required to sign a
              confidentiality, restrictive covenant, and/or conflict of interest
              statement. I certify that all the information on this application,
              my resume, or any supporting documents I may present during any
              interview is and will be complete and accurate to the best of my
              knowledge. I understand that any falsification, misrepresentation,
              or omission of any information may result in disqualification from
              consideration for employment or, if employed, disciplinary action,
              up to and including immediate dismissal.
            </p>
            {/* <h3 className=" my-10  text-left text-xl font-bold">
              Veteran Status Definitions
            </h3> */}
            <p className=" my-5 underline">
              THIS COMPANY IS AN AT-WILL EMPLOYER AS ALLOWED BY APPLICABLE STATE
              LAW. THIS MEANS THAT REGARDLESS OF ANY PROVISION IN THIS
              APPLICATION, IF HIRED, THE COMPANY OR I MAY TERMINATE THE
              EMPLOYMENT RELATIONSHIP AT ANY TIME, FOR ANY REASON. WITH OR
              WITHOUT CAUSE OR NOTICE. NOTHING IN THIS APPLICATION OR IN ANY
              DOCUMENT OR STATEMENT, WRITTEN OR ORAL, SHALL LIMIT THE RIGHT TQ
              TERMINATE EMPLOYMENT AT-WILL. NO OFFICER, EMPLOYEE OR
              REPRESENTATIVE OF THE COMPANY IS AUTHORIZED TO ENTER INTO AN
              AGREEMENT-EXPRESS OR IMPLIED-WITH ME OR ANY APPLICANT FOR
              EMPLOYMENT FOR A SPECIFIED PERIOD OF TIME UNLESS SUCH AN AGREEMENT
              IS IN A WRITTEN CONTRACT SIGNED BY THE CHIEF OPERATING OFFICER OF
              THE COMPANY. IF HIRED, I AGREE TO CONFORM TO THE RULES AND
              REGULATIONS OF THE COMPANY AND I UNDERSTAND THAT THE COMPANY HAS
              COMPLETE DISCRETION TO MODIFY SUCH RULES AND REGULATIONS AT ANY
              TIME, EXCEPT THAT IT WILL NOT MODIFY ITS POLICY OF EMPLOYMENT
              AT-WILL.
            </p>
            {/* <h3 className=" my-10  text-left text-xl font-bold">
              OFCCP Notice
            </h3> */}
            <p className=" my-5">
              I authorize the Company or its agents to confirm all statements
              contained in this application and/or resume as it relates to the
              position I am seeking to the extent permitted by federal, state,
              or local law. I agree to complete any requisite authorization
              forms for the background investigation which may be permitted by
              federal, state and/or local law. If applicable and allowed by law,
              I will receive separate written notification regarding the
              Company's intent to obtain consumer reports. I authorize and
              consent to, without reservation, any party or agency contacted by
              this employer to furnish the above-mentioned information. I hereby
              release, discharge, and hold harmless, to the extent permitted by
              federal, state, and local law, any party delivering information to
              the Company or its duly authorized representative pursuant to this
              authorization from any liability, claims, charges, or causes of
              action which I may have as a result of the delivery or disclosure
              of the above requested information. l hereby release from
              liability the Company and its representative for seeking such
              information and all other persons, corporations, or organizations
              furnishing such information. Further, if hired, I authorize the
              company to provide truthful information concerning my employment
              to future employers and hold the company harmless for providing
              such information. If hired by this Company, I understand that I
              will be required to provide genuine documentation establishing my
              identity and eligibility to be legally employed in the United
              States by this Company. I also understand this Company employs
              only individuals who are legally eligible to work in the United
              States. THIS APPLICATION WILL BE CONSIDERED ACTIVE FOR A MAXIMUM
              OF SIXTY (60) DAYS. IF YOU WISH TO BE CONSIDERED FOR EMPLOYMENT
              AFTER THAT TIME, YOU MUST REAPPLY. I CERTIFY THAT ALL OF THE
              INFORMATION THAT I HAVE PROVIDED ON THIS APPLICATION IS TRUE,
              ACCURATE, AND COMPLETE. DO NOT SIGN UNTIL YOU HAVE READ ALL OF THE
              INFORMATION CONTAINED IN THE APPLICATION.
            </p>
          </div>
        </div>
      </fieldset>
    </div>
  )
}
export default APPLICANTCERTIFICATION
