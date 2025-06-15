import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { fetchStructuredAnswer } from "@/api/chatgpt"; // ✅ import the API

const Sidebar= () => {
  const [question, setQuestion] = useState("");
  const [mainPointCount, setMainPointCount] = useState(1);
  const [subPointCount, setSubPointCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const prompt = `You are an assistant that returns structured JSON answers.

Format:
{
  "question": {
    "id": "q1",
    "label": "QUESTION_TEXT",
    "answer": {
      "id": "a1",
      "label": "Short answer in 25 words",
      "mainPointHeadings": [
        {
          "id": "mph1",
          "label": "Main point heading",
          "mainPoints": [
            {
              "id": "mp1",
              "label": "Main point",
              "subPoints": [
                {
                  "id": "sp1",
                  "label": "Subpoint",
                  "explanation": {
                    "id": "exp1",
                    "label": "Explanation",
                    "source": "URL or source text"
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  }
}

Generate ${mainPointCount} mainPointHeadings. Each should have 1 mainPoint with ${subPointCount} subPoints. Use this question: "${question}"`;

    try {
      const data = await fetchStructuredAnswer(prompt);
      console.log("Generated:", data);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "var(--light-grey)",
        borderRight: "1px solid #ccc",
        p: "16px",
        overflowY: "auto",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Typography sx={{ fontWeight: 600, mb: 2, fontSize: "16px" }}>
        Create Question Flow
      </Typography>

      <TextField
        fullWidth
        size="small"
        label="Question"
        variant="outlined"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Main Points</InputLabel>
        <Select
          value={mainPointCount}
          label="Main Points"
          onChange={(e) => setMainPointCount(Number(e.target.value))}
        >
          {[1, 2, 3, 4].map((num) => (
            <MenuItem key={num} value={num}>
              {num}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Subpoints</InputLabel>
        <Select
          value={subPointCount}
          label="Subpoints"
          onChange={(e) => setSubPointCount(Number(e.target.value))}
        >
          {[1, 2, 3, 4].map((num) => (
            <MenuItem key={num} value={num}>
              {num}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        fullWidth
        onClick={handleGenerate}
        disabled={loading || !question}
        sx={{
          backgroundColor: "var(--primary-grey)",
          borderRadius: "12px",
          textTransform: "none",
          mb: 3,
          "&:hover": {
            backgroundColor: "#888",
          },
        }}
      >
        {loading ? "Generating..." : "Generate"}
      </Button>

      <Grid
        sx={{
          fontSize: 12,
          color: "var(--primary-grey)",
        }}
      >
        Version 0.1.0
      </Grid>
    </Box>
  );
};

export default Sidebar;
