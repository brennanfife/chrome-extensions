import styled, { css } from "styled-components";

export const Top = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Middle = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Bottom = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  color: white;
  margin-bottom: 0rem;
  font-size: 1.25rem;
  font-weight: 500;
  padding: 0.5rem;
  border-bottom: 3px solid gray;
`;

export const Button = styled.button<{ isRed?: boolean }>`
  flex-grow: 1;
  font-weight: 700;
  margin: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border-width: 4px;
  color: white;
  background-color: ${props =>
    props.isRed ? props.theme.colors.red : props.theme.colors.blue};
  border-color: ${props =>
    props.isRed ? props.theme.colors.darkRed : props.theme.colors.darkBlue};
  &:hover {
    background-color: ${props =>
      props.isRed ? props.theme.colors.lightRed : props.theme.colors.lightBlue};
    border-color: ${props =>
      props.isRed ? props.theme.colors.red : props.theme.colors.blue};
  }
`;

export const Form = styled.form`
  text-align: center;
  border-top: 3px solid white;
  border-bottom: 3px solid white;
`;

export const PageSelector = styled.input`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  border-radius: 0.25rem;
`;

export const SaveButton = styled.button`
  flex-grow: 1;
  font-weight: 700;
  margin: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border-width: 4px;
  color: white;
  background-color: ${props => props.theme.colors.green};
  border-color: ${props => props.theme.colors.darkGreen};
  &:hover {
    background-color: ${props => props.theme.colors.lightGreen};
    border-color: ${props => props.theme.colors.green};
  }
  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
    `}
`;

export const ListBody = styled.ul`
  height: 200px;
  width: 200px;
  background-color: white;
  overflow-x: hidden;
  overflow-y: auto;
  margin-right: 2rem;
  margin-left: 2rem;
  color: black;
  font-family: sans-serif;
  font-size: 16px;
  padding: 0;
  -webkit-overflow-scrolling: touch;
  border-radius: 0.25rem;
`;

export const Element = styled.li`
  position: static;
  list-style: none;
  padding: 10px;
  background: ${props => props.theme.colors.green};
  margin: 5px;
  border-radius: 0.25rem;
`;
