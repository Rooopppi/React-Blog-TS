import styled from "styled-components";

const TextArea = styled.textarea<{ backgroundDark?: string }>`
  background-color: ${(props) =>
    props.backgroundDark ? "#0d1117" : "#161b22"};
  color: ${(props) => props.theme.fontColor};
  border: none;
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  font-family: "Open Sans", sans-serif;
  min-height: 150px;
`;

export default TextArea;
