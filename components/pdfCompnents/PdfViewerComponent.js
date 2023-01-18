import { useEffect, useRef } from 'react'
import { jsPDF } from 'jspdf'
import * as pdfjs from 'pdfjs-dist'
const PdfViewerComponent = ({
  pdfUrl,
  selectedPageNumber,
  signatureImageMap,
  canvasRef,
  setCanvasHight,
  setCanvasWidth,
  setTotalNumberOfPages,
  dragOver,
  drop,
  dragStart,
  dragEnd,
}) => {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

    pdfjs
      .getDocument(pdfUrl)
      .promise.then((pdf) => {
        setTotalNumberOfPages(pdf.numPages)

        return pdf.getPage(selectedPageNumber)
      })

      .then((page) => {
        const canvas = canvasRef.current
        // if (context) {
        //   context.clearRect(0, 0, canvas.width, canvas.height)
        //   context.beginPath()
        // }
        const context = canvas.getContext('2d')

        const viewport = page.getViewport({ scale: 1.2 })
        canvas.height = viewport.height
        canvas.innerWidth = viewport.width
        canvas.innerHigh = viewport.height

        canvas.width = viewport.width
        setCanvasHight(viewport.height)
        setCanvasWidth(viewport.width)

        return page.render({ canvasContext: context, viewport }).promise
      })
      .then(() => {
        //check if signatureImageMap is different from prevoius render

        signatureImageMap.map((signature) => {
          if (signature.page === selectedPageNumber) {
            const img = new Image()
            img.src = signature.signature
            img.setAttribute('crossOrigin', 'anonymous') // works for me
            //change the image scale

            img.onload = () => {
              const canvas = canvasRef.current
              const context = canvas.getContext('2d')

              //change the scale of the image
              // context.scale(1, 1)
              context.drawImage(img, signature.x, signature.y, 200, 100)
            }
          }
        })
      })

    // const img = new Image()
    // img.src = signature.signature
    // img.setAttribute('crossOrigin', 'anonymous') // works for me
    // //change the image scale

    // img.onload = () => {
    //   const canvas = canvasRef.current
    //   const context = canvas.getContext('2d')

    //   //change the scale of the image
    //   // context.scale(1, 1)
    //   context.drawImage(img, xDropPosition, yDropPosition, 200, 100)
    // }

    //render as image
    // .then(() => {
    //   const imgData = canvasRef.current.toDataURL()
    //   const img = document.createElement('img')
    //   img.src = imgData
    //   document.body.appendChild(img)
    // })
  }, [
    pdfUrl,
    selectedPageNumber,
    signatureImageMap.length,
    setTotalNumberOfPages,
  ])

  return (
    <canvas
      onDragOver={dragOver}
      // onDropCapture={drop}
      onMouseMove={dragOver}
      onDrop={drop}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      ref={canvasRef}
    />
  )
}

export default PdfViewerComponent
