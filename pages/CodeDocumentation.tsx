import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { auth } from '../firebase'
import Router, { useRouter } from 'next/router'
import router from 'next/router'

// CURRENTLY A WORK IN PROGRESS

const CodeDocumentation: NextPage = () => {
  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  return (
    <div>
      <Header selectCompany={'AMA'} />
      <h1 className="m-[20px] text-center text-5xl text-[#377adf]">
        Code Documentation
      </h1>
      <div className="ml-[25%] mr-[25%] text-center">
        <h2 className="m-3 text-2xl">Components</h2>
        <h3 className="mb-[10px] flex text-xl text-[#377adf]">
          AdvancedDirectives(livingwill)
        </h3>
        <p>
          This code defines a React component called
          AdvancedDirectivesLivingWill. The component renders a form with
          various input fields related to advanced directives for medical care.
          The component takes in several props including an optional ID, an
          object AdvancedDirectivesLivingWillState to update the state of the
          parent component, and a boolean required that determines whether
          certain fields are required to be filled. The component has several
          state variables defined using the useState hook. These variables keep
          track of the values entered in various input fields including the
          Health Care Power of Attorney, Health Care Power of Attorney Name, Do
          You Have a Living Will, Pre-Hospital Medical Directives, Phone Number,
          Date, Signature, and whether the signature is valid. The component
          also has two useEffect hooks. The first one runs when the required
          prop changes and checks whether the signature, date, and agree to the
          signature checkbox are filled out, and if not, sets some boolean
          values in state to indicate that they are required. The second
          useEffect hook runs whenever any of the state variables change and
          updates the AdvancedDirectivesLivingWillState object with the current
          values of the input fields. The component uses various child
          components like CustomYesOrNo, TextInput, PhoneNumberInput,
          SectionWithTitle, and Signature to render the form. The CustomYesOrNo
          component renders a yes/no checkbox, the TextInput component renders a
          text input field, and the PhoneNumberInput component renders a phone
          number input field. The SectionWithTitle component renders a section
          of the form with a title and subtitle. The Signature component renders
          a signature input field with a checkbox for agreeing to the signature
          and a date input field. In summary, this code defines a React
          component that renders a form with input fields related to advanced
          directives for medical care, including a signature field. It also
          updates the state of the parent component with the current values of
          the input fields.
        </p>
      </div>
    </div>
  )
}

export default CodeDocumentation
