import React from "react";
import PropTypes from "prop-types";

function AnswerKey(props){

  return (
    <React.Fragment>
      <h1>Correct Answers</h1>
      <ol>
        <li>{props.quiz.answer1}</li>
        <li>{props.quiz.answer2}</li>
        <li>{props.quiz.answer3}</li>
      </ol>
      <h1>Your Answers</h1>
      <ol>
        <li>{props.answer.answer1}</li>
        <li>{props.answer.answer2}</li>
        <li>{props.answer.answer3}</li>
      </ol>
    </React.Fragment>
  );
}

AnswerKey.propTypes = {
  quiz: PropTypes.object,
  answer: PropTypes.object
}

export default AnswerKey;