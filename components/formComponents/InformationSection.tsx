import React from 'react'

export const InformationSection: React.FC<{
  title: string
  contentInSection: Array<any>
}> = ({ title, contentInSection }) => {
  const renderedContent = contentInSection.map((content: any, index) => {
    if (
      content !== undefined &&
      content.fieldValue !== undefined &&
      content.fieldValue !== null &&
      content.fieldValue !== '' &&
      content.realValue !== false
    ) {
      //if content.fieldValue is an array, then we need to render it differently
      if (Array.isArray(content.fieldValue)) {
        const renderedArray = content.fieldValue.map(
          (item: any, index: number) => {
            // if item is an object, then we need to render it differently
            if (typeof item === 'object') {
              const renderedObject = Object.keys(item).map(
                (key: any, index: number) => {
                  if (item.drug) {
                    return (
                      <div className="my-3" key={index}>
                        <p className=" my-1 text-lg">
                          Drug Dose: {item.drug.DrugDose}
                        </p>
                        <p className="my-1 text-lg">
                          Drug Frequency: {item.drug.DrugFrequency}
                        </p>
                        <p className="my-1 text-lg">
                          Drug Name: {item.drug.DrugName}
                        </p>
                        <p className="my-1 text-lg">
                          Prescribing Physician:
                          {item.drug.PrescribePhysician}
                        </p>
                      </div>
                    )
                  } else {
                    return (
                      <div className="my-3" key={index}>
                        <p className="my-1 text-lg">
                          illness: {item.twoItems.input}
                        </p>
                        <p>Date: {item.twoItems.date}</p>
                      </div>
                    )
                  }
                }
              )
              return (
                <div key={index} className="flex flex-col">
                  {renderedObject}
                </div>
              )
            } else {
              return (
                <div key={index} className="flex flex-row items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-gray-400"></div>
                  <p className="text-lg">{item}</p>
                </div>
              )
            }
          }
        )

        return (
          <div key={index} className="mb-2 flex flex-col">
            <h3 className=" mr-5 text-xl font-bold text-[#1969f4]">
              {content.fieldTitle}
            </h3>
            <div className="flex flex-col">{renderedArray}</div>
          </div>
        )
        //if its a date add / to it (mm/dd/yyyy)
      } else if (
        content.fieldTitle.includes('Date') ||
        content.fieldTitle.includes('date')
      ) {
        const date = content.fieldValue

        const cleaned = content.fieldValue?.replace(/\D/g, '')
        const match = cleaned?.match(/^(1|)?(\d{2})(\d{2})(\d{4})$/)
        if (match) {
          // const intlCode = match[1] ? '+1 ' : ''
          const formattedDate = [match[2], '/', match[3], '/', match[4]].join(
            ''
          )

          return (
            <div
              key={index}
              className="my-3 flex w-full flex-row items-center justify-center"
            >
              <div className="flex flex-row items-center justify-center">
                <h3 className=" mr-5 text-xl font-bold text-[#1969f4]">
                  {content.fieldTitle}
                </h3>
                <p className=" mx-3 text-xl text-[#323131a7]">
                  {formattedDate}
                </p>
              </div>
            </div>
          )
        } else {
          return (
            <div
              key={index}
              className="my-3 flex w-full flex-row items-center justify-center"
            >
              <div className="flex flex-row items-center justify-center">
                <h3 className=" mr-5 text-xl font-bold text-[#1969f4]">
                  {content.fieldTitle}
                </h3>
                <p className=" mx-3 text-xl text-[#323131a7]">
                  {content.fieldValue}
                </p>
              </div>
            </div>
          )
        }
        //if its a phone number add () and - to it (xxx) xxx-xxxx
      } else if (
        content.fieldTitle.includes('Phone') ||
        content.fieldTitle.includes('phone')
      ) {
        const phone = content.fieldValue

        const cleaned = content.fieldValue?.replace(/\D/g, '')
        const match = cleaned?.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
          // const intlCode = match[1] ? '+1 ' : ''
          const formattedPhone = `(${match[2]}) ${match[3]}-${match[4]}`

          return (
            <div
              key={index}
              className="my-3 flex w-full flex-row items-center justify-center"
            >
              <div className="flex flex-row items-center justify-center">
                <h3 className=" mr-5 text-xl font-bold text-[#1969f4]">
                  {content.fieldTitle}
                </h3>
                <p className=" mx-3 text-xl text-[#323131a7]">
                  {formattedPhone}
                </p>
              </div>
            </div>
          )
          //if its a social security number add - to it (xxx-xx-xxxx)
        } else {
          return (
            <div
              key={index}
              className="my-3 flex w-full flex-row items-center justify-center"
            >
              <div className="flex flex-row items-center justify-center">
                <h3 className=" mr-5 text-xl font-bold text-[#1969f4]">
                  {content.fieldTitle}
                </h3>
                <p className=" mx-3 text-xl text-[#323131a7]">
                  {content.fieldValue}
                </p>
              </div>
            </div>
          )
        }
      } else if (
        content.fieldTitle.includes('Social Security') ||
        (content.fieldTitle.includes('social security') &&
          content.fieldValue.length === 9)
      ) {
        const social = content.fieldValue

        const cleaned = content.fieldValue?.replace(/\D/g, '')
        const match = cleaned?.match(/^(1|)?(\d{3})(\d{2})(\d{4})$/)
        if (match) {
          const formattedSocial = `${match[2]}-${match[3]}-${match[4]}`
          return (
            <div
              key={index}
              className="my-3 flex w-full flex-row items-center justify-center"
            >
              <div className="flex flex-row items-center justify-center">
                <h3 className=" mr-5 text-xl font-bold text-[#1969f4]">
                  {content.fieldTitle}
                </h3>
                <p className=" mx-3 text-xl text-[#323131a7]">
                  {formattedSocial}
                </p>
              </div>
            </div>
          )
        } else {
          return (
            <div
              key={index}
              className="my-3 flex w-full flex-row items-center justify-center"
            >
              <div className="flex flex-row items-center justify-center">
                <h3 className=" mr-5 text-xl font-bold text-[#1969f4]">
                  {content.fieldTitle}
                </h3>
                <p className=" mx-3 text-xl text-[#323131a7]">
                  {content.fieldValue}
                </p>
              </div>
            </div>
          )
        }

        //if its an object, then we need to render it differently
      } else {
        return (
          <div
            key={index}
            className="my-3 flex w-full flex-row items-center justify-center"
          >
            <div className="flex flex-row items-center justify-center">
              <h3 className=" mr-5 text-xl font-bold text-[#1969f4]">
                {content.fieldTitle}
              </h3>
              <p className=" mx-3 text-xl text-[#323131a7]">
                {content.fieldValue}
              </p>
            </div>
          </div>
        )
      }
    }
  })
  return (
    <div className=" my-10 flex w-[80%]  flex-col items-center justify-center rounded-[30px] bg-[#d8d7d77b] p-10 ">
      <h3 className=" my-10 text-3xl underline">{title}</h3>
      <div className="flex w-full flex-col items-center  justify-center ">
        {renderedContent}
      </div>
    </div>
  )
}
