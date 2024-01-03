// import React, {useState, useEffect, useRef} from 'react'
// import Header from '../components/navigation/Header'
// import { NextPage } from 'next';
// import { useRouter } from 'next/router';
// import { GetMadrs, auth } from '../firebase/firebase';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// const MadrsSubmissions: NextPage<{}> = () => {
//   interface MADRSForm {
//     name: string,
//     date: string,
//     totalScore: number,
//     apparentSadness: number,
//     reportedSadness: number,
//     innerTension: number,
//     reducedSleep: number,
//     reducedAppetite: number,
//     ConcentrationDifficulties: number,
//     lassitude: number,
//     inabilityToFeel: number,
//     pessimisticThoughts: number,
//     suicidalThoughts: number,
//   }

//   const router = useRouter()
//   const submissionRefs = useRef<Array<HTMLDivElement | null>>([]);

//   useEffect(() => {
//     if (!auth.currentUser?.email) {
//       router.push('/PatientLogin')
//     }
//   }, [])

//   const [madrs, setMadrs] = useState<Array<MADRSForm>>([])
//   const [collapsed, setCollapsed] = useState(true)
//   const [collapsedArray, setCollapsedArray] = useState<Array<MADRSForm>>([])

//   useEffect(() => {
//     GetMadrs({ setMadrs: setMadrs })
//   }, [])

//   const exportSinglePDF = async (index: number) => {
//     console.log("Current refs before export:", submissionRefs.current);

//     const element = submissionRefs.current[index];
//     if (element) {
//       const canvas = await html2canvas(element);
//       const data = canvas.toDataURL('image/png');

//       const pdf = new jsPDF();
//       const imgProperties = pdf.getImageProperties(data);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

//       pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`submission-${index}-pdf.pdf`);
//     } else {
//       console.error(`Element for submission ${index} not found`);
//     }
//   };

//   const Madrs = madrs.map((madrs, index) => {
//     const submissionId = `submission-${index}`;

//     if(!collapsedArray.includes(madrs)) {
//       return (
//         <div key={submissionId} id={submissionId}
//           ref={(el) => submissionRefs.current[index] = el}
//           className="mb-6 flex w-[100%] mt-5 flex-col items-center justify-center rounded-3xl bg-[#d8d7d77b]"
//           onClick={() => {
//             setCollapsedArray([...collapsedArray, madrs])
//           }}
//         >
//           <div className=" my-5">
//             <h3 className=" text-center text-2xl text-[#457aff]">Submission</h3>
//             <p className=" text-center">{madrs.name}</p>
//           </div>
//         </div>
//       )
//     } else {
//       return (
//         <div
//           key={submissionId + "-expanded"}
//           className="mb-6 flex w-[60%] flex-col items-center justify-center rounded-3xl bg-[#d8d7d77b]"
//           onClick={() => {
//             const newArray = collapsedArray.filter((item) => item !== madrs);
//             setCollapsedArray(newArray);          
//           }}
//         >
//           <div className=" my-5">
//             <h3 className=" text-center text-2xl text-[#457aff]">Date:</h3>
//             <p className=" text-center">{madrs.date}</p>
//           </div>
//           <div className=" my-5">
//             <h3 className=" text-center text-2xl text-[#457aff]">Apparent Sadness: </h3>
//             <p className=" text-center">{madrs.apparentSadness}</p>
//           </div>
//           <div className=" my-5">
//             <h3 className=" text-center text-2xl text-[#457aff]">
//               Reported Sadness:
//             </h3>
//             <p className=" text-center">{madrs.reportedSadness}</p>
//           </div>
//           <div className=" my-5">
//             <h3 className=" text-center text-2xl text-[#457aff]">
//               Inner Tension:
//             </h3>
//             <p className=" text-center">{madrs.innerTension}</p>
//           </div>
//           <div className=" my-5">
//             <h3 className=" text-center text-2xl text-[#457aff]">
//               Reduced Sleep:
//             </h3>
//             <p className=" text-center">{madrs.reducedSleep}</p>
//           </div>
//           <div className=" my-5">
//             <h3 className=" text-center text-2xl text-[#457aff]">Reduced Appetite:</h3>
//             <p className=" text-center">{madrs.reducedAppetite}</p>
//           </div>
//           <div className=" my-5">
//             <h3 className=" text-center text-2xl text-[#457aff]">
//               Concentration Difficulties:
//             </h3>
//             <p className=" text-center">{madrs.ConcentrationDifficulties}</p>
//           </div>
//           <div className=" my-5">
//             <h3 className=" text-center text-2xl text-[#457aff]">
//               Lassitude:
//             </h3>
//             <p className=" text-center">{madrs.lassitude}</p>
//           </div>
//           <div className=" my-5">
//             <h3 className=" text-center text-2xl text-[#457aff]">
//               Inability to Feel:
//             </h3>
//             <p className=" text-center">{madrs.inabilityToFeel}</p>
//           </div>
//           <div className=" my-5">
//             <h3 className=" text-center text-2xl text-[#457aff]">
//               Pessimistic Thoughts:
//             </h3>
//             <p className=" text-center">{madrs.pessimisticThoughts}</p>
//           </div>
//           <div className=" my-5">
//             <h3 className=" text-center text-2xl text-[#457aff]">
//               Suicidial Thoughts:
//             </h3>
//             <p className=" text-center">{madrs.suicidalThoughts}</p>
//           </div>
//           <div className=" my-5">
//             <h3 className=" text-center text-2xl text-[#457aff] font-bold">
//               Total Score:
//             </h3>
//             <p className=" text-center">{madrs.totalScore}</p>
//           </div>
//           <button
//           className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={(e) => {
//             e.stopPropagation();
//             console.log("Refs before export:", submissionRefs.current);
//             exportSinglePDF(index);
            
//           }}
//         >
//           Export PDF
//         </button>
//         </div>
//       )
//     }
//   })
//   useEffect(() => {
//     console.log("Refs after state update and render:", submissionRefs.current);
//   }, [madrs]); // This useEffect will run after the madrs state changes and the component re-renders
  

//   return (
//     <div className=" flex flex-col items-center justify-center">
//       <Header selectCompany={"AMA"} routePatientsHome={true} />
//       <div className=" flex flex-col items-center justify-center">
//         <h1 className=" text-4xl text-[#457aff]">MADRS Submissions</h1>
//         {Madrs}
//       </div>
//     </div>
//   )
// }

// export default MadrsSubmissions

import React, { useState, useEffect } from 'react';
import Header from '../components/navigation/Header';
import { useRouter } from 'next/router';
import { GetMadrs, auth } from '../firebase/firebase';

interface Submission {
  id: string;
  name: string;
  date: string;
}

const MadrsSubmissions = () => {
  const router = useRouter();
  const [madrs, setMadrs] = useState<Submission[]>([]);

  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin');
    }
  }, []);

  useEffect(() => {
    GetMadrs({ setMadrs: setMadrs });
  }, []);

  const handleSubmissionClick = (submission: Submission) => {
    // Redirect to the details page with submission info
    router.push(`/MadrsSubDetails/${submission.id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Header selectCompany={"AMA"} routePatientsHome={true} />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl text-[#457aff]">MADRS Submissions</h1>
        <div>
          {madrs.map((submission, index) => (
            <div key={index} className="cursor-pointer" onClick={() => handleSubmissionClick(submission)}>
              <p>{submission.name} - {submission.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MadrsSubmissions;
