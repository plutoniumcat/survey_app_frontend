import React, { useState } from 'react'
import { useSurveyContext, useSurveyDispatchContext } from '../surveyContext';
import {useEditContext} from '../../../contexts/editContext';

export default function MultipleChoiceCheckbox({ id }) {
  const state = useSurveyContext();
  const dispatch = useSurveyDispatchContext();
  const [optionArray, setOptionArray] = useState(state.data.questions[id].data.questionOptions);
  const [editModeArray, setEditModeArray] = useState(false);
  const editState = useEditContext();

  const handleOptionChange = (index, value) => {
    let newOptionArray = [...optionArray];
    newOptionArray[index] = value;
    setOptionArray(newOptionArray);
  }

  const handleActivateEdit = (index) => {
    let newEditModeArray = {...editModeArray};
    newEditModeArray[index] = true;
    setEditModeArray(newEditModeArray);
  }

  const handleDeactivateEdit = (index) => {
    let newEditModeArray = {...editModeArray};
    newEditModeArray[index] = false;
    setEditModeArray(newEditModeArray);
  }

  // useEffect(() => {
  //   let newQuestionState = {...questionState}
  //   newQuestionState.data.questionOptions = optionArray;
  //   setQuestionState(newQuestionState);
  // },[optionArray])

  return (
    <div>
      <ul className='question-options-checkbox'>
        {
          optionArray.map((option, index) => {
            return(
              <li className="question-option-checkbox" key={ index }>
                <input type="checkbox" name={ option } id={ option } />
                {
                  editState && editModeArray[index]
                  ? 
                  <input type='text' placeholder={ option }
                  onChange={ (event) => handleOptionChange(index, event.target.value) } 
                  onKeyDown={ (event) => event.key === "Enter" ? handleDeactivateEdit(index): null} 
                  onBlur={ () => handleDeactivateEdit(index) } ></input>
                  :
                  <label htmlFor={ option } onClick={ () => handleActivateEdit(index) } >{ option }</label>
                }
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
