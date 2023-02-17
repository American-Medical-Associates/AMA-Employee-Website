import React, { useState } from 'react'
import Header from '../components/Header'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'
import TextInput from '../components/TextInput'
import MainButton from '../components/MainButton'

// CURRENTLY A WORK IN PROGRESS

// function ForgotPassword() {
//   const [email, setEmail] = useState('')
//   const [errorMessage, setErrorMessage] = useState('')

//   async function sendPasswordResetEmail(email: string) {
//     try {
//       await auth.sendPasswordResetEmail(email)
//       console.log('Password reset email sent')
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault()
//     if (!email) {
//       setErrorMessage('Please enter your email address.')
//       return
//     }
//     try {
//       await sendPasswordResetEmail(email)
//       setErrorMessage('')
//     } catch (error) {
//       setErrorMessage('Error sending password reset email.')
//       console.error(error)
//     }
//   }

//   return (
//     <div>
//       <Header selectCompany={'AMA'} />

//       <div className="m-3 flex flex-col items-center justify-center">
//         <form onSubmit={handleSubmit}>
//           {/* <label>
//             Email:
//             <input
//               className="ml-3 rounded-3xl bg-[#f2f2f2] p-3"
//               type="email"
//               value={email}
//               onChange={(event) => setEmail(event.target.value)}
//             />
//           </label> */}
//           <div className="flex flex-row ">
//             <TextInput
//               id="email"
//               placeHolder="Email"
//               onChange={(event) => setEmail(event.target.value)}
//             />

//             <MainButton buttonText="Reset Password" onClick={handleSubmit} />

//             {/* <button
//               type="submit"
//               className="ml-3 rounded-3xl bg-[#0008ff] p-3 text-white"
//             >
//               Reset Password
//             </button> */}
//             {errorMessage && <p className="mt-4 text-center">{errorMessage}</p>}
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default ForgotPassword
