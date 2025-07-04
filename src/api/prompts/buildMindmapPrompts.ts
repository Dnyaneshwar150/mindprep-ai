import { createAsyncThunk } from "@reduxjs/toolkit";
import mockData from "../../app/Workflow/mockData.json";
import { PromptParams } from "../../../lib/types";

const USE_MOCK_DATA = true;

export const fetchMindmapFromGPT = createAsyncThunk(
  "mindmap/fetchFromGPT",
  async ({
    question,
    mainPointCount,
    subPointCount,
    subject,
    instructions,
  }: PromptParams) => {
    if (USE_MOCK_DATA) {
      return {
        question: mockData.question.label,
        data: mockData,
      };
    }

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        mainPointCount,
        subPointCount,
        subject,
        instructions,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate mindmap from backend");
    }

    const data = await response.json(); // { question, data }
    return data;
  },
);
