// import { firestore } from 'firebase-admin'
// import twilio from 'twilio'
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const dbAdmin = admin.firestore()
const credentials = functions.config().twilio
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const cors = require('cors')({ origin: true })
const authToken = '3c264ca0f5fbef4daec5de44d8f84735'
const accountSid = 'AC7a9ba0ddb353781ffd3cb79bc63c58ed'
const client = require('twilio')(credentials.sid, credentials.token)

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
  cors(req, res, () => {
    // const doc = snap.data()
    // const phone1 = doc.phone1
    functions.logger.log('+++++ found doc ++++++++')
    console.log('tests')
    return client.messages
      .create({
        body: data.message,
        //messagingServiceSid: 'MG3f22a866f08c4979f7e175974280b1fd',
        from: '+17473265599',
        to: data.phoneNumber,
      })
      .then((message) => functions.logger.log(message.sid, 'done'))
      .catch((e) => functions.logger.error(e))
      .done()
  })
})
