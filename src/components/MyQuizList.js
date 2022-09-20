import React from "react";
import PropTypes from "prop-types";
import { auth } from "./../firebase.js";
import Quiz from "./Quiz.js";

function MyQuizList(props) {
  const myQuizList = props.quizList.filter(quiz => auth.currentUser.email === quiz.creator);

  return(
    <React.Fragment>
      <hr/>
      {myQuizList.map((quiz) => 
        <Quiz 
          whenQuizClicked={props.onQuizSelection}
          name={quiz.name}
          id={quiz.id}
          key={quiz.id}/>
      )}
      <button onClick={props.changeVisibleList}>View all quizzes</button>
    </React.Fragment>
  );
}

MyQuizList.propTypes = {
  quizList: PropTypes.array,
  onQuizSelection: PropTypes.func,
};

export default MyQuizList;