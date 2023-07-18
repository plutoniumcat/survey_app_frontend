import React, {useState} from 'react'
import {useSurveyDispatchContext} from './surveyContext'
import { saveField } from './surveyFunctions'

export default function MakePublicToggle() {
  const dispatch = useSurveyDispatchContext();
  const [isChecked, setIsChecked] = useState(true); 
  // This seems unintuitive, but setting the initial state to true results in correct behavior

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    console.log(isChecked)
    saveField("makePublic", isChecked, dispatch);
  }

  return (
    <div>
      <label htmlFor="make-public-toggle">Make public?</label>
      <input type="checkbox" name="make-public-toggle" id="make-public-toggle" 
      onChange={ () => {handleCheckboxChange()} }
      />
    </div>
  )
}
