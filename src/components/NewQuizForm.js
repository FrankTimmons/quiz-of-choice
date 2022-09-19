import React from "react";
import PropTypes from "prop-types"; 

function NewQuizForm(props){

  function handleNewQuizFormSubmission(event) {
    event.preventDefault();
    props.onNewQuizCreation({
      question1: event.target.question1.value,
      question2: event.target.question2.value,
      question3: event.target.question3.value,
      answer1: event.target.answer1.value,
      answer2: event.target.answer2.value,
      answer3: event.target.answer3.value,
    });
  }

  return (
    <React.Fragment>
      <form onSubmit={handleNewQuizFormSubmission}>
        <input
          type='text'
          name='question1'
          placeholder='Question 1' />
        <input
          type='text'
          name='answer1'
          placeholder='Answer 1' />
        <input
          type='text'
          name='question2'
          placeholder='Question 2' />
        <input
          type='text'
          name='answer2'
          placeholder='Answer 2' />
        <input
          type='text'
          name='question3'
          placeholder='Question 3' />
        <input
          type='text'
          name='answer3'
          placeholder='Answer 3' />
        <button type='submit'>Submit Quiz</button>
      </form>
    </React.Fragment>
  );
}

NewQuizForm.propTypes = {
  onNewQuizCreation: PropTypes.func
};

export default NewQuizForm;
