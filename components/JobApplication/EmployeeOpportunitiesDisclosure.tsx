import React, { useRef, useState } from 'react'

const EmployeeOpportunitiesDisclosure: React.FC<{
  setScrollState: any
}> = ({ setScrollState }) => {
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
      <h3 className=" my-4 text-center text-2xl">
        Equal Employee Opportunities Disclosure
      </h3>
      <fieldset>
        <div
          onScroll={onScroll}
          ref={listInnerRef}
          className=" flex h-[500px]  w-[400px] scroll-m-20 flex-col justify-center overflow-y-auto rounded-[10px] border-2 border-[#959595] p-10 "
        >
          <div className=" h-full w-full">
            <h3 className=" mb-10 text-left text-xl font-bold">
              Pre-Offer Invitation to Self-Identify - Race/Ethnicity, Sex, and
              Veteran Status
            </h3>
            <p className=" object-contain text-left">
              American Medical Associates is not a Government contractor or
              subcontractor subject to laws including Executive Order 11246 (EO
              11246) and the Vietnam Era Veterans' Readjustment Assistance Act
              of 1974 (VEVRAA). These laws require that covered Government
              contractors and subcontractors take affirmative action to employ
              and advance in employment applicants and employees without regard
              to their race, color, religion, sex, sexual orientation, gender
              identity, national origin or protected veteran status. American
              Medical Associates is also subject to certain governmental record
              keeping and reporting requirements. In order to comply with these
              requirements, we invite you to check the appropriate boxes below.
              Submission of this information is voluntary and refusal to provide
              it will not subject you to any adverse treatment. The information
              you provide will be kept confidential and will only be used in
              ways that are consistent with the law.
            </p>
            <h3 className=" my-10  text-left text-xl font-bold">
              Race/Ethnicity Definitions
            </h3>
            <p>
              Hispanic or Latino: A person of Cuban, Mexican, Puerto Rican,
              South or Central American, or other Spanish culture or origin
              regardless of race. White (Not Hispanic or Latino): A person
              having origins in any of the original peoples of Europe, the
              Middle East, or North Africa. Black or African American (Not
              Hispanic or Latino): A person having origins in any of the black
              racial groups of Africa. Asian (Not Hispanic or Latino): A person
              having origins in any of the original peoples of the Far East,
              Southeast Asia, or the Indian Subcontinent including, for example,
              Cambodia,China, India, Japan, Korea, Malaysia, Pakistan, the
              Philippine Islands, Thailand, and Vietnam. Native Hawaiian or
              Other Pacific Islander (Not Hispanic or Latino): A person having
              origins in any of the peoples of Hawaii, Guam, Samoa, or other
              Pacific Islands. American Indian or Alaska Native (Not Hispanic or
              Latino): A person having origins in any of the original peoples of
              North and South America (including Central America) and who
              maintain tribal affiliation or community attachment. Two or More
              Races (Not Hispanic or Latino): Persons who identify with two or
              more race categories named above.
            </p>
            <h3 className=" my-10  text-left text-xl font-bold">
              Veteran Status Definitions
            </h3>
            <p>
              Disabled Veteran: (1) a veteran of the U.S. military, ground,
              naval or air service who is entitled to compensation (or who but
              for the receipt of military retired pay would be entitled to
              compensation) under laws administered by the Secretary of Veterans
              Affairs; or (2) a person who was discharged or released from
              active duty because of a service-connected disability. Recently
              separated veteran: any veteran during the three-year period
              beginning on the date of such veteran's discharge or release from
              active duty in the U.S. military, ground, naval, or air service.
              Active duty wartime or campaign badge veteran: a veteran who
              served on active duty in the U.S. military, ground, naval or air
              service during a war, or in a campaign or expedition for which a
              campaign badge has been authorized under the laws administered by
              the Department of Defense. Armed Forces service medal veteran: a
              veteran who, while serving on active duty in the U.S. military,
              ground, naval or air service, participated in a United States
              military operation for which an Armed Forces service medal was
              awarded pursuant to Executive Order 12985 (61 FR 1209).
            </p>
            <h3 className=" my-10  text-left text-xl font-bold">
              Voluntary Self-Identification of Disability
            </h3>
            <h4 className=" my-10">
              Form CC-305 OMB Control Number 1250-0005 Expires 1/31/2020
            </h4>
            <p>
              Why are you being asked to complete this form? Because we do
              business with the government, we must reach out to, hire, and
              provide equal opportunity to qualified people with disabilities.
              To help us measure how well we are doing, we are asking you to
              tell us if you have a disability or if you ever had a disability.
              Completing this form is voluntary, but we hope that you will
              choose to fill it out. If you are applying for a job, any answer
              you give will be kept private and will not be used against you in
              any way. If you already work for us, your answer will not be used
              against you in any way. Because a person may become disabled at
              any time, we are required to ask all of our employees to update
              their information every five years. You may voluntarily
              self-identify as having a disability on this form without fear of
              any punishment because you did not identify as having a disability
              earlier. How do I know if I have a disability? You are considered
              to have a disability if you have a physical or mental impairment
              or medical condition that substantially limits a major life
              activity, or if you have a history or record of such an impairment
              or medical condition.
            </p>
            <h3 className=" my-10  text-left text-xl font-bold">
              Reasonable Accommodation Statement - U.S.
            </h3>
            <p>
              Federal law requires employers to provide reasonable accommodation
              to qualified individuals with disabilities. Please tell us if you
              require a reasonable accommodation to apply for a job or to
              perform your job. Examples of reasonable accommodation include
              making a change to the application process or work procedures,
              providing documents in an alternate format, using a sign language
              interpreter, or using specialized equipment. i Section 503 of the
              Rehabilitation Act of 1973, as amended. For more information about
              this form or the equal employment obligations of Federal
              contractors, visit the US. Department of Labor's Office of Federal
              Contract Compliance Programs (OFCCP) website at www.dol.gov/ofccp.
              PUBLIC BURDEN STATEMENT: According to the Paperwork Reduction Act
              of 1995 no persons are required to respond to a collection of
              information unless such collection displays a valid OMB control
              number. This survey should take about 5 minutes to complete.
            </p>
            <h3 className=" my-10  text-left text-xl font-bold">
              OFCCP Notice
            </h3>
            <p>
              American Medical Associates is an Equal Opportunity / Affirmative
              Action employer committed to diversity in the workplace. All
              qualified applicants will receive consideration for employment
              without regard to race, color, religion, sex, sexual orientation,
              age, national origin, disability, protected veteran status, gender
              identity or any other factor protected by applicable federal,
              state or local laws. American Medical Associates is committed to
              working with and providing reasonable accommodations to
              individuals with disabilities. If you need a reasonable
              accommodation because of a disability for any part of the
              Info@American Medical Associates.com and let us know the nature of
              your request and your contact information.
            </p>
          </div>
        </div>
      </fieldset>
    </div>
  )
}
export default EmployeeOpportunitiesDisclosure
