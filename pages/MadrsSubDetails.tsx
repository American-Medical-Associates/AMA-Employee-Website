import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetMadrs } from '../firebase/firebase'; // Modify according to your Firebase functions

const MadrsSubDetails = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [submissionDetails, setSubmissionDetails] = useState(null);

//   useEffect(() => {
//     if (id) {
//     GetMadrs({ setMadrs: id }).then(data => setSubmissionDetails(data));
//     }
//   }, [id]);

//   if (!submissionDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Submission Details</h2>
//       <p>Name: {submissionDetails.name}</p>
//       <p>Date: {submissionDetails.date}</p>
//       {/* Display other details */}
//     </div>
//   );
};

export default MadrsSubDetails;
