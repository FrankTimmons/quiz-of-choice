import React from "react";
import PropTypes from "prop-types"; 
import ReusableForm from "./ReusableQuizForm";

function EditQuizForm(props){
  const { quiz } = props;

  function handleEditQuizFormSubmission(event) {
    event.preventDefault();
    props.onEditQuiz({
      name: event.target.name.value,
      question1: event.target.question1.value,
      question2: event.target.question2.value,
      question3: event.target.question3.value,
      answer1: event.target.answer1.value,
      answer2: event.target.answer2.value,
      answer3: event.target.answer3.value,
      id: quiz.id
    });
  }

  return (
    <React.Fragment>
      <ReusableForm formSubmissionHandler={handleEditQuizFormSubmission}
       buttonText={"Edit Quiz"}/>
    </React.Fragment>
  );
}

EditQuizForm.propTypes = {
  onEditQuiz: PropTypes.func,
  quiz: PropTypes.object
};

export default EditQuizForm;
