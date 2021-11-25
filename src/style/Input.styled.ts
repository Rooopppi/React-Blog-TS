import styled from "styled-components";

const Input = styled.input<{ backgroundDark?: string; marginRight?: string }>`
  padding: 10px;
  background-color: ${(props) =>
    props.backgroundDark ? "#0d1117" : "#161b22"};
  border: none;
  border-radius: 20px;
  width: 100%;
  color: ${(props) => props.theme.fontColor};
  margin-right: ${(props) => props.marginRight || "0"};
`;

export default Input;
