import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const QuizOfChoiceHeader = styled.h1`
  margin: 10px; 
  font-size: 50px;
  color: white;
  // background-color: teal;
`;

const StyledWrapper = styled.section`
  background-color: rgb(130, 180, 255);
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;

function Header() {
  return (
    <React.Fragment>
      <StyledWrapper>
      <QuizOfChoiceHeader>
        QUIZ OF CHOICE
      </QuizOfChoiceHeader>
        <p><Link to="/">Home</Link> | <Link to="/sign-in">Account</Link></p>
      </StyledWrapper>
    </React.Fragment>
  );
}

export default Header;