import React from 'react'
import EditFieldButton from './EditFieldButton'
import { saveField } from './surveyFunctions'

export default function SurveyCompletionMessage({ state, dispatch }) {

  return (
    <div>
      { state.editMode.completionMessage ? 
        <textarea id='survey-completion-message' name='survey-completion-message' placeholder={ state.data.completionMessage } 
        onChange={ (event) => saveField("introduction", event.target.value, dispatch) } ></textarea>
        :
        <p>{ state.data.completionMessage }</p> 
      }
      <EditFieldButton state={ state } dispatch={ dispatch } parent={ "completionMessage" } />
    </div>
  )
}
