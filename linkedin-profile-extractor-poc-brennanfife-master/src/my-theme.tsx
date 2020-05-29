import "styled-components";
import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      lightBlue: string;
      blue: string;
      darkBlue: string;
      lightRed: string;
      red: string;
      darkRed: string;
      lightGreen: string;
      green: string;
      darkGreen: string;
      gray: string;
    };
  }
}

export const theme: DefaultTheme = {
  colors: {
    lightBlue: "#63b3ed",
    blue: "#4299e1",
    darkBlue: "#3182ce",
    lightRed: "#fc8181",
    red: "#f56565",
    darkRed: "#e53e3e",
    lightGreen: "#68d391",
    green: "#48bb78",
    darkGreen: "#38a169",
    gray: "#a0aec0"
  }
};
