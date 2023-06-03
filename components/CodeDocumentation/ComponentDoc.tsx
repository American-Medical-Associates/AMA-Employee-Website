import React, { useState } from 'react'
import { CircularButton } from '../Buttons/CircularButtonIcon'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'
import {
  Prism as SyntaxHighlighter,
  PrismLight,
} from 'react-syntax-highlighter'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
// import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const ComponentDoc: React.FC<{
  description: string
  title: string
  dateAdded: string
  tags?: Array<string>
  dateEdited?: string
  code?: string
  location: string
}> = ({ tags, description, dateAdded, title, code, dateEdited, location }) => {
  const [showCode, setShowCode] = useState(false)
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
            onClick={() => {}}
          />
        </div>
      </div>

      <div
        className=" w-[60%] text-left"
        dangerouslySetInnerHTML={{
          __html: description
            .replace(/\\n/g, '<br />')
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

      {code && showCode && (
        <div className=" m-5 flex w-[80%] justify-center rounded-md p-4">
          <SyntaxHighlighter
            showLineNumbers={true}
            language="jsx"
            style={atomDark}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )}
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
