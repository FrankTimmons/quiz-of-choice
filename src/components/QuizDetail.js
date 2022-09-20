import React from "react";
import PropTypes from "prop-types";
import { auth } from "./../firebase.js";

function QuizDetail(props){
  const { quiz, onClickingDelete, onClickingEdit } = props; 

  function handleNewAnswerFormSubmission(event) {
    event.preventDefault();
    props.onNewAnswerCreation({
      answer1: event.target.answer1.value,
      answer2: event.target.answer2.value,
      answer3: event.target.answer3.value,
      quizId: quiz.id
    });
  }
  let showButtons = null;

  if(auth.currentUser.email === quiz.creator){
    showButtons = 
    <>
      <button onClick={onClickingEdit}>Update Quiz</button>
      <button onClick={()=> onClickingDelete(quiz.id)}>Delete Quiz</button>
    </>
  }

  return (
    <React.Fragment>
      <h1>{quiz.name}</h1>
      <form onSubmit={handleNewAnswerFormSubmission}>
        <h2>{quiz.question1}</h2>
        <input
          type='text'
          name='answer1'
          placeholder='Answer' />
        <h2>{quiz.question2}</h2>
        <input
          type='text'
          name='answer2'
          placeholder='Answer' />
        <h2>{quiz.question3}</h2>
        <input
          type='text'
          name='answer3'
          placeholder='Answer' />
        <button type='submit'>Submit your answers!</button>
      </form>
      {showButtons}
    </React.Fragment>
  );
}

QuizDetail.propTypes = {
  quiz: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default QuizDetail;