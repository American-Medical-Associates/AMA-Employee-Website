import React from 'react'

function PatientsRights() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-center items-center text-center mb-6">
        <img
          src="/American Medical Associates.png"
          alt="AMA Logo"
          className="w-24 mr-4" // Adjust width as needed
        />
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-2">
            American Medical Associates
          </h1>
          <h6>Primary Care / Internal Medicine Multi-Specialty Group</h6>
        </div>
      </div>
      <h1 className="text-2xl font-semibold text-blue-500 mb-4">
        Patient's Rights
      </h1>
      <h2 className="text-lg font-semibold mb-5">You have the right:</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Safe, considerate, and respectful care provided in a manner consistent
          with your beliefs.
        </li>
        <li>
          Expectation that all communications and records related to your care
          will be treated as confidential.
        </li>
        <li>Effective communication based on your individual needs.</li>
        <li>
          Knowledge of the healthcare provider responsible for coordinating your
          care.
        </li>
        <li>
          Ability to make healthcare decisions in advance or to appoint a
          healthcare agent through an advance directive.
        </li>
        <li>
          Complete information about diagnosis, treatment, and prognosis in
          terms that are easily understood.
        </li>
        <li>
          Right to refuse treatment to the extent permitted by law and to be
          informed of the medical consequences of your refusal.
        </li>
        <li>
          Receive appropriate assessment of and treatment for acute pain within
          the parameters of a Primary Care Clinic.
        </li>
        <li>
          Designate additional physicians or organizations at any time to
          receive medical updates.
        </li>
        <li>Explanation of the charges for which you are responsible.</li>
        <li>
          Ability to speak with someone about your concerns if you are not
          satisfied with any aspect of your care.
        </li>
      </ul>

      <h1 className="text-2xl font-semibold text-blue-500 mt-8 mb-4">
        Patient's Responsibilities
      </h1>
      <h2 className="text-lg font-semibold mb-5">You are responsible for:</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Providing complete and accurate information about your health.</li>
        <li>
          Providing documentation of Advance Directives or Living Will/Health
          Care Power of Attorney.
        </li>
        <li>
          Reporting whether you understand the proposed treatment and what is
          expected of you.
        </li>
        <li>Following instructions of agreed upon treatment plans.</li>
        <li>
          Keeping all your appointments or notifying when unable to do so.
        </li>
        <li>
          Ensuring that financial obligations for your health care are
          fulfilled.
        </li>
        <li>
          Following clinic rules and regulations around the safety of all the
          patients.
        </li>
        <li>
          Being considerate of the rights of other patients and the staff.
        </li>
        <li>Being respectful of the property of the clinic.</li>
      </ul>
    </div>
  )
}

export default PatientsRights
