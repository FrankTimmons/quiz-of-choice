import React from "react";
import PropTypes from "prop-types";
import * as css from '../StyleComponents'

function ReusableForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          type='text'
          name='name'
          placeholder='Enter name of quiz' />   
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
        <css.Button type='submit'>{props.buttonText}</css.Button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;