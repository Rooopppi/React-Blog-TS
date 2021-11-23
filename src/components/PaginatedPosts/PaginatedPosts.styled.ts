import styled from "styled-components";

const PaginationStyled = styled.div<{ fontColor?: string }>`
  margin-bottom: 10px;
  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  a {
    font-size: 18px;
    margin-right: 10px;
    border: 1px solid;
    border-color: ${(theme) => theme.fontColor};
    padding: 3px 11px;
    border-radius: 20px;
    color: ${(theme) => theme.fontColor};
  }
  .disabled a,
  a:hover {
    border-color: gray;
    cursor: pointer;
    color: gray;
  }
  .selected a {
    border-color: #d1495b;
    color: #d1495b;
  }
`;

export default PaginationStyled;
