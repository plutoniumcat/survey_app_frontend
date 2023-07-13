import EditFieldButton from './EditFieldButton'
import { saveField } from './surveyFunctions'

export default function SurveyDescription({ state, dispatch }) {

  return (
    <div>
      { state.editMode.description ? 
        <textarea id='survey-description' name='survey-description' placeholder={state.data.description} 
        onChange={ (event) => saveField("introduction", event.target.value, dispatch) }></textarea>
        :
        <p>{ state.data.description }</p> 
      }
      <EditFieldButton state={ state } dispatch={ dispatch } parent={ "description" } />
    </div>
  )
}
