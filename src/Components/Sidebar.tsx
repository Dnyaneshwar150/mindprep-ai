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
} from "@mui/material";

const Sidebar: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [mainPointCount, setMainPointCount] = useState(1);
  const [subPointCount, setSubPointCount] = useState(1);

  const handleGenerate = () => {
    console.log("gernate called")
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
        Generate
      </Button>
    </Box>
  );
};

export default Sidebar;
