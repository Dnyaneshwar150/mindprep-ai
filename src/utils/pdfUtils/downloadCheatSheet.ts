// src/utils/pdfUtils/downloadCheatSheet.ts

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

export function downloadCheatSheet({ question, answer, explanations }: CheatSheetData) {
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
