import styled from "styled-components";

export const Button = styled.button`
  font-weight: bolder; 
  background-color: HEX #FBFAF5;
  border-radius: 6px;
  border: 3px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: palevioletred;
  }
`;