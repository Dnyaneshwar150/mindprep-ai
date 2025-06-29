import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({
  texts,
  typingSpeed = 120,
  deletingSpeed = 100,
  delayBetweenTexts = 2000,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    const currentText = texts[currentTextIndex];
    let timeoutId: NodeJS.Timeout;

    if (isDeleting) {
      timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => prev + 1);
        }
      }, deletingSpeed);
    } else {
      timeoutId = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
        if (displayedText === currentText) {
          if (currentTextIndex === texts.length - 1) {
            // Last text reached, stop
            setDone(true);
          } else {
            setTimeout(() => setIsDeleting(true), delayBetweenTexts);
          }
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timeoutId);
  }, [
    displayedText,
    isDeleting,
    texts,
    currentTextIndex,
    done,
    typingSpeed,
    deletingSpeed,
    delayBetweenTexts,
  ]);

  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      <Grid sx={{ fontSize: "14px" }}>{displayedText}</Grid>
      <span
        style={{
          width: "1px",
          height: "1em",
          backgroundColor: "#000",
          marginLeft: "2px",
          animation: "blink 1s step-end infinite",
        }}
      />
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </span>
  );
};

export default Typewriter;
