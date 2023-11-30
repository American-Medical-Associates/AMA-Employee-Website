import React from 'react'
import Header from '../components/navigation/Header'

export default function MADRS() {
  return (
    <div>
      <Header selectCompany={'AMA'} routePatientsHome={true} />
      <div className='text-center m-5'>
        <h1 className='mb-3 font-bold text-xl'>Montgomery-Asberg Depression Scale (MADRS)</h1>
        <p className='ml-10 mr-10'><strong>Instructions: </strong>The ratings should be based on a clinical interview moving from broadly phrased questions about symptoms to more
        detailed ones which allow a precise rating of severity. The rater must decide whether the rating lies on the defined scale stepss (0, 2, 4, 6) or
        between them (1, 3, 5). It is important to remember that it is only rare occasions that a depressed patient is encountered who cannot be rated
        on the items in the scale. If definite answers cannot be dictated from the patients, all relevant clues as well as information from other sources
        should be used as a basis for the rating in line with customart clinical practice. This scale may be used for any time interval between ratings,
        be it weekly or otherwise, but this must be recorded.</p>
      </div>
    </div>
  )
}