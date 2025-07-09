import { Grid } from "@mui/material";
import { useRef, useState } from "react";
import PreviewToolbar from "./PreviewToolbar";
import { PreviewRenderer } from "./PreviewRenderer";
import { dummyQuestions } from "@/app/preview/data";

const PreviewContainer = () => {
  const printRef = useRef(null);

  const [settings, setSettings] = useState({
    headingFontSize: 0.55, // ~14px
    fontSize: 0.55, // ~12px
    headingFontWeight: 600, // semi-bold for clear heading separation
    fontWeight: 300, // regular for body content
    lineHeight: 1.2, // improves readability without too much space
    letterSpacing: 0.01, // slight tracking for clarity
  });

  console.log(settings);

  const handleSettingChange = (updatedSettings) => {
    setSettings((prev) => ({
      ...prev,
      ...updatedSettings,
    }));
  };
  return (
    <Grid>
      <Grid>
        <PreviewToolbar
          settings={settings}
          onChange={handleSettingChange}
          printRef={printRef}
        />
      </Grid>
      <Grid>
        <PreviewRenderer
          questions={dummyQuestions}
          settings={settings}
          printRef={printRef}
        />
      </Grid>
    </Grid>
  );
};

export default PreviewContainer;
