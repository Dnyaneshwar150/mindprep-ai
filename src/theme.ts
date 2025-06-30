"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#228B22",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "var(--font-poppins), sans-serif",
    h1: { fontSize: "2.5rem" }, // 40px -> --font-3xl
    h2: { fontSize: "2rem" }, // 32px -> --font-2xl
    h3: { fontSize: "1.5rem" }, // 24px -> --font-xl
    h4: { fontSize: "1.25rem" }, // 20px -> --font-lg
    h5: { fontSize: "1.125rem" }, // 18px -> --font-md
    h6: { fontSize: "1rem" }, // 16px -> --font-base
    body1: { fontSize: "1rem" }, // --font-base
    body2: { fontSize: "0.875rem" }, // --font-sm
    caption: { fontSize: "0.75rem" }, // --font-xs
  },
});

export default theme;
