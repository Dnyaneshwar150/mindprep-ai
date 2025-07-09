import { Box, Typography } from "@mui/material";

function QAitem({ question, settings }) {
  const {
    fontSize,
    headingFontSize,
    fontWeight,
    headingFontWeight,
    lineHeight,
    letterSpacing,
  } = settings;

  return (
    <Box
      sx={{
        width: "calc(50% - 1rem)",
        boxSizing: "border-box",
        border: "1px solid #eee",
        fontSize: `${fontSize}rem`,
        fontWeight,
        lineHeight,
        letterSpacing: `${letterSpacing}rem`,
      }}
    >
      {/* Question Heading */}
      <Typography
        sx={{
          fontSize: `${headingFontSize}rem`,
          fontWeight: headingFontWeight,
        }}
      >
        Q: {question.label}
      </Typography>

      {/* Answer Text (same style as explanation text) */}
      <Typography
        sx={{
          fontSize: `${fontSize}rem`,
          fontWeight,
          lineHeight,
          color: "#444",
        }}
      >
        A: {question.answer.label}
      </Typography>

      {/* Main Point Headings */}
      {question.answer.mainPointHeadings?.map((mph, mphIdx) => (
        <Box key={mphIdx}>
          <Typography
            sx={{
              fontWeight: headingFontWeight,
              fontSize: `${headingFontSize}rem`,
              textDecoration: "underline",
              lineHeight,
            }}
          >
            {mphIdx + 1}. Main Point Heading: {mph.label}
          </Typography>

          {/* Main Points */}
          {mph.mainPoints?.map((mp, mpIdx) => (
            <Box key={mpIdx}>
              {/* Main Point Explanation (same style as answer) */}
              <Typography
                sx={{
                  fontSize: `${fontSize}rem`,
                  fontWeight,
                  lineHeight,
                }}
              >
                - Main Point: {mp.label}
              </Typography>

              {/* Subpoints */}
              {mp.subPoints?.map((sp, spIdx) => (
                <Box
                  key={spIdx}
                  ml='1rem'
                >
                  {/* Subpoint Heading */}
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      fontWeight: headingFontWeight,
                      fontSize: `${headingFontSize}rem`,
                      textDecoration: "underline",
                      lineHeight,
                    }}
                  >
                    {spIdx + 1}. Subpoint: {sp.label}
                  </Typography>

                  {/* Subpoint Explanation (same as answer) */}
                  <Typography
                    sx={{
                      ml: "0.5rem",
                      fontSize: `${fontSize}rem`,
                      fontWeight,
                      lineHeight,
                    }}
                  >
                    Explanation: {sp.explanation.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default QAitem;
