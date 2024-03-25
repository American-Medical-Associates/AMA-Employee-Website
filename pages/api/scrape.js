// pages/api/scrape.js
// Use dynamic imports instead
import puppeteer from 'puppeteer'
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default async function handler(req, res) {
  const { url, data, username, password } = req.body
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(url)
  //close first tab
  const pages = await browser.pages()
  await pages[0].close()

  const pageTitle = await page.title()

  //type in input
  await sleep(5000)
  await page.type('#doctorID', username.trim())
  await sleep(1000)

  await page.click('#nextStep')

  // const imageBuffer = await page.screenshot()
  // context.set('Content-Type', 'image/png')
  // context.send(imageBuffer)
  //find password field with xpath
  await sleep(1000)
  await page.type('#passwordField', password.trim())
  await sleep(5000)
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
  await page.evaluate((element) => (element.value = ''), zip)
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
    await page.select('#ptsex', 'male')
  }
  if (data.isCheckedFemale) {
    await page.select('#ptsex', 'female')
  }
  if (data.isCheckedOther) {
    await page.select('#ptsex', 'unknown')
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
  if (data.Ethnicity === 'Black/African American') {
    await page.type('#frmLanguageListIpt2', 'African American')
  } else {
    await page.type('#frmLanguageListIpt2', data.Ethnicity)
  }
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

  await sleep(5000)
  try {
    await page.click(
      'body > div.bootbox.modal.fade.bluetheme.medium-width.in > div > div > div.modal-footer > button.btn.btn.btn-lblue.btn-lgrey.btn-xs.btn-default.btn-yes',
    )
    await sleep(1000)
  } catch (error) {
    null
  }

  await sleep(3000)
  try {
    await page.click('#patient-demographicsBtn56')
    console.log('done, added patient')
  } catch (error) {
    null
  }
  await sleep(5000)

  await browser.close()

  res.status(200).json({ SuccessMessage: 'Patient Added Successfully' })
}
