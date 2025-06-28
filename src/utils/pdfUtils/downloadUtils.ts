// src/utils/pdfUtils/downloadCheatSheet.ts

import { Edge, Node } from "@xyflow/react";
import jsPDF from "jspdf";

interface ExplanationBlock {
  subpoint: string;
  explanation: string;
  source?: string;
}

interface CheatSheetData {
  question: string;
  answer: string;
  explanations: ExplanationBlock[];
}

export function downloadCheatSheet({
  question,
  answer,
  explanations,
}: CheatSheetData) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("🧠 Mindmap Cheatsheet", 20, 20);

  doc.setFontSize(12);
  doc.text("Question:", 20, 35);
  const questionLines = doc.splitTextToSize(question, 170);
  doc.text(questionLines, 20, 42);

  const answerStartY = 42 + questionLines.length * 6;
  doc.text("Answer:", 20, answerStartY);
  const answerLines = doc.splitTextToSize(answer, 170);
  doc.text(answerLines, 20, answerStartY + 7);

  let currentY = answerStartY + 14 + answerLines.length * 6;

  doc.setFont("helvetica", "bold");
  doc.text("Explanations:", 20, currentY);
  currentY += 8;
  doc.setFont("helvetica", "normal");

  explanations.forEach(({ subpoint, explanation, source }) => {
    const lines = [
      ...doc.splitTextToSize(`• ${subpoint}`, 170),
      ...doc.splitTextToSize(`  - ${explanation}`, 170),
    ];

    if (source) {
      lines.push(...doc.splitTextToSize(`  🔗 Source: ${source}`, 170));
    }

    lines.forEach((line) => {
      if (currentY > 270) {
        doc.addPage();
        currentY = 20;
      }
      doc.text(line, 20, currentY);
      currentY += 6;
    });

    currentY += 4;
  });

  doc.save("mindmap_cheatsheet.pdf");
}

export function downloadMindmapToJson({
  question,
  nodes,
  edges,
}: {
  question: string;
  nodes: Node[];
  edges: Edge[];
}) {
  const blob = new Blob([JSON.stringify({ question, nodes, edges }, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "mindmap.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function uploadMindmapFromFile(file: File): Promise<{
  question: string;
  nodes: Node[];
  edges: Edge[];
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (!json.question || !json.nodes || !json.edges) {
          return reject(new Error("Invalid mindmap structure"));
        }

        resolve({
          question: json.question,
          nodes: json.nodes,
          edges: json.edges,
        });
      } catch {
        reject(new Error("Failed to parse JSON file"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsText(file);
  });
}
