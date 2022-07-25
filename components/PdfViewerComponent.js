import { useEffect, useRef } from 'react'

export default function PdfViewerComponent({ document }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    let instance, PSPDFKit
    ;(async function () {
      PSPDFKit = await import('pspdfkit')
      instance = await PSPDFKit.load({
        // The document to open.
        documentID: document,
        // Container where PSPDFKit should be mounted.
        container,
        // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
        // baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
      })
    })()

    return () => PSPDFKit && PSPDFKit.unload(container)
  }, [document])

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
}
