import { css } from "styled-components";

export const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  boxShadow: css`
    box-shadow: 0 10px 30px -15px var(--black);
  `,
  button: css`
    background: var(--primary);
    font-size: var(--fz-xxs);
    padding: 10px 20px;
    border-radius: 30px;
  `,
};
