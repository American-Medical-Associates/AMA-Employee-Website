import React, { useState, useEffect, useRef } from 'react'
import LargeTextBox from '../userInput/LargeTextBox'
import * as tf from '@tensorflow/tfjs'
import * as qna from '@tensorflow-models/qna'
import TextInput from '../userInput/TextInput'
import MainButton from '../Buttons/MainButton'

function TensorFlowBert() {
  const [answer, setAnswer] = useState([])
  const [model, setModel] = useState(null)
  const passageRef = useRef(null)
  const questionRef = useRef(null)
  const [passageInput, setPassageInput] = useState(null)
  const [questionInput, setQuestionInput] = useState(null)

  const loadModel = async () => {
    const loadModel = await qna.load()
    setModel(loadModel)
  }

  useEffect(() => {
    loadModel()
  }, [])

  const answerQuestion = async (e) => {
    // if (e.which === 13 && model !== null) {
    if (model !== null) {
      //e.which 13 is if enter key is hit
      console.log('summited')
      //   const passage = passageRef.current.value
      //   const question = questionRef.current.value

      const answers = await model.findAnswers(questionInput, passageInput)
      setAnswer(answers)
      console.log(answers)
    }
  }
  const showAnswer = answer.map((ans, idx) => {
    console.log('not empty')
    return (
      <div className=" w-full">
        <p>Answer: {idx + 1} - </p>
        <p>
          {ans.text} {ans.score}
        </p>
      </div>
    )
  })

  return (
    <div className=" flex h-full w-full flex-col items-center justify-center">
      <LargeTextBox
        ref={passageRef}
        heightPercentage=" h-[60%]"
        widthPercentage="w-[80%]"
        placeHolder="Passage"
        onChange={(text) => {
          setPassageInput(text.target.value)
        }}
      />
      <TextInput
        onChange={(text) => {
          setQuestionInput(text.target.value)
        }}
        placeHolder="Question"
        widthPercentage=" w-[50%]"
        ref={questionRef}
      />
      <MainButton
        buttonText=" Ask"
        onClick={() => {
          answerQuestion()
        }}
      />
      {showAnswer}
    </div>
  )
}

export default TensorFlowBert
