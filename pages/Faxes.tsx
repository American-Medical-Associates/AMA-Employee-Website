import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import PdfViewerComponent from '../components/PdfViewerComponent'
import { getFaxes } from '../firebase'
const Faxes: NextPage<{}> = () => {
  const [fax, setFax] = useState(null)
  useEffect(() => {
    getFaxes({ singleFax: setFax })
    console.log(fax)
  }, [])

  return <div>{fax != null && <PdfViewerComponent document={fax} />}</div>
}
export default Faxes
