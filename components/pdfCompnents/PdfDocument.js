import React, { useState, useRef, useEffect } from 'react'

import { Worker } from '@react-pdf-viewer/core'
// Import the main component
import { Viewer, Tooltip } from '@react-pdf-viewer/core'
import * as pdfjs from 'pdfjs-dist'

import '@react-pdf-viewer/toolbar/lib/styles/index.css'
import { OpenFile } from '@react-pdf-viewer/core'
import { SelectionMode } from '@react-pdf-viewer/selection-mode'
import { toolbarPlugin } from '@react-pdf-viewer/toolbar'
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css'
import MainButton from '../Buttons/MainButton'
import ArrowButton from '../Buttons/ArrowButton'
// const PdfDocument = ({ locationX, locationY, svg }) => {
//   const [numPages, setNumPages] = useState(null)
//   const [pageNumber, setPageNumber] = useState(1)
//   const pdfURL = 'https://arxiv.org/pdf/quant-ph/0410100.pdf'
//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages)
//   }
//   const toolbarPluginInstance = toolbarPlugin({
//     // getFilePlugin: {
//     //   fileNameGenerator: (pdfURL) => {
//     //     const fileName = pdfURL.name.substring(pdfURL.name.lastIndexOf('/') + 1)
//     //     return `a-copy-of-${fileName}`
//     //   },
//     // },

//     searchPlugin: {
//       keyword: 'PDF',
//     },
//     selectionModePlugin: {
//       selectionMode: SelectionMode.Hand,
//     },
//   })
//   const { Toolbar } = toolbarPluginInstance
//   const renderSignature = (props) => (
//     <>
//       {props.canvasLayer.children}
//       <div
//         className="absolute top-0 right-0 m-2"
//         style={{
//           zIndex: 1000,
//           cursor: 'pointer',
//           backgroundColor: 'white',
//           padding: '5px',
//           top: '100px',
//           right: '100px',
//         }}
//         onClick={() => {
//           props.onOpenFile()
//         }}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M4 6h16M4 10h16M4 14h16M4 18h16"
//           />
//         </svg>
//       </div>

//       {props.annotationLayer.children}
//       {props.textLayer.children}
//     </>
//   )

//   return (
//     <div className="mt-10 h-full w-full  ">
//       <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
//         <Toolbar />
//         <Viewer
//           plugins={[toolbarPluginInstance]}
//           fileUrl={pdfURL}
//           renderPage={renderSignature}
//         />
//       </Worker>
//     </div>
//   )
// }

// export default PdfDocument

const PdfDocument = () => {
  const canvasRef = useRef(null)
  const [selectedPageNumber, setSelectedPageNumber] = useState(1)

  const PDFViewer = ({ pdfUrl }) => {
    useEffect(() => {
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

      pdfjs
        .getDocument(pdfUrl)
        .promise.then((pdf) => pdf.getPage(selectedPageNumber))
        .then((page) => {
          const canvas = canvasRef.current
          const context = canvas.getContext('2d')
          const viewport = page.getViewport({ scale: 0.8 })
          canvas.height = viewport.height

          canvas.width = viewport.width
          return page.render({ canvasContext: context, viewport }).promise
        })
      //render as image
      // .then(() => {
      //   const imgData = canvasRef.current.toDataURL()
      //   const img = document.createElement('img')
      //   img.src = imgData
      //   document.body.appendChild(img)
      // })
    }, [pdfUrl])

    return <canvas ref={canvasRef} />
  }
  // draw on the pdf
  const draw = (e) => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.beginPath()
    context.arc(e.clientX, e.clientY, 5, 0, 2 * Math.PI)
    context.fill()
  }
  //drag and drop svg to pdf
  const dragOver = (e) => {
    e.preventDefault()
  }
  const drop = (e) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('text')
    const svg = document.getElementById(data)
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const svgData = new XMLSerializer().serializeToString(svg)
    const DOMURL = window.URL || window.webkitURL || window
    const img = new Image()
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = DOMURL.createObjectURL(svgBlob)
    img.onload = function () {
      context.drawImage(img, 0, 0)
      DOMURL.revokeObjectURL(url)
    }
    img.src = url
  }

  return (
    <div className=" flex  items-center justify-center">
      <div className=" mx-5">
        <ArrowButton
          direction={'left'}
          onClick={() => {
            if (selectedPageNumber > 1) {
              setSelectedPageNumber(selectedPageNumber - 1)
            }
          }}
        />
      </div>
      <PDFViewer pdfUrl={'https://arxiv.org/pdf/quant-ph/0410100.pdf'} />
      <div className=" flex flex-row items-center justify-center">
        <div className=" mx-5"></div>
        <ArrowButton
          direction={'right'}
          onClick={() => {
            setSelectedPageNumber(selectedPageNumber + 1)
          }}
        />
      </div>
    </div>
  )
}
export default PdfDocument
