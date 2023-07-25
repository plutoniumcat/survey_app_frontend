import React, {useEffect, useRef} from 'react'
import { useLocalStorage } from 'react-use'
import { useSurveyContext, useSurveyDispatchContext } from '../../contexts/surveyContext'
import {useEditDispatchContext} from '../../contexts/editContext'
import MakePublicToggle from './MakePublicToggle'
import SurveyTitle from './SurveyTitle'
import SurveyDescription from './SurveyDescription'
import SurveyIntroText from './SurveyIntroText'
import SurveyQuestionsContainer from './SurveyQuestionsContainer'
import SurveyCompletionMessage from './SurveyCompletionMessage'
import { useParams } from 'react-router-dom'

export default function EditSurveyContainer() {
  // If there is an id in the url, get it
  const {surveyId} = useParams();

  // Dispatch for edit state
  const editDispatch = useEditDispatchContext();

  // Set edit state to true for all subcomponents
  useEffect(() => {
    editDispatch({data: true})
    // eslint-disable-next-line
  }, []);

  const state = useSurveyContext();
  const dispatch = useSurveyDispatchContext();

  // Create keys for storing data in local storage
  const [surveyDraft, setSurveyDraft] = useLocalStorage("new-survey-draft", "");

  // Ensure restore from draft only happens once under strict mode
  const didDraftLoad = useRef(false);

  // On page load- check if there is saved data and if the user wants to restore it
  useEffect(() => {
    if (didDraftLoad.current === false) { // Check that this is the first time
      didDraftLoad.current = true;
      if (surveyDraft) { // Check if saved draft exists
        const surveyData = JSON.parse(surveyDraft);
        if (surveyData.data._id == surveyId) {// Either these things need to match, or they both need to be undefined/null
          if (window.confirm("Restore saved draft?")) {
            dispatch({type: "loadDraft", data: surveyData})
          } else {
            // Erase stored data
            setSurveyDraft("");
          }
        }
      }
    }
    // eslint-disable-next-line
  }, []);

  // Store current state in local storage
  useEffect(() => {
    if (didDraftLoad.current === true) { // Make sure this hook doesn't run until any saved drafts have been restored
      // Save the current state once every ten seconds
      const saveToLocal = setTimeout(() => {
        setSurveyDraft(JSON.stringify(state));
      }, 10000)
      return () => clearTimeout(saveToLocal)
    }
  // eslint-disable-next-line
  }, [state])

  return (
    <div>
        <MakePublicToggle />
        <SurveyTitle />
        <SurveyDescription />
        <SurveyIntroText />
        <SurveyQuestionsContainer />
        <SurveyCompletionMessage />
    </div>
  )
}
