import React, { use } from 'react'
import { useEffect, useState } from 'react'
import Header from '../components/navigation/Header'
import Router, { useRouter } from 'next/router'
import { auth } from '../firebase/firebaseConfig'
import CustomCheckBoxField from '../components/formComponents/CustomCheckBoxField'

export default function MADRS() {
  const [apparentSadness, setApparentSadness] = useState([])
  const [requiredApparentSadness, setRequiredApparentSadness] = useState(false)
  const [reportedSadness, setReportedSadness] = useState([])
  const [requiredReportedSadness, setRequiredReportedSadness] = useState(false)
  const [innerTension, setInnerTension] = useState([])
  const [requiredInnerTension, setRequiredInnerTension] = useState(false)
  const [reducedSleep, setReducedSleep] = useState([])
  const [requiredReducedSleep, setRequiredReducedSleep] = useState(false)

  // Authenticated user check. Reality this makes it so no one can copy and paste a link to access the page.
  const router = useRouter()
  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  return (
    <div className='bg-gray-100'>
      <Header selectCompany={'AMA'} routePatientsHome={true} />
      <div className="text-center mx-10 my-5">
        <h1 className="mb-3 font-bold text-xl">
          Montgomery-Asberg Depression Scale (MADRS)
        </h1>
        <p className="ml-10 mr-10">
          <strong>Instructions: </strong>The ratings should be based on a
          clinical interview moving from broadly phrased questions about
          symptoms to more detailed ones which allow a precise rating of
          severity. The rater must decide whether the rating lies on the defined
          scale stepss (0, 2, 4, 6) or between them (1, 3, 5). It is important
          to remember that it is only rare occasions that a depressed patient is
          encountered who cannot be rated on the items in the scale. If definite
          answers cannot be dictated from the patients, all relevant clues as
          well as information from other sources should be used as a basis for
          the rating in line with customart clinical practice. This scale may be
          used for any time interval between ratings, be it weekly or otherwise,
          but this must be recorded.
        </p>
      </div>
      <div className='flex flex-wrap justify-center items-start mx-8 my-5 bg-white border-4 border-solid rounded-xl shadow-outline shadow-xl shadow-gray'>
        <div className='w-full md:w-1/2 px-4'>
          <CustomCheckBoxField
            id="apparentSadness"
            title="Apparent Sadness"
            checkBoxValues={apparentSadness}
            setCheckBoxValues={setApparentSadness}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 No Sadness',
              '1',
              '2 Looks dispirited but does brighten up without difficulty.',
              '3',
              '4 Appears sad and unhappy most of the time.',
              '5',
              '6 Looks miserable all the time. Extremely despondent.',
            ]}
            required={requiredApparentSadness}
          />
        </div>
        <div className='w-full md:w-1/2 px-4'>
          <CustomCheckBoxField
            id="reportedSadness"
            title="Reported Sadness"
            checkBoxValues={reportedSadness}
            setCheckBoxValues={setReportedSadness}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 Occasional sadness in keeping with the circumstances.',
              '1',
              '2 Sad or low but brightens up without difficulty.',
              '3',
              '4 Pervasive feelings of sadness or gloominess. The mood is still influenced by external circumstances.',
              '5',
              '6 Continous or unvarying sadness, misery, or despondency.',
            ]}
            required={requiredReportedSadness}
          />
        </div>
        <div className='w-full md:w-1/2 px-4'>
          <CustomCheckBoxField
            id="innerTension"
            title="Inner Tension"
            checkBoxValues={innerTension}
            setCheckBoxValues={setInnerTension}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 Placid. Only reflecting inner tension',
              '1',
              '2 Occasional feelings of edginess and ill-defined discomfort.',
              '3',
              '4 Continous feelings of inner tension or intermitten panic which the patient can only master with some difficulty.',
              '5',
              '6 Unrelenting dread or anguish. Overwhelming panic.',
            ]}
            required={requiredInnerTension}
          />
        </div>
        <div className='w-full md:w-1/2 px-4'>
          <CustomCheckBoxField
            id="reducedSleep"
            title="Reduced Sleep"
            checkBoxValues={reducedSleep}
            setCheckBoxValues={setReducedSleep}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              '0 Sleeps as usual.',
              '1',
              '2 Slight difficulty dropping off to sleep or slightly reduced light or fitful sleep.',
              '3',
              '4 Sleep reduced or broken by at least two hours.',
              '5',
              '6 Less than two or three hours of sleep.',
            ]}
            required={requiredReducedSleep}
          />
        </div>
      </div>
    </div>
  )
}
