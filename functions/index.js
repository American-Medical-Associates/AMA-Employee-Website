// import { firestore } from 'firebase-admin'
// import twilio from 'twilio'
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { METHODS } = require('http')
admin.initializeApp()
const dbAdmin = admin.firestore()
const credentials = functions.config().twilio
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const client = require('twilio')(credentials.sid, credentials.token)
const express = require('express')
const app = express()
const cors = require('cors')
app.use(
  cors({
    origin: true,
  })
)

// const error = new Error('Test error')
exports.helloWorld = functions.https.onCall(async (request, response) => {
  //   const options = {
  //     origin: true,
  //   }
  //   cors(request, response, () => {
  functions.logger.info('Hello logs!', { structuredData: true })
  //   request.send('Hello from Firebase!')

  return console.log(credentials.sid + ' ' + credentials.token)
  // request.set('Access-Control-Allow-Origin', '*')
})
// })

// exports.sendMessage = functions.firestore
//   .document('applications/{docId}')
//   .onCreate((snap, context) => {
//     // const doc = snap.data()
//     // const phone1 = doc.phone1
//     functions.logger.log('+++++ found doc ++++++++')

//     return client.messages
//       .create({
//         body: 'We are watching you Bonnie.',
//         //messagingServiceSid: 'MG3f22a866f08c4979f7e175974280b1fd',
//         from: '+17473265599',
//         to: '+16233133383',
//       })
//       .then((message) => functions.logger.log(message.sid, 'done'))
//       .catch((e) => functions.logger.error(e))
//       .done()
//   })

exports.sendMessage = functions.https.onCall(async (data, context) => {
  //   cors(req, res, () => {
  // const doc = snap.data()
  // const phone1 = doc.phone1
  functions.logger.log('+++++ found doc ++++++++')
  console.log('tests')
  return client.messages
    .create({
      body: data.message,
      //messagingServiceSid: 'MG3f22a866f08c4979f7e175974280b1fd',
      from: '+17473265599',
      to: data.phone,
    })
    .then((message) => functions.logger.log(message.sid, 'done'))
    .catch((e) => functions.logger.error(e))
    .done()
})
// })
