import React from 'react'
import { useState, useMemo } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import Header from '../components/Header'
import { jsPDF } from 'jspdf'
import { Worker } from '@react-pdf-viewer/core'
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'

import '@react-pdf-viewer/toolbar/lib/styles/index.css'
import { OpenFile } from '@react-pdf-viewer/core'
import { SelectionMode } from '@react-pdf-viewer/selection-mode'
import { toolbarPlugin } from '@react-pdf-viewer/toolbar'
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css'
import MainButton from '../components/MainButton'
import PdfDocument from '../components/pdfCompnents/PdfDocument'
import ArrowButton from '../components/ArrowButton'
import * as pdfjs from 'pdfjs-dist'
import { RoundAddButton } from '../components/RoundAddButton'
import { CircularButton } from '../components/CircularButtonIcon'
import 'react-tooltip/dist/react-tooltip.css'
import TextInput from '../components/TextInput'
import {
  ArrowDownTrayIcon,
  PlusIcon,
  XMarkIcon,
  ShareIcon,
  ArrowRightIcon,
  DocumentIcon,
  PaperAirplaneIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

import SignatureField from '../components/pdfCompnents/SignatureField'
import {
  AddPDFToStorage,
  AddPDFToUser,
  AddSignatureToStorage,
  auth,
  DeletePDF,
  DeleteSignature,
  GetSignatures,
  GetUsers,
  GetUsersPDFs,
} from '../firebase'
import { image } from '@tensorflow/tfjs'
import { async } from '@firebase/util'
import { Tooltip } from 'react-tooltip'
import PdfViewerComponent from '../components/pdfCompnents/PdfViewerComponent'

const PdfSignatures = () => {
  //be able to drag and drop svg icons on the pdf document
  const canvasRef = useRef(null)
  const [selectedPageNumber, setSelectedPageNumber] = useState(1)
  const dragNode = useRef(null)
  const [svgUrl, setSvgUrl] = useState('')
  const [addSignature, setAddSignature] = useState(false)
  const [allSignatures, setAllSignatures] = useState([])
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0)
  const [pagesWithSignatures, setPagesWithSignatures] = useState([])
  const [xDropPosition, setXDropPosition] = useState(0)
  const [yDropPosition, setYDropPosition] = useState(0)
  const [canvasHight, setCanvasHight] = useState(0)
  const [canvasWidth, setCanvasWidth] = useState(0)
  const [signatureImageMap, setSignatureImageMap] = useState([])
  const [listOfRefs, setListOfRefs] = useState([])
  const [sigIndex, setSigIndex] = useState(0)
  const [showMyDocs, setShowMyDocs] = useState(false)
  const [selectedPDF, setSelectedPDF] = useState('')
  const [allMyDocs, setAllMyDocs] = useState([])
  const [sharePDF, setSharePDF] = useState(false)
  const [allUsers, setAllUsers] = useState([])
  const [requiredPages, setRequiredPages] = useState([])
  const [typedText, setTypedText] = useState('')
  const [usersSent, setUsersSent] = useState([])
  const [requiredPageIndex, setRequiredPageIndex] = useState(0)
  const [isTyped, setIsTyped] = useState(false)
  const [docsToDelete, setDocsToDelete] = useState([])
  const [showTypedText, setShowTypedText] = useState(false)

  useEffect(() => {
    try {
      GetSignatures({ signaturesState: setAllSignatures })
      GetUsersPDFs({ pdfState: setAllMyDocs })
    } catch (error) {
      console.log(error)
    }
  }, [addSignature])

  useEffect(() => {
    GetUsers({ usersState: setAllUsers })
  }, [sharePDF])

  const SignaturesList = allSignatures.map((signature, index) => {
    //create a ref for the drag node

    return (
      <div className=" my-3 mx-2 flex flex-row items-center rounded-md bg-white">
        <img
          onDragStart={(e) => {
            setSvgUrl(signature.signature)
            setSigIndex(index)
            setIsTyped(false)
          }}
          key={index}
          crossorigin="anonymous"
          draggable
          src={signature.signature}
          className=" w-[75%]"
        />
        <div className=" flex w-[205%] items-end justify-end ">
          <CircularButton
            deletion={true}
            icon={
              <TrashIcon className=" h-10 w-7 cursor-pointer  text-white duration-[500s] ease-in" />
            }
            onClick={() => {
              DeleteSignature({
                signature: signature.ID,
              })
            }}
          />
        </div>
      </div>
    )
  })

  const MyDocs = allMyDocs.map((doc, index) => {
    return (
      <div className=" grid-2-col my-3 mx-2 flex flex-row  rounded-md bg-white">
        <div
          onClick={() => {
            setSelectedPDF(doc.pdf)
            setShowMyDocs(false)
            setSelectedPageNumber(1)

            if (doc.requiredPages) {
              setRequiredPages(doc.requiredPages)
            } else {
              setRequiredPages([])
            }
          }}
          className=" flex w-[85%] flex-col items-center justify-center justify-self-center "
        >
          <h4 className="text-xl font-bold text-[#8d8c8cea]">{doc.name}</h4>
          {doc.timestamp && <p>{doc.timestamp.toDate().toDateString()}</p>}
        </div>
        <div className=" flex w-[15%] items-end justify-end ">
          <CircularButton
            deletion={true}
            icon={
              <TrashIcon className=" h-10 w-7 cursor-pointer  text-white duration-[500s] ease-in" />
            }
            onClick={() => {
              DeletePDF({ pdf: doc.ID.toString() })
            }}
          />
        </div>
      </div>
    )
  })

  const SearchForUsers = allUsers.map((user, index) => {
    return (
      <div
        onClick={() => {
          if (selectedPDF != '') {
            setUsersSent([...usersSent, user])
          } else {
            //remove the user from the list of usersSent using index
            if (usersSent.includes(user)) {
              usersSent.splice(index, 1)
              setUsersSent([...usersSent])
            }
          }
        }}
        className={` my-3 mx-2 flex w-[90%] cursor-pointer flex-col items-center rounded-md ${
          usersSent.includes(user) ? 'bg-[#458ef3]' : 'bg-white'
        } `}
      >
        <h4
          className={`m-3 text-lg ${
            usersSent.includes(user) ? 'text-[#ffffff]' : 'text-black'
          }`}
        >
          {user.fullName}
        </h4>
      </div>
    )
  })

  const uploadImage = ({ e }) => {
    const file = e.target.files
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      // setSelectedPDF(fileReader.result)
      //get the name of the file

      AddPDFToStorage({
        pdf: fileReader.result,
        name: file[0].name,
        requiredPages: [],
      })
    }

    fileReader.readAsDataURL(file[0])
  }

  // const PDFViewer = ({ pdfUrl }) => {
  //   useEffect(() => {
  //     pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

  //     pdfjs
  //       .getDocument(pdfUrl)
  //       .promise.then((pdf) => {
  //         setTotalNumberOfPages(pdf.numPages)

  //         return pdf.getPage(selectedPageNumber)
  //       })

  //       .then((page) => {
  //         const canvas = canvasRef.current
  //         if (context) {
  //           context.clearRect(0, 0, canvas.width, canvas.height)
  //           context.beginPath()
  //         }
  //         const context = canvas.getContext('2d')

  //         const viewport = page.getViewport({ scale: 1.2 })
  //         canvas.height = viewport.height
  //         canvas.innerWidth = viewport.width
  //         canvas.innerHigh = viewport.height

  //         canvas.width = viewport.width
  //         setCanvasHight(viewport.height)
  //         setCanvasWidth(viewport.width)

  //         return page.render({ canvasContext: context, viewport }).promise
  //       })
  //       .then(() => {
  //         signatureImageMap.map((signature) => {
  //           if (signature.page === selectedPageNumber) {
  //             const img = new Image()
  //             img.src = signature.signature
  //             img.setAttribute('crossOrigin', 'anonymous') // works for me
  //             //change the image scale

  //             img.onload = () => {
  //               const canvas = canvasRef.current
  //               const context = canvas.getContext('2d')

  //               //change the scale of the image
  //               // context.scale(1, 1)
  //               context.drawImage(img, signature.x, signature.y, 200, 100)
  //             }
  //           }
  //         })
  //       })

  //     // const img = new Image()
  //     // img.src = signature.signature
  //     // img.setAttribute('crossOrigin', 'anonymous') // works for me
  //     // //change the image scale

  //     // img.onload = () => {
  //     //   const canvas = canvasRef.current
  //     //   const context = canvas.getContext('2d')

  //     //   //change the scale of the image
  //     //   // context.scale(1, 1)
  //     //   context.drawImage(img, xDropPosition, yDropPosition, 200, 100)
  //     // }

  //     //render as image
  //     // .then(() => {
  //     //   const imgData = canvasRef.current.toDataURL()
  //     //   const img = document.createElement('img')
  //     //   img.src = imgData
  //     //   document.body.appendChild(img)
  //     // })
  //   }, [pdfUrl, selectedPageNumber, signatureImageMap])

  //   return (
  //     <canvas
  //       onDragOver={dragOver}
  //       // onDropCapture={drop}
  //       onMouseMove={dragOver}
  //       onDrop={drop}
  //       onDragStart={dragStart}
  //       onDragEnd={dragEnd}
  //       ref={canvasRef}
  //     />
  //   )
  // }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  const optionWindow = () => {
    if (showMyDocs) {
      return <>{MyDocs}</>
    } else if (sharePDF) {
      return <>{SearchForUsers}</>
    } else {
      return <>{SignaturesList}</>
    }
  }

  //drag and drop svg to pdf
  const dragOver = (e) => {
    e.preventDefault()
    //calculate the position of the mouse on the canvas its offset
    // var x = e.clientX + e.target.getBoundingClientRect().left

    //
    // console.log(x, y)
  }
  //2200 is the hight of the canvas
  //1300 is the width of the canvas
  const drop = (e) => {
    e.preventDefault()
    const x = e.clientX - e.target.getBoundingClientRect().left - 80
    const y = e.clientY - e.target.getBoundingClientRect().top - 50

    setXDropPosition(x)
    setYDropPosition(y)

    // console.log('target', target)

    //add the page number to the array

    pagesWithSignatures.push(selectedPageNumber)
    if (isTyped && showTypedText) {
      signatureImageMap.push({
        page: selectedPageNumber,
        x: x + 40,
        y: y + 45,
        signature: svgUrl,
        text: typedText,
      })
    } else {
      signatureImageMap.push({
        page: selectedPageNumber,
        x: x,
        y: y,
        signature: svgUrl,
      })
    }
  }

  const dragStart = (e) => {
    const target = e.target
    e.dataTransfer.setData('text', target.id)
    setTimeout(() => {
      target.style.display = 'none'
    }, 0)
  }

  const dragEnd = (e) => {
    const target = e.target
    target.style.display = 'block'
  }

  return (
    <div className="flex  w-full flex-col items-center justify-center">
      <Header selectCompany={'AMA'} />
      <main className=" item center relative my-20 flex w-full flex-row justify-center">
        {addSignature && (
          <div className=" absolute top-[5%] z-20 flex w-[60%]  grid-cols-2 items-start justify-center rounded-3xl bg-[#d1d0d0f8]">
            <div className=" m-2 flex  h-full w-[10%]    ">
              <CircularButton
                icon={
                  <XMarkIcon className="  h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                onClick={() => setAddSignature(false)}
              />
            </div>
            <div className=" w-[100%] items-center justify-center">
              <SignatureField />
            </div>
          </div>
        )}

        {/* make sticky control panel */}
        <div className=" z-19 sticky top-20  mx-5 flex h-[20%] w-[30%] flex-col items-center justify-center overflow-y-scroll ">
          <div className=" flex h-[25%] w-full grid-cols-2 flex-row justify-end rounded-md bg-black">
            <div className=" m-2">
              <a id="DownloadButton">
                <CircularButton
                  icon={
                    <ArrowDownTrayIcon className="  h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  onClick={async () => {
                    //download pdf
                    //for each page of the pdf download

                    const pdf = new jsPDF()

                    setSelectedPageNumber(1)
                    await sleep(2000)
                    for (let i = 1; i <= totalNumberOfPages; i++) {
                      setSelectedPageNumber(i)
                      await sleep(2000)

                      const canvas = canvasRef.current
                      const imgData = canvas.toDataURL('image/png')
                      pdf.addImage(imgData, 'PNG', 0, 0)
                      pdf.addPage()
                      if (i === totalNumberOfPages) {
                        pdf.save('download.pdf')
                      }
                      // Wait for 1 second before getting the URL
                    }
                  }}
                />
              </a>
              <Tooltip
                anchorId="DownloadButton"
                content="Download PDF with changes made to it if there are any."
              />
            </div>
            <div className=" m-2">
              <a id="DocButton">
                <CircularButton
                  icon={
                    <DocumentIcon
                      className={`  ${
                        showMyDocs ? 'text-[#ffffff]' : 'text-black'
                      } h-10 w-7
                      cursor-pointer duration-[500s] ease-in`}
                    />
                  }
                  isSelection={showMyDocs}
                  onClick={() => {
                    setShowMyDocs(!showMyDocs)
                    setSharePDF(false)
                  }}
                />
              </a>
              <Tooltip anchorId="DocButton" content="My PDFs." />
            </div>
            <div className=" m-2">
              <a id="ShareButton">
                <CircularButton
                  isSelection={sharePDF}
                  icon={
                    <ShareIcon
                      className={` h-10 w-7 cursor-pointer ${
                        sharePDF ? 'text-[#ffffff]' : 'text-black'
                      }   duration-[500s] ease-in`}
                    />
                  }
                  onClick={() => {
                    setSharePDF(!sharePDF)
                    if (!sharePDF) {
                      setUsersSent([])
                    }
                    setShowMyDocs(false)
                  }}
                />
              </a>
              <Tooltip anchorId="ShareButton" content="Share PDF." />
            </div>
            <div className=" m-2">
              <a id="JumpButton">
                <CircularButton
                  icon={
                    <ArrowRightIcon className="  h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  tooltipContent="Next Required Page"
                  onClick={() => {
                    //increment page required page
                    //check if it is the last page
                    //if it is the last page then set it to the first page
                    if (requiredPageIndex === requiredPages.length) {
                      setRequiredPageIndex(0)
                      setSelectedPageNumber(requiredPages[0])
                    } else {
                      setRequiredPageIndex(requiredPageIndex + 1)
                      setSelectedPageNumber(requiredPages[requiredPageIndex])
                    }
                  }}
                />
              </a>
              <Tooltip
                anchorId="JumpButton"
                content="Jump to next page the requires signature."
              />
            </div>
            <div className=" m-2">
              <a id="AddButton">
                <CircularButton
                  icon={
                    <PlusIcon className="  h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  onClick={() => setAddSignature(true)}
                />
              </a>
              <Tooltip
                anchorId="AddButton"
                content="Add new signature or hand writing."
              />
            </div>
          </div>
          <div
            className={` ${
              sharePDF ? 'justify-end' : 'justify-center'
            } flex h-[300px] w-[100%] flex-col items-center justify-end  rounded-md bg-gray-100`}
          >
            <div className="    w-[90%] flex-col items-center justify-center overflow-y-scroll">
              {optionWindow()}
            </div>
            {usersSent.length > 0 && sharePDF && (
              <div className="absolute z-20 flex  items-center justify-end  ">
                <CircularButton
                  isSelection={true}
                  icon={
                    <PaperAirplaneIcon className=" h-10 w-7 cursor-pointer  text-white duration-[500s] ease-in" />
                  }
                  onClick={() => {
                    usersSent.forEach((user) => {
                      AddPDFToUser({
                        pdf: selectedPDF,
                        email: user.email,
                        name: user.fullName,
                        requiredPages: requiredPages,
                      }).then(() => {
                        setUsersSent([])
                        setSharePDF(false)
                        setRequiredPages([])
                      })
                    })
                  }}
                />
              </div>
            )}
          </div>
          <div className=" my-10">
            {selectedPDF && (
              <MainButton
                buttonText="Click to add Required Pages"
                onClick={() => {
                  //append page to required pages
                  setRequiredPages([...requiredPages, selectedPageNumber])
                }}
              />
            )}
            {requiredPages.length > 0 && (
              <div>
                <a id="requiredPages">
                  <div
                    onClick={() => {
                      //remove page from required pages
                      setRequiredPages(
                        requiredPages.filter(
                          (page) => page !== selectedPageNumber
                        )
                      )
                    }}
                    onDoubleClick={() => {
                      //remove all pages from required pages
                      setRequiredPages([])
                    }}
                    className="my-1 flex flex-row justify-center rounded-3xl hover:bg-red-500"
                  >
                    <p className="hover:text-[#ffffff]">
                      Required Pages: {requiredPages.map((page) => page + ', ')}
                    </p>
                  </div>
                </a>
                <Tooltip
                  anchorId="requiredPages"
                  content="Single click to remove page. Double click to remove all."
                />
              </div>
            )}
          </div>
          <div className=" flex flex-col items-center justify-center">
            <div className=" flex flex-row items-center justify-center">
              <TextInput
                placeHolder="Add Typed Text to PDF"
                widthPercentage="w-[100%]"
                onChange={(text) => {
                  setTypedText(text.target.value)
                }}
                value={typedText}
              />
              <div className=" mx-2">
                <CircularButton
                  icon={
                    <PlusIcon className="  h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  onClick={() => {
                    if (typedText) {
                      setShowTypedText(true)
                    }
                  }}
                />
              </div>
            </div>
            <div className=" rounded-3xl  bg-[#eeeeee]">
              {typedText && showTypedText && (
                <p
                  draggable
                  onDragStart={() => {
                    setIsTyped(true)
                    setSvgUrl(
                      `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size:15px">${typedText}</div></foreignObject></svg>`
                    )
                  }}
                  className="m-2"
                >
                  {typedText}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex h-[85%] w-[70%]  items-center  pt-[5px]">
          <div className=" h-full  w-full justify-center overflow-y-scroll  ">
            {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
              <Toolbar />
             
              <Viewer
                viewerRef={viewer}
                plugins={[toolbarPluginInstance]}
                fileUrl={pdfURL}
                renderPage={renderSignature}
              />
            
            </Worker> */}
            <TextInput
              // ref={filePicker}
              type="file"
              widthPercentage="w-[50%]"
              placeHolder="Add PDF"
              onChange={(text) => {
                uploadImage({ e: text })
              }}
            />
            {selectedPDF && (
              <div className=" flex flex-col  items-center justify-center">
                <MainButton
                  buttonText="Clear last Change"
                  onClick={() => {
                    setSignatureImageMap([...signatureImageMap.slice(0, -1)])
                  }}
                />
                <div className=" flex items-center justify-center">
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
                  <div className=" h-[1080px] w-[720px] ">
                    <PdfViewerComponent
                      //https://arxiv.org/pdf/quant-ph/0410100.pdf
                      pdfUrl={selectedPDF}
                      selectedPageNumber={selectedPageNumber}
                      signatureImageMap={signatureImageMap}
                      canvasRef={canvasRef}
                      setCanvasHight={setCanvasHight}
                      setCanvasWidth={setCanvasWidth}
                      setTotalNumberOfPages={setTotalNumberOfPages}
                      dragEnd={dragEnd}
                      dragStart={dragStart}
                      dragOver={dragOver}
                      drop={drop}
                    />
                  </div>
                  <div className=" flex flex-row items-center justify-center">
                    <div className=" mx-5"></div>
                    <ArrowButton
                      direction={'right'}
                      onClick={() => {
                        if (selectedPageNumber <= totalNumberOfPages) {
                          setSelectedPageNumber(selectedPageNumber + 1)
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
export default PdfSignatures
