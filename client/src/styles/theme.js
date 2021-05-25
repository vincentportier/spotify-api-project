import { css } from "styled-components";
import { mixins } from "./mixins";

export const theme = {
  palette: css`
    --white: #ffffff;
    --black: #43414e;
    --charcoal: #121216;
    --primary: #ef5466;
    --primary-hover: #cb4757;
    --error: #f44336;
    --warning: #ff9800;
    --info: #2196f3;
    --success: #4caf50;
  `,
  fontSizes: css`
    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;
  `,
  mixins,
};