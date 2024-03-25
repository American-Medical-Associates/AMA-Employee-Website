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
  }),
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
        'https://azamasapp.ecwcloud.com/mobiledoc/jsp/webemr/login/newLoginStep2.jsp',
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
          By.xpath('//*[@id="rule-table2"]/tbody/tr[2]/td[5]/span/span'),
        )
        .click()
      await sleep(5000)
      //click info button
      await driver
        .findElement(
          By.xpath(
            '//*[@id="phub_dialog"]/div/div[2]/div/div[2]/div/div[1]/div/div[1]/div[2]/div[1]/span[2]',
          ),
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
  },
)

exports.addPatientToEclinicalPuppeteer = functions
  .runWith({ memory: '2GB', timeoutSeconds: 540 })
  .https.onCall(async (data, context) => {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })
      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
      }

      // const browser = await puppeteer.launch({
      //   headless: false,
      //   args: ["--no-sandbox", "--disable-setuid-sandbox"],
      // });
      const page = await browser.newPage()
      await page.goto(
        'https://azamasapp.ecwcloud.com/mobiledoc/jsp/webemr/login/newLoginStep2.jsp',
      )

      await page.type('#doctorID', 'zachrizzo')
      await sleep(1000)

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

      await Promise.all([page.click('#Login'), page.waitForNavigation()])
      await sleep(10000)
      console.log('logged in')

      await page.click(
        '#JellyBeanCountCntrl > div.lookup-toogle > div.dropdown.pull-left.lookdropdown',
      )
      await sleep(5000)

      await page.type('#searchText', `${data.lastName}, ${data.firstName}`)
      await sleep(1000)
      console.log('searched for patient name')

      await page.type('#patientSearchIpt3', data.BirthDateValue)
      await sleep(2000)
      console.log('searched for patient dob')
      //screen shot
      // const imageBuffer = await page.screenshot()
      // context.set('Content-Type', 'image/png')
      // context.send(imageBuffer)
      //click patient
      await page.click(
        '#rule-table2 > tbody > tr.ng-scope.highlight > td.w17p.patientName > span > span',
      )
      console.log('clicked patient')

      await sleep(5000)
      await page.waitForSelector(
        '#phub_dialog > div > div.modal-body.grey-bg > div > div.nopadding > div > div.progress-tab3.nopadtop.ml-62.w827 > div > div.col-sm-12.pad2-10.whitebg.grey-bd > div.col-sm-6 > div.col-sm-12.pad5.grey-bd.nomarleft > span.label.label-blue.cursor',
      )
      await page.click(
        '#phub_dialog > div > div.modal-body.grey-bg > div > div.nopadding > div > div.progress-tab3.nopadtop.ml-62.w827 > div > div.col-sm-12.pad2-10.whitebg.grey-bd > div.col-sm-6 > div.col-sm-12.pad5.grey-bd.nomarleft > span.label.label-blue.cursor',
      )
      console.log('clicked info button')
      await sleep(5000)
      console.log('adding patient Info')
      ////////////////// add patient info/////////////////////

      //add preferred name
      const preferredNameInput = await page.$('#ptpname')
      await preferredNameInput.click({ clickCount: 3 })
      await preferredNameInput.type(data.preferredName)
      await sleep(500)
      console.log('added preferred name')

      //add cell phone
      const cellPhone = await page.$('#ptcellphone')
      await cellPhone.click({ clickCount: 3 })
      await page.type('#ptcellphone', data.phoneNumberValue)
      await sleep(500)
      console.log('added cell phone')

      //add home phone
      // const homePhone = await page.$('#pthomephone')
      // await homePhone.click({ clickCount: 3 })
      // await page.type('#pthomephone', data)
      // await sleep(5000)
      // console.log('adding home phone')

      //add email
      const email = await page.$('#ptemail')
      await email.click({ clickCount: 3 })
      await page.type('#ptemail', data.emailValue)
      await sleep(500)
      console.log('added email')
      //add preferred name
      const preferredName = await page.$('#ptpreferredname')
      await preferredName.click({ clickCount: 3 })
      await page.type('#ptpreferredname', data.preferredName)
      await sleep(500)
      console.log('added preferred name')
      //add address
      const address = await page.$('#ptaddress')
      await address.click({ clickCount: 3 })
      await page.type('#ptaddress', data.addressValue)
      await sleep(500)
      console.log('added address')
      //add address 2
      const address2 = await page.$('#ptaddress2')
      await address2.click({ clickCount: 3 })
      await page.type('#ptaddress2', data.addressValue2)
      await sleep(500)
      console.log('added address 2')
      //add city
      const city = await page.$('#ptcity')
      await city.click({ clickCount: 3 })
      await page.type('#ptcity', data.cityValue)
      await sleep(500)
      //add state
      const state = await page.$('#ptstate')
      await state.click({ clickCount: 3 })
      await page.type('#patient-demographicsIpt8', data.USStateValue)
      await sleep(500)
      //add zip
      const zip = await page.$('#ptzip')
      await zip.click({ clickCount: 3 })
      await page.type('#ptzip', data.zipCodeValue)
      await sleep(500)
      //add date of birth
      //add slashes to date of birth
      const dateOfBirthWithSlashes = data.BirthDateValue.replace(
        /(\d{2})(\d{2})(\d{4})/,
        '$1/$2/$3',
      )
      console.log(dateOfBirthWithSlashes)

      const dateofbirthInput = await page.$('#dateofbirth')
      await dateofbirthInput.click({ clickCount: 3 })
      await page.type('#dateofbirth', dateOfBirthWithSlashes)
      //SSN
      const ssnInput = await page.$('#ptssn')
      await ssnInput.click({ clickCount: 3 })
      await page.type('#ptssn', data.socialValue)
      await sleep(500)
      //select Sex
      if (data.isCheckedMale) {
        await page.select('#ptsex', 'Male')
      }
      if (data.isCheckedFemale) {
        await page.select('#ptsex', 'Female')
      }
      if (data.isCheckedOther) {
        await page.select('#ptsex', 'Unknown')
      }
      await sleep(5000)
      //TODO: fix emergency contact
      //add emergency contact
      // await page.click('#patient-demographicsBtn18')
      // await sleep(1000)
      // // await page.type(
      // //   '#onadd > div.pad20.nopadtop.nopadbot > div.det-view.custfild > form > div:nth-child(2) > div:nth-child(1) > div.col-sm-4.nopadright > div > input',
      // //   data.EmergencyContactRelationShip
      // // )
      // await sleep(1000)

      // if (data.nameOfEmergencyContact.includes(' ')) {
      //   await page.type('#lname', data.nameOfEmergencyContact.split(' ')[1])
      //   await page.type('#fname', data.nameOfEmergencyContact.split(' ')[0])
      //   await sleep(1000)
      // } else {
      //   await page.type('#fname', data.nameOfEmergencyContact)
      //   await page.type('#lname', data.nameOfEmergencyContact)
      // }

      // await sleep(1000)
      // const emergencyContactPhone = await page.$('#homephone')
      // await emergencyContactPhone.click({ clickCount: 3 })
      // await page.type('#homephone', data.EmergencyContactPhoneNumber)
      // await sleep(1000)
      // await page.click('#selectContact-modalBtn2')
      // await sleep(1000)

      // select PCP
      await page.click(
        '#ptInfo > div > div > div.modal-body.grey-bg.middle_cont-main > div.col-sm-12.nopadding.borTop > div.col-sm-3.nopadding > div > div.det-view.per_box > div > div:nth-child(2) > div > div > div > button',
      )
      await sleep(4000)
      await page.type('#ProviderLookupPickListIpt1', 'NADIR,Ehreema')
      await sleep(3000)
      await page.click('#ProviderLookupPickListTbl1 > tbody > tr:nth-child(1)')
      await sleep(3000)
      await page.click('#ProviderLookupPickListBtn5')
      await sleep(2000)
      console.log('added PCP')
      //referring provider
      await page.click(
        '#ptInfo > div > div > div.modal-body.grey-bg.middle_cont-main > div.col-sm-12.nopadding.borTop > div.col-sm-3.nopadding > div > div.det-view.per_box > div > div:nth-child(4) > div > div > div > button',
      )
      await sleep(4000)
      await page.type('#ProviderLookupPickListIpt1', 'NADIR,Ehreema')
      await sleep(3000)
      await page.click('#ProviderLookupPickListTbl1 > tbody > tr:nth-child(1)')
      await sleep(3000)
      await page.click('#ProviderLookupPickListBtn5')
      await sleep(2000)
      console.log('added referring provider')
      //referring pr
      await page.click('#listAllProvider_renproviderInfo > button')
      await sleep(1000)
      await page.click('#provider-lookupLink1ngR11')
      console.log('clicked on referring provider')
      //Marital Status
      if (data.married) {
        await page.select('#ptmaritalstatus', 'Married')
      }
      if (data.single) {
        await page.select('#ptmaritalstatus', 'Single')
      }
      if (data.divorced) {
        await page.select('#ptmaritalstatus', 'Divorced')
      }
      if (data.widowed) {
        await page.select('#ptmaritalstatus', 'Widowed')
      }
      if (data.separated) {
        await page.select('#ptmaritalstatus', 'Legally Separated')
      }
      // if (data.maritalStatusOther) {
      //   await page.select("#ptmaritalstatus", "Unknown");
      // }
      if (data.withPartner) {
        await page.select('#ptmaritalstatus', 'Partner')
      }
      await sleep(1000)

      //select Race
      await page.click('#patient-demographicsBtn38')
      await sleep(2000)
      console.log('clicked Race')
      //race Search
      await page.type('#frmLanguageListIpt2', data.Ethnicity)
      await sleep(1000)
      await page.click('#langTable > tbody > tr:nth-child(1) > td.w15 > input')
      await sleep(1000)
      await page.click('#frmLanguageListBtn5')
      await sleep(3000)
      //sef pay
      await page.click('#patient-demographicsIpt15')
      await sleep(1000)
      //#add check for facility
      //additional  info
      await page.click('#patient-demographicsBtn46')
      await sleep(5000)
      const defaultFacility = await page.$(
        '#infofacility > div > form > div > div > div> input',
      )
      await defaultFacility.click({ clickCount: 3 })
      await sleep(1000)
      await page.click('#listAllFacility_infofacility > button')
      await sleep(1000)
      await page.click('#facility-lookupLink1ngR0')
      await sleep(3000)
      await page.click('#patientdemographics-AddInformationBtn14')
      await sleep(2000)

      console.log('added additional info ')
      try {
        page.on('dialog', async (dialog) => {
          console.log(dialog.message())
          console.log('in dialog')
          if (dialog.message()) {
            await dialog.accept()
          }
        })
      } catch (error) {
        null
      }
      // try {
      //   page.on('dialog', async (dialog) => {
      //     console.log(dialog.message())
      //     console.log('in dialog')
      //     await dialog.accept()
      //   })
      // } catch (error) {
      //   null
      // }
      // click ok button
      await sleep(1000)
      await page.click('#patient-demographicsBtn56')
      await sleep(3000)
      console.log('done, added patient')
      await browser.close()
    } catch (error) {
      functions.logger.log('error adding patient to eclinic')
      functions.logger.log(error)
    }
  })
