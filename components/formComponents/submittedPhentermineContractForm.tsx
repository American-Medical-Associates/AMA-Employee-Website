import React, { useState, useEffect, useRef, Ref } from 'react'
import MainButton from '../Buttons/MainButton'
import { InformationSection } from './InformationSection'
import { jsPDF } from 'jspdf'
import { ControlledSubstanceContractTypes } from '../../types/ControlledSubstanceContractTypes'

type ControlledSubstanceContractKeys = keyof ControlledSubstanceContractTypes

const submittedPhentermineContractForm: React.FC<{
  selectedPacket: any
  pdfRef: any
}> = ({ selectedPacket, pdfRef }) => {
  const pdf = new jsPDF()
  return (
    <div className="ml-3 flex w-full flex-col items-center justify-center">
      <MainButton
        buttonText="Export PDF"
        onClick={async () => {
          var doc = 1
          if (Array.isArray(selectedPacket) == false) {
            Object.keys(selectedPacket).map(async (item: any) => {
              selectedPacket[item as ControlledSubstanceContractKeys]
              doc += 1
              const content: any = pdfRef?.current
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
                fieldValue: selectedPacket?.name,
              },
              {
                fieldTitle: 'Email',
                fieldValue: selectedPacket?.email,
              },
              {
                fieldTitle: 'Date of Birth',
                fieldValue: selectedPacket?.dob,
              },
            ]}
          />

          <InformationSection
            title="What They Agree To"
            contentInSection={[
              {
                fieldTitle: 'Agreements',
                fieldValue: selectedPacket?.checkBoxesToAgreeTo,
              },
            ]}
          />

          <InformationSection
            title="Signature"
            contentInSection={[
              {
                fieldTitle: 'Signature Date',
                fieldValue: selectedPacket?.patientSignatureDate,
              },
              {
                fieldTitle: 'Signature',
                fieldValue: selectedPacket?.patientSignature,
              },
            ]}
          />
        </div>
      )}
    </div>
  )
}

export default submittedPhentermineContractForm
