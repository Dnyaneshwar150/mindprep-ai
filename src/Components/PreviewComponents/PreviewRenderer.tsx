import { Grid, Paper } from "@mui/material";
import QAitem from "./QAitem";

export function PreviewRenderer({ questions, settings, printRef }) {
  return (
    <Paper elevation={3}>
      <Grid
        container
        ref={printRef}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          padding: "1rem",
          backgroundColor: "#fff",
          color: "#000",
        }}
      >
        {questions.map((q, idx) => (
          <QAitem
            key={idx}
            question={q}
            settings={settings}
          />
        ))}
      </Grid>
    </Paper>
  );
}
