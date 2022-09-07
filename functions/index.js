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
const chrome = require('selenium-webdriver/chrome')

const { Builder, By, Key, until } = require('selenium-webdriver')
const client = require('twilio')(credentials.sid, credentials.token)
const express = require('express')
const app = express()
const cors = require('cors')
app.use(
  cors({
    origin: true,
  })
)
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
const puppeteer = require('puppeteer')

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

exports.addPatientToEclinical = functions.https.onCall(
  async (data, context) => {
    const screen = {
      width: 640,
      height: 480,
    }
    try {
      let driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().headless().windowSize(screen))

        .build()

      await driver.get(
        'https://azamasapp.ecwcloud.com/mobiledoc/jsp/webemr/login/newLoginStep2.jsp'
      )
      await sleep(3000)
      //input  login info
      await driver
        .findElement(By.xpath('//*[@id="doctorID"]'))
        .sendKeys('zachrizzo')
      await sleep(3000)
      await driver
        .findElement(By.xpath('//*[@id="passwordField"]'))
        .sendKeys('Karen013074!')
      await sleep(1000)
      await driver.findElement(By.xpath('//*[@id="Login"]')).click()
      await sleep(10000)
      //navigate to patient managment page
      await driver
        .findElement(By.xpath('//*[@id="jellybean-panelLink65"]'))
        .click()
      await sleep(3000)
      //search for patient
      //last name,first name
      await driver
        .findElement(By.xpath('//*[@id="searchText"]'))
        .sendKeys('rizzo,zach')
      //dob
      await driver
        .findElement(By.xpath('//*[@id="patientSearchIpt3"]'))
        .sendKeys('05221999')
      await sleep(1000)
      //click patient
      await driver
        .findElement(
          By.xpath('//*[@id="rule-table2"]/tbody/tr[2]/td[5]/span/span')
        )
        .click()
      await sleep(5000)
      //click info button
      await driver
        .findElement(
          By.xpath(
            '//*[@id="phub_dialog"]/div/div[2]/div/div[2]/div/div[1]/div/div[1]/div[2]/div[1]/span[2]'
          )
        )
        .click()
      await sleep(2000)
      //add phone number
      await driver
        .findElement(By.xpath('//*[@id="ptcellphone"]'))
        .sendKeys('16233133389')

      //save changes
      await driver
        .findElement(By.xpath('//*[@id="patient-demographicsBtn56"]'))
        .click()
      await sleep(5000)

      functions.logger.log('adding patient to eclinic')
    } catch (error) {
      functions.logger.log('error adding patient to eclinic')
      functions.logger.log(error)
    }
    return 'done'
  }
)

exports.addPatientToEclinicalPuppeteer = functions
  .runWith({ memory: '1GB', timeoutSeconds: 400 })
  .https.onCall(async (data, context) => {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()
    await page.goto(
      'https://azamasapp.ecwcloud.com/mobiledoc/jsp/webemr/login/newLoginStep2.jsp'
    )

    await page.type('#doctorID', 'zachrizzo')
    await sleep(5000)
    functions.logger.log('typed in doctor id')
    await page.click('#nextStep')

    // const imageBuffer = await page.screenshot()
    // context.set('Content-Type', 'image/png')
    // context.send(imageBuffer)
    //find password field with xpath
    await sleep(1000)
    await page.type('#passwordField', 'Karen013074!')

    // await page.waitForSelector('#passwordField')
    // await page.type('#passwordField', 'Karen013074!')
    await sleep(1000)
    functions.logger.log('clicking login')

    await sleep(10000)
    await Promise.all([page.click('#Login'), page.waitForNavigation()])
    await page.click('#jellybean-panelLink65')
    await sleep(5000)
    // const nameSearch = await page.evaluate(() => {
    //   return document.querySelector('id="searchText"')
    // })
    await page.type(
      '#patient-lookup-screen-detview > div > div.col-sm-7 > div:nth-child(1) > div > div > div > div.col-sm-7.nopadding.pr10 > div > input',
      'rizzo,zach'
    )
    await sleep(1000)
    functions.logger.log('typed in patient name')
    await page.type('#patientSearchIpt3', '05221999')
    await sleep(2000)
    await page.click(
      '#rule-table2 > tbody > tr:nth-child(2) > td:nth-child(5) > span > span'
    )
    functions.logger.log('clicked patient')
    await sleep(5000)
    await page.click(
      '#phub_dialog > div > div.modal-content > div > div.modal-body > div > div.modal-body-content > div > div.modal-body-content-left > div > div.modal-body-content-left-top > div > div.modal-body-content-left-top-right > div > span:nth-child(2)'
    )
    await sleep(2000)
    await page.type('#ptcellphone', '16233133389')
    await sleep(1000)
    await page.click('#patient-demographicsBtn56')
    await sleep(5000)

    await browser.close()
  })
