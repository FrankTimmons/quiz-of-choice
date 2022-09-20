import React from "react";
import PropTypes from "prop-types"; 
import ReusableForm from "./ReusableQuizForm";
import { auth } from "./../firebase.js";

function NewQuizForm(props){

  function handleNewQuizFormSubmission(event) {
    event.preventDefault();
    props.onNewQuizCreation({
      name: event.target.name.value,
      question1: event.target.question1.value,
      question2: event.target.question2.value,
      question3: event.target.question3.value,
      answer1: event.target.answer1.value,
      answer2: event.target.answer2.value,
      answer3: event.target.answer3.value,
      creator: auth.currentUser.email
    });
  }

  return (
    <React.Fragment>
      <ReusableForm formSubmissionHandler={handleNewQuizFormSubmission} buttonText={"Add Quiz"}/>
    </React.Fragment>
  );
}

NewQuizForm.propTypes = {
  onNewQuizCreation: PropTypes.func
};

export default NewQuizForm;
