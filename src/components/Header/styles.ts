import styled from "styled-components";

export const Container = styled.header`
  background: black;
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 2rem 1rem 12rem; //32pixels height 16pixels padding laterais e 160pixels do padding em baixo
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    max-width: 150px;
    opacity: 0.8;
  }
  button {
    font-size: 1rem;
    color: #fff;
    background: var(--blue-light);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;

    transition: filter 0.2s;
    &:hover {
      filter: brightness(0.7);
    }
  }
`;
