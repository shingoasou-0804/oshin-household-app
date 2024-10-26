import { createTheme } from "@mui/material";
import { amber, blue, brown, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, pink, purple, red, teal } from "@mui/material/colors";
import { PaletteColor, PaletteColorOptions } from "@mui/material/styles/createPalette";
import { ExpenseCategory, IncomeCategory } from "../types";

declare module '@mui/material/styles' {
  interface Palette {
    incomeColor: PaletteColor;
    expenseColor: PaletteColor;
    balanceColor: PaletteColor;
    incomeCategoryColor: Record<IncomeCategory, string>;
    expenseCategoryColor: Record<ExpenseCategory, string>;
  }
  interface PaletteOptions {
    incomeColor?: PaletteColorOptions;
    expenseColor?: PaletteColorOptions;
    balanceColor?: PaletteColorOptions;
    incomeCategoryColor?: Record<IncomeCategory, string>;
    expenseCategoryColor?: Record<ExpenseCategory, string>;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans JP, Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  palette: {
    incomeColor: {
      main: blue[500],
      light: blue[100],
      dark: blue[700],
    },
    expenseColor: {
      main: red[500],
      light: red[100],
      dark: red[700],
    },
    balanceColor: {
      main: green[500],
      light: green[300],
      dark: green[700],
    },
    incomeCategoryColor: {
      給与: lightBlue[500],
      副収入: cyan[200],
      お小遣い: lightGreen["A700"],
    },
    expenseCategoryColor: {
      食費: deepOrange[500],
      日用品: lightGreen[500],
      交通費: amber[500],
      医療費: red[500],
      保険: pink[500],
      水道光熱費: blue[500],
      通信費: lightBlue[500],
      住宅: brown[500],
      税金: grey[500],
      教育: purple[500],
      交際費: deepPurple[500],
      衣料品: indigo[500],
      趣味: teal[500],
      その他: grey[500],
    },
  },
});
