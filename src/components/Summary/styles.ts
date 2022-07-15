import styled from "styled-components";

export const SummaryStyle = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -10rem;
`;
export const SummaryCardStyle = styled.span`
  background-color: var(--shape);
  padding: 1.5rem 2rem;
  border-radius: 0.25rem;
  color: var(--text-title);
  cursor: pointer;
  user-select: none;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
    font-weight: 500;
    line-height: 3rem;
  }

  &.positive-bg {
    background-color: var(--green);
    color: var(--shape);
  }
  &.negative-bg {
    background-color: var(--red);
    color: var(--shape);
  }

  .hideValue {
    filter: blur(0.3rem);
  }
`;
