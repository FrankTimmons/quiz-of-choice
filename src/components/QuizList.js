import React from "react";
import Quiz from "./Quiz";
import PropTypes from "prop-types";
import * as css from '../StyleComponents'

// const Button = styled.button`
//   font-weight: bolder; 
//   background-color: HEX #FBFAF5;
//   border-radius: 6px;
//   border: 3px solid palevioletred;
//   color: palevioletred;
//   margin: 0 1em;
//   padding: 0.25em 1em;
// `

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
      <css.Button onClick={props.changeVisibleList}>View my quizzes</css.Button>
    </React.Fragment>
  );
}

QuizList.propTypes = {
  quizList: PropTypes.array,
  onQuizSelection: PropTypes.func,
};

export default QuizList;

