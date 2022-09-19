import React from "react";
import PropTypes from "prop-types";

function Quiz(props){

  return (
  <React.Fragment>
      <div onClick = {() => props.whenQuizClicked(props.id)}>
        <h2>{props.name}</h2>
        <hr/>
      </div>
    </React.Fragment>
    );
}

Quiz.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  whenQuizClicked: PropTypes.func
}

export default Quiz;