import styled from "styled-components";

const Title = styled.h1<{ center?: boolean; hover?: boolean }>`
  font-size: 25px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: ${(props) => (props.center ? "center" : "normal")};
  &:hover {
    color: ${(props) => (props.hover ? "gray" : "#red")};
  }
`;

export default Title;
