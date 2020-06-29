import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {

  let average = 0
  let positive = 0

  if ( good + bad + neutral !== 0 ) {
    average = (good - bad) / (good + bad + neutral)
    positive = (good / (good + bad + neutral))*100

    return (
      <div>
         <table>
           <tbody>
            <StatisticLine text={"good "} value={good}/>
            <StatisticLine text={"neutral "} value={neutral}/>
            <StatisticLine text={"bad "} value={bad}/>
            <StatisticLine text={"average "} value={average} />
            <StatisticLine text={"positive "} value={positive + "%"} />
            </tbody>
          </table>
      </div>
    )
  }

  return (
    <div>
      No feedback given
    </div>
  )


}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)