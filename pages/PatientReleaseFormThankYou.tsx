import React from 'react'

function PatientReleaseFormThankYou() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Thank you for submitting the Authorization to Release Protected Health
          Information
        </h1>
        <p className="text-gray-600">
          Please hand the iPad back to the staff member.
        </p>
      </div>
    </div>
  )
}

export default PatientReleaseFormThankYou
