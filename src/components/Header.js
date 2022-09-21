import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const QuizOfChoiceHeader = styled.h1`
font-size: 24px;
text-align: center;
color: white;
// background-color: teal;
`;

const StyledWrapper = styled.section`
  background-color: gray;
`;

function Header() {
  return (
    <React.Fragment>
      <StyledWrapper>
      <QuizOfChoiceHeader>
        Quiz of Choice
      </QuizOfChoiceHeader>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sign-in">Account</Link>
          </li>
        </ul>
      </StyledWrapper>
    </React.Fragment>
  );
}

export default Header;