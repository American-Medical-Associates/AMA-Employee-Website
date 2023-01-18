import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import PdfViewerComponent from '../components/pdfCompnents/PdfViewerComponent'
import { getFaxes } from '../firebase'
const Faxes: NextPage<{}> = () => {
  const [fax, setFax] = useState(null)
  useEffect(() => {
    getFaxes({ singleFax: setFax })
    console.log(fax)
  }, [])

  return <div></div>
}
export default Faxes
