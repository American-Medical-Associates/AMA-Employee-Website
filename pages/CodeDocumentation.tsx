import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import Header from '../components/navigation/Header'
import { addComponentDoc, auth, getComponentDoc } from '../firebase'
import Router, { useRouter } from 'next/router'
import router from 'next/router'
import { ComponentDoc } from '../components/CodeDocumentation/ComponentDoc'
import { CircularButton } from '../components/Buttons/CircularButtonIcon'
import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'

import TextInput from '../components/userInput/TextInput'
import LargeTextBox from '../components/userInput/LargeTextBox'
import { el } from 'date-fns/locale'

// CURRENTLY A WORK IN PROGRESS

const CodeDocumentation: NextPage = () => {
  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  const [addComponent, setAddComponent] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [code, setCode] = useState('')
  const [location, setLocation] = useState('')
  const [tags, setTags] = useState<Array<string>>([])
  const [componentDocs, setComponentDocs] = useState<Array<any>>([])

  useEffect(() => {
    getComponentDoc({ setComponentDocs: setComponentDocs })
  }, [])

  const componentDocsList = componentDocs.map((componentDoc) => {
    if (!componentDoc) {
      return
    } else {
      return (
        <ComponentDoc
          title={componentDoc.title}
          description={componentDoc.description}
          dateAdded={
            componentDoc.dateAdded
              ? componentDoc.dateAdded.toDate().toDateString()
              : null
          }
          dateEdited={componentDoc.dateEdited}
          code={componentDoc.code}
          location={componentDoc.location}
          tags={componentDoc.tags}
        />
      )
    }
  })

  return (
    <div>
      <Header selectCompany={'AMA'} routePatientsHome={true} />
      <h1 className="m-[20px] text-center text-5xl text-[#377adf]">
        Code Documentation
      </h1>
      <div className=" flex w-full items-center justify-center">
        <div className=" my-2 flex grid-rows-3">
          <div className="mx-2">
            <CircularButton />
          </div>
          <div className="mx-2">
            <CircularButton
              icon={<MagnifyingGlassIcon className=" h-7 w-7 text-black" />}
            />
          </div>
          <div className="mx-2">
            <CircularButton
              isSelection={addComponent}
              icon={<PencilSquareIcon className=" h-7 w-7 text-black" />}
              onClick={() => setAddComponent(!addComponent)}
            />
          </div>
        </div>
      </div>
      {addComponent && (
        <div className="flex w-full items-center justify-center">
          <div className="  flex w-[80%] flex-col items-center justify-center">
            <TextInput
              placeHolder="Title"
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(text.target.value)
              }}
              value={title}
              widthPercentage="w-[60%]"
            />
            <div className="w-[60%]">
              <LargeTextBox
                placeHolder="Description"
                onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                  setDescription(text.target.value)
                }}
                value={description}
                widthPercentage="w-[60%]"
              />
            </div>
            <div className="w-[60%]">
              <LargeTextBox
                placeHolder="Code"
                onChange={(text: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setCode(text.target.value)
                }}
                value={code}
              />
            </div>
            <TextInput
              placeHolder="Location"
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setLocation(text.target.value)
              }}
              value={location}
              widthPercentage="w-[60%]"
            />

            <TextInput
              placeHolder="Tags"
              onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                setTags(text.target.value.split(','))
              }}
              value={tags.join(',')}
              widthPercentage="w-[60%]"
            />
            <CircularButton
              icon={<PlusIcon className="h-7 w-7 text-black" />}
              onClick={() => {
                addComponentDoc({
                  title,
                  description,
                  code,
                  location,
                  tags,
                })
              }}
              isSelection={true}
            />
          </div>
        </div>
      )}

      <div className="flex w-full flex-col items-center justify-center">
        {/* <ComponentDoc
          title=""
          dateAdded=""
          description="This is a description"
          code={
            'import React, { useState } from \'react\'\nimport { CircularButton } from \'../CircularButtonIcon\'\nimport {\n  ArrowDownIcon,\n  ArrowUpIcon,\n  PencilIcon,\n} from \'@heroicons/react/24/outline\'\nimport { Prism as SyntaxHighlighter } from \'react-syntax-highlighter\'\nimport {\n  solarizedlight,\n  atomDark,\n} from \'react-syntax-highlighter/dist/esm/styles/prism\'\n\nexport const ComponentDoc: React.FC<{\n  description: string\n  title: string\n  dateAdded: string\n  tags?: Array<string>\n  dateEdited?: string\n  code?: string\n}> = ({ tags, description, dateAdded, title, code, dateEdited }) => {\n  const [showCode, setShowCode] = useState(false)\n  return (\n    <div className="  flex w-[80%] flex-col items-center justify-center rounded-[25px] p-10 text-center shadow-2xl ">\n      <div className="mb-5  flex w-full items-center justify-between">\n        <div className="w-1/2"></div>\n        <div className="">\n          <h1 className="z-50 mb-4 text-center text-3xl text-[#50E678]">\n            {title.toUpperCase()}\n          </h1>\n          <p className="text-md text-[#9D9D9D]">Date Added: {dateAdded}</p>\n          {dateEdited && (\n            <p className=" text-md text-[#FF6060]">Date Edited: {dateEdited}</p>\n          )}\n        </div>\n        <div className="flex w-1/2 justify-end">\n          <CircularButton\n            icon={<PencilIcon className="h-7 w-7 text-black" />}\n            onClick={() => {}}\n          />\n        </div>\n      </div>\n\n      <p className="text-xl">{description}</p>\n\n      <div className="my-5">\n        <CircularButton\n          icon={\n            showCode ? (\n              <ArrowUpIcon className="h-7 w-7 text-black" />\n            ) : (\n              <ArrowDownIcon className="h-7 w-7 text-black" />\n            )\n          }\n          onClick={() => setShowCode(!showCode)}\n        />\n      </div>\n\n      {code && showCode && (\n        <div className=" m-5 flex w-[60%] justify-start rounded-md bg-[#1B1B1B1A] p-4">\n          <SyntaxHighlighter language="jsx" style={atomDark}>\n            {code}\n          </SyntaxHighlighter>\n        </div>\n      )}\n    </div>\n  )\n}\n'
          }
          dateEdited=""
          location=""
          tags={tags}
        /> */}
        {componentDocsList}
      </div>
    </div>
  )
}

export default CodeDocumentation
