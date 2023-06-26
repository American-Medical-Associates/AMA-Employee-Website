import { title } from 'process'
import React from 'react'
import RadioButton from '../userInput/RadioButton'
import TextInput from '../userInput/TextInput'

function EducationBox({
  highSchoolState,
  highSchoolValue,
  highSchoolCourseOfStudyState,
  highSchoolCourseOfStudyValue,
  highSchoolGraduateState,
  //   highSchoolGraduateValue,
  highSchoolNumberOfYearsCompletedState,
  highSchoolNumberOfYearsCompletedValue,
  highSchoolHonorsReceivedState,
  highSchoolHonorsReceivedValue,
  collegeState,
  collegeValue,
  collegeCourseOfStudyState,
  collegeCourseOfStudyValue,
  collegeGraduateState,
  //   collegeGraduateValue,
  collegeNumberOfYearsCompletedState,
  collegeNumberOfYearsCompletedValue,
  collegeHonorsReceivedState,
  collegeHonorsReceivedValue,
  GradState,
  GradValue,
  GradCourseOfStudyState,
  GradCourseOfStudyValue,
  GradGraduateState,
  //   GradGraduateValue,
  GradNumberOfYearsCompletedState,
  GradNumberOfYearsCompletedValue,
  GradHonorsReceivedState,
  GradHonorsReceivedValue,
  tradeState,
  tradeValue,
  tradeCourseOfStudyState,
  tradeCourseOfStudyValue,
  tradeGraduateState,
  //   tradeGraduateValue,
  tradeNumberOfYearsCompletedState,
  tradeNumberOfYearsCompletedValue,
  tradeHonorsReceivedState,
  tradeHonorsReceivedValue,
}) {
  return (
    <div className=" flex w-full grid-rows-4 flex-col rounded-[20px] outline outline-2 outline-[#b5b5b5]">
      <SchoolItem
        SchoolState={highSchoolState}
        SchoolValue={highSchoolValue}
        CourseOfStudyState={highSchoolCourseOfStudyState}
        SchoolCourseOfStudyValue={highSchoolCourseOfStudyValue}
        SchoolGraduateState={highSchoolGraduateState}
        title={'High School'}
        NumberOfYearsCompletedState={highSchoolNumberOfYearsCompletedState}
        NumberOfYearsCompletedValue={highSchoolNumberOfYearsCompletedValue}
        HonorsReceivedState={highSchoolHonorsReceivedState}
        HonorsReceivedValue={highSchoolHonorsReceivedValue}
      />
      <SchoolItem
        SchoolState={collegeState}
        SchoolValue={collegeValue}
        CourseOfStudyState={collegeCourseOfStudyState}
        SchoolCourseOfStudyValue={collegeCourseOfStudyValue}
        SchoolGraduateState={collegeGraduateState}
        title={'College'}
        NumberOfYearsCompletedState={collegeNumberOfYearsCompletedState}
        NumberOfYearsCompletedValue={collegeNumberOfYearsCompletedValue}
        HonorsReceivedState={collegeHonorsReceivedState}
        HonorsReceivedValue={collegeHonorsReceivedValue}
      />
      <SchoolItem
        SchoolState={GradState}
        SchoolValue={GradValue}
        CourseOfStudyState={GradCourseOfStudyState}
        SchoolCourseOfStudyValue={GradCourseOfStudyValue}
        SchoolGraduateState={GradGraduateState}
        title={'Grad School'}
        NumberOfYearsCompletedState={GradNumberOfYearsCompletedState}
        NumberOfYearsCompletedValue={GradNumberOfYearsCompletedValue}
        HonorsReceivedState={GradHonorsReceivedState}
        HonorsReceivedValue={GradHonorsReceivedValue}
      />
      <SchoolItem
        SchoolState={tradeState}
        SchoolValue={tradeValue}
        CourseOfStudyState={tradeCourseOfStudyState}
        SchoolCourseOfStudyValue={tradeCourseOfStudyValue}
        SchoolGraduateState={tradeGraduateState}
        title={'Trade School'}
        NumberOfYearsCompletedState={tradeNumberOfYearsCompletedState}
        NumberOfYearsCompletedValue={tradeNumberOfYearsCompletedValue}
        HonorsReceivedState={tradeHonorsReceivedState}
        HonorsReceivedValue={tradeHonorsReceivedValue}
      />
    </div>
  )
}
function SchoolItem({
  SchoolState,
  SchoolValue,
  CourseOfStudyState,
  SchoolCourseOfStudyValue,
  SchoolGraduateState,
  title,
  NumberOfYearsCompletedState,
  NumberOfYearsCompletedValue,
  HonorsReceivedState,
  HonorsReceivedValue,
}) {
  return (
    <div className=" flex w-full grid-cols-6 flex-col  items-center justify-center px-10 text-center md:flex-row">
      <h4 className=" flex text-lg font-bold"> {title}</h4>
      <div className=" mx-3 w-full">
        <TextInput
          value={SchoolValue}
          widthPercentage="w-full"
          placeHolder="School Name"
          onChange={(text) => {
            SchoolState(text.target.value)
          }}
        />
      </div>
      <div className=" mx-3 w-full">
        <TextInput
          widthPercentage="w-full"
          placeHolder="Course Of Study"
          onChange={(text) => {
            CourseOfStudyState(text.target.value)
          }}
          value={SchoolCourseOfStudyValue}
        />
      </div>
      <div className=" mx-3 w-full">
        <h5>Graduated?</h5>
        <RadioButton answerState={SchoolGraduateState} />
      </div>

      <div className=" mx-3 w-full">
        <TextInput
          value={HonorsReceivedValue}
          widthPercentage="w-full"
          placeHolder="Honors Received"
          onChange={(text) => {
            HonorsReceivedState(text.target.value)
          }}
        />
      </div>
      <div className=" mx-3 w-full">
        <TextInput
          value={NumberOfYearsCompletedValue}
          widthPercentage="w-full"
          placeHolder="# of years Completed"
          onChange={(text) => {
            NumberOfYearsCompletedState(text.target.value)
          }}
        />
      </div>
    </div>
  )
}

export default EducationBox
