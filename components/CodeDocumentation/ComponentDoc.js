import React, { useState } from 'react'
import { CircularButton } from '../Buttons/CircularButtonIcon'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PencilIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
// import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import TextInput from '../userInput/TextInput'
import LargeTextBox from '../userInput/LargeTextBox'
import { editComponentDoc } from '../../firebase'

export const ComponentDoc = ({
  tags,
  description,
  dateAdded,
  title,
  code,
  dateEdited,
  location,
  docId,
}) => {
  const [showCode, setShowCode] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [titleEdit, setTitleEdit] = useState(title)
  const [descriptionEdit, setDescriptionEdit] = useState(description)
  const [codeEdit, setCodeEdit] = useState(code)
  const [locationEdit, setLocationEdit] = useState(location)
  const [tagsEdit, setTagsEdit] = useState(tags)

  const displayCode = () => {
    if (showCode && code) {
      return (
        <div className=" m-5 flex w-[80%] justify-center rounded-md p-4">
          <SyntaxHighlighter
            showLineNumbers={true}
            language="jsx"
            style={atomDark}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )
    }
  }

  return (
    <div className=" m-14  flex w-[80%] flex-col items-center justify-center rounded-[25px] p-10 text-center shadow-2xl ">
      <div className="mb-5  flex w-full items-center justify-between">
        <div className="w-1/2"></div>
        <div className=" w-[80%]">
          <h1 className="mb-4 text-center text-3xl text-[#50E678]">
            {title.toUpperCase()}
          </h1>
          <p className="text-md text-[#9D9D9D]">Date Added: {dateAdded}</p>
          {dateEdited && (
            <p className=" text-md text-[#FF6060]">Date Edited: {dateEdited}</p>
          )}
        </div>
        <div className="flex w-1/2 justify-end">
          <CircularButton
            icon={<PencilIcon className="h-7 w-7 text-black" />}
            onClick={() => {
              setOpenEdit(!openEdit)
            }}
            isSelection={openEdit}
          />
        </div>
      </div>
      {openEdit && (
        <div className="my-14 flex  w-full flex-col items-center justify-center">
          <h4 className=" text-4xl font-bold text-red-500">Edit</h4>
          <p>id:{docId}</p>
          <div className="  flex w-[80%] flex-col items-center justify-center">
            <TextInput
              placeHolder="Title"
              onChange={(text) => {
                setTitleEdit(text.target.value)
              }}
              value={titleEdit}
              widthPercentage="w-[60%]"
            />
            <div className="w-[60%]">
              <LargeTextBox
                placeHolder="Description"
                onChange={(text) => {
                  setDescriptionEdit(text.target.value)
                }}
                value={descriptionEdit}
                widthPercentage="w-[60%]"
              />
            </div>
            <div className="w-[60%]">
              <LargeTextBox
                placeHolder="Code"
                onChange={(text) => {
                  setCodeEdit(text.target.value)
                }}
                value={codeEdit}
              />
            </div>
            <TextInput
              placeHolder="Location"
              onChange={(text) => {
                setLocationEdit(text.target.value)
              }}
              value={locationEdit}
              widthPercentage="w-[60%]"
            />

            <TextInput
              placeHolder="Tags"
              onChange={(text) => {
                setTagsEdit(text.target.value.split(','))
              }}
              value={tagsEdit?.join(',')}
              widthPercentage="w-[60%]"
            />

            <CircularButton
              icon={<PencilSquareIcon className="h-7 w-7 text-black" />}
              onClick={() => {
                editComponentDoc({
                  title: titleEdit,
                  description: descriptionEdit,
                  code: codeEdit,
                  location: locationEdit,
                  tags: tagsEdit,
                  docId: docId,
                }).then(() => {
                  setOpenEdit(false)
                })
              }}
            />
          </div>
        </div>
      )}
      <div
        className="w-[60%] text-left"
        dangerouslySetInnerHTML={{
          __html: description
            .replace(/\\n/g, '<br />')
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/### ([^#\n]+)/g, '<strong>$1</strong>')
            .replace(
              /## ([^#\n]+)/g,
              '<h2 style="font-size: 1.5em; text-transform: uppercase;">$1</h2>'
            ),
        }}
      />
      <div className="my-5">
        <CircularButton
          icon={
            showCode ? (
              <ArrowUpIcon className="h-7 w-7 text-black" />
            ) : (
              <ArrowDownIcon className="h-7 w-7 text-black" />
            )
          }
          onClick={() => setShowCode(!showCode)}
        />
      </div>
      {/* {code?.length > 5 && showCode && (
        <div className=" m-5 flex w-[80%] justify-center rounded-md p-4">
          <SyntaxHighlighter
            showLineNumbers={true}
            language="jsx"
            style={atomDark}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )} */}
      {displayCode()}
      <div>
        <div className="my-5">
          <h1 className="text-md text-[#5A5A5A]">Location</h1>
          <p className=" text-sm text-[#4977EA] underline">{location}</p>
        </div>

        {tags &&
          tags.map((tag) => (
            <span className="m-1 rounded-md border-2 border-[#50E678] p-1 text-sm text-[#50E678]">
              {tag.trim()}
            </span>
          ))}
      </div>
    </div>
  )
}
