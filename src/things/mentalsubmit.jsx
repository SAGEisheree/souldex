import React from 'react'
import { useLocation } from 'react-router-dom';
const mentalsubmit = () => {

  const location = useLocation();
  const quizData = location.state || ["nothing"];

  console.log(quizData)

  return (
    <div>

      {JSON.stringify(quizData, null, 2)}
    </div>
  )
}

export default mentalsubmit