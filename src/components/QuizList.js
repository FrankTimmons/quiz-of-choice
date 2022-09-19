import React from "react";
import Quiz from "./Quiz";
import PropTypes from "prop-types";

function QuizList(props){

  return(
    <React.Fragment>
      <hr/>
      {props.quizList.map((quiz) =>
        <Quiz 
          whenQuizClicked={props.onQuizSelection}
          name={quiz.name}
          id={quiz.id}
          key={quiz.id}/>
      )}
    </React.Fragment>
  );
}

QuizList.propTypes = {
  quizList: PropTypes.array,
  onQuizSelection: PropTypes.func,
};

export default QuizList;

